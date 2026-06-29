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

export {
  DEMO_ACCOUNT_STORAGE_KEY,
  IDENTITY_ACCESS_TOKEN_EXPIRES_AT_STORAGE_KEY,
  IDENTITY_ACCESS_TOKEN_STORAGE_KEY,
} from './session/types';

export {
  clearStoredAccountId,
  clearStoredIdentityToken,
  readStoredIdentityAccessToken,
  readStoredAccountId,
  writeStoredIdentityToken,
  writeStoredAccountId,
} from './session/storage';

export {
  createDemoToken,
  fetchDemoAccounts,
  fetchIdentitySession,
  fetchIdentityUserInfo,
  getIdentityServiceUrl,
  IdentityServiceError,
} from './session/identityClient';
export type { FetchIdentitySessionInput, IdentityUserInfo } from './session/identityClient';

export { asHugoTheme, styled } from './theme/styled';
export type { HugoDashboardTheme } from './theme/styled';

export {
  configureAdminSessionStore,
  getCurrentOrRefreshIdentityAccessToken,
  readCurrentIdentityAccessToken,
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
export type { AdminOrganizationScopeHeaderProps } from './components/AdminOrganizationScopeHeader';
