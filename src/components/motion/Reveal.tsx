"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import { ReactNode, useEffect, useState, useRef } from "react";
import { DURATION, EASE } from "@/lib/motion";

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  // Single, consistent trigger: fires when ~20% of the element is in view — on initial load AND on scroll.
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [forceShow, setForceShow] = useState(false);

  // Fail-safe ONLY (never skips the animation): reveal once the element is genuinely on screen
  // if the observer ever misses. This still plays the fade — it does not bypass it.
  useEffect(() => {
    if (isInView || shouldReduceMotion) return;
    const id = setInterval(() => {
      const r = ref.current?.getBoundingClientRect();
      if (r && r.top < window.innerHeight) setForceShow(true);
    }, 800);
    return () => clearInterval(id);
  }, [isInView, shouldReduceMotion]);

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const show = isInView || forceShow;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={show ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: DURATION.content, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
