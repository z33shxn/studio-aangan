import { notFound } from "next/navigation";
import { SmartImage as Image } from "@/components/ui/SmartImage";
import Link from "next/link";
import { services } from "@/content/services";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { Button } from "@/components/ui/Button";

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return { title: "Not Found" };
  return { title: `${service.name} | Services` };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  
  if (!service) {
    notFound();
  }

  return (
    <div className="flex flex-col">
      <section className="relative h-[60vh] lg:h-[70vh] flex flex-col justify-end pb-16 px-6">
        <div className="absolute inset-0 z-0">
          <Parallax offset={50} className="w-full h-full">
            <Image
              src={service.image}
              alt={service.name}
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-ink/40" />
          </Parallax>
        </div>
        
        <div className="container mx-auto max-w-7xl relative z-10 text-paper">
          <Reveal>
            <div className="flex items-center gap-4 mb-6">
              <Link href="/services" className="text-xs uppercase tracking-widest text-paper/70 hover:text-paper transition-colors">Services</Link>
              <span className="text-brass">/</span>
              <span className="text-xs uppercase tracking-widest text-paper/50">{service.name}</span>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl mb-4">{service.name}</h1>
            <p className="text-xl md:text-2xl text-paper/80 italic">{service.promise}</p>
          </Reveal>
        </div>
      </section>

      <section className="py-24 px-6 bg-paper">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <Reveal>
              <h2 className="text-xs uppercase tracking-widest font-medium text-brass mb-6">The Process</h2>
              <p className="text-lg text-ink/80 leading-relaxed mb-12">
                {service.process}
              </p>
              
              <div className="bg-bone p-8 border border-ink/5">
                <h3 className="text-xs uppercase tracking-widest font-medium text-ink mb-6">Investment & Timeline</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between border-b border-ink/10 pb-4">
                    <span className="text-ink/60">Estimated Cost</span>
                    <span className="font-medium text-right pl-4">{service.priceRange}</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="text-ink/60">Typical Timeline</span>
                    <span className="font-medium text-right pl-4">{service.timeline}</span>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <h2 className="text-xs uppercase tracking-widest font-medium text-brass mb-6">What's Included</h2>
              <ul className="space-y-4">
                {service.whatIsIncluded.map((item, index) => (
                  <li key={index} className="flex gap-4 p-4 border border-ink/10 bg-white">
                    <span className="text-brass font-serif italic text-xl leading-none">0{index + 1}</span>
                    <span className="text-ink/80 pt-0.5">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.4} className="mt-24 text-center">
            <p className="font-serif text-3xl mb-8">Ready to get started?</p>
            <Button asChild size="lg">
              <Link href="/contact">Book a consultation</Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
