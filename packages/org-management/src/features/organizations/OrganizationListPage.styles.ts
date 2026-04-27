import { styled } from '@mui/material/styles';

export const OrganizationPageRoot = styled('div')(({ theme }) => ({
  display: 'grid',
  gap: 18,
  color: theme.hugoUIColorRoles.text.default,
}));

export const SummaryGrid = styled('section')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  gap: 14,

  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
  },
}));

export const SummaryCard = styled('div')(({ theme }) => ({
  display: 'grid',
  gap: theme.hugoUISpacer.SPACER_SM,
  minHeight: 88,
  padding: theme.hugoUISpacer.SPACER_MD,
  border: `1px solid ${theme.hugoUIColorRoles.border.default}`,
  borderRadius: 8,
  background: theme.hugoUIColorRoles.surface.default,
  boxShadow: theme.hugoUIShadows.LIGHT_SHADOW.boxShadow,
}));

export const SummaryLabel = styled('span')(({ theme }) => ({
  color: theme.hugoUIColorRoles.text.subtle,
  fontSize: 13,
  fontWeight: 700,
}));

export const SummaryValue = styled('strong')(({ theme }) => ({
  color: theme.hugoUIColorRoles.text.primary,
  fontSize: 28,
  lineHeight: 1,
}));

export const TableToolbar = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'auto minmax(0, 360px)',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.hugoUISpacer.SPACER_MD,

  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
  },
}));

export const SearchFieldContainer = styled('div')(({ theme }) => ({
  width: '100%',

  [theme.breakpoints.up('md')]: {
    width: 360,
  },
}));

export const FilterModePanel = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  gap: theme.hugoUISpacer.SPACER_SM,

  [theme.breakpoints.down('sm')]: {
    justifyContent: 'flex-start',
  },
}));

export const StatusFilterButton = styled('button')(({ theme }) => ({
  appearance: 'none',
  border: `1px solid ${theme.hugoUIColorRoles.border.default}`,
  borderRadius: 8,
  background: theme.hugoUIColorRoles.surface.default,
  cursor: 'pointer',
  padding: 2,

  '&[aria-pressed="true"]': {
    borderColor: theme.hugoUIColorRoles.border.strong,
    background: theme.hugoUIColorRoles.surface.tinted,
  },

  '&:focus-visible': {
    outline: `2px solid ${theme.hugoUIColorRoles.focus.ring}`,
    outlineOffset: 2,
  },
}));

export const OrganizationCell = styled('div')(() => ({
  display: 'grid',
  gap: 3,
}));

export const OrganizationName = styled('span')(({ theme }) => ({
  color: theme.hugoUIColorRoles.text.primary,
  fontWeight: 700,
}));

export const OrganizationDomain = styled('span')(({ theme }) => ({
  color: theme.hugoUIColorRoles.text.subtle,
  fontSize: 12,
}));
