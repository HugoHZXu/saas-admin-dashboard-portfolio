import { useMemo } from 'react';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { AdminAccountMenu, useAdminSessionStore, type AdminSessionState } from 'admin-shared';
import { PageTemplate } from '@hugo-ui/mui';
import { AccessStatePage } from '@/pages/AccessStatePage';
import { OrgManagementRemoteRoutes, UserManagementRemoteRoutes } from '@/remotes/RemoteRoutes';
import {
  AdminConsoleIcon,
  createAdminNavItems,
  emptyCapabilities,
  getDefaultAdminPath,
  getDefaultExpandedNavIds,
  getPathForNavSelection,
  getSelectedNavId,
  hasAnyAdminCapability,
} from './navConfig';

export function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const session = useAdminSessionStore((state: AdminSessionState) => state.session);
  const loading = useAdminSessionStore((state: AdminSessionState) => state.loading);
  const errorMessage = useAdminSessionStore((state: AdminSessionState) => state.errorMessage);
  const refetch = useAdminSessionStore((state: AdminSessionState) => state.refetch);
  const switchAccount = useAdminSessionStore((state: AdminSessionState) => state.switchAccount);
  const capabilities = session?.capabilities ?? emptyCapabilities;
  const accounts = session?.accounts ?? [];
  const currentAccount = session?.currentAccount ?? null;
  const hasAnyAccess = hasAnyAdminCapability(capabilities);
  const defaultPath = getDefaultAdminPath(capabilities);
  const navItems = useMemo(() => createAdminNavItems(capabilities), [capabilities]);
  const selectedNavId = getSelectedNavId(location.pathname);
  const defaultExpanded = getDefaultExpandedNavIds(location.pathname);
  const hideNav = loading || Boolean(errorMessage) || !hasAnyAccess;
  const selectedOrganizationId = searchParams.get('organizationId');

  const selectOrganization = (organizationId: string) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('organizationId', organizationId);
    setSearchParams(nextParams);
  };

  const content = (() => {
    if (loading) {
      return <AccessStatePage kind="loading" />;
    }

    if (errorMessage) {
      return <AccessStatePage kind="error" detail={errorMessage} onRetry={() => void refetch()} />;
    }

    if (!hasAnyAccess) {
      return <AccessStatePage kind="noAccess" />;
    }

    return (
      <Routes>
        <Route index element={<Navigate to={defaultPath} replace />} />
        <Route
          path="org-management/*"
          element={
            capabilities.orgManagement ? (
              <OrgManagementRemoteRoutes />
            ) : (
              <AccessStatePage
                kind="denied"
                title="No Organization Management access"
                message="The selected demo account does not include Organization Management capability."
              />
            )
          }
        />
        <Route
          path="user-management/*"
          element={
            capabilities.userManagement ? (
              <UserManagementRemoteRoutes />
            ) : (
              <AccessStatePage
                kind="denied"
                title="No User Management access"
                message="The selected demo account does not include User Management capability."
              />
            )
          }
        />
        <Route
          path="*"
          element={
            <AccessStatePage
              kind="denied"
              title="Page unavailable"
              message="Choose an available admin area from the navigation."
            />
          }
        />
      </Routes>
    );
  })();

  return (
    <PageTemplate
      appTitle="Admin Console"
      appIcon={AdminConsoleIcon}
      titleSlot={
        <AdminAccountMenu
          accounts={accounts}
          currentAccount={currentAccount}
          capabilities={capabilities}
          menuId="admin-console-account-menu"
          organizations={session?.userManagementOrganizations ?? []}
          selectedOrganizationId={selectedOrganizationId}
          loading={loading}
          errorMessage={errorMessage}
          onSwitchAccount={switchAccount}
          onSelectOrganization={selectOrganization}
        />
      }
      navProps={{
        navItems,
        defaultExpanded,
        defaultSelected: selectedNavId,
        hidden: hideNav,
        onBeforeSelection: (nextSelection, setSelection) => {
          const nextPath = getPathForNavSelection(nextSelection);

          if (!nextPath) {
            return;
          }

          setSelection();
          navigate({ pathname: nextPath, search: location.search });
        },
      }}
    >
      {content}
    </PageTemplate>
  );
}
