import type { Theme } from '@mui/material/styles';

export const ROOT_PREFIX = 'HugoUIDetailCard';

export const createDetailCardTokens = (theme: Theme) => ({
  colors: {
    border: theme.hugoUIColorRoles.border.default,
    borderHover: theme.hugoUIColorRoles.border.strong,
    focusRing: theme.hugoUIColorRoles.focus.ring,
    surface: theme.hugoUIColorRoles.surface.default,
    surfaceHover: theme.hugoUIColorRoles.surface.tinted,
    text: theme.hugoUIColorRoles.text.default,
  },
  sizing: {
    radius: 8,
    padding: 18,
    focusRingWidth: 2,
  },
  motion: {
    transition: 'background-color 0.16s ease, border-color 0.16s ease, box-shadow 0.16s ease',
  },
  shadows: {
    default: theme.hugoUIShadows.LIGHT_SHADOW.boxShadow,
    hover: theme.hugoUIShadows.MEDIUM_SHADOW.boxShadow,
  },
});
