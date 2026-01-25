export const isIpadOS = () => {
  try {
    const ua = window.navigator.userAgent.toLowerCase();
    return /(ipad)/.test(ua) || (/macintosh|mac os x/i.test(ua) && navigator.maxTouchPoints > 2);
  } catch (e) {
    return false;
  }
};

export const isAndroidPhone = () => {
  try {
    const ua = window.navigator.userAgent.toLowerCase();
    return !!ua.match(/android/) && !!ua.match(/mobile/);
  } catch (e) {
    return false;
  }
};

export const isPhone = () => {
  try {
    const ua = window.navigator.userAgent.toLowerCase();
    return (
      !!ua.match(/(micromessenger|webbrowser|windows whone|blackberry|ipod|iphone|webos)/) ||
      isAndroidPhone()
    );
  } catch (e) {
    return false;
  }
};

export const isIOS = () => {
  try {
    return !!navigator.userAgent.toLowerCase().match(/(ipod|iphone)/);
  } catch (e) {
    return false;
  }
};

export const isTablet = () => {
  try {
    return (
      /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(
        window.navigator.userAgent.toLowerCase()
      ) || isIpadOS()
    );
  } catch (e) {
    return false;
  }
};

export const isTouchDevices = () => {
  return isPhone() || isTablet();
};

export function isWin() {
  try {
    const userAgent = navigator.userAgent.toLowerCase();
    const windowsPlatforms = /(win32|win64|windows|wince)/i;
    return windowsPlatforms.test(userAgent);
  } catch (e) {
    return false;
  }
}
