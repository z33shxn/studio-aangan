"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);
      
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { name: "Studio", href: "/studio" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Before/After", href: "/before-after" },
    { name: "Pricing", href: "/pricing" },
    { name: "Journal", href: "/journal" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-40 transition-all duration-300",
        scrolled || !isHome ? "bg-paper border-b border-brass/20 py-4" : "bg-transparent py-6",
        hidden ? "-translate-y-full" : "translate-y-0"
      )}
    >
      <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
        <Link href="/" className="group flex items-baseline gap-2 z-50">
          <span className="font-serif text-3xl lowercase tracking-tight">aangan</span>
          <span className="uppercase tracking-widest text-[10px] font-medium opacity-70 group-hover:opacity-100 transition-opacity">Studio</span>
        </Link>

        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-medium relative group",
                pathname === link.href || pathname.startsWith(link.href + "/") ? "text-ink" : "text-ink/70 hover:text-ink transition-colors"
              )}
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-brass transition-all group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <Link href="/contact" className="inline-flex items-center justify-center h-9 px-4 text-sm font-medium border border-ink/20 text-ink hover:bg-ink hover:text-paper transition-colors">
            Contact
          </Link>
          <Link href="/contact" className="inline-flex items-center justify-center h-9 px-4 text-sm font-medium bg-ink text-paper hover:bg-ink/90 transition-colors">
            Book a consultation
          </Link>
        </div>

        <MobileMenu links={navLinks} />
      </div>
    </header>
  );
}
