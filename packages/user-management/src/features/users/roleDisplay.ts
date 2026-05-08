import type { Role } from '@/api/types';

export const WORKSPACE_MEMBER_DISPLAY_ROLE_KEY = 'workspace_member';

export type DisplayRole = Role & {
  derived?: boolean;
};

const workspaceMemberDisplayRole: DisplayRole = {
  id: 'display-workspace-member',
  key: WORKSPACE_MEMBER_DISPLAY_ROLE_KEY,
  name: 'Workspace Member',
  derived: true,
};

export const getAssignableRoles = (roles: Role[]) =>
  roles.filter((role) => role.key !== WORKSPACE_MEMBER_DISPLAY_ROLE_KEY);

export const getDisplayRoles = (roles: Role[]): DisplayRole[] => {
  const assignableRoles = getAssignableRoles(roles);

  return assignableRoles.length > 0 ? assignableRoles : [workspaceMemberDisplayRole];
};

export const getRoleNamesLabel = (roles: Role[]) =>
  getDisplayRoles(roles)
    .map((role) => role.name)
    .join(', ');
