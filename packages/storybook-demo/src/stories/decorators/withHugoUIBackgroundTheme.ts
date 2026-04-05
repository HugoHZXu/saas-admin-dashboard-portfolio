import type { Decorator } from '@storybook/react';
import { hugoUITheme } from 'hugo-ui/styles/theme';

const backgroundColors = {
  light: { name: 'light', value: hugoUITheme.hugoUIColors.NEUTRAL_WHITE },
  dark: { name: 'dark', value: hugoUITheme.hugoUIColors.DARK_PURPLE },
};

export const backgrounds = {
  default: 'light',
  values: [backgroundColors.light, backgroundColors.dark],
};

export const withHugoUIBackgroundTheme: Decorator = (Story) => {
  return Story();
};
