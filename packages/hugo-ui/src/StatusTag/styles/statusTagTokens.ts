import { alpha } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';

export const ROOT_PREFIX = 'HugoUIStatusTag';

export type HugoUIStatusTagTone = 'success' | 'warning' | 'neutral' | 'danger' | 'info';

export const createStatusTagTokens = (theme: Theme) => ({
  colors: {
    success: {
      background: theme.hugoUIColors.SUCCESS_GREEN_BG,
      text: theme.hugoUIColorRoles.status.success,
    },
    warning: {
      background: alpha(theme.hugoUIColorRoles.status.warning, 0.12),
      text: theme.hugoUIColorRoles.status.warning,
    },
    neutral: {
      background: theme.hugoUIColorRoles.surface.subtle,
      text: theme.hugoUIColorRoles.text.default,
    },
    danger: {
      background: alpha(theme.hugoUIColorRoles.status.error, 0.1),
      text: theme.hugoUIColorRoles.status.error,
    },
    info: {
      background: theme.hugoUIColorRoles.surface.tinted,
      text: theme.hugoUIColorRoles.brand.deep,
    },
  },
  sizing: {
    borderRadius: 999,
    minHeight: 28,
    paddingX: 12,
    paddingY: 6,
  },
});
