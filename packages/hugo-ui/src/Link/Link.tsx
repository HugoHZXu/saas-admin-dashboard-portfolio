import React from 'react';
import { useIntl } from 'react-intl';
import classnames from 'classnames';
import omit from 'lodash/omit';
import has from 'lodash/has';
import pick from 'lodash/pick';
import { HugoUILoading } from '../Loading/Loading';
import { StyledLink } from './styles/linkStyles';
import { onEnterKeyPress } from '../utils/wcagUtils';

export type HugoUILinkSize = 'small' | 'medium';
export type HugoUILinkMode = 'white' | 'light' | 'dark' | 'error';
export interface HugoUILinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * The content of the link
   */
  children?: React.ReactNode;
  /**
   * The CSS class name of the root element.
   */
  className?: string;
  /**
   * The color scheme of the link text; `white`, `light`, and `dark` are all the colors of the background
   */
  mode?: HugoUILinkMode;
  /**
   * Indicates whether the link is disabled
   */
  disabled?: boolean;
  /**
   * The size of the link
   */
  size?: HugoUILinkSize;
  /**
   * Indicates whether the link is loading/busy
   */
  loading?: boolean;
  /**
   * Allows uses to change the element type of the link; default is `a`
   */
  component?: React.ElementType;
}

type UseLinkAriaLabelProps = Pick<HugoUILinkProps, 'target' | 'aria-label' | 'children'>;

export const useLinkAriaLabel = (props: UseLinkAriaLabelProps) => {
  const intl = useIntl();

  // Support ButtonLink set aria-label = undefined
  const label = has(props, 'aria-label') ? props['aria-label'] : (props.children as string);

  if (!label) {
    return void 0;
  }

  return props.target === '_blank'
    ? intl.formatMessage(
        {
          id: 'hugoUI.accessibility.opensNewPage.label',
          defaultMessage: '{link} (opens in new page)',
        },
        { link: label }
      )
    : label;
};

export const HugoUILink = React.forwardRef<HTMLAnchorElement, HugoUILinkProps>((props, ref) => {
  const {
    children,
    className,
    rel,
    mode = 'white',
    disabled,
    href,
    size = 'medium',
    loading = false,
    onClick,
    onKeyUp,
    tabIndex = 0,
    component = 'a',
    ...otherProps
  } = props;
  const target = otherProps['target'];

  const ariaLabel = useLinkAriaLabel({ ...pick(otherProps, ['target', 'aria-label']), children });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
    onClick?.(e as unknown as React.MouseEvent<HTMLAnchorElement>);
    if (href) {
      target === '_blank' ? window.open(href) : window.location.assign(href);
    }
  };

  return (
    <StyledLink
      ref={ref}
      className={classnames(
        'HugoUILink',
        {
          [`HugoUILink-${size}`]: size,
          'HugoUILink-loading': loading,
          'HugoUILink-disabled': disabled,
          'HugoUILink-button': component === 'button',
        },
        className
      )}
      rel={otherProps.target === '_blank' && !rel ? 'noreferrer' : rel}
      mode={mode}
      href={disabled || loading ? undefined : href}
      tabIndex={loading || disabled ? -1 : tabIndex}
      onClick={disabled || loading ? undefined : onClick}
      onKeyDown={(e) => onEnterKeyPress(e, handleKeyDown)}
      onKeyUp={(e) => {
        // prevents onclick event triggering when tab focus to it
        onKeyUp?.(e);
        e.preventDefault();
      }}
      as={component}
      aria-label={disabled || loading ? undefined : ariaLabel}
      {...omit(otherProps, ['aria-label', 'onKeyUp'])}
    >
      {loading && <HugoUILoading size="small" className="HugoUILink-loadingIcon" />}
      {children}
    </StyledLink>
  );
});
