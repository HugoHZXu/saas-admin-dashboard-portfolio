import { styled } from '@mui/material/styles';
import { createSearchBoxTokens, SEARCH_BOX_ROOT_PREFIX } from './searchBoxTokens';

export const SearchBoxRoot = styled('div')(({ theme }) => {
  const tokens = createSearchBoxTokens(theme);

  return {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: tokens.sizing.height,
    border: `1px solid ${tokens.colors.borderDefault}`,
    borderRadius: tokens.sizing.radius,
    background: tokens.colors.surfaceDefault,
    color: tokens.colors.textDefault,
    overflow: 'hidden',

    '&:hover': {
      borderColor: tokens.colors.borderStrong,
    },

    '&:focus-within': {
      borderColor: tokens.colors.focusRing,
      outline: `${tokens.sizing.focusRingWidth}px solid ${tokens.colors.focusRing}`,
      outlineOffset: 1,
    },

    [`&.${SEARCH_BOX_ROOT_PREFIX}-disabled`]: {
      background: tokens.colors.surfaceMuted,
      color: tokens.colors.textSubtle,
      pointerEvents: 'none',
    },

    [`.${SEARCH_BOX_ROOT_PREFIX}-input`]: {
      flex: '1 1 auto',
      minWidth: 0,
      height: '100%',
      padding: `0 ${tokens.spacing.inputPaddingRight}px 0 ${tokens.spacing.inputPaddingLeft}px`,
      border: 0,
      outline: 0,
      background: 'transparent',
      color: 'inherit',
      ...tokens.typography.input,

      '&::placeholder': {
        color: tokens.colors.textSubtle,
        opacity: 1,
      },

      '&:disabled': {
        WebkitTextFillColor: tokens.colors.textSubtle,
      },
    },

    [`.${SEARCH_BOX_ROOT_PREFIX}-button`]: {
      display: 'grid',
      placeItems: 'center',
      flex: `0 0 ${tokens.sizing.actionWidth}px`,
      width: tokens.sizing.actionWidth,
      height: '100%',
      minWidth: 0,
      padding: tokens.spacing.buttonPadding,
      border: 0,
      borderLeft: `1px solid ${tokens.colors.borderDefault}`,
      borderRadius: 0,
      background: 'transparent',
      color: tokens.colors.textSubtle,
      cursor: 'pointer',

      '& svg': {
        fontSize: tokens.sizing.iconSize,
      },

      '&:hover': {
        background: tokens.colors.hover,
        color: tokens.colors.textPrimary,
      },

      '&:focus-visible': {
        outline: `${tokens.sizing.focusRingWidth}px solid ${tokens.colors.focusRing}`,
        outlineOffset: -tokens.sizing.focusRingWidth,
      },

      '&:disabled': {
        color: tokens.colors.textSubtle,
        cursor: 'default',
        opacity: 0.55,
      },
    },

    [`.${SEARCH_BOX_ROOT_PREFIX}-clearButton`]: {
      flexBasis: 34,
      width: 34,
      borderLeft: 0,
    },

    [`.${SEARCH_BOX_ROOT_PREFIX}-searchButtonActive`]: {
      background: tokens.colors.action,
      color: tokens.colors.textInverse,

      '&:hover': {
        background: tokens.colors.action,
        color: tokens.colors.textInverse,
      },
    },

    [`.${SEARCH_BOX_ROOT_PREFIX}-loadingIndicator`]: {
      display: 'grid',
      placeItems: 'center',
      flex: `0 0 ${tokens.sizing.actionWidth}px`,
      width: tokens.sizing.actionWidth,
      height: '100%',
      borderLeft: `1px solid ${tokens.colors.borderDefault}`,
      background: tokens.colors.action,
      color: tokens.colors.textInverse,
    },
  };
});
