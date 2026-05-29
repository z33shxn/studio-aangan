import Image from "next/image";
import Link from "next/link";
import { studio } from "@/content/studio";
import { services } from "@/content/services";
import { projects } from "@/content/projects";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { Counter } from "@/components/motion/Counter";
import { Marquee } from "@/components/motion/Marquee";
import { Button } from "@/components/ui/Button";

export default function Home() {
  const featuredProjects = projects.slice(0, 4);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col justify-end pb-24 pt-32 px-6">
        <div className="absolute inset-0 z-0">
          <Parallax offset={100} className="w-full h-full">
            <Image
              src="/images/misc/hero-main.webp"
              alt="Contemporary Indian Living Room"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
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
            <p className="text-lg md:text-xl text-paper/80 max-w-xl mb-10">
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
              <ClipReveal className="aspect-[4/5] md:aspect-[3/2] lg:aspect-[4/5] relative w-full overflow-hidden">
                <Image
                  src="/images/studio/studio-space-1.webp"
                  alt="Studio Aangan Space"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </ClipReveal>
              <div className="absolute -bottom-8 -left-8 md:-bottom-12 md:-left-12 bg-paper p-6 md:p-8 shadow-2xl z-10 hidden sm:block">
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
              <Reveal key={project.slug} delay={i * 0.1}>
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

      {/* CTA Section */}
      <section className="py-32 lg:py-48 px-6 bg-paper relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "url('/images/misc/hero-main.webp')", backgroundSize: "cover", backgroundPosition: "center" }} />
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
