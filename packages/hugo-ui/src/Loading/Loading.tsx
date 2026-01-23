/* © 2022 Promethean. All Rights Reserved.
 *
 * Unauthorized copying of this file or any part of this file
 * via any medium is strictly prohibited.
 */
import React from 'react';
import classnames from 'classnames';
import { StyledLoading, ROOT_PREFIX } from './loadingStyles';

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
        'icon-loading': true,
        [`${ROOT_PREFIX}-${size}`]: size,
        [className]: className,
      })
    : classnames({
        [ROOT_PREFIX]: true,
        'icon-loading': true,
        [`${ROOT_PREFIX}-${size}`]: size,
      });

  return <StyledLoading className={rootCls} size={resolvedSize} />;
};
