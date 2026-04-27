import enMessages from './en';
import zhMessages from './zh';

export type OrgManagementLocale = 'en' | 'zh';

const resolveLocale = (locale: string | undefined): OrgManagementLocale => {
  if (locale?.toLowerCase().startsWith('zh')) {
    return 'zh';
  }

  return 'en';
};

export const getOrgManagementLocale = () => {
  const browserLocale = typeof navigator === 'undefined' ? undefined : navigator.language;

  return resolveLocale(browserLocale);
};

export const getOrgManagementMessages = (locale: OrgManagementLocale) =>
  locale === 'zh' ? zhMessages : enMessages;
