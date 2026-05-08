import { PageQuery } from '../../shared/result';
import { Role } from '../role/role.types';

export type OrganizationStatus = 'active' | 'inactive' | 'archived';
export type OrganizationKind = 'internal' | 'tenant' | 'public';

export type OrganizationDomain = {
  name: string;
  userCount: number;
  status?: string | null;
};

export type OrganizationAdmin = {
  id?: string | null;
  referenceId?: string | null;
  firstName: string;
  lastName: string;
  email: string;
  disabled?: boolean | null;
};

export type OrganizationMember = {
  id: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  status: string;
  roles: Role[];
};

export type Organization = {
  id?: string | null;
  referenceId: string;
  name: string;
  kind: OrganizationKind;
  description?: string | null;
  address?: string | null;
  address2?: string | null;
  city?: string | null;
  region?: string | null;
  postalCode?: string | null;
  country: string;
  timezone?: string | null;
  domains: OrganizationDomain[];
  admins: OrganizationAdmin[];
  createdOn: string;
  lastUpdatedOn: string;
  userCount: number;
  adminCount?: number | null;
  status: OrganizationStatus;
  memberships?: OrganizationMember[];
};

export type OrganizationListQuery = PageQuery & {
  searchString?: string | null;
  statuses?: OrganizationStatus[] | null;
  kinds?: OrganizationKind[] | null;
};
