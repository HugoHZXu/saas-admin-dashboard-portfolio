import type { Theme } from '@mui/material/styles';

export const ROOT_PREFIX = 'HugoUIMessage';

export const createMessageTokens = (theme: Theme) => ({
  colors: {
    textDefault: theme.hugoUIColorRoles.text.default,
    textPrimary: theme.hugoUIColorRoles.text.primary,
    focusRing: theme.hugoUIColorRoles.focus.ring,
    errorBg: theme.hugoUIColors.ERROR_BG,
    successBg: theme.hugoUIColors.SUCCESS_GREEN_BG,
    destructiveBg: theme.hugoUIColors.NEUTRAL_LIGHT_GREY,
    error: theme.hugoUIColorRoles.status.error,
    success: theme.hugoUIColorRoles.status.success,
  },
});
