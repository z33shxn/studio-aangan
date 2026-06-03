"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import { ReactNode, useEffect, useState, useRef } from "react";
import { DURATION, EASE } from "@/lib/motion";

export function ClipReveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  // Single, consistent trigger: fires when ~20% of the element is in view — on initial load AND on scroll.
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [forceShow, setForceShow] = useState(false);

  // Fail-safe ONLY (never skips the animation): if the observer ever misses, reveal once the
  // element is genuinely on screen. This still plays the clip animation — it does not bypass it.
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
      initial={{ clipPath: "inset(100% 0 0 0)" }}
      animate={show ? { clipPath: "inset(0% 0 0 0)" } : undefined}
      transition={{ duration: DURATION.image, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
