"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export function MobileMenu({ links }: { links: { name: string; href: string }[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div className="lg:hidden flex items-center z-50">
      <button onClick={() => setIsOpen(!isOpen)} className="p-2 -mr-2 text-ink focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brass rounded-full relative z-50" aria-label="Toggle menu">
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="fixed inset-0 bg-paper z-40 flex flex-col pt-24 pb-8 px-6 overflow-y-auto"
          >
            <nav className="flex flex-col space-y-6 mt-8">
              {links.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="font-serif text-4xl lowercase text-ink hover:text-clay transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mt-auto pt-12 space-y-6">
              <div className="text-sm font-medium text-ink/70">
                <p>Studio in Indiranagar, Bengaluru</p>
                <p>hello@studioaangan.in</p>
                <p>+91 80 4710 2200</p>
              </div>
              <div className="flex gap-4">
                <Link href="/contact" className="inline-flex items-center justify-center h-11 px-6 text-sm font-medium bg-ink text-paper transition-colors hover:bg-ink/90">
                  Contact
                </Link>
                <a href="https://wa.me/919886041148?text=Hi%20Studio%20Aangan%2C%20I'd%20like%20to%20book%20a%20consultation" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center h-11 px-6 text-sm font-medium bg-bone text-ink transition-colors hover:bg-stone-2/50">
                  WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
