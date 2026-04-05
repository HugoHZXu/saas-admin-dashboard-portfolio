import React, { useState, useEffect, useMemo } from 'react';
import { useIntl } from 'react-intl';
import classnames from 'classnames';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import { visuallyHidden } from '@mui/utils';
import { HugoUILoading } from '../Loading/Loading';
import { useId } from '../utils/useId';
import { HugoUIButtonLevel, HugoUIButtonColorTheme, HugoUIButtonSize } from './buttonTypes';
import {
  createButtonTheme,
  BUTTON_ROOT_PREFIX,
  BUTTON_ICON_SMALL,
  BUTTON_ICON_NORMAL,
} from './styles/buttonStyles';

export interface HugoUIButtonCommonProps extends Omit<ButtonProps, 'color' | 'variant'> {
  /**
   * The size of the button
   */
  size?: HugoUIButtonSize;
  /**
   * Indicates whether the button is loading
   */
  loading?: boolean;
  /**
   * The loading indicator can be positioned on the start or the center of the button.
   */
  loadingPosition?: 'start' | 'center';
  /**
   * Indicates whether the label is hidden; used to save the space on smaller screens
   * */
  labelHidden?: boolean;
}

export interface HugoUIButtonStyleProps {
  /**
   * The level of the button
   */
  level?: HugoUIButtonLevel;
  /**
   * The color theme of the button
   */
  colorTheme?: HugoUIButtonColorTheme;
}

export interface HugoUIPrimaryButtonStyleProps extends HugoUIButtonStyleProps {
  /**
   * The level of the button
   */
  level?: 'primary';
  /**
   * The color theme of the button
   */
  colorTheme?: 'purple' | 'white';
}

export type HugoUIPrimaryButtonProps = HugoUIPrimaryButtonStyleProps & HugoUIButtonCommonProps;

export interface HugoUISecondaryButtonStyleProps extends HugoUIButtonStyleProps {
  /**
   * The level of the button
   */
  level: 'secondary';
  /**
   * The color theme of the button
   */
  colorTheme?: 'purple' | 'grey' | 'white';
}

export type HugoUISecondaryButtonProps = HugoUISecondaryButtonStyleProps & HugoUIButtonCommonProps;

export interface HugoUITertiaryButtonStyleProps extends HugoUIButtonStyleProps {
  /**
   * The level of the button
   */
  level: 'tertiary';
  /**
   * The color theme of the button
   */
  colorTheme?: 'purple' | 'grey' | 'white';
}

export type HugoUITertiaryButtonProps = HugoUITertiaryButtonStyleProps & HugoUIButtonCommonProps;

export interface HugoUIDestructButtonStyleProps extends HugoUIButtonStyleProps {
  /**
   * The level of the button
   */
  level?: 'primary';
  /**
   * The color theme of the button
   */
  colorTheme: 'red';
}

export type HugoUIDestructButtonProps = HugoUIDestructButtonStyleProps & HugoUIButtonCommonProps;

export type HugoUIButtonProps =
  | HugoUIPrimaryButtonProps
  | HugoUISecondaryButtonProps
  | HugoUITertiaryButtonProps
  | HugoUIDestructButtonProps;

