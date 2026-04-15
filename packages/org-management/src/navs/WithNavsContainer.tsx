import type { ReactNode } from 'react';
import BusinessIcon from '@mui/icons-material/Business';
import { PageTemplate } from 'hugo-ui';
import { useLocation } from 'react-router-dom';
import { NAV_IDS, useNavsConfig } from './useNavsConfig';

type WithNavsContainerProps = {
  children: ReactNode;
};

const getSelection = (pathname: string) => {
  if (pathname.includes('/activity-log')) {
    return NAV_IDS.ACTIVITY_LOG;
  }
  return NAV_IDS.ORGANIZATIONS;
};

export function WithNavsContainer({ children }: WithNavsContainerProps) {
  const { pathname } = useLocation();
  const { navItems, onBeforeSelection, onSelection } = useNavsConfig();
  const selection = getSelection(pathname);

  return (
    <PageTemplate
      appTitle="Organization Management"
      appIcon={<BusinessIcon />}
      navProps={{
        navItems,
        defaultExpanded: [NAV_IDS.ORGANIZATIONS],
        defaultSelected: selection,
        onBeforeSelection: (nextSelection, setSelection) => {
          onBeforeSelection(nextSelection, () => {
            setSelection();
            onSelection(nextSelection);
          });
        },
      }}
    >
      {children}
    </PageTemplate>
  );
}
