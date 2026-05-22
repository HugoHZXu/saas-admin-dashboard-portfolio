# HugoUI

React component library for the HugoUI design system.

## Package shape

This package is structured like a publishable npm package, but this portfolio consumes it through
`pnpm` workspace links. External npm publication is intentionally out of scope for this repository,
so the package remains `private: true`.

Consumer-facing imports intentionally keep npm-style package names, as shown below.

## Usage

```tsx
import { Button, Input, HugoUIProvider, hugoUITheme } from 'hugo-ui';

export function App() {
  return (
    <HugoUIProvider theme={hugoUITheme}>
      <Button>Click</Button>
      <Input label="Name" />
    </HugoUIProvider>
  );
}
```

## Fonts (online/offline)

HugoUI can load Noto Sans automatically at runtime. By default, `HugoUIProvider` tries to load
local `@fontsource` files first (offline), and falls back to Google Fonts if they are not present.

Install the local font packages for offline use:

```bash
npm install @fontsource/noto-sans @fontsource/noto-sans-jp @fontsource/noto-sans-thai @fontsource/noto-sans-arabic
```

You can control loading behavior:

```tsx
<HugoUIProvider theme={hugoUITheme} fontLoading="auto" />
// fontLoading: 'auto' | 'local' | 'remote' | 'none'
```

## Subpath exports

```ts
import { onEnterKeyPress } from 'hugo-ui/utils/wcagUtils';
import { hugoUITheme } from 'hugo-ui/styles/theme';
```
