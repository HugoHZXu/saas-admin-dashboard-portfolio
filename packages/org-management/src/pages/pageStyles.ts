import { styled } from '@mui/material/styles';
import { DetailCard } from '@hugo-ui/mui';

export const DetailGrid = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: theme.hugoUISpacer.SPACER_MD,

  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
  },
}));

export const DetailCardWide = styled(DetailCard)(() => ({
  gridColumn: '1 / -1',
}));

export const PanelHeading = styled('h3')(({ theme }) => ({
  margin: 0,
  color: theme.hugoUIColorRoles.text.primary,
  fontSize: 16,
  lineHeight: 1.25,
}));

export const PanelText = styled('p')(({ theme }) => ({
  margin: 0,
  color: theme.hugoUIColorRoles.text.subtle,
  fontSize: 14,
  lineHeight: 1.55,
}));

export const DefinitionList = styled('dl')(() => ({
  display: 'grid',
  gap: 12,
  margin: 0,
}));

export const DefinitionItem = styled('div')(() => ({
  display: 'grid',
  gap: 4,
}));

export const DefinitionLabel = styled('dt')(({ theme }) => ({
  color: theme.hugoUIColorRoles.text.subtle,
  fontSize: 12,
  fontWeight: 700,
}));

export const DefinitionValue = styled('dd')(({ theme }) => ({
  margin: 0,
  color: theme.hugoUIColorRoles.text.primary,
  fontSize: 14,
}));

export const AdminList = styled('div')(({ theme }) => ({
  display: 'grid',
  gap: theme.hugoUISpacer.SPACER_SM,
}));

export const AdminRow = styled('div')(() => ({
  display: 'grid',
  gap: 3,
  minWidth: 0,
}));

export const AdminName = styled('strong')(({ theme }) => ({
  overflow: 'hidden',
  color: theme.hugoUIColorRoles.text.primary,
  fontSize: 14,
  lineHeight: 1.25,
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}));

export const AdminEmail = styled('span')(({ theme }) => ({
  overflow: 'hidden',
  color: theme.hugoUIColorRoles.text.subtle,
  fontSize: 12,
  lineHeight: 1.35,
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}));

export const AdminModalBody = styled('div')(({ theme }) => ({
  display: 'grid',
  gap: theme.hugoUISpacer.SPACER_MD,
}));

export const AdminOptionList = styled('div')(({ theme }) => ({
  display: 'grid',
  gap: theme.hugoUISpacer.SPACER_SM,
}));

export const AdminOption = styled('label')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'auto minmax(0, 1fr)',
  alignItems: 'start',
  gap: theme.hugoUISpacer.SPACER_SM,
  padding: theme.hugoUISpacer.SPACER_MD,
  border: `1px solid ${theme.hugoUIColorRoles.border.default}`,
  borderRadius: 8,
  background: theme.hugoUIColorRoles.surface.default,
  color: theme.hugoUIColorRoles.text.default,
  cursor: 'pointer',

  '&:hover': {
    background: theme.hugoUIColorRoles.surface.tinted,
  },

  '&:focus-within': {
    borderColor: theme.hugoUIColorRoles.border.strong,
    boxShadow: `0 0 0 2px ${theme.hugoUIColorRoles.focus.ring}`,
  },

  '&[data-selected="true"]': {
    borderColor: theme.hugoUIColorRoles.border.strong,
    background: theme.hugoUIColorRoles.surface.tinted,
  },

  '&[data-disabled="true"]': {
    cursor: 'not-allowed',
    opacity: 0.7,
  },
}));

export const AdminOptionCheckbox = styled('input')(() => ({
  height: 18,
  margin: '2px 0 0',
  width: 18,
}));

export const AdminOptionContent = styled('span')(() => ({
  display: 'grid',
  gap: 4,
  minWidth: 0,
}));

export const AdminOptionName = styled('span')(({ theme }) => ({
  overflow: 'hidden',
  color: theme.hugoUIColorRoles.text.primary,
  fontSize: 14,
  fontWeight: 800,
  lineHeight: 1.25,
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}));

export const AdminOptionEmail = styled('span')(({ theme }) => ({
  overflow: 'hidden',
  color: theme.hugoUIColorRoles.text.subtle,
  fontSize: 12,
  lineHeight: 1.45,
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}));

export const ActivityPageRoot = styled('div')(({ theme }) => ({
  display: 'grid',
  gap: theme.hugoUISpacer.SPACER_MD,
}));

export const ActivityToolbar = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 360px) auto',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.hugoUISpacer.SPACER_MD,

  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
  },
}));

export const ActivitySearchContainer = styled('div')(({ theme }) => ({
  width: '100%',

  [theme.breakpoints.up('md')]: {
    width: 360,
  },
}));

export const ActivityCountText = styled('span')(({ theme }) => ({
  color: theme.hugoUIColorRoles.text.subtle,
  fontSize: 13,
  fontWeight: 700,
}));

export const AccessStateRoot = styled('div')(({ theme }) => ({
  display: 'grid',
  minHeight: '100%',
  placeItems: 'center',
  padding: theme.hugoUISpacer.SPACER_XL,
}));

export const AccessStatePanel = styled(DetailCard)(({ theme }) => ({
  maxWidth: 560,
  width: '100%',
  gap: theme.hugoUISpacer.SPACER_SM,
}));

export const AccessStateTitle = styled('h2')(({ theme }) => ({
  margin: 0,
  color: theme.hugoUIColorRoles.text.primary,
  fontSize: 22,
  lineHeight: 1.2,
}));

export const AccessStateText = styled('p')(({ theme }) => ({
  margin: 0,
  color: theme.hugoUIColorRoles.text.subtle,
  fontSize: 14,
  lineHeight: 1.55,
}));
