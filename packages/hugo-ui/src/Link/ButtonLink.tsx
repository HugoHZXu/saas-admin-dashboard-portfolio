import React from 'react';
import classnames from 'classnames';
import omit from 'lodash/omit';
import pick from 'lodash/pick';
import { HugoUILink, HugoUILinkProps, useLinkAriaLabel } from './Link';
import { StyledLinkButton } from './linkStyles';
import { onEnterKeyPress } from '../utils/wcagUtils';

export interface HugoUIButtonLinkProps extends Omit<HugoUILinkProps, 'href' | 'hrefLang' | 'rel'> {
  iconName?: string;
}

export const HugoUIButtonLink = ({
  iconName,
  onClick,
  children,
  ...otherProps
}: HugoUIButtonLinkProps) => {
  const { mode = 'white', size = 'medium', loading, disabled } = otherProps;

  const ariaLabel = useLinkAriaLabel({ ...pick(otherProps, ['target', 'aria-label']), children });

  return iconName ? (
    <StyledLinkButton
      role="button"
      mode={mode}
      size={size}
      className={classnames('HugoUIButtonLink', { 'HugoUIButtonLink-disabled': disabled })}
      tabIndex={0}
      onClick={
        disabled || loading
          ? undefined
          : (e: React.MouseEvent<HTMLSpanElement>) =>
              onClick?.(e as unknown as React.MouseEvent<HTMLAnchorElement>)
      }
      onKeyDown={(e) =>
        onEnterKeyPress(e, () => onClick?.(e as unknown as React.MouseEvent<HTMLAnchorElement>))
      }
      aria-label={ariaLabel}
      {...omit(otherProps, ['aria-label'])}
    >
      {!loading && <span className={classnames('HugoUIButtonLink-icon', iconName)} />}
      <HugoUILink tabIndex={-1} role="none" aria-label={undefined} {...otherProps} onClick={void 0}>
        {children}
      </HugoUILink>
    </StyledLinkButton>
  ) : (
    <HugoUILink onClick={onClick} href={void 0} component="button" {...otherProps}>
      {children}
    </HugoUILink>
  );
};
