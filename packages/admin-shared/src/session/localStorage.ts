import { DEMO_ACCOUNT_STORAGE_KEY } from './types';

const getLocalStorage = () => {
  try {
    return typeof window === 'undefined' ? null : window.localStorage;
  } catch {
    return null;
  }
};

export const readStoredAccountId = () => {
  try {
    return getLocalStorage()?.getItem(DEMO_ACCOUNT_STORAGE_KEY) ?? null;
  } catch {
    return null;
  }
};

export const writeStoredAccountId = (accountId: string) => {
  try {
    getLocalStorage()?.setItem(DEMO_ACCOUNT_STORAGE_KEY, accountId);
  } catch {
    // Browser storage can be blocked; the in-memory store still carries state.
  }
};

export const clearStoredAccountId = () => {
  try {
    getLocalStorage()?.removeItem(DEMO_ACCOUNT_STORAGE_KEY);
  } catch {
    // Browser storage can be blocked; resetting in-memory state remains enough.
  }
};
