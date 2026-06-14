import { styled } from '../theme/styled';

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

export const MenuSummaryName = styled('strong')(({ theme }) => ({
  color: theme.hugoUIColorRoles.text.primary,
  fontSize: 14,
  lineHeight: 1.3,
}));

export const MenuSummaryMeta = styled('span')(({ theme }) => ({
  color: theme.hugoUIColorRoles.text.subtle,
  fontSize: 12,
  lineHeight: 1.4,
}));

export const MenuSectionTitle = styled('div')(({ theme }) => ({
  padding: `${theme.hugoUISpacer.SPACER_SM} ${theme.hugoUISpacer.SPACER_MD} ${theme.hugoUISpacer.SPACER_XS}`,
  color: theme.hugoUIColorRoles.text.subtle,
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: 0,
  textTransform: 'uppercase',
}));

export const MenuItemIcon = styled('span')(() => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 24,
}));

export const MenuItemText = styled('span')(() => ({
  display: 'grid',
  gap: 2,
}));

export const MenuItemLabel = styled('span')(({ theme }) => ({
  color: theme.hugoUIColorRoles.text.default,
  fontSize: 14,
  lineHeight: 1.3,
}));

export const MenuItemMeta = styled('span')(({ theme }) => ({
  color: theme.hugoUIColorRoles.text.subtle,
  fontSize: 12,
  lineHeight: 1.35,
}));

export const AccountList = styled('div')(() => ({
  display: 'grid',
  gap: 10,
}));

export const AccountOption = styled('button')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) auto',
  alignItems: 'center',
  gap: theme.hugoUISpacer.SPACER_SM,
  width: '100%',
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
    borderColor: theme.hugoUIColorRoles.border.strong,
    outline: `2px solid ${theme.hugoUIColorRoles.focus.ring}`,
    outlineOffset: 1,
  },

  '&[aria-pressed="true"]': {
    borderColor: theme.hugoUIColorRoles.border.strong,
    background: theme.hugoUIColorRoles.surface.tinted,
  },
}));

export const AccountOptionContent = styled('span')(() => ({
  display: 'grid',
  gap: 4,
  minWidth: 0,
}));

export const AccountOptionName = styled('span')(({ theme }) => ({
  color: theme.hugoUIColorRoles.text.primary,
  fontSize: 14,
  fontWeight: 700,
  lineHeight: 1.3,
}));

export const AccountOptionMeta = styled('span')(({ theme }) => ({
  overflow: 'hidden',
  color: theme.hugoUIColorRoles.text.subtle,
  fontSize: 12,
  lineHeight: 1.35,
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}));

export const SelectedMark = styled('span')(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 4,
  color: theme.hugoUIColorRoles.text.primary,
  fontSize: 12,
  fontWeight: 700,
}));

export const EmptyStateText = styled('p')(({ theme }) => ({
  margin: 0,
  color: theme.hugoUIColorRoles.text.subtle,
  fontSize: 14,
  lineHeight: 1.45,
}));
