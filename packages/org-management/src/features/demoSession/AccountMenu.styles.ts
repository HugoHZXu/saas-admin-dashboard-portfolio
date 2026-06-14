import { styled } from 'admin-shared';

export const AccountMenuRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.hugoUISpacer.SPACER_XS,
}));

export const AccountTriggerSummary = styled('span')(({ theme }) => ({
  display: 'grid',
  gap: 2,
  minWidth: 0,
  color: theme.hugoUIColorRoles.text.default,
  textAlign: 'right',

  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

export const AccountTriggerName = styled('span')(({ theme }) => ({
  maxWidth: 220,
  overflow: 'hidden',
  color: theme.hugoUIColorRoles.text.primary,
  fontSize: 13,
  fontWeight: 700,
  lineHeight: 1.2,
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}));

export const AccountTriggerMeta = styled('span')(({ theme }) => ({
  maxWidth: 220,
  overflow: 'hidden',
  color: theme.hugoUIColorRoles.text.subtle,
  fontSize: 12,
  lineHeight: 1.2,
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}));

export const AccountMenuHeader = styled('div')(({ theme }) => ({
  display: 'grid',
  gap: 3,
  minWidth: 260,
  padding: `${theme.hugoUISpacer.SPACER_SM} ${theme.hugoUISpacer.SPACER_MD}`,
}));

export const AccountMenuName = styled('strong')(({ theme }) => ({
  color: theme.hugoUIColorRoles.text.primary,
  fontSize: 14,
  lineHeight: 1.3,
}));

export const AccountMenuText = styled('span')(({ theme }) => ({
  color: theme.hugoUIColorRoles.text.subtle,
  fontSize: 12,
  lineHeight: 1.35,
}));

export const AccountModalBody = styled('div')(({ theme }) => ({
  display: 'grid',
  gap: theme.hugoUISpacer.SPACER_MD,
}));

export const AccountModalIntro = styled('p')(({ theme }) => ({
  margin: 0,
  color: theme.hugoUIColorRoles.text.subtle,
  fontSize: 14,
  lineHeight: 1.5,
}));

export const AccountList = styled('div')(({ theme }) => ({
  display: 'grid',
  gap: theme.hugoUISpacer.SPACER_SM,
}));

export const AccountOption = styled('button')(({ theme }) => ({
  appearance: 'none',
  display: 'grid',
  gap: 8,
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
    outline: `2px solid ${theme.hugoUIColorRoles.focus.ring}`,
    outlineOffset: 2,
  },

  '&[aria-current="true"]': {
    borderColor: theme.hugoUIColorRoles.border.strong,
    background: theme.hugoUIColorRoles.surface.tinted,
  },
}));

export const AccountOptionHeader = styled('span')(() => ({
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'space-between',
  gap: 12,
}));

export const AccountOptionName = styled('strong')(({ theme }) => ({
  color: theme.hugoUIColorRoles.text.primary,
  fontSize: 14,
  lineHeight: 1.25,
}));

export const AccountOptionPersona = styled('span')(({ theme }) => ({
  flex: '0 0 auto',
  color: theme.hugoUIColorRoles.text.subtle,
  fontSize: 12,
  fontWeight: 700,
  lineHeight: 1.25,
}));

export const AccountOptionDetail = styled('span')(({ theme }) => ({
  color: theme.hugoUIColorRoles.text.subtle,
  fontSize: 12,
  lineHeight: 1.45,
}));
