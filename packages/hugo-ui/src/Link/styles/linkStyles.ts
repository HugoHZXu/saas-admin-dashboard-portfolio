import { styled } from '@mui/system';
import type { Theme } from '@mui/material/styles';
import { TYPOGRAPHY_BODY_LINK, TYPOGRAPHY_SMALL_TEXT_LINK } from '../../styles/typography';
import { createLinkTokens, HugoUILinkMode } from './linkTokens';

interface StyledLinkProps {
  mode: HugoUILinkMode;
}

const LinkBaseStyle = (theme: Theme, mode: HugoUILinkMode) => {
  const colors = createLinkTokens(theme).colors[mode];
  return {
    '&:focus-visible': {
      padding: '0 3px',
      marginLeft: -3,
      marginRight: -3,
      outlineStyle: 'solid',
      outlineWidth: 2,
      outlineOffset: -3,
      outlineColor: colors.focus,
    },
    '&:hover': {
      color: colors.hover,
    },
    '&:visited': {
      color: colors.visited,
      '&:hover': {
        color: colors.hover,
      },
    },
    '&-small': {
      ...TYPOGRAPHY_SMALL_TEXT_LINK,
      color: colors.normal,
    },
    '&-loading': {
      textDecoration: 'none',
      color: colors.loading,
      cursor: 'default',
      display: 'inline-flex',
      lineHeight: '24px',
      '&:focus-visible': {
        outline: 'none',
      },
      '&:visited': {
        color: colors.loading,
      },
      '&:hover': {
        color: colors.loading,
      },
      '.HugoUILink-HugoUILoading-loadingIcon': {
        color: colors.loading,
        marginRight: 8,
      },
    },
    '&-disabled': {
      color: colors.disabled,
      cursor: 'not-allowed',
      '&:focus-visible': {
        outline: 'none',
      },
      '&:visited': {
        color: colors.disabled,
      },
      '&:hover': {
        color: colors.disabled,
      },
      '.HugoUILink-HugoUILoading-loadingIcon': {
        color: colors.disabled,
      },
    },
  };
};

export const StyledLink = styled('a')<StyledLinkProps>(({ theme, mode }) => {
  const colors = createLinkTokens(theme as Theme).colors[mode];
  return {
    '&.HugoUILink': {
      ...TYPOGRAPHY_BODY_LINK,
      display: 'inline-block',
      color: colors.normal,
      width: 'fit-content',
      ...LinkBaseStyle(theme as Theme, mode),
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
  };
});

export const StyledLinkButton = styled('span')<StyledLinkProps>(({ theme, mode = 'white' }) => {
  const colors = createLinkTokens(theme as Theme).colors[mode];
  return {
    '&.HugoUIButtonLink': {
      ...TYPOGRAPHY_BODY_LINK,
      display: 'inline-flex',
      width: 'fit-content',
      textDecoration: 'none',
      color: colors.normal,
      alignItems: 'center',
      ...LinkBaseStyle(theme as Theme, mode),
      '.HugoUIButtonLink-icon': {
        display: 'inline-flex',
        alignItems: 'center',
        fontSize: 24,
        marginRight: 4,
        lineHeight: 0,
        svg: {
          fontSize: '24px',
        },
      },
      '&:hover': {
        color: colors.hover,
        '.HugoUIButtonLink-icon': {
          color: colors.hover,
        },
      },
      '&-disabled': {
        ...LinkBaseStyle(theme as Theme, mode)['&-disabled'],
        'span.HugoUIButtonLink-icon': {
          color: colors.disabled,
        },
        '&:hover': {
          color: colors.disabled,
          '.HugoUIButtonLink-icon': {
            color: colors.disabled,
          },
        },
      },
    },
  };
});
