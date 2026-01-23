import type { Preview } from '@storybook/react';
import { HugoUIProvider, hugoUITheme } from 'hugo-ui';

const preview: Preview = {
  decorators: [
    (Story) => (
      <HugoUIProvider theme={hugoUITheme}>
        <Story />
      </HugoUIProvider>
    ),
  ],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/ } }
  }
};

export default preview;
