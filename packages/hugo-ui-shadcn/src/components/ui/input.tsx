import * as React from 'react';
import { CheckCircle2, CircleAlert } from 'lucide-react';

import { cn } from '@/components/lib/utils';

type InputStatus = 'default' | 'success' | 'error';
type InputSize = 'default' | 'sm';
type InputElement = 'input' | 'textarea';
type FieldElement = HTMLInputElement | HTMLTextAreaElement;

type NativeInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'className' | 'color' | 'onBlur' | 'onChange' | 'onFocus' | 'onKeyDown' | 'size'
>;

type InputClassNames = {
  root?: string;
  label?: string;
  requiredMark?: string;
  control?: string;
  field?: string;
  input?: string;
  textarea?: string;
  adornment?: string;
  helper?: string;
  helperContent?: string;
  status?: string;
  spinner?: string;
  counter?: string;
};

type InputSlotProps = {
  label?: React.LabelHTMLAttributes<HTMLLabelElement>;
  control?: React.HTMLAttributes<HTMLDivElement>;
  input?: React.InputHTMLAttributes<HTMLInputElement>;
  textarea?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
  helper?: React.HTMLAttributes<HTMLDivElement>;
};

type InputProps = NativeInputProps & {
  as?: InputElement;
  className?: string;
  classNames?: InputClassNames;
  description?: React.ReactNode;
  endIcon?: React.ReactNode;
  label?: React.ReactNode;
  loading?: boolean;
  message?: React.ReactNode;
  onBlur?: React.FocusEventHandler<FieldElement>;
  onChange?: React.ChangeEventHandler<FieldElement>;
  onFocus?: React.FocusEventHandler<FieldElement>;
  onKeyDown?: React.KeyboardEventHandler<FieldElement>;
  rows?: number;
  showCharacterCount?: boolean;
  size?: InputSize;
  slotProps?: InputSlotProps;
  startIcon?: React.ReactNode;
  status?: InputStatus;
  autoFocusSource?: 'keyboard' | 'mouse';
};

const DEFAULT_MAX_LENGTH = 500;

const toValueString = (value: unknown) => (value == null ? '' : String(value));

const renderStatusMessage = (status: InputStatus, message: React.ReactNode, className?: string) => {
  if (typeof message !== 'string' || (status !== 'success' && status !== 'error')) {
    return message;
  }

  const Icon = status === 'success' ? CheckCircle2 : CircleAlert;
  return (
    <span className={className} data-slot="status" data-status={status}>
      <Icon aria-hidden="true" size={16} />
      {message}
    </span>
  );
};

