"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Plus, Minus } from "lucide-react";
import type { NavItem } from "./Header";
import { cn } from "@/lib/cn";

function MobileMenuItem({ link, index }: { link: NavItem; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();

  if (link.subLinks) {
    return (
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + index * 0.05 }} className="flex flex-col">
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex justify-between items-center w-full focus-visible:outline-none"
        >
          <span className="font-serif text-4xl lowercase text-ink">{link.name}</span>
          <span className="text-ink p-2 -mr-2">
            {isExpanded ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
          </span>
        </button>
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden flex flex-col"
            >
              <div className="flex flex-col space-y-4 pt-6 pl-4 border-l border-brass/30 ml-2 mb-4">
                {link.subLinks.map(subLink => {
                  const isActive = pathname === subLink.href;
                  return (
                    <Link
                      key={subLink.name}
                      href={subLink.href}
                      className={cn(
                        "font-serif text-2xl lowercase transition-colors",
                        isActive ? "text-brass" : "text-ink/70 hover:text-ink"
                      )}
                    >
                      {subLink.name}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + index * 0.05 }}>
      <Link href={link.href} className={cn("font-serif text-4xl lowercase transition-colors", isActive ? "text-brass" : "text-ink hover:text-clay")}>
        {link.name}
      </Link>
    </motion.div>
  );
}

export function MobileMenu({ links }: { links: NavItem[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  
  useEffect(() => setMounted(true), []);
  useEffect(() => { 
    document.body.style.overflow = isOpen ? "hidden" : ""; 
    return () => { document.body.style.overflow = ""; }; 
  }, [isOpen]);
  useEffect(() => { setIsOpen(false); }, [pathname]);

  return (
    <div className="lg:hidden flex items-center">
      <button onClick={() => setIsOpen(true)} aria-label="Open menu" className="p-2 -mr-2 text-ink relative z-50"><Menu className="w-6 h-6" /></button>
      {mounted && createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-paper z-[60] flex flex-col p-6 overflow-y-auto">
              <div className="flex justify-end">
                <button onClick={() => setIsOpen(false)} aria-label="Close menu" className="p-2 -mr-2 text-ink"><X className="w-6 h-6" /></button>
              </div>
              <nav className="flex flex-col space-y-6 mt-8">
                {links.map((link, i) => (
                  <MobileMenuItem key={link.name} link={link} index={i} />
                ))}
              </nav>
              <div className="mt-auto pt-12 space-y-6">
                <div className="text-sm font-medium text-ink/70">
                  <p>Studio in Indiranagar, Bengaluru</p><p>hello@studioaangan.in</p><p>+91 80 4710 2200</p>
                </div>
                <div className="flex gap-4">
                  <Link href="/contact" className="inline-flex items-center justify-center h-11 px-6 text-sm font-medium bg-ink text-paper">Contact</Link>
                  <a href="https://wa.me/919886041148" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center h-11 px-6 text-sm font-medium bg-bone text-ink">WhatsApp</a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
