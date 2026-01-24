import { styled } from '@mui/system';
import {
  BLUE,
  ERROR_OR_DESTRUCT,
  ERROR_BG,
  NEUTRAL_LIGHT_GREY,
  SUCCESS_GREEN_BG,
  SUCCESS_GREEN,
  TEXT,
  TEXT_HEADER,
  TYPOGRAPHY_BODY,
  TYPOGRAPHY_SUBTITLE_01,
} from '../styles/theme';

export const ROOT_PREFIX = 'HugoUIMessage';

export const StyledMessage = styled('div')({
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
        ...TYPOGRAPHY_SUBTITLE_01,
        color: `${TEXT} !important`,
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
          ...TYPOGRAPHY_BODY,
        },
      },
      [`.${ROOT_PREFIX}-header`]: {
        '.HugoUIStatusIcon-text': {
          ...TYPOGRAPHY_SUBTITLE_01,
          color: `${TEXT_HEADER} !important`,
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
        ...TYPOGRAPHY_BODY,
      },
      '.HugoUIStatusIcon-icon': {
        width: 24,
        height: 24,
        '& svg': {
          width: 24,
          height: 24,
          fontSize: 24,
          color: TEXT,
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
          ...TYPOGRAPHY_BODY,
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
          color: TEXT,
          fontSize: 16,
          width: 16,
          height: 16,
          border: '2px solid transparent',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
        },
        ':focus-visible > .icon-close': {
          borderColor: BLUE,
        },
      },
    },
    '&-center': {
      justifyContent: 'center',
    },
    '&-error': {
      backgroundColor: ERROR_BG,
      '.HugoUIStatusIcon-icon svg': {
        color: ERROR_OR_DESTRUCT,
      },
    },
    '&-success': {
      backgroundColor: SUCCESS_GREEN_BG,
      '.HugoUIStatusIcon-icon svg': {
        color: SUCCESS_GREEN,
      },
    },
    '&-alert': {
      backgroundColor: ERROR_BG,
      '.HugoUIStatusIcon-icon svg': {
        color: ERROR_OR_DESTRUCT,
      },
    },
    '&-destructiveSuccess': {
      backgroundColor: NEUTRAL_LIGHT_GREY,
      '.HugoUIStatusIcon-icon svg': {
        color: SUCCESS_GREEN,
      },
    },
  },
});
