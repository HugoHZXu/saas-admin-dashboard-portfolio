import React, { useEffect, useRef } from 'react';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import classnames from 'classnames';
import DialogActions, { DialogActionsProps } from '@mui/material/DialogActions';
import {
  HugoUIButton,
  HugoUIPrimaryButtonProps,
  HugoUISecondaryButtonProps,
  HugoUIDestructButtonProps,
} from '../Button/Button';
import { Link, HugoUILinkProps } from '../Link';
import { HugoUIBaseProps } from '../types/base';
import { createDialogFooterTheme } from './styles/modalStyles';
import { FOOTER_ROOT_PREFIX } from './styles/modalTokens';

interface HugoUIModalButtonCommonType {
  label?: React.ReactNode;
  hidden?: boolean;
}

export type HugoUIModalPrimaryButtonProps = (HugoUIPrimaryButtonProps | HugoUIDestructButtonProps) &
  HugoUIModalButtonCommonType;

export type HugoUIModalSecondaryButtonProps = HugoUISecondaryButtonProps &
  HugoUIModalButtonCommonType;

export type HugoUIModalTertiaryButtonProps = {
  renderCustomComponent?: () => React.ReactNode;
} & HugoUIModalButtonCommonType &
  HugoUILinkProps;

export interface HugoUIModalButtonsType {
  /**
   * The primary button (save button)
   */
  primary?: HugoUIModalPrimaryButtonProps;
  /**
   * The secondary button (cancel button)
   */
  secondary?: HugoUIModalSecondaryButtonProps;
  /**
   * The tertiary button (link button)
   */
  tertiary?: HugoUIModalTertiaryButtonProps;
}

export interface HugoUIModalFooterProps extends HugoUIBaseProps, DialogActionsProps {
  /**
   * The props for the action buttons
   */
  actionProps?: HugoUIModalButtonsType;
  /**
   * allows user to disable the auto focus onto the bottom action buttons in the case there is another element to focus on first
   */
  disableAutoFocus?: boolean;
}

export const HugoUIModalFooter = ({
  actionProps,
  disableAutoFocus,
  ...props
}: HugoUIModalFooterProps) => {
  const { tertiary, secondary, primary } = actionProps || {};

  const focusButtonRef = useRef<HTMLButtonElement | null>(null);
  const focusLinkRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (!disableAutoFocus) {
      if (focusLinkRef.current) {
        focusLinkRef.current.focus();
      } else if (focusButtonRef.current) {
        focusButtonRef.current.focus();
      }
    }
  }, []);

  const parentTheme = useTheme();
  const footerTheme = React.useMemo(() => createDialogFooterTheme(parentTheme), [parentTheme]);

  const handleTertiaryKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.stopPropagation();
      tertiary?.onClick?.(e as unknown as React.MouseEvent<HTMLAnchorElement>);
    }
  };
  const renderTertiaryButton = () => {
    if (tertiary?.renderCustomComponent) {
      return tertiary.renderCustomComponent();
    }
    if (!tertiary?.label || tertiary?.hidden) {
      return;
    }
    return (
      <Link ref={focusLinkRef} mode="light" onKeyUp={handleTertiaryKeyDown} {...tertiary}>
        {tertiary.label}
      </Link>
    );
  };
  const renderButtons = () => {
    return (
      <>
        {renderTertiaryButton()}
        <div className={`${FOOTER_ROOT_PREFIX}-buttons`}>
          {!!secondary && !secondary.hidden && (
            <HugoUIButton ref={!tertiary || tertiary.hidden ? focusButtonRef : null} {...secondary}>
              {secondary.label}
            </HugoUIButton>
          )}
          {!!primary && !primary.hidden && (
            <HugoUIButton
              ref={
                (!secondary || secondary.hidden) && (!tertiary || tertiary.hidden)
                  ? focusButtonRef
                  : null
              }
              {...primary}
            >
              {primary.label}
            </HugoUIButton>
          )}
        </div>
      </>
    );
  };

  return (
    <ThemeProvider theme={footerTheme}>
      <DialogActions
        className={classnames(`${FOOTER_ROOT_PREFIX}-root`, {
          [`${FOOTER_ROOT_PREFIX}-tertiary-wrap`]: tertiary?.label,
        })}
        {...props}
      >
        {renderButtons()}
      </DialogActions>
    </ThemeProvider>
  );
};

// HugoUIModalFooter.displayName = 'HugoUI Modal Footer'
