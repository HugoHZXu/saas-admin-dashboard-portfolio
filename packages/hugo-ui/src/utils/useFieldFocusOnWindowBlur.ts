import { useEffect, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useFieldFocusOnWindowBlur = (setFocusState: (newFocusInfo: any) => void) => {
  const hadClickFocusOnInputBlurRef = useRef<boolean | undefined>(undefined);
  const hadClickFocusOnWindowBlurRef = useRef<boolean | undefined>(undefined);
  const handleWindowBlur = () => {
    hadClickFocusOnWindowBlurRef.current = hadClickFocusOnInputBlurRef.current;
  };
  const handleWindowFocus = () => {
    if (hadClickFocusOnWindowBlurRef.current !== undefined) {
      setFocusState(hadClickFocusOnWindowBlurRef.current);
      hadClickFocusOnWindowBlurRef.current = undefined;
    }
  };
  useEffect(() => {
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);
    return () => {
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
    };
  }, []);

  return hadClickFocusOnInputBlurRef;
};
