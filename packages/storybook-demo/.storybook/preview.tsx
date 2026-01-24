import type { Preview } from '@storybook/react';
import { HugoUIProvider, hugoUITheme } from 'hugo-ui';
import { expect } from '@storybook/test';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

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
