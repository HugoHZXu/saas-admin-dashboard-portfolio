import React, { ReactNode } from 'react';
import { ThemeProvider, createTheme, Theme } from '@mui/material/styles';
import { IntlProvider } from 'react-intl';
import { hugoUITheme } from '../styles/theme';

export type HugoUIProviderProps = {
  children: ReactNode;
  theme?: Theme;
  locale?: string;
  messages?: Record<string, string>;
};

export function HugoUIProvider({
  children,
  theme,
  locale = 'en',
  messages = {},
}: HugoUIProviderProps) {
  const mergedTheme = theme ? createTheme(theme, hugoUITheme) : hugoUITheme;
  return (
    <IntlProvider locale={locale} messages={messages}>
      <ThemeProvider theme={mergedTheme}>{children}</ThemeProvider>
    </IntlProvider>
  );
}
