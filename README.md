# UI Demo Monorepo

Vite + React + TypeScript monorepo powered by npm workspaces. Includes a small component library (`hugo-ui`) and a Storybook demo.

## Quick start

```bash
npm install
npm run storybook
```

Open http://localhost:6006 to view the stories.

## Packages

- `packages/hugo-ui`: React component library
- `packages/storybook-demo`: Storybook app showcasing `hugo-ui`

## Theme provider usage

Use `HugoUIProvider` at the app root to inject the theme once:

```tsx
import { HugoUIProvider, hugoUITheme } from 'hugo-ui';

function App() {
  return (
    <HugoUIProvider theme={hugoUITheme}>
      {/* app components */}
    </HugoUIProvider>
  );
}
```

If you already have a custom MUI theme, pass it in to merge:

```tsx
import { createTheme } from '@mui/material/styles';
import { HugoUIProvider, hugoUITheme } from 'hugo-ui';

const baseTheme = createTheme({
  // your theme overrides
});

function App() {
  return (
    <HugoUIProvider theme={baseTheme}>
      {/* app components */}
    </HugoUIProvider>
  );
}
```

## Lint and format

```bash
npm run lint
npm run format
```

## Chromatic

Copy `.env.example` to `.env` and provide your token:

```bash
CHROMATIC_PROJECT_TOKEN=your_token_here
```

Then run:

```bash
npm -w packages/storybook-demo run chromatic
```
