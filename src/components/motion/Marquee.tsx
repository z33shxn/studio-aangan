"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Marquee({ children, className = "", speed = 30 }: { children: ReactNode; className?: string; speed?: number }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className={cn("overflow-hidden flex items-center space-x-8", className)}>
        {children}
      </div>
    );
  }

  return (
    <div className={cn("overflow-hidden flex w-full group", className)}>
      <motion.div
        className="flex whitespace-nowrap items-center space-x-16"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ ease: "linear", duration: speed, repeat: Infinity }}
      >
        <div className="flex items-center space-x-16 shrink-0">{children}</div>
        <div className="flex items-center space-x-16 shrink-0">{children}</div>
      </motion.div>
    </div>
  );
}
