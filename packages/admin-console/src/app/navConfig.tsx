import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BusinessIcon from '@mui/icons-material/Business';
import GroupIcon from '@mui/icons-material/Group';
import HistoryIcon from '@mui/icons-material/History';
import type { DemoCapabilities } from 'admin-shared';
import type { PageTemplateNavItem } from 'hugo-ui';

export const ADMIN_CONSOLE_PATHS = {
  orgManagement: '/org-management',
  orgManagementActivityLog: '/org-management/activity-log',
  userManagement: '/user-management',
  userManagementActivityLog: '/user-management/activity-log',
} as const;

export const NAV_IDS = {
  ORG_MANAGEMENT: 'orgManagement',
  ORG_ACTIVITY_LOG: 'orgActivityLog',
  USER_MANAGEMENT: 'userManagement',
  USER_ACTIVITY_LOG: 'userActivityLog',
} as const;

export const emptyCapabilities: DemoCapabilities = {
  orgManagement: false,
  userManagement: false,
};

export const hasAnyAdminCapability = (capabilities: DemoCapabilities) =>
  capabilities.orgManagement || capabilities.userManagement;

export const getDefaultAdminPath = (capabilities: DemoCapabilities) => {
  if (capabilities.orgManagement) {
    return ADMIN_CONSOLE_PATHS.orgManagement;
  }

  if (capabilities.userManagement) {
    return ADMIN_CONSOLE_PATHS.userManagement;
  }

  return '/';
};

export const createAdminNavItems = (capabilities: DemoCapabilities): PageTemplateNavItem[] => {
  const navItems: PageTemplateNavItem[] = [];

  if (capabilities.orgManagement) {
    navItems.push({
      id: NAV_IDS.ORG_MANAGEMENT,
      label: 'Organization Management',
      icon: <BusinessIcon fontSize="small" />,
      path: ADMIN_CONSOLE_PATHS.orgManagement,
      children: [
        {
          id: NAV_IDS.ORG_ACTIVITY_LOG,
          label: 'Activity Log',
          icon: <HistoryIcon fontSize="small" />,
          path: ADMIN_CONSOLE_PATHS.orgManagementActivityLog,
        },
      ],
    });
  }

  if (capabilities.userManagement) {
    navItems.push({
      id: NAV_IDS.USER_MANAGEMENT,
      label: 'User Management',
      icon: <GroupIcon fontSize="small" />,
      path: ADMIN_CONSOLE_PATHS.userManagement,
      children: [
        {
          id: NAV_IDS.USER_ACTIVITY_LOG,
          label: 'Activity Log',
          icon: <HistoryIcon fontSize="small" />,
          path: ADMIN_CONSOLE_PATHS.userManagementActivityLog,
        },
      ],
    });
  }

  return navItems;
};

export const getSelectedNavId = (pathname: string) => {
  if (pathname.startsWith(ADMIN_CONSOLE_PATHS.orgManagementActivityLog)) {
    return NAV_IDS.ORG_ACTIVITY_LOG;
  }

  if (pathname.startsWith(ADMIN_CONSOLE_PATHS.orgManagement)) {
    return NAV_IDS.ORG_MANAGEMENT;
  }

  if (pathname.startsWith(ADMIN_CONSOLE_PATHS.userManagementActivityLog)) {
    return NAV_IDS.USER_ACTIVITY_LOG;
  }

  if (pathname.startsWith(ADMIN_CONSOLE_PATHS.userManagement)) {
    return NAV_IDS.USER_MANAGEMENT;
  }

  return undefined;
};

export const getDefaultExpandedNavIds = (pathname: string) => {
  if (pathname.startsWith(ADMIN_CONSOLE_PATHS.userManagement)) {
    return [NAV_IDS.USER_MANAGEMENT];
  }

  if (pathname.startsWith(ADMIN_CONSOLE_PATHS.orgManagement)) {
    return [NAV_IDS.ORG_MANAGEMENT];
  }

  return [NAV_IDS.ORG_MANAGEMENT, NAV_IDS.USER_MANAGEMENT];
};

export const getPathForNavSelection = (selection: string) => {
  switch (selection) {
    case NAV_IDS.ORG_MANAGEMENT:
      return ADMIN_CONSOLE_PATHS.orgManagement;
    case NAV_IDS.ORG_ACTIVITY_LOG:
      return ADMIN_CONSOLE_PATHS.orgManagementActivityLog;
    case NAV_IDS.USER_MANAGEMENT:
      return ADMIN_CONSOLE_PATHS.userManagement;
    case NAV_IDS.USER_ACTIVITY_LOG:
      return ADMIN_CONSOLE_PATHS.userManagementActivityLog;
    default:
      return undefined;
  }
};

export const AdminConsoleIcon = <AdminPanelSettingsIcon />;
