import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';
import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';

const config: StorybookConfig = {
  framework: '@storybook/react-vite',
  stories: ['../src/**/*.stories.@(ts|tsx)', '../src/**/*.mdx'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-interactions',
    '@storybook/addon-links'
  ],
  docs: {
    autodocs: 'tag'
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
        replacement: path.resolve(__dirname, '../../hugo-ui/src/styles/theme.ts')
      },
      {
        find: 'hugo-ui/utils/wcagUtils',
        replacement: path.resolve(__dirname, '../../hugo-ui/src/utils/wcagUtils.ts')
      },
      {
        find: /^hugo-ui$/,
        replacement: path.resolve(__dirname, '../../hugo-ui/src/index.ts')
      }
    ];
    const myshadcnAliases = [
      {
        find: '@/',
        replacement: `${path.resolve(__dirname, '../../myshadcn/src')}/`
      },
      {
        find: 'myshadcn/styles.css',
        replacement: path.resolve(__dirname, '../../myshadcn/src/styles/globals.css')
      },
      {
        find: /^myshadcn$/,
        replacement: path.resolve(__dirname, '../../myshadcn/src/index.ts')
      }
    ];
    // Put our specific subpath aliases before any existing aliases.
    config.resolve.alias = Array.isArray(alias)
      ? [...myshadcnAliases, ...hugoUIAliases, ...alias]
      : [...myshadcnAliases, ...hugoUIAliases];
    config.css = config.css || {};
    config.css.postcss = {
      plugins: [
        tailwindcss(),
        autoprefixer()
      ]
    };
    return config;
  }
};

export default config;
