import React, { ChangeEvent, useState, useEffect } from 'react';
import classnames from 'classnames';
import { useId } from '../utils/useId';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { inputTheme, InputContainer } from './inputStyles';
import { ThemeProvider } from '@mui/material/styles';
import { HugoUILoading } from '../Loading/Loading';
import { useIntl } from 'react-intl';
import { useFieldFocusOnWindowBlur } from '../utils/useFieldFocusOnWindowBlur';
import { visuallyHidden } from '@mui/utils';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import Box from '@mui/material/Box';
import { ERROR_OR_DESTRUCT, SUCCESS_GREEN } from '../styles/theme';
import { InputStatus } from './InputStatus';

export type HugoUIInputThemeType = 'light' | 'dark';

export type HugoUIInputExtraProps = {
  /**
   * Used for the success/error message (see figma)
   *
   * Should only be used with `color="success"` or `color="error"`
   *
   * Type: `node` (supports `React.ReactNode`)
   */
  extraMessage?: React.ReactNode;
  /**
   * The value of the `input` element, required for a controlled component.
   */
  value?: string;
  /**
   * If `true`, show mini input
   */
  mini?: boolean;
  /**
   * Used for customizing the postfix icon.
   */
  icon?: React.ReactNode;
  /**
   * Only used for `multiline`. To show/hide the word count below the field
   */
  showCount?: boolean;
  /**
   * If `true`, show loading status
   */
  loading?: boolean;
  /**
   * Used for different themes (see figma)
   */
  theme?: HugoUIInputThemeType;
  /**
   * Input placeholder
   */
  placeholder?: string;
  /**
   * If `true`, when `autoFocus` is true, it should be focus visible status
   */
  autoFocusByKeyboard?: boolean;
};

export type HugoUIInputProps = Omit<TextFieldProps, 'value' | 'placeholder'> &
  HugoUIInputExtraProps;

const DEFAULT_MAX_LENGTH = 500;

