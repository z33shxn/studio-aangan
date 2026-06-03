"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { SmartImage as Image } from "@/components/ui/SmartImage";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/cn";
import { projects as allProjects } from "@/content/projects";
import { DURATION } from "@/lib/motion";

type Project = typeof allProjects[0];

export function HorizontalGallery({ projects }: { projects: Project[] }) {
  const targetRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", dragFree: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    });
  }, [emblaApi]);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(projects.length - 1) * 100 / projects.length}%`]);

  if (shouldReduceMotion) {
    return (
      <div className="flex flex-col gap-24">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={i  * DURATION.stagger}>
            <Link href={`/portfolio/${project.slug}`} className="block group">
              <div className="aspect-[4/3] relative w-full overflow-hidden mb-6 bg-paper/50">
                <Image
                  src={project.coverImage}
                  alt={project.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 80vw"
                />
              </div>
              <div>
                <h4 className="font-serif text-3xl mb-2">{project.name}</h4>
                <p className="text-sm text-ink/60 uppercase tracking-widest">{project.city} · {project.type}</p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    );
  }

  return (
    <>
      {/* MOBILE LAYOUT (Swipe) */}
      <section className="relative w-full py-12 block lg:hidden">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y">
            {projects.map((project) => (
              <div key={project.slug} className="flex-[0_0_85%] min-w-0 pl-6 pr-4 relative">
                <Link href={`/portfolio/${project.slug}`} className="group block">
                  <div className="aspect-[4/5] sm:aspect-[4/3] relative w-full overflow-hidden mb-6 bg-paper/50 shadow-lg">
                    <Image
                      src={project.coverImage}
                      alt={project.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 85vw, 50vw"
                    />
                  </div>
                  <div>
                    <h4 className="font-serif text-2xl mb-1">{project.name}</h4>
                    <p className="text-xs text-ink/60 uppercase tracking-widest">{project.city} · {project.type}</p>
                  </div>
                  <div className="mt-4 flex items-center text-xs uppercase tracking-widest font-medium text-brass">
                    View Project &rarr;
                  </div>
                </Link>
              </div>
            ))}
            <div className="flex-[0_0_6%] min-w-0" /> {/* End spacer */}
          </div>
        </div>
        
        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {projects.map((_, i) => (
            <button
              key={i}
              className={cn("w-2 h-2 rounded-full transition-all", i === selectedIndex ? "bg-brass w-6" : "bg-ink/20")}
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* DESKTOP LAYOUT (Horizontal Scroll) */}
      <section ref={targetRef} className="relative hidden lg:block" style={{ height: `${projects.length * 60}vh` }}>
        <div className="sticky top-0 h-screen flex items-center overflow-hidden bg-paper">
          <motion.div style={{ x, width: `${projects.length * 100}vw` }} className="flex pl-6 pr-32 h-[60vh] items-center">
            {projects.map((project) => (
              <div key={project.slug} className="w-screen max-w-[50vw] pr-16 flex-shrink-0">
                <Link href={`/portfolio/${project.slug}`} className="group block" data-cursor="Explore">
                  <div className="aspect-[4/3] relative w-full overflow-hidden mb-6 bg-paper/50 shadow-xl">
                    <Image
                      src={project.coverImage}
                      alt={project.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="50vw"
                    />
                  </div>
                  <div>
                    <h4 className="font-serif text-4xl mb-2">{project.name}</h4>
                    <p className="text-sm text-ink/60 uppercase tracking-widest">{project.city} · {project.type}</p>
                  </div>
                </Link>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
