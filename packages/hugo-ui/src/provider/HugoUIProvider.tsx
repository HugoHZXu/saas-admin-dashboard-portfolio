import React, { ReactNode } from 'react';
import { ThemeProvider, createTheme, Theme } from '@mui/material/styles';
import { IntlProvider } from 'react-intl';
import { hugoUITheme } from '../styles/theme';
import { useFont, FontLoadingStrategy } from '../hooks/useFont';
import { useRtl } from '../hooks/useRtl';
import { CacheProvider } from '@emotion/react';
import { HugoUIGlobalStyles } from '../styles/globalStyles';

export type HugoUIProviderProps = {
  children: ReactNode;
  theme?: Theme;
  locale?: string;
  messages?: Record<string, string>;
  fontLoading?: FontLoadingStrategy;
  rtlLanguageCodes?: string[];
};

export function HugoUIProvider({
  children,
  theme,
  locale = 'en',
  messages = {},
  fontLoading = 'auto',
  rtlLanguageCodes,
}: HugoUIProviderProps) {
  const { dir, cache } = useRtl(locale, rtlLanguageCodes);
  const baseTheme = theme ? createTheme(theme, hugoUITheme) : hugoUITheme;
  const mergedTheme = createTheme(baseTheme, { direction: dir });
  useFont(locale, fontLoading);

  return (
    <IntlProvider locale={locale} messages={messages}>
      <CacheProvider value={cache}>
        <ThemeProvider theme={mergedTheme}>
          <HugoUIGlobalStyles />
          {children}
        </ThemeProvider>
      </CacheProvider>
    </IntlProvider>
  );
}
