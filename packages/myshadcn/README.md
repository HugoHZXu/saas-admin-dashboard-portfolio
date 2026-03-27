# myshadcn

React component library scaffolded from the `hugo-ui` package infrastructure, but built around
Tailwind CSS and shadcn-style primitives instead of MUI.

## Install

```bash
npm install myshadcn
```

## Usage

Import the library stylesheet once in your app entry:

```tsx
import 'myshadcn/styles.css';
import { Button, Card, CardContent, CardHeader, CardTitle, Input, MyShadcnProvider } from 'myshadcn';

export function App() {
  return (
    <MyShadcnProvider>
      <Card>
        <CardHeader>
          <CardTitle>Workspace</CardTitle>
        </CardHeader>
        <CardContent>
          <Input placeholder="Project name" />
          <Button className="mt-4">Create</Button>
        </CardContent>
      </Card>
    </MyShadcnProvider>
  );
}
```

## Development

This package expects the consuming app to process Tailwind CSS. The distributed `styles.css`
contains the Tailwind entrypoints and design tokens used by the components.
