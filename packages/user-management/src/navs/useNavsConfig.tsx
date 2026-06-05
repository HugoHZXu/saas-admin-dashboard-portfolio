import GroupIcon from '@mui/icons-material/Group';
import HistoryIcon from '@mui/icons-material/History';
import { PageTemplateNavItem } from '@hugo-ui/mui';
import { useLocation, useNavigate } from 'react-router-dom';
import { PATH_PARAMS } from '@/routes/paths';

export const NAV_IDS = {
  USERS: 'users',
  ACTIVITY_LOG: 'activityLog',
} as const;

export function useNavsConfig() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems: PageTemplateNavItem[] = [
    {
      id: NAV_IDS.USERS,
      label: 'Users',
      icon: <GroupIcon fontSize="small" />,
      path: '.',
      children: [
        {
          id: NAV_IDS.ACTIVITY_LOG,
          label: 'Activity Log',
          icon: <HistoryIcon fontSize="small" />,
          path: PATH_PARAMS.ACTIVITY_LOG,
        },
      ],
    },
  ];

  const onBeforeSelection = (_nextSelection: string, onSelection: () => void) => {
    onSelection();
  };

  const onSelection = (selection: string) => {
    switch (selection) {
      case NAV_IDS.ACTIVITY_LOG:
        navigate({ pathname: `/${PATH_PARAMS.ACTIVITY_LOG}`, search: location.search });
        break;
      case NAV_IDS.USERS:
        navigate({ pathname: '/', search: location.search });
        break;
      default:
        break;
    }
  };

  return { navItems, onBeforeSelection, onSelection };
}
