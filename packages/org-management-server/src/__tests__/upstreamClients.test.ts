import { createMockAuditServiceClient } from '../upstream/auditServiceClient';
import { createMockOrgServiceClient } from '../upstream/orgServiceClient';

describe('mock upstream GraphQL clients', () => {
  it('loads organizations through the in-memory GraphQL upstream', async () => {
    const client = createMockOrgServiceClient();
    const organizations = await client.listOrganizations();

    expect(organizations.length).toBeGreaterThan(1);
    expect(organizations[0]).toMatchObject({
      id: 'org-demo-001',
      name: 'Acme Cloud',
      domains: expect.arrayContaining([
        expect.objectContaining({
          name: 'acme-cloud.example',
        }),
      ]),
    });
  });

  it('loads one organization by id through the in-memory GraphQL upstream', async () => {
    const client = createMockOrgServiceClient();

    await expect(client.getOrganizationById('org-demo-001')).resolves.toMatchObject({
      id: 'org-demo-001',
      name: 'Acme Cloud',
    });
    await expect(client.getOrganizationById('missing-org')).resolves.toBeUndefined();
  });

  it('loads raw audit events through the in-memory GraphQL upstream', async () => {
    const client = createMockAuditServiceClient();
    const events = await client.listAuditEvents();
    const partialEvent = events.find((event) => event.id === 'audit-demo-006');

    expect(events.length).toBeGreaterThan(1);
    expect(events[0]).toMatchObject({
      id: 'audit-demo-001',
      eventName: 'organization.created',
      targets: expect.any(Array),
    });
    expect(partialEvent?.targets[0].resultDetails).toMatchObject({
      operationResults: expect.arrayContaining([
        expect.objectContaining({ name: 'acme-cloud.example', successful: true }),
        expect.objectContaining({ name: 'ops.acme-cloud.example', successful: false }),
      ]),
    });
  });
});
