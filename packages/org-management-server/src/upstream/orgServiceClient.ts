import { Organization } from '../domain/types';
import { executeMockGraphql } from './mockGraphqlExecutor';
import { createMockOrgGraphqlSchema } from './mockOrgGraphqlSchema';

export type OrgServiceClient = {
  listOrganizations: () => Promise<Organization[]>;
  getOrganizationById: (id: string) => Promise<Organization | undefined>;
};

type ListOrganizationsData = {
  organizations: Organization[];
};

type GetOrganizationByIdData = {
  organization?: Organization | null;
};

const ORGANIZATION_FIELDS = `
  id
  referenceId
  name
  description
  address
  address2
  city
  region
  postalCode
  country
  timezone
  domains {
    name
    userCount
    status
  }
  admins {
    id
    referenceId
    firstName
    lastName
    email
    disabled
  }
  createdOn
  lastUpdatedOn
  userCount
  adminCount
  status
`;

const LIST_ORGANIZATIONS_QUERY = `
  query MockUpstreamOrganizations {
    organizations {
      ${ORGANIZATION_FIELDS}
    }
  }
`;

const GET_ORGANIZATION_BY_ID_QUERY = `
  query MockUpstreamOrganization($id: ID!) {
    organization(id: $id) {
      ${ORGANIZATION_FIELDS}
    }
  }
`;

export const createMockOrgServiceClient = (): OrgServiceClient => ({
  async listOrganizations() {
    const data = await executeMockGraphql<ListOrganizationsData>({
      schema: createMockOrgGraphqlSchema(),
      source: LIST_ORGANIZATIONS_QUERY,
    });

    return data.organizations;
  },

  async getOrganizationById(id) {
    const data = await executeMockGraphql<GetOrganizationByIdData, { id: string }>({
      schema: createMockOrgGraphqlSchema(),
      source: GET_ORGANIZATION_BY_ID_QUERY,
      variableValues: { id },
    });

    return data.organization ?? undefined;
  },
});
