import React from 'react';
import { act, render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import mediaQuery, { MediaValues } from 'css-mediaquery';

const theme = createTheme({});

export const AllTheProviders = ({ children }: any) => {
  return (
    <IntlProvider locale="en">
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </IntlProvider>
  );
};

const customRender = (ui: any, options: any = {}) =>
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
