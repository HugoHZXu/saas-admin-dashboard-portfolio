import type { ReactNode } from 'react';
import GroupIcon from '@mui/icons-material/Group';
import { ContentTemplate, DetailCard, PageTemplate } from 'hugo-ui';
import { useLocation } from 'react-router-dom';
import { AccountMenu } from '@/features/demoSession/AccountMenu';
import { useDemoSession } from '@/features/demoSession/DemoSessionContext';
import { NoAccessPage } from '@/pages/NoAccessPage';
import { PanelHeading, PanelText } from '@/pages/pageStyles';
import { NAV_IDS, useNavsConfig } from './useNavsConfig';

type WithNavsContainerProps = {
  children: ReactNode;
};

const getSelection = (pathname: string) => {
  if (pathname.includes('/activity-log')) {
    return NAV_IDS.ACTIVITY_LOG;
  }

  return NAV_IDS.USERS;
};

export function WithNavsContainer({ children }: WithNavsContainerProps) {
  const { pathname } = useLocation();
  const { navItems, onBeforeSelection, onSelection } = useNavsConfig();
  const { capabilities, loading, errorMessage } = useDemoSession();
  const selection = getSelection(pathname);
  const canAccessUserManagement = capabilities.userManagement;

  const content = (() => {
    if (loading) {
      return (
        <ContentTemplate type="card" pageTitle="Loading account">
          <DetailCard aria-label="Loading account context">
            <PanelHeading>Loading account</PanelHeading>
            <PanelText>Loading demo account access from the admin BFF.</PanelText>
          </DetailCard>
        </ContentTemplate>
      );
    }

    if (errorMessage) {
      return (
        <NoAccessPage
          title="Account unavailable"
          message="The demo account context is unavailable. Use the account menu to retry or switch accounts."
        />
      );
    }

    if (!canAccessUserManagement) {
      return <NoAccessPage />;
    }

    return children;
  })();

  return (
    <PageTemplate
      appTitle="User Management"
      appIcon={<GroupIcon />}
      titleSlot={<AccountMenu />}
      navProps={{
        navItems,
        defaultExpanded: [NAV_IDS.USERS],
        defaultSelected: selection,
        hidden: !canAccessUserManagement,
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
