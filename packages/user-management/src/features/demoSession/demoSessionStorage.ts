export const DEMO_ACCOUNT_STORAGE_KEY = 'adminDashboard.demoAccountUserId';

export const readStoredAccountId = () => {
  try {
    return window.localStorage.getItem(DEMO_ACCOUNT_STORAGE_KEY);
  } catch {
    return null;
  }
};

export const writeStoredAccountId = (accountId: string) => {
  try {
    window.localStorage.setItem(DEMO_ACCOUNT_STORAGE_KEY, accountId);
  } catch {
    // Browser storage can be disabled. The in-memory state still updates for this tab.
  }
};

export const clearStoredAccountId = () => {
  try {
    window.localStorage.removeItem(DEMO_ACCOUNT_STORAGE_KEY);
  } catch {
    // Browser storage can be disabled. Reset route still redirects to the default session.
  }
};
