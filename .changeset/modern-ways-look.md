---
'hugo-ui-shadcn': patch
---

Refactor package styles into token, base, and component-owned layers. Button now uses shadcn-style
`variant`, `tone`, and `size` variants, while Input uses slot props and class names instead of
MUI-style prop bags.
