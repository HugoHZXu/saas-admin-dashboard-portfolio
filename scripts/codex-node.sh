#!/usr/bin/env bash
set -euo pipefail

export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
script_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
repo_root="$(cd -- "$script_dir/.." && pwd)"

if [ -s "$NVM_DIR/nvm.sh" ]; then
  # nvm is a shell function, so non-interactive Codex command sessions must source it explicitly.
  # shellcheck source=/dev/null
  . "$NVM_DIR/nvm.sh"
else
  echo "nvm.sh not found at $NVM_DIR/nvm.sh" >&2
  exit 1
fi

if [ -f "$repo_root/.nvmrc" ]; then
  nvm use "$(cat "$repo_root/.nvmrc")" >/dev/null
else
  nvm use 22.12.0 >/dev/null
fi

if [ "${1:-}" = "pnpm" ] && ! command -v pnpm >/dev/null 2>&1; then
  package_manager="$(ROOT_PACKAGE_JSON="$repo_root/package.json" node -p "require(process.env.ROOT_PACKAGE_JSON).packageManager || ''")"
  pnpm_version="${package_manager#pnpm@}"

  if [ -z "$pnpm_version" ] || [ "$pnpm_version" = "$package_manager" ]; then
    echo "packageManager must be set to pnpm@<version> before bootstrapping pnpm" >&2
    exit 1
  fi

  shift
  exec npm exec --yes --package="pnpm@$pnpm_version" -- pnpm "$@"
fi

exec "$@"
