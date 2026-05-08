import { ContentTemplate, DetailCard } from 'hugo-ui';
import { PanelHeading, PanelText } from './pageStyles';

type NoAccessPageProps = {
  title?: string;
  message?: string;
};

export function NoAccessPage({
  title = 'No access',
  message = 'This demo account does not have User Management access for an organization scope.',
}: NoAccessPageProps) {
  return (
    <ContentTemplate type="error" pageTitle={title}>
      <DetailCard aria-label="No access">
        <PanelHeading>User Management is unavailable</PanelHeading>
        <PanelText>{message}</PanelText>
      </DetailCard>
    </ContentTemplate>
  );
}
