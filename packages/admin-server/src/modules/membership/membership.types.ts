export type AddUserToOrganizationInput = {
  actorUserId?: string | null;
  userId: string;
  organizationId: string;
  roleIds: string[];
  reason?: string | null;
};

export type AddUserToOrganizationByEmailInput = {
  actorUserId?: string | null;
  email: string;
  organizationId: string;
  reason?: string | null;
};

export type ChangeUserRolesInput = AddUserToOrganizationInput;

export type RemoveUserFromOrganizationInput = {
  actorUserId?: string | null;
  userId: string;
  organizationId: string;
  reason?: string | null;
};
