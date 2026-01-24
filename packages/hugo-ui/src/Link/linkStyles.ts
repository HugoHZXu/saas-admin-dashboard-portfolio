import { styled } from '@mui/system';
import {
  BLUE,
  DARK_PURPLE,
  LIGHT_PURPLE,
  NEUTRAL_DARK_GREY,
  NEUTRAL_LIGHT_PLUM,
  NEUTRAL_WHITE,
  PURPLE_GRAPE,
  TEXT,
  ERROR_OR_DESTRUCT,
  DESTRUCT_STATE_1,
  DESTRUCT_STATE_2,
} from '../styles/color';
import { TYPOGRAPHY_BODY_LINK, TYPOGRAPHY_SMALL_TEXT_LINK } from '../styles/typography';

interface StyledLinkProps {
  mode: 'white' | 'light' | 'dark' | 'error';
}

const COLOR_MAP = {
  white: {
    normal: BLUE,
    hover: DARK_PURPLE,
    visited: PURPLE_GRAPE,
    disabled: NEUTRAL_DARK_GREY,
    focus: BLUE,
    loading: TEXT,
  },
  light: {
    normal: TEXT,
    hover: DARK_PURPLE,
    visited: PURPLE_GRAPE,
    disabled: NEUTRAL_DARK_GREY,
    focus: BLUE,
    loading: TEXT,
  },
  dark: {
    normal: NEUTRAL_WHITE,
    hover: NEUTRAL_LIGHT_PLUM,
    visited: LIGHT_PURPLE,
    disabled: DARK_PURPLE,
    focus: NEUTRAL_WHITE,
    loading: NEUTRAL_WHITE,
  },
  error: {
    normal: ERROR_OR_DESTRUCT,
    hover: DESTRUCT_STATE_2,
    visited: DESTRUCT_STATE_1,
    disabled: NEUTRAL_DARK_GREY,
    focus: BLUE,
    loading: TEXT,
  },
};

const LinkBaseStyle = ({ mode }: StyledLinkProps) => ({
  '&:focus-visible': {
    padding: '0 3px',
    marginLeft: -3,
    marginRight: -3,
    outlineStyle: 'solid',
    outlineWidth: 2,
    outlineOffset: -3,
    outlineColor: COLOR_MAP[mode].focus,
  },
  '&:hover': {
    color: COLOR_MAP[mode].hover,
  },
  '&:visited': {
    color: COLOR_MAP[mode].visited,
    '&:hover': {
      color: COLOR_MAP[mode].hover,
    },
  },
  '&-small': {
    ...TYPOGRAPHY_SMALL_TEXT_LINK,
    color: COLOR_MAP[mode].normal,
  },
  '&-loading': {
    textDecoration: 'none',
    color: COLOR_MAP[mode].loading,
    cursor: 'default',
    display: 'inline-flex',
    lineHeight: '24px',
    '&:focus-visible': {
      outline: 'none',
    },
    '&:visited': {
      color: COLOR_MAP[mode].loading,
    },
    '&:hover': {
      color: COLOR_MAP[mode].loading,
    },
    '.HugoUILink-loading-icon': {
      color: COLOR_MAP[mode].loading,
      marginRight: 8,
    },
  },
  '&-disabled': {
    color: COLOR_MAP[mode].disabled,
    cursor: 'not-allowed',
    '&:focus-visible': {
      outline: 'none',
    },
    '&:visited': {
      color: COLOR_MAP[mode].disabled,
    },
    '&:hover': {
      color: COLOR_MAP[mode].disabled,
    },
    '.HugoUILink-loading-icon': {
      color: COLOR_MAP[mode].disabled,
    },
  },
});

export const StyledLink = styled('a')<StyledLinkProps>(({ mode }) => ({
  '&.HugoUILink': {
    ...TYPOGRAPHY_BODY_LINK,
    display: 'inline-block',
    color: COLOR_MAP[mode].normal,
    width: 'fit-content',
    ...LinkBaseStyle({ mode }),
    '&-button': {
      position: 'relative',
      WebkitTapHighlightColor: 'transparent',
      backgroundColor: 'transparent', // Reset default value
      // We disable the focus ring for mouse, touch and keyboard users.
      outline: 0,
      border: 0,
      margin: 0, // Remove the margin in Safari
      borderRadius: 0,
      padding: 0, // Remove the padding in Firefox
      cursor: 'pointer',
      MozAppearance: 'none', // Reset
      WebkitAppearance: 'none', // Reset
      '&::-moz-focus-inner': {
        borderStyle: 'none', // Remove Firefox dotted outline.
      },
    },
  },
}));

export const StyledLinkButton = styled('span')(({ mode = 'white' }: StyledLinkProps) => ({
  '&.HugoUIButtonLink': {
    ...TYPOGRAPHY_BODY_LINK,
    display: 'inline-flex',
    width: 'fit-content',
    textDecoration: 'none',
    color: COLOR_MAP[mode].normal,
    alignItems: 'center',
    ...LinkBaseStyle({ mode }),
    '.HugoUIButtonLink-icon': {
      fontSize: 24,
      marginRight: 4,
    },
    '&:hover': {
      color: COLOR_MAP[mode].hover,
      '.HugoUIButtonLink-icon': {
        color: COLOR_MAP[mode].hover,
      },
    },
    '&-disabled': {
      ...LinkBaseStyle({ mode })['&-disabled'],
      'span.HugoUIButtonLink-icon': {
        color: COLOR_MAP[mode].disabled,
      },
      '&:hover': {
        color: COLOR_MAP[mode].disabled,
        '.HugoUIButtonLink-icon': {
          color: COLOR_MAP[mode].disabled,
        },
      },
    },
  },
}));
