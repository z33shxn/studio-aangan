"use client";

import { SmartImage as Image } from "@/components/ui/SmartImage";
import { useReducedMotion, motion } from "framer-motion";
import { Parallax } from "@/components/motion/Parallax";

interface AmbientMediaProps {
  src?: string;
  alt?: string;
}

export function AmbientMedia({ src = "/images/misc/404-room.webp", alt = "Ambient background" }: AmbientMediaProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Parallax offset={40} className="w-full h-full relative">
      <motion.div
        className="relative w-full h-full"
        initial={{ scale: 1 }}
        animate={{ scale: shouldReduceMotion ? 1 : 1.08 }}
        transition={{ duration: 15, ease: "easeOut" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </motion.div>
      {/* Film grain / darkening overlay for text contrast */}
      <div className="absolute inset-0 bg-ink/20 mix-blend-multiply" />
      <div className="absolute inset-0 bg-ink/10" />
    </Parallax>
  );
}
