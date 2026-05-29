import { useEffect, useState, type ChangeEvent } from 'react';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Button,
  ContentTemplate,
  Input,
  Modal,
  ModalContentText,
  SearchBox,
  StatusTag,
  StatusTagTone,
  Table,
  TableColumn,
  TableSort,
  Toggle,
  ToggleOption,
} from 'hugo-ui';
import type { FeedbackMessageType, ModalButtonsType } from 'hugo-ui';
import type {
  OrganizationKind,
  Role,
  RoleKey,
  UserAccountStatus,
  UserListInput,
  UserListItem,
} from '@/api/types';
import { useAddUserToOrganizationByEmailMutation, useUsersQuery } from '@/api/userManagementApi';
import { formatDate, formatNullableDateTime } from '@/features/activity/activityDisplay';
import { useDemoSession } from '@/features/demoSession/DemoSessionContext';
import { useOrganizationScope } from '@/features/scope/OrganizationScopeContext';
import { getUserDetailPath } from '@/routes/paths';
import { getDisplayRoles, getRoleNamesLabel } from './roleDisplay';
import { useUserListTableStore, type UserTableControlMode } from './userListStore';
import {
  AddUserModalBody,
  FilterButton,
  FilterGroup,
  FilterLabel,
  FilterModePanel,
  RoleList,
  SearchFieldContainer,
  SummaryCard,
  SummaryGrid,
  SummaryLabel,
  SummaryValue,
  TableToolbar,
  UserCell,
  UserMeta,
  UserName,
  UserPageRoot,
} from './UserListPage.styles';

type AddUserFeedback = {
  type: FeedbackMessageType['type'];
  message: string;
  description: string;
};

type UserTableRow = UserListItem & {
  accountStatusOrig: UserAccountStatus;
  dateRegisteredOrig: string;
  rolesOrig: Role[];
  rolesStr: string;
  dateRegisteredLabel: string;
  lastSignedInLabel: string;
};

const accountStatusToneMap: Record<UserAccountStatus, StatusTagTone> = {
  Active: 'success',
  Suspended: 'danger',
  Incomplete: 'info',
};

const accountStatusOptions: { value: UserAccountStatus; label: string }[] = [
  { value: 'Active', label: 'Active' },
  { value: 'Suspended', label: 'Suspended' },
  { value: 'Incomplete', label: 'Incomplete' },
];

const roleOptions: { value: RoleKey; label: string; organizationKinds: OrganizationKind[] }[] = [
  { value: 'platform_admin', label: 'Platform Administrator', organizationKinds: ['INTERNAL'] },
  {
    value: 'organization_admin',
    label: 'Organization Administrator',
    organizationKinds: ['INTERNAL', 'TENANT'],
  },
  {
    value: 'public_user_admin',
    label: 'Public User Administrator',
    organizationKinds: ['INTERNAL'],
  },
  { value: 'workspace_manager', label: 'Workspace Manager', organizationKinds: ['TENANT'] },
];

const roleToneMap: Record<string, StatusTagTone> = {
  platform_admin: 'info',
  organization_admin: 'success',
  public_user_admin: 'warning',
  workspace_manager: 'warning',
  workspace_member: 'neutral',
};

const sortFieldMap: Record<string, string> = {
  name: 'firstName',
  email: 'email',
  accountStatus: 'accountStatus',
  dateRegistered: 'dateRegistered',
  lastSignedIn: 'lastSignedIn',
};

const tableControlOptions: ToggleOption<UserTableControlMode>[] = [
  { value: 'search', label: 'Search', icon: <SearchIcon /> },
  { value: 'filter', label: 'Filter', icon: <FilterListIcon /> },
];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const getEmailValidationError = (email: string) => {
  const value = email.trim();

  if (!value) {
    return 'Email is required.';
  }

  if (!emailPattern.test(value)) {
    return 'Enter a valid email address.';
  }

  return null;
};

const formatStatusLabel = (status: UserAccountStatus) =>
  accountStatusOptions.find((option) => option.value === status)?.label ?? status;

const getRoleOptionsForOrganizationKind = (organizationKind?: OrganizationKind) =>
  organizationKind
    ? roleOptions.filter((option) => option.organizationKinds.includes(organizationKind))
    : roleOptions;

const createTableRow = (user: UserListItem): UserTableRow => ({
  ...user,
  accountStatusOrig: user.accountStatus,
  dateRegisteredOrig: user.dateRegistered,
  rolesOrig: user.roles,
  rolesStr: getRoleNamesLabel(user.roles),
  dateRegisteredLabel: formatDate(user.dateRegistered),
  lastSignedInLabel: formatNullableDateTime(user.lastSignedIn),
});

