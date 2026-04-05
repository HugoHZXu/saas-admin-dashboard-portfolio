import { createTheme, CSSObject, Theme, ThemeOptions } from '@mui/material/styles';
import {
  HugoUIButtonLevel,
  HugoUIButtonColorTheme,
  HugoUIButtonDrawingStyle,
} from '../buttonTypes';
import { ButtonStatusType, createButtonTokens, getButtonSurfaceContext } from './buttonTokens';
import { createButtonSizes, BUTTON_ICON_NORMAL, BUTTON_ICON_SMALL } from './buttonSizes';

export const BUTTON_ROOT_PREFIX = 'HugoUIButton';
export { BUTTON_ICON_NORMAL, BUTTON_ICON_SMALL };

type StatusGetter = (
  level: HugoUIButtonLevel,
  colorTheme: HugoUIButtonColorTheme,
  drawingStyle: HugoUIButtonDrawingStyle,
  status: ButtonStatusType
) => CSSObject;

const createStatusGetter = (theme: Theme): StatusGetter => {
  const tokens = createButtonTokens(theme);
  return (level, colorTheme, drawingStyle, status) => {
    const surface = getButtonSurfaceContext(colorTheme);
    return tokens[surface]?.[level]?.[colorTheme]?.[drawingStyle]?.[status] || {};
  };
};

const composeInteractiveStates = (
  getStatus: StatusGetter,
  level: HugoUIButtonLevel,
  colorTheme: HugoUIButtonColorTheme,
  drawingStyle: HugoUIButtonDrawingStyle
) => ({
  ...getStatus(level, colorTheme, drawingStyle, 'basic'),
  '@media (hover: hover)': {
    '&:hover': {
      ...getStatus(level, colorTheme, drawingStyle, 'hover'),
    },
  },
  '&.Mui-focusVisible': {
    ...getStatus(level, colorTheme, drawingStyle, 'focus'),
  },
  '&:active': {
    ...getStatus(level, colorTheme, drawingStyle, 'active'),
  },
  // the loading button should be the pressed status
  '&.HugoUIButton-loading': {
    ...getStatus(level, colorTheme, drawingStyle, 'active'),
  },
  '&.Mui-disabled': {
    ...getStatus(level, colorTheme, drawingStyle, 'disabled'),
  },
});

export const createButtonThemeOverrides = (): ThemeOptions => ({
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => {
          const getStatus = createStatusGetter(theme as Theme);
          return {
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
            '.MuiButton-startIcon': {
              display: 'inline-block',
              verticalAlign: 'top',
              marginRight: 8,
              marginLeft: -4,
            },
            '&.MuiButton-sizeLarge .MuiButton-startIcon, &.MuiButton-sizeMedium .MuiButton-startIcon': {
              marginLeft: -4,
            },
            '&.MuiButton-sizeLarge .MuiButton-startIcon [class^="icon-"], &.MuiButton-sizeLarge .MuiButton-endIcon [class^="icon-"], &.MuiButton-sizeMedium .MuiButton-startIcon [class^="icon-"], &.MuiButton-sizeMedium .MuiButton-endIcon [class^="icon-"]': {
              fontSize: BUTTON_ICON_NORMAL,
            },
            '&.MuiButton-sizeSmall .MuiButton-startIcon [class^="icon-"], &.MuiButton-sizeSmall .MuiButton-endIcon [class^="icon-"]': {
              fontSize: BUTTON_ICON_SMALL,
            },
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
            ...createButtonSizes(theme as Theme),
            // levels then colors then drawing styles
            '&.HugoUIButton-primaryLevel': {
              '&.HugoUIButton-purpleColor': {
                '&.HugoUIButton-filledDrawingStyle': {
                  ...composeInteractiveStates(getStatus, 'primary', 'purple', 'filled'),
                },
              },
              '&.HugoUIButton-whiteColor': {
                '&.HugoUIButton-filledDrawingStyle': {
                  ...composeInteractiveStates(getStatus, 'primary', 'white', 'filled'),
                },
              },
              '&.HugoUIButton-redColor': {
                '&.HugoUIButton-filledDrawingStyle': {
                  ...composeInteractiveStates(getStatus, 'primary', 'red', 'filled'),
                },
              },
            },
            '&.HugoUIButton-secondaryLevel': {
              '&.HugoUIButton-purpleColor': {
                '&.HugoUIButton-outlinedDrawingStyle': {
                  ...composeInteractiveStates(getStatus, 'secondary', 'purple', 'outlined'),
                },
              },
              '&.HugoUIButton-greyColor': {
                '&.HugoUIButton-outlinedDrawingStyle': {
                  ...composeInteractiveStates(getStatus, 'secondary', 'grey', 'outlined'),
                },
              },
              '&.HugoUIButton-whiteColor': {
                '&.HugoUIButton-outlinedDrawingStyle': {
                  ...composeInteractiveStates(getStatus, 'secondary', 'white', 'outlined'),
                },
              },
            },
            '&.HugoUIButton-tertiaryLevel': {
              '&.HugoUIButton-purpleColor': {
                '&.HugoUIButton-textDrawingStyle': {
                  ...composeInteractiveStates(getStatus, 'tertiary', 'purple', 'text'),
                },
              },
              '&.HugoUIButton-whiteColor': {
                '&.HugoUIButton-textDrawingStyle': {
                  ...composeInteractiveStates(getStatus, 'tertiary', 'white', 'text'),
                },
              },
              '&.HugoUIButton-greyColor': {
                '&.HugoUIButton-textDrawingStyle': {
                  ...composeInteractiveStates(getStatus, 'tertiary', 'grey', 'text'),
                },
              },
            },
          };
        },
        startIcon: {
          display: 'inline-block',
          verticalAlign: 'top',
          marginRight: 8,
          marginLeft: -4,
        },
        endIcon: {
          display: 'block',
          position: 'absolute',
          marginRight: -4,
          marginLeft: 8,
        },
      },
    },
  },
});

export const createButtonTheme = (parentTheme: Theme) =>
  createTheme(parentTheme, createButtonThemeOverrides());
