import { Outlet, Route, Routes } from 'react-router-dom';
import { WithNavsContainer } from '@/navs/WithNavsContainer';
import { ActivityLogPage } from '@/pages/ActivityLogPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { OrganizationDetailPage } from '@/pages/OrganizationDetailPage';
import { OrganizationListPage } from '@/features/organizations/OrganizationListPage';
import { PATH_PARAMS } from '@/routes/paths';

export function App() {
  return (
    <Routes>
      <Route
        element={
          <WithNavsContainer>
            <Outlet />
          </WithNavsContainer>
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
