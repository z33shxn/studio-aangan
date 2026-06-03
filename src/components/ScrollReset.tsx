"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useLenis } from "lenis/react";

export function ScrollReset() {
  const pathname = usePathname();
  const lenis = useLenis();
  
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) return;
    
    lenis?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
  }, [pathname, lenis]);
  
  return null;
}
