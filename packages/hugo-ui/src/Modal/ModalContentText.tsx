import React from 'react';
import { HugoUITypography, HugoUITypographyProps } from '../Typography';

export interface HugoUIModalContentTextProps extends Omit<HugoUITypographyProps, 'variant'> {
  variant?: HugoUITypographyProps['variant'];
}

export const HugoUIModalContentText = (props: HugoUIModalContentTextProps) => {
  return <HugoUITypography variant="body" {...props} />;
};
