import type { Preview } from '@storybook/react';
import { Title, Description, Primary, Controls } from '@storybook/addon-docs/blocks';
import 'hugo-ui-shadcn/styles.css';
import { HugoUIProvider, hugoUITheme } from 'hugo-ui';
import enMessages from '../../hugo-ui/src/lang/en.json';
import zhMessages from '../../hugo-ui/src/lang/zh.json';
import arMessages from '../../hugo-ui/src/lang/ar.json';
import { expect } from 'storybook/test';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

const locales = {
  en: { title: 'English', left: 'EN', right: 'EN' },
  zh: { title: '中文', left: '中文', right: '中' },
  ar: { title: 'Arabic', left: 'AR', right: 'AR' },
};

const messagesByLocale = {
  en: enMessages,
  zh: zhMessages,
  ar: arMessages,
};

const preview: Preview = {
  decorators: [
    (Story, context) => {
      const locale = (context.globals.locale as keyof typeof messagesByLocale) ?? 'en';
      const messages = messagesByLocale[locale] ?? enMessages;
      return (
        <HugoUIProvider theme={hugoUITheme} locale={locale} messages={messages}>
          <Story />
        </HugoUIProvider>
      );
    },
  ],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/ } },
    docs: {
      page: () => (
        <>
          <Title />
          <Description />
          <Primary />
          <Controls />
        </>
      ),
    },
  },
  globalTypes: {
    locale: {
      name: 'Locale',
      description: 'Internationalization locale',
      defaultValue: 'en',
      toolbar: {
        icon: 'globe',
        items: Object.entries(locales).map(([value, item]) => ({
          value,
          title: item.title,
          left: item.left,
          right: item.right,
        })),
      },
    },
  },
};

export default preview;
