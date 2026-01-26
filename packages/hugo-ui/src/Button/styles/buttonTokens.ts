import { alpha, CSSObject, Theme } from '@mui/material/styles';
import {
  HugoUIButtonLevel,
  HugoUIButtonColorTheme,
  HugoUIButtonDrawingStyle,
} from '../buttonTypes';
import { createFilledButtonFocusedSizes, getFilledButtonFocusVisibleStyle } from './buttonFocus';

export type ButtonStatusType = 'hover' | 'active' | 'focus' | 'disabled' | 'basic';
export type ButtonSurfaceContext = 'onLight' | 'onDark';
export type ButtonTokens = {
  [key in HugoUIButtonLevel]: {
    [key in HugoUIButtonColorTheme]?: {
      [key in HugoUIButtonDrawingStyle]?: {
        [key in ButtonStatusType]?: CSSObject;
      };
    };
  };
};

export const getButtonSurfaceContext = (
  colorTheme: HugoUIButtonColorTheme
): ButtonSurfaceContext => (colorTheme === 'white' ? 'onDark' : 'onLight');

// Button-only blends and greys used for control states.
const BUTTON_BLEND_PLUM_DARK_40 = '#71379A';
const BUTTON_BLEND_PLUM_DARK_60 = '#5D2985';
const BUTTON_BORDER_LIGHT = '#B8B8B8';
const BUTTON_BORDER_MID = '#8B8B8B';

