import { styled } from '@mui/material/styles';
import { DetailCard } from '@hugo-ui/mui';

export const UserPageRoot = styled('div')(({ theme }) => ({
  display: 'grid',
  gap: theme.hugoUISpacer.SPACER_MD,
  color: theme.hugoUIColorRoles.text.default,
}));

export const AddUserModalBody = styled('div')(({ theme }) => ({
  display: 'grid',
  gap: theme.hugoUISpacer.SPACER_MD,
  minWidth: 0,
}));

export const SummaryGrid = styled('section')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  gap: 14,

  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
  },
}));

export const SummaryCard = styled(DetailCard)(({ theme }) => ({
  minHeight: 88,
  gap: theme.hugoUISpacer.SPACER_SM,
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
  gridTemplateColumns: 'auto minmax(0, 1fr)',
  alignItems: 'start',
  justifyContent: 'space-between',
  gap: theme.hugoUISpacer.SPACER_MD,

  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
  },
}));

export const SearchFieldContainer = styled('div')(({ theme }) => ({
  justifySelf: 'end',
  width: '100%',

  [theme.breakpoints.up('md')]: {
    width: 360,
  },

  [theme.breakpoints.down('sm')]: {
    justifySelf: 'stretch',
  },
}));

export const FilterModePanel = styled('div')(({ theme }) => ({
  display: 'grid',
  justifyItems: 'end',
  gap: theme.hugoUISpacer.SPACER_SM,

  [theme.breakpoints.down('sm')]: {
    justifyItems: 'start',
  },
}));

export const FilterGroup = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: theme.hugoUISpacer.SPACER_SM,

  [theme.breakpoints.down('sm')]: {
    justifyContent: 'flex-start',
  },
}));

export const FilterLabel = styled('span')(({ theme }) => ({
  color: theme.hugoUIColorRoles.text.subtle,
  fontSize: 12,
  fontWeight: 700,
}));

export const FilterButton = styled('button')(({ theme }) => ({
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

export const UserCell = styled('div')(() => ({
  display: 'grid',
  gap: 3,
}));

export const UserName = styled('span')(({ theme }) => ({
  color: theme.hugoUIColorRoles.text.primary,
  fontWeight: 700,
}));

export const UserMeta = styled('span')(({ theme }) => ({
  color: theme.hugoUIColorRoles.text.subtle,
  fontSize: 12,
}));

export const RoleList = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.hugoUISpacer.SPACER_XS,
}));
