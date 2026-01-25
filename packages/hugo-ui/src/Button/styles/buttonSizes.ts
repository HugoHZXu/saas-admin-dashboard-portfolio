import { CSSObject, Theme } from '@mui/material/styles';

export const BUTTON_ICON_SMALL = 16;
export const BUTTON_ICON_NORMAL = 24;

const getIconOnly = (padding: number, minWidth?: number) => ({
  paddingLeft: padding,
  paddingRight: padding,
  minWidth,
  '.MuiButton-startIcon': {
    marginLeft: 0,
    marginRight: 0,
  },
});

export const createButtonSizes = (theme: Theme): CSSObject => ({
  '&.MuiButton-sizeLarge': {
    height: 48,
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 32,
    paddingRight: 32,
    '.MuiButton-startIcon, .MuiButton-endIcon': {
      '& svg': {
        width: 24,
        height: 24,
        fontSize: 24,
      },
    },
    '&.HugoUIButton-hasStartIcon': {
      paddingTop: 12,
      paddingBottom: 12,
      paddingLeft: 24,
      paddingRight: 32,
      lineHeight: '24px',
      '.MuiButton-startIcon': {
        height: 24,
      },
      '&.HugoUIButton-icon-only': getIconOnly(24),
    },
    '&.HugoUIButton-hasEndIcon': {
      lineHeight: '24px',
      paddingTop: 12,
      paddingBottom: 12,
      paddingLeft: 32,
      paddingRight: 56,
      '.MuiButton-endIcon': {
        top: 12,
        right: 24,
      },
    },
    '&.HugoUIButton-loading': {
      '&.HugoUIButton-loading-center': {
        '.HugoUIButton-loadingIndicator-center': {
          top: `calc(50% - ${BUTTON_ICON_NORMAL / 2}px)`,
          left: `calc(50% - ${BUTTON_ICON_NORMAL / 2}px)`,
        },
      },
    },
  },
  '&.MuiButton-sizeMedium': {
    paddingTop: 10.5,
    paddingBottom: 10.5,
    paddingLeft: 24,
    paddingRight: 24,
    '.MuiButton-startIcon, .MuiButton-endIcon': {
      '& svg': {
        width: 24,
        height: 24,
        fontSize: 24,
      },
    },
    '&.HugoUIButton-hasStartIcon': {
      lineHeight: '24px',
      paddingTop: 8,
      paddingBottom: 8,
      paddingLeft: 16,
      paddingRight: 24,
      '.MuiButton-startIcon': {
        height: 24,
      },
      '&.HugoUIButton-icon-only': getIconOnly(16, 56),
    },
    '&.HugoUIButton-hasEndIcon': {
      lineHeight: '24px',
      paddingTop: 8,
      paddingBottom: 8,
      paddingLeft: 24,
      paddingRight: 48,
      '.MuiButton-endIcon': {
        top: 8,
        right: 16,
      },
    },
    '&.HugoUIButton-loading': {
      '&.HugoUIButton-loading-center': {
        '.HugoUIButton-loadingIndicator-center': {
          top: `calc(50% - ${BUTTON_ICON_NORMAL / 2}px)`,
          left: `calc(50% - ${BUTTON_ICON_NORMAL / 2}px)`,
        },
      },
    },
  },
  '&.MuiButton-sizeSmall': {
    height: 24,
    fontSize: theme.hugoUITypography.button.small.fontSize,
    fontWeight: theme.hugoUITypography.button.small.fontWeight,
    lineHeight: theme.hugoUITypography.button.small.lineHeight,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 16,
    paddingRight: 16,
    '.MuiButton-startIcon, .MuiButton-endIcon': {
      display: 'inline-flex',
      alignItems: 'center',
      alignSelf: 'center',
      height: 16,
      '& svg': {
        width: 16,
        height: 16,
        fontSize: 16,
      },
    },
    '&.HugoUIButton-hasStartIcon': {
      lineHeight: '16px',
      paddingTop: 2,
      paddingBottom: 2,
      paddingLeft: 12,
      paddingRight: 16,
      '&.HugoUIButton-icon-only': getIconOnly(16, 48),
    },
    '&.HugoUIButton-hasEndIcon': {
      paddingTop: 4,
      paddingBottom: 4,
      paddingLeft: 16,
      paddingRight: 36,
      '.MuiButton-endIcon': {
        top: 4,
        right: 12,
      },
    },
    '&.HugoUIButton-loading': {
      '&.HugoUIButton-loading-center': {
        '.HugoUIButton-loadingIndicator-center': {
          top: `calc(50% - ${BUTTON_ICON_SMALL / 2}px)`,
          left: `calc(50% - ${BUTTON_ICON_SMALL / 2}px)`,
        },
      },
    },
  },
});
