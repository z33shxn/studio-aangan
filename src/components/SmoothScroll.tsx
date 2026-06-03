"use client";

import { ReactLenis } from 'lenis/react'
import { ReactNode, useEffect, useState } from 'react'

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [useLenis, setUseLenis] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    setUseLenis(!reduce && !coarse);
  }, []);

  if (!useLenis) return <>{children}</>;

  return (
    <ReactLenis root options={{ lerp: 0.08 }}>
      {children}
    </ReactLenis>
  )
}
