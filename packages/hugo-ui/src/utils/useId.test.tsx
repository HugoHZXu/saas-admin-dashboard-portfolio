import { renderHook } from '@testing-library/react';
import { useId } from './useId';

jest.mock('@mui/utils/useId', () => ({
  __esModule: true,
  default: () => ':r1:',
}));

describe('useId', () => {
  it('returns provided id', () => {
    const { result } = renderHook(() => useId('CustomId'));
    expect(result.current).toBe('CustomId');
  });

  it('prefixes generated id', () => {
    const { result } = renderHook(() => useId());
    expect(result.current).toBe('HugoUI-r1');
  });
});
