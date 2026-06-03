"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ReactNode, useRef } from "react";

export function Parallax({ children, className = "", offset = 50 }: { children: ReactNode; className?: string; offset?: number }) {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  return (
    <div ref={ref} className={`overflow-hidden relative h-full w-full ${className}`}>
      <motion.div style={{ y: shouldReduceMotion ? 0 : y }} className="relative h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}
