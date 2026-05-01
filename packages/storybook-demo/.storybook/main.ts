import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';
import { fileURLToPath } from 'url';
import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  framework: '@storybook/react-vite',
  stories: ['../src/**/*.stories.@(ts|tsx)', '../src/**/*.mdx'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-docs'],
  docs: {
    autodocs: 'tag',
  },
  async viteFinal(config) {
    // Provide a minimal process.env shim for browser builds that reference Node globals.
    config.define = { ...(config.define || {}), 'process.env': {} };
    config.resolve = config.resolve || {};
    // Ensure we can extend or create aliases regardless of existing config shape.
    const alias = config.resolve.alias || [];
    // Map hugo-ui package imports to local source for fast dev with Storybook.
    const hugoUIAliases = [
      {
        find: 'hugo-ui/styles/theme',
        replacement: path.resolve(dirname, '../../hugo-ui/src/styles/theme.ts'),
      },
      {
        find: 'hugo-ui/utils/wcagUtils',
        replacement: path.resolve(dirname, '../../hugo-ui/src/utils/wcagUtils.ts'),
      },
      {
        find: /^hugo-ui$/,
        replacement: path.resolve(dirname, '../../hugo-ui/src/index.ts'),
      },
    ];
    const hugoUIShadcnAliases = [
      {
        find: '@/',
        replacement: `${path.resolve(dirname, '../../hugo-ui-shadcn/src')}/`,
      },
      {
        find: 'hugo-ui-shadcn/styles.css',
        replacement: path.resolve(dirname, '../../hugo-ui-shadcn/src/styles/globals.css'),
      },
      {
        find: /^hugo-ui-shadcn$/,
        replacement: path.resolve(dirname, '../../hugo-ui-shadcn/src/index.ts'),
      },
    ];
    // Put our specific subpath aliases before any existing aliases.
    config.resolve.alias = Array.isArray(alias)
      ? [...hugoUIShadcnAliases, ...hugoUIAliases, ...alias]
      : [...hugoUIShadcnAliases, ...hugoUIAliases];
    config.css = config.css || {};
    config.css.postcss = {
      plugins: [tailwindcss(), autoprefixer()],
    };
    return config;
  },
};

export default config;
