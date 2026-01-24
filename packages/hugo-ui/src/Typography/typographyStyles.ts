import { createTheme } from '@mui/material/styles';
import type { CSSObject } from '@mui/system';
import type { ElementType } from 'react';
export const ROOT_PREFIX = 'HugoUITypography';

export const createTypographyTheme = (componentType?: ElementType) => {
  const extraProps = componentType
    ? {
        defaultProps: {
          component: componentType,
        },
      }
    : {};
  return createTheme({
    components: {
      MuiTypography: {
        ...extraProps,
        styleOverrides: {
          // overriding MUI's typography types with HugoUI styles
          h1: ({ theme }) => ({ ...(theme.hugoUITypography.h1 as CSSObject) }),
          h2: ({ theme }) => ({ ...(theme.hugoUITypography.h2 as CSSObject) }),
          h3: ({ theme }) => ({ ...(theme.hugoUITypography.h3 as CSSObject) }),
          h4: ({ theme }) => ({ ...(theme.hugoUITypography.h4 as CSSObject) }),
          h5: ({ theme }) => ({ ...(theme.hugoUITypography.h5 as CSSObject) }),
          subtitle1: ({ theme }) => ({ ...(theme.hugoUITypography.subtitle1 as CSSObject) }),
          subtitle2: ({ theme }) => ({ ...(theme.hugoUITypography.subtitle2 as CSSObject) }),
          root: ({ theme }) => ({
            [`&.${ROOT_PREFIX}`]: {
              '&-subtitle3': { ...(theme.hugoUITypography.subtitle3 as CSSObject) },
              '&-subtitle4': { ...(theme.hugoUITypography.subtitle4 as CSSObject) },
              '&-bodyLink': { ...(theme.hugoUITypography.bodyLink as CSSObject) },
              '&-button1': { ...(theme.hugoUITypography.button.base as CSSObject) },
              '&-button1Uppercase': { ...(theme.hugoUITypography.button.uppercase as CSSObject) },
              '&-small': { ...(theme.hugoUITypography.smallText.base as CSSObject) },
              '&-smallUppercase': { ...(theme.hugoUITypography.smallText.uppercase as CSSObject) },
              '&-eyebrow': { ...(theme.hugoUITypography.eyebrow.base as CSSObject) },
              '&-eyebrowUppercase': { ...(theme.hugoUITypography.eyebrow.uppercase as CSSObject) },
            },
          }),
        },
      },
    },
  });
};
