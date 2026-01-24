import { styled } from '@mui/system';
import CircularProgress from '@mui/material/CircularProgress';
import { TEXT } from '../styles/color';
import { HugoUILoadingSize } from './Loading';

export const ROOT_PREFIX = 'HugoUILoading';

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

export const StyledLoading = styled(CircularProgress)<CustomStyleProps>(
  ({ size }: { size: HugoUILoadingSize }) => ({
    color: TEXT,
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
  })
);
