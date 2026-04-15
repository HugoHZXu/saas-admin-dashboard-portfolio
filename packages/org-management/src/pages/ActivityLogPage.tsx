import { ContentTemplate } from 'hugo-ui';
import { PanelHeading, PanelText, PlaceholderPanel } from './pageStyles';

export function ActivityLogPage() {
  return (
    <ContentTemplate
      type="table"
      pageTitle="Activity Log"
      titleInfo="Global audit trail placeholder for normalized organization activity records."
    >
      <PlaceholderPanel>
        <PanelHeading>Activity Log foundation</PanelHeading>
        <PanelText>
          This page will consume frontend-friendly activity records from the mock BFF layer and
          answer who acted, when it happened, what changed, and whether the result succeeded.
        </PanelText>
      </PlaceholderPanel>
    </ContentTemplate>
  );
}
