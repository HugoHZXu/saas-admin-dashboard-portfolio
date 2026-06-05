import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  ContentTemplate,
  DetailCard,
  Modal,
  ModalContentText,
  StatusTag,
  StatusTagTone,
  Table,
  TableSort,
} from '@hugo-ui/mui';
import type { FeedbackMessageType, ModalButtonsType } from '@hugo-ui/mui';
import type { ActivityLogListInput, Role, RoleKey, UserAccountStatus } from '@/api/types';
import {
  useActivateUserMutation,
  useActivityLogsQuery,
  useAvailableRolesQuery,
  useChangeUserRolesMutation,
  useRemoveUserFromOrganizationMutation,
  useSuspendUserMutation,
  useUserQuery,
} from '@/api/userManagementApi';
import {
  formatDateTime,
  formatNullableDateTime,
  useActivityColumns,
} from '@/features/activity/activityDisplay';
import { useDemoSession } from '@/features/demoSession/DemoSessionContext';
import { useOrganizationScope } from '@/features/scope/OrganizationScopeContext';
import { getAssignableRoles, getDisplayRoles } from '@/features/users/roleDisplay';
import {
  DefinitionItem,
  DefinitionLabel,
  DefinitionList,
  DefinitionValue,
  DetailCardWide,
  DetailGrid,
  InlineTagList,
  PanelHeading,
  PanelText,
  RoleModalBody,
  RoleOption,
  RoleOptionCheckbox,
  RoleOptionContent,
  RoleOptionDescription,
  RoleOptionList,
  RoleOptionName,
  RoleWarning,
} from './pageStyles';

const accountStatusToneMap: Record<UserAccountStatus, StatusTagTone> = {
  Active: 'success',
  Suspended: 'danger',
  Incomplete: 'info',
};

const accountStatusLabelMap: Record<UserAccountStatus, string> = {
  Active: 'Active',
  Suspended: 'Suspended',
  Incomplete: 'Incomplete',
};

const roleToneMap: Record<string, StatusTagTone> = {
  platform_admin: 'info',
  organization_admin: 'success',
  public_user_admin: 'warning',
  workspace_manager: 'warning',
  workspace_member: 'neutral',
};

const roleDescriptionMap: Record<RoleKey, string> = {
  platform_admin: 'Access Organization Management for platform operations.',
  organization_admin: 'Manage users and organization-scoped administration.',
  public_user_admin: 'Manage public sign-up users from the internal scope.',
  workspace_manager: 'Manage tenant workspace operations without User Management access.',
};

type UserDetailFeedback = {
  type: FeedbackMessageType['type'];
  message: string;
  description: string;
};

type AccountStatusAction = 'suspend' | 'activate';

const accountStatusActionConfigMap: Record<
  AccountStatusAction,
  {
    buttonLabel: string;
    modalTitle: string;
    confirmLabel: string;
    bodyText: (displayName: string) => string;
    successMessage: string;
    errorMessage: string;
  }
> = {
  suspend: {
    buttonLabel: 'Suspend',
    modalTitle: 'Suspend user',
    confirmLabel: 'Suspend',
    bodyText: (displayName) =>
      `Suspend ${displayName}? The account will be marked suspended until it is activated.`,
    successMessage: 'User suspended',
    errorMessage: 'User was not suspended',
  },
  activate: {
    buttonLabel: 'Activate',
    modalTitle: 'Activate user',
    confirmLabel: 'Activate',
    bodyText: (displayName) => `Activate ${displayName}? The account will be marked active.`,
    successMessage: 'User activated',
    errorMessage: 'User was not activated',
  },
};

const getAccountStatusAction = (status: UserAccountStatus): AccountStatusAction | null => {
  if (status === 'Active') {
    return 'suspend';
  }

  if (status === 'Suspended') {
    return 'activate';
  }

  return null;
};

const getRoleDescription = (role: Role) =>
  roleDescriptionMap[role.key as RoleKey] ?? 'Scoped role assignment.';

const roleIdsEqual = (first: string[], second: string[]) =>
  first.length === second.length && first.every((roleId) => second.includes(roleId));

