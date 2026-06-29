/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ADMIN_CONSOLE_GRAPHQL_URL?: string;
  readonly VITE_ADMIN_BFF_GRAPHQL_URL?: string;
  readonly VITE_IDENTITY_SERVICE_URL?: string;
  readonly VITE_USER_MANAGEMENT_REMOTE_ENTRY?: string;
  readonly VITE_ORG_MANAGEMENT_REMOTE_ENTRY?: string;
  readonly VITE_USER_MANAGEMENT_REMOTE_ENTRY_URL?: string;
  readonly VITE_ORG_MANAGEMENT_REMOTE_ENTRY_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '@module-federation/vite' {
  type SharedConfig = {
    singleton?: boolean;
    allowNodeModulesSuffixMatch?: boolean;
    requiredVersion?: string;
  };

  type RemoteConfig = {
    type: 'module';
    name: string;
    entry: string;
    entryGlobalName: string;
    shareScope: string;
  };

  type FederationOptions = {
    name: string;
    dts?: false;
    remotes?: Record<string, RemoteConfig>;
    shared?: Record<string, SharedConfig>;
  };

  export function federation(options: FederationOptions): import('vite').PluginOption;
}

type AdminRemoteSessionSnapshot = {
  session: import('admin-shared').DemoSession | null;
  selectedAccountId?: string | null;
  selectedUserId?: string | null;
  loading?: boolean;
  errorMessage?: string | null;
};

type AdminRemoteSessionStore = {
  getSnapshot: () => AdminRemoteSessionSnapshot;
  subscribe?: (listener: () => void) => () => void;
  switchAccount?: (accountId: string) => void;
  selectAccount?: (accountId: string) => void;
  refetch?: () => Promise<import('admin-shared').DemoSession | undefined>;
};

type AdminRemoteRoutesProps = {
  basePath?: string;
  sessionStore?: AdminRemoteSessionStore;
};

declare module 'userManagement/Routes' {
  export const Routes: import('react').ComponentType<AdminRemoteRoutesProps>;
  export default Routes;
}

declare module 'orgManagement/Routes' {
  export const Routes: import('react').ComponentType<AdminRemoteRoutesProps>;
  export default Routes;
}
