import enMessages from './en';
import zhMessages from './zh';

export type UserManagementLocale = 'en' | 'zh';

const resolveLocale = (locale: string | undefined): UserManagementLocale => {
  if (locale?.toLowerCase().startsWith('zh')) {
    return 'zh';
  }

  return 'en';
};

export const getUserManagementLocale = () => {
  const browserLocale = typeof navigator === 'undefined' ? undefined : navigator.language;

  return resolveLocale(browserLocale);
};

export const getUserManagementMessages = (locale: UserManagementLocale) =>
  locale === 'zh' ? zhMessages : enMessages;
