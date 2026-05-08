import { DEMO_ACCOUNT_STORAGE_KEY } from './demoSessionTypes';

const canUseStorage = () => typeof window !== 'undefined' && Boolean(window.localStorage);

export const readStoredAccountId = () => {
  if (!canUseStorage()) {
    return null;
  }

  return window.localStorage.getItem(DEMO_ACCOUNT_STORAGE_KEY);
};

export const writeStoredAccountId = (accountId: string) => {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(DEMO_ACCOUNT_STORAGE_KEY, accountId);
};

export const clearStoredAccountId = () => {
  if (!canUseStorage()) {
    return;
  }

  try {
    window.localStorage.removeItem(DEMO_ACCOUNT_STORAGE_KEY);
  } catch {
    // Browser storage can be disabled. Reset route still redirects to the default session.
  }
};
