import { useState, type ReactNode } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CheckIcon from '@mui/icons-material/Check';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import { Modal } from '@hugo-ui/mui';
import type { DemoAccount, DemoCapabilities, DemoOrganizationScope } from '../session/types';
import {
  selectAdminSessionAccounts,
  selectAdminSessionCapabilities,
  selectAdminSessionCurrentAccount,
  useAdminSessionStore,
} from '../session/adminSessionStore';
import type { AdminSessionStore } from '../session/adminSessionStore';
import {
  AccountList,
  AccountMenuRoot,
  AccountOption,
  AccountOptionContent,
  AccountOptionMeta,
  AccountOptionName,
  EmptyStateText,
  MenuItemLabel,
  MenuItemMeta,
  MenuItemText,
  MenuSectionTitle,
  MenuSummary,
  MenuSummaryMeta,
  MenuSummaryName,
  SelectedMark,
} from './AdminAccountMenu.styles';

const emptyCapabilities: DemoCapabilities = {
  orgManagement: false,
  userManagement: false,
};

const organizationKindLabels: Record<DemoOrganizationScope['kind'], string> = {
  internal: 'Internal organization',
  tenant: 'Tenant organization',
  public: 'Public organization',
};

export const formatDemoCapabilities = (capabilities: DemoCapabilities) => {
  const labels = [
    capabilities.orgManagement ? 'Org Management' : null,
    capabilities.userManagement ? 'User Management' : null,
  ].filter(Boolean);

  return labels.length > 0 ? labels.join(' + ') : 'No admin access';
};

export const formatDemoOrganizationKind = (organization: DemoOrganizationScope) =>
  organizationKindLabels[organization.kind];

export const formatDemoAccountMeta = (account: DemoAccount) =>
  `${account.persona} · ${formatDemoCapabilities(account.capabilities)}`;

export type AdminAccountMenuProps = {
  accounts: DemoAccount[];
  currentAccount?: DemoAccount | null;
  capabilities?: DemoCapabilities;
  organizations?: DemoOrganizationScope[];
  selectedOrganizationId?: string | null;
  loading?: boolean;
  errorMessage?: string | null;
  menuId?: string;
  modalTitle?: ReactNode;
  onSwitchAccount: (accountId: string) => void | Promise<unknown>;
  onSelectOrganization?: (organizationId: string) => void;
};

export function AdminAccountMenu({
  accounts,
  currentAccount = null,
  capabilities = currentAccount?.capabilities ?? emptyCapabilities,
  organizations = [],
  selectedOrganizationId = null,
  loading = false,
  errorMessage = null,
  menuId = 'admin-account-menu',
  modalTitle = 'Switch demo account',
  onSwitchAccount,
  onSelectOrganization,
}: AdminAccountMenuProps) {
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);
  const [accountModalOpen, setAccountModalOpen] = useState(false);

  const menuOpen = Boolean(anchorElement);
  const showOrganizationSwitcher =
    capabilities.userManagement && organizations.length > 1 && Boolean(onSelectOrganization);

  const closeMenu = () => setAnchorElement(null);

  const openAccountModal = () => {
    closeMenu();
    setAccountModalOpen(true);
  };

  const selectAccount = (accountId: string) => {
    try {
      void Promise.resolve(onSwitchAccount(accountId)).catch(() => undefined);
    } finally {
      setAccountModalOpen(false);
    }
  };

  const selectOrganization = (organizationId: string) => {
    onSelectOrganization?.(organizationId);
    closeMenu();
  };

  return (
    <AccountMenuRoot>
      <Tooltip title="Account menu">
        <IconButton
          aria-label="Open account menu"
          aria-controls={menuOpen ? menuId : undefined}
          aria-haspopup="menu"
          aria-expanded={menuOpen ? 'true' : undefined}
          color="inherit"
          onClick={(event) => setAnchorElement(event.currentTarget)}
        >
          <AccountCircleIcon />
        </IconButton>
      </Tooltip>

      <Menu
        id={menuId}
        anchorEl={anchorElement}
        open={menuOpen}
        onClose={closeMenu}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuSummary>
          <MenuSummaryName>{currentAccount?.displayName ?? 'Demo account'}</MenuSummaryName>
          <MenuSummaryMeta>
            {currentAccount ? formatDemoAccountMeta(currentAccount) : 'Loading account context'}
          </MenuSummaryMeta>
          {errorMessage && <MenuSummaryMeta>Account context unavailable.</MenuSummaryMeta>}
        </MenuSummary>

        <Divider />

        <MenuItem disabled={loading || accounts.length === 0} onClick={openAccountModal}>
          <MenuItemText>
            <MenuItemLabel>Switch account</MenuItemLabel>
            <MenuItemMeta>Choose a synthetic demo account</MenuItemMeta>
          </MenuItemText>
        </MenuItem>

        {showOrganizationSwitcher && (
          <>
            <Divider />
            <MenuSectionTitle>Organization scope</MenuSectionTitle>
            {organizations.map((organization) => (
              <MenuItem
                key={organization.id}
                selected={organization.id === selectedOrganizationId}
                onClick={() => selectOrganization(organization.id)}
              >
                <MenuItemText>
                  <MenuItemLabel>{organization.name}</MenuItemLabel>
                  <MenuItemMeta>{formatDemoOrganizationKind(organization)}</MenuItemMeta>
                </MenuItemText>
              </MenuItem>
            ))}
          </>
        )}
      </Menu>

      <Modal
        open={accountModalOpen}
        onClose={() => setAccountModalOpen(false)}
        title={modalTitle}
        type="informational"
        maxWidth="sm"
        fullWidth
      >
        <AccountList aria-label="Demo accounts">
          {accounts.length === 0 && (
            <EmptyStateText>No demo accounts are available from identity-service.</EmptyStateText>
          )}
          {accounts.map((account) => (
            <AccountOption
              key={account.id}
              type="button"
              aria-pressed={account.id === currentAccount?.id}
              onClick={() => selectAccount(account.id)}
            >
              <AccountOptionContent>
                <AccountOptionName>{account.displayName}</AccountOptionName>
                <AccountOptionMeta>{account.email}</AccountOptionMeta>
                <AccountOptionMeta>{formatDemoAccountMeta(account)}</AccountOptionMeta>
              </AccountOptionContent>
              {account.id === currentAccount?.id && (
                <SelectedMark>
                  <CheckIcon fontSize="small" aria-hidden /> Current
                </SelectedMark>
              )}
            </AccountOption>
          ))}
        </AccountList>
      </Modal>
    </AccountMenuRoot>
  );
}

export type AdminSessionAccountMenuProps = Omit<
  AdminAccountMenuProps,
  'accounts' | 'capabilities' | 'currentAccount' | 'errorMessage' | 'loading' | 'onSwitchAccount'
>;

export function AdminSessionAccountMenu(props: AdminSessionAccountMenuProps) {
  const accounts = useAdminSessionStore(selectAdminSessionAccounts);
  const currentAccount = useAdminSessionStore(selectAdminSessionCurrentAccount);
  const capabilities = useAdminSessionStore(selectAdminSessionCapabilities);
  const loading = useAdminSessionStore((state: AdminSessionStore) => state.loading);
  const errorMessage = useAdminSessionStore((state: AdminSessionStore) => state.errorMessage);
  const switchAccount = useAdminSessionStore((state: AdminSessionStore) => state.switchAccount);

  return (
    <AdminAccountMenu
      {...props}
      accounts={accounts}
      currentAccount={currentAccount}
      capabilities={capabilities}
      loading={loading}
      errorMessage={errorMessage}
      onSwitchAccount={switchAccount}
    />
  );
}
