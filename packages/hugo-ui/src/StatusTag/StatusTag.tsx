import React from 'react';
import classnames from 'classnames';
import { HugoUIBaseProps } from '../types/base';
import { StyledStatusTag } from './styles/statusTagStyles';
import { HugoUIStatusTagTone, ROOT_PREFIX } from './styles/statusTagTokens';

export type { HugoUIStatusTagTone };

export interface HugoUIStatusTagProps extends HugoUIBaseProps {
  children: React.ReactNode;
  tone?: HugoUIStatusTagTone;
}

export const HugoUIStatusTag = ({
  children,
  className,
  id,
  style,
  tone = 'neutral',
}: HugoUIStatusTagProps) => (
  <StyledStatusTag
    id={id}
    className={classnames(`${ROOT_PREFIX}-root`, `${ROOT_PREFIX}-${tone}`, className)}
    style={style}
  >
    {children}
  </StyledStatusTag>
);
