"use client";

import React, { useState, useRef, useEffect } from "react";
import { SmartImage as Image } from "@/components/ui/SmartImage";
import { useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { ArrowLeftRight, ImageOff } from "lucide-react";

interface BeforeAfterProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
  className?: string;
}

export function BeforeAfter({
  beforeSrc,
  afterSrc,
  beforeAlt = "Before",
  afterAlt = "After",
  className,
}: BeforeAfterProps) {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [beforeError, setBeforeError] = useState(false);
  const [afterError, setAfterError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const shouldReduceMotion = useReducedMotion();
  const [hintPlayed, setHintPlayed] = useState(false);

  useEffect(() => {
    if (isInView && !hintPlayed && !shouldReduceMotion && !beforeError && !afterError) {
      setHintPlayed(true);
      let step = 0;
      const animate = () => {
        step += 0.05;
        const offset = Math.sin(step) * 10;
        setPosition(50 + offset);
        if (step < Math.PI) {
          requestAnimationFrame(animate);
        } else {
          setPosition(50);
        }
      };
      const timeout = setTimeout(() => requestAnimationFrame(animate), 500);
      return () => clearTimeout(timeout);
    }
  }, [isInView, hintPlayed, shouldReduceMotion, beforeError, afterError]);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (beforeError || afterError) return;
    setIsDragging(true);
    updatePosition(e.clientX);
    if (e.target instanceof Element) {
      e.target.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    if (e.target instanceof Element) {
      e.target.releasePointerCapture(e.pointerId);
    }
  };

  const updatePosition = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPosition((prev) => Math.max(0, prev - 5));
    if (e.key === "ArrowRight") setPosition((prev) => Math.min(100, prev + 5));
  };

  if (beforeError && afterError) {
    return (
      <div className={cn("flex flex-col items-center justify-center w-full aspect-[3/2] bg-bone text-ink/50", className)}>
        <ImageOff className="w-8 h-8 mb-2" />
        <span className="text-xs uppercase tracking-widest">Image unavailable</span>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full aspect-[3/2] overflow-hidden bg-bone cursor-ew-resize select-none group touch-none", className)}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* After image (background) */}
      {!afterError && (
        <Image
          noReveal
          src={afterSrc}
          alt={afterAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 80vw"
          priority
          draggable={false}
          onError={() => setAfterError(true)}
        />
      )}
      
      <div className="absolute top-4 right-4 z-10 px-2 py-1 bg-ink/70 backdrop-blur-sm text-paper text-[10px] uppercase tracking-widest font-medium rounded-sm opacity-100 sm:opacity-0 transition-opacity sm:group-hover:opacity-100 pointer-events-none">
        After
      </div>

      {/* Before image (foreground, clipped) */}
      {!beforeError && (
        <div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image
            noReveal
            src={beforeSrc}
            alt={beforeAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 80vw"
            draggable={false}
            onError={() => setBeforeError(true)}
          />
          <div className="absolute top-4 left-4 px-2 py-1 bg-ink/70 backdrop-blur-sm text-paper text-[10px] uppercase tracking-widest font-medium rounded-sm opacity-100 sm:opacity-0 transition-opacity sm:group-hover:opacity-100 pointer-events-none">
            Before
          </div>
        </div>
      )}

      {/* Handle */}
      {!beforeError && !afterError && (
        <div
          className="absolute inset-y-0 z-30 flex items-center justify-center pointer-events-none"
          style={{ left: `${position}%` }}
        >
          <div className="absolute inset-y-0 w-px bg-paper/80 shadow-[0_0_8px_rgba(0,0,0,0.5)]" />
          <button
            data-testid="ba-handle"
            className="relative flex items-center justify-center w-12 h-12 -ml-6 bg-paper rounded-full shadow-lg border border-brass text-brass focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 transition-transform pointer-events-auto touch-none"
            role="slider"
            aria-valuenow={Math.round(position)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Drag to compare before and after"
            onKeyDown={handleKeyDown}
            title="Drag to compare"
          >
            <ArrowLeftRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
