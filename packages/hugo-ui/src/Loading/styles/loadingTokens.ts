import type { Theme } from '@mui/material/styles';

export const ROOT_PREFIX = 'HugoUILoading';

export const createLoadingTokens = (theme: Theme) => ({
  colors: {
    text: theme.hugoUIColorRoles.text.default,
  },
});