function Input({
  as = 'input',
  autoFocus,
  autoFocusSource,
  className,
  classNames,
  defaultValue,
  description,
  disabled,
  endIcon,
  id,
  label,
  loading = false,
  maxLength,
  message,
  name,
  onBlur,
  onChange,
  onFocus,
  onKeyDown,
  placeholder = '',
  required,
  rows = 4,
  showCharacterCount = true,
  size = 'default',
  slotProps,
  startIcon,
  status = 'default',
  type = 'text',
  value,
  ...props
}: InputProps) {
  const generatedId = React.useId();
  const isTextarea = as === 'textarea';
  const {
    className: inputSlotClassName,
    id: inputSlotId,
    maxLength: inputSlotMaxLength,
    onBlur: inputSlotOnBlur,
    onChange: inputSlotOnChange,
    onFocus: inputSlotOnFocus,
    onKeyDown: inputSlotOnKeyDown,
    ...nativeInputSlotProps
  } = slotProps?.input ?? {};
  const {
    className: textareaSlotClassName,
    id: textareaSlotId,
    maxLength: textareaSlotMaxLength,
    onBlur: textareaSlotOnBlur,
    onChange: textareaSlotOnChange,
    onFocus: textareaSlotOnFocus,
    onKeyDown: textareaSlotOnKeyDown,
    rows: textareaSlotRows,
    ...nativeTextareaSlotProps
  } = slotProps?.textarea ?? {};
  const { className: labelSlotClassName, ...labelProps } = slotProps?.label ?? {};
  const {
    className: controlSlotClassName,
    onMouseDown: controlSlotOnMouseDown,
    ...controlProps
  } = slotProps?.control ?? {};
  const { className: helperSlotClassName, ...helperProps } = slotProps?.helper ?? {};

  const fieldId =
    (isTextarea ? textareaSlotId : inputSlotId) ??
    id ??
    `hugo-ui-shadcn-input-${generatedId.replace(/:/g, '')}`;
  const helperId = `${fieldId}-helper`;
  const isControlled = value !== undefined;
  const [fieldValue, setFieldValue] = React.useState(
    toValueString(isControlled ? value : defaultValue)
  );
  const [focusSource, setFocusSource] = React.useState<'keyboard' | 'mouse' | undefined>(
    autoFocus ? (autoFocusSource ?? 'mouse') : undefined
  );
  const pointerFocusRef = React.useRef(false);

  React.useEffect(() => {
    if (isControlled) {
      setFieldValue(toValueString(value));
    }
  }, [isControlled, value]);

  const slotFieldClassName = isTextarea ? textareaSlotClassName : inputSlotClassName;
  const slotFieldOnBlur = isTextarea ? textareaSlotOnBlur : inputSlotOnBlur;
  const slotFieldOnChange = isTextarea ? textareaSlotOnChange : inputSlotOnChange;
  const slotFieldOnFocus = isTextarea ? textareaSlotOnFocus : inputSlotOnFocus;
  const slotFieldOnKeyDown = isTextarea ? textareaSlotOnKeyDown : inputSlotOnKeyDown;
  const describedBy =
    description || message || (isTextarea && showCharacterCount) ? helperId : undefined;
  const labelId = label && name !== 'search' ? `${fieldId}-label` : undefined;
  const maxLengthValue =
    (isTextarea ? textareaSlotMaxLength : inputSlotMaxLength) ?? maxLength ?? DEFAULT_MAX_LENGTH;
  const placeholderText = name === 'search' && typeof label === 'string' ? label : placeholder;

  const handleChange = (event: React.ChangeEvent<FieldElement>) => {
    setFieldValue(event.target.value);
    onChange?.(event);
    slotFieldOnChange?.(
      event as React.ChangeEvent<HTMLInputElement> & React.ChangeEvent<HTMLTextAreaElement>
    );
  };

  const handleFocus = (event: React.FocusEvent<FieldElement>) => {
    setFocusSource(pointerFocusRef.current ? 'mouse' : 'keyboard');
    pointerFocusRef.current = false;
    onFocus?.(event);
    slotFieldOnFocus?.(
      event as React.FocusEvent<HTMLInputElement> & React.FocusEvent<HTMLTextAreaElement>
    );
  };

  const handleBlur = (event: React.FocusEvent<FieldElement>) => {
    setFocusSource(undefined);
    onBlur?.(event);
    slotFieldOnBlur?.(
      event as React.FocusEvent<HTMLInputElement> & React.FocusEvent<HTMLTextAreaElement>
    );
  };

  const handleKeyDown = (event: React.KeyboardEvent<FieldElement>) => {
    if (!isTextarea && event.key === 'Enter') {
      onBlur?.(event as unknown as React.FocusEvent<FieldElement>);
      event.currentTarget.blur();
    }

    onKeyDown?.(event);
    slotFieldOnKeyDown?.(
      event as React.KeyboardEvent<HTMLInputElement> & React.KeyboardEvent<HTMLTextAreaElement>
    );
  };

  const handleMouseDown: React.MouseEventHandler<HTMLDivElement> = (event) => {
    pointerFocusRef.current = true;
    controlSlotOnMouseDown?.(event);
  };

  const statusIcon =
    !endIcon && size === 'sm' && (status === 'success' || status === 'error') ? (
      status === 'success' ? (
        <CheckCircle2
          aria-hidden="true"
          className={classNames?.status}
          data-slot="status"
          data-status="success"
          size={18}
        />
      ) : (
        <CircleAlert
          aria-hidden="true"
          className={classNames?.status}
          data-slot="status"
          data-status="error"
          size={18}
        />
      )
    ) : null;
  const loadingIcon = (
    <span aria-hidden="true" className={classNames?.spinner} data-slot="spinner" />
  );
  const resolvedEndIcon = loading ? loadingIcon : endIcon || statusIcon;

  const sharedFieldProps = {
    'aria-busy': loading || undefined,
    'aria-describedby': describedBy,
    'aria-invalid': status === 'error' || undefined,
    'aria-labelledby': labelId,
    'aria-required': required || undefined,
    autoFocus,
    className: cn(
      classNames?.field,
      isTextarea ? classNames?.textarea : classNames?.input,
      slotFieldClassName
    ),
    disabled,
    id: fieldId,
    maxLength: maxLengthValue,
    name,
    onBlur: handleBlur,
    onChange: handleChange,
    onFocus: handleFocus,
    onKeyDown: handleKeyDown,
    placeholder: placeholderText,
    required,
    value: fieldValue,
  };

  return (
    <div
      className={cn(classNames?.root, className)}
      data-component="hugo-input"
      data-disabled={disabled ? 'true' : undefined}
      data-focus={focusSource}
      data-size={size}
      data-slot="root"
      data-status={status}
    >
      {label && name !== 'search' && (
        <label
          {...labelProps}
          className={cn(classNames?.label, labelSlotClassName)}
          data-hidden={size === 'sm' ? 'true' : undefined}
          data-slot="label"
          htmlFor={fieldId}
          id={labelId}
        >
          <span>{label}</span>
          {required && (
            <span aria-hidden="true" className={classNames?.requiredMark} data-slot="required-mark">
              {' '}
              *
            </span>
          )}
        </label>
      )}
      <div
        {...controlProps}
        className={cn(classNames?.control, controlSlotClassName)}
        data-slot="control"
        onMouseDown={handleMouseDown}
      >
        {startIcon && (
          <span className={classNames?.adornment} data-slot="adornment">
            {startIcon}
          </span>
        )}
        {isTextarea ? (
          <textarea
            {...(props as Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'color'>)}
            {...nativeTextareaSlotProps}
            {...(sharedFieldProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            data-slot="textarea"
            rows={textareaSlotRows ?? rows}
          />
        ) : (
          <input
            {...props}
            {...nativeInputSlotProps}
            {...(sharedFieldProps as React.InputHTMLAttributes<HTMLInputElement>)}
            data-slot="input"
            type={type}
          />
        )}
        {resolvedEndIcon && (
          <span className={classNames?.adornment} data-slot="adornment">
            {resolvedEndIcon}
          </span>
        )}
      </div>
      {describedBy && (
        <div
          {...helperProps}
          className={cn(classNames?.helper, helperSlotClassName)}
          data-slot="helper"
          id={helperId}
        >
          <span className={classNames?.helperContent} data-slot="helper-content">
            {message && renderStatusMessage(status, message, classNames?.status)}
            {description && <span>{description}</span>}
          </span>
          {isTextarea && showCharacterCount && (
            <span className={classNames?.counter} data-slot="counter">
              {fieldValue.length}/{maxLengthValue}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export { Input };
export type { InputClassNames, InputProps, InputSize, InputSlotProps, InputStatus };
