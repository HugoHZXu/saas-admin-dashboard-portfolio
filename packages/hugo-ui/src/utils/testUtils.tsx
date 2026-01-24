import React, { ReactNode } from 'react';
import { act, render, RenderOptions } from '@testing-library/react';
import { HugoUIProvider } from '../provider/HugoUIProvider';
import { hugoUITheme } from '../styles/theme';
import enMessages from '../lang/en.json';
import mediaQuery, { MediaValues } from 'css-mediaquery';

export const AllTheProviders = ({ children }: { children: ReactNode }) => {
  return (
    <HugoUIProvider theme={hugoUITheme} locale="en" messages={enMessages} fontLoading="none">
      {children}
    </HugoUIProvider>
  );
};

const customRender = (ui: React.ReactElement, options: RenderOptions = {}) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export const createMatchMedia = (values: MediaValues) => {
  return (query: string) => ({
    matches: mediaQuery.match(query, values),
    addListener: () => {},
    removeListener: () => {},
  });
};

export const waitForPromises = async (msToWait = 1) => {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, msToWait));
  });
};

export * from '@testing-library/react';
export { customRender as render };
