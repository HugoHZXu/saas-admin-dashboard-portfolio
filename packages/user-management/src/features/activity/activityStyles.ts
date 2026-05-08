import { styled } from '@mui/material/styles';

export const ActivityCell = styled('div')(() => ({
  display: 'grid',
  gap: 3,
}));

export const ActivityActorCell = styled(ActivityCell)(() => ({
  minWidth: 0,
}));

export const ActivitySummaryText = styled('span')(({ theme }) => ({
  color: theme.hugoUIColorRoles.text.primary,
  fontWeight: 700,
}));

export const ActivityMetaText = styled('span')(({ theme }) => ({
  color: theme.hugoUIColorRoles.text.subtle,
  fontSize: 12,
}));
