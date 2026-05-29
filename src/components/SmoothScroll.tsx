"use client";

import { ReactLenis } from 'lenis/react'
import { ReactNode, useEffect, useState } from 'react'

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  if (isReducedMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ lerp: 0.08, syncTouch: true }}>
      {children}
    </ReactLenis>
  )
}
