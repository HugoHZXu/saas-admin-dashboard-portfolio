import { Route, Routes } from 'react-router-dom';
import { OrganizationListPage } from '@/features/organizations/OrganizationListPage';
import { ActivityLogPage } from '@/pages/ActivityLogPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { OrganizationDetailPage } from '@/pages/OrganizationDetailPage';
import { PATH_PARAMS } from '@/routes/paths';
import {
  OrgManagementRemoteSessionProvider,
  type OrgManagementRemoteSessionStore,
} from './sessionStore';

export type OrgManagementRoutesProps = {
  sessionStore?: OrgManagementRemoteSessionStore;
};

export function OrgManagementRoutes({ sessionStore }: OrgManagementRoutesProps) {
  return (
    <OrgManagementRemoteSessionProvider sessionStore={sessionStore}>
      <Routes>
        <Route index element={<OrganizationListPage />} />
        <Route path={PATH_PARAMS.ORGANIZATION_DETAIL} element={<OrganizationDetailPage />} />
        <Route path={PATH_PARAMS.ACTIVITY_LOG} element={<ActivityLogPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </OrgManagementRemoteSessionProvider>
  );
}

export { type OrgManagementRemoteSessionStore };

export default OrgManagementRoutes;
