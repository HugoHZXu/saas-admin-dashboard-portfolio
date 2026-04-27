import { normalizeActivityEvent } from '../activity/normalizeActivityEvent';
import { createActivityService } from '../activity/service';
import { mockAuditEvents } from '../mockData/auditEvents';
import { mockOrganizations } from '../mockData/organizations';

describe('activity normalization', () => {
  it('normalizes successful events', () => {
    const activity = normalizeActivityEvent(mockAuditEvents[0], mockOrganizations);

    expect(activity.result).toBe('success');
    expect(activity.actor.displayName).toBe('Jordan Lee');
    expect(activity.organization?.name).toBe('Acme Cloud');
    expect(activity.action).toBe('organizationCreated');
    expect(activity.actionLabel).toMatchObject({
      id: 'orgManagement.activity.action.organizationCreated',
      defaultMessage: 'Created organization',
    });
    expect(activity.summaryMessage).toMatchObject({
      id: 'orgManagement.activity.summary.organizationCreated',
      defaultMessage: '{actorName} created the organization {targetName}.',
    });
    expect(activity.summaryMessage.values).toEqual(
      expect.arrayContaining([
        { key: 'actorName', value: 'Jordan Lee' },
        { key: 'targetName', value: 'Acme Cloud' },
      ])
    );
    expect(activity.summary).toContain('created the organization');
  });

  it('normalizes updated organization events', () => {
    const activity = normalizeActivityEvent(mockAuditEvents[1], mockOrganizations);

    expect(activity.actor.displayName).toBe('Mina Patel');
    expect(activity.action).toBe('organizationUpdated');
    expect(activity.summary).toContain('updated organization settings');
  });

  it('normalizes failed events', () => {
    const activity = normalizeActivityEvent(mockAuditEvents[4], mockOrganizations);

    expect(activity.result).toBe('failed');
    expect(activity.summaryMessage.id).toBe('orgManagement.activity.summary.userDisabled.failed');
    expect(activity.summary).toContain('request failed');
  });

  it('normalizes partial failures from target result details', () => {
    const activity = normalizeActivityEvent(mockAuditEvents[5], mockOrganizations);

    expect(activity.result).toBe('partial');
    expect(activity.action).toBe('domainUpdated');
    expect(activity.summaryMessage.id).toBe('orgManagement.activity.summary.domainUpdated.partial');
  });

  it('normalizes system activity without a normal user actor', () => {
    const activity = normalizeActivityEvent(mockAuditEvents[6], mockOrganizations);

    expect(activity.actor.type).toBe('system');
    expect(activity.actor.displayName).toBe('System Automation');
  });

  it('uses an unknown action fallback for unmapped events', () => {
    const activity = normalizeActivityEvent(mockAuditEvents[7], mockOrganizations);

    expect(activity.action).toBe('unknown');
    expect(activity.actionLabel.id).toBe('orgManagement.activity.action.unknown');
    expect(activity.summaryMessage.id).toBe('orgManagement.activity.summary.unknown');
    expect(activity.summary).toContain('unmapped activity');
  });
});

describe('activity service', () => {
  const service = createActivityService();

  it('filters object-scoped activity by organization', async () => {
    const result = await service.listOrganizationActivityLogs('org-demo-001', {
      pageSize: 10,
    });

    expect(result.totalElements).toBeGreaterThan(0);
    expect(result.items.every((activity) => activity.organization?.id === 'org-demo-001')).toBe(
      true
    );
  });

  it('filters activity by result', async () => {
    const result = await service.listActivityLogs({
      results: ['partial'],
      pageSize: 10,
    });

    expect(result.totalElements).toBe(1);
    expect(result.items[0].result).toBe('partial');
  });
});
