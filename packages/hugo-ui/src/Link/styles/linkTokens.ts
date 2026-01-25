import type { Theme } from '@mui/material/styles';

export type HugoUILinkMode = 'white' | 'light' | 'dark' | 'error';

export const createLinkTokens = (theme: Theme) => ({
  colors: {
    white: {
      normal: theme.hugoUIColors.BLUE,
      hover: theme.hugoUIColorRoles.brand.deep,
      visited: theme.hugoUIColorRoles.brand.accent,
      disabled: theme.hugoUIColorRoles.text.disabled,
      focus: theme.hugoUIColorRoles.focus.ring,
      loading: theme.hugoUIColorRoles.text.default,
    },
    light: {
      normal: theme.hugoUIColorRoles.text.default,
      hover: theme.hugoUIColorRoles.brand.deep,
      visited: theme.hugoUIColorRoles.brand.accent,
      disabled: theme.hugoUIColorRoles.text.disabled,
      focus: theme.hugoUIColorRoles.focus.ring,
      loading: theme.hugoUIColorRoles.text.default,
    },
    dark: {
      normal: theme.hugoUIColorRoles.text.inverse,
      hover: theme.hugoUIColors.NEUTRAL_LIGHT_PLUM,
      visited: theme.hugoUIColors.LIGHT_PURPLE,
      disabled: theme.hugoUIColorRoles.brand.deep,
      focus: theme.hugoUIColorRoles.text.inverse,
      loading: theme.hugoUIColorRoles.text.inverse,
    },
    error: {
      normal: theme.hugoUIColorRoles.status.error,
      hover: theme.hugoUIColorRoles.status.destructActive,
      visited: theme.hugoUIColorRoles.status.destructStrong,
      disabled: theme.hugoUIColorRoles.text.disabled,
      focus: theme.hugoUIColorRoles.focus.ring,
      loading: theme.hugoUIColorRoles.text.default,
    },
  },
});
