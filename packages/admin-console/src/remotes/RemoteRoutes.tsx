import { lazy, Suspense, type ComponentType, type ErrorInfo } from 'react';
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';
import { AccessStatePage } from '@/pages/AccessStatePage';
import {
  adminConsoleRemoteSessionStore,
  type AdminConsoleRemoteSessionStore,
} from '@/session/adminSessionRemoteStore';

type RemoteRoutesProps = {
  basePath?: string;
  sessionStore?: AdminConsoleRemoteSessionStore;
};

type RemoteRoutesModule = {
  default?: ComponentType<RemoteRoutesProps>;
  Routes?: ComponentType<RemoteRoutesProps>;
};

const normalizeRemoteRoutes = (module: RemoteRoutesModule, remoteName: string) => {
  const Routes = module.default ?? module.Routes;

  if (!Routes) {
    throw new Error(`${remoteName} did not expose a default export or Routes export.`);
  }

  return { default: Routes };
};

const UserManagementRoutes = lazy(() =>
  import('userManagement/Routes').then((module) =>
    normalizeRemoteRoutes(module, 'User Management')
  )
);

const OrgManagementRoutes = lazy(() =>
  import('orgManagement/Routes').then((module) =>
    normalizeRemoteRoutes(module, 'Organization Management')
  )
);

const remoteRouteFallback = <AccessStatePage kind="loading" title="Loading admin area" />;

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  return 'Unknown remote module error.';
};

const createRemoteErrorFallback =
  (remoteName: string) =>
  ({ error, resetErrorBoundary }: FallbackProps) => (
    <AccessStatePage
      kind="remoteError"
      title={`${remoteName} unavailable`}
      detail={getErrorMessage(error)}
      onRetry={resetErrorBoundary}
    />
  );

const logRemoteError = (remoteName: string) => (error: unknown, info: ErrorInfo) => {
  console.error(`Failed to load ${remoteName} remote routes.`, error, info);
};

export function UserManagementRemoteRoutes() {
  return (
    <ErrorBoundary
      FallbackComponent={createRemoteErrorFallback('User Management')}
      onError={logRemoteError('User Management')}
      resetKeys={['user-management']}
    >
      <Suspense fallback={remoteRouteFallback}>
        <UserManagementRoutes
          basePath="/user-management"
          sessionStore={adminConsoleRemoteSessionStore}
        />
      </Suspense>
    </ErrorBoundary>
  );
}

export function OrgManagementRemoteRoutes() {
  return (
    <ErrorBoundary
      FallbackComponent={createRemoteErrorFallback('Organization Management')}
      onError={logRemoteError('Organization Management')}
      resetKeys={['org-management']}
    >
      <Suspense fallback={remoteRouteFallback}>
        <OrgManagementRoutes
          basePath="/org-management"
          sessionStore={adminConsoleRemoteSessionStore}
        />
      </Suspense>
    </ErrorBoundary>
  );
}
