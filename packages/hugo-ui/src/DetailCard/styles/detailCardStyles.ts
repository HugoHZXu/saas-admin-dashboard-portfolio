import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import { createDetailCardTokens, ROOT_PREFIX } from './detailCardTokens';

export const DetailCardRoot = styled(Card)(({ theme }) => {
  const tokens = createDetailCardTokens(theme as Theme);

  return {
    [`&.${ROOT_PREFIX}-root`]: {
      boxSizing: 'border-box',
      display: 'grid',
      gap: 14,
      minWidth: 0,
      padding: tokens.sizing.padding,
      border: `1px solid ${tokens.colors.border}`,
      borderRadius: tokens.sizing.radius,
      background: tokens.colors.surface,
      color: tokens.colors.text,
      boxShadow: tokens.shadows.default,
      transition: tokens.motion.transition,
    },

    [`&.${ROOT_PREFIX}-clickable`]: {
      cursor: 'pointer',
      outline: 'none',

      '@media (hover: hover)': {
        '&:hover': {
          borderColor: tokens.colors.borderHover,
          background: tokens.colors.surfaceHover,
          boxShadow: tokens.shadows.hover,
        },
      },

      '&:focus-visible': {
        borderColor: tokens.colors.borderHover,
        boxShadow: [
          tokens.shadows.default,
          `0 0 0 ${tokens.sizing.focusRingWidth}px ${tokens.colors.focusRing}`,
        ].join(', '),
      },
    },
  };
});
