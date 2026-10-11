#!/usr/bin/python3 -I
"""Root-installed SSH forced command. Runs as doneat-deploy, never as root."""
import fcntl
import gzip
import io
import os
from pathlib import Path, PurePosixPath
import re
import shutil
import signal
import sys
import tarfile
import tempfile
import uuid

BASE = Path('/var/www/doneat-cn')
SHA_RE = re.compile(r'[0-9a-f]{40}')
MAX_ARCHIVE_BYTES = 512 * 1024 * 1024
MAX_CONTENT_BYTES = 1024 * 1024 * 1024
MAX_STREAM_BYTES = MAX_CONTENT_BYTES + 16 * 1024 * 1024
MAX_FILE_BYTES = 256 * 1024 * 1024
MAX_ENTRIES = 10000
TIMEOUT_SECONDS = 300
REQUIRED_FILES = (
    'zh-CN/index.html', 'zh-CN/download/index.html', 'zh-CN/about/index.html',
    'zh-CN/faq/index.html', 'zh-CN/privacy/index.html',
    'zh-CN/how-it-works/index.html', '404.html', 'robots.txt', 'sitemap-index.xml',
)


class Rejected(ValueError):
    pass


class BoundedReader(io.RawIOBase):
    """Bound expanded gzip bytes, including PAX metadata and tar padding."""
    def __init__(self, stream):
        self.stream = stream
        self.total = 0

    def readable(self):
        return True

    def read(self, size=-1):
        if size < 0:
            size = MAX_STREAM_BYTES - self.total + 1
        data = self.stream.read(min(size, MAX_STREAM_BYTES - self.total + 1))
        self.total += len(data)
        if self.total > MAX_STREAM_BYTES:
            raise Rejected('Expanded archive exceeds limit.')
        return data


def safe_name(member):
    raw = member.name
    if len(raw.encode('utf-8')) > 4096 or '\\' in raw or any(ord(c) < 32 or ord(c) == 127 for c in raw):
        raise Rejected('Invalid archive name.')
    parts = raw.split('/')
    if raw.startswith('/') or '..' in parts:
        raise Rejected('Archive path escapes release.')
    clean = [part for part in parts if part not in ('', '.')]
    if not clean:
        if member.isdir() and raw in ('.', './'):
            return None
        raise Rejected('Empty archive name.')
    if len(clean) > 16 or clean[0] == '.doneat-release-sha':
        raise Rejected('Reserved or overly deep archive name.')
    return PurePosixPath(*clean)


def extract_archive(archive, stage):
    total = 0
    entries = 0
    seen = set()
    with gzip.open(archive, 'rb') as compressed:
        bounded = BoundedReader(compressed)
        with tarfile.open(fileobj=bounded, mode='r|') as tar:
            for member in tar:
                entries += 1
                if entries > MAX_ENTRIES:
                    raise Rejected('Archive has too many entries.')
                # Do not call tar.extract/extractall. Never restore owner, mode or links.
                if member.type not in (tarfile.REGTYPE, tarfile.AREGTYPE, tarfile.DIRTYPE) or member.issparse():
                    raise Rejected('Only ordinary files and directories are allowed.')
                name = safe_name(member)
                if name is None:
                    continue
                if name in seen:
                    raise Rejected('Duplicate archive path.')
                seen.add(name)
                target = stage.joinpath(*name.parts)
                if member.isdir():
                    if member.size != 0:
                        raise Rejected('Directory has file content.')
                    target.mkdir(mode=0o755, parents=True, exist_ok=True)
                    continue
                if member.size < 0 or member.size > MAX_FILE_BYTES:
                    raise Rejected('File exceeds limit.')
                total += member.size
                if total > MAX_CONTENT_BYTES:
                    raise Rejected('Release exceeds limit.')
                target.parent.mkdir(mode=0o755, parents=True, exist_ok=True)
                source = tar.extractfile(member)
                if source is None:
                    raise Rejected('Missing file content.')
                with source, target.open('xb') as output:
                    remaining = member.size
                    while remaining:
                        data = source.read(min(1024 * 1024, remaining))
                        if not data:
                            raise Rejected('Truncated file content.')
                        output.write(data)
                        remaining -= len(data)
                    output.flush()
                    os.fsync(output.fileno())
                target.chmod(0o644)
        # Consume the remainder to check gzip integrity and bound trailing data.
        while bounded.read(1024 * 1024):
            pass
    for path in REQUIRED_FILES:
        if not stage.joinpath(path).is_file():
            raise Rejected('Missing required site file: ' + path)
    if any(stage.joinpath(locale).exists() for locale in ('en', 'zh-TW', 'zh-HK', 'ja', 'ko', 'ar')):
        raise Rejected('This receiver only accepts a China build.')
    # Only deployment directories under BASE are accessible to this script.
    for directory, _, _ in os.walk(stage, topdown=False):
        Path(directory).chmod(0o755)
        fsync_directory(Path(directory))


