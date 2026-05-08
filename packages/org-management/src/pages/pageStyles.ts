import { styled } from '@mui/material/styles';
import { DetailCard } from 'hugo-ui';

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
