import { useEffect } from 'react';
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import { DemoSessionProvider } from '@/features/demoSession/DemoSessionContext';
import { clearStoredAccountId } from '@/features/demoSession/demoSessionStorage';
import { OrganizationScopeProvider } from '@/features/scope/OrganizationScopeContext';
import { WithNavsContainer } from '@/navs/WithNavsContainer';
import { ActivityLogPage } from '@/pages/ActivityLogPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { UserDetailPage } from '@/pages/UserDetailPage';
import { UserListPage } from '@/features/users/UserListPage';
import { PATH_PARAMS } from '@/routes/paths';

function ResetDemoSessionRoute() {
  const navigate = useNavigate();

  useEffect(() => {
    clearStoredAccountId();
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
            <OrganizationScopeProvider>
              <WithNavsContainer>
                <Outlet />
              </WithNavsContainer>
            </OrganizationScopeProvider>
          </DemoSessionProvider>
        }
      >
        <Route index element={<UserListPage />} />
        <Route path={PATH_PARAMS.USER_DETAIL} element={<UserDetailPage />} />
        <Route path={PATH_PARAMS.ACTIVITY_LOG} element={<ActivityLogPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
