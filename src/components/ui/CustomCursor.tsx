"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [label, setLabel] = useState("");
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setHidden(true);
      return;
    }
    
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsReducedMotion(true);
      setHidden(true);
      return;
    }

    const addEventListeners = () => {
      document.addEventListener("mousemove", mMove);
      document.addEventListener("mouseenter", mEnter);
      document.addEventListener("mouseleave", mLeave);
      document.addEventListener("mousedown", mDown);
      document.addEventListener("mouseup", mUp);
    };

    const removeEventListeners = () => {
      document.removeEventListener("mousemove", mMove);
      document.removeEventListener("mouseenter", mEnter);
      document.removeEventListener("mouseleave", mLeave);
      document.removeEventListener("mousedown", mDown);
      document.removeEventListener("mouseup", mUp);
    };

    const mMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      const clickable = target.closest("a") || target.closest("button") || target.closest("[role='button']") || target.closest("[role='slider']");
      setLinkHovered(!!clickable);
      
      const cursorTarget = target.closest("[data-cursor]");
      if (cursorTarget) {
        setLabel(cursorTarget.getAttribute("data-cursor") || "");
      } else {
        setLabel("");
      }
    };

    const mLeave = () => setHidden(true);
    const mEnter = () => setHidden(false);
    const mDown = () => setClicked(true);
    const mUp = () => setClicked(false);

    addEventListeners();
    return () => removeEventListeners();
  }, []);

  if (hidden || isReducedMotion) return null;

  return (
    <motion.div
      className={cn(
        "pointer-events-none fixed top-0 left-0 z-50 flex items-center justify-center rounded-full transition-colors",
        label ? "bg-brass text-paper border-none" : "border border-brass bg-transparent",
        !label && linkHovered ? "bg-brass/10 border-brass" : ""
      )}
      animate={{
        x: position.x - (label ? 32 : 16),
        y: position.y - (label ? 32 : 16),
        width: label ? 64 : 32,
        height: label ? 64 : 32,
        scale: clicked ? 0.9 : linkHovered && !label ? 1.5 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 28,
        mass: 0.5,
      }}
    >
      {label && <span className="text-[10px] uppercase tracking-widest font-medium whitespace-nowrap">{label}</span>}
    </motion.div>
  );
}
