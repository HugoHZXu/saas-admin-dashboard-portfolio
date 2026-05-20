import { AdminAccountMenu } from 'admin-shared';
import { useOrganizationScope } from '@/features/scope/OrganizationScopeContext';
import { useDemoSession } from './DemoSessionContext';

export function AccountMenu() {
  const { accounts, currentAccount, capabilities, loading, errorMessage, switchAccount } =
    useDemoSession();
  const { organizations, selectedOrganizationId, setSelectedOrganizationId } =
    useOrganizationScope();

  return (
    <AdminAccountMenu
      accounts={accounts}
      currentAccount={currentAccount}
      capabilities={capabilities}
      organizations={organizations}
      selectedOrganizationId={selectedOrganizationId}
      loading={loading}
      errorMessage={errorMessage}
      menuId="user-management-account-menu"
      onSwitchAccount={switchAccount}
      onSelectOrganization={setSelectedOrganizationId}
    />
  );
}
