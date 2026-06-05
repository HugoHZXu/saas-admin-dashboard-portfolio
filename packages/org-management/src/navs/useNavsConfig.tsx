import BusinessIcon from '@mui/icons-material/Business';
import HistoryIcon from '@mui/icons-material/History';
import { PageTemplateNavItem } from '@hugo-ui/mui';
import { useNavigate } from 'react-router-dom';
import { PATH_PARAMS } from '@/routes/paths';

export const NAV_IDS = {
  ORGANIZATIONS: 'organizations',
  ACTIVITY_LOG: 'activityLog',
} as const;

export function useNavsConfig() {
  const navigate = useNavigate();

  const navItems: PageTemplateNavItem[] = [
    {
      id: NAV_IDS.ORGANIZATIONS,
      label: 'Organizations',
      icon: <BusinessIcon fontSize="small" />,
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
        navigate(PATH_PARAMS.ACTIVITY_LOG);
        break;
      case NAV_IDS.ORGANIZATIONS:
        navigate('.');
        break;
      default:
        break;
    }
  };

  return { navItems, onBeforeSelection, onSelection };
}
