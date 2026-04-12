import React, { ChangeEvent, useState, useEffect } from 'react';
import classnames from 'classnames';
import { useId } from '../utils/useId';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import type { InputLabelProps as MuiInputLabelProps } from '@mui/material/InputLabel';
import type { OutlinedInputProps } from '@mui/material/OutlinedInput';
import { createInputTheme, InputContainer } from './styles/inputStyles';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import { HugoUILoading } from '../Loading/Loading';
import { useFieldFocusOnWindowBlur } from '../utils/useFieldFocusOnWindowBlur';
import { visuallyHidden } from '@mui/utils';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { InputStatus } from './InputStatus';

export type HugoUIInputExtraProps = {
  /**
   * Used for the success/error message
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
   * Input placeholder
   */
  placeholder?: string;
  /**
   * If `true`, when `autoFocus` is true, it should be focus visible status
   */
  autoFocusByKeyboard?: boolean;
};

export type HugoUIInputCompatibilityProps = {
  /**
   * MUI v5 compatibility prop. Prefer `slotProps.input` for new code.
   */
  InputProps?: Partial<OutlinedInputProps>;
  /**
   * MUI v5 compatibility prop. Prefer `slotProps.htmlInput` for new code.
   */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  /**
   * MUI v5 compatibility prop. Prefer `slotProps.inputLabel` for new code.
   */
  InputLabelProps?: Partial<MuiInputLabelProps>;
};

export type HugoUIInputProps = Omit<TextFieldProps, 'value' | 'placeholder'> &
  HugoUIInputExtraProps &
  HugoUIInputCompatibilityProps;

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
    onChange,
    onBlur,
    InputProps,
    inputProps,
    icon,
    mini,
    label,
    showCount = true,
    loading = false,
    InputLabelProps,
    slotProps,
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

  const parentTheme = useTheme();
  const inputTheme = React.useMemo(() => createInputTheme(parentTheme), [parentTheme]);
  const successColor = parentTheme.hugoUIColorRoles.status.success;
  const errorColor = parentTheme.hugoUIColorRoles.status.error;

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
      return <InputStatus status="success" message={extraMessage} />;
    } else if (color === 'error') {
      return <InputStatus status="error" message={extraMessage} />;
    } else {
      return <div>{extraMessage}</div>;
    }
  };

  const renderHelperText = () => (
    <div
      id={`HugoUIInput-helperText-${id}`}
      className={classnames({
        'HugoUIInput-helperText-root': true,
      })}
    >
      <div className="HugoUIInput-helperText-content">
        {extraMessage && <div>{renderInputStatus()}</div>}
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
    adornmentIcon = <HugoUILoading size={'small'} />;
  } else {
    adornmentIcon =
      typeof icon === 'object' ? (
        icon
      ) : mini && (color === 'success' || color === 'error') ? (
        <div aria-hidden="true" style={{ display: 'flex', alignItems: 'center', height: 20 }}>
          {color === 'success' ? (
            <CheckCircleIcon
              id={`HugoUIInput-miniIcon-${id}`}
              fontSize="small"
              sx={{ color: successColor }}
            />
          ) : (
            <ErrorIcon
              id={`HugoUIInput-miniIcon-${id}`}
              fontSize="small"
              sx={{ color: errorColor }}
            />
          )}
        </div>
      ) : null;
  }

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

  const helperTextId = `HugoUIInput-helperText-${id}`;
  const labelId = `HugoUIInputText-${id}`;
  const describedByIds = [(helperText || extraMessage || (multiline && showCount)) && helperTextId]
    .filter(Boolean)
    .join(' ');
  const inputSlotProps = typeof slotProps?.input === 'function' ? undefined : slotProps?.input;
  const htmlInputSlotProps =
    typeof slotProps?.htmlInput === 'function' ? undefined : slotProps?.htmlInput;
  const inputLabelSlotProps =
    typeof slotProps?.inputLabel === 'function' ? undefined : slotProps?.inputLabel;

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
          variant="outlined"
          className={classnames('HugoUIInput-light', {
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
          slotProps={{
            ...slotProps,
            input: {
              ...inputSlotProps,
              ...InputProps,
              endAdornment: adornmentIcon || InputProps?.endAdornment,
            },
            htmlInput: {
              maxLength: DEFAULT_MAX_LENGTH,
              readOnly: void 0,
              onFocus: handleInputFocused,
              'aria-required': !!required,
              'aria-busy': loading,
              'aria-labelledby': labelId,
              'aria-describedby': describedByIds || undefined,
              'aria-invalid': color === 'error',
              required: !!required,
              onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
                if (!multiline && e.key === 'Enter') {
                  onBlur?.(e as unknown as React.FocusEvent<HTMLInputElement>);
                }
              },
              ...htmlInputSlotProps,
              ...inputProps,
            },
            inputLabel: {
              id: labelId,
              shrink: inputHasFocus || !!value,
              ...(inputProps?.id ? { htmlFor: inputProps?.id } : {}),
              ...inputLabelSlotProps,
              ...InputLabelProps,
              className: classnames(InputLabelProps?.className, {
                'HugoUIInput-label-required': !!required,
              }),
            },
          } as TextFieldProps['slotProps']}
          label={labelNode}
          placeholder={placeholderText}
          onMouseDown={handleClick}
          onBlur={handleBlur}
          fullWidth={fullWidth}
          {...otherProps}
        />
        {(color === 'error' || color === 'success') && !mini && inputHasFocus && !clickFocus && (
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