export const HugoUIInput = (props: HugoUIInputProps) => {
  const {
    id: _id,
    color,
    extraMessage,
    helperText,
    className,
    multiline,
    value: _value = '',
    // ToDo: condense all of these
    // it seems to be confusing to have the separate callback functions and both input props
    onChange,
    onBlur,
    InputProps,
    inputProps,
    icon,
    mini,
    label,
    showCount = true,
    loading = false,
    theme = 'light',
    InputLabelProps,
    fullWidth,
    required,
    placeholder = '',
    autoFocusByKeyboard,
    ...otherProps
  } = props;

  const id = useId(_id);
  const [clickFocus, setClickFocus] = useState<boolean>(false);
  const [inputHasFocus, setInputHasFocus] = useState<boolean>(false);
  const [value, setValue] = useState<string>(_value);
  const [hasAutofillValue, setHasAutofillValue] = useState<boolean>(false);

  const intl = useIntl();

  useEffect(() => {
    if (otherProps.autoFocus && !autoFocusByKeyboard) {
      setClickFocus(true);
    }
  }, [otherProps.autoFocus, autoFocusByKeyboard]);

  useEffect(() => {
    setValue(_value ? _value.toString() : '');
  }, [_value]);

  const hadClickFocusOnInputBlurRef = useFieldFocusOnWindowBlur(setClickFocus);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange && onChange(e);
  };

  const renderInputStatus = () => {
    if (typeof extraMessage !== 'string') {
      return extraMessage;
    }

    if (color === 'success') {
      if (theme === 'dark')
        return (
          <Box
            className="HugoUIDarkStatus-root"
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: SUCCESS_GREEN,
              fontSize: 12,
              lineHeight: '20px',
            }}
          >
            <Box className="HugoUIDarkStatus-icon" sx={{ mr: '5px', display: 'flex', height: 20 }}>
              <CheckCircleIcon
                fontSize="small"
                sx={{ color: SUCCESS_GREEN }}
                titleAccess={intl.formatMessage({
                  id: 'hugoUI.statusIcon.success',
                  defaultMessage: 'success',
                })}
              />
            </Box>
            {extraMessage}
          </Box>
        );
      else return <InputStatus status="success" message={extraMessage} />;
    } else if (color === 'error') {
      if (theme === 'dark')
        return (
          <Box
            className="HugoUIDarkStatus-root"
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: ERROR_OR_DESTRUCT,
              fontSize: 12,
              lineHeight: '20px',
            }}
          >
            <Box className="HugoUIDarkStatus-icon" sx={{ mr: '5px', display: 'flex', height: 20 }}>
              <ErrorIcon
                fontSize="small"
                sx={{ color: ERROR_OR_DESTRUCT }}
                titleAccess={intl.formatMessage({
                  id: 'hugoUI.statusIcon.error',
                  defaultMessage: 'error',
                })}
              />
            </Box>
            {extraMessage}
          </Box>
        );
      else return <InputStatus status="error" message={extraMessage} />;
    } else {
      return <div>{extraMessage}</div>;
    }
  };

  const renderHelperText = () => (
    <div
      id={`HugoUIInput-helperText-${id}`}
      className={classnames({
        'HugoUIInput-helperText-root': true,
        'HugoUIInput-helperText-dark': theme === 'dark',
      })}
    >
      <div className="HugoUIInput-helperText-content">
        {extraMessage && (
          <div aria-atomic="true" aria-live="polite">
            {renderInputStatus()}
          </div>
        )}
        {helperText}
      </div>
      {multiline && showCount && (
        <div className="HugoUIInput-helperText-multilineCharacterCount">
          {value.length}/{inputProps?.maxLength || DEFAULT_MAX_LENGTH}
        </div>
      )}
    </div>
  );

  const handleClick = () => {
    setClickFocus(true);
  };

  const handleBlur = (fEvt: React.FocusEvent<HTMLInputElement>) => {
    hadClickFocusOnInputBlurRef.current = clickFocus;
    setClickFocus(false);
    setInputHasFocus(false);
    if (onBlur) {
      onBlur(fEvt);
    }
  };

  const handleInputFocused = () => {
    setInputHasFocus(true);
  };

  let adornmentIcon;
  if (loading) {
    // ToDo: spike to figure out how to get aria-live and/or aria-busy to update
    adornmentIcon = <HugoUILoading size={'small'} />;
  } else {
    adornmentIcon =
      typeof icon === 'object' ? (
        icon
      ) : mini && (color === 'success' || color === 'error') ? (
        <div
          aria-atomic="true"
          aria-live="polite"
          style={{ display: 'flex', alignItems: 'center', height: 20 }}
        >
          {color === 'success' ? (
            <CheckCircleIcon
              id={`HugoUIInput-miniIcon-${id}`}
              fontSize="small"
              sx={{ color: SUCCESS_GREEN }}
            />
          ) : (
            <ErrorIcon
              id={`HugoUIInput-miniIcon-${id}`}
              fontSize="small"
              sx={{ color: ERROR_OR_DESTRUCT }}
            />
          )}
        </div>
      ) : null;
  }

  // when used in the search component, the input label should not
  //  shrink up to the top.  The label needs to be displayed as
  //  a placeholder in this case
  let placeholderText = placeholder;
  let labelNode;
  if (otherProps.name === 'search') {
    if (typeof label === 'string') {
      placeholderText = label;
    }
  } else if (required) {
    labelNode = (
      <>
        <span>{label}</span>
        <span aria-hidden="true" className="HugoUIInput-label-requiredPostfix">
          &nbsp;*
        </span>
      </>
    );
  } else {
    labelNode = mini ? <span style={visuallyHidden}>{label}</span> : label;
  }

  // hacky way to fix Chrome autofill will overlap with Input label
  // Mui bug: https://github.com/mui/material-ui/issues/36448, probably introduced in 5.12.x+
  const makeAnimationStartHandler =
    (stateSetter: React.Dispatch<React.SetStateAction<boolean>>) =>
    (e: React.AnimationEvent<HTMLInputElement>) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const autoFilled = !!(e.target as any)?.matches('*:-webkit-autofill');
      if (e.animationName === 'mui-auto-fill') {
        stateSetter(autoFilled);
      }

      if (e.animationName === 'mui-auto-fill-cancel') {
        stateSetter(autoFilled);
      }
    };

  return (
    <ThemeProvider theme={inputTheme}>
      <InputContainer
        className={classnames(
          'HugoUIInput-root',
          { 'HugoUIInput-fullWidth': fullWidth, 'HugoUIInput-required': required },
          className
        )}
      >
        <TextField
          variant={theme === 'light' ? 'outlined' : 'filled'}
          className={classnames(`HugoUIInput-${theme}`, {
            'HugoUIInput-mini': mini,
            'HugoUIInput-endAdornment': !!InputProps?.endAdornment,
            'HugoUIInput-clickFocus': clickFocus,
            'HugoUIInput-hasFocus': inputHasFocus,
            'HugoUIInput-hasLabel': !!labelNode,
            'HugoUIInput-hasInput': !!value,
            [`HugoUIInput-${color}`]: color,
          })}
          type={otherProps.type}
          color={color}
          value={value}
          onChange={onInputChange}
          multiline={multiline}
          rows={multiline ? 4 : 1}
          helperText={
            (helperText || extraMessage || (multiline && showCount)) && renderHelperText()
          }
          InputProps={{
            ...InputProps,
            endAdornment: adornmentIcon || InputProps?.endAdornment,
          }}
          inputProps={{
            maxLength: DEFAULT_MAX_LENGTH,
            readOnly: void 0,
            onFocus: handleInputFocused,
            'aria-required': !!required,
            'aria-busy': loading,
            'aria-labelledby': `HugoUIInputText-${id} HugoUIInput-miniIcon-${id} HugoUIInput-helperText-${id}`,
            'aria-invalid': color === 'error',
            required: !!required,
            onAnimationStart: makeAnimationStartHandler(setHasAutofillValue),
            onKeyDown: (e) => {
              if (!multiline && e.key === 'Enter') {
                onBlur?.(e as unknown as React.FocusEvent<HTMLInputElement>);
              }
            },
            ...inputProps,
          }}
          label={labelNode}
          placeholder={placeholderText}
          onMouseDown={handleClick}
          onBlur={handleBlur}
          InputLabelProps={{
            id: `HugoUIInputText-${id}`,
            shrink: inputHasFocus || hasAutofillValue || !!value,
            ...(inputProps?.id ? { htmlFor: inputProps?.id } : {}),
            ...(theme === 'dark'
              ? {
                  ...InputLabelProps,
                  className: classnames(InputLabelProps?.className, 'HugoUIInput-label-dark'),
                }
              : InputLabelProps),
          }}
          fullWidth={fullWidth}
          {...otherProps}
        />
        {(color === 'error' || color === 'success') &&
          theme !== 'dark' &&
          !mini &&
          inputHasFocus &&
          !clickFocus && (
            <fieldset
              id={`HugoUIInput-${id}`}
              className={classnames('HugoUIInput-notchedOutline', {
                'HugoUIInput-notchedOutline-multiline': multiline,
              })}
            >
              <legend>
                <span>{labelNode}</span>
              </legend>
            </fieldset>
          )}
      </InputContainer>
    </ThemeProvider>
  );
};
