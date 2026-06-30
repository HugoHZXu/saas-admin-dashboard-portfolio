# Contributing

Hugo SaaS Console is a frontend portfolio project using synthetic demo data. Contributions should keep the code clean, package boundaries clear, and demo data generic.

## Good contributions

- Focused fixes to dashboard pages, shared utilities, or documentation
- Documentation improvements that clarify architecture or setup
- New demo data or UI improvements that stay generic and B2B SaaS-themed
- Small workflow refinements that respect existing package boundaries

## Out of scope

- Real customer data, production credentials, private endpoints, or internal business logic
- Large-scale rewrites that blur package responsibilities
- Turning this portfolio into a complete production SaaS platform
- Changes to the Hugo UI design system — those belong in the [hugo-ui](https://github.com/HugoHZXu/hugo-ui) repository

## Local setup

```bash
pnpm install
```

See [README.md](README.md#getting-started) for full setup instructions including the backend.

## Validation

Use the smallest validation scope that covers your change:

| Change type | Command |
|-------------|---------|
| Documentation only | `git diff --check` |
| Single dashboard package | Run typecheck + build for that package |
| Cross-package or shared utilities | `pnpm run verify` |

Do not commit generated files (`dist/`, `coverage/`), local SQLite databases, or `.env` files.

## Pull request checklist

- Keep changes scoped to one package or area — avoid unrelated cleanup
- List which validation commands you ran
- Note any areas that couldn't be fully verified
