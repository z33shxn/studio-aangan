"use client";

import { motion, useInView, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function Counter({ value, suffix = "", className = "" }: { value: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const shouldReduceMotion = useReducedMotion();
  const [hasRun, setHasRun] = useState(false);

  const spring = useSpring(0, {
    stiffness: 30,
    damping: 25,
    mass: 1.2,
  });

  const display = useTransform(spring, (current) => Math.round(current) + suffix);

  useEffect(() => {
    if (isInView && !hasRun) {
      spring.set(value);
      setHasRun(true);
    }
  }, [isInView, hasRun, spring, value]);

  useEffect(() => {
    if (hasRun) return;

    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      if (rect.top < window.innerHeight * 1.2) {
        spring.set(value);
        setHasRun(true);
        return;
      }
    }

    const interval = setInterval(() => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          spring.set(value);
          setHasRun(true);
        }
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [hasRun, spring, value]);

  return (
    <motion.span ref={ref} className={className}>
      {shouldReduceMotion ? value + suffix : display}
    </motion.span>
  );
}