const userColumns: TableColumn<UserTableRow>[] = [
  {
    id: 'name',
    header: 'Name',
    sortable: true,
    minWidth: 220,
    render: (row) => (
      <UserCell>
        <UserName>{row.displayName}</UserName>
        <UserMeta>{row.id}</UserMeta>
      </UserCell>
    ),
  },
  {
    id: 'email',
    header: 'Email',
    sortable: true,
    minWidth: 220,
    render: (row) => row.email,
  },
  {
    id: 'accountStatus',
    header: 'Status',
    sortable: true,
    minWidth: 150,
    render: (row) => (
      <RoleList aria-label={row.flaggedForDeletion ? 'Status, flagged for deletion' : 'Status'}>
        <StatusTag tone={accountStatusToneMap[row.accountStatus]}>
          {formatStatusLabel(row.accountStatus)}
        </StatusTag>
        {row.flaggedForDeletion && <StatusTag tone="danger">Flagged</StatusTag>}
      </RoleList>
    ),
  },
  {
    id: 'roles',
    header: 'Roles',
    minWidth: 240,
    render: (row) => (
      <RoleList aria-label={row.rolesStr || 'No roles'}>
        {getDisplayRoles(row.roles).map((role) => (
          <StatusTag key={role.id} tone={roleToneMap[role.key] ?? 'neutral'}>
            {role.name}
          </StatusTag>
        ))}
      </RoleList>
    ),
  },
  {
    id: 'dateRegistered',
    header: 'Registered',
    sortable: true,
    minWidth: 150,
    render: (row) => row.dateRegisteredLabel,
  },
  {
    id: 'lastSignedIn',
    header: 'Last signed in',
    sortable: true,
    minWidth: 170,
    render: (row) => row.lastSignedInLabel,
  },
];

