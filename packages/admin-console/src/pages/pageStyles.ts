import { styled } from 'admin-shared';

export const AccessStatePanel = styled('div')(({ theme }) => ({
  display: 'grid',
  gap: theme.hugoUISpacer.SPACER_MD,
  maxWidth: 640,
  width: '100%',
}));

export const AccessStateHeading = styled('h3')(({ theme }) => ({
  margin: 0,
  color: theme.hugoUIColorRoles.text.primary,
  fontSize: 18,
  fontWeight: 800,
  lineHeight: 1.25,
  letterSpacing: 0,
}));

export const AccessStateText = styled('p')(({ theme }) => ({
  margin: 0,
  color: theme.hugoUIColorRoles.text.subtle,
  fontSize: 14,
  lineHeight: 1.55,
}));

export const AccessStateActions = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.hugoUISpacer.SPACER_SM,
}));
