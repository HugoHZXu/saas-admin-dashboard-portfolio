import React from 'react';
import classnames from 'classnames';
import { visuallyHidden } from '@mui/utils';
import { HugoUITypography } from '../Typography';
import { StyledMessage } from './styles/messageStyles';
import { ROOT_PREFIX } from './styles/messageTokens';
import { HugoUIBaseProps } from '../types/base';
import { onEnterKeyPress } from '../utils/wcagUtils';
import { useIntl } from 'react-intl';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import type { ElementType } from 'react';

export type HugoUIMessageAlign = 'left' | 'center';
export type HugoUIMessageType = 'error' | 'success' | 'destructiveSuccess' | 'alert';
export type HugoUIMessageSize = 'small' | 'medium' | 'large';

export interface HugoUIMessageProps extends HugoUIBaseProps {
  children: React.ReactNode;
  /**
   * The status type of the message; determines the color scheme
   */
  type: HugoUIMessageType;
  /**
   * The alignment of the text
   */
  align?: HugoUIMessageAlign;
  /**
   * The size variant for spacing and layout
   */
  size?: HugoUIMessageSize;
  /**
   * Indicates whether the main message text is a title
   * Header messages are destinguished by use of the TEXT_HEADER color
   */
  isHeader?: boolean;
  /**
   * Indicates whether the message appears inline on the page
   */
  inline?: boolean;
  /**
   * Callback function when the close (X) button is pressed
   * @returns void
   */
  onClose?: () => void;
  /**
   * Additional body text of the message; cannot be used with inline
   */
  extraText?: React.ReactNode;
  /**
   * The component type of the extra text, is something else other than `p`
   */
  extraTextComponentType?: ElementType;
  /**
   * The aria props for the icon in HugoUIStatusIcon
   */
  iconAriaProps?: React.AriaAttributes;
  /**
   * The role prop for the icon in HugoUIStatusIcon
   */
  iconRole?: React.AriaRole;
  /**
   * The aria-label for the close icon
   */
  closeIconAriaLabel?: React.AriaAttributes['aria-label'];
  /**
   * Some cases that the screen reader messages are not needed
   */
  hideScreenReaderMessage?: boolean;
  tabIndex?: number;
}

export const HugoUIMessage = ({
  type,
  children,
  className,
  align = 'left',
  extraText,
  extraTextComponentType,
  isHeader = false,
  inline = false,
  onClose,
  style,
  tabIndex,
  closeIconAriaLabel,
  iconAriaProps,
  iconRole,
  hideScreenReaderMessage,
  ...props
}: HugoUIMessageProps) => {
  const intl = useIntl();
  const size = props.size ?? 'medium';

  let extraMessage;
  if (extraText) {
    extraMessage = (
      <HugoUITypography
        variant="body"
        componentType={extraTextComponentType}
        className={'HugoUIMessage-extraText'}
      >
        {extraText}
      </HugoUITypography>
    );
  }

  let closeBtn;
  if (inline && (type === 'success' || type === 'destructiveSuccess') && onClose) {
    closeBtn = (
      <div
        role="button"
        className={`${ROOT_PREFIX}-close`}
        tabIndex={tabIndex ?? 0}
        aria-label={
          closeIconAriaLabel ??
          intl.formatMessage({ id: 'hugoUI.iconLabel.close', defaultMessage: 'close' })
        }
        onClick={onClose}
        onKeyDown={(e) => onEnterKeyPress(e, onClose)}
      >
        <span className="icon-close" />
      </div>
    );
  }

  let iconLabel;
  switch (type) {
    case 'success':
    case 'destructiveSuccess':
      iconLabel = intl.formatMessage({
        id: 'hugoUI.statusIcon.success',
        defaultMessage: 'success',
      });
      break;
    case 'error':
      iconLabel = intl.formatMessage({ id: 'hugoUI.statusIcon.error', defaultMessage: 'error' });
      break;
    case 'alert':
      iconLabel = intl.formatMessage({ id: 'hugoUI.statusIcon.alert', defaultMessage: 'alert' });
      break;
    default:
      break;
  }

  const textContent = (elem: React.ReactNode): string => {
    if (!elem) {
      return '';
    }
    if (typeof elem === 'string') {
      return elem;
    }
    if (!React.isValidElement(elem)) {
      return '';
    }

    const children = (elem.props as { children?: React.ReactNode } | undefined)?.children;
    if (children instanceof Array) {
      return children.map(textContent).join(' ');
    }
    return textContent(children);
  };

  const _iconAriaProps = iconAriaProps
    ? {
        ...iconAriaProps,
        'aria-label':
          iconAriaProps['aria-label'] !== undefined ? iconAriaProps['aria-label'] : iconLabel,
      }
    : {
        'aria-label': iconLabel,
      };

  const isSuccess = type === 'success' || type === 'destructiveSuccess';
  const StatusIcon = isSuccess ? CheckCircleIcon : ErrorIcon;
  const statusSpacing = size === 'large' ? 8 : 4;

  return (
    <StyledMessage
      className={classnames(
        `${ROOT_PREFIX}-root`,
        `${ROOT_PREFIX}-${type}`,
        `${ROOT_PREFIX}-${align}`,
        `${ROOT_PREFIX}-${size}`,
        {
          [`${ROOT_PREFIX}-inline`]: inline,
          [`${ROOT_PREFIX}-hasClose`]: !!closeBtn,
          [`${ROOT_PREFIX}-hasExtraText`]: !!extraMessage && !inline,
        },
        className
      )}
      style={style}
    >
      {!hideScreenReaderMessage && (
        <div
          className="HugoUIMessage-sr-only"
          style={visuallyHidden}
          role="alert"
          aria-atomic="true"
        >
          {`${iconLabel} ${textContent(children as React.ReactElement)} ${
            extraMessage ? textContent(extraMessage) : ''
          }`}
        </div>
      )}
      <div
        className={classnames('HugoUIStatusIcon', {
          [`${ROOT_PREFIX}-header`]: isHeader || extraText,
        })}
      >
        <span
          className="HugoUIStatusIcon-icon"
          style={{ marginRight: statusSpacing }}
          role={iconRole ?? 'img'}
          {..._iconAriaProps}
        >
          <StatusIcon fontSize="small" />
        </span>
        <span className="HugoUIStatusIcon-text">{children}</span>
      </div>
      {closeBtn}
      {!inline && extraMessage}
    </StyledMessage>
  );
};
