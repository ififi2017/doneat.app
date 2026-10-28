#!/usr/bin/env bash
# No remote shell or scp: only the root-installed forced-command receiver.
set -euo pipefail
umask 077

fail() { printf '%s\n' "$1" >&2; exit 1; }
[[ ${SITE_REGION:-} == cn ]] || fail 'SITE_REGION must be cn.'
[[ ${SITE_ORIGIN:-} == https://doneat.com.cn ]] || fail 'SITE_ORIGIN must be https://doneat.com.cn.'
[[ ${DEPLOY_HOST:-} =~ ^[A-Za-z0-9][A-Za-z0-9.-]*$ ]] || fail 'Invalid DEPLOY_HOST (DNS name or IPv4 required).'
[[ ${DEPLOY_USER:-} =~ ^[a-z_][a-z0-9_-]*$ ]] || fail 'Invalid DEPLOY_USER.'
DEPLOY_PORT=${DEPLOY_PORT:-22}
[[ $DEPLOY_PORT =~ ^[0-9]{1,5}$ ]] || fail 'Invalid DEPLOY_PORT.'
(( 10#$DEPLOY_PORT >= 1 && 10#$DEPLOY_PORT <= 65535 )) || fail 'DEPLOY_PORT is out of range.'
DEPLOY_SHA=${DEPLOY_SHA:-$(git rev-parse HEAD)}
[[ $DEPLOY_SHA =~ ^[0-9a-f]{40}$ ]] || fail 'DEPLOY_SHA must be a full lowercase Git SHA.'
[[ -d dist && ! -L dist ]] || fail 'Build dist/ first.'
for required in zh-CN/index.html zh-CN/download/index.html zh-CN/about/index.html zh-CN/faq/index.html zh-CN/privacy/index.html zh-CN/how-it-works/index.html 404.html robots.txt sitemap-index.xml; do
  [[ -f dist/$required && ! -L dist/$required ]] || fail "Missing build file: $required"
done
# Never package links, devices, sockets, or FIFOs, even for manual local builds.
[[ -z $(find dist ! -type f ! -type d -print -quit) ]] || fail 'dist/ contains a non-regular file.'

task_temp=$(mktemp -d "${RUNNER_TEMP:-${TMPDIR:-/tmp}}/doneat-deploy.XXXXXXXX")
cleanup() { rm -rf -- "$task_temp"; }
trap cleanup EXIT
trap 'exit 130' INT
trap 'exit 143' TERM

if [[ -n ${SSH_PRIVATE_KEY_FILE:-} ]]; then
  [[ -f $SSH_PRIVATE_KEY_FILE ]] || fail 'SSH_PRIVATE_KEY_FILE does not exist.'
  cp -- "$SSH_PRIVATE_KEY_FILE" "$task_temp/key"
else
  [[ -n ${SSH_PRIVATE_KEY:-} ]] || fail 'SSH_PRIVATE_KEY or SSH_PRIVATE_KEY_FILE is required.'
  printf '%s\n' "$SSH_PRIVATE_KEY" > "$task_temp/key"
fi
if [[ -n ${SSH_KNOWN_HOSTS_FILE:-} ]]; then
  [[ -s $SSH_KNOWN_HOSTS_FILE ]] || fail 'SSH_KNOWN_HOSTS_FILE is empty or missing.'
  cp -- "$SSH_KNOWN_HOSTS_FILE" "$task_temp/known_hosts"
else
  [[ -n ${SSH_KNOWN_HOSTS:-} ]] || fail 'SSH_KNOWN_HOSTS or SSH_KNOWN_HOSTS_FILE is required.'
  printf '%s\n' "$SSH_KNOWN_HOSTS" > "$task_temp/known_hosts"
fi
chmod 600 "$task_temp/key" "$task_temp/known_hosts"
unset SSH_PRIVATE_KEY SSH_KNOWN_HOSTS
ssh_options=(-T -p "$DEPLOY_PORT" -i "$task_temp/key" -F /dev/null
  -o BatchMode=yes -o IdentitiesOnly=yes -o StrictHostKeyChecking=yes
  -o "UserKnownHostsFile=$task_temp/known_hosts" -o GlobalKnownHostsFile=/dev/null
  -o PasswordAuthentication=no -o KbdInteractiveAuthentication=no
  -o ConnectTimeout=15 -o ServerAliveInterval=15 -o ServerAliveCountMax=3
  -o ClearAllForwardings=yes -o LogLevel=ERROR)
# SHA and destination have strict whitelists above; the remote command is not user text.
tar -czf "$task_temp/site.tar.gz" -C dist .
ssh "${ssh_options[@]}" "$DEPLOY_USER@$DEPLOY_HOST" "deploy $DEPLOY_SHA" < "$task_temp/site.tar.gz"
current_sha=$(ssh "${ssh_options[@]}" "$DEPLOY_USER@$DEPLOY_HOST" status < /dev/null)
[[ $current_sha == "$DEPLOY_SHA" ]] || fail 'Receiver status does not match the deployed SHA.'
printf 'China site deployed: %s\n' "$current_sha"
