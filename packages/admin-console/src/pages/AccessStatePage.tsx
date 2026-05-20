import { Button, ContentTemplate, DetailCard } from 'hugo-ui';
import {
  AccessStateActions,
  AccessStateHeading,
  AccessStatePanel,
  AccessStateText,
} from './pageStyles';

type AccessStateKind = 'loading' | 'error' | 'denied' | 'noAccess' | 'remoteError';

type AccessStatePageProps = {
  kind: AccessStateKind;
  title?: string;
  message?: string;
  detail?: string | null;
  onRetry?: () => void;
};

const copyByKind: Record<AccessStateKind, { pageTitle: string; heading: string; body: string }> = {
  loading: {
    pageTitle: 'Loading account',
    heading: 'Checking admin access',
    body: 'Loading the selected demo account from the admin BFF.',
  },
  error: {
    pageTitle: 'Account unavailable',
    heading: 'Unable to load account context',
    body: 'The admin account context is unavailable. Retry or switch to another synthetic account.',
  },
  denied: {
    pageTitle: 'Access unavailable',
    heading: 'This area is unavailable',
    body: 'The selected demo account does not include the required admin capability.',
  },
  noAccess: {
    pageTitle: 'No admin access',
    heading: 'No admin capabilities available',
    body: 'The selected demo account does not include Organization Management or User Management access.',
  },
  remoteError: {
    pageTitle: 'Module unavailable',
    heading: 'Unable to load this admin area',
    body: 'The remote admin module is unavailable. Confirm the remote app is running and exposes its route module.',
  },
};

export function AccessStatePage({
  kind,
  title,
  message,
  detail,
  onRetry,
}: AccessStatePageProps) {
  const copy = copyByKind[kind];

  return (
    <ContentTemplate type="error" pageTitle={title ?? copy.pageTitle}>
      <DetailCard aria-label={title ?? copy.pageTitle}>
        <AccessStatePanel>
          <AccessStateHeading>{title ?? copy.heading}</AccessStateHeading>
          <AccessStateText>{message ?? copy.body}</AccessStateText>
          {detail && <AccessStateText>Details: {detail}</AccessStateText>}
          {onRetry && (
            <AccessStateActions>
              <Button level="secondary" colorTheme="grey" onClick={onRetry}>
                Retry
              </Button>
            </AccessStateActions>
          )}
        </AccessStatePanel>
      </DetailCard>
    </ContentTemplate>
  );
}
