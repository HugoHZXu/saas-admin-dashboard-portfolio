import { alpha, createTheme, styled } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/material/styles';

export const ROOT_PREFIX = 'HugoUIModal';
export const TITLE_ROOT_PREFIX = 'HugoUIModalTitle';
export const CONTENT_ROOT_PREFIX = 'HugoUIModalContent';
export const FOOTER_ROOT_PREFIX = 'HugoUIModalFooter';

export const createDialogTheme = (theme?: ThemeOptions) => {
  return createTheme({
    ...(theme || {}),
    components: {
      MuiDialog: {
        styleOverrides: {
          root: ({ theme }) => ({
            [`.${ROOT_PREFIX}-subtitle`]: {
              ...theme.hugoUITypography.subtitle1,
              margin: '0 0 16px 0',
            },
            [`&.${ROOT_PREFIX}-loading`]: {
              [`&:not(.${ROOT_PREFIX}-showLoadingIndicator)`]: {
                [`.${CONTENT_ROOT_PREFIX}-root`]: {
                  '& *': {
                    color: theme.hugoUIColors.NEUTRAL_DARK_GREY,
                  },
                },
                '&.MuiDialog-paperFullScreen': {
                  [`.${CONTENT_ROOT_PREFIX}-root`]: {
                    padding: '0 0 32px 0',
                  },
                },
              },
              [`&.${ROOT_PREFIX}-showLoadingIndicator`]: {
                [`.${CONTENT_ROOT_PREFIX}-root`]: {
                  display: 'flex',
                  justifyContent: 'center',
                  [`.${CONTENT_ROOT_PREFIX}-content`]: {
                    display: 'none',
                  },
                },
                '&.MuiDialog-paperFullScreen': {
                  [`.${CONTENT_ROOT_PREFIX}-root`]: {
                    alignItems: 'center',
                    padding: '0 0 32px 0',
                  },
                },
              },
            },
            [`&.${ROOT_PREFIX}-feedback`]: {
              '.MuiPaper-root': {
                ':not(.MuiDialog-paperFullScreen)': {
                  [`.${CONTENT_ROOT_PREFIX}-root`]: {
                    paddingTop: 32,
                    paddingRight: 76,
                    paddingBottom: 32,
                    paddingLeft: 68,
                  },
                  [`& .${TITLE_ROOT_PREFIX}-feedback`]: {
                    position: 'absolute',
                    top: 6,
                    right: 1,
                  },
                },
              },
            },
            [`&.${ROOT_PREFIX}-announcement`]: {
              '&> img': {
                width: '100%',
              },
              [`.${CONTENT_ROOT_PREFIX}-root`]: {
                paddingTop: 20,
              },
              '.MuiDialog-paperFullScreen': {
                [`.${CONTENT_ROOT_PREFIX}-root`]: {
                  paddingTop: 0,
                },
                '.HugoUIModal-subtitle': {
                  ...theme.hugoUITypography.h4,
                  marginBottom: 0,
                  minHeight: 32,
                  display: 'flex',
                  alignItems: 'center',
                  padding: '29px 0 21px',
                },
              },
            },
          }),
          paper: ({ theme }) => ({
            minWidth: 686,
            borderRadius: 8,
            maxHeight: 'calc(100% - 104px)',
            marginTop: 24,
            marginBottom: 24,
            ...theme.hugoUIShadows.MEDIUM_SHADOW,
            /** borderRadius is ipad ios compatibility, overflow: hidden on the parent can't clip the top layer */
            '.HugoUIModalTitle-root': {
              borderRadius: '8px 8px 0 0',
              [`&.${TITLE_ROOT_PREFIX}-feedback`]: {
                [`&.${TITLE_ROOT_PREFIX}-hasCloseBtn`]: {
                  padding: 0,
                },
              },
            },
            '.HugoUIModalFooter-root': {
              borderRadius: '0 0 8px 8px',
            },
          }),
          paperFullScreen: ({ theme }) => ({
            minWidth: '100%',
            maxHeight: '100%',
            margin: 0,
            borderRadius: 0,
            background: theme.hugoUIColors.NEUTRAL_WHITE,
            '.HugoUIModalTitle-root': {
              paddingLeft: 24,
              paddingRight: 24,
              [`&.${TITLE_ROOT_PREFIX}-hasCloseBtn`]: {
                paddingRight: 57,
                paddingLeft: 24,
                [`.${TITLE_ROOT_PREFIX}-close`]: {
                  right: 16,
                },
              },
              [`&.${TITLE_ROOT_PREFIX}-feedback-header`]: {
                [`&.${TITLE_ROOT_PREFIX}-hasCloseBtn`]: {
                  height: 82,
                },
              },
            },
            [`.${CONTENT_ROOT_PREFIX}-root`]: {
              flex: 1,
              background: theme.hugoUIColors.NEUTRAL_WHITE,
              padding: '0 24px 32px',
            },
            '.MuiDialogActions-root': {
              flexDirection: 'column',
              height: 'auto',
              padding: '16px 24px',
              flexFlow: 'column-reverse',
              paddingBottom: 'calc(16px + env(safe-area-inset-bottom))',
              '.HugoUILink': {
                margin: '8px 0',
              },
              '.HugoUIModalFooter-buttons': {
                display: 'flex',
                flexDirection: 'column',
                flexFlow: 'column-reverse',
                width: '100%',
                '> button': {
                  margin: '8px 0',
                },
              },
            },
          }),
        },
      },
      MuiDialogContent: {
        styleOverrides: {
          root: {
            padding: '0px 32px 32px',
          },
        },
      },
    },
  });
};

