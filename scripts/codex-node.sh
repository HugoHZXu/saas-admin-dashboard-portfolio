#!/usr/bin/env bash
set -euo pipefail

export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
script_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
repo_root="$(cd -- "$script_dir/.." && pwd)"

if [ -s "$NVM_DIR/nvm.sh" ]; then
  # nvm is a shell function, so non-interactive Codex command sessions must source it explicitly.
  # The repo does not pin .nvmrc; use the caller's active Node, or nvm default when available.
  # shellcheck source=/dev/null
  . "$NVM_DIR/nvm.sh"
  if [ -z "${CODEX_SKIP_NVM_USE:-}" ]; then
    nvm use "${CODEX_NODE_VERSION:-default}" >/dev/null
  fi
fi

if [ "${1:-}" = "pnpm" ]; then
  shift
  if command -v corepack >/dev/null 2>&1; then
    shim_dir="$(mktemp -d "${TMPDIR:-/tmp}/codex-pnpm.XXXXXX")"
    cat >"$shim_dir/pnpm" <<'EOF'
#!/usr/bin/env bash
exec corepack pnpm "$@"
EOF
    chmod +x "$shim_dir/pnpm"
    export PATH="$shim_dir:$PATH"
    exec corepack pnpm "$@"
  fi

  package_manager="$(ROOT_PACKAGE_JSON="$repo_root/package.json" node -p "require(process.env.ROOT_PACKAGE_JSON).packageManager || ''")"
  pnpm_version="${package_manager#pnpm@}"

  if [ -z "$pnpm_version" ] || [ "$pnpm_version" = "$package_manager" ]; then
    echo "packageManager must be set to pnpm@<version> before bootstrapping pnpm" >&2
    exit 1
  fi

  exec npm exec --yes --package="pnpm@$pnpm_version" -- pnpm "$@"
fi

exec "$@"
