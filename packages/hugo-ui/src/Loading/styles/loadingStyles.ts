import { styled } from '@mui/system';
import type { Theme } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import { HugoUILoadingSize } from '../Loading';
import { createLoadingTokens, ROOT_PREFIX } from './loadingTokens';

interface CustomStyleProps {
  size: HugoUILoadingSize;
}

export const generateNumberSizeCss = (size: HugoUILoadingSize) => {
  if (typeof size === 'number') {
    return {
      [`&-${size}`]: {
        width: `${size}px`,
        height: `${size}px`,
      },
    };
  }
  return {};
};

export const StyledLoading = styled(CircularProgress)<CustomStyleProps>(({ theme, size }) => {
  const tokens = createLoadingTokens(theme as Theme);
  return {
    color: tokens.colors.text,
    [`&.${ROOT_PREFIX}`]: {
      '&-x-small': {
        width: '16px',
        height: '16px',
      },
      '&-small': {
        width: '24px',
        height: '24px',
      },
      '&-medium': {
        width: '48px',
        height: '48px',
      },
      '&-large': {
        width: '96px',
        height: '96px',
      },
      ...generateNumberSizeCss(size),
    },
  };
});
