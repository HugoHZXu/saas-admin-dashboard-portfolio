import React, { useEffect, useRef } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import classnames from 'classnames';
import DialogTitle, { DialogTitleProps } from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ErrorIcon from '@mui/icons-material/Error';
import { HugoUIModalType } from './modal';
import { HugoUIBaseProps } from '../types/base';
import { createDialogTitleTheme, StyledModalHeader, TITLE_ROOT_PREFIX } from './modalStyles';
import { useIntl } from 'react-intl';
import { ALERT, ERROR_OR_DESTRUCT, PURPLE_PLUM } from '../styles/theme';

export interface HugoUIModalTitleProps extends HugoUIBaseProps, Omit<DialogTitleProps, 'title'> {
  type?: HugoUIModalType;
  closeable?: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  prefixIconName?: string;
}

export const HugoUIModalTitle = ({
  title,
  type = 'transactional',
  className,
  closeable = true,
  onClose,
  prefixIconName,
}: HugoUIModalTitleProps) => {
  const intl = useIntl();

  const focusRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (focusRef.current) {
      focusRef.current.focus();
    }
  }, []);

  const renderIcon = () => {
    let iconName, ariaLabel;
    if (prefixIconName) {
      return (
        <span
          role="img"
          aria-label={ariaLabel}
          className={classnames(`${TITLE_ROOT_PREFIX}-icon`, prefixIconName)}
        />
      );
    }
    switch (type) {
      case 'destructive':
        ariaLabel = intl.formatMessage({ id: 'hugoUI.statusIcon.alert', defaultMessage: 'alert' });
        return (
          <ErrorIcon
            role="img"
            aria-label={ariaLabel}
            className={`${TITLE_ROOT_PREFIX}-icon`}
            style={{ color: ERROR_OR_DESTRUCT }}
            fontSize="inherit"
          />
        );
      case 'warning':
        ariaLabel = intl.formatMessage({ id: 'hugoUI.statusIcon.warn', defaultMessage: 'warning' });
        return (
          <WarningAmberIcon
            role="img"
            aria-label={ariaLabel}
            className={`${TITLE_ROOT_PREFIX}-icon`}
            style={{ color: PURPLE_PLUM }}
            fontSize="inherit"
          />
        );
      case 'error':
        ariaLabel = intl.formatMessage({ id: 'hugoUI.statusIcon.alert', defaultMessage: 'alert' });
        return (
          <ErrorOutlineIcon
            role="img"
            aria-label={ariaLabel}
            className={`${TITLE_ROOT_PREFIX}-icon`}
            style={{ color: ALERT }}
            fontSize="inherit"
          />
        );
      default:
        break;
    }
    return iconName ? (
      // Not using status icons here because size and colors do not quite align with that of the status icons
      <span
        role="img"
        aria-label={ariaLabel}
        className={classnames(`${TITLE_ROOT_PREFIX}-icon`, iconName)}
      />
    ) : null;
  };

  const renderCloseBtn = () => {
    return closeable ? (
      <IconButton
        ref={focusRef}
        className={`${TITLE_ROOT_PREFIX}-close`}
        aria-label={intl.formatMessage({ id: 'hugoUI.iconLabel.close', defaultMessage: 'close' })}
        onClick={onClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    ) : null;
  };

  let titleDisp;
  if (type !== 'feedback') {
    titleDisp = <span className="HugoUIModalTitle-title">{title}</span>;
  }

  return (
    <ThemeProvider theme={createDialogTitleTheme}>
      <StyledModalHeader
        className={classnames(`${TITLE_ROOT_PREFIX}-root`, `${TITLE_ROOT_PREFIX}-${type}-header`, {
          [`${TITLE_ROOT_PREFIX}-hasCloseBtn`]: closeable,
        })}
      >
        <DialogTitle className={classnames(`${TITLE_ROOT_PREFIX}-${type}`, className)}>
          {renderIcon()}
          {titleDisp}
        </DialogTitle>
        {renderCloseBtn()}
      </StyledModalHeader>
    </ThemeProvider>
  );
};