def current_sha():
    current = BASE / 'current'
    if not current.is_symlink():
        raise Rejected('No current deployment.')
    target = current.resolve(strict=True)
    releases = (BASE / 'releases').resolve(strict=True)
    if target.parent != releases or not target.is_dir():
        raise Rejected('Current target is outside releases.')
    sha = target.joinpath('.doneat-release-sha').read_text(encoding='ascii').strip()
    if not SHA_RE.fullmatch(sha):
        raise Rejected('Current SHA is invalid.')
    return sha


def fsync_directory(path):
    descriptor = os.open(path, os.O_RDONLY | os.O_DIRECTORY)
    try:
        os.fsync(descriptor)
    finally:
        os.close(descriptor)


def deploy(sha, stream):
    releases = BASE / 'releases'
    if not BASE.is_dir() or BASE.is_symlink() or not releases.is_dir() or releases.is_symlink():
        raise Rejected('Install real BASE and releases directories first.')
    if (BASE / 'current').exists() and not (BASE / 'current').is_symlink():
        raise Rejected('current must be a symlink, not a directory.')
    lock_fd = os.open(BASE / '.deploy.lock', os.O_CREAT | os.O_RDWR | os.O_NOFOLLOW, 0o600)
    stage = None
    archive = None
    next_link = BASE / ('.current-' + uuid.uuid4().hex)
    try:
        try:
            fcntl.flock(lock_fd, fcntl.LOCK_EX | fcntl.LOCK_NB)
        except BlockingIOError as error:
            raise Rejected('Another deployment is running.') from error
        stage = Path(tempfile.mkdtemp(prefix='.incoming-', dir=releases))
        fd, filename = tempfile.mkstemp(prefix='.archive-', dir=releases)
        archive = Path(filename)
        with os.fdopen(fd, 'wb') as output:
            received = 0
            while True:
                data = stream.read(1024 * 1024)
                if not data:
                    break
                received += len(data)
                if received > MAX_ARCHIVE_BYTES:
                    raise Rejected('Compressed archive exceeds limit.')
                output.write(data)
        extract_archive(archive, stage)
        metadata = stage / '.doneat-release-sha'
        with metadata.open('x', encoding='ascii') as output:
            output.write(sha + '\n')
            output.flush()
            os.fsync(output.fileno())
        metadata.chmod(0o644)
        fsync_directory(stage)
        # Every attempt gets a unique immutable-by-protocol release directory.
        release = releases / (sha + '-' + uuid.uuid4().hex)
        stage.rename(release)
        stage = None
        fsync_directory(releases)
        next_link.symlink_to(Path('releases') / release.name, target_is_directory=True)
        os.replace(next_link, BASE / 'current')
        fsync_directory(BASE)
        # No automatic removal: retained releases support explicit admin rollback.
        print('deployed ' + sha, flush=True)
    finally:
        next_link.unlink(missing_ok=True)
        if archive is not None:
            archive.unlink(missing_ok=True)
        if stage is not None:
            shutil.rmtree(stage)
        os.close(lock_fd)


def timeout_handler(_signum, _frame):
    raise Rejected('Deployment timed out.')


def main():
    os.umask(0o077)
    command = os.environ.get('SSH_ORIGINAL_COMMAND', '')
    if command == 'status':
        print(current_sha(), flush=True)
        return
    match = re.fullmatch(r'deploy ([0-9a-f]{40})', command)
    if not match:
        raise Rejected('Allowed commands: status, deploy <40-character Git SHA>.')
    signal.signal(signal.SIGALRM, timeout_handler)
    signal.signal(signal.SIGTERM, timeout_handler)
    signal.signal(signal.SIGINT, timeout_handler)
    signal.alarm(TIMEOUT_SECONDS)
    try:
        deploy(match.group(1), sys.stdin.buffer)
    finally:
        signal.alarm(0)


if __name__ == '__main__':
    try:
        main()
    except (Rejected, OSError, tarfile.TarError, EOFError, UnicodeError) as error:
        # Never echo a remote command, archive payload or secret.
        detail = str(error) if isinstance(error, Rejected) else 'Invalid archive or filesystem operation.'
        print('Deployment rejected: ' + detail, file=sys.stderr)
        sys.exit(1)
