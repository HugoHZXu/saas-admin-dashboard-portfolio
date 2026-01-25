import { CSSObject, Theme } from '@mui/material/styles';

const getIconOnly = (padding: number, minWidth?: number) => ({
  paddingLeft: padding,
  paddingRight: padding,
  minWidth,
  '.MuiButton-startIcon': {
    marginLeft: 0,
    marginRight: 0,
  },
});

export const getFilledButtonFocusVisibleStyle = (borderColor: string): CSSObject => ({
  border: '3px solid transparent',
  backgroundClip: 'padding-box',
  '&::before': {
    content: '" "',
    position: 'absolute',
    top: -3,
    left: -3,
    right: -3,
    bottom: -3,
    boxShadow: `inset 0 0 0 2px ${borderColor}`,
    borderRadius: '100px',
  },
});

export const createFilledButtonFocusedSizes = (theme: Theme): CSSObject => ({
  '&.MuiButton-sizeLarge': {
    paddingTop: 11,
    paddingBottom: 11,
    paddingLeft: 29,
    paddingRight: 29,
    '.MuiButton-startIcon, .MuiButton-endIcon': {
      '& svg': {
        width: 24,
        height: 24,
        fontSize: 24,
      },
    },
    '&.HugoUIButton-hasStartIcon': {
      paddingTop: 9,
      paddingBottom: 9,
      paddingLeft: 21,
      paddingRight: 29,
      lineHeight: '24px',
      '.MuiButton-startIcon': {
        height: 24,
      },
      '&.HugoUIButton-icon-only': getIconOnly(21),
    },
    '&.HugoUIButton-hasEndIcon': {
      lineHeight: '24px',
      paddingTop: 9,
      paddingBottom: 9,
      paddingLeft: 29,
      paddingRight: 53,
      '.MuiButton-endIcon': {
        top: 9,
        right: 21,
      },
    },
  },
  '&.MuiButton-sizeMedium': {
    paddingTop: 7.5,
    paddingBottom: 7.5,
    paddingLeft: 21,
    paddingRight: 21,
    '.MuiButton-startIcon, .MuiButton-endIcon': {
      '& svg': {
        width: 24,
        height: 24,
        fontSize: 24,
      },
    },
    '&.HugoUIButton-hasStartIcon': {
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 13,
      paddingRight: 21,
      lineHeight: '24px',
      '.MuiButton-startIcon': {
        height: 24,
      },
      '&.HugoUIButton-icon-only': getIconOnly(13, 53),
    },
    '&.HugoUIButton-hasEndIcon': {
      lineHeight: '24px',
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 21,
      paddingRight: 45,
      '.MuiButton-endIcon': {
        top: 5,
        right: 13,
      },
    },
  },
  '&.MuiButton-sizeSmall': {
    height: 24,
    fontSize: theme.hugoUITypography.button.small.fontSize,
    fontWeight: theme.hugoUITypography.button.small.fontWeight,
    lineHeight: theme.hugoUITypography.button.small.lineHeight,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 13,
    paddingRight: 13,
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
      paddingTop: 1,
      paddingBottom: 1,
      paddingLeft: 9,
      paddingRight: 13,
      '&.HugoUIButton-icon-only': getIconOnly(13, 45),
    },
    '&.HugoUIButton-hasEndIcon': {
      paddingTop: 1,
      paddingBottom: 1,
      paddingLeft: 13,
      paddingRight: 33,
      '.MuiButton-endIcon': {
        top: 1,
        right: 9,
      },
    },
  },
});
