export const PATH_PARAMS = {
  USER_DETAIL: 'users/detail/:userId',
  ACTIVITY_LOG: 'activity-log',
} as const;

export const getUserDetailPath = (userId: string) => `users/detail/${userId}`;
