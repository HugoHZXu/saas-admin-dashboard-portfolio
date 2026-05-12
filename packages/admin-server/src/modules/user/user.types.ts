import { PageQuery } from '../../shared/result';
import { Role } from '../role/role.types';

export type UserAccountStatus = 'Active' | 'Suspended' | 'Incomplete';

export type IdName = {
  id: string;
  name: string;
};

export type UserListItem = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  accountStatus: UserAccountStatus;
  flaggedForDeletion: boolean;
  lastSignedIn: string | null;
  dateRegistered: string;
  membershipId: string;
  organization: IdName;
  roles: Role[];
};

export type UserMembership = {
  id: string;
  organization: IdName;
  roles: Role[];
  createdAt: string;
};

export type UserDetail = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  accountStatus: UserAccountStatus;
  flaggedForDeletion: boolean;
  lastSignedIn: string | null;
  dateRegistered: string;
  memberships: UserMembership[];
};

export type UserDetailQuery = {
  id: string;
  organizationId: string;
};

export type UserListQuery = PageQuery & {
  organizationId: string;
  searchString?: string | null;
  accountStatuses?: UserAccountStatus[] | null;
  roleKeys?: string[] | null;
};

export type SuspendUserInput = {
  actorUserId?: string | null;
  userId: string;
  reason?: string | null;
};

export type ActivateUserInput = {
  actorUserId?: string | null;
  userId: string;
  reason?: string | null;
};
