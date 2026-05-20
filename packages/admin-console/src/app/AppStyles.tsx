import GlobalStyles from '@mui/material/GlobalStyles';
import type { Theme } from '@mui/material/styles';

const createGlobalStyles = (theme: Theme) => ({
  body: {
    margin: 0,
    background: theme.hugoUIColorRoles.surface.subtle,
    color: theme.hugoUIColorRoles.text.default,
  },
  'button, input, textarea, select': {
    font: 'inherit',
  },
});

export function AdminConsoleGlobalStyles() {
  return <GlobalStyles styles={createGlobalStyles} />;
}
