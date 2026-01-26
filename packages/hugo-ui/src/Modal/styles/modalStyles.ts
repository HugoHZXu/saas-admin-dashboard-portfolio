import { alpha, createTheme, styled } from '@mui/material/styles';
import type { Theme, ThemeOptions } from '@mui/material/styles';
import {
  CONTENT_ROOT_PREFIX,
  createModalTokens,
  FOOTER_ROOT_PREFIX,
  ROOT_PREFIX,
  TITLE_ROOT_PREFIX,
} from './modalTokens';

export const createDialogThemeOverrides = (): ThemeOptions => ({
  components: {
    MuiDialog: {
      styleOverrides: {
        root: ({ theme }) => {
          const tokens = createModalTokens(theme as Theme);
          return {
            [`.${ROOT_PREFIX}-subtitle`]: {
              ...theme.hugoUITypography.subtitle1,
              margin: '0 0 16px 0',
            },
            [`&.${ROOT_PREFIX}-loading`]: {
              [`&:not(.${ROOT_PREFIX}-showLoadingIndicator)`]: {
                [`.${CONTENT_ROOT_PREFIX}-root`]: {
                  '& *': {
                    color: tokens.colors.textDisabled,
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
          };
        },
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
        paperFullScreen: ({ theme }) => {
          const tokens = createModalTokens(theme as Theme);
          return {
            minWidth: '100%',
            maxHeight: '100%',
            margin: 0,
            borderRadius: 0,
            background: tokens.colors.surface,
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
              background: tokens.colors.surface,
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
          };
        },
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

export const createDialogTheme = (parentTheme: Theme) =>
  createTheme(parentTheme, createDialogThemeOverrides());

export const createDialogTitleThemeOverrides = (): ThemeOptions => ({
  components: {
    MuiDialogTitle: {
      styleOverrides: {
        root: ({ theme }) => {
          const tokens = createModalTokens(theme as Theme);
          return {
            position: 'relative',
            display: 'flex',
            padding: 0,
            boxSizing: 'content-box',
            wordBreak: 'break-word',
            background: tokens.colors.surface,
            ...theme.hugoUITypography.h4,
            color: tokens.colors.textPrimary,
            [`.${TITLE_ROOT_PREFIX}-title`]: {
              padding: '5px 0',
              margin: '24px 0 24px',
            },
            [`&.${TITLE_ROOT_PREFIX}-destructive`]: {
              color: tokens.colors.error,
            },
            [`&.${TITLE_ROOT_PREFIX}-warning`]: {
              color: tokens.colors.warning,
            },
            [`&.${TITLE_ROOT_PREFIX}-error`]: {
              [`.${TITLE_ROOT_PREFIX}-icon`]: {
                color: tokens.colors.alert,
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
          };
        },
      },
    },
  },
});

export const createDialogTitleTheme = (parentTheme: Theme) =>
  createTheme(parentTheme, createDialogTitleThemeOverrides());

export const createDialogFooterThemeOverrides = (): ThemeOptions => ({
  components: {
    MuiDialogActions: {
      styleOverrides: {
        root: ({ theme }) => {
          const tokens = createModalTokens(theme as Theme);
          return {
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            height: 88,
            padding: '0 32px',
            background: tokens.colors.footerBg,
            [`.${FOOTER_ROOT_PREFIX}-buttons`]: {
              button: {
                marginLeft: 8,
              },
            },
            [`&.${FOOTER_ROOT_PREFIX}-tertiary-wrap`]: {
              justifyContent: 'space-between',
            },
          };
        },
      },
    },
  },
});

export const createDialogFooterTheme = (parentTheme: Theme) =>
  createTheme(parentTheme, createDialogFooterThemeOverrides());

export const StyledModalHeader = styled('div')(({ theme }) => {
  const tokens = createModalTokens(theme as Theme);
  return {
    padding: '0 32px',
    [`&.${TITLE_ROOT_PREFIX}-hasCloseBtn`]: {
      paddingRight: 65,
    },
    [`.${TITLE_ROOT_PREFIX}-close`]: {
      position: 'absolute',
      color: tokens.colors.textDefault,
      right: 24,
      top: 24,
      width: 40,
      height: 40,
      border: '1px solid transparent',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      '&.Mui-focusVisible': {
        border: `2px solid ${tokens.colors.focusRing}`,
        padding: 6,
        '.MuiTouchRipple-root': {
          backgroundColor: theme.hugoUIColors.NEUTRAL_GREY_800,
          opacity: 0.2,
        },
      },
      '@media (hover: hover)': {
        '&:hover': {
          backgroundColor: alpha(tokens.colors.accent, 0.1),
          border: `1px solid ${tokens.colors.accentMid}`,
        },
        '&:active': {
          backgroundColor: alpha(tokens.colors.accent, 0.3),
          border: `1px solid ${tokens.colors.accent}`,
        },
      },
    },
    [`&.${TITLE_ROOT_PREFIX}-feedback-header`]: {
      [`.${TITLE_ROOT_PREFIX}-close`]: {
        right: 20,
      },
    },
  };
});