export const HugoUIButton = React.forwardRef<HTMLButtonElement, HugoUIButtonProps>((props, ref) => {
  const {
    className,
    children,
    level = 'primary',
    colorTheme = 'purple',
    size = 'medium',
    disabled,
    startIcon,
    endIcon,
    loading,
    loadingPosition = 'start',
    type,
    onClick,
    labelHidden,
    tabIndex,
    ...otherProps
  } = props;

  const intl = useIntl();
  const parentTheme = useTheme();
  const theme = useMemo(() => createButtonTheme(parentTheme), [parentTheme]);

  const loadingIndicator = (
    <HugoUILoading aria-hidden size={size === 'small' ? BUTTON_ICON_SMALL : BUTTON_ICON_NORMAL} />
  );

  const showStartLoadingIndicator = loading && loadingPosition === 'start';
  const showCenterLoadingIndicator = loading && loadingPosition === 'center';

  // startIcon
  let buttonStartIcon = startIcon;
  if (!startIcon && showStartLoadingIndicator) {
    buttonStartIcon = loadingIndicator;
  }

  const resolvedLevel: HugoUIButtonLevel = level ?? 'primary';
  const resolvedDrawingStyle =
    resolvedLevel === 'tertiary' ? 'text' : resolvedLevel === 'secondary' ? 'outlined' : 'filled';

  // MUI uses "variant" for a slightly different schema
  let muiVariant: ButtonProps['variant'];
  if (resolvedDrawingStyle === 'text') {
    muiVariant = 'text';
  } else if (resolvedDrawingStyle === 'outlined') {
    muiVariant = 'outlined';
  } else {
    // both "filled" and "tonal" are "contained" for mui's purposes
    muiVariant = 'contained';
  }

  // MUI uses "color" for a slightly different schema
  let muiType: ButtonProps['color'];
  if (resolvedLevel === 'tertiary') {
    muiType = 'info';
  } else if (resolvedLevel === 'secondary') {
    muiType = 'secondary';
  } else {
    muiType = 'primary';
  }

  const [ariaLabel, setAriaLabel] = useState<string | undefined>(void 0);
  const [buttonText, setButtonText] = useState<React.ReactNode>(children);

  useEffect(() => {
    if (labelHidden) {
      // prevents readout of icon and reads hidden label when icon only
      setAriaLabel(children as string);
      setButtonText(void 0);
    } else {
      if (!loading) {
        setAriaLabel(void 0); // From the loading state to the non-loading state， remove aria-label
        setButtonText(children);
      } else if (showStartLoadingIndicator) {
        setAriaLabel(children as string);
        setButtonText(children);
      } else if (showCenterLoadingIndicator) {
        // when loading = true, the user may change the button text, like "Loading..."
        // when loadingPosition = center, the button text should be the same as the previous text to keep the button width，and readout the new text
        setAriaLabel(children as string);
      }
    }
  }, [children, labelHidden]);

  const defaultAriaProps: Pick<
    ButtonProps,
    'aria-label' | 'aria-busy' | 'aria-live' | 'aria-labelledby'
  > = {
    'aria-label': ariaLabel,
    'aria-busy': loading ? 'true' : 'false',
  };
  const labelledById = useId();
  if (loading) {
    // In macOS, it can't be read with aria-label, aria-labelledby is fine
    delete defaultAriaProps['aria-label'];
    defaultAriaProps['aria-labelledby'] = labelledById;
  }
  return (
    <ThemeProvider theme={theme}>
      <Button
        ref={ref}
        tabIndex={disabled || loading ? -1 : tabIndex || 0}
        variant={muiVariant}
        disableRipple={true}
        size={size}
        color={muiType}
        disabled={disabled}
        startIcon={buttonStartIcon}
        endIcon={endIcon}
        className={classnames(
          {
            [`${BUTTON_ROOT_PREFIX}-root`]: true,
            [`${BUTTON_ROOT_PREFIX}-hasStartIcon`]: buttonStartIcon,
            [`${BUTTON_ROOT_PREFIX}-hasEndIcon`]: endIcon,
            [`${BUTTON_ROOT_PREFIX}-${resolvedLevel}Level`]: true,
            [`${BUTTON_ROOT_PREFIX}-${colorTheme}Color`]: true,
            [`${BUTTON_ROOT_PREFIX}-${resolvedDrawingStyle}DrawingStyle`]: true,
            [`${BUTTON_ROOT_PREFIX}-icon-only`]: labelHidden || !children,
            [`${BUTTON_ROOT_PREFIX}-loading`]: loading,
            [`${BUTTON_ROOT_PREFIX}-loading-start`]: showStartLoadingIndicator,
            [`${BUTTON_ROOT_PREFIX}-loading-center`]: showCenterLoadingIndicator,
          },
          className
        )}
        type={loading ? 'button' : type}
        onClick={!loading ? onClick : void 0}
        {...defaultAriaProps}
        {...otherProps}
      >
        {showCenterLoadingIndicator ? (
          <>
            <span
              className={classnames(
                `${BUTTON_ROOT_PREFIX}-loadingIndicator`,
                `${BUTTON_ROOT_PREFIX}-loadingIndicator-center`
              )}
            >
              {loadingIndicator}
            </span>
            <span>{buttonText}</span>
          </>
        ) : (
          buttonText
        )}
        {loading ? (
          <span id={labelledById} style={visuallyHidden}>
            {ariaLabel ||
              intl.formatMessage({ id: 'hugoUI.button.loading', defaultMessage: 'Loading' })}
          </span>
        ) : (
          <></>
        )}
      </Button>
    </ThemeProvider>
  );
});
