import { renderHook, act } from '@testing-library/react';
import { useFieldFocusOnWindowBlur } from './useFieldFocusOnWindowBlur';

describe('useFieldFocusOnWindowBlur', () => {
  it('restores focus state after window blur/focus', () => {
    const setFocusState = jest.fn();
    const { result } = renderHook(() => useFieldFocusOnWindowBlur(setFocusState));

    result.current.current = true;

    act(() => {
      window.dispatchEvent(new Event('blur'));
      window.dispatchEvent(new Event('focus'));
    });

    expect(setFocusState).toHaveBeenCalledWith(true);
  });
});
