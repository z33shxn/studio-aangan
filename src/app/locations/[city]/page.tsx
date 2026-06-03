import { notFound } from "next/navigation";
import { SmartImage as Image } from "@/components/ui/SmartImage";
import Link from "next/link";
import { studio } from "@/content/studio";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { pricing, City as PricingCity } from "@/content/pricing";
import { testimonials } from "@/content/testimonials";
import { citySlugMap, getCityFromSlug } from "@/content/locations";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { Button } from "@/components/ui/Button";
import { DURATION } from "@/lib/motion";
import { SITE_URL } from "@/lib/site";
// Used formatting util
function formatINR(value: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(value);
}

export async function generateStaticParams() {
  return Object.keys(citySlugMap).map(slug => ({
    city: slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const cityName = getCityFromSlug(city);
  if (!cityName) return { title: "Not Found" };
  
  return { 
    title: `Interior Designers in ${cityName}`,
    description: `Studio Aangan provides premium interior design and architectural services in ${cityName}.`
  };
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const cityName = getCityFromSlug(city);
  
  if (!cityName) {
    notFound();
  }

  const cityProjects = projects.filter(p => p.city.toLowerCase() === cityName.toLowerCase());
  const cityTestimonials = testimonials.filter(t => t.city.toLowerCase() === cityName.toLowerCase());
  const cityPricing = pricing.calculatorBands[cityName as PricingCity];
  
  // Safe hero fallback
  const heroImage = cityProjects.length > 0 ? cityProjects[0].coverImage : "/images/misc/hero-main.webp";

  // JSON-LD for local SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Studio Aangan ${cityName}`,
    "image": `${SITE_URL}${heroImage}`,
    "@id": `${SITE_URL}/locations/${city}`,
    "url": `${SITE_URL}/locations/${city}`,
    "telephone": studio.contact.phone,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": cityName,
      "addressCountry": "IN"
    },
    "areaServed": cityName,
    "priceRange": cityPricing ? `${formatINR(cityPricing.Essential)} - ${formatINR(cityPricing.Bespoke)}` : "Pricing on request"
  };

  return (
    <div className="flex flex-col bg-bone">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative h-[70vh] flex flex-col justify-end pb-16 px-6">
        <div className="absolute inset-0 z-0">
          <Parallax offset={50} className="w-full h-full">
            <Image
              src={heroImage}
              alt={`Interior Design in ${cityName}`}
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
              <Link href="/locations" className="text-xs uppercase tracking-widest text-paper/70 hover:text-paper transition-colors">Locations</Link>
              <span className="text-brass">/</span>
              <span className="text-xs uppercase tracking-widest text-paper/50">{cityName}</span>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl mb-6 max-w-4xl">
              Interior Designers in {cityName}
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Intro */}
      <section className="py-24 px-6 bg-paper">
        <div className="container mx-auto max-w-4xl text-center">
          <Reveal>
            <h2 className="font-serif text-3xl md:text-5xl mb-8 leading-tight">
              Designing homes tailored to the climate and culture of {cityName}.
            </h2>
            <p className="text-lg text-ink/70 leading-relaxed mb-8">
              Whether it's an expansive villa or an urban apartment, our approach remains the same: context-driven, detail-obsessed, and built to last. Our team manages the entire process from conceptualization to execution in {cityName}.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Services Table */}
      <section className="py-24 px-6 bg-bone border-y border-stone-2">
        <div className="container mx-auto max-w-5xl">
          <Reveal>
            <h2 className="text-xs uppercase tracking-widest font-medium text-brass mb-12">What we do in {cityName}</h2>
          </Reveal>
          <div className="flex flex-col border-t border-stone-2">
            {services.map((service) => (
              <Reveal key={service.slug}>
                <Link href={`/services/${service.slug}`} className="group flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-stone-2 hover:bg-paper transition-colors px-4 -mx-4">
                  <h3 className="font-serif text-2xl md:text-3xl mb-2 md:mb-0 group-hover:text-brass transition-colors w-full md:w-1/3">{service.name}</h3>
                  <p className="text-ink/70 w-full md:w-1/2">{service.promise}</p>
                  <span className="text-brass hidden md:block opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Projects in City */}
      <section className="py-24 px-6 bg-paper">
        <div className="container mx-auto max-w-7xl">
          <Reveal className="flex justify-between items-end mb-12">
            <h2 className="font-serif text-4xl">Featured Work in {cityName}</h2>
          </Reveal>
          
          {cityProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-12">
              {cityProjects.map((project, index) => (
                <Reveal key={project.slug} delay={index  * DURATION.stagger}>
                  <Link href={`/portfolio/${project.slug}`} className="group block">
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone-2/20 mb-6">
                      <Image
                        src={project.coverImage}
                        alt={project.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-serif text-2xl group-hover:text-brass transition-colors">{project.name}</h3>
                      <span className="text-xs font-medium text-ink/50 uppercase tracking-widest">{project.type}</span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal>
              <div className="bg-bone p-12 text-center border border-stone-2">
                <h3 className="font-serif text-2xl mb-4 text-ink">Now taking on projects in {cityName}</h3>
                <p className="text-ink/70 mb-8 max-w-lg mx-auto">
                  We are expanding our footprint and are currently accepting new interior design and architectural briefs in {cityName}.
                </p>
                <Button asChild variant="outline">
                  <Link href="/portfolio">View our full portfolio</Link>
                </Button>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* Pricing / Process Teaser */}
      <section className="py-24 px-6 bg-ink text-paper">
        <div className="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">
          <Reveal>
            <h2 className="text-xs uppercase tracking-widest font-medium text-brass mb-6">Pricing in {cityName}</h2>
            <h3 className="font-serif text-4xl mb-6">Transparent costs, from concept to handover.</h3>
            
            {cityPricing ? (
              <div className="space-y-6 mb-8 pt-6 border-t border-paper/10">
                <div className="flex justify-between items-center">
                  <span className="text-paper/70">Design-Only (Essential)</span>
                  <span className="font-medium text-xl">{formatINR(cityPricing.Essential)}<span className="text-sm font-normal text-paper/50">/sq ft</span></span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-paper/70">Turnkey (Signature)</span>
                  <span className="font-medium text-xl text-brass">{formatINR(cityPricing.Signature)}<span className="text-sm font-normal text-brass/50">/sq ft</span></span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-paper/70">Custom Architecture (Bespoke)</span>
                  <span className="font-medium text-xl">{formatINR(cityPricing.Bespoke)}<span className="text-sm font-normal text-paper/50">/sq ft</span></span>
                </div>
                <p className="text-xs text-paper/40 mt-4">* {pricing.note}</p>
              </div>
            ) : (
              <div className="mb-8 pt-6 border-t border-paper/10">
                <p className="text-lg text-paper/70">Pricing on request. Every project in {cityName} is evaluated based on scope and site conditions.</p>
              </div>
            )}
            
            <Button asChild variant="primary" className="bg-paper text-ink hover:bg-clay hover:text-paper">
              <Link href="/pricing">View full pricing</Link>
            </Button>
          </Reveal>

          <Reveal delay={0.2} className="bg-paper/5 p-8 md:p-12 border border-paper/10">
            <h3 className="text-xs uppercase tracking-widest font-medium text-brass mb-6">Next Steps</h3>
            <h4 className="font-serif text-3xl mb-4">How we work</h4>
            <p className="text-paper/70 mb-8">
              Our 6-step process ensures nothing is lost in translation. We handle everything from the initial moodboard to the final styling.
            </p>
            <Button asChild variant="outline" className="text-paper border-paper/20 hover:bg-paper hover:text-ink">
              <Link href="/process">Explore the process</Link>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 bg-bone text-center border-t border-stone-2">
        <div className="container mx-auto max-w-3xl">
          <Reveal>
            <h2 className="font-serif text-4xl md:text-5xl mb-8">Ready to begin in {cityName}?</h2>
            <p className="text-lg text-ink/70 mb-10 max-w-xl mx-auto">
              Schedule a consultation to discuss your space, budget, and vision.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" variant="primary">
                <Link href="/contact">Book a consultation</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={`https://wa.me/${studio.contact.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer">
                  WhatsApp Us
                </a>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
