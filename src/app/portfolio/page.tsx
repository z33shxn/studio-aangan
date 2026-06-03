"use client";

import { useState } from "react";
import { projects } from "@/content/projects";
import { Reveal } from "@/components/motion/Reveal";
import { SmartImage as Image } from "@/components/ui/SmartImage";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeCity, setActiveCity] = useState("All");

  const categories = ["All", "Apartment", "Villa", "Commercial", "Kitchen", "Hospitality"];
  const cities = ["All", ...Array.from(new Set(projects.map(p => p.city)))];

  const filteredProjects = projects.filter(project => {
    const matchesCategory = activeCategory === "All" || project.category === activeCategory;
    const matchesCity = activeCity === "All" || project.city === activeCity;
    return matchesCategory && matchesCity;
  });

  return (
    <div className="flex flex-col min-h-screen pt-40 pb-32">
      <div className="container mx-auto px-6 max-w-7xl">
        <Reveal>
          <h1 className="font-serif text-5xl md:text-7xl mb-8">Selected Works</h1>
          <p className="text-xl md:text-2xl text-ink/70 max-w-3xl leading-relaxed mb-16">
            Spaces designed for slow living, meaningful connections, and an enduring sense of calm.
          </p>
        </Reveal>

        {/* Filters */}
        <Reveal delay={0.1} className="flex flex-col md:flex-row gap-8 md:items-center justify-between mb-16 border-b border-ink/10 pb-8">
          <div className="flex-1 overflow-x-auto pb-4 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0 hide-scrollbar">
            <div className="flex gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "whitespace-nowrap px-4 py-2 rounded-full text-sm transition-colors min-h-[44px]",
                    activeCategory === cat ? "bg-ink text-paper" : "bg-bone hover:bg-ink/10 text-ink/70"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <span className="text-xs uppercase tracking-widest text-ink/50 font-medium">City:</span>
            <select 
              value={activeCity} 
              onChange={(e) => setActiveCity(e.target.value)}
              className="bg-transparent border-b border-stone-2 pb-1 text-sm focus:outline-none focus:border-brass cursor-pointer min-h-[44px]"
            >
              {cities.map(city => <option key={city} value={city}>{city}</option>)}
            </select>
          </div>
        </Reveal>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-16">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                key={project.slug}
              >
                <Link href={`/portfolio/${project.slug}`} className="group block" data-cursor="View">
                  <div className="aspect-[4/5] relative w-full overflow-hidden mb-6 bg-paper/50 shadow-sm">
                    <Image
                      src={project.coverImage}
                      alt={project.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div>
                    <h4 className="font-serif text-2xl mb-2">{project.name}</h4>
                    <p className="text-sm text-ink/60 uppercase tracking-widest mb-4">{project.city} · {project.type}</p>
                    <span className="text-xs font-medium text-brass flex items-center lg:hidden">
                      View Project &rarr;
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="py-32 text-center">
            <p className="text-lg text-ink/50">No projects found matching the selected filters.</p>
            <button 
              onClick={() => { setActiveCategory("All"); setActiveCity("All"); }}
              className="mt-6 text-sm text-brass underline min-h-[44px] px-4"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
