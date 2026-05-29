"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "./Reveal";

export function HorizontalGallery({ projects }: { projects: any[] }) {
  const targetRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const totalWidth = projects.length * 50; 
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(projects.length - 1) * 100 / projects.length}%`]);

  if (shouldReduceMotion) {
    return (
      <div className="flex flex-col gap-24">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.1}>
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
    <section ref={targetRef} className="relative" style={{ height: `${projects.length * 60}vh` }}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden bg-paper">
        <motion.div style={{ x, width: `${projects.length * 100}vw` }} className="flex pl-6 pr-32 h-[60vh] items-center">
          {projects.map((project) => (
            <div key={project.slug} className="w-screen max-w-[80vw] md:max-w-[50vw] pr-8 md:pr-16 flex-shrink-0">
              <Link href={`/portfolio/${project.slug}`} className="group block" data-cursor="Explore">
                <div className="aspect-[4/3] relative w-full overflow-hidden mb-6 bg-paper/50 shadow-xl">
                  <Image
                    src={project.coverImage}
                    alt={project.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div>
                  <h4 className="font-serif text-3xl md:text-4xl mb-2">{project.name}</h4>
                  <p className="text-sm text-ink/60 uppercase tracking-widest">{project.city} · {project.type}</p>
                </div>
              </Link>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
