"""Package all generated routes and their local assets; never runs a browser."""
import hashlib
import json
import re
import subprocess
import sys
import zipfile
from html.parser import HTMLParser
from pathlib import Path, PurePosixPath
from urllib.parse import unquote, urlsplit

repo = Path(__file__).resolve().parents[1]
dist = repo / "dist"
output = Path(sys.argv[1]).resolve()
bundles = [Path(p).resolve() for p in sys.argv[2:]]
locales = json.loads((repo / "locales/hall.json").read_text())["locales"]
commit = subprocess.check_output(["git", "rev-parse", "HEAD"], cwd=repo, text=True).strip()

def included(path):
    rel = path.relative_to(dist).as_posix()
    # Raw capture inputs are unused by built pages. Keep optimized recordings.
    if rel.startswith("device/") and not rel.startswith("device/web/"):
        return False
    if rel.startswith("desktop-demo/") and path.suffix != ".mp4":
        return False
    # macOS cloud sync produced these unreferenced duplicate output files.
    if " 2." in path.name:
        return False
    return True

files = {p.relative_to(dist).as_posix(): p for p in dist.rglob("*") if p.is_file() and included(p)}
html_files = sorted(name for name in files if name.endswith(".html"))
assert len(html_files) >= 121, f"incomplete build: {len(html_files)} HTML outputs"
for locale in locales:
    assert f"{locale}/index.html" in files, f"missing language route {locale}"

references = []
def local_ref(url, owner):
    if not url or url.startswith(("#", "data:", "mailto:", "tel:", "javascript:")):
        return
    split = urlsplit(url)
    if split.scheme or split.netloc:
        return
    path = unquote(split.path)
    if not path:
        return
    candidate = PurePosixPath(path.lstrip("/")) if path.startswith("/") else PurePosixPath(owner).parent / path
    import posixpath
    target = posixpath.normpath(str(candidate))
    if target == ".":
        target = "index.html"
    choices = [target, target.rstrip("/") + "/index.html"]
    found = next((c for c in choices if c in files), None)
    assert found, f"local reference absent from package: {owner} -> {url}"
    references.append({"owner": owner, "reference": url, "target": found})

class References(HTMLParser):
    def __init__(self, owner):
        super().__init__()
        self.owner = owner
    def handle_starttag(self, tag, attributes):
        for key, value in attributes:
            if key in {"src", "poster", "data-src", "data-poster", "href"}:
                local_ref(value, self.owner)
            elif key == "srcset" and value:
                for entry in value.split(","):
                    local_ref(entry.strip().split()[0], self.owner)

for name in html_files:
    parser = References(name)
    parser.feed(files[name].read_text())
for name, path in files.items():
    if path.suffix == ".css":
        for url in re.findall(r"url\(\s*['\"]?([^)'\"\s]+)", path.read_text()):
            local_ref(url, name)
    elif path.suffix == ".js":
        for url in re.findall(r"(?:from\s*|import\s*\(|import\s*)['\"]([^'\"]+)['\"]", path.read_text()):
            if url.startswith((".", "/")):
                local_ref(url, name)

source_names = subprocess.check_output(["git", "diff", "--name-only", "fdbcc7d50293053c1994daddc40a8054bc25789a..HEAD"], cwd=repo, text=True).splitlines()
manifest = {
    "commit": commit,
    "branch": "codex/home-time-transition",
    "generatedHtmlOutputs": len(html_files),
    "generatedHtmlPaths": html_files,
    "homepageLocales": locales,
    "previewFiles": len(files),
    "checkedLocalReferences": len(references),
    "referenceKinds": ["HTML href/src/srcset/poster/data-src", "CSS url", "JavaScript static relative imports"],
    "verification": "source/generated output only; v2 browser screenshots and interaction checks pending",
}
report = output.parent / "DoneAt-home-v2-preview-manifest.json"
report.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n")
readme = f"""DoneAt home v2 — localized review build

Source commit: {commit}
Branch: codex/home-time-transition
Base review commit: fdbcc7d50293053c1994daddc40a8054bc25789a

This archive contains {len(html_files)} generated HTML outputs, all 19 homepage routes,
all language-menu destinations, and their local assets. It includes source bundles,
the changed source files, verification records and the v2 scope/limitations report.
It does not contain a new v2 browser screenshot. Browser review remains pending.

Local preview (from the extracted archive directory):
python3 -m http.server 4326 --bind 127.0.0.1 --directory preview
Open http://localhost:4326/zh-CN/ or /en/ or /ar/.
The static server does not reproduce production root-language redirects or headers.
Do not publish this archive as the production site.

Source recovery from an existing checkout based on main 00a706d:
git bundle verify source/DoneAt-redesign.bundle
git fetch source/DoneAt-redesign.bundle codex/award-quality-redesign:codex/award-quality-redesign
git bundle verify source/DoneAt-home-v2-localized.bundle
git fetch source/DoneAt-home-v2-localized.bundle codex/home-time-transition:codex/home-time-transition
Use an isolated worktree for review to protect any local edits.

The original prototype commit 787e7daa and first design fdbcc7d5 remain recoverable.
No main merge, push, public PR, deployment or privacy-branch merge was performed.
See review/HOME-LOCALIZATION.md for checks and remaining browser/translation review.
"""

temporary = output.with_name(output.name + ".part")
output.parent.mkdir(parents=True, exist_ok=True)
with zipfile.ZipFile(temporary, "w", compression=zipfile.ZIP_STORED) as archive:
    archive.writestr("README.txt", readme)
    archive.writestr("manifest.json", json.dumps(manifest, ensure_ascii=False, indent=2))
    for name, path in sorted(files.items()):
        archive.write(path, "preview/" + name)
    for name in source_names:
        path = repo / name
        if path.is_file():
            archive.write(path, "source/changed-files/" + name)
    for path in bundles:
        archive.write(path, "source/" + path.name)
    for path in sorted((repo / "review").glob("*")):
        if path.is_file() and (path.name.startswith("home-v2-") or path.name in {"HOME-LOCALIZATION.md", "HOME-PROTOTYPE.md", "check-home-content.mjs", "parse-built-home.py", "package-home-v2.py"}):
            archive.write(path, "review/" + path.name)
with zipfile.ZipFile(temporary) as archive:
    assert archive.testzip() is None, "ZIP CRC failed"
    assert all("preview/" + route in archive.namelist() for route in html_files)
temporary.replace(output)
manifest["zipBytes"] = output.stat().st_size
manifest["zipSha256"] = hashlib.sha256(output.read_bytes()).hexdigest()
report.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n")
print(json.dumps({"file": str(output), "html": len(html_files), "locales": len(locales), "references": len(references), "files": len(files), "bytes": output.stat().st_size, "crc": "passed", "commit": commit}))
