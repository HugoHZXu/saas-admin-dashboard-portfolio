import React from 'react';
import type { CardProps } from '@mui/material/Card';
import classnames from 'classnames';
import { DetailCardRoot } from './styles/detailCardStyles';
import { ROOT_PREFIX } from './styles/detailCardTokens';

export type HugoUIDetailCardProps = CardProps & {
  clickable?: boolean;
};

export const HugoUIDetailCard = React.forwardRef<HTMLDivElement, HugoUIDetailCardProps>(
  function HugoUIDetailCard(
    { children, className, clickable, onClick, onKeyDown, role, tabIndex, ...rest },
    ref
  ) {
    const isClickable = Boolean(clickable || onClick);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(event);

      if (event.defaultPrevented || !isClickable || !onClick) {
        return;
      }

      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onClick(event as unknown as React.MouseEvent<HTMLDivElement>);
      }
    };

    return (
      <DetailCardRoot
        {...rest}
        ref={ref}
        className={classnames(
          `${ROOT_PREFIX}-root`,
          {
            [`${ROOT_PREFIX}-clickable`]: isClickable,
          },
          className
        )}
        role={role ?? (isClickable ? 'button' : undefined)}
        tabIndex={tabIndex ?? (isClickable ? 0 : undefined)}
        onClick={onClick}
        onKeyDown={handleKeyDown}
      >
        {children}
      </DetailCardRoot>
    );
  }
);
