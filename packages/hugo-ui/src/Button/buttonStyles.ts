import { alpha, createTheme, CSSObject } from '@mui/material/styles';
import { hugoUITheme } from '../styles/theme';
import { HugoUIButtonLevel, HugoUIButtonColorTheme, HugoUIButtonDrawingStyle } from './buttonTypes';

export const BUTTON_ROOT_PREFIX = 'HugoUIButton';

const {
  hugoUIColors: {
    BLUE,
    DARK_PURPLE,
    DESTRUCT_STATE_1,
    DESTRUCT_STATE_2,
    ERROR_OR_DESTRUCT,
    LIGHT_PURPLE,
    NEUTRAL_DARK_GREY,
    NEUTRAL_GREY_1100,
    NEUTRAL_GREY_1200,
    NEUTRAL_GREY_200,
    NEUTRAL_GREY_500,
    NEUTRAL_GREY_600,
    NEUTRAL_GREY_800,
    NEUTRAL_WHITE,
    PLUM_100,
    PURPLE_GRAPE,
    PURPLE_PLUM,
  },
  hugoUITypography: { button },
} = hugoUITheme;

const TYPOGRAPHY_BUTTON_SMALL = button.small;

const BLEND_PLUM_AND_DARK_PURPLE_40 = '#71379A';
const BLEND_PLUM_AND_DARK_PURPLE_60 = '#5D2985';
const BUTTON_LIGHT_GREY = '#B8B8B8';
const BUTTON_MID_GREY = '#8B8B8B';

export const BUTTON_ICON_SMALL = 16;
export const BUTTON_ICON_NORMAL = 24;

type ButtonStatusType = 'hover' | 'active' | 'focus' | 'disabled' | 'basic';
type StatusTreeType = {
  [key in HugoUIButtonLevel]: {
    [key in HugoUIButtonColorTheme]?: {
      [key in HugoUIButtonDrawingStyle]?: {
        [key in ButtonStatusType]?: CSSObject;
      };
    };
  };
};

const getIconOnly = (padding: number, minWidth?: number) => {
  return {
    paddingLeft: padding,
    paddingRight: padding,
    minWidth: minWidth,
    '.MuiButton-startIcon': {
      marginLeft: 0,
      marginRight: 0,
    },
  };
};

