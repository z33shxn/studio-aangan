"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function MobileStickyBar() {
  const pathname = usePathname();
  
  if (pathname === "/contact") return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-paper border-t border-brass/20 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] lg:hidden flex gap-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <Link 
        href="/contact" 
        className="flex-1 flex items-center justify-center h-12 bg-ink text-paper text-sm font-medium transition-colors hover:bg-ink/90 active:scale-[0.98]"
      >
        Book consultation
      </Link>
      <a 
        href="https://wa.me/919886041148?text=Hi%20Studio%20Aangan%2C%20I'd%20like%20to%20book%20a%20consultation" 
        target="_blank" 
        rel="noreferrer" 
        className="flex-1 flex items-center justify-center h-12 bg-bone text-ink border border-ink/10 text-sm font-medium transition-colors hover:bg-stone-2/50 active:scale-[0.98]"
      >
        WhatsApp
      </a>
    </div>
  );
}
