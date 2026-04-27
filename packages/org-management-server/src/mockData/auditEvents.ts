import { RawAuditEvent, RawAuditResultDetails, RawUser } from '../upstream/types';
import { mockOrganizations } from './organizations';

const actors = {
  jordan: {
    id: 'user-demo-001',
    email: 'jordan.lee@acme-cloud.example',
    givenName: 'Jordan',
    familyName: 'Lee',
  },
  mina: {
    id: 'user-demo-002',
    email: 'mina.patel@acme-cloud.example',
    givenName: 'Mina',
    familyName: 'Patel',
  },
  sam: {
    id: 'user-demo-003',
    email: 'sam.rivera@northstar-labs.example',
    givenName: 'Sam',
    familyName: 'Rivera',
  },
  avery: {
    id: 'user-demo-004',
    email: 'avery.chen@vertex-systems.example',
    givenName: 'Avery',
    familyName: 'Chen',
  },
} satisfies Record<string, RawUser>;

const orgTarget = (orgId: string, resultDetails?: RawAuditResultDetails) => {
  const organization = mockOrganizations.find((item) => item.id === orgId);

  if (!organization) {
    throw new Error(`Missing mock organization ${orgId}`);
  }

  return {
    orgId: organization.id,
    orgReferenceId: organization.referenceId,
    orgName: organization.name,
    resultDetails,
  };
};

export const mockAuditEvents: RawAuditEvent[] = [
  {
    id: 'audit-demo-001',
    i18n: 'portfolio.audit.organization.created',
    actor: actors.jordan,
    eventTime: '2026-05-26T15:48:00.000Z',
    eventType: 'organization',
    eventSource: 'organization-service',
    eventName: 'organization.created',
    successful: true,
    targets: [orgTarget('org-demo-001')],
  },
  {
    id: 'audit-demo-002',
    i18n: 'portfolio.audit.organization.updated',
    actor: actors.mina,
    eventTime: '2026-05-25T20:10:00.000Z',
    eventType: 'organization',
    eventSource: 'organization-service',
    eventName: 'organization.updated',
    successful: true,
    targets: [orgTarget('org-demo-001', { changedFields: ['city', 'timezone'] })],
  },
  {
    id: 'audit-demo-003',
    i18n: 'portfolio.audit.domain.verified',
    actor: actors.avery,
    eventTime: '2026-05-25T18:34:00.000Z',
    eventType: 'domain',
    eventSource: 'organization-service',
    eventName: 'domain.verified',
    successful: true,
    targets: [
      {
        ...orgTarget('org-demo-003'),
        domainId: 'domain-demo-003',
        domainName: 'vertex-systems.example',
      },
    ],
  },
  {
    id: 'audit-demo-004',
    i18n: 'portfolio.audit.admin.added',
    actor: actors.sam,
    eventTime: '2026-05-24T13:26:00.000Z',
    eventType: 'admin',
    eventSource: 'organization-service',
    eventName: 'admin.added',
    successful: true,
    targets: [
      {
        ...orgTarget('org-demo-002'),
        userId: 'admin-demo-003',
        email: 'sam.rivera@northstar-labs.example',
        givenName: 'Sam',
        familyName: 'Rivera',
      },
    ],
  },
  {
    id: 'audit-demo-005',
    i18n: 'portfolio.audit.user.disabled',
    actor: actors.avery,
    eventTime: '2026-05-23T10:18:00.000Z',
    eventType: 'user',
    eventSource: 'organization-service',
    eventName: 'user.disabled',
    successful: false,
    targets: [
      {
        ...orgTarget('org-demo-003', { failureReason: 'synthetic validation failure' }),
        userId: 'user-demo-041',
        email: 'case.example@vertex-systems.example',
        givenName: 'Case',
        familyName: 'Example',
      },
    ],
  },
  {
    id: 'audit-demo-006',
    i18n: 'portfolio.audit.domain.updated',
    actor: actors.jordan,
    eventTime: '2026-05-22T16:42:00.000Z',
    eventType: 'domain',
    eventSource: 'organization-service',
    eventName: 'domain.updated',
    successful: true,
    targets: [
      {
        ...orgTarget('org-demo-001', {
          operationResults: [
            { name: 'acme-cloud.example', successful: true },
            { name: 'ops.acme-cloud.example', successful: false },
          ],
        }),
        domainId: 'domain-demo-001',
        domainName: 'ops.acme-cloud.example',
      },
    ],
  },
  {
    id: 'audit-demo-007',
    i18n: 'portfolio.audit.organization.archived',
    eventTime: '2026-04-14T13:08:00.000Z',
    eventType: 'organization',
    eventSource: 'scheduled-maintenance',
    eventName: 'organization.archived',
    successful: true,
    targets: [orgTarget('org-demo-004')],
  },
  {
    id: 'audit-demo-008',
    i18n: 'portfolio.audit.unknown',
    actor: actors.jordan,
    eventTime: '2026-04-10T09:00:00.000Z',
    eventType: 'unknown',
    eventSource: 'portfolio-demo-source',
    eventName: 'portfolio.unmapped_event',
    successful: true,
    targets: [orgTarget('org-demo-005')],
  },
];
