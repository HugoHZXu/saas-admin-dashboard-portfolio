import { useEffect } from 'react';
import { clearStoredIdentityToken } from 'admin-shared';
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import { DemoSessionProvider } from '@/features/demoSession/DemoSessionContext';
import { clearStoredAccountId } from '@/features/demoSession/demoSessionStorage';
import { WithNavsContainer } from '@/navs/WithNavsContainer';
import { ActivityLogPage } from '@/pages/ActivityLogPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { OrganizationDetailPage } from '@/pages/OrganizationDetailPage';
import { OrganizationListPage } from '@/features/organizations/OrganizationListPage';
import { PATH_PARAMS } from '@/routes/paths';

function ResetDemoSessionRoute() {
  const navigate = useNavigate();

  useEffect(() => {
    clearStoredAccountId();
    clearStoredIdentityToken();
    navigate('/', { replace: true });
  }, [navigate]);

  return null;
}

export function App() {
  return (
    <Routes>
      {import.meta.env.DEV && (
        <Route path="__dev/reset-demo-session" element={<ResetDemoSessionRoute />} />
      )}
      <Route
        element={
          <DemoSessionProvider>
            <WithNavsContainer>
              <Outlet />
            </WithNavsContainer>
          </DemoSessionProvider>
        }
      >
        <Route index element={<OrganizationListPage />} />
        <Route path={PATH_PARAMS.ORGANIZATION_DETAIL} element={<OrganizationDetailPage />} />
        <Route path={PATH_PARAMS.ACTIVITY_LOG} element={<ActivityLogPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
