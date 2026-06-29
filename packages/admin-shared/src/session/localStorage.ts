import {
  DEMO_ACCOUNT_STORAGE_KEY,
  IDENTITY_ACCESS_TOKEN_EXPIRES_AT_STORAGE_KEY,
  IDENTITY_ACCESS_TOKEN_STORAGE_KEY,
} from './types';

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

const isExpired = (expiresAt: string | null) => {
  if (!expiresAt) {
    return true;
  }

  const expiresAtTime = Date.parse(expiresAt);

  return Number.isNaN(expiresAtTime) || expiresAtTime <= Date.now();
};

export const readStoredIdentityAccessToken = () => {
  try {
    const storage = getLocalStorage();
    const accessToken = storage?.getItem(IDENTITY_ACCESS_TOKEN_STORAGE_KEY) ?? null;
    const expiresAt = storage?.getItem(IDENTITY_ACCESS_TOKEN_EXPIRES_AT_STORAGE_KEY) ?? null;

    if (!accessToken || isExpired(expiresAt)) {
      return null;
    }

    return accessToken;
  } catch {
    return null;
  }
};

export const writeStoredIdentityToken = ({
  accessToken,
  expiresAt,
}: {
  accessToken: string;
  expiresAt: string;
}) => {
  try {
    const storage = getLocalStorage();
    storage?.setItem(IDENTITY_ACCESS_TOKEN_STORAGE_KEY, accessToken);
    storage?.setItem(IDENTITY_ACCESS_TOKEN_EXPIRES_AT_STORAGE_KEY, expiresAt);
  } catch {
    // Browser storage can be blocked; the in-memory session still carries the token.
  }
};

export const clearStoredIdentityToken = () => {
  try {
    const storage = getLocalStorage();
    storage?.removeItem(IDENTITY_ACCESS_TOKEN_STORAGE_KEY);
    storage?.removeItem(IDENTITY_ACCESS_TOKEN_EXPIRES_AT_STORAGE_KEY);
  } catch {
    // Browser storage can be blocked; clearing in-memory state remains enough.
  }
};