export function UserListPage() {
  'use memo';

  const navigate = useNavigate();
  const location = useLocation();
  const { currentAccount } = useDemoSession();
  const {
    selectedOrganization,
    selectedOrganizationId,
    loading: scopeLoading,
  } = useOrganizationScope();
  const search = useUserListTableStore((state) => state.search);
  const controlMode = useUserListTableStore((state) => state.controlMode);
  const sort = useUserListTableStore((state) => state.sort);
  const page = useUserListTableStore((state) => state.page);
  const pageSize = useUserListTableStore((state) => state.pageSize);
  const statusFilters = useUserListTableStore((state) => state.statusFilters);
  const roleFilters = useUserListTableStore((state) => state.roleFilters);
  const activeOrganizationId = useUserListTableStore((state) => state.activeOrganizationId);
  const setActiveOrganizationId = useUserListTableStore((state) => state.setActiveOrganizationId);
  const setControlMode = useUserListTableStore((state) => state.setControlMode);
  const setSearch = useUserListTableStore((state) => state.setSearch);
  const setRoleFilters = useUserListTableStore((state) => state.setRoleFilters);
  const setSort = useUserListTableStore((state) => state.setSort);
  const setPage = useUserListTableStore((state) => state.setPage);
  const setPageSize = useUserListTableStore((state) => state.setPageSize);
  const toggleStoredStatusFilter = useUserListTableStore((state) => state.toggleStatusFilter);
  const toggleStoredRoleFilter = useUserListTableStore((state) => state.toggleRoleFilter);
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const [addUserEmail, setAddUserEmail] = useState('');
  const [addUserEmailError, setAddUserEmailError] = useState<string | null>(null);
  const [addUserFeedback, setAddUserFeedback] = useState<AddUserFeedback | null>(null);
  const [addUserToOrganizationByEmail, addUserMutation] = useAddUserToOrganizationByEmailMutation();
  const currentAccountId = currentAccount?.id ?? null;
  const selectedOrganizationKind = selectedOrganization?.kind;
  const selectedScopeIsPublic = selectedOrganizationKind === 'PUBLIC';
  const showAddUserAction = !selectedScopeIsPublic;
  const visibleRoleOptions = getRoleOptionsForOrganizationKind(selectedOrganizationKind);
  const tableStateReady = Boolean(
    selectedOrganizationId && activeOrganizationId === selectedOrganizationId
  );

  useEffect(() => {
    setActiveOrganizationId(selectedOrganizationId);
  }, [selectedOrganizationId, setActiveOrganizationId]);

  useEffect(() => {
    const visibleRoleKeys = new Set(
      getRoleOptionsForOrganizationKind(selectedOrganizationKind).map((option) => option.value)
    );
    const nextRoleFilters = roleFilters.filter((roleKey) =>
      visibleRoleKeys.has(roleKey as RoleKey)
    );

    if (nextRoleFilters.length !== roleFilters.length) {
      setRoleFilters(nextRoleFilters);
    }
  }, [roleFilters, selectedOrganizationKind, setRoleFilters]);

  const queryInput: UserListInput | null =
    selectedOrganizationId && tableStateReady
      ? {
          organizationId: selectedOrganizationId,
          pageNumber: page,
          pageSize,
          sortField: sort?.columnId ? sortFieldMap[sort.columnId] : undefined,
          sortDirection: sort?.direction ?? undefined,
          searchString: controlMode === 'search' ? search.trim() || undefined : undefined,
          accountStatuses:
            controlMode === 'filter' && statusFilters.length > 0 ? statusFilters : undefined,
          roleKeys: controlMode === 'filter' && roleFilters.length > 0 ? roleFilters : undefined,
        }
      : null;

  const usersQuery = useUsersQuery(queryInput);
  const usersPage = tableStateReady ? (usersQuery.data?.users ?? null) : null;
  const awaitingTableState = Boolean(selectedOrganizationId) && !tableStateReady;
  const tableLoading = scopeLoading || awaitingTableState || (usersQuery.loading && !usersPage);
  const visibleUsers = usersPage?.items.map(createTableRow) ?? [];

  const summary = {
    matching: usersPage?.totalElements ?? 0,
    activeOnPage: visibleUsers.filter((user) => user.accountStatus === 'Active').length,
    adminsOnPage: visibleUsers.filter((user) =>
      user.roles.some((role) => role.key === 'organization_admin')
    ).length,
  };

  const openUserDetail = (user: UserTableRow) => {
    navigate({ pathname: `/${getUserDetailPath(user.id)}`, search: location.search });
  };

  const handleControlModeChange = (mode: UserTableControlMode) => {
    setControlMode(mode);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const handleSortChange = (nextSort: TableSort) => {
    setSort(nextSort);
  };

  const handlePageSizeChange = (nextPageSize: number) => {
    setPageSize(nextPageSize);
  };

  const toggleStatusFilter = (status: UserAccountStatus) => {
    toggleStoredStatusFilter(status);
  };

  const toggleRoleFilter = (roleKey: string) => {
    toggleStoredRoleFilter(roleKey);
  };

  const resetAddUserForm = () => {
    setAddUserEmail('');
    setAddUserEmailError(null);
  };

  const openAddUserModal = () => {
    if (selectedScopeIsPublic) {
      return;
    }

    resetAddUserForm();
    setAddUserModalOpen(true);
  };

  const closeAddUserModal = () => {
    if (addUserMutation.loading) {
      return;
    }

    setAddUserModalOpen(false);
    resetAddUserForm();
  };

  const handleAddUserEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAddUserEmail(event.target.value);

    if (addUserEmailError) {
      setAddUserEmailError(null);
    }
  };

  const handleAddUserEmailBlur = () => {
    setAddUserEmailError(getEmailValidationError(addUserEmail));
  };

  const handleAddUserSubmit = async () => {
    const emailError = getEmailValidationError(addUserEmail);
    setAddUserEmailError(emailError);

    if (emailError) {
      return;
    }

    if (!selectedOrganizationId || !selectedOrganization) {
      setAddUserModalOpen(false);
      setAddUserFeedback({
        type: 'error',
        message: 'User was not added',
        description: 'Select an organization scope before adding a user.',
      });
      return;
    }

    if (selectedOrganization.kind === 'PUBLIC') {
      setAddUserModalOpen(false);
      setAddUserFeedback({
        type: 'error',
        message: 'User was not added',
        description: 'Public organization scopes do not support adding users from this demo.',
      });
      return;
    }

    const email = addUserEmail.trim().toLowerCase();

    try {
      const { data } = await addUserToOrganizationByEmail({
        variables: {
          input: {
            actorUserId: currentAccountId,
            email,
            organizationId: selectedOrganizationId,
          },
        },
      });
      const result = data?.addUserToOrganizationByEmail;

      if (!result?.success) {
        throw new Error(result?.message ?? 'User was not added.');
      }

      await usersQuery.refetch();
      setAddUserModalOpen(false);
      resetAddUserForm();
      setAddUserFeedback({
        type: 'success',
        message: 'User added',
        description: `${result.message} ${email} was added to ${selectedOrganization.name}.`,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'User was not added.';

      setAddUserModalOpen(false);
      resetAddUserForm();
      setAddUserFeedback({
        type: 'error',
        message: 'User was not added',
        description: errorMessage,
      });
    }
  };

  const addUserModalButtons: ModalButtonsType = {
    primary: {
      label: 'Add user',
      onClick: () => {
        void handleAddUserSubmit();
      },
    },
    secondary: {
      level: 'secondary',
      label: 'Cancel',
      onClick: closeAddUserModal,
    },
  };

  const addUserFeedbackMessages: FeedbackMessageType[] = addUserFeedback
    ? [
        {
          type: addUserFeedback.type,
          message: addUserFeedback.message,
          description: addUserFeedback.description,
        },
      ]
    : [];

  return (
    <ContentTemplate
      type="table"
      pageTitle="Users"
      titleInfo={
        selectedOrganization
          ? `Showing users in ${selectedOrganization.name}.`
          : 'Select an organization scope to inspect users.'
      }
      actionItems={
        showAddUserAction ? (
          <Button
            level="primary"
            startIcon={<AddIcon />}
            disabled={!selectedOrganizationId || scopeLoading}
            onClick={openAddUserModal}
          >
            Add user
          </Button>
        ) : undefined
      }
    >
      <UserPageRoot>
        <SummaryGrid aria-label="User summary">
          <SummaryCard>
            <SummaryLabel>Matching users</SummaryLabel>
            <SummaryValue>{summary.matching}</SummaryValue>
          </SummaryCard>
          <SummaryCard>
            <SummaryLabel>Active on page</SummaryLabel>
            <SummaryValue>{summary.activeOnPage}</SummaryValue>
          </SummaryCard>
          <SummaryCard>
            <SummaryLabel>Admins on page</SummaryLabel>
            <SummaryValue>{summary.adminsOnPage}</SummaryValue>
          </SummaryCard>
        </SummaryGrid>

        <TableToolbar>
          <Toggle
            ariaLabel="User table control mode"
            value={controlMode}
            options={tableControlOptions}
            onChange={handleControlModeChange}
          />
          {controlMode === 'search' ? (
            <SearchFieldContainer>
              <SearchBox
                aria-label="Search users"
                placeholder="Search users"
                value={search}
                onChange={handleSearchChange}
                onSearch={handleSearchChange}
              />
            </SearchFieldContainer>
          ) : (
            <FilterModePanel aria-label="User filters">
              <FilterGroup>
                <FilterLabel>Status</FilterLabel>
                {accountStatusOptions.map((option) => (
                  <FilterButton
                    key={option.value}
                    type="button"
                    aria-pressed={statusFilters.includes(option.value)}
                    onClick={() => toggleStatusFilter(option.value)}
                  >
                    <StatusTag tone={accountStatusToneMap[option.value]}>{option.label}</StatusTag>
                  </FilterButton>
                ))}
              </FilterGroup>
              {visibleRoleOptions.length > 0 && (
                <FilterGroup>
                  <FilterLabel>Role</FilterLabel>
                  {visibleRoleOptions.map((option) => (
                    <FilterButton
                      key={option.value}
                      type="button"
                      aria-pressed={roleFilters.includes(option.value)}
                      onClick={() => toggleRoleFilter(option.value)}
                    >
                      <StatusTag tone={roleToneMap[option.value]}>{option.label}</StatusTag>
                    </FilterButton>
                  ))}
                </FilterGroup>
              )}
            </FilterModePanel>
          )}
        </TableToolbar>

        <Table
          ariaLabel="Users"
          columns={userColumns}
          rows={visibleUsers}
          getRowId={(row) => row.membershipId}
          sort={sort}
          onSortChange={handleSortChange}
          onRowClick={openUserDetail}
          loading={tableLoading}
          error={usersQuery.error?.message ?? null}
          empty="No users match the current scope."
          pagination={{
            page: usersPage?.currentPage ?? page,
            pageSize,
            total: usersPage?.totalElements ?? 0,
            pageSizeOptions: [5, 10, 25],
            onPageChange: setPage,
            onPageSizeChange: handlePageSizeChange,
          }}
        />
      </UserPageRoot>
      <Modal
        title="Add user"
        open={addUserModalOpen}
        onClose={closeAddUserModal}
        loading={addUserMutation.loading}
        showLoadingIndicator
        disableAutoFocus
        buttonDefs={addUserModalButtons}
      >
        <AddUserModalBody>
          <ModalContentText>
            Add an existing user to {selectedOrganization?.name ?? 'the selected organization'}. The
            membership is created with organization-appropriate access.
          </ModalContentText>
          <Input
            autoFocus
            required
            fullWidth
            type="email"
            label="Email"
            placeholder="name@example.com"
            value={addUserEmail}
            color={addUserEmailError ? 'error' : undefined}
            extraMessage={addUserEmailError ?? undefined}
            disabled={addUserMutation.loading}
            onChange={handleAddUserEmailChange}
            onBlur={handleAddUserEmailBlur}
          />
        </AddUserModalBody>
      </Modal>
      <Modal
        type="feedback"
        open={!!addUserFeedback}
        messages={addUserFeedbackMessages}
        onClose={() => setAddUserFeedback(null)}
      />
    </ContentTemplate>
  );
}