const buttonSizes = {
  '&.MuiButton-sizeLarge': {
    height: 48,
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 32,
    paddingRight: 32,
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
    fontSize: TYPOGRAPHY_BUTTON_SMALL.fontSize,
    fontWeight: TYPOGRAPHY_BUTTON_SMALL.fontWeight,
    lineHeight: TYPOGRAPHY_BUTTON_SMALL.lineHeight,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 16,
    paddingRight: 16,
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
};

// For this type for buttons, when focusing, there will be an 1px transparent stroke and a 2px border,
// so to keep the button size, each padding and position value should minus 3.
const filledButtonFocusedSizes = {
  '&.MuiButton-sizeLarge': {
    paddingTop: 11,
    paddingBottom: 11,
    paddingLeft: 29,
    paddingRight: 29,
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
    '&.HugoUIButton-hasStartIcon': {
      lineHeight: '24px',
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 13,
      paddingRight: 21,
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
    fontSize: TYPOGRAPHY_BUTTON_SMALL.fontSize,
    fontWeight: TYPOGRAPHY_BUTTON_SMALL.fontWeight,
    lineHeight: TYPOGRAPHY_BUTTON_SMALL.lineHeight,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 13,
    paddingRight: 13,
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
};

// Add a 3px transparent border.
// And then background-clip: padding-box to make sure the original background color does not cover the border.
// Finally use `::before` to create the outer colored stroke
const getFilledButtonFocusVisibleStyle = (borderColor: string) => ({
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

const getColorThemeStatus = (
  level: HugoUIButtonLevel,
  colorTheme: HugoUIButtonColorTheme,
  status: ButtonStatusType,
  drawingStyle: HugoUIButtonDrawingStyle
) => {
  const statusTree: StatusTreeType = {
    primary: {
      purple: {
        filled: {
          basic: {
            color: NEUTRAL_WHITE,
            backgroundColor: PURPLE_PLUM,
            '.icon-loading': {
              color: NEUTRAL_WHITE,
            },
          },
          hover: {
            backgroundColor: BLEND_PLUM_AND_DARK_PURPLE_40,
          },
          active: {
            backgroundColor: BLEND_PLUM_AND_DARK_PURPLE_60,
          },
          focus: {
            backgroundColor: BLEND_PLUM_AND_DARK_PURPLE_40,
            ...filledButtonFocusedSizes,
            ...getFilledButtonFocusVisibleStyle(BLUE),
          },
          disabled: {
            backgroundColor: NEUTRAL_DARK_GREY,
            color: NEUTRAL_WHITE,
          },
        },
      },
      white: {
        filled: {
          basic: {
            color: PURPLE_GRAPE,
            backgroundColor: NEUTRAL_WHITE,
            '.icon-loading': {
              color: PURPLE_GRAPE,
            },
          },
          hover: {
            backgroundColor: alpha(NEUTRAL_WHITE, 0.8),
          },
          active: {
            backgroundColor: alpha(NEUTRAL_WHITE, 0.6),
            color: DARK_PURPLE,
            '.icon-loading': {
              color: DARK_PURPLE,
            },
          },
          focus: {
            backgroundColor: alpha(NEUTRAL_WHITE, 0.8),
            ...filledButtonFocusedSizes,
            ...getFilledButtonFocusVisibleStyle(NEUTRAL_WHITE),
          },
          disabled: {
            opacity: 0.5,
            backgroundColor: BUTTON_MID_GREY,
            color: NEUTRAL_WHITE,
            '.icon-loading': {
              color: NEUTRAL_WHITE,
            },
          },
        },
      },
      red: {
        filled: {
          basic: {
            color: NEUTRAL_WHITE,
            backgroundColor: ERROR_OR_DESTRUCT,
            '.icon-loading': {
              color: NEUTRAL_WHITE,
            },
          },
          hover: {
            backgroundColor: DESTRUCT_STATE_1,
          },
          focus: {
            backgroundColor: DESTRUCT_STATE_1,
            ...filledButtonFocusedSizes,
            ...getFilledButtonFocusVisibleStyle(BLUE),
          },
          active: {
            backgroundColor: DESTRUCT_STATE_2,
          },
          disabled: {
            backgroundColor: NEUTRAL_DARK_GREY,
          },
        },
      },
    },
    secondary: {
      purple: {
        outlined: {
          basic: {
            boxShadow: `inset 0px 0px 0px 1px ${BUTTON_MID_GREY}`,
            color: PURPLE_GRAPE,
            backgroundColor: 'transparent',
            '.icon-loading': {
              color: PURPLE_GRAPE,
            },
          },
          hover: {
            backgroundColor: alpha(LIGHT_PURPLE, 0.2),
            boxShadow: `inset 0px 0px 0px 1px ${PURPLE_GRAPE}`,
          },
          active: {
            backgroundColor: alpha(DARK_PURPLE, 0.2),
            boxShadow: `inset 0px 0px 0px 1px ${DARK_PURPLE}`,
            color: DARK_PURPLE,
            '.icon-loading': {
              color: DARK_PURPLE,
            },
          },
          focus: {
            boxShadow: `inset 0px 0px 0px 2px ${BLUE}`,
            backgroundColor: alpha(LIGHT_PURPLE, 0.2),
          },
          disabled: {
            boxShadow: `inset 0px 0px 0px 1px ${NEUTRAL_DARK_GREY}`,
            backgroundColor: 'transparent',
            color: NEUTRAL_DARK_GREY,
            '.icon-loading': {
              color: NEUTRAL_DARK_GREY,
            },
          },
        },
      },
      grey: {
        outlined: {
          basic: {
            boxShadow: `inset 0px 0px 0px 1px ${BUTTON_MID_GREY}`,
            color: NEUTRAL_GREY_1200,
            backgroundColor: 'transparent',
            '.icon-loading': {
              color: NEUTRAL_GREY_1200,
            },
          },
          hover: {
            backgroundColor: NEUTRAL_GREY_200,
            boxShadow: `inset 0px 0px 0px 1px ${NEUTRAL_GREY_800}`,
          },
          active: {
            backgroundColor: NEUTRAL_GREY_500,
            boxShadow: `inset 0px 0px 0px 1px ${NEUTRAL_GREY_1100}`,
          },
          focus: {
            boxShadow: `inset 0px 0px 0px 2px ${BLUE}`,
            backgroundColor: NEUTRAL_GREY_200,
          },
          disabled: {
            boxShadow: `inset 0px 0px 0px 1px ${NEUTRAL_DARK_GREY}`,
            backgroundColor: NEUTRAL_WHITE,
            color: NEUTRAL_DARK_GREY,
            '.icon-loading': {
              color: NEUTRAL_DARK_GREY,
            },
          },
        },
      },
      white: {
        outlined: {
          basic: {
            boxShadow: `inset 0px 0px 0px 1px ${BUTTON_LIGHT_GREY}`,
            color: NEUTRAL_WHITE,
            backgroundColor: 'transparent',
            '.icon-loading': {
              color: NEUTRAL_WHITE,
            },
          },
          hover: {
            backgroundColor: alpha(LIGHT_PURPLE, 0.2),
          },
          focus: {
            backgroundColor: alpha(LIGHT_PURPLE, 0.2),
            boxShadow: `inset 0px 0px 0px 2px ${NEUTRAL_WHITE}`,
          },
          active: {
            backgroundColor: alpha(DARK_PURPLE, 0.2),
          },
          disabled: {
            opacity: 0.5,
            backgroundColor: 'transparent',
            color: NEUTRAL_WHITE,
          },
        },
      },
    },
    tertiary: {
      purple: {
        text: {
          basic: {
            color: PURPLE_GRAPE,
            backgroundColor: 'transparent',
            '.icon-loading': {
              color: PURPLE_GRAPE,
            },
          },
          hover: {
            boxShadow: `inset 0px 0px 0px 1px ${PURPLE_GRAPE}`,
            backgroundColor: alpha(PLUM_100, 0.15),
          },
          focus: {
            backgroundColor: alpha(PLUM_100, 0.15),
            boxShadow: `inset 0px 0px 0px 2px ${BLUE}`,
          },
          active: {
            boxShadow: `inset 0px 0px 0px 1px ${DARK_PURPLE}`,
            backgroundColor: alpha(DARK_PURPLE, 0.4),
            color: DARK_PURPLE,
            '.icon-loading': {
              color: DARK_PURPLE,
            },
          },
          disabled: {
            boxShadow: 'none',
            backgroundColor: 'transparent',
            color: NEUTRAL_DARK_GREY,
            '.icon-loading': {
              color: NEUTRAL_DARK_GREY,
            },
          },
        },
      },
      white: {
        text: {
          basic: {
            color: NEUTRAL_WHITE,
            backgroundColor: 'transparent',
            '.icon-loading': {
              color: NEUTRAL_WHITE,
            },
          },
          hover: {
            backgroundColor: alpha(LIGHT_PURPLE, 0.2),
            boxShadow: `inset 0px 0px 0px 1px ${NEUTRAL_WHITE}`,
          },
          focus: {
            backgroundColor: alpha(LIGHT_PURPLE, 0.2),
            boxShadow: `inset 0px 0px 0px 2px ${NEUTRAL_WHITE}`,
          },
          active: {
            backgroundColor: alpha(PLUM_100, 0.35),
            boxShadow: `inset 0px 0px 0px 1px ${NEUTRAL_WHITE}`,
          },
          disabled: {
            boxShadow: 'none',
            opacity: 0.5,
            backgroundColor: 'transparent',
            color: NEUTRAL_DARK_GREY,
            '.icon-loading': {
              color: NEUTRAL_DARK_GREY,
            },
          },
        },
      },
      grey: {
        text: {
          basic: {
            color: NEUTRAL_GREY_1200,
            backgroundColor: 'transparent',
            '.icon-loading': {
              color: NEUTRAL_GREY_1200,
            },
          },
          hover: {
            backgroundColor: BUTTON_LIGHT_GREY,
            boxShadow: `inset 0px 0px 0px 1px ${NEUTRAL_GREY_1100}`,
          },
          focus: {
            boxShadow: 'none',
            backgroundColor: NEUTRAL_GREY_600,
            ...filledButtonFocusedSizes,
            ...getFilledButtonFocusVisibleStyle(BLUE),
          },
          active: {
            backgroundColor: BUTTON_MID_GREY,
            boxShadow: `inset 0px 0px 0px 1px ${NEUTRAL_GREY_1200}`,
          },
          disabled: {
            boxShadow: 'none',
            backgroundColor: 'transparent',
            color: NEUTRAL_DARK_GREY,
            '.icon-loading': {
              color: NEUTRAL_DARK_GREY,
            },
          },
        },
      },
    },
  };
  return statusTree[level]?.[colorTheme]?.[drawingStyle]?.[status] || {};
};

const generateBasicStyle = (
  level: HugoUIButtonLevel,
  colorTheme: HugoUIButtonColorTheme,
  drawingStyle: HugoUIButtonDrawingStyle
) => {
  return {
    ...getColorThemeStatus(level, colorTheme, 'basic', drawingStyle),
    '@media (hover: hover)': {
      '&:hover': {
        ...getColorThemeStatus(level, colorTheme, 'hover', drawingStyle),
      },
    },
    '&.Mui-focusVisible': {
      ...getColorThemeStatus(level, colorTheme, 'focus', drawingStyle),
    },
    '&:active': {
      ...getColorThemeStatus(level, colorTheme, 'active', drawingStyle),
    },
    // the loading button should be the pressed status
    '&.HugoUIButton-loading': {
      ...getColorThemeStatus(level, colorTheme, 'active', drawingStyle),
    },
    '&.Mui-disabled': {
      ...getColorThemeStatus(level, colorTheme, 'disabled', drawingStyle),
    },
  };
};

export const createButtonTheme = () =>
  createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: ({ theme }) => ({
            display: 'inline-block',
            ...theme.hugoUITypography.button.base,
            whiteSpace: 'nowrap',
            minWidth: 'fit-content',
            textTransform: 'none',
            boxSizing: 'border-box',
            outline: 'none',
            borderRadius: '100px',
            border: 'none',
            ...theme.hugoUIShadows.NO_SHADOW,
            '@media (hover: hover)': {
              '&:hover': {
                border: 'none',
                ...theme.hugoUIShadows.NO_SHADOW,
              },
            },
            '&.Mui-focusVisible': {
              boxShadow: 'none',
              transition: 'background-color linear 0.2s',
            },
            '&:active': {
              ...theme.hugoUIShadows.NO_SHADOW,
            },
            '&.Mui-disabled': {
              border: 'none',
              cursor: 'not-allowed',
              pointerEvents: 'all',
            },
            // loading
            '&.HugoUIButton-loading': {
              cursor: 'default',
              '&.HugoUIButton-loading-center': {
                '>span': {
                  visibility: 'hidden',
                },
                '.HugoUIButton-loadingIndicator-center': {
                  visibility: 'visible',
                  position: 'absolute',
                  display: 'flex',
                  top: `calc(50% - ${BUTTON_ICON_NORMAL / 2}px)`,
                  left: `calc(50% - ${BUTTON_ICON_NORMAL / 2}px)`,
                },
              },
            },
            // sizes
            ...buttonSizes,
            // levels then colors then drawing styles
            '&.HugoUIButton-primaryLevel': {
              '&.HugoUIButton-purpleColor': {
                '&.HugoUIButton-filledDrawingStyle': {
                  ...generateBasicStyle('primary', 'purple', 'filled'),
                },
              },
              '&.HugoUIButton-whiteColor': {
                '&.HugoUIButton-filledDrawingStyle': {
                  ...generateBasicStyle('primary', 'white', 'filled'),
                },
              },
              '&.HugoUIButton-redColor': {
                '&.HugoUIButton-filledDrawingStyle': {
                  ...generateBasicStyle('primary', 'red', 'filled'),
                },
              },
            },
            '&.HugoUIButton-secondaryLevel': {
              '&.HugoUIButton-purpleColor': {
                '&.HugoUIButton-outlinedDrawingStyle': {
                  ...generateBasicStyle('secondary', 'purple', 'outlined'),
                },
              },
              '&.HugoUIButton-greyColor': {
                '&.HugoUIButton-outlinedDrawingStyle': {
                  ...generateBasicStyle('secondary', 'grey', 'outlined'),
                },
              },
              '&.HugoUIButton-whiteColor': {
                '&.HugoUIButton-outlinedDrawingStyle': {
                  ...generateBasicStyle('secondary', 'white', 'outlined'),
                },
              },
            },
            '&.HugoUIButton-tertiaryLevel': {
              '&.HugoUIButton-purpleColor': {
                '&.HugoUIButton-textDrawingStyle': {
                  ...generateBasicStyle('tertiary', 'purple', 'text'),
                },
              },
              '&.HugoUIButton-whiteColor': {
                '&.HugoUIButton-textDrawingStyle': {
                  ...generateBasicStyle('tertiary', 'white', 'text'),
                },
              },
              '&.HugoUIButton-greyColor': {
                '&.HugoUIButton-textDrawingStyle': {
                  ...generateBasicStyle('tertiary', 'grey', 'text'),
                },
              },
            },
          }),
          iconSizeLarge: {
            '&.MuiButton-startIcon': {
              marginLeft: -3,
            },
            '[class^="icon-"]': {
              fontSize: BUTTON_ICON_NORMAL,
            },
          },
          iconSizeMedium: {
            '&.MuiButton-startIcon': {
              marginLeft: -3,
            },
            '[class^="icon-"]': {
              fontSize: BUTTON_ICON_NORMAL,
            },
          },
          iconSizeSmall: {
            '[class^="icon-"]': {
              fontSize: BUTTON_ICON_SMALL,
            },
          },
          startIcon: {
            display: 'inline-block',
            verticalAlign: 'top',
          },
          endIcon: {
            display: 'block',
            position: 'absolute',
            '[class^="icon-"]': {
              fontSize: 16,
            },
          },
        },
      },
    },
  });
