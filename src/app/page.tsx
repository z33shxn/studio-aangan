import { SmartImage as Image } from "@/components/ui/SmartImage";
import Link from "next/link";
import { studio } from "@/content/studio";
import { services } from "@/content/services";
import { projects } from "@/content/projects";
import { posts } from "@/content/posts";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { Counter } from "@/components/motion/Counter";
import { Marquee } from "@/components/motion/Marquee";
import { Button } from "@/components/ui/Button";
import { BeforeAfter } from "@/components/ui/BeforeAfter";

import blurData from "@/content/blur-data.json";
import { DURATION } from "@/lib/motion";

export default function Home() {
  const featuredProjects = projects.slice(0, 4);
  const transform = projects.find(p => p.beforeAfter)!;
  const heroBlur = blurData["/images/misc/hero-main.webp" as keyof typeof blurData];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col justify-end pb-24 pt-32 px-6">
        <div className="absolute inset-0 z-0">
          <Parallax offset={100} className="w-full h-full">
            <picture className="w-full h-full object-cover" style={{ backgroundImage: `url(${heroBlur})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <source media="(max-width: 768px)" srcSet="/images/misc/hero-mobile.webp" />
              <img
                src="/images/misc/hero-main.webp"
                alt="Contemporary Indian Living Room"
                className="w-full h-full object-cover object-center"
                fetchPriority="high"
                decoding="sync"
              />
            </picture>
            <div className="absolute inset-0 bg-ink/30" />
          </Parallax>
        </div>
        
        <div className="container mx-auto max-w-7xl relative z-10 text-paper">
          <Reveal>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.1] max-w-4xl tracking-tight mb-6">
              {studio.heroProposition}
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg md:text-xl text-paper/90 max-w-xl mb-10">
              {studio.tagline} We are a boutique interior design practice based in Bengaluru.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <Button asChild size="lg" variant="primary" className="bg-paper text-ink hover:bg-paper/90 rounded-sm">
              <Link href="/portfolio">View our work</Link>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-24 lg:py-32 bg-paper px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            <div className="lg:col-span-5">
              <Reveal>
                <h2 className="text-xs uppercase tracking-widest font-medium text-brass mb-6">Our Philosophy</h2>
                <p className="font-serif text-3xl md:text-4xl leading-tight mb-8">
                  {studio.story}
                </p>
                <Button asChild variant="outline">
                  <Link href="/studio">Meet the studio</Link>
                </Button>
              </Reveal>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 relative">
              <div className="aspect-[4/5] md:aspect-[3/2] lg:aspect-[4/5] relative w-full overflow-hidden">
                <Image
                  src="/images/studio/studio-space-1.webp"
                  alt="Studio Aangan Space"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 md:-bottom-12 md:-left-12 bg-paper p-5 md:p-8 shadow-2xl z-10">
                <div className="flex flex-col gap-1">
                  <span className="font-serif text-4xl md:text-5xl text-brass">
                    <Counter value={parseInt(studio.stats.projects)} suffix="+" />
                  </span>
                  <span className="text-xs uppercase tracking-widest font-medium text-ink/60">Projects Delivered</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services Marquee */}
      <section className="py-12 bg-ink text-paper overflow-hidden">
        <Marquee speed={40}>
          {services.map((service, i) => (
            <div key={i} className="flex items-center gap-16">
              <span className="font-serif text-4xl md:text-6xl italic whitespace-nowrap">{service.name}</span>
              <span className="w-3 h-3 rounded-full bg-brass/50" />
            </div>
          ))}
        </Marquee>
      </section>

      {/* Featured Projects */}
      <section className="py-24 lg:py-32 bg-bone px-6">
        <div className="container mx-auto max-w-7xl">
          <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <h2 className="text-xs uppercase tracking-widest font-medium text-brass mb-4">Selected Works</h2>
              <h3 className="font-serif text-4xl md:text-5xl">Spaces that breathe.</h3>
            </div>
            <Button asChild variant="outline">
              <Link href="/portfolio">View all projects</Link>
            </Button>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
            {featuredProjects.map((project, i) => (
              <Reveal key={project.slug} delay={i  * DURATION.stagger}>
                <Link href={`/portfolio/${project.slug}`} className="group block" data-cursor="View">
                  <div className="aspect-[4/3] relative w-full overflow-hidden mb-6 bg-paper/50">
                    <Image
                      src={project.coverImage}
                      alt={project.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-serif text-2xl mb-2">{project.name}</h4>
                      <p className="text-sm text-ink/60 uppercase tracking-widest">{project.city} · {project.type}</p>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Teaser Section */}
      <section className="py-24 lg:py-32 bg-paper px-6 border-t border-stone-2">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <Reveal>
                <h2 className="text-xs uppercase tracking-widest font-medium text-brass mb-6">Transformation</h2>
                <h3 className="font-serif text-3xl md:text-5xl leading-tight mb-8">
                  From bare shells to lived-in sanctuaries.
                </h3>
                <p className="text-lg text-ink/70 mb-8 leading-relaxed max-w-md">
                  Experience the journey of space. We look past what is, to design what could be.
                </p>
                <Button asChild variant="outline">
                  <Link href="/before-after">View transformations</Link>
                </Button>
              </Reveal>
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2">
              <Reveal delay={0.2}>
                <BeforeAfter 
                  beforeSrc={transform.beforeAfter!.before} 
                  afterSrc={transform.beforeAfter!.after}
                  beforeAlt={`${transform.name} before`}
                  afterAlt={`${transform.name} after`}
                  className="shadow-2xl"
                />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 lg:py-32 bg-ink text-paper px-6 overflow-hidden">
        <div className="container mx-auto max-w-7xl text-center">
          <Reveal>
            <h2 className="text-xs uppercase tracking-widest font-medium text-brass mb-16">Client Stories</h2>
            <div className="max-w-4xl mx-auto">
              <p className="font-serif text-2xl md:text-4xl leading-relaxed mb-12">
                "Studio Aangan didn't just design our home; they understood how our family lives. The space feels incredibly personal, bringing a sense of calm to our chaotic everyday."
              </p>
              <div>
                <p className="text-sm uppercase tracking-widest font-medium">— The Sharma Family</p>
                <p className="text-xs text-paper/50 mt-1">Bespoke Villa, Bengaluru</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Journal Teaser */}
      <section className="py-24 lg:py-32 bg-bone px-6">
        <div className="container mx-auto max-w-7xl">
          <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <h2 className="text-xs uppercase tracking-widest font-medium text-brass mb-4">The Journal</h2>
              <h3 className="font-serif text-4xl md:text-5xl">Thoughts on design.</h3>
            </div>
            <Button asChild variant="outline">
              <Link href="/journal">Read the journal</Link>
            </Button>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.slice(0,3).map((post, i) => (
              <Reveal key={post.slug} delay={(i+1) * DURATION.stagger}>
                <Link href={`/journal/${post.slug}`} className="group block">
                  <div className="aspect-[4/3] relative w-full overflow-hidden mb-6 bg-paper/50">
                    <Image src={post.coverImage} alt={post.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width:768px) 100vw, 33vw" />
                  </div>
                  <p className="text-xs text-brass uppercase tracking-widest mb-3">{post.category}</p>
                  <h4 className="font-serif text-2xl mb-3 group-hover:text-brass transition-colors">{post.title}</h4>
                  <p className="text-sm text-ink/70">{post.excerpt}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 lg:py-48 px-6 bg-paper relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            noReveal
            src="/images/misc/cta-plaster.webp"
            alt="Plaster Texture"
            fill
            className="object-cover opacity-[0.03]"
          />
        </div>
        <div className="container mx-auto max-w-3xl text-center relative z-10">
          <Reveal>
            <h2 className="font-serif text-5xl md:text-7xl leading-tight mb-8">Ready to build your sanctuary?</h2>
            <p className="text-lg text-ink/70 mb-10 max-w-xl mx-auto">
              Whether you have a floor plan ready or just a vision, we'd love to hear about it.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/contact">Start a conversation</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
