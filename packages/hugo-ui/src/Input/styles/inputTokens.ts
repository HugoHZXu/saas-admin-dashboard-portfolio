import type { Theme } from '@mui/material/styles';

export const INPUT_LABEL_SHRINK_FACTOR = 0.75;
export const AUTOFILL_SHADOW = '0 0 0 30px white inset !important';

export const getBorderTokens = (theme: Theme) => ({
  BASIC_BORDER: `1px solid ${theme.hugoUIColorRoles.border.strong}`,
  FOCUS_BORDER: `2px solid ${theme.hugoUIColorRoles.focus.ring}`,
  ACTIVE_BORDER: `1px solid ${theme.hugoUIColorRoles.brand.accent}`,
  SUCCESS_BORDER: `1px solid ${theme.hugoUIColorRoles.status.success}`,
  ERROR_BORDER: `1px solid ${theme.hugoUIColorRoles.status.error}`,
  DISABLED_BORDER: `1px solid ${theme.hugoUIColorRoles.border.default}`,
  FOCUS_SHADOW: `0 0 0 2px ${theme.hugoUIColorRoles.focus.ring}`,
});
