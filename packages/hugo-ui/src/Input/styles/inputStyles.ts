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
          // MuiFilledInput is not working
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
    MuiFilledInput: {
      styleOverrides: {
        root: ({ theme }) => {
          const {
            BASIC_BORDER_DARK,
            SUCCESS_BORDER_DARK,
            ERROR_BORDER_DARK,
            DISABLED_BORDER_DARK,
            FOCUS_SHADOW,
          } = getBorderTokens(theme);
          return {
            minHeight: '48px',
            backgroundColor: `${theme.hugoUIColorRoles.surface.default} !important`,
            border: BASIC_BORDER_DARK,
            borderRadius: 4,
            input: {
              ...theme.hugoUITypography.subtitle2,
              color: theme.hugoUIColorRoles.text.primary,
              '&.Mui-disabled': {
                WebkitTextFillColor: theme.hugoUIColorRoles.text.disabled,
              },
              height: 24,
              padding: '15px 14px 5px 14px',
              borderRadius: 4,
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
            '&.MuiInputBase-multiline': {
              ...theme.hugoUITypography.subtitle2,
              color: theme.hugoUIColorRoles.text.primary,
              textarea: {
                '&.Mui-disabled': {
                  WebkitTextFillColor: theme.hugoUIColorRoles.text.disabled,
                },
              },
              height: 128,
            },
            '&::before': {
              borderBottom: 'none !important',
            },
            '&::after': {
              borderBottom: 'none !important',
            },
            // success
            '&.MuiInputBase-colorSuccess': {
              border: SUCCESS_BORDER_DARK,
            },
            // error
            '&.MuiInputBase-colorError': {
              border: ERROR_BORDER_DARK,
            },
            // disabled
            '&.Mui-disabled': {
              border: DISABLED_BORDER_DARK,
              '[class^="icon-"]': {
                pointerEvents: 'none',
                color: theme.hugoUIColorRoles.text.disabled,
              },
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
          };
        },
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
          '&.HugoUIInput-label-dark': {
            '&.MuiInputLabel-shrink': {
              // the real size should zoom in with INPUT_LABEL_SHRINK_FACTOR to match design
              fontSize: `${10 / INPUT_LABEL_SHRINK_FACTOR}px`,
              lineHeight: `${16 / INPUT_LABEL_SHRINK_FACTOR}px`,
              transform: `translate(15px, 3px) scale(${INPUT_LABEL_SHRINK_FACTOR})`,
            },
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
          '.HugoUIInput-helperText-dark': {
            color: theme.hugoUIColorRoles.text.inverse,
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
          const {
            ACTIVE_BORDER,
            ACTIVE_BORDER_DARK,
            ERROR_BORDER_DARK,
            SUCCESS_BORDER_DARK,
            FOCUS_BORDER,
            FOCUS_BORDER_DARK,
            FOCUS_INNER_BORDER_DARK,
          } = getBorderTokens(theme);
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
              '&:not(.HugoUIInput-dark.HugoUIInput-mini)': {
                '.MuiFilledInput-root': {
                  '&:not(.MuiInputBase-colorError,.MuiInputBase-colorSuccess)': {
                    '&.Mui-focused': {
                      border: ACTIVE_BORDER_DARK,
                    },
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
                // theme dark
                '&.HugoUIInput-dark': {
                  '&.HugoUIInput-error': {
                    '.MuiFilledInput-root': {
                      border: ERROR_BORDER_DARK,
                    },
                  },
                  '&.HugoUIInput-success': {
                    '.MuiFilledInput-root': {
                      border: SUCCESS_BORDER_DARK,
                    },
                  },
                  // !mini
                  '&.HugoUIInput-hasLabel': {
                    '.MuiFilledInput-root': {
                      minHeight: 44,
                      margin: 2,
                      outline: FOCUS_BORDER_DARK,
                      '&.MuiInputBase-adornedEnd': {
                        paddingRight: 11,
                      },
                      'input.MuiFilledInput-input': {
                        paddingRight: '14px',
                      },
                    },
                    '&.HugoUIInput-error,&.HugoUIInput-success': {
                      '.MuiFilledInput-root': {
                        'input.MuiFilledInput-input': {
                          padding: '13px 12px 3px 12px',
                        },
                        '&.MuiInputBase-multiline': {
                          padding: '23px 10px 6px 10px',
                          height: 124,
                        },
                        '&.MuiInputBase-adornedEnd': {
                          paddingRight: 10,
                          'input.MuiFilledInput-input': {
                            padding: '13px 14px 3px 12px',
                          },
                        },
                      },
                    },
                    '&:not(.HugoUIInput-error,.HugoUIInput-success)': {
                      '.MuiFilledInput-root': {
                        border: FOCUS_INNER_BORDER_DARK,
                        borderRadius: 1,
                        'input.MuiFilledInput-input': {
                          padding: '14px 13px 4px 13px',
                        },
                        '&.MuiInputBase-multiline': {
                          padding: '24px 11px 7px 11px',
                          height: 124,
                        },
                        '&.MuiInputBase-adornedEnd': {
                          'input.MuiFilledInput-input': {
                            padding: '14px 14px 4px 13px',
                          },
                        },
                      },
                    },
                  },
                  // mini
                  '&.HugoUIInput-mini': {
                    '.MuiFilledInput-root': {
                      outline: FOCUS_BORDER_DARK,
                      borderWidth: 1,
                      margin: 2,
                      input: {
                        padding: '1px 5px',
                      },
                      '&.MuiInputBase-adornedEnd': {
                        paddingRight: 7,
                      },
                      '&:not(.MuiInputBase-colorSuccess,.MuiInputBase-colorError)': {
                        border: FOCUS_INNER_BORDER_DARK,
                        borderRadius: 1,
                      },
                      '&.MuiInputBase-colorSuccess,&.MuiInputBase-colorError': {
                        input: {
                          padding: '1px 6px 1px 5px',
                        },
                      },
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
                      border: FOCUS_BORDER,
                      borderRadius: 4,
                      '& .Mui-focused': {
                        '&.MuiInputBase-colorError,&.MuiInputBase-colorSuccess': {
                          margin: 1,
                          paddingRight: 5,
                          input: {
                            padding: '1px 8px 1px 5px',
                          },
                        },
                      },
                    },
                  },
                },
              },
              '.MuiFilledInput-root': {
                '&.Mui-focused': {
                  border: FOCUS_BORDER,
                },
              },
            },
            '&.HugoUIInput-mini': {
              '.MuiOutlinedInput-root,.MuiFilledInput-root': {
                '&.MuiFilledInput-root': {
                  minHeight: 'unset',
                  '&:not(.MuiInputBase-colorError,.MuiInputBase-colorSuccess)': {
                    borderColor: 'transparent',
                  },
                },
                '.MuiOutlinedInput-input,.MuiFilledInput-input': {
                  padding: '4px 8px',
                  height: 24,
                  ...theme.hugoUITypography.subtitle4,
                  color: theme.hugoUIColorRoles.text.primary,
                  '&.MuiFilledInput-input': {
                    padding: '2px 6px',
                  },
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
