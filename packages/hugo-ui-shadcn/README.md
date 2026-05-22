# hugo-ui-shadcn

React component library scaffolded from the `hugo-ui` package infrastructure, but built around
Tailwind CSS and shadcn-style primitives instead of MUI.

## Package shape

This package is structured like a publishable npm package, but this portfolio consumes it through
`pnpm` workspace links. External npm publication is intentionally out of scope for this repository,
so the package remains `private: true`.

Consumer-facing imports intentionally keep npm-style package names, as shown below.

## Usage

Import the library stylesheet once in your app entry:

```tsx
import 'hugo-ui-shadcn/styles.css';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  HugoUIShadcnProvider,
  Input,
} from 'hugo-ui-shadcn';

export function App() {
  return (
    <HugoUIShadcnProvider>
      <Card>
        <CardHeader>
          <CardTitle>Workspace</CardTitle>
        </CardHeader>
        <CardContent>
          <Input label="Project name" />
          <Button className="mt-4" tone="brand" variant="solid">
            Create
          </Button>
        </CardContent>
      </Card>
    </HugoUIShadcnProvider>
  );
}
```

## Development

This package expects the consuming app to process Tailwind CSS. The distributed `styles.css`
contains the Tailwind entrypoints, design tokens, base styles, and component style imports.

Style ownership is split by layer:

- `src/styles/globals.css` is the package style entrypoint.
- `src/styles/tokens.css` owns Hugo UI color roles and Tailwind theme variables.
- `src/styles/base.css` owns only the baseline reset.
- Simple components such as `Button` keep their default variants in `cva`. Button uses
  `variant`, `tone`, and `size` variants, with component tokens defined in `tokens.css`.
- Button exposes `data-slot`, `data-variant`, `data-tone`, `data-size`, `data-loading`,
  `data-icon-only`, and `data-disabled` as its public styling contract. Compose icons as
  children and use Tailwind utilities such as `w-full` through `className`.
- Compound components can expose stable styling hooks. `Input` uses
  `data-component="hugo-input"` with slots such as `root`, `label`, `control`, `input`,
  `textarea`, `adornment`, `helper`, `counter`, `status`, `spinner`, and `required-mark`.
  Input customization uses `slotProps` for native attributes and `classNames` for slot-level
  styling.
