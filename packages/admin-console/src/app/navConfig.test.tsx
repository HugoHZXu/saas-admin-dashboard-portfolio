import { describe, expect, it } from 'vitest';
import {
  ADMIN_CONSOLE_PATHS,
  NAV_IDS,
  createAdminNavItems,
  getDefaultAdminPath,
  getDefaultExpandedNavIds,
  getPathForNavSelection,
  getSelectedNavId,
  hasAnyAdminCapability,
} from './navConfig';

describe('admin console navigation config', () => {
  it('creates navigation items from enabled capabilities', () => {
    const navItems = createAdminNavItems({
      orgManagement: true,
      userManagement: true,
    });

    expect(navItems.map((item) => item.id)).toEqual([
      NAV_IDS.ORG_MANAGEMENT,
      NAV_IDS.USER_MANAGEMENT,
    ]);
    expect(navItems[0]?.children?.[0]?.id).toBe(NAV_IDS.ORG_ACTIVITY_LOG);
    expect(navItems[1]?.children?.[0]?.path).toBe(
      ADMIN_CONSOLE_PATHS.userManagementActivityLog
    );
  });

  it('selects the most specific navigation item for activity routes', () => {
    expect(getSelectedNavId('/org-management/activity-log')).toBe(NAV_IDS.ORG_ACTIVITY_LOG);
    expect(getSelectedNavId('/org-management/organizations/detail/org-1')).toBe(
      NAV_IDS.ORG_MANAGEMENT
    );
    expect(getSelectedNavId('/user-management/activity-log')).toBe(NAV_IDS.USER_ACTIVITY_LOG);
    expect(getSelectedNavId('/user-management/users/detail/user-1')).toBe(
      NAV_IDS.USER_MANAGEMENT
    );
  });

  it('resolves default paths and expanded groups from capabilities and paths', () => {
    expect(getDefaultAdminPath({ orgManagement: true, userManagement: true })).toBe(
      ADMIN_CONSOLE_PATHS.orgManagement
    );
    expect(getDefaultAdminPath({ orgManagement: false, userManagement: true })).toBe(
      ADMIN_CONSOLE_PATHS.userManagement
    );
    expect(getDefaultAdminPath({ orgManagement: false, userManagement: false })).toBe('/');

    expect(hasAnyAdminCapability({ orgManagement: false, userManagement: false })).toBe(false);
    expect(getDefaultExpandedNavIds('/user-management')).toEqual([NAV_IDS.USER_MANAGEMENT]);
    expect(getPathForNavSelection(NAV_IDS.ORG_ACTIVITY_LOG)).toBe(
      ADMIN_CONSOLE_PATHS.orgManagementActivityLog
    );
  });
});
