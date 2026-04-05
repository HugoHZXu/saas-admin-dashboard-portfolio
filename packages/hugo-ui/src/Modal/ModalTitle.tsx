import React, { useEffect, useRef } from 'react';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import classnames from 'classnames';
import DialogTitle, { DialogTitleProps } from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import ErrorIcon from '@mui/icons-material/Error';
import { HugoUIModalType } from './Modal';
import { HugoUIBaseProps } from '../types/base';
import { createDialogTitleTheme, StyledModalHeader } from './styles/modalStyles';
import { TITLE_ROOT_PREFIX } from './styles/modalTokens';
import { useIntl } from 'react-intl';

type HugoUIModalTitleIconProps = {
  className?: string;
  fontSize?: 'inherit' | 'small' | 'medium' | 'large';
};

export interface HugoUIModalTitleProps extends HugoUIBaseProps, Omit<DialogTitleProps, 'title'> {
  type?: HugoUIModalType;
  closeable?: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  prefixIcon?: React.ReactElement;
  titleId?: string;
}

export const HugoUIModalTitle = ({
  title,
  type = 'transactional',
  className,
  closeable = true,
  onClose,
  prefixIcon,
  titleId,
}: HugoUIModalTitleProps) => {
  const intl = useIntl();
  const parentTheme = useTheme();
  const titleTheme = React.useMemo(() => createDialogTitleTheme(parentTheme), [parentTheme]);
  const statusColors = parentTheme.hugoUIColorRoles.status;

  const focusRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (focusRef.current) {
      focusRef.current.focus();
    }
  }, []);

  const renderIcon = () => {
    let ariaLabel;
    if (prefixIcon) {
      const iconProps = prefixIcon.props as HugoUIModalTitleIconProps;
      return React.cloneElement(prefixIcon as React.ReactElement<HugoUIModalTitleIconProps>, {
        className: classnames(`${TITLE_ROOT_PREFIX}-icon`, iconProps.className),
        fontSize: 'inherit',
      });
    }
    switch (type) {
      case 'destructive':
        ariaLabel = intl.formatMessage({ id: 'hugoUI.statusIcon.alert', defaultMessage: 'alert' });
        return (
          <ErrorIcon
            role="img"
            aria-label={ariaLabel}
            className={`${TITLE_ROOT_PREFIX}-icon`}
            style={{ color: statusColors.error }}
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
            style={{ color: parentTheme.hugoUIColorRoles.brand.primary }}
            fontSize="inherit"
          />
        );
      case 'error':
        ariaLabel = intl.formatMessage({ id: 'hugoUI.statusIcon.alert', defaultMessage: 'alert' });
        return (
          <ErrorOutlineOutlinedIcon
            role="img"
            aria-label={ariaLabel}
            className={`${TITLE_ROOT_PREFIX}-icon`}
            style={{ color: statusColors.warning }}
            fontSize="inherit"
          />
        );
      default:
        return null;
    }
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
    <ThemeProvider theme={titleTheme}>
      <StyledModalHeader
        className={classnames(`${TITLE_ROOT_PREFIX}-root`, `${TITLE_ROOT_PREFIX}-${type}-header`, {
          [`${TITLE_ROOT_PREFIX}-hasCloseBtn`]: closeable,
        })}
      >
        <DialogTitle id={titleId} className={classnames(`${TITLE_ROOT_PREFIX}-${type}`, className)}>
          {renderIcon()}
          {titleDisp}
        </DialogTitle>
        {renderCloseBtn()}
      </StyledModalHeader>
    </ThemeProvider>
  );
};
