'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * useScrollReveal — Returns a ref and a `visible` boolean.
 * When the element enters the viewport, `visible` becomes true.
 * 
 * @param {Object} options
 * @param {string} options.threshold - Intersection threshold (0-1)
 * @param {string} options.rootMargin - Trigger offset
 */
export function useScrollReveal({ threshold = 0.15, rootMargin = '0px 0px -60px 0px' } = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el); // Only trigger once
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, visible };
}
