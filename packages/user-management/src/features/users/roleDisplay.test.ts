import { describe, expect, it } from 'vitest';
import {
  WORKSPACE_MEMBER_DISPLAY_ROLE_KEY,
  getAssignableRoles,
  getDisplayRoles,
  getRoleNamesLabel,
} from './roleDisplay';
import type { Role } from '@/api/types';

const roles: Role[] = [
  {
    id: 'role-1',
    key: 'organization_admin',
    name: 'Organization Admin',
  },
  {
    id: 'display-workspace-member',
    key: WORKSPACE_MEMBER_DISPLAY_ROLE_KEY,
    name: 'Workspace Member',
  },
];

describe('user role display helpers', () => {
  it('excludes the derived workspace member role from assignable roles', () => {
    expect(getAssignableRoles(roles)).toEqual([roles[0]]);
  });

  it('falls back to a derived workspace member display role', () => {
    expect(getDisplayRoles([])).toEqual([
      {
        id: 'display-workspace-member',
        key: WORKSPACE_MEMBER_DISPLAY_ROLE_KEY,
        name: 'Workspace Member',
        derived: true,
      },
    ]);
  });

  it('formats display role names into a readable label', () => {
    expect(getRoleNamesLabel(roles)).toBe('Organization Admin');
    expect(getRoleNamesLabel([])).toBe('Workspace Member');
  });
});
