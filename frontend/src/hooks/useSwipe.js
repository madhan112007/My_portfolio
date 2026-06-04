import { useRef, useCallback } from 'react';

export const useSwipe = (onSwipeLeft, onSwipeRight, threshold = 60) => {
  const startX = useRef(null);

  const onTouchStart = useCallback((e) => {
    startX.current = e.touches[0].clientX;
  }, []);

  const onTouchEnd = useCallback((e) => {
    if (startX.current === null) return;
    const delta = e.changedTouches[0].clientX - startX.current;
    if (delta < -threshold) onSwipeLeft?.();
    else if (delta > threshold) onSwipeRight?.();
    startX.current = null;
  }, [onSwipeLeft, onSwipeRight, threshold]);

  return { onTouchStart, onTouchEnd };
};
