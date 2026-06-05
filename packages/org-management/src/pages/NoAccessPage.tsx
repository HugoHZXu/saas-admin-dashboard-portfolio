import { ContentTemplate } from '@hugo-ui/mui';
import { AccessStatePanel, AccessStateRoot, AccessStateText, AccessStateTitle } from './pageStyles';

type NoAccessPageState = 'loading' | 'error' | 'denied';

type NoAccessPageProps = {
  state?: NoAccessPageState;
  errorMessage?: string | null;
};

const copyByState: Record<NoAccessPageState, { title: string; body: string }> = {
  loading: {
    title: 'Checking demo access',
    body: 'Loading the selected demo account before showing Organization Management.',
  },
  error: {
    title: 'Unable to load demo access',
    body: 'The demo account context could not be loaded. Use the account menu to retry with another synthetic account.',
  },
  denied: {
    title: 'No Organization Management access',
    body: 'The selected demo account does not include platform-side Organization Management capabilities. Switch accounts to preview this admin area.',
  },
};

export function NoAccessPage({ state = 'denied', errorMessage }: NoAccessPageProps) {
  const copy = copyByState[state];

  return (
    <ContentTemplate type="error" pageTitle="Organization Management">
      <AccessStateRoot>
        <AccessStatePanel>
          <AccessStateTitle>{copy.title}</AccessStateTitle>
          <AccessStateText>{copy.body}</AccessStateText>
          {state === 'error' && errorMessage && (
            <AccessStateText>Details: {errorMessage}</AccessStateText>
          )}
        </AccessStatePanel>
      </AccessStateRoot>
    </ContentTemplate>
  );
}
