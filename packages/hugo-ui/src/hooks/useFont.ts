import { useEffect, useRef } from 'react';

export type FontLoadingStrategy = 'auto' | 'local' | 'remote' | 'none';

const REMOTE_FONT_LINK_ID = 'hugoUI-remote-fonts';
const BASE_REMOTE_FONT = 'https://fonts.googleapis.com/css2?family=Noto+Sans:wght@200;300;400';
const REMOTE_FONT_BY_LOCALE: Record<string, string> = {
  en: `${BASE_REMOTE_FONT}&display=swap`,
  ja: `${BASE_REMOTE_FONT}&family=Noto+Sans+JP:wght@200;300;400&display=swap`,
  th: `${BASE_REMOTE_FONT}&family=Noto+Sans+Thai:wght@200;300;400&display=swap`,
  ar: `${BASE_REMOTE_FONT}&family=Noto+Sans+Arabic:wght@200;300;400&display=swap`,
};

const getLocaleKey = (locale: string) => {
  const lower = locale.toLowerCase();
  if (lower.startsWith('ja') || lower.startsWith('jp')) {
    return 'ja';
  }
  if (lower.startsWith('th')) {
    return 'th';
  }
  if (lower.startsWith('ar')) {
    return 'ar';
  }
  return 'en';
};

const ensureRemoteFonts = (locale: string) => {
  if (typeof document === 'undefined') {
    return;
  }
  const localeKey = getLocaleKey(locale);
  const href = REMOTE_FONT_BY_LOCALE[localeKey] ?? REMOTE_FONT_BY_LOCALE.en;
  const existing = document.getElementById(REMOTE_FONT_LINK_ID) as HTMLLinkElement | null;
  if (existing) {
    if (existing.href !== href) {
      existing.href = href;
    }
    return;
  }
  const link = document.createElement('link');
  link.id = REMOTE_FONT_LINK_ID;
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
};

const loadLocalFonts = async (locale: string) => {
  try {
    await import('@fontsource/noto-sans/200.css');
    await import('@fontsource/noto-sans/300.css');
    await import('@fontsource/noto-sans/400.css');
    const localeKey = getLocaleKey(locale);
    if (localeKey === 'ja') {
      await import('@fontsource/noto-sans-jp/300.css');
    } else if (localeKey === 'th') {
      await import('@fontsource/noto-sans-thai/300.css');
    } else if (localeKey === 'ar') {
      await import('@fontsource/noto-sans-arabic/300.css');
    }
    return true;
  } catch {
    return false;
  }
};

export const useFont = (locale: string, fontLoading: FontLoadingStrategy) => {
  const prevLocaleKeyRef = useRef<string>(getLocaleKey(locale));

  useEffect(() => {
    if (fontLoading === 'none') {
      return;
    }

    if (fontLoading === 'remote') {
      ensureRemoteFonts(locale);
      return;
    }

    const currentKey = getLocaleKey(locale);
    const prevKey = prevLocaleKeyRef.current;
    const isSpecial = (key: string) => key === 'ja' || key === 'th' || key === 'ar';
    const shouldReload = currentKey !== prevKey && (isSpecial(currentKey) || isSpecial(prevKey));
    prevLocaleKeyRef.current = currentKey;

    if (!shouldReload) {
      return;
    }

    const run = async () => {
      const loadedLocal = await loadLocalFonts(locale);
      if (!loadedLocal && fontLoading === 'auto') {
        ensureRemoteFonts(locale);
      }
    };

    run();
  }, [fontLoading, locale]);
};

export const __test__ = {
  ensureRemoteFonts,
  getLocaleKey,
  loadLocalFonts,
  REMOTE_FONT_LINK_ID,
  REMOTE_FONT_BY_LOCALE,
};
