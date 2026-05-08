import { styled } from '@mui/material/styles';

export const AccountMenuRoot = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
}));

export const MenuSummary = styled('div')(({ theme }) => ({
  display: 'grid',
  gap: 4,
  minWidth: 260,
  padding: `${theme.hugoUISpacer.SPACER_SM} ${theme.hugoUISpacer.SPACER_MD}`,
}));

export const MenuSummaryName = styled('div')(({ theme }) => ({
  color: theme.hugoUIColorRoles.text.primary,
  fontSize: 14,
  fontWeight: 800,
}));

export const MenuSummaryMeta = styled('div')(({ theme }) => ({
  color: theme.hugoUIColorRoles.text.subtle,
  fontSize: 12,
  lineHeight: 1.35,
}));

export const MenuSectionTitle = styled('div')(({ theme }) => ({
  color: theme.hugoUIColorRoles.text.subtle,
  fontSize: 11,
  fontWeight: 800,
  letterSpacing: 0,
  padding: `${theme.hugoUISpacer.SPACER_SM} ${theme.hugoUISpacer.SPACER_MD} ${theme.hugoUISpacer.SPACER_XS}`,
  textTransform: 'uppercase',
}));

export const MenuItemIcon = styled('span')(() => ({
  alignSelf: 'flex-start',
  display: 'grid',
  flex: '0 0 auto',
  height: 20,
  marginTop: 1,
  placeItems: 'center',
  width: 24,

  '& svg': {
    fontSize: 20,
  },
}));

export const MenuItemText = styled('span')(() => ({
  display: 'grid',
  gap: 2,
}));

export const MenuItemLabel = styled('span')(({ theme }) => ({
  color: theme.hugoUIColorRoles.text.primary,
  fontSize: 13,
  fontWeight: 700,
}));

export const MenuItemMeta = styled('span')(({ theme }) => ({
  color: theme.hugoUIColorRoles.text.subtle,
  fontSize: 12,
}));

export const AccountList = styled('div')(({ theme }) => ({
  display: 'grid',
  gap: theme.hugoUISpacer.SPACER_SM,
}));

export const AccountOption = styled('button')(({ theme }) => ({
  width: '100%',
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) auto',
  alignItems: 'center',
  gap: theme.hugoUISpacer.SPACER_MD,
  padding: theme.hugoUISpacer.SPACER_MD,
  border: `1px solid ${theme.hugoUIColorRoles.border.default}`,
  borderRadius: 8,
  background: theme.hugoUIColorRoles.surface.default,
  color: theme.hugoUIColorRoles.text.default,
  cursor: 'pointer',
  textAlign: 'left',

  '&:hover': {
    background: theme.hugoUIColorRoles.surface.tinted,
  },

  '&:focus-visible': {
    outline: `2px solid ${theme.hugoUIColorRoles.focus.ring}`,
    outlineOffset: 2,
  },

  '&[aria-pressed="true"]': {
    borderColor: theme.hugoUIColorRoles.border.strong,
    background: theme.hugoUIColorRoles.surface.tinted,
  },
}));

export const AccountOptionContent = styled('span')(() => ({
  minWidth: 0,
  display: 'grid',
  gap: 4,
}));

export const AccountOptionName = styled('span')(({ theme }) => ({
  color: theme.hugoUIColorRoles.text.primary,
  fontSize: 14,
  fontWeight: 800,
}));

export const AccountOptionMeta = styled('span')(({ theme }) => ({
  color: theme.hugoUIColorRoles.text.subtle,
  fontSize: 12,
  lineHeight: 1.4,
}));

export const SelectedMark = styled('span')(({ theme }) => ({
  alignItems: 'center',
  color: theme.hugoUIColorRoles.status.success,
  display: 'inline-flex',
  gap: theme.hugoUISpacer.SPACER_XS,
  fontSize: 12,
  fontWeight: 800,
  lineHeight: 1,

  '& svg': {
    flex: '0 0 auto',
  },
}));

export const EmptyStateText = styled('p')(({ theme }) => ({
  margin: 0,
  color: theme.hugoUIColorRoles.text.subtle,
  fontSize: 14,
  lineHeight: 1.5,
}));
