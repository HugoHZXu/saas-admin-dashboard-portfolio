import { createOrganizationService } from '../organizations/service';

describe('organization service', () => {
  const service = createOrganizationService();

  it('filters organizations by search string', async () => {
    const result = await service.listOrganizations({
      searchString: 'vertex',
      pageSize: 10,
    });

    expect(result.totalElements).toBe(1);
    expect(result.items[0].name).toBe('Vertex Systems');
  });

  it('filters organizations by status', async () => {
    const result = await service.listOrganizations({
      statuses: ['archived'],
      pageSize: 10,
    });

    expect(result.totalElements).toBe(1);
    expect(result.items[0].status).toBe('archived');
  });

  it('sorts and paginates organizations', async () => {
    const result = await service.listOrganizations({
      sortField: 'userCount',
      sortDirection: 'desc',
      pageNumber: 0,
      pageSize: 2,
    });

    expect(result.items).toHaveLength(2);
    expect(result.items[0].userCount).toBeGreaterThanOrEqual(result.items[1].userCount);
    expect(result.totalPages).toBeGreaterThan(1);
    expect(result.isFirstPage).toBe(true);
    expect(result.isLastPage).toBe(false);
  });

  it('returns organization detail by id', async () => {
    const organization = await service.getOrganizationDetail('org-demo-001');

    expect(organization?.name).toBe('Acme Cloud');
    expect(organization?.domains[0].name).toBe('acme-cloud.example');
  });

  it('returns undefined for missing organization detail', async () => {
    const organization = await service.getOrganizationDetail('missing-org');

    expect(organization).toBeUndefined();
  });
});
