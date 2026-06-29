import { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import { Modal } from '@hugo-ui/mui';
import { useDemoSession } from './DemoSessionContext';
import { DemoAccount } from './demoSessionTypes';
import {
  AccountList,
  AccountMenuHeader,
  AccountMenuName,
  AccountMenuRoot,
  AccountMenuText,
  AccountModalBody,
  AccountModalIntro,
  AccountOption,
  AccountOptionDetail,
  AccountOptionHeader,
  AccountOptionName,
  AccountOptionPersona,
  AccountTriggerMeta,
  AccountTriggerName,
  AccountTriggerSummary,
} from './AccountMenu.styles';

const formatRoleLabel = (account: DemoAccount) => {
  const roleNames = account.memberships.flatMap((membership) =>
    membership.roles.map((role) => role.name)
  );
  const uniqueRoleNames = Array.from(new Set(roleNames));

  return uniqueRoleNames.length > 0 ? uniqueRoleNames.join(', ') : 'No admin role';
};

type UserManagementOrganizationKind = DemoAccount['userManagementOrganizations'][number]['kind'];

const organizationKindLabels: Record<UserManagementOrganizationKind, string> = {
  internal: 'Internal organization',
  tenant: 'Tenant organization',
  public: 'Public organization',
};

const formatScopeLabel = (account: DemoAccount) => {
  if (account.userManagementOrganizations.length === 0) {
    return 'No User Management scope';
  }

  if (account.userManagementOrganizations.length === 1) {
    const organization = account.userManagementOrganizations[0];

    return `User Management scope: ${organization.name} (${organizationKindLabels[organization.kind]})`;
  }

  return `User Management scopes: ${account.userManagementOrganizations.length} organizations`;
};

export function AccountMenu() {
  'use memo';

  const { accounts, currentAccount, errorMessage, loading, selectAccount } = useDemoSession();
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const [accountModalOpen, setAccountModalOpen] = useState(false);

  const menuOpen = Boolean(menuAnchor);
  const accountLabel = currentAccount?.displayName ?? 'Demo account';
  const accountMeta =
    currentAccount?.persona ?? (loading ? 'Loading account' : 'No account loaded');

  const sortedAccounts = [...accounts].sort((first, second) =>
    first.displayName.localeCompare(second.displayName)
  );

  const closeMenu = () => setMenuAnchor(null);

  const openAccountModal = () => {
    closeMenu();
    setAccountModalOpen(true);
  };

  const handleAccountSelect = (accountId: string) => {
    selectAccount(accountId);
    setAccountModalOpen(false);
  };

  return (
    <AccountMenuRoot>
      <AccountTriggerSummary aria-hidden="true">
        <AccountTriggerName>{accountLabel}</AccountTriggerName>
        <AccountTriggerMeta>{accountMeta}</AccountTriggerMeta>
      </AccountTriggerSummary>
      <Tooltip title="Demo account">
        <IconButton
          aria-label="Open demo account menu"
          aria-controls={menuOpen ? 'org-management-account-menu' : undefined}
          aria-haspopup="menu"
          aria-expanded={menuOpen ? 'true' : undefined}
          size="small"
          onClick={(event) => setMenuAnchor(event.currentTarget)}
        >
          <AccountCircleIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Menu
        id="org-management-account-menu"
        anchorEl={menuAnchor}
        open={menuOpen}
        onClose={closeMenu}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <AccountMenuHeader>
          <AccountMenuName>{accountLabel}</AccountMenuName>
          {currentAccount && <AccountMenuText>{currentAccount.email}</AccountMenuText>}
          <AccountMenuText>{accountMeta}</AccountMenuText>
          {currentAccount && <AccountMenuText>{formatScopeLabel(currentAccount)}</AccountMenuText>}
          {errorMessage && <AccountMenuText>Session unavailable: {errorMessage}</AccountMenuText>}
        </AccountMenuHeader>
        <Divider />
        <MenuItem onClick={openAccountModal} disabled={loading && accounts.length === 0}>
          <SwapHorizIcon fontSize="small" />
          Switch account
        </MenuItem>
      </Menu>

      <Modal
        open={accountModalOpen}
        type="informational"
        title="Switch demo account"
        closeButton
        onClose={() => setAccountModalOpen(false)}
      >
        <AccountModalBody>
          <AccountModalIntro>
            Choose a synthetic account to preview Organization Management access states. This demo
            does not perform real authentication.
          </AccountModalIntro>
          <AccountList role="list" aria-label="Demo accounts">
            {sortedAccounts.map((account) => (
              <AccountOption
                key={account.id}
                type="button"
                aria-current={account.id === currentAccount?.id ? 'true' : undefined}
                onClick={() => handleAccountSelect(account.id)}
              >
                <AccountOptionHeader>
                  <AccountOptionName>{account.displayName}</AccountOptionName>
                  <AccountOptionPersona>{account.persona}</AccountOptionPersona>
                </AccountOptionHeader>
                <AccountOptionDetail>{account.email}</AccountOptionDetail>
                <AccountOptionDetail>{formatRoleLabel(account)}</AccountOptionDetail>
                <AccountOptionDetail>{formatScopeLabel(account)}</AccountOptionDetail>
              </AccountOption>
            ))}
            {sortedAccounts.length === 0 && (
              <AccountOption type="button" disabled>
                <AccountOptionName>
                  {loading ? 'Loading demo accounts' : 'No demo accounts available'}
                </AccountOptionName>
              </AccountOption>
            )}
          </AccountList>
        </AccountModalBody>
      </Modal>
    </AccountMenuRoot>
  );
}
