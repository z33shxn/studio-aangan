import { notFound } from "next/navigation";
import { SmartImage as Image } from "@/components/ui/SmartImage";
import Link from "next/link";
import { projects } from "@/content/projects";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { BeforeAfter } from "@/components/ui/BeforeAfter";

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Not Found" };
  return { title: `${project.name} | Portfolio` };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  
  if (!project) {
    notFound();
  }

  return (
    <div className="flex flex-col">
      <section className="relative h-[70vh] lg:h-[85vh] flex flex-col justify-end pb-16 px-6">
        <div className="absolute inset-0 z-0">
          <Parallax offset={50} className="w-full h-full">
            <Image
              src={project.coverImage}
              alt={project.name}
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
            <div className="flex items-center gap-4 mb-6">
              <Link href="/portfolio" className="text-xs uppercase tracking-widest text-paper/70 hover:text-paper transition-colors">Portfolio</Link>
              <span className="text-brass">/</span>
              <span className="text-xs uppercase tracking-widest text-paper/50">{project.city}</span>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl mb-6 max-w-4xl">{project.name}</h1>
            <div className="flex flex-wrap gap-x-8 gap-y-4 text-sm uppercase tracking-widest font-medium text-paper/80">
              <p>Type: {project.type}</p>
              <p>Area: {project.area}</p>
              <p>Year: {project.year}</p>
              {project.budget && <p>Budget: {project.budget}</p>}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24 px-6 bg-paper">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit space-y-12">
              <Reveal>
                <h3 className="text-xs uppercase tracking-widest font-medium text-brass mb-4">Materials</h3>
                <ul className="space-y-2 text-ink/70">
                  {project.materials?.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              </Reveal>

              {project.clientQuote && (
                <Reveal delay={0.2}>
                  <h3 className="text-xs uppercase tracking-widest font-medium text-brass mb-4">Client Note</h3>
                  <blockquote className="font-serif text-xl italic text-ink/90 leading-relaxed border-l-2 border-brass pl-6">
                    "{project.clientQuote}"
                  </blockquote>
                </Reveal>
              )}
            </div>

            <div className="lg:col-span-8 space-y-16">
              <Reveal>
                <h2 className="text-2xl font-serif mb-4">The Brief</h2>
                <p className="text-lg text-ink/80 leading-relaxed">{project.brief}</p>
              </Reveal>

              {project.challenge && (
                <Reveal>
                  <h2 className="text-2xl font-serif mb-4">The Challenge</h2>
                  <p className="text-lg text-ink/80 leading-relaxed">{project.challenge}</p>
                </Reveal>
              )}

              {project.response && (
                <Reveal>
                  <h2 className="text-2xl font-serif mb-4">Our Response</h2>
                  <p className="text-lg text-ink/80 leading-relaxed">{project.response}</p>
                </Reveal>
              )}

              {project.result && (
                <Reveal>
                  <h2 className="text-2xl font-serif mb-4">The Result</h2>
                  <p className="text-lg text-ink/80 leading-relaxed">{project.result}</p>
                </Reveal>
              )}
            </div>
          </div>
        </div>
      </section>

      {project.beforeAfter && (
        <section className="py-24 bg-bone px-6">
          <div className="container mx-auto max-w-5xl">
            <Reveal className="mb-12 text-center">
              <h2 className="text-xs uppercase tracking-widest font-medium text-brass mb-4">Transformation</h2>
              <h3 className="font-serif text-4xl">Before & After</h3>
            </Reveal>
            <Reveal>
              <BeforeAfter
                beforeSrc={project.beforeAfter.before}
                afterSrc={project.beforeAfter.after}
                className="shadow-2xl"
              />
            </Reveal>
          </div>
        </section>
      )}

      <section className="py-24 px-6 bg-paper">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col gap-8 md:gap-16">
            {project.gallery?.map((image, i) => (
              <Reveal key={i} className="w-full">
                <div className="relative w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden bg-bone">
                  <Image
                    src={image}
                    alt={`${project.name} gallery image ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 90vw"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
