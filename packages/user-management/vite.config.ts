import { federation } from '@module-federation/vite';
import babel from '@rolldown/plugin-babel';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, loadEnv } from 'vite';
import { getHugoUiSourceLink } from '../../config/vite/hugoUiSourceLink';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_DEV_HOST = '127.0.0.1';
const DEFAULT_DEV_PORT = 5175;
const DEFAULT_PREVIEW_PORT = 4175;
const reactCompilerConfig = {
  target: '19',
  compilationMode: 'annotation',
  panicThreshold: 'none',
} as const;

const sharedSingleton = {
  singleton: true,
  allowNodeModulesSuffixMatch: true,
};

const readPort = (value: string | undefined, fallback: number) => {
  const parsed = Number(value);

  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
};

export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, dirname, '');
  const hugoUiSourceLink =
    command === 'serve' ? getHugoUiSourceLink(dirname) : { enabled: false, aliases: [] };
  const devHost = env.VITE_USER_MANAGEMENT_HOST ?? env.VITE_DEV_HOST ?? DEFAULT_DEV_HOST;
  const devPort = readPort(
    env.VITE_USER_MANAGEMENT_PORT ?? env.VITE_DEV_PORT ?? env.PORT,
    DEFAULT_DEV_PORT
  );
  const previewPort = readPort(
    env.VITE_USER_MANAGEMENT_PREVIEW_PORT ?? env.VITE_PREVIEW_PORT,
    DEFAULT_PREVIEW_PORT
  );
  const devOrigin =
    env.VITE_USER_MANAGEMENT_DEV_ORIGIN ?? env.VITE_DEV_ORIGIN ?? `http://${devHost}:${devPort}`;

  return {
    plugins: [
      react(),
      babel({
        presets: [reactCompilerPreset(reactCompilerConfig)],
      }),
      federation({
        name: 'userManagement',
        filename: 'remoteEntry.js',
        dts: false,
        exposes: {
          './Routes': './src/remote/Routes.tsx',
        },
        shared: {
          react: sharedSingleton,
          'react/compiler-runtime': sharedSingleton,
          'react-dom': sharedSingleton,
          'react-dom/client': sharedSingleton,
          'react/jsx-runtime': sharedSingleton,
          'react-router-dom': sharedSingleton,
          '@apollo/client': sharedSingleton,
          '@apollo/client/react': sharedSingleton,
          'react-intl': sharedSingleton,
          '@emotion/react': sharedSingleton,
          '@emotion/styled': sharedSingleton,
          '@mui/material': sharedSingleton,
          '@mui/material/styles': sharedSingleton,
          '@mui/system': sharedSingleton,
          '@mui/utils': sharedSingleton,
          '@mui/icons-material': sharedSingleton,
          '@hugo-ui/mui': {
            ...sharedSingleton,
            requiredVersion: '1.0.2',
          },
          'admin-shared': sharedSingleton,
          zustand: sharedSingleton,
        },
      }),
    ],
    define: {
      'process.env': {},
    },
    server: {
      host: devHost,
      port: devPort,
      origin: devOrigin,
    },
    preview: {
      host: devHost,
      port: previewPort,
    },
    ...(hugoUiSourceLink.enabled
      ? {
          optimizeDeps: {
            exclude: ['@hugo-ui/mui'],
          },
        }
      : {}),
    resolve: {
      dedupe: [
        'react',
        'react/compiler-runtime',
        'react-dom',
        'react-intl',
        '@emotion/react',
        '@emotion/styled',
        '@mui/material',
        '@mui/system',
        'admin-shared',
      ],
      alias: [
        {
          find: '@',
          replacement: path.resolve(dirname, 'src'),
        },
        ...hugoUiSourceLink.aliases,
      ],
    },
  };
});
