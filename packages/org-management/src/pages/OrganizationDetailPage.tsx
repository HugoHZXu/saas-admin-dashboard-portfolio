import { useCallback, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ContentTemplate,
  DetailCard,
  Modal,
  ModalContentText,
  StatusTag,
  StatusTagTone,
  Table,
  TableSort,
} from 'hugo-ui';
import type { FeedbackMessageType, ModalButtonsType } from 'hugo-ui';
import {
  useOrganizationActivityLogsQuery,
  useOrganizationQuery,
  useUpdateOrganizationAdminsMutation,
} from '@/api/orgManagementApi';
import { ActivityLogListInput, OrganizationAdmin, OrganizationStatus } from '@/api/types';
import { useActivityColumns } from '@/features/activity/activityDisplay';
import { useDemoSession } from '@/features/demoSession/DemoSessionContext';
import {
  AdminEmail,
  AdminList,
  AdminModalBody,
  AdminName,
  AdminOption,
  AdminOptionCheckbox,
  AdminOptionContent,
  AdminOptionEmail,
  AdminOptionList,
  AdminOptionName,
  AdminRow,
  DefinitionItem,
  DefinitionLabel,
  DefinitionList,
  DefinitionValue,
  DetailCardWide,
  DetailGrid,
  PanelHeading,
  PanelText,
} from './pageStyles';

const statusToneMap: Record<OrganizationStatus, StatusTagTone> = {
  active: 'success',
  inactive: 'warning',
  archived: 'neutral',
};

const statusLabelMap: Record<OrganizationStatus, string> = {
  active: 'Active',
  inactive: 'Inactive',
  archived: 'Archived',
};

type OrganizationDetailFeedback = {
  type: FeedbackMessageType['type'];
  message: string;
  description: string;
};

const getAdminId = (admin: OrganizationAdmin) => admin.id ?? admin.referenceId ?? null;

const formatAdminName = (admin: OrganizationAdmin) =>
  `${admin.firstName} ${admin.lastName}`.trim() || admin.email;

const sortIds = (ids: string[]) => [...ids].sort((first, second) => first.localeCompare(second));

const idsEqual = (first: string[], second: string[]) => {
  const sortedFirst = sortIds(first);
  const sortedSecond = sortIds(second);

  return (
    sortedFirst.length === sortedSecond.length &&
    sortedFirst.every((id, index) => id === sortedSecond[index])
  );
};

const getOrganizationAdminIds = (admins: OrganizationAdmin[]) =>
  sortIds(admins.map(getAdminId).filter((id): id is string => Boolean(id)));

