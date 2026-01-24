import {
  isAndroidPhone,
  isIpadOS,
  isIOS,
  isPhone,
  isTablet,
  isTouchDevices,
  isWin,
} from './platformUtils';

const setUserAgent = (value: string) => {
  Object.defineProperty(window.navigator, 'userAgent', {
    value,
    configurable: true,
  });
};

const setMaxTouchPoints = (value: number) => {
  Object.defineProperty(window.navigator, 'maxTouchPoints', {
    value,
    configurable: true,
  });
};

describe('platformUtils', () => {
  const originalUserAgent = window.navigator.userAgent;
  const originalMaxTouchPoints = window.navigator.maxTouchPoints;

  afterEach(() => {
    setUserAgent(originalUserAgent);
    setMaxTouchPoints(originalMaxTouchPoints);
  });

  it('detects iPadOS via macintosh + touch points', () => {
    setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)');
    setMaxTouchPoints(5);
    expect(isIpadOS()).toBe(true);
  });

  it('detects android phone', () => {
    setUserAgent('Mozilla/5.0 (Linux; Android 10; Mobile)');
    expect(isAndroidPhone()).toBe(true);
  });

  it('detects iOS phone', () => {
    setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X)');
    expect(isIOS()).toBe(true);
    expect(isPhone()).toBe(true);
  });

  it('detects tablet', () => {
    setUserAgent('Mozilla/5.0 (Linux; Android 10; Tablet)');
    expect(isTablet()).toBe(true);
  });

  it('detects touch devices', () => {
    setUserAgent('Mozilla/5.0 (Linux; Android 10; Mobile)');
    expect(isTouchDevices()).toBe(true);
  });

  it('detects windows', () => {
    setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64)');
    expect(isWin()).toBe(true);
  });
});
