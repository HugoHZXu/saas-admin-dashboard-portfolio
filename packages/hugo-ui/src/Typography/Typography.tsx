import React from 'react';
import Typography, { TypographyProps } from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import classnames from 'classnames';
import { createTypographyTheme, ROOT_PREFIX } from './typographyStyles';
import type { ElementType } from 'react';

const EXCLUDED_VARIANTS = [
  'subtitleC',
  'subtitleD',
  'body',
  'bodyLink',
  'button1',
  'button2',
  'button2Uppercase',
  'button1Uppercase',
  'small',
  'smallUppercase',
  'eyebrow',
  'eyebrowUppercase',
];

export type HugoUITypographyVariantType =
  | 'headerA'
  | 'headerB'
  | 'headerC'
  | 'headerD'
  | 'headerE'
  | 'subtitleA'
  | 'subtitleB'
  | 'subtitleC'
  | 'subtitleD'
  | 'body'
  | 'bodyLink'
  | 'button1'
  | 'button1Uppercase'
  | 'button2'
  | 'button2Uppercase'
  | 'small'
  | 'smallUppercase'
  | 'eyebrow'
  | 'eyebrowUppercase';

export interface HugoUITypographyProps extends Omit<TypographyProps, 'variant'> {
  componentType?: ElementType;
  /** Starting `v1.3.0` these variants map to HugoUI design styles.
   *  * h1 => headerA
   *  * h2 => headerB
   *  * h3 => headerC
   *  * h4 => headerD
   *  * h5 => headerE
   *  * subtitle1 => subtitleA
   *  * subtitle2 => subtitleB
   *  * subtitle3 => subtitleC
   *  * subtitle4 => subtitleD */
  variant: HugoUITypographyVariantType;
}

export const HugoUITypography = ({
  variant,
  className,
  componentType,
  ...props
}: HugoUITypographyProps) => {
  const hugoUIVariantMapping = {
    headerA: 'h1',
    headerB: 'h2',
    headerC: 'h3',
    headerD: 'h4',
    headerE: 'h5',
    subtitleA: 'h6',
    subtitleB: 'h6',
    body1: 'p',
    body2: 'p',
    inherit: 'p',
  };

  const mapVariant = (variant: HugoUITypographyVariantType) => {
    switch (variant) {
      case 'headerA':
        return 'h1';
      case 'headerB':
        return 'h2';
      case 'headerC':
        return 'h3';
      case 'headerD':
        return 'h4';
      case 'headerE':
        return 'h5';
      case 'subtitleA':
        return 'subtitle1';
      case 'subtitleB':
        return 'subtitle2';
      case 'subtitleC':
        return 'subtitle3';
      case 'subtitleD':
        return 'subtitle4';
      default:
        return variant;
    }
  };

  const mappedVariant = mapVariant(variant);
  const _variant = !EXCLUDED_VARIANTS.includes(variant) ? mappedVariant : 'inherit';

  return (
    <ThemeProvider theme={createTypographyTheme(componentType)}>
      <Typography
        {...props}
        variant={_variant as TypographyProps['variant']}
        className={classnames(
          'HugoUITypography-root',
          { [`${ROOT_PREFIX}-${mappedVariant}`]: mappedVariant },
          className
        )}
        variantMapping={hugoUIVariantMapping}
      />
    </ThemeProvider>
  );
};
