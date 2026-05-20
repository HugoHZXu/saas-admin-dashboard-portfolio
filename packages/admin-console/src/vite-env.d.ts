/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ADMIN_CONSOLE_GRAPHQL_URL?: string;
  readonly VITE_ADMIN_BFF_GRAPHQL_URL?: string;
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

declare module 'admin-shared' {
  export type DemoOrganizationKind = 'INTERNAL' | 'TENANT' | 'PUBLIC';
  export type DemoOrganizationStatus = 'active' | 'inactive' | 'archived';

  export type DemoRole = {
    id?: string | null;
    key: string;
    name: string;
  };

  export type DemoCapabilities = {
    orgManagement: boolean;
    userManagement: boolean;
  };

  export type DemoOrganizationScope = {
    id: string;
    name: string;
    kind: DemoOrganizationKind;
    status: DemoOrganizationStatus;
  };

  export type DemoAccountMembership = {
    organization: DemoOrganizationScope;
    roles: DemoRole[];
  };

  export type DemoAccount = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    displayName: string;
    persona: string;
    memberships: DemoAccountMembership[];
    capabilities: DemoCapabilities;
    userManagementOrganizations: DemoOrganizationScope[];
  };

  export type DemoSession = {
    accounts: DemoAccount[];
    currentAccount: DemoAccount;
    capabilities: DemoCapabilities;
    userManagementOrganizations: DemoOrganizationScope[];
  };

  export type AdminSessionRefetch = () => Promise<DemoSession | undefined>;

  export type AdminSessionStatePatch = {
    session?: DemoSession | null;
    loading?: boolean;
    errorMessage?: string | null;
    selectedAccountId?: string | null;
    refetch?: AdminSessionRefetch;
  };

  export type AdminSessionState = {
    session: DemoSession | null;
    loading: boolean;
    errorMessage: string | null;
    selectedAccountId: string | null;
    refetch: AdminSessionRefetch;
    switchAccount: (accountId: string) => Promise<DemoSession | undefined>;
    setSelectedAccountId: (accountId: string | null) => void;
    setSessionState: (nextState: AdminSessionStatePatch) => void;
    reset: () => void;
  };

  export type AdminAccountMenuProps = {
    accounts: DemoAccount[];
    currentAccount?: DemoAccount | null;
    capabilities?: DemoCapabilities;
    organizations?: DemoOrganizationScope[];
    selectedOrganizationId?: string | null;
    loading?: boolean;
    errorMessage?: string | null;
    menuId?: string;
    modalTitle?: import('react').ReactNode;
    onSwitchAccount: (accountId: string) => void | Promise<unknown>;
    onSelectOrganization?: (organizationId: string) => void;
  };

  export function AdminAccountMenu(
    props: AdminAccountMenuProps
  ): import('react').ReactElement;

  export const useAdminSessionStore: {
    <T>(selector: (state: AdminSessionState) => T): T;
    getState: () => AdminSessionState;
    subscribe: (
      listener: (state: AdminSessionState, previousState: AdminSessionState) => void
    ) => () => void;
  };
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
