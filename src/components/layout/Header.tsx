"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { MobileMenu } from "./MobileMenu";
import { ChevronDown } from "lucide-react";

export type NavItem = {
  name: string;
  href: string;
  subLinks?: { name: string; href: string }[];
};

export const navLinks: NavItem[] = [
  {
    name: "Studio",
    href: "/studio",
    subLinks: [
      { name: "About", href: "/studio" },
      { name: "Team", href: "/team" },
      { name: "Process", href: "/process" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" },
    ],
  },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Locations", href: "/locations" },
  { name: "Pricing", href: "/pricing" },
  { name: "Journal", href: "/journal" },
  { name: "FAQ", href: "/faq" },
];

function DesktopDropdown({ link, pathname }: { link: NavItem; pathname: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  // Close on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isActive = pathname === link.href || pathname.startsWith(link.href + "/");

  return (
    <div className="relative group/dropdown" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className={cn(
          "flex items-center gap-1 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-4 focus-visible:ring-offset-paper",
          isActive ? "text-ink" : "text-ink/70 hover:text-ink transition-colors"
        )}
      >
        {link.name}
        <ChevronDown className={cn("w-3 h-3 transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-4 w-48 bg-paper border border-stone-2 shadow-2xl py-2 flex flex-col z-50">
          {link.subLinks?.map((subLink) => (
            <Link
              key={subLink.name}
              href={subLink.href}
              className="px-6 py-2 text-sm text-ink/70 hover:text-ink hover:bg-bone transition-colors focus-visible:outline-none focus-visible:bg-bone focus-visible:text-ink"
            >
              {subLink.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isLeafPage = ["/portfolio/", "/services/", "/journal/", "/locations/"].some(prefix => pathname.startsWith(prefix) && pathname !== prefix.slice(0, -1));
  const isTransparent = isHome || isLeafPage;

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

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-40 transition-all duration-300",
        scrolled || !isTransparent ? "bg-paper border-b border-brass/20 py-4" : "bg-transparent py-6",
        hidden ? "-translate-y-full" : "translate-y-0"
      )}
    >
      <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
        <Link href="/" className="group flex items-baseline gap-2 z-50">
          <span className="font-serif text-3xl lowercase tracking-tight">aangan</span>
          <span className="uppercase tracking-widest text-[10px] font-medium opacity-70 group-hover:opacity-100 transition-opacity">Studio</span>
        </Link>

        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => {
            if (link.subLinks) {
              return <DesktopDropdown key={link.name} link={link} pathname={pathname} />;
            }
            
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm font-medium relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-4 focus-visible:ring-offset-paper",
                  isActive ? "text-ink" : "text-ink/70 hover:text-ink transition-colors"
                )}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-brass transition-all group-hover:w-full" />
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <Link href="/contact" className="inline-flex items-center justify-center h-9 px-4 text-sm font-medium border border-ink/20 text-ink hover:bg-ink hover:text-paper transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2">
            Contact
          </Link>
          <Link href="/contact" className="inline-flex items-center justify-center h-9 px-4 text-sm font-medium bg-ink text-paper hover:bg-ink/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2">
            Book a consultation
          </Link>
        </div>

        <MobileMenu links={navLinks} />
      </div>
    </header>
  );
}
