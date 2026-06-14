export type {
  DemoAccount,
  DemoAccountMembership,
  DemoCapabilities,
  DemoOrganizationKind,
  DemoOrganizationScope,
  DemoOrganizationStatus,
  DemoRole,
  DemoSession,
  OrganizationKind,
  OrganizationStatus,
} from './session/types';

export { DEMO_ACCOUNT_STORAGE_KEY } from './session/types';

export {
  clearStoredAccountId,
  readStoredAccountId,
  writeStoredAccountId,
} from './session/storage';

export { asHugoTheme, styled } from './theme/styled';
export type { HugoDashboardTheme } from './theme/styled';

export {
  configureAdminSessionStore,
  resetAdminSessionStore,
  selectAdminSessionAccounts,
  selectAdminSessionCapabilities,
  selectAdminSessionCurrentAccount,
  useAdminSessionStore,
} from './session/adminSessionStore';
export type {
  AdminSessionFetchInput,
  AdminSessionFetcher,
  AdminSessionRefetch,
  AdminSessionSetState,
  AdminSessionState,
  AdminSessionStatePatch,
  AdminSessionStore,
  AdminSessionStoreSnapshot,
} from './session/adminSessionStore';

export {
  AdminAccountMenu,
  AdminSessionAccountMenu,
  formatDemoAccountMeta,
  formatDemoCapabilities,
  formatDemoOrganizationKind,
} from './components/AdminAccountMenu';
export type {
  AdminAccountMenuProps,
  AdminSessionAccountMenuProps,
} from './components/AdminAccountMenu';

export { AdminOrganizationScopeHeader } from './components/AdminOrganizationScopeHeader';
export type {
  AdminOrganizationScopeHeaderProps,
} from './components/AdminOrganizationScopeHeader';
