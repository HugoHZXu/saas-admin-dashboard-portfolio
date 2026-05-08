import { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CheckIcon from '@mui/icons-material/Check';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import { Modal } from 'hugo-ui';
import { DemoAccount, DemoCapabilities, DemoOrganizationScope } from '@/api/types';
import { useOrganizationScope } from '@/features/scope/OrganizationScopeContext';
import { useDemoSession } from './DemoSessionContext';
import {
  AccountList,
  AccountMenuRoot,
  AccountOption,
  AccountOptionContent,
  AccountOptionMeta,
  AccountOptionName,
  EmptyStateText,
  MenuItemIcon,
  MenuItemLabel,
  MenuItemMeta,
  MenuItemText,
  MenuSectionTitle,
  MenuSummary,
  MenuSummaryMeta,
  MenuSummaryName,
  SelectedMark,
} from './AccountMenu.styles';

const formatCapabilities = (capabilities: DemoCapabilities) => {
  const labels = [
    capabilities.orgManagement ? 'Org Management' : null,
    capabilities.userManagement ? 'User Management' : null,
  ].filter(Boolean);

  return labels.length > 0 ? labels.join(' + ') : 'No admin access';
};

const organizationKindLabels: Record<DemoOrganizationScope['kind'], string> = {
  INTERNAL: 'Internal organization',
  TENANT: 'Tenant organization',
  PUBLIC: 'Public organization',
};

const formatOrganizationKind = (organization: DemoOrganizationScope) =>
  organizationKindLabels[organization.kind];

const formatAccountMeta = (account: DemoAccount) =>
  `${account.persona} · ${formatCapabilities(account.capabilities)}`;

export function AccountMenu() {
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const { accounts, currentAccount, capabilities, loading, errorMessage, switchAccount } =
    useDemoSession();
  const { organizations, selectedOrganizationId, setSelectedOrganizationId } =
    useOrganizationScope();

  const menuOpen = Boolean(anchorElement);
  const showOrganizationSwitcher = capabilities.userManagement && organizations.length > 1;

  const closeMenu = () => setAnchorElement(null);

  const openAccountModal = () => {
    closeMenu();
    setAccountModalOpen(true);
  };

  const selectAccount = (accountId: string) => {
    switchAccount(accountId);
    setAccountModalOpen(false);
  };

  const selectOrganization = (organizationId: string) => {
    setSelectedOrganizationId(organizationId);
    closeMenu();
  };

  return (
    <AccountMenuRoot>
      <Tooltip title="Account menu">
        <IconButton
          aria-label="Open account menu"
          aria-controls={menuOpen ? 'user-management-account-menu' : undefined}
          aria-haspopup="menu"
          aria-expanded={menuOpen ? 'true' : undefined}
          color="inherit"
          onClick={(event) => setAnchorElement(event.currentTarget)}
        >
          <AccountCircleIcon />
        </IconButton>
      </Tooltip>

      <Menu
        id="user-management-account-menu"
        anchorEl={anchorElement}
        open={menuOpen}
        onClose={closeMenu}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuSummary>
          <MenuSummaryName>{currentAccount?.displayName ?? 'Demo account'}</MenuSummaryName>
          <MenuSummaryMeta>
            {currentAccount ? formatAccountMeta(currentAccount) : 'Loading account context'}
          </MenuSummaryMeta>
          {errorMessage && <MenuSummaryMeta>Account context unavailable.</MenuSummaryMeta>}
        </MenuSummary>

        <Divider />

        <MenuItem disabled={loading || accounts.length === 0} onClick={openAccountModal}>
          <MenuItemIcon>
            <SwapHorizIcon />
          </MenuItemIcon>
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
                  <MenuItemMeta>{formatOrganizationKind(organization)}</MenuItemMeta>
                </MenuItemText>
              </MenuItem>
            ))}
          </>
        )}
      </Menu>

      <Modal
        open={accountModalOpen}
        onClose={() => setAccountModalOpen(false)}
        title="Switch demo account"
        type="informational"
        maxWidth="sm"
        fullWidth
      >
        <AccountList aria-label="Demo accounts">
          {accounts.length === 0 && (
            <EmptyStateText>No demo accounts are available from the admin BFF.</EmptyStateText>
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
                <AccountOptionMeta>{formatAccountMeta(account)}</AccountOptionMeta>
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
