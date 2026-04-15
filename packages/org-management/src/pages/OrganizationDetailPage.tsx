import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ContentTemplate, StatusTag, StatusTagTone } from 'hugo-ui';
import { organizations, OrganizationStatus } from '@/features/organizations/mockOrganizations';
import {
  DefinitionItem,
  DefinitionLabel,
  DefinitionList,
  DefinitionValue,
  DetailCard,
  DetailCardWide,
  DetailGrid,
  PanelHeading,
  PanelText,
} from './pageStyles';

const statusToneMap: Record<OrganizationStatus, StatusTagTone> = {
  Active: 'success',
  Paused: 'warning',
  Archived: 'neutral',
};

export function OrganizationDetailPage() {
  const navigate = useNavigate();
  const { organizationId } = useParams();
  const organization = useMemo(
    () => organizations.find((item) => item.id === organizationId),
    [organizationId]
  );

  if (!organization) {
    return (
      <ContentTemplate
        type="error"
        pageTitle="Organization not found"
        errorMessage="The selected organization does not exist in the mock data set."
        onBack={() => navigate(-1)}
      />
    );
  }

  return (
    <ContentTemplate
      type="card"
      pageTitle={organization.name}
      titleInfo="Organization detail placeholder for domains, admins, users, and scoped activity."
      onBack={() => navigate(-1)}
    >
      <DetailGrid>
        <DetailCard aria-label="Basic information">
          <PanelHeading>Basic information</PanelHeading>
          <DefinitionList>
            <DefinitionItem>
              <DefinitionLabel>Status</DefinitionLabel>
              <DefinitionValue>
                <StatusTag tone={statusToneMap[organization.status]}>{organization.status}</StatusTag>
              </DefinitionValue>
            </DefinitionItem>
            <DefinitionItem>
              <DefinitionLabel>Plan</DefinitionLabel>
              <DefinitionValue>{organization.plan}</DefinitionValue>
            </DefinitionItem>
            <DefinitionItem>
              <DefinitionLabel>Primary domain</DefinitionLabel>
              <DefinitionValue>{organization.primaryDomain}</DefinitionValue>
            </DefinitionItem>
          </DefinitionList>
        </DetailCard>

        <DetailCard aria-label="Relationship summary">
          <PanelHeading>Relationship summary</PanelHeading>
          <DefinitionList>
            <DefinitionItem>
              <DefinitionLabel>Users</DefinitionLabel>
              <DefinitionValue>{organization.users}</DefinitionValue>
            </DefinitionItem>
            <DefinitionItem>
              <DefinitionLabel>Admins</DefinitionLabel>
              <DefinitionValue>{organization.admins}</DefinitionValue>
            </DefinitionItem>
            <DefinitionItem>
              <DefinitionLabel>Domains</DefinitionLabel>
              <DefinitionValue>{organization.domains}</DefinitionValue>
            </DefinitionItem>
          </DefinitionList>
        </DetailCard>

        <DetailCardWide aria-label="Scoped activity">
          <PanelHeading>Scoped Activity Log</PanelHeading>
          <PanelText>
            Object-scoped audit records will be rendered here after the mock BFF normalizes raw
            activity events.
          </PanelText>
        </DetailCardWide>
      </DetailGrid>
    </ContentTemplate>
  );
}
