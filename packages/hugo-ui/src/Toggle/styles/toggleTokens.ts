import { Theme } from '@mui/material/styles';

export const TOGGLE_ROOT_PREFIX = 'HugoUIToggle';

export const createToggleTokens = (theme: Theme) => ({
  colors: {
    textDefault: theme.hugoUIColorRoles.text.default,
    textPrimary: theme.hugoUIColorRoles.text.primary,
    textSubtle: theme.hugoUIColorRoles.text.subtle,
    surfaceDefault: theme.hugoUIColorRoles.surface.default,
    surfaceMuted: theme.hugoUIColorRoles.surface.subtle,
    hoverSurface: theme.hugoUIColorRoles.surface.tinted,
    borderDefault: theme.hugoUIColorRoles.border.default,
    focusRing: theme.hugoUIColorRoles.focus.ring,
  },
  sizing: {
    rootRadius: 8,
    itemRadius: 6,
    minHeight: 36,
    iconSize: 18,
    focusRingWidth: 2,
  },
  spacing: {
    rootPadding: 3,
    itemGap: 8,
    itemPaddingX: 12,
  },
  typography: {
    item: {
      fontSize: 14,
      fontWeight: 700,
      lineHeight: 1.25,
      letterSpacing: 0,
    },
  },
});
