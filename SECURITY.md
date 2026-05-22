# Security Policy

This repository is a public portfolio with synthetic demo data. It should not contain real secrets,
customer data, production logs, private endpoints, or internal business rules.

## Reporting Security Issues

Do not post secrets, credentials, private data, or exploitable details in a public issue.

Use GitHub private vulnerability reporting if it is enabled for this repository. If private
reporting is not available, open a minimal public issue asking for a private contact path and avoid
including sensitive details.

## Public-Safety Expectations

When reporting or fixing an issue:

- use synthetic examples and `.example` domains
- avoid screenshots that include private or identifying data
- avoid production-looking IDs, tokens, logs, endpoints, or payloads
- do not attach local `.env` files, SQLite databases, HAR files, certificates, private keys, or
  other sensitive artifacts

See `docs/desensitization-rules.md` for the repository's desensitization rules.
