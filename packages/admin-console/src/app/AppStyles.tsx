import GlobalStyles from '@mui/material/GlobalStyles';
import type { Theme } from '@mui/material/styles';
import { asHugoTheme } from 'admin-shared';

const createGlobalStyles = (theme: Theme) => {
  const hugoTheme = asHugoTheme(theme);

  return {
    body: {
      margin: 0,
      background: hugoTheme.hugoUIColorRoles.surface.subtle,
      color: hugoTheme.hugoUIColorRoles.text.default,
    },
    'button, input, textarea, select': {
      font: 'inherit',
    },
  };
};

export function AdminConsoleGlobalStyles() {
  return <GlobalStyles styles={createGlobalStyles} />;
}