export function OrganizationDetailPage() {
  const navigate = useNavigate();
  const { organizationId } = useParams();
  const { currentAccount, refetch: refetchDemoSession } = useDemoSession();
  const activityColumns = useActivityColumns();
  const [activitySort, setActivitySort] = useState<TableSort>({
    columnId: 'eventTime',
    direction: 'desc',
  });
  const [activityPageNumber, setActivityPageNumber] = useState(0);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [draftAdminUserIds, setDraftAdminUserIds] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<OrganizationDetailFeedback | null>(null);

  const activityInput = useMemo<ActivityLogListInput>(
    () => ({
      pageNumber: activityPageNumber,
      pageSize: 5,
      sortField: activitySort?.columnId ?? undefined,
      sortDirection: activitySort?.direction ?? undefined,
    }),
    [activityPageNumber, activitySort]
  );
  const organizationQuery = useOrganizationQuery(organizationId);
  const activityQuery = useOrganizationActivityLogsQuery(organizationId, activityInput);
  const [updateOrganizationAdmins, updateAdminsMutation] = useUpdateOrganizationAdminsMutation();
  const organization = organizationQuery.data?.organization ?? null;
  const activityPage = activityQuery.data?.organizationActivityLogs ?? null;
  const currentAccountId = currentAccount?.id ?? null;
  const currentAdminUserIds = useMemo(
    () => getOrganizationAdminIds(organization?.admins ?? []),
    [organization?.admins]
  );
  const organizationMembers = useMemo(
    () =>
      [...(organization?.memberships ?? [])].sort((first, second) =>
        first.user.name.localeCompare(second.user.name)
      ),
    [organization?.memberships]
  );
  const adminDraftChanged = useMemo(
    () => !idsEqual(draftAdminUserIds, currentAdminUserIds),
    [currentAdminUserIds, draftAdminUserIds]
  );
  const canSaveAdminChanges = Boolean(
    organization?.id &&
      adminDraftChanged &&
      !updateAdminsMutation.loading &&
      organizationMembers.length > 0
  );
  const feedbackMessages = useMemo<FeedbackMessageType[]>(
    () =>
      feedback
        ? [
            {
              type: feedback.type,
              message: feedback.message,
              description: feedback.description,
            },
          ]
        : [],
    [feedback]
  );
  const detailError = !organizationId
    ? 'The selected organization route is missing an id.'
    : (organizationQuery.error?.message ?? null);

  const openAdminModal = useCallback(() => {
    setDraftAdminUserIds(currentAdminUserIds);
    setAdminModalOpen(true);
  }, [currentAdminUserIds]);

  const closeAdminModal = useCallback(() => {
    if (updateAdminsMutation.loading) {
      return;
    }

    setAdminModalOpen(false);
    setDraftAdminUserIds([]);
  }, [updateAdminsMutation.loading]);

  const toggleDraftAdmin = useCallback((userId: string) => {
    setDraftAdminUserIds((currentIds) =>
      currentIds.includes(userId)
        ? currentIds.filter((currentId) => currentId !== userId)
        : [...currentIds, userId]
    );
  }, []);

  const handleAdminSave = async () => {
    if (!organization?.id || !canSaveAdminChanges) {
      return;
    }

    const currentAdminUserIdSet = new Set(currentAdminUserIds);
    const draftAdminUserIdSet = new Set(draftAdminUserIds);
    const addUserIds = draftAdminUserIds.filter((userId) => !currentAdminUserIdSet.has(userId));
    const removeUserIds = currentAdminUserIds.filter((userId) => !draftAdminUserIdSet.has(userId));

    try {
      const { data } = await updateOrganizationAdmins({
        variables: {
          input: {
            actorUserId: currentAccountId,
            organizationId: organization.id,
            addUserIds,
            removeUserIds,
          },
        },
      });
      const result = data?.updateOrganizationAdmins;

      if (!result?.success) {
        throw new Error(result?.message ?? 'Organization admins were not updated.');
      }

      await organizationQuery.refetch();
      await activityQuery.refetch();
      await refetchDemoSession();
      setAdminModalOpen(false);
      setDraftAdminUserIds([]);
      setFeedback({
        type: 'success',
        message: 'Org Admins updated',
        description: result.message,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Organization admins were not updated.';

      setFeedback({
        type: 'error',
        message: 'Org Admins were not updated',
        description: errorMessage,
      });
    }
  };

  const adminModalButtons: ModalButtonsType = {
    primary: {
      label: 'Save admins',
      disabled: !canSaveAdminChanges,
      loading: updateAdminsMutation.loading,
      onClick: () => {
        void handleAdminSave();
      },
    },
    secondary: {
      level: 'secondary',
      label: 'Cancel',
      disabled: updateAdminsMutation.loading,
      onClick: closeAdminModal,
    },
  };

  if (organizationQuery.loading && !organization) {
    return (
      <ContentTemplate type="card" pageTitle="Loading organization" onBack={() => navigate(-1)}>
        <DetailCard>
          <PanelHeading>Loading</PanelHeading>
          <PanelText>Loading organization details from the BFF server.</PanelText>
        </DetailCard>
      </ContentTemplate>
    );
  }

  if (detailError || !organization) {
    return (
      <ContentTemplate
        type="error"
        pageTitle="Organization not found"
        errorMessage={
          detailError ?? 'The selected organization does not exist in the BFF data set.'
        }
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
      pageTitle={organization.name}
      titleInfo="Organization detail from the BFF server with scoped normalized activity."
      onBack={() => navigate(-1)}
    >
      <DetailGrid>
        <DetailCard aria-label="Basic information">
          <PanelHeading>Basic information</PanelHeading>
          <DefinitionList>
            <DefinitionItem>
              <DefinitionLabel>Status</DefinitionLabel>
              <DefinitionValue>
                <StatusTag tone={statusToneMap[organization.status]}>
                  {statusLabelMap[organization.status]}
                </StatusTag>
              </DefinitionValue>
            </DefinitionItem>
            <DefinitionItem>
              <DefinitionLabel>Location</DefinitionLabel>
              <DefinitionValue>
                {[organization.city, organization.region, organization.country]
                  .filter(Boolean)
                  .join(', ')}
              </DefinitionValue>
            </DefinitionItem>
            <DefinitionItem>
              <DefinitionLabel>Primary domain</DefinitionLabel>
              <DefinitionValue>{organization.domains[0]?.name ?? 'No domain'}</DefinitionValue>
            </DefinitionItem>
          </DefinitionList>
        </DetailCard>

        <DetailCard aria-label="Relationship summary">
          <PanelHeading>Relationship summary</PanelHeading>
          <DefinitionList>
            <DefinitionItem>
              <DefinitionLabel>Users</DefinitionLabel>
              <DefinitionValue>{organization.userCount}</DefinitionValue>
            </DefinitionItem>
            <DefinitionItem>
              <DefinitionLabel>Admins</DefinitionLabel>
              <DefinitionValue>
                {organization.adminCount ?? organization.admins.length}
              </DefinitionValue>
            </DefinitionItem>
            <DefinitionItem>
              <DefinitionLabel>Domains</DefinitionLabel>
              <DefinitionValue>{organization.domains.length}</DefinitionValue>
            </DefinitionItem>
            <DefinitionItem>
              <DefinitionLabel>Last updated</DefinitionLabel>
              <DefinitionValue>
                {new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(
                  new Date(organization.lastUpdatedOn)
                )}
              </DefinitionValue>
            </DefinitionItem>
          </DefinitionList>
        </DetailCard>

        <DetailCardWide aria-label="Org Admins" clickable onClick={openAdminModal}>
          <PanelHeading>Org Admin</PanelHeading>
          {organization.admins.length > 0 ? (
            <AdminList role="list" aria-label="Current organization admins">
              {organization.admins.map((admin) => (
                <AdminRow key={getAdminId(admin) ?? admin.email} role="listitem">
                  <AdminName>{formatAdminName(admin)}</AdminName>
                  <AdminEmail>{admin.email}</AdminEmail>
                </AdminRow>
              ))}
            </AdminList>
          ) : (
            <PanelText>No Org Admin assigned.</PanelText>
          )}
        </DetailCardWide>

        <DetailCardWide aria-label="Scoped activity">
          <PanelHeading>Scoped Activity Log</PanelHeading>
          <Table
            ariaLabel="Scoped organization activity"
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
        title="Manage Org Admins"
        open={adminModalOpen}
        onClose={closeAdminModal}
        loading={updateAdminsMutation.loading}
        showLoadingIndicator
        disableAutoFocus
        buttonDefs={adminModalButtons}
        maxWidth="sm"
        fullWidth
      >
        <AdminModalBody>
          <ModalContentText>
            Choose members of {organization.name} who should hold the Org Admin role.
          </ModalContentText>
          {organizationMembers.length === 0 ? (
            <PanelText>No organization members available.</PanelText>
          ) : (
            <AdminOptionList aria-label="Organization members">
              {organizationMembers.map((member) => {
                const checked = draftAdminUserIds.includes(member.user.id);
                const disabled = updateAdminsMutation.loading;

                return (
                  <AdminOption
                    key={member.id}
                    data-selected={checked ? 'true' : 'false'}
                    data-disabled={disabled ? 'true' : 'false'}
                  >
                    <AdminOptionCheckbox
                      type="checkbox"
                      checked={checked}
                      disabled={disabled}
                      onChange={() => toggleDraftAdmin(member.user.id)}
                    />
                    <AdminOptionContent>
                      <AdminOptionName>{member.user.name}</AdminOptionName>
                      <AdminOptionEmail>{member.user.email}</AdminOptionEmail>
                    </AdminOptionContent>
                  </AdminOption>
                );
              })}
            </AdminOptionList>
          )}
        </AdminModalBody>
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