export const createButtonTokens = (theme: Theme): Record<ButtonSurfaceContext, ButtonTokens> => {
  const { hugoUIColorRoles, hugoUIColors } = theme;
  const filledButtonFocusedSizes = createFilledButtonFocusedSizes(theme);
  const focusRing = hugoUIColorRoles.focus.ring;
  const focusRingOnDark = hugoUIColorRoles.focus.ringOnDark;

  return {
    onLight: {
      primary: {
        purple: {
          filled: {
            basic: {
              color: hugoUIColorRoles.text.inverse,
              backgroundColor: hugoUIColorRoles.brand.primary,
              '.HugoUILoading-loadingIcon': {
                color: hugoUIColorRoles.text.inverse,
              },
            },
            hover: {
              backgroundColor: BUTTON_BLEND_PLUM_DARK_40,
            },
            active: {
              backgroundColor: BUTTON_BLEND_PLUM_DARK_60,
            },
            focus: {
              backgroundColor: BUTTON_BLEND_PLUM_DARK_40,
              ...filledButtonFocusedSizes,
              ...getFilledButtonFocusVisibleStyle(focusRing),
            },
            disabled: {
              backgroundColor: hugoUIColors.NEUTRAL_DARK_GREY,
              color: hugoUIColorRoles.text.inverse,
            },
          },
        },
        white: {
          filled: {
            basic: {
              color: hugoUIColorRoles.brand.accent,
              backgroundColor: hugoUIColorRoles.surface.default,
              '.HugoUILoading-loadingIcon': {
                color: hugoUIColorRoles.brand.accent,
              },
            },
            hover: {
              backgroundColor: alpha(hugoUIColorRoles.surface.default, 0.8),
            },
            active: {
              backgroundColor: alpha(hugoUIColorRoles.surface.default, 0.6),
              color: hugoUIColorRoles.brand.deep,
              '.HugoUILoading-loadingIcon': {
                color: hugoUIColorRoles.brand.deep,
              },
            },
            focus: {
              backgroundColor: alpha(hugoUIColorRoles.surface.default, 0.8),
              ...filledButtonFocusedSizes,
              ...getFilledButtonFocusVisibleStyle(hugoUIColorRoles.text.inverse),
            },
            disabled: {
              opacity: 0.5,
              backgroundColor: BUTTON_BORDER_MID,
              color: hugoUIColorRoles.text.inverse,
              '.HugoUILoading-loadingIcon': {
                color: hugoUIColorRoles.text.inverse,
              },
            },
          },
        },
        red: {
          filled: {
            basic: {
              color: hugoUIColorRoles.text.inverse,
              backgroundColor: hugoUIColorRoles.status.error,
              '.HugoUILoading-loadingIcon': {
                color: hugoUIColorRoles.text.inverse,
              },
            },
            hover: {
              backgroundColor: hugoUIColorRoles.status.destructStrong,
            },
            focus: {
              backgroundColor: hugoUIColorRoles.status.destructStrong,
              ...filledButtonFocusedSizes,
              ...getFilledButtonFocusVisibleStyle(focusRing),
            },
            active: {
              backgroundColor: hugoUIColorRoles.status.destructActive,
            },
            disabled: {
              backgroundColor: hugoUIColors.NEUTRAL_DARK_GREY,
            },
          },
        },
      },
      secondary: {
        purple: {
          outlined: {
            basic: {
              boxShadow: `inset 0px 0px 0px 1px ${BUTTON_BORDER_MID}`,
              color: hugoUIColorRoles.brand.accent,
              backgroundColor: 'transparent',
              '.HugoUILoading-loadingIcon': {
                color: hugoUIColorRoles.brand.accent,
              },
            },
            hover: {
              backgroundColor: alpha(hugoUIColorRoles.surface.tintedStrong, 0.2),
              boxShadow: `inset 0px 0px 0px 1px ${hugoUIColorRoles.brand.accent}`,
            },
            active: {
              backgroundColor: alpha(hugoUIColorRoles.brand.deep, 0.2),
              boxShadow: `inset 0px 0px 0px 1px ${hugoUIColorRoles.brand.deep}`,
              color: hugoUIColorRoles.brand.deep,
              '.HugoUILoading-loadingIcon': {
                color: hugoUIColorRoles.brand.deep,
              },
            },
            focus: {
              boxShadow: `inset 0px 0px 0px 2px ${focusRing}`,
              backgroundColor: alpha(hugoUIColorRoles.surface.tintedStrong, 0.2),
            },
            disabled: {
              boxShadow: `inset 0px 0px 0px 1px ${hugoUIColors.NEUTRAL_DARK_GREY}`,
              backgroundColor: 'transparent',
              color: hugoUIColorRoles.text.disabled,
              '.HugoUILoading-loadingIcon': {
                color: hugoUIColorRoles.text.disabled,
              },
            },
          },
        },
        grey: {
          outlined: {
            basic: {
              boxShadow: `inset 0px 0px 0px 1px ${BUTTON_BORDER_MID}`,
              color: hugoUIColors.NEUTRAL_GREY_1200,
              backgroundColor: 'transparent',
              '.HugoUILoading-loadingIcon': {
                color: hugoUIColors.NEUTRAL_GREY_1200,
              },
            },
            hover: {
              backgroundColor: hugoUIColors.NEUTRAL_GREY_200,
              boxShadow: `inset 0px 0px 0px 1px ${hugoUIColors.NEUTRAL_GREY_800}`,
            },
            active: {
              backgroundColor: hugoUIColors.NEUTRAL_GREY_500,
              boxShadow: `inset 0px 0px 0px 1px ${hugoUIColors.NEUTRAL_GREY_1100}`,
            },
            focus: {
              boxShadow: `inset 0px 0px 0px 2px ${focusRing}`,
              backgroundColor: hugoUIColors.NEUTRAL_GREY_200,
            },
            disabled: {
              boxShadow: `inset 0px 0px 0px 1px ${hugoUIColors.NEUTRAL_DARK_GREY}`,
              backgroundColor: hugoUIColorRoles.surface.default,
              color: hugoUIColorRoles.text.disabled,
              '.HugoUILoading-loadingIcon': {
                color: hugoUIColorRoles.text.disabled,
              },
            },
          },
        },
      },
      tertiary: {
        purple: {
          text: {
            basic: {
              color: hugoUIColorRoles.brand.accent,
              backgroundColor: 'transparent',
              '.HugoUILoading-loadingIcon': {
                color: hugoUIColorRoles.brand.accent,
              },
            },
            hover: {
              boxShadow: `inset 0px 0px 0px 1px ${hugoUIColorRoles.brand.accent}`,
              backgroundColor: alpha(hugoUIColorRoles.surface.tinted, 0.15),
            },
            focus: {
              backgroundColor: alpha(hugoUIColorRoles.surface.tinted, 0.15),
              boxShadow: `inset 0px 0px 0px 2px ${focusRing}`,
            },
            active: {
              boxShadow: `inset 0px 0px 0px 1px ${hugoUIColorRoles.brand.deep}`,
              backgroundColor: alpha(hugoUIColorRoles.brand.deep, 0.4),
              color: hugoUIColorRoles.brand.deep,
              '.HugoUILoading-loadingIcon': {
                color: hugoUIColorRoles.brand.deep,
              },
            },
            disabled: {
              boxShadow: 'none',
              backgroundColor: 'transparent',
              color: hugoUIColorRoles.text.disabled,
              '.HugoUILoading-loadingIcon': {
                color: hugoUIColorRoles.text.disabled,
              },
            },
          },
        },
        grey: {
          text: {
            basic: {
              color: hugoUIColors.NEUTRAL_GREY_1200,
              backgroundColor: 'transparent',
              '.HugoUILoading-loadingIcon': {
                color: hugoUIColors.NEUTRAL_GREY_1200,
              },
            },
            hover: {
              backgroundColor: BUTTON_BORDER_LIGHT,
              boxShadow: `inset 0px 0px 0px 1px ${hugoUIColors.NEUTRAL_GREY_1100}`,
            },
            focus: {
              boxShadow: 'none',
              backgroundColor: hugoUIColors.NEUTRAL_GREY_600,
              ...filledButtonFocusedSizes,
              ...getFilledButtonFocusVisibleStyle(focusRing),
            },
            active: {
              backgroundColor: BUTTON_BORDER_MID,
              boxShadow: `inset 0px 0px 0px 1px ${hugoUIColors.NEUTRAL_GREY_1200}`,
            },
            disabled: {
              boxShadow: 'none',
              backgroundColor: 'transparent',
              color: hugoUIColorRoles.text.disabled,
              '.HugoUILoading-loadingIcon': {
                color: hugoUIColorRoles.text.disabled,
              },
            },
          },
        },
      },
    },
    onDark: {
      primary: {
        white: {
          filled: {
            basic: {
              color: hugoUIColorRoles.brand.accent,
              backgroundColor: hugoUIColorRoles.surface.default,
              '.HugoUILoading-loadingIcon': {
                color: hugoUIColorRoles.brand.accent,
              },
            },
            hover: {
              backgroundColor: alpha(hugoUIColorRoles.surface.default, 0.8),
            },
            active: {
              backgroundColor: alpha(hugoUIColorRoles.surface.default, 0.6),
              color: hugoUIColorRoles.brand.deep,
              '.HugoUILoading-loadingIcon': {
                color: hugoUIColorRoles.brand.deep,
              },
            },
            focus: {
              backgroundColor: alpha(hugoUIColorRoles.surface.default, 0.8),
              ...filledButtonFocusedSizes,
              ...getFilledButtonFocusVisibleStyle(hugoUIColorRoles.text.inverse),
            },
            disabled: {
              opacity: 0.5,
              backgroundColor: BUTTON_BORDER_MID,
              color: hugoUIColorRoles.text.inverse,
              '.HugoUILoading-loadingIcon': {
                color: hugoUIColorRoles.text.inverse,
              },
            },
          },
        },
      },
      secondary: {
        white: {
          outlined: {
            basic: {
              boxShadow: `inset 0px 0px 0px 1px ${BUTTON_BORDER_LIGHT}`,
              color: hugoUIColorRoles.text.inverse,
              backgroundColor: 'transparent',
              '.HugoUILoading-loadingIcon': {
                color: hugoUIColorRoles.text.inverse,
              },
            },
            hover: {
              backgroundColor: alpha(hugoUIColorRoles.surface.tintedStrong, 0.2),
            },
            focus: {
              backgroundColor: alpha(hugoUIColorRoles.surface.tintedStrong, 0.2),
              boxShadow: `inset 0px 0px 0px 2px ${focusRingOnDark}`,
            },
            active: {
              backgroundColor: alpha(hugoUIColorRoles.brand.deep, 0.2),
            },
            disabled: {
              opacity: 0.5,
              backgroundColor: 'transparent',
              color: hugoUIColorRoles.text.inverse,
            },
          },
        },
      },
      tertiary: {
        white: {
          text: {
            basic: {
              color: hugoUIColorRoles.text.inverse,
              backgroundColor: 'transparent',
              '.HugoUILoading-loadingIcon': {
                color: hugoUIColorRoles.text.inverse,
              },
            },
            hover: {
              backgroundColor: alpha(hugoUIColorRoles.surface.tintedStrong, 0.2),
              boxShadow: `inset 0px 0px 0px 1px ${hugoUIColorRoles.text.inverse}`,
            },
            focus: {
              backgroundColor: alpha(hugoUIColorRoles.surface.tintedStrong, 0.2),
              boxShadow: `inset 0px 0px 0px 2px ${focusRingOnDark}`,
            },
            active: {
              backgroundColor: alpha(hugoUIColorRoles.surface.tinted, 0.35),
              boxShadow: `inset 0px 0px 0px 1px ${hugoUIColorRoles.text.inverse}`,
            },
            disabled: {
              boxShadow: 'none',
              opacity: 0.5,
              backgroundColor: 'transparent',
              color: hugoUIColorRoles.text.disabled,
              '.HugoUILoading-loadingIcon': {
                color: hugoUIColorRoles.text.disabled,
              },
            },
          },
        },
      },
    },
  };
};
