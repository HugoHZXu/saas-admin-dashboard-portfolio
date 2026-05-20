import { styled } from '@mui/material/styles';

export const ScopeHeaderRoot = styled('div')(({ theme }) => ({
  display: 'grid',
  justifyItems: 'end',
  gap: 4,
  color: theme.hugoUIColorRoles.text.default,

  [theme.breakpoints.down('sm')]: {
    justifyItems: 'start',
  },
}));

export const ScopeField = styled('div')(() => ({
  display: 'grid',
  gap: 4,
}));

export const ScopeLabel = styled('label')(({ theme }) => ({
  color: theme.hugoUIColorRoles.text.subtle,
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: 0,
  textTransform: 'uppercase',
}));

export const ScopeSelect = styled('select')(({ theme }) => ({
  minWidth: 260,
  height: 36,
  padding: '0 34px 0 12px',
  border: `1px solid ${theme.hugoUIColorRoles.border.default}`,
  borderRadius: 8,
  background: theme.hugoUIColorRoles.surface.default,
  color: theme.hugoUIColorRoles.text.primary,
  fontSize: 13,
  fontWeight: 700,

  '&:focus-visible': {
    outline: `2px solid ${theme.hugoUIColorRoles.focus.ring}`,
    outlineOffset: 2,
  },

  '&:disabled': {
    color: theme.hugoUIColorRoles.text.disabled,
    cursor: 'not-allowed',
  },
}));

export const ScopeHint = styled('span')(({ theme }) => ({
  color: theme.hugoUIColorRoles.status.error,
  fontSize: 12,
  fontWeight: 700,
}));
