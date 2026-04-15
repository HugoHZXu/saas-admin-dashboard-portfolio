import { styled } from '@mui/material/styles';
import { createToggleTokens, TOGGLE_ROOT_PREFIX } from './toggleTokens';

export const ToggleRoot = styled('div')(({ theme }) => {
  const tokens = createToggleTokens(theme);

  return {
    display: 'inline-flex',
    alignItems: 'center',
    gap: tokens.spacing.rootPadding,
    padding: tokens.spacing.rootPadding,
    border: `1px solid ${tokens.colors.borderDefault}`,
    borderRadius: tokens.sizing.rootRadius,
    background: tokens.colors.surfaceMuted,
    color: tokens.colors.textDefault,

    [`.${TOGGLE_ROOT_PREFIX}-item`]: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: tokens.spacing.itemGap,
      minHeight: tokens.sizing.minHeight - tokens.spacing.rootPadding * 2,
      padding: `0 ${tokens.spacing.itemPaddingX}px`,
      border: 0,
      borderRadius: tokens.sizing.itemRadius,
      background: 'transparent',
      color: tokens.colors.textSubtle,
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      ...tokens.typography.item,

      '& svg': {
        fontSize: tokens.sizing.iconSize,
      },

      '&:hover': {
        background: tokens.colors.hoverSurface,
        color: tokens.colors.textPrimary,
      },

      '&:focus-visible': {
        outline: `${tokens.sizing.focusRingWidth}px solid ${tokens.colors.focusRing}`,
        outlineOffset: 0,
      },

      '&:disabled': {
        color: tokens.colors.textSubtle,
        cursor: 'default',
        opacity: 0.55,
      },
    },

    [`.${TOGGLE_ROOT_PREFIX}-itemSelected`]: {
      background: tokens.colors.surfaceDefault,
      color: tokens.colors.textPrimary,
      boxShadow: theme.hugoUIShadows.LIGHT_SHADOW.boxShadow,

      '&:hover': {
        background: tokens.colors.surfaceDefault,
        color: tokens.colors.textPrimary,
      },
    },
  };
});
