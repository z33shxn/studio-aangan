"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

export function ClipReveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 0 } : { clipPath: "inset(100% 0 0 0)" }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { clipPath: "inset(0% 0 0 0)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
