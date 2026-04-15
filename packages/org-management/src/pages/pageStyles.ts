import { styled } from '@mui/material/styles';

export const PlaceholderPanel = styled('div')(({ theme }) => ({
  display: 'grid',
  gap: 10,
  padding: 20,
  border: `1px solid ${theme.hugoUIColorRoles.border.default}`,
  borderRadius: 8,
  background: theme.hugoUIColorRoles.surface.default,
  boxShadow: theme.hugoUIShadows.LIGHT_SHADOW.boxShadow,
}));

export const DetailGrid = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: theme.hugoUISpacer.SPACER_MD,

  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
  },
}));

export const DetailCard = styled('section')(({ theme }) => ({
  display: 'grid',
  gap: 14,
  padding: 18,
  border: `1px solid ${theme.hugoUIColorRoles.border.default}`,
  borderRadius: 8,
  background: theme.hugoUIColorRoles.surface.default,
  boxShadow: theme.hugoUIShadows.LIGHT_SHADOW.boxShadow,
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
