"use client";

import { motion, useInView, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function Counter({ value, suffix = "", className = "" }: { value: number; suffix?: string; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const shouldReduceMotion = useReducedMotion();
  const [hasRun, setHasRun] = useState(false);

  const spring = useSpring(0, {
    stiffness: 50,
    damping: 20,
    mass: 1,
  });

  const display = useTransform(spring, (current) => Math.round(current) + suffix);

  useEffect(() => {
    if (isInView && !hasRun) {
      if (shouldReduceMotion) {
        spring.set(value);
      } else {
        spring.set(value);
      }
      setHasRun(true);
    }
  }, [isInView, hasRun, shouldReduceMotion, spring, value]);

  return (
    <motion.span ref={ref} className={className}>
      {shouldReduceMotion ? value + suffix : display}
    </motion.span>
  );
}
