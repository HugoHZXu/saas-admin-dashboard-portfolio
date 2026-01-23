import _useId from '@mui/utils/useId';

export const useId = (id = '') => {
  const defaultId = _useId();
  return id || `HugoUI-${defaultId?.slice(1, defaultId.length - 1)}`;
};
