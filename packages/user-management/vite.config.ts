import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {},
  },
  resolve: {
    dedupe: [
      'react',
      'react-dom',
      'react-intl',
      '@emotion/react',
      '@emotion/styled',
      '@mui/material',
      '@mui/system',
    ],
    alias: [
      {
        find: '@',
        replacement: path.resolve(dirname, 'src'),
      },
      {
        find: 'hugo-ui/styles/theme',
        replacement: path.resolve(dirname, '../hugo-ui/src/styles/theme.ts'),
      },
      {
        find: 'hugo-ui/utils/wcagUtils',
        replacement: path.resolve(dirname, '../hugo-ui/src/utils/wcagUtils.ts'),
      },
      {
        find: /^hugo-ui$/,
        replacement: path.resolve(dirname, '../hugo-ui/src/index.ts'),
      },
    ],
  },
});
