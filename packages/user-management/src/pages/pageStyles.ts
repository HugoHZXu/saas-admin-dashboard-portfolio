import { styled } from 'admin-shared';
import { DetailCard } from '@hugo-ui/mui';

export const PageRoot = styled('div')(({ theme }) => ({
  display: 'grid',
  gap: theme.hugoUISpacer.SPACER_MD,
  minWidth: 0,
  color: theme.hugoUIColorRoles.text.default,
}));

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

export const InlineTagList = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.hugoUISpacer.SPACER_XS,
}));

export const RoleModalBody = styled('div')(({ theme }) => ({
  display: 'grid',
  gap: theme.hugoUISpacer.SPACER_MD,
}));

export const RoleOptionList = styled('div')(({ theme }) => ({
  display: 'grid',
  gap: theme.hugoUISpacer.SPACER_SM,
}));

export const RoleOption = styled('label')(({ theme }) => ({
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

export const RoleOptionCheckbox = styled('input')(() => ({
  height: 18,
  margin: '2px 0 0',
  width: 18,
}));

export const RoleOptionContent = styled('span')(() => ({
  display: 'grid',
  gap: 4,
  minWidth: 0,
}));

export const RoleOptionName = styled('span')(({ theme }) => ({
  color: theme.hugoUIColorRoles.text.primary,
  fontSize: 14,
  fontWeight: 800,
}));

export const RoleOptionDescription = styled('span')(({ theme }) => ({
  color: theme.hugoUIColorRoles.text.subtle,
  fontSize: 12,
  lineHeight: 1.45,
}));

export const RoleWarning = styled('p')(({ theme }) => ({
  margin: 0,
  padding: theme.hugoUISpacer.SPACER_SM,
  border: `1px solid ${theme.hugoUIColorRoles.status.warning}`,
  borderRadius: 8,
  color: theme.hugoUIColorRoles.text.primary,
  fontSize: 13,
  lineHeight: 1.45,
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
