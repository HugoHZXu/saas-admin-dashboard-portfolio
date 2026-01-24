# HugoUI

React component library for the HugoUI design system.

## Install

```bash
npm install hugo-ui
```

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

## Subpath exports

```ts
import { onEnterKeyPress } from 'hugo-ui/utils/wcagUtils';
import { hugoUITheme } from 'hugo-ui/styles/theme';
```