export const createDialogTitleTheme = (theme?: ThemeOptions) => {
  return createTheme({
    ...(theme || {}),
    components: {
      MuiDialogTitle: {
        styleOverrides: {
          root: ({ theme }) => ({
            position: 'relative',
            display: 'flex',
            padding: 0,
            boxSizing: 'content-box',
            wordBreak: 'break-word',
            background: theme.hugoUIColors.NEUTRAL_WHITE,
            ...theme.hugoUITypography.h4,
            color: theme.hugoUIColors.TEXT_HEADER,
            [`.${TITLE_ROOT_PREFIX}-title`]: {
              padding: '5px 0',
              margin: '24px 0 24px',
            },
            [`&.${TITLE_ROOT_PREFIX}-destructive`]: {
              color: theme.hugoUIColors.ERROR_OR_DESTRUCT,
            },
            [`&.${TITLE_ROOT_PREFIX}-warning`]: {
              color: theme.hugoUIColors.PURPLE_PLUM,
            },
            [`&.${TITLE_ROOT_PREFIX}-error`]: {
              [`.${TITLE_ROOT_PREFIX}-icon`]: {
                color: theme.hugoUIColors.ALERT,
              },
            },
            [`.${TITLE_ROOT_PREFIX}-icon`]: {
              fontSize: 40,
              marginRight: 16,
              width: 40,
              height: 40,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
            },
          }),
        },
      },
    },
  });
};

export const createDialogFooterTheme = (theme?: ThemeOptions) => {
  return createTheme({
    ...(theme || {}),
    components: {
      MuiDialogActions: {
        styleOverrides: {
          root: ({ theme }) => ({
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            height: 88,
            padding: '0 32px',
            background: theme.hugoUIColors.NEUTRAL_MID_GREY,
            [`.${FOOTER_ROOT_PREFIX}-buttons`]: {
              button: {
                marginLeft: 8,
              },
            },
            [`&.${FOOTER_ROOT_PREFIX}-tertiary-wrap`]: {
              justifyContent: 'space-between',
            },
          }),
        },
      },
    },
  });
};

export const StyledModalHeader = styled('div')(({ theme }) => ({
  padding: '0 32px',
  [`&.${TITLE_ROOT_PREFIX}-hasCloseBtn`]: {
    paddingRight: 65,
  },
  [`.${TITLE_ROOT_PREFIX}-close`]: {
    position: 'absolute',
    color: theme.hugoUIColors.TEXT,
    right: 24,
    top: 24,
    width: 40,
    height: 40,
    border: '1px solid transparent',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&.Mui-focusVisible': {
      border: '2px solid ' + theme.hugoUIColors.BLUE,
      padding: 6,
      '.MuiTouchRipple-root': {
        backgroundColor: theme.hugoUIColors.NEUTRAL_GREY_800,
        opacity: 0.2,
      },
    },
    '@media (hover: hover)': {
      '&:hover': {
        backgroundColor: alpha(theme.hugoUIColors.PURPLE_GRAPE, 0.1),
        border: `1px solid ${theme.hugoUIColors.MID_PURPLE}`,
      },
      '&:active': {
        backgroundColor: alpha(theme.hugoUIColors.PURPLE_GRAPE, 0.3),
        border: `1px solid ${theme.hugoUIColors.PURPLE_GRAPE}`,
      },
    },
  },
  [`&.${TITLE_ROOT_PREFIX}-feedback-header`]: {
    [`.${TITLE_ROOT_PREFIX}-close`]: {
      right: 20,
    },
  },
}));
