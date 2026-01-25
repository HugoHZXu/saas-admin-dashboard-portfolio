import { styled } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import { createMessageTokens, ROOT_PREFIX } from './messageTokens';

export const StyledMessage = styled('div')(({ theme }) => {
  const tokens = createMessageTokens(theme as Theme);
  return {
    display: 'flex',
    alignItems: 'center',
    padding: 24,
    borderRadius: 4,
    [`&.${ROOT_PREFIX}`]: {
      '&-root': {
        '.HugoUIStatusIcon': {
          display: 'flex',
          alignItems: 'center',
        },
        '.HugoUIStatusIcon-icon': {
          flex: '0 0 auto',
        },
        '.HugoUIStatusIcon-text': {
          flex: '1 1 auto',
          ...theme.hugoUITypography.subtitle1,
          color: `${tokens.colors.textDefault} !important`,
        },
        '.HugoUIStatusIcon.HugoUIMessage-header .HugoUIStatusIcon-icon': {
          width: 42,
          height: 42,
          '& svg': {
            width: 42,
            height: 42,
            fontSize: 42,
          },
        },
        [`&.${ROOT_PREFIX}-hasExtraText`]: {
          flexDirection: 'column',
          alignItems: 'flex-start',
          [`.${ROOT_PREFIX}-extraText`]: {
            ...theme.hugoUITypography.body,
          },
        },
        [`.${ROOT_PREFIX}-header`]: {
          '.HugoUIStatusIcon-text': {
            ...theme.hugoUITypography.subtitle1,
            color: `${tokens.colors.textPrimary} !important`,
          },
        },
      },
      '&-large': {
        paddingLeft: 32,
        paddingRight: 32,
        paddingTop: 40,
        paddingBottom: 40,
        [`&.${ROOT_PREFIX}-hasExtraText`]: {
          paddingTop: 32,
          [`.${ROOT_PREFIX}-extraText`]: {
            paddingLeft: 50,
          },
        },
      },
      '&-medium': {
        '.HugoUIStatusIcon': {
          alignItems: 'flex-start',
        },
        '.HugoUIStatusIcon-text': {
          ...theme.hugoUITypography.body,
        },
        '.HugoUIStatusIcon-icon': {
          width: 24,
          height: 24,
          '& svg': {
            width: 24,
            height: 24,
            fontSize: 24,
            color: tokens.colors.textDefault,
          },
        },
        [`&.${ROOT_PREFIX}-hasExtraText`]: {
          '.HugoUIStatusIcon.HugoUIMessage-header .HugoUIStatusIcon-icon': {
            width: 24,
            height: 24,
            '& svg': {
              width: 24,
              height: 24,
              fontSize: 24,
            },
          },
          '.HugoUIStatusIcon-text': {
            ...theme.hugoUITypography.body,
          },
          [`& .${ROOT_PREFIX}-extraText`]: {
            paddingLeft: 28,
          },
        },
      },
      '&-inline': {
        paddingTop: 16,
        paddingBottom: 16,
      },
      '&-hasClose': {
        position: 'relative',
        paddingRight: 24,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        [`& .${ROOT_PREFIX}-close`]: {
          cursor: 'pointer',
          width: 24,
          height: 24,
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          '& .icon-close': {
            color: tokens.colors.textDefault,
            fontSize: 16,
            width: 16,
            height: 16,
            border: '2px solid transparent',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
          },
          ':focus-visible > .icon-close': {
            borderColor: tokens.colors.focusRing,
          },
        },
      },
      '&-center': {
        justifyContent: 'center',
      },
      '&-error': {
        backgroundColor: tokens.colors.errorBg,
        '.HugoUIStatusIcon-icon svg': {
          color: tokens.colors.error,
        },
      },
      '&-success': {
        backgroundColor: tokens.colors.successBg,
        '.HugoUIStatusIcon-icon svg': {
          color: tokens.colors.success,
        },
      },
      '&-alert': {
        backgroundColor: tokens.colors.errorBg,
        '.HugoUIStatusIcon-icon svg': {
          color: tokens.colors.error,
        },
      },
      '&-destructiveSuccess': {
        backgroundColor: tokens.colors.destructiveBg,
        '.HugoUIStatusIcon-icon svg': {
          color: tokens.colors.success,
        },
      },
    },
  };
});
