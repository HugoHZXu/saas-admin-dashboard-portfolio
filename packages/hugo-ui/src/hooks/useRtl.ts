import { useEffect, useMemo } from 'react';
import type { Direction } from '@mui/material';
import rtlPlugin from 'stylis-plugin-rtl';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';

export const useRtl = (locale: string, rtlLanguageCodes = ['ar', 'he']) => {
  const isRTL = rtlLanguageCodes.includes(locale);
  const dir = (isRTL ? 'rtl' : 'ltr') as Direction;

  const cache = useMemo(
    () =>
      createCache({
        key: isRTL ? 'muirtl' : 'muiltr',
        stylisPlugins: isRTL ? [prefixer, rtlPlugin] : [],
      }),
    [isRTL]
  );

  useEffect(() => {
    document.body.setAttribute('dir', dir);
  }, [dir]);

  return {
    isRTL,
    dir,
    cache,
    transformRTL: <T>(a: T, b: T) => (isRTL ? b : a),
  };
};
