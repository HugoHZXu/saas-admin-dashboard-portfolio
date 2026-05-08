import type { ReactNode } from 'react';
import BusinessIcon from '@mui/icons-material/Business';
import { PageTemplate } from 'hugo-ui';
import { useLocation } from 'react-router-dom';
import { AccountMenu } from '@/features/demoSession/AccountMenu';
import { useDemoSession } from '@/features/demoSession/DemoSessionContext';
import { NoAccessPage } from '@/pages/NoAccessPage';
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
  const { session, loading, errorMessage } = useDemoSession();
  const selection = getSelection(pathname);
  const canAccessOrgManagement = Boolean(session?.capabilities.orgManagement);

  const content = (() => {
    if (loading) {
      return <NoAccessPage state="loading" />;
    }

    if (errorMessage) {
      return <NoAccessPage state="error" errorMessage={errorMessage} />;
    }

    if (!canAccessOrgManagement) {
      return <NoAccessPage />;
    }

    return children;
  })();

  return (
    <PageTemplate
      appTitle="Organization Management"
      appIcon={<BusinessIcon />}
      titleSlot={<AccountMenu />}
      navProps={{
        navItems,
        defaultExpanded: [NAV_IDS.ORGANIZATIONS],
        defaultSelected: selection,
        hidden: !canAccessOrgManagement,
        onBeforeSelection: (nextSelection, setSelection) => {
          onBeforeSelection(nextSelection, () => {
            setSelection();
            onSelection(nextSelection);
          });
        },
      }}
    >
      {content}
    </PageTemplate>
  );
}
