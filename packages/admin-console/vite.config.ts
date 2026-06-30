import { federation } from '@module-federation/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, loadEnv } from 'vite';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const DEFAULT_USER_MANAGEMENT_REMOTE_ENTRY = 'http://127.0.0.1:5175/remoteEntry.js';
const DEFAULT_ORG_MANAGEMENT_REMOTE_ENTRY = 'http://127.0.0.1:5174/remoteEntry.js';
const DEFAULT_DEV_HOST = '127.0.0.1';
const DEFAULT_DEV_PORT = 5173;
const DEFAULT_PREVIEW_PORT = 4173;

const sharedSingleton = {
  singleton: true,
  allowNodeModulesSuffixMatch: true,
};

const readPort = (value: string | undefined, fallback: number) => {
  const parsed = Number(value);

  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
};

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, dirname, '');
  const devHost = env.VITE_ADMIN_CONSOLE_HOST ?? env.VITE_DEV_HOST ?? DEFAULT_DEV_HOST;
  const devPort = readPort(
    env.VITE_ADMIN_CONSOLE_PORT ?? env.VITE_DEV_PORT ?? env.PORT,
    DEFAULT_DEV_PORT
  );
  const previewPort = readPort(
    env.VITE_ADMIN_CONSOLE_PREVIEW_PORT ?? env.VITE_PREVIEW_PORT,
    DEFAULT_PREVIEW_PORT
  );
  const userManagementRemoteEntryUrl =
    env.VITE_USER_MANAGEMENT_REMOTE_ENTRY ??
    env.VITE_USER_MANAGEMENT_REMOTE_ENTRY_URL ??
    DEFAULT_USER_MANAGEMENT_REMOTE_ENTRY;
  const orgManagementRemoteEntryUrl =
    env.VITE_ORG_MANAGEMENT_REMOTE_ENTRY ??
    env.VITE_ORG_MANAGEMENT_REMOTE_ENTRY_URL ??
    DEFAULT_ORG_MANAGEMENT_REMOTE_ENTRY;

  return {
    plugins: [
      react(),
      federation({
        name: 'adminConsole',
        dts: false,
        remotes: {
          userManagement: {
            type: 'module',
            name: 'userManagement',
            entry: userManagementRemoteEntryUrl,
            entryGlobalName: 'userManagement',
            shareScope: 'default',
          },
          orgManagement: {
            type: 'module',
            name: 'orgManagement',
            entry: orgManagementRemoteEntryUrl,
            entryGlobalName: 'orgManagement',
            shareScope: 'default',
          },
        },
        shared: {
          react: sharedSingleton,
          'react/compiler-runtime': sharedSingleton,
          'react-dom': sharedSingleton,
          'react-dom/client': sharedSingleton,
          'react/jsx-runtime': sharedSingleton,
          'react-router-dom': sharedSingleton,
          'react-intl': sharedSingleton,
          '@apollo/client': sharedSingleton,
          '@apollo/client/react': sharedSingleton,
          '@emotion/react': sharedSingleton,
          '@emotion/styled': sharedSingleton,
          '@mui/material': sharedSingleton,
          '@mui/material/styles': sharedSingleton,
          '@mui/system': sharedSingleton,
          '@mui/utils': sharedSingleton,
          '@mui/icons-material': sharedSingleton,
          '@hugo-ui/mui': {
            ...sharedSingleton,
            requiredVersion: '1.0.3-local.1782760446428',
          },
          'admin-shared': sharedSingleton,
          zustand: sharedSingleton,
        },
      }),
    ],
    server: {
      host: devHost,
      port: devPort,
    },
    preview: {
      host: devHost,
      port: previewPort,
    },
    build: {
      target: 'esnext',
    },
    define: {
      'process.env': {},
    },
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
      ],
    },
  };
});
