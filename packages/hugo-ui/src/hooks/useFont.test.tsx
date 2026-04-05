import React from 'react';
import { render } from '@testing-library/react';
import { __test__ as fontTestUtils, FontLoadingStrategy, useFont } from './useFont';

const removeFontLink = () => {
  const existing = document.getElementById(fontTestUtils.REMOTE_FONT_LINK_ID);
  if (existing) {
    existing.remove();
  }
};

describe('useFont utilities', () => {
  afterEach(() => {
    removeFontLink();
  });

  it('getLocaleKey normalizes locales', () => {
    expect(fontTestUtils.getLocaleKey('ja-JP')).toBe('ja');
    expect(fontTestUtils.getLocaleKey('jp')).toBe('ja');
    expect(fontTestUtils.getLocaleKey('th-TH')).toBe('th');
    expect(fontTestUtils.getLocaleKey('ar')).toBe('ar');
    expect(fontTestUtils.getLocaleKey('en-US')).toBe('en');
  });

  it('ensureRemoteFonts creates link and updates href by locale', () => {
    fontTestUtils.ensureRemoteFonts('ja-JP');
    let link = document.getElementById(fontTestUtils.REMOTE_FONT_LINK_ID) as HTMLLinkElement | null;
    expect(link).toBeTruthy();
    expect(link?.href).toContain('Noto+Sans+JP');

    fontTestUtils.ensureRemoteFonts('en');
    link = document.getElementById(fontTestUtils.REMOTE_FONT_LINK_ID) as HTMLLinkElement | null;
    expect(link).toBeTruthy();
    expect(link?.href).not.toContain('Noto+Sans+JP');
  });

  it('loadLocalFonts returns true for base and locale-specific fonts', async () => {
    await expect(fontTestUtils.loadLocalFonts('en')).resolves.toBe(true);
    await expect(fontTestUtils.loadLocalFonts('ja-JP')).resolves.toBe(true);
    await expect(fontTestUtils.loadLocalFonts('th-TH')).resolves.toBe(true);
    await expect(fontTestUtils.loadLocalFonts('ar')).resolves.toBe(true);
  });

  it('loadLocalFonts returns false on import failure', async () => {
    await new Promise<void>((resolve) => {
      jest.isolateModules(() => {
        jest.doMock('@fontsource/noto-sans/400.css', () => {
          throw new Error('load failed');
        });
        const { __test__ } = require('./useFont') as typeof import('./useFont');
        __test__
          .loadLocalFonts('en')
          .then((loaded) => {
            expect(loaded).toBe(false);
            resolve();
          })
          .catch(resolve);
      });
    });
  });
});

describe('useFont hook', () => {
  afterEach(() => {
    removeFontLink();
  });

  it('runs auto mode on locale changes for special locales', () => {
    const TestComponent = ({
      locale,
      fontLoading,
    }: {
      locale: string;
      fontLoading: FontLoadingStrategy;
    }) => {
      useFont(locale, fontLoading);
      return null;
    };

    const renderResult = render(<TestComponent locale="en" fontLoading="auto" />);
    renderResult.rerender(<TestComponent locale="ja-JP" fontLoading="auto" />);
    renderResult.rerender(<TestComponent locale="th-TH" fontLoading="auto" />);
    renderResult.rerender(<TestComponent locale="ar" fontLoading="auto" />);
  });

  it('runs remote mode without throwing', () => {
    const TestComponent = ({
      locale,
      fontLoading,
    }: {
      locale: string;
      fontLoading: FontLoadingStrategy;
    }) => {
      useFont(locale, fontLoading);
      return null;
    };

    render(<TestComponent locale="en" fontLoading="remote" />);
  });
});
