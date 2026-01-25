import React, { ReactNode } from 'react';
import { ThemeProvider, createTheme, Theme } from '@mui/material/styles';
import { IntlProvider } from 'react-intl';
import { hugoUITheme } from '../styles/theme';
import { useFont, FontLoadingStrategy } from '../hooks/useFont';
import { HugoUIGlobalStyles } from '../styles/globalStyles';

export type HugoUIProviderProps = {
  children: ReactNode;
  theme?: Theme;
  locale?: string;
  messages?: Record<string, string>;
  fontLoading?: FontLoadingStrategy;
};

export function HugoUIProvider({
  children,
  theme,
  locale = 'en',
  messages = {},
  fontLoading = 'auto',
}: HugoUIProviderProps) {
  const mergedTheme = theme ? createTheme(theme, hugoUITheme) : hugoUITheme;
  useFont(locale, fontLoading);

  return (
    <IntlProvider locale={locale} messages={messages}>
      <ThemeProvider theme={mergedTheme}>
        <HugoUIGlobalStyles />
        {children}
      </ThemeProvider>
    </IntlProvider>
  );
}
