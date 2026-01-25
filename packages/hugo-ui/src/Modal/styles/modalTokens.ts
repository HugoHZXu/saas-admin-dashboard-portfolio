import type { Theme } from '@mui/material/styles';

export const ROOT_PREFIX = 'HugoUIModal';
export const TITLE_ROOT_PREFIX = 'HugoUIModalTitle';
export const CONTENT_ROOT_PREFIX = 'HugoUIModalContent';
export const FOOTER_ROOT_PREFIX = 'HugoUIModalFooter';

export const createModalTokens = (theme: Theme) => ({
  colors: {
    textDefault: theme.hugoUIColorRoles.text.default,
    textPrimary: theme.hugoUIColorRoles.text.primary,
    textInverse: theme.hugoUIColorRoles.text.inverse,
    textDisabled: theme.hugoUIColorRoles.text.disabled,
    surface: theme.hugoUIColorRoles.surface.default,
    focusRing: theme.hugoUIColorRoles.focus.ring,
    warning: theme.hugoUIColorRoles.brand.primary,
    alert: theme.hugoUIColorRoles.status.warning,
    error: theme.hugoUIColorRoles.status.error,
    accent: theme.hugoUIColorRoles.brand.accent,
    accentMid: theme.hugoUIColors.MID_PURPLE,
    footerBg: theme.hugoUIColors.NEUTRAL_MID_GREY,
  },
});
