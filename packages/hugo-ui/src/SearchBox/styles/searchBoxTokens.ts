import { Theme } from '@mui/material/styles';

export const SEARCH_BOX_ROOT_PREFIX = 'HugoUISearchBox';

export const createSearchBoxTokens = (theme: Theme) => ({
  colors: {
    textDefault: theme.hugoUIColorRoles.text.default,
    textPrimary: theme.hugoUIColorRoles.text.primary,
    textSubtle: theme.hugoUIColorRoles.text.subtle,
    textInverse: theme.hugoUIColorRoles.text.inverse,
    surfaceDefault: theme.hugoUIColorRoles.surface.default,
    surfaceMuted: theme.hugoUIColorRoles.surface.subtle,
    action: theme.hugoUIColorRoles.brand.deep,
    borderDefault: theme.hugoUIColorRoles.border.default,
    borderStrong: theme.hugoUIColorRoles.border.strong,
    focusRing: theme.hugoUIColorRoles.focus.ring,
    hover: theme.hugoUIColorRoles.surface.tinted,
  },
  sizing: {
    height: 36,
    radius: 6,
    actionWidth: 38,
    iconSize: 18,
    focusRingWidth: 2,
  },
  spacing: {
    inputPaddingLeft: 12,
    inputPaddingRight: 8,
    buttonPadding: 6,
  },
  typography: {
    input: {
      fontSize: 14,
      lineHeight: 1.4,
      letterSpacing: 0,
    },
  },
});
