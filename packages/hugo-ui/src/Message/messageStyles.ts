import { styled } from '@mui/material/styles';

export const ROOT_PREFIX = 'HugoUIMessage';

export const StyledMessage = styled('div')(({ theme }) => ({
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
        color: `${theme.hugoUIColors.TEXT} !important`,
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
          color: `${theme.hugoUIColors.TEXT_HEADER} !important`,
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
          color: theme.hugoUIColors.TEXT,
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
          color: theme.hugoUIColors.TEXT,
          fontSize: 16,
          width: 16,
          height: 16,
          border: '2px solid transparent',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
        },
        ':focus-visible > .icon-close': {
          borderColor: theme.hugoUIColors.BLUE,
        },
      },
    },
    '&-center': {
      justifyContent: 'center',
    },
    '&-error': {
      backgroundColor: theme.hugoUIColors.ERROR_BG,
      '.HugoUIStatusIcon-icon svg': {
        color: theme.hugoUIColors.ERROR_OR_DESTRUCT,
      },
    },
    '&-success': {
      backgroundColor: theme.hugoUIColors.SUCCESS_GREEN_BG,
      '.HugoUIStatusIcon-icon svg': {
        color: theme.hugoUIColors.SUCCESS_GREEN,
      },
    },
    '&-alert': {
      backgroundColor: theme.hugoUIColors.ERROR_BG,
      '.HugoUIStatusIcon-icon svg': {
        color: theme.hugoUIColors.ERROR_OR_DESTRUCT,
      },
    },
    '&-destructiveSuccess': {
      backgroundColor: theme.hugoUIColors.NEUTRAL_LIGHT_GREY,
      '.HugoUIStatusIcon-icon svg': {
        color: theme.hugoUIColors.SUCCESS_GREEN,
      },
    },
  },
}));
