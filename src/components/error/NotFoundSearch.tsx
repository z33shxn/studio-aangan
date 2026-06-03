"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { SmartImage as Image } from "@/components/ui/SmartImage";
import { Search, ArrowRight, X } from "lucide-react";

import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { posts } from "@/content/posts";

type SearchResult = {
  label: string;
  href: string;
  type: string;
  image?: string;
};

// Build the static index
const searchIndex: SearchResult[] = [
  { label: "Home", href: "/", type: "Page" },
  { label: "Portfolio", href: "/portfolio", type: "Page" },
  { label: "Studio", href: "/studio", type: "Page" },
  { label: "Services", href: "/services", type: "Page" },
  { label: "Journal", href: "/journal", type: "Page" },
  { label: "Contact", href: "/contact", type: "Page" },
  { label: "Pricing Calculator", href: "/pricing", type: "Page" },
  { label: "Before & After", href: "/before-after", type: "Page" },
  ...projects.map(p => ({
    label: p.name,
    href: `/portfolio/${p.slug}`,
    type: "Project",
    image: p.coverImage
  })),
  ...services.map(s => ({
    label: s.name,
    href: `/services/${s.slug}`,
    type: "Service"
  })),
  ...posts.map(p => ({
    label: p.title,
    href: `/journal/${p.slug}`,
    type: "Journal",
    image: p.coverImage
  }))
];

export function NotFoundSearch() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return searchIndex.filter(item => item.type !== "Page").slice(0, 4); // Popular suggestions
    const lowerQuery = query.toLowerCase();
    return searchIndex
      .filter(item => item.label.toLowerCase().includes(lowerQuery) || item.type.toLowerCase().includes(lowerQuery))
      .slice(0, 6);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setQuery("");
      setIsOpen(false);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto md:mx-0 mt-8" ref={containerRef}>
      <div className="relative flex items-center">
        <Search className="absolute left-4 w-5 h-5 text-ink/40" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search projects, articles..."
          aria-label="Search the site"
          className="w-full h-14 pl-12 pr-12 bg-bone border border-stone-2 focus:outline-none focus:ring-2 focus:ring-brass text-ink font-sans text-base"
        />
        {query && (
          <button 
            onClick={() => setQuery("")}
            className="absolute right-4 p-1 text-ink/40 hover:text-ink transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-paper border border-stone-2 shadow-2xl max-h-96 overflow-y-auto z-50 py-2">
          {results.length > 0 ? (
            <div>
              {!query.trim() && (
                <div className="px-4 py-2 text-xs uppercase tracking-widest text-ink/40 font-medium">
                  Suggested
                </div>
              )}
              {results.map((result) => (
                <Link
                  key={`${result.type}-${result.href}`}
                  href={result.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-4 px-4 py-3 hover:bg-bone transition-colors group"
                >
                  {result.image ? (
                    <div className="relative w-12 h-12 bg-stone-2/30 flex-shrink-0 overflow-hidden">
                      <Image 
                        src={result.image} 
                        alt="" 
                        fill 
                        className="object-cover" 
                        sizes="48px"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-stone-2/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-serif text-ink/50">{result.type.charAt(0)}</span>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-ink truncate group-hover:text-brass transition-colors">
                      {result.label}
                    </p>
                    <p className="text-xs text-ink/60">{result.type}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-ink/20 group-hover:text-brass group-hover:-rotate-45 transition-all" />
                </Link>
              ))}
            </div>
          ) : (
            <div className="px-4 py-8 text-center text-sm text-ink/60">
              No results found for "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
