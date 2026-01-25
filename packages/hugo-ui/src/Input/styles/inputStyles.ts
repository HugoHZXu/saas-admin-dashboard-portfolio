import { createTheme, styled, ThemeOptions } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import { AUTOFILL_SHADOW, getBorderTokens, INPUT_LABEL_SHRINK_FACTOR } from './inputTokens';

export const createInputThemeOverrides = (): ThemeOptions => ({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => {
          const { BASIC_BORDER, SUCCESS_BORDER, ERROR_BORDER, DISABLED_BORDER, FOCUS_SHADOW } =
            getBorderTokens(theme);
          return {
            // the following seems to fix a bug in Safari
            //  where it fails to show the notch in the outline sometimes
            legend: {
              overflow: 'visible',
            },
            '.MuiOutlinedInput-notchedOutline': {
              border: BASIC_BORDER,
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              border: BASIC_BORDER,
            },
            fontFamily: theme.hugoUITypography.body.fontFamily,
            input: {
              ...theme.hugoUITypography.subtitle2,
              color: theme.hugoUIColorRoles.text.default,
              opacity: 0.76,
              '&.Mui-disabled': {
                WebkitTextFillColor: theme.hugoUIColorRoles.text.disabled,
              },
              height: 24,
              padding: '12px 16px 12px 16px',
              '&:-webkit-autofill': {
                WebkitBoxShadow: AUTOFILL_SHADOW,
              },
              '&:-webkit-autofill:hover': {
                WebkitBoxShadow: AUTOFILL_SHADOW,
              },
              '&:-webkit-autofill:focus': {
                WebkitBoxShadow: AUTOFILL_SHADOW,
              },
              '&:-webkit-autofill:active': {
                WebkitBoxShadow: AUTOFILL_SHADOW,
              },
              '&::placeholder': {
                color: theme.hugoUIColorRoles.text.default,
                opacity: 0.76,
              },
            },
            '&.HugoUIInput-hasInput': {
              color: theme.hugoUIColorRoles.text.primary,
            },
            '&.MuiInputBase-multiline': {
              ...theme.hugoUITypography.subtitle2,
              color: theme.hugoUIColorRoles.text.primary,
              padding: '12px 16px 12px 16px',
            },
            textarea: {
              color: theme.hugoUIColorRoles.text.default,
              opacity: 0.76,
              '&.Mui-disabled': {
                WebkitTextFillColor: theme.hugoUIColorRoles.text.disabled,
              },
              '&:-webkit-autofill': {
                WebkitBoxShadow: AUTOFILL_SHADOW,
              },
              '&:-webkit-autofill:hover': {
                WebkitBoxShadow: AUTOFILL_SHADOW,
              },
              '&:-webkit-autofill:focus': {
                WebkitBoxShadow: AUTOFILL_SHADOW,
              },
              '&:-webkit-autofill:active': {
                WebkitBoxShadow: AUTOFILL_SHADOW,
              },
            },
            '&.MuiInputBase-adornedEnd': {
              paddingRight: 12,
            },
            '[class^="icon-visibility"]': {
              cursor: 'pointer',
              color: theme.hugoUIColorRoles.text.default,
              outline: 'none',
              borderRadius: 0,
              '&:focus-visible': {
                boxShadow: FOCUS_SHADOW,
              },
            },
            // success
            '&.MuiInputBase-colorSuccess': {
              '.MuiOutlinedInput-notchedOutline': {
                border: SUCCESS_BORDER,
              },
            },
            // error
            '&.MuiInputBase-colorError': {
              '.MuiOutlinedInput-notchedOutline': {
                border: ERROR_BORDER,
              },
            },
            // disabled
            '&.Mui-disabled': {
              '.MuiOutlinedInput-notchedOutline': {
                border: DISABLED_BORDER,
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                border: DISABLED_BORDER,
              },
              '[class^="icon-"]': {
                pointerEvents: 'none',
                color: theme.hugoUIColorRoles.text.disabled,
              },
            },
          };
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: ({ theme }) => ({
          '&.HugoUIInput-hasLabel': {
            marginTop: 7, // space for label
          },
          '&.HugoUIInput-hasInput': {
            input: {
              color: theme.hugoUIColorRoles.text.primary,
              opacity: 1,
            },
            textArea: {
              color: theme.hugoUIColorRoles.text.primary,
              opacity: 1,
            },
          },
          '&.HugoUIInput-endAdornment .MuiFormLabel-root': {
            maxWidth: 'calc(100% - 56px)',
          },
          '&.HugoUIInput-endAdornment .MuiFormLabel-root.MuiInputLabel-shrink': {
            maxWidth: 'calc(133% - 24px)',
          },
        }),
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          ...theme.hugoUITypography.subtitle2,
          transform: 'translate(16px, 12px) scale(1)',
          '&.MuiInputLabel-shrink': {
            ...theme.hugoUITypography.subtitle2,
            // the real size should zoom in with INPUT_LABEL_SHRINK_FACTOR to match design
            lineHeight: `${20 / INPUT_LABEL_SHRINK_FACTOR}px`,
            transform: `translate(15px, -7px) scale(${INPUT_LABEL_SHRINK_FACTOR})`,
            '.HugoUIInput-label-requiredPostfix': {
              paddingTop: 5,
            },
          },
          '&:not(&.MuiInputLabel-shrink):not(&.Mui-disabled)': {
            color: theme.hugoUIColorRoles.text.default,
          },
          '&.Mui-disabled': {
            color: theme.hugoUIColorRoles.text.disabled,
          },
          '&.HugoUIInput-label-required': {
            display: 'flex',
          },
          '.HugoUIInput-label-requiredPostfix': {
            color: theme.hugoUIColorRoles.status.error,
            lineHeight: '14px',
            paddingTop: 4,
          },
        }),
      },
    },
    MuiFormHelperText: {
      defaultProps: {
        component: 'div',
      },
      styleOverrides: {
        root: ({ theme }) => ({
          ...theme.hugoUITypography.smallText.base,
          marginTop: 4,
          marginLeft: 16,
          marginRight: 8,
          '.HugoUIInput-helperText-root': {
            display: 'flex',
            justifyContent: 'space-between',
            '.HugoUIInput-helperText-content': {
              display: 'flex',
              flexDirection: 'column',
              rowGap: 8,
            },
          },
          '.HugoUIInput-status': {
            display: 'inline-flex',
            alignItems: 'center',
            columnGap: 4,
          },
          '&.Mui-disabled': {
            color: theme.hugoUIColorRoles.text.disabled,
          },
        }),
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: ({ theme }) => {
          const { ACTIVE_BORDER, FOCUS_BORDER, FOCUS_SHADOW } = getBorderTokens(theme);
          return {
            // focus by mouse
            '&.HugoUIInput-clickFocus': {
              '& .Mui-focused': {
                '&:not(.MuiInputBase-colorError,.MuiInputBase-colorSuccess)': {
                  '.MuiOutlinedInput-notchedOutline': {
                    border: ACTIVE_BORDER,
                  },
                },
              },
            },
            // focus by keyboard
            '&:not(.HugoUIInput-clickFocus)': {
              '& .Mui-focused': {
                '&:not(.MuiInputBase-colorError,.MuiInputBase-colorSuccess)': {
                  '.MuiOutlinedInput-notchedOutline': {
                    border: FOCUS_BORDER,
                  },
                },
                '&.MuiInputBase-colorError,&.MuiInputBase-colorSuccess': {
                  fieldset: {
                    legend: {
                      span: {
                        paddingRight: 2,
                      },
                    },
                  },
                },
              },
              '&.HugoUIInput-hasFocus': {
                '&.HugoUIInput-hasLabel': {
                  '& .Mui-focused': {
                    '&.MuiInputBase-colorError,&.MuiInputBase-colorSuccess': {
                      borderRadius: 2,
                    },
                  },
                },
                '&.HugoUIInput-mini': {
                  '& .Mui-focused': {
                    '&.MuiInputBase-colorError,&.MuiInputBase-colorSuccess': {
                      borderRadius: 1,
                    },
                  },
                },
                // theme light
                '&.HugoUIInput-light': {
                  // !mini
                  '&.HugoUIInput-hasLabel': {
                    '& .Mui-focused': {
                      '&.MuiInputBase-colorError,&.MuiInputBase-colorSuccess': {
                        input: {
                          padding: '9px 13px',
                          margin: 3,
                        },
                        '.MuiOutlinedInput-notchedOutline': {
                          margin: 3,
                        },
                      },
                    },
                  },
                  // mini
                  '&.HugoUIInput-mini': {
                    '&.HugoUIInput-error,&.HugoUIInput-success': {
                      '& .Mui-focused': {
                        '&.MuiInputBase-root': {
                          margin: '0px !important',
                          paddingRight: '8px !important',
                          '.MuiOutlinedInput-notchedOutline': {
                            margin: 0,
                            marginTop: 5,
                            boxShadow: FOCUS_SHADOW,
                          },
                        },
                        '&.MuiInputBase-colorError,&.MuiInputBase-colorSuccess': {
                          margin: 1,
                          paddingRight: 5,
                          borderRadius: 4,
                          input: {
                            padding: '4px 8px',
                            margin: 0,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            '&.HugoUIInput-mini': {
              '.MuiOutlinedInput-root': {
                '.MuiOutlinedInput-input': {
                  padding: '4px 8px',
                  height: 24,
                  ...theme.hugoUITypography.subtitle4,
                  color: theme.hugoUIColorRoles.text.primary,
                },
                fieldset: {
                  marginTop: 5,
                  legend: {
                    height: 0,
                    span: {
                      display: 'none',
                    },
                  },
                },
                '&.MuiInputBase-adornedEnd': {
                  paddingRight: 8,
                },
                '.HugoUIStatusIcon-icon': {
                  cursor: 'default',
                },
              },
            },
          };
        },
      },
    },
    // added for the datepicker
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          button: {
            padding: 0,
            margin: 0,
          },
        },
      },
    },
  },
});

export const createInputTheme = (parentTheme: Theme) =>
  createTheme(parentTheme, createInputThemeOverrides());

export const InputContainer = styled('div')(({ theme }) => {
  const { FOCUS_BORDER } = getBorderTokens(theme);
  return {
    position: 'relative',
    '.HugoUIInput-notchedOutline': {
      pointerEvents: 'none',
      position: 'absolute',
      width: '100%',
      padding: '0 10px',
      textAlign: 'left',
      top: -4,
      left: -2,
      height: 59,
      border: FOCUS_BORDER,
      borderRadius: 4,
      minWidth: '0%',
      legend: {
        color: 'transparent',
        fontSize: 12,
        lineHeight: '24px',
        padding: 0,
        letterSpacing: '0.15px',
        whiteSpace: 'nowrap',
        maxWidth: '100%',
        span: {
          padding: '0px 5px',
          fontWeight: 400,
          paddingRight: 2,
        },
      },
      '&-multiline': {
        height: 131,
        legend: {
          letterSpacing: '0.32px',
        },
      },
    },
    '&.HugoUIInput-required': {
      '.HugoUIInput-notchedOutline': {
        legend: {
          span: {
            paddingLeft: 1.7,
          },
        },
      },
    },
  };
});
