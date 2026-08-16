import { useRef, useEffect } from 'react';

/**
 * Custom hook to enable smooth physical touch/finger swiping on mobile web views
 */
export function useTouchSwipe<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      isDragging.current = true;
      startX.current = e.touches[0].pageX - el.offsetLeft;
      scrollLeft.current = el.scrollLeft;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current || e.touches.length !== 1) return;
      const x = e.touches[0].pageX - el.offsetLeft;
      const walk = (x - startX.current) * 1.4; // Responsive touch swipe multiplier
      el.scrollLeft = scrollLeft.current - walk;
    };

    const handleTouchEnd = () => {
      isDragging.current = false;
    };

    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchmove', handleTouchMove, { passive: true });
    el.addEventListener('touchend', handleTouchEnd, { passive: true });
    el.addEventListener('touchcancel', handleTouchEnd, { passive: true });

    return () => {
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
      el.removeEventListener('touchend', handleTouchEnd);
      el.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, []);

  return ref;
}