export function UserDetailPage() {
  'use memo';

  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = useParams();
  const {
    selectedOrganization,
    selectedOrganizationId,
    loading: scopeLoading,
  } = useOrganizationScope();
  const { currentAccount, refetch: refetchDemoSession } = useDemoSession();
  const activityColumns = useActivityColumns();
  const [activitySort, setActivitySort] = useState<TableSort>({
    columnId: 'eventTime',
    direction: 'desc',
  });
  const [activityPageNumber, setActivityPageNumber] = useState(0);
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [accountStatusAction, setAccountStatusAction] = useState<AccountStatusAction | null>(null);
  const [removeUserModalOpen, setRemoveUserModalOpen] = useState(false);
  const [draftRoleIds, setDraftRoleIds] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<UserDetailFeedback | null>(null);

  const userQuery = useUserQuery(userId, selectedOrganizationId ?? undefined);
  const availableRolesQuery = useAvailableRolesQuery(selectedOrganizationId ?? undefined);
  const [changeUserRoles, changeRolesMutation] = useChangeUserRolesMutation();
  const [suspendUser, suspendUserMutation] = useSuspendUserMutation();
  const [activateUser, activateUserMutation] = useActivateUserMutation();
  const [removeUserFromOrganization, removeUserMutation] = useRemoveUserFromOrganizationMutation();
  const user = userQuery.data?.user ?? null;
  const scopedMembership =
    user?.memberships.find((membership) => membership.organization.id === selectedOrganizationId) ??
    null;

  const activityInput: ActivityLogListInput | null =
    userId && selectedOrganizationId && scopedMembership
      ? {
          targetUserId: userId,
          organizationId: selectedOrganizationId,
          pageNumber: activityPageNumber,
          pageSize: 5,
          sortField: activitySort?.columnId ?? undefined,
          sortDirection: activitySort?.direction ?? undefined,
        }
      : null;

  const activityQuery = useActivityLogsQuery(activityInput);
  const activityPage = activityQuery.data?.activityLogs ?? null;
  const availableRoles = availableRolesQuery.data?.availableRoles ?? [];
  const currentAccountId = currentAccount?.id ?? null;
  const accountStatusMutationLoading = suspendUserMutation.loading || activateUserMutation.loading;
  const removeUserMutationLoading = removeUserMutation.loading;
  const assignableRoles = getAssignableRoles(scopedMembership?.roles ?? []);
  const currentRoleIds = assignableRoles.map((role) => role.id);
  const displayRoles = getDisplayRoles(scopedMembership?.roles ?? []);
  const roleDraftChanged = !roleIdsEqual(draftRoleIds, currentRoleIds);
  const isEditingCurrentAccount = Boolean(user?.id && currentAccountId === user.id);
  const canShowRemoveUserAction = Boolean(
    user?.id &&
    selectedOrganization?.kind === 'TENANT' &&
    selectedOrganizationId &&
    currentAccountId !== user.id
  );
  const isSelfOrganizationAdminLocked = Boolean(
    isEditingCurrentAccount &&
    scopedMembership?.roles.some((role) => role.key === 'organization_admin')
  );
  const removesPlatformAdmin = Boolean(
    assignableRoles.some((role) => role.key === 'platform_admin') &&
    !assignableRoles.some((role) => role.key === 'platform_admin' && draftRoleIds.includes(role.id))
  );
  const canSaveRoleChanges = Boolean(
    user?.id &&
    selectedOrganizationId &&
    roleDraftChanged &&
    !availableRolesQuery.loading &&
    !availableRolesQuery.error &&
    !changeRolesMutation.loading
  );
  const detailError = !userId
    ? 'The selected user route is missing an id.'
    : (userQuery.error?.message ?? null);
  const availableAccountStatusAction = user ? getAccountStatusAction(user.accountStatus) : null;
  const availableAccountStatusActionConfig = availableAccountStatusAction
    ? accountStatusActionConfigMap[availableAccountStatusAction]
    : null;
  const canShowAccountStatusAction = Boolean(
    availableAccountStatusAction &&
    availableAccountStatusActionConfig &&
    !(availableAccountStatusAction === 'suspend' && isSelfOrganizationAdminLocked)
  );
  const accountStatusActionConfig = accountStatusAction
    ? accountStatusActionConfigMap[accountStatusAction]
    : null;

  const openAccountStatusModal = (action: AccountStatusAction) => {
    setAccountStatusAction(action);
  };

  const closeAccountStatusModal = () => {
    if (accountStatusMutationLoading) {
      return;
    }

    setAccountStatusAction(null);
  };

  const openRemoveUserModal = () => {
    setRemoveUserModalOpen(true);
  };

  const closeRemoveUserModal = () => {
    if (removeUserMutationLoading) {
      return;
    }

    setRemoveUserModalOpen(false);
  };

  const openRoleModal = () => {
    setDraftRoleIds(currentRoleIds);
    setRoleModalOpen(true);
  };

  const closeRoleModal = () => {
    if (changeRolesMutation.loading) {
      return;
    }

    setRoleModalOpen(false);
  };

  const toggleDraftRole = (roleId: string) => {
    setDraftRoleIds((currentIds) =>
      currentIds.includes(roleId)
        ? currentIds.filter((currentRoleId) => currentRoleId !== roleId)
        : [...currentIds, roleId]
    );
  };

  const handleRoleSave = async () => {
    if (!user?.id || !selectedOrganizationId || !canSaveRoleChanges) {
      return;
    }

    try {
      const { data } = await changeUserRoles({
        variables: {
          input: {
            actorUserId: currentAccountId,
            userId: user.id,
            organizationId: selectedOrganizationId,
            roleIds: draftRoleIds,
          },
        },
      });
      const result = data?.changeUserRoles;

      if (!result?.success) {
        throw new Error(result?.message ?? 'User roles were not changed.');
      }

      await userQuery.refetch();

      if (activityInput) {
        await activityQuery.refetch();
      }

      await refetchDemoSession();
      setRoleModalOpen(false);
      setFeedback({
        type: 'success',
        message: 'Roles updated',
        description: result.message,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'User roles were not changed.';

      setFeedback({
        type: 'error',
        message: 'Roles were not updated',
        description: errorMessage,
      });
    }
  };

  const handleAccountStatusConfirm = async () => {
    if (
      !user?.id ||
      !accountStatusAction ||
      !accountStatusActionConfig ||
      (accountStatusAction === 'suspend' && isSelfOrganizationAdminLocked)
    ) {
      return;
    }

    try {
      const variables = {
        input: {
          actorUserId: currentAccountId,
          userId: user.id,
        },
      };
      const result =
        accountStatusAction === 'suspend'
          ? (await suspendUser({ variables })).data?.suspendUser
          : (await activateUser({ variables })).data?.activateUser;

      if (!result?.success) {
        throw new Error(result?.message ?? accountStatusActionConfig.errorMessage);
      }

      await userQuery.refetch();

      if (activityInput) {
        await activityQuery.refetch();
      }

      await refetchDemoSession();
      setAccountStatusAction(null);
      setFeedback({
        type: 'success',
        message: accountStatusActionConfig.successMessage,
        description: result.message,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : accountStatusActionConfig.errorMessage;

      setAccountStatusAction(null);
      setFeedback({
        type: 'error',
        message: accountStatusActionConfig.errorMessage,
        description: errorMessage,
      });
    }
  };

  const handleRemoveUserConfirm = async () => {
    if (!user?.id || !selectedOrganizationId || !canShowRemoveUserAction) {
      return;
    }

    try {
      const { data } = await removeUserFromOrganization({
        variables: {
          input: {
            actorUserId: currentAccountId,
            userId: user.id,
            organizationId: selectedOrganizationId,
          },
        },
      });
      const result = data?.removeUserFromOrganization;

      if (!result?.success) {
        throw new Error(result?.message ?? 'User was not removed from the organization.');
      }

      setRemoveUserModalOpen(false);
      navigate({ pathname: '/', search: location.search }, { replace: true });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'User was not removed from the organization.';

      setRemoveUserModalOpen(false);
      setFeedback({
        type: 'error',
        message: 'User was not removed',
        description: errorMessage,
      });
    }
  };

  const roleModalButtons: ModalButtonsType = {
    primary: {
      label: 'Save roles',
      disabled: !canSaveRoleChanges,
      loading: changeRolesMutation.loading,
      onClick: () => {
        void handleRoleSave();
      },
    },
    secondary: {
      level: 'secondary',
      label: 'Cancel',
      disabled: changeRolesMutation.loading,
      onClick: closeRoleModal,
    },
  };

  const accountStatusModalButtons: ModalButtonsType = {
    primary: {
      label: accountStatusActionConfig?.confirmLabel ?? 'Confirm',
      disabled: !accountStatusAction || accountStatusMutationLoading,
      loading: accountStatusMutationLoading,
      onClick: () => {
        void handleAccountStatusConfirm();
      },
    },
    secondary: {
      level: 'secondary',
      label: 'Cancel',
      disabled: accountStatusMutationLoading,
      onClick: closeAccountStatusModal,
    },
  };

  const removeUserModalButtons: ModalButtonsType = {
    primary: {
      label: 'Remove',
      disabled: !canShowRemoveUserAction || removeUserMutationLoading,
      loading: removeUserMutationLoading,
      onClick: () => {
        void handleRemoveUserConfirm();
      },
    },
    secondary: {
      level: 'secondary',
      label: 'Cancel',
      disabled: removeUserMutationLoading,
      onClick: closeRemoveUserModal,
    },
  };

  const feedbackMessages: FeedbackMessageType[] = feedback
    ? [
        {
          type: feedback.type,
          message: feedback.message,
          description: feedback.description,
        },
      ]
    : [];

  if (scopeLoading || !selectedOrganizationId || !selectedOrganization) {
    return (
      <ContentTemplate type="card" pageTitle="Loading scope" onBack={() => navigate(-1)}>
        <DetailCard>
          <PanelHeading>Loading organization scope</PanelHeading>
          <PanelText>Loading the selected organization scope for User Management.</PanelText>
        </DetailCard>
      </ContentTemplate>
    );
  }

  if (userQuery.loading && !user) {
    return (
      <ContentTemplate type="card" pageTitle="Loading user" onBack={() => navigate(-1)}>
        <DetailCard>
          <PanelHeading>Loading</PanelHeading>
          <PanelText>Loading user details from the admin BFF.</PanelText>
        </DetailCard>
      </ContentTemplate>
    );
  }

  if (detailError || !user) {
    return (
      <ContentTemplate
        type="error"
        pageTitle="User not found"
        errorMessage={detailError ?? 'The selected user does not exist in the admin BFF data set.'}
        onBack={() => navigate(-1)}
      />
    );
  }

  if (!scopedMembership) {
    return (
      <ContentTemplate
        type="error"
        pageTitle="User unavailable in current scope"
        errorMessage="This user is not a member of the selected organization scope."
        onBack={() => navigate(-1)}
      />
    );
  }

  const handleActivitySortChange = (nextSort: TableSort) => {
    setActivitySort(nextSort);
    setActivityPageNumber(0);
  };

  return (
    <ContentTemplate
      type="card"
      pageTitle={user.displayName}
      titleInfo={
        selectedOrganization
          ? `User detail in ${selectedOrganization.name}.`
          : 'User detail from the admin BFF.'
      }
      onBack={() => navigate(-1)}
      actionItems={
        canShowAccountStatusAction || canShowRemoveUserAction ? (
          <>
            {canShowAccountStatusAction &&
              availableAccountStatusAction &&
              availableAccountStatusActionConfig && (
                <Button
                  level="primary"
                  colorTheme={availableAccountStatusAction === 'suspend' ? 'red' : 'purple'}
                  disabled={accountStatusMutationLoading}
                  onClick={() => openAccountStatusModal(availableAccountStatusAction)}
                >
                  {availableAccountStatusActionConfig.buttonLabel}
                </Button>
              )}
            {canShowRemoveUserAction && (
              <Button
                level="primary"
                colorTheme="red"
                disabled={removeUserMutationLoading}
                onClick={openRemoveUserModal}
              >
                Remove
              </Button>
            )}
          </>
        ) : undefined
      }
    >
      <DetailGrid>
        <DetailCardWide aria-label="Basic information">
          <PanelHeading>Basic information</PanelHeading>
          <DefinitionList>
            <DefinitionItem>
              <DefinitionLabel>Status</DefinitionLabel>
              <DefinitionValue>
                <StatusTag tone={accountStatusToneMap[user.accountStatus]}>
                  {accountStatusLabelMap[user.accountStatus]}
                </StatusTag>
              </DefinitionValue>
            </DefinitionItem>
            <DefinitionItem>
              <DefinitionLabel>Flagged For Deletion</DefinitionLabel>
              <DefinitionValue>
                <StatusTag tone={user.flaggedForDeletion ? 'danger' : 'neutral'}>
                  {user.flaggedForDeletion ? 'Flagged' : 'No'}
                </StatusTag>
              </DefinitionValue>
            </DefinitionItem>
            <DefinitionItem>
              <DefinitionLabel>Email</DefinitionLabel>
              <DefinitionValue>{user.email}</DefinitionValue>
            </DefinitionItem>
            <DefinitionItem>
              <DefinitionLabel>Registered</DefinitionLabel>
              <DefinitionValue>{formatDateTime(user.dateRegistered)}</DefinitionValue>
            </DefinitionItem>
            <DefinitionItem>
              <DefinitionLabel>Last signed in</DefinitionLabel>
              <DefinitionValue>{formatNullableDateTime(user.lastSignedIn)}</DefinitionValue>
            </DefinitionItem>
          </DefinitionList>
        </DetailCardWide>

        <DetailCardWide aria-label="Role" clickable onClick={openRoleModal}>
          <PanelHeading>Role</PanelHeading>
          <InlineTagList>
            {displayRoles.map((role) => (
              <StatusTag key={role.id} tone={roleToneMap[role.key] ?? 'neutral'}>
                {role.name}
              </StatusTag>
            ))}
          </InlineTagList>
        </DetailCardWide>

        <DetailCardWide aria-label="Scoped activity">
          <PanelHeading>Scoped Activity Log</PanelHeading>
          <Table
            ariaLabel="Scoped user activity"
            columns={activityColumns}
            rows={activityPage?.items ?? []}
            getRowId={(row) => row.id}
            sort={activitySort}
            onSortChange={handleActivitySortChange}
            loading={activityQuery.loading}
            error={activityQuery.error?.message ?? null}
            empty="No scoped activity records found."
            pagination={{
              page: activityPage?.currentPage ?? activityPageNumber,
              pageSize: activityPage?.pageSize ?? 5,
              total: activityPage?.totalElements ?? 0,
              pageSizeOptions: [5],
              onPageChange: setActivityPageNumber,
            }}
          />
        </DetailCardWide>
      </DetailGrid>
      <Modal
        type={accountStatusAction === 'suspend' ? 'destructive' : 'transactional'}
        title={accountStatusActionConfig?.modalTitle ?? 'Confirm user status change'}
        open={!!accountStatusAction}
        onClose={closeAccountStatusModal}
        loading={accountStatusMutationLoading}
        showLoadingIndicator
        disableAutoFocus
        buttonDefs={accountStatusModalButtons}
        maxWidth="sm"
        fullWidth
      >
        <ModalContentText>
          {accountStatusActionConfig?.bodyText(user.displayName) ??
            'Confirm this user status change.'}
        </ModalContentText>
      </Modal>
      <Modal
        type="destructive"
        title="Remove user from organization"
        open={removeUserModalOpen}
        onClose={closeRemoveUserModal}
        loading={removeUserMutationLoading}
        showLoadingIndicator
        disableAutoFocus
        buttonDefs={removeUserModalButtons}
        maxWidth="sm"
        fullWidth
      >
        <ModalContentText>
          Remove {user.displayName} from {selectedOrganization.name}? This removes the scoped
          membership for the selected organization.
        </ModalContentText>
      </Modal>
      <Modal
        title="Edit roles"
        open={roleModalOpen}
        onClose={closeRoleModal}
        loading={changeRolesMutation.loading}
        showLoadingIndicator
        disableAutoFocus
        buttonDefs={roleModalButtons}
        maxWidth="sm"
        fullWidth
      >
        <RoleModalBody>
          <ModalContentText>
            Role changes apply to {selectedOrganization.name} for {user.displayName}.
          </ModalContentText>
          {availableRolesQuery.loading && <PanelText>Loading role options.</PanelText>}
          {availableRolesQuery.error && (
            <PanelText role="status">Role options are unavailable.</PanelText>
          )}
          {!availableRolesQuery.loading &&
            !availableRolesQuery.error &&
            availableRoles.length === 0 && (
              <PanelText>Public organization scopes do not use role assignments.</PanelText>
            )}
          {availableRoles.length > 0 && (
            <RoleOptionList aria-label="Available roles">
              {availableRoles.map((role) => {
                const checked = draftRoleIds.includes(role.id);
                const lockedSelfRole =
                  isSelfOrganizationAdminLocked && role.key === 'organization_admin' && checked;
                const disabled = lockedSelfRole || changeRolesMutation.loading;

                return (
                  <RoleOption
                    key={role.id}
                    data-selected={checked ? 'true' : 'false'}
                    data-disabled={disabled ? 'true' : 'false'}
                  >
                    <RoleOptionCheckbox
                      type="checkbox"
                      checked={checked}
                      disabled={disabled}
                      onChange={() => toggleDraftRole(role.id)}
                    />
                    <RoleOptionContent>
                      <RoleOptionName>{role.name}</RoleOptionName>
                      <RoleOptionDescription>
                        {lockedSelfRole
                          ? 'This role is required for your current account.'
                          : getRoleDescription(role)}
                      </RoleOptionDescription>
                    </RoleOptionContent>
                  </RoleOption>
                );
              })}
            </RoleOptionList>
          )}
          {removesPlatformAdmin && (
            <RoleWarning>
              Removing Platform Administrator removes Organization Management access for this
              account.
            </RoleWarning>
          )}
        </RoleModalBody>
      </Modal>
      <Modal
        type="feedback"
        open={!!feedback}
        messages={feedbackMessages}
        onClose={() => setFeedback(null)}
      />
    </ContentTemplate>
  );
}
