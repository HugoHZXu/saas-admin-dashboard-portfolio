import { IntlShape, useIntl } from 'react-intl';
import { StatusTag, StatusTagTone, TableColumn } from '@hugo-ui/mui';
import { ActivityRecord, ActivityResult, LocalizedMessage } from '@/api/types';
import {
  ActivityActorCell,
  ActivityCell,
  ActivityMetaText,
  ActivitySummaryText,
} from './activityStyles';

export const activityResultToneMap: Record<ActivityResult, StatusTagTone> = {
  success: 'success',
  failed: 'danger',
  partial: 'warning',
  unknown: 'neutral',
};

export const formatLocalizedMessage = (intl: IntlShape, message: LocalizedMessage) => {
  const values = message.values.reduce<Record<string, string>>((result, item) => {
    result[item.key] = item.value;
    return result;
  }, {});

  return intl.formatMessage(
    {
      id: message.id,
      defaultMessage: message.defaultMessage,
    },
    values
  );
};

export const formatStatusLabel = (value: string) =>
  value
    .split(/[-_ ]+/)
    .filter(Boolean)
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(' ');

export const formatDateTime = (value: string) =>
  new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));

export const useActivityColumns = (): TableColumn<ActivityRecord>[] => {
  'use memo';

  const intl = useIntl();

  return [
    {
      id: 'actor',
      header: intl.formatMessage({
        id: 'orgManagement.activity.column.actor',
        defaultMessage: 'Actor',
      }),
      sortable: true,
      minWidth: 180,
      render: (row) => (
        <ActivityActorCell>
          <ActivitySummaryText>{row.actor.displayName}</ActivitySummaryText>
          <ActivityMetaText>{row.actor.email}</ActivityMetaText>
        </ActivityActorCell>
      ),
    },
    {
      id: 'summary',
      header: intl.formatMessage({
        id: 'orgManagement.activity.column.activity',
        defaultMessage: 'Activity',
      }),
      minWidth: 280,
      render: (row) => (
        <ActivityCell>
          <ActivitySummaryText>
            {formatLocalizedMessage(intl, row.summaryMessage)}
          </ActivitySummaryText>
          <ActivityMetaText>{formatLocalizedMessage(intl, row.actionLabel)}</ActivityMetaText>
        </ActivityCell>
      ),
    },
    {
      id: 'organization',
      header: intl.formatMessage({
        id: 'orgManagement.activity.column.organization',
        defaultMessage: 'Organization',
      }),
      sortable: true,
      minWidth: 180,
      render: (row) =>
        row.organization?.name ??
        intl.formatMessage({
          id: 'orgManagement.activity.emptyOrganization',
          defaultMessage: 'No organization',
        }),
    },
    {
      id: 'result',
      header: intl.formatMessage({
        id: 'orgManagement.activity.column.result',
        defaultMessage: 'Result',
      }),
      sortable: true,
      minWidth: 120,
      render: (row) => (
        <StatusTag tone={activityResultToneMap[row.result]}>
          {intl.formatMessage({
            id: `orgManagement.activity.result.${row.result}`,
            defaultMessage: formatStatusLabel(row.result),
          })}
        </StatusTag>
      ),
    },
    {
      id: 'eventTime',
      header: intl.formatMessage({
        id: 'orgManagement.activity.column.eventTime',
        defaultMessage: 'Event time',
      }),
      sortable: true,
      minWidth: 180,
      render: (row) => formatDateTime(row.eventTime),
    },
  ];
};
