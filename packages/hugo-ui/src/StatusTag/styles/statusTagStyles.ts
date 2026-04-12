import { styled } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import { createStatusTagTokens, HugoUIStatusTagTone, ROOT_PREFIX } from './statusTagTokens';

const tones: HugoUIStatusTagTone[] = ['success', 'warning', 'neutral', 'danger', 'info'];

export const StyledStatusTag = styled('span')(({ theme }) => {
  const tokens = createStatusTagTokens(theme as Theme);
  return {
    ...theme.hugoUITypography.button.small,
    alignItems: 'center',
    borderRadius: tokens.sizing.borderRadius,
    boxSizing: 'border-box',
    display: 'inline-flex',
    minHeight: tokens.sizing.minHeight,
    padding: `${tokens.sizing.paddingY}px ${tokens.sizing.paddingX}px`,
    verticalAlign: 'middle',
    whiteSpace: 'nowrap',
    [`&.${ROOT_PREFIX}-root`]: {
      color: tokens.colors.neutral.text,
      background: tokens.colors.neutral.background,
    },
    ...tones.reduce(
      (styles, tone) => ({
        ...styles,
        [`&.${ROOT_PREFIX}-${tone}`]: {
          color: tokens.colors[tone].text,
          background: tokens.colors[tone].background,
        },
      }),
      {}
    ),
  };
});
