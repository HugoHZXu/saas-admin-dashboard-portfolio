import React from 'react';
import classnames from 'classnames';
import { StyledLoading } from './styles/loadingStyles';
import { ROOT_PREFIX } from './styles/loadingTokens';

export type HugoUILoadingSize = 'x-small' | 'small' | 'medium' | 'large' | number;
export interface HugoUILoadingProps {
  size?: HugoUILoadingSize;
  className?: string;
}

export const HugoUILoading = ({ size = 'medium', className }: HugoUILoadingProps) => {
  const sizeMap: Record<string, number> = {
    'x-small': 16,
    small: 24,
    medium: 48,
    large: 96,
  };
  const resolvedSize = typeof size === 'number' ? size : sizeMap[size];

  const rootCls = className
    ? classnames({
        [ROOT_PREFIX]: true,
        'HugoUILoading-loadingIcon': true,
        [`${ROOT_PREFIX}-${size}`]: size,
        [className]: className,
      })
    : classnames({
        [ROOT_PREFIX]: true,
        'HugoUILoading-loadingIcon': true,
        [`${ROOT_PREFIX}-${size}`]: size,
      });

  return <StyledLoading className={rootCls} size={resolvedSize} />;
};
