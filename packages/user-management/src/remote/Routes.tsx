import { Route, Routes } from 'react-router-dom';
import { UserListPage } from '@/features/users/UserListPage';
import { OrganizationScopeProvider } from '@/features/scope/OrganizationScopeContext';
import { ActivityLogPage } from '@/pages/ActivityLogPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { UserDetailPage } from '@/pages/UserDetailPage';
import { PATH_PARAMS } from '@/routes/paths';
import {
  UserManagementRemoteSessionProvider,
  type UserManagementRemoteSessionStore,
} from './sessionStore';

export type UserManagementRoutesProps = {
  sessionStore?: UserManagementRemoteSessionStore;
};

export function UserManagementRoutes({ sessionStore }: UserManagementRoutesProps) {
  return (
    <UserManagementRemoteSessionProvider sessionStore={sessionStore}>
      <OrganizationScopeProvider>
        <Routes>
          <Route index element={<UserListPage />} />
          <Route path={PATH_PARAMS.USER_DETAIL} element={<UserDetailPage />} />
          <Route path={PATH_PARAMS.ACTIVITY_LOG} element={<ActivityLogPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </OrganizationScopeProvider>
    </UserManagementRemoteSessionProvider>
  );
}

export { type UserManagementRemoteSessionStore };

export default UserManagementRoutes;
