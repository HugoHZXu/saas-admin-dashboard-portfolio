/* eslint-disable @typescript-eslint/no-explicit-any */
import { useChannel } from '@storybook/addons';
import { UPDATE_GLOBALS } from '@storybook/core-events';
import { hugoUITheme } from 'hugo-ui/styles/theme';
type HugoUIBackgroundThemeType = 'light' | 'dark';

const backgroundColors = {
  light: { name: 'light', value: hugoUITheme.hugoUIColors.NEUTRAL_WHITE },
  dark: { name: 'dark', value: hugoUITheme.hugoUIColors.DARK_PURPLE },
};

export const backgrounds = {
  default: 'light',
  values: [backgroundColors.light, backgroundColors.dark],
};

/* eslint-disable react-hooks/rules-of-hooks */
export const withHugoUIBackgroundTheme = (StoryFn: any) => {
  const emit = useChannel({
    STORY_ARGS_UPDATED: (args: any) => {
      const theme: HugoUIBackgroundThemeType | undefined = args?.args?.theme;
      console.log('[zhe]', args, theme);
      if (theme) {
        emit(UPDATE_GLOBALS, {
          globals: {
            backgrounds: theme === 'dark' ? backgroundColors.dark : backgroundColors.light,
          },
        });
      }
    },
  });
  return StoryFn();
};
