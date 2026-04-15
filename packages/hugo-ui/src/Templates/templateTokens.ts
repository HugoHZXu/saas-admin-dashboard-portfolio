import { Theme } from '@mui/material/styles';

export const PAGE_TEMPLATE_ROOT_PREFIX = 'HugoUIPageTemplate';
export const CONTENT_TEMPLATE_ROOT_PREFIX = 'HugoUIContentTemplate';

export const createPageTemplateTokens = (theme: Theme) => ({
  colors: {
    pageBackground: theme.hugoUIColorRoles.surface.subtle,
    headerBackground: theme.hugoUIColorRoles.surface.inverse,
    headerBorder: theme.hugoUIColorRoles.surface.inverse,
    navBackground: theme.hugoUIColorRoles.surface.default,
    appIconBackground: theme.hugoUIColorRoles.brand.accent,
    appIconText: theme.hugoUIColorRoles.text.inverse,
    headerText: theme.hugoUIColorRoles.text.inverse,
    textDefault: theme.hugoUIColorRoles.text.default,
    textPrimary: theme.hugoUIColorRoles.text.primary,
    textInverse: theme.hugoUIColorRoles.text.inverse,
    textSubtle: theme.hugoUIColorRoles.text.subtle,
    borderDefault: theme.hugoUIColorRoles.border.default,
    focusRing: theme.hugoUIColorRoles.focus.ring,
    navHover: theme.hugoUIColorRoles.surface.tinted,
    navSelected: theme.hugoUIColorRoles.surface.tinted,
    navSelectedHover: theme.hugoUIColorRoles.surface.tinted,
  },
  sizing: {
    headerHeight: 56,
    desktopNavWidth: 260,
    appIconSize: 36,
    appIconRadius: 8,
    appIconSvgSize: 20,
    navItemHeight: 40,
    navItemRadius: 8,
    navIconSize: 20,
    navToggleSize: 32,
    navMobileMinColumn: 180,
    navDepthIndent: 18,
    focusRingWidth: 3,
  },
  spacing: {
    headerPaddingX: theme.hugoUISpacer.SPACER_LG,
    headerMobilePaddingX: theme.hugoUISpacer.SPACER_MD,
    headerGap: 12,
    navPadding: theme.hugoUISpacer.SPACER_MD,
    navMobilePadding: 12,
    navListGap: theme.hugoUISpacer.SPACER_XS,
    navGroupGap: 2,
    navItemGap: 10,
    navItemPaddingX: 10,
    navItemShellGap: theme.hugoUISpacer.SPACER_XS,
    contentPadding: theme.hugoUISpacer.SPACER_LG,
    contentMobilePadding: theme.hugoUISpacer.SPACER_MD,
  },
  typography: {
    appTitle: {
      fontSize: 18,
      fontWeight: 700,
      lineHeight: 1.25,
      letterSpacing: 0,
    },
    navItem: {
      fontSize: 14,
      fontWeight: 600,
      lineHeight: 1.25,
      letterSpacing: 0,
    },
    navItemSelectedWeight: 700,
  },
});

export const createContentTemplateTokens = (theme: Theme) => ({
  colors: {
    textDefault: theme.hugoUIColorRoles.text.default,
    textPrimary: theme.hugoUIColorRoles.text.primary,
    textSubtle: theme.hugoUIColorRoles.text.subtle,
    surfaceDefault: theme.hugoUIColorRoles.surface.default,
    borderDefault: theme.hugoUIColorRoles.border.default,
  },
  sizing: {
    bodyRadius: 8,
    backButtonSize: 32,
  },
  spacing: {
    rootGap: 18,
    headerGap: theme.hugoUISpacer.SPACER_MD,
    headingGap: 6,
    titleRowGap: theme.hugoUISpacer.SPACER_SM,
    actionGap: 10,
    cardPadding: 20,
    tablePadding: 20,
    errorPadding: theme.hugoUISpacer.SPACER_XL,
    errorGap: 12,
  },
  typography: {
    pageTitle: {
      fontSize: 24,
      mobileFontSize: 21,
      fontWeight: 700,
      lineHeight: 1.25,
      letterSpacing: 0,
    },
    titleInfo: {
      fontSize: 14,
      lineHeight: 1.45,
    },
  },
  shadows: {
    panel: theme.hugoUIShadows.LIGHT_SHADOW.boxShadow,
  },
});
