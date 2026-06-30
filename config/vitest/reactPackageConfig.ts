import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

type ViteAliasEntry = {
  find: string | RegExp;
  replacement: string;
};

type ReactPackageVitestConfigOptions = {
  dirname: string;
  aliases?: ViteAliasEntry[];
};

const sharedDedupe = [
  'react',
  'react/compiler-runtime',
  'react-dom',
  'react-intl',
  '@emotion/react',
  '@emotion/styled',
  '@mui/material',
  '@mui/system',
  'admin-shared',
];

export const createReactPackageVitestConfig = ({
  dirname,
  aliases = [],
}: ReactPackageVitestConfigOptions) => {
  return defineConfig({
    plugins: [react()],
    define: {
      'process.env': {},
    },
    test: {
      environment: 'jsdom',
      setupFiles: [path.resolve(dirname, '../../test/vitest/setup.ts')],
      clearMocks: true,
      restoreMocks: true,
      server: {
        deps: {
          inline: ['@hugo-ui/mui', 'lodash'],
        },
      },
    },
    resolve: {
      dedupe: sharedDedupe,
      alias: [
        {
          find: '@',
          replacement: path.resolve(dirname, 'src'),
        },
        ...aliases,
      ],
    },
  });
};
