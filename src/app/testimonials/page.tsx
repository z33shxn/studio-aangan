import Link from "next/link";
import { SmartImage as Image } from "@/components/ui/SmartImage";
import { testimonials } from "@/content/testimonials";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { DURATION } from "@/lib/motion";

export const metadata = {
  title: "Client Stories & Testimonials",
  description: "Read what our clients have to say about working with Studio Aangan on their architecture and interior design projects.",
};

function StarRow() {
  return (
    <div className="flex gap-1 text-brass mb-6">
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsPage() {
  // Separate into featured and grid items
  const featured = testimonials.slice(0, 2);
  const regular = testimonials.slice(2);

  return (
    <div className="flex flex-col min-h-screen bg-bone">
      {/* Hero */}
      <section className="pt-40 pb-24 px-6 border-b border-stone-2">
        <div className="container mx-auto max-w-5xl text-center">
          <Reveal>
            <h1 className="text-xs uppercase tracking-widest font-medium text-brass mb-6">Client Stories</h1>
            <h2 className="font-serif text-5xl md:text-7xl leading-tight mb-8">Spaces that speak for themselves.</h2>
            <p className="text-lg md:text-xl text-ink/70 max-w-2xl mx-auto">
              Our greatest validation comes from the people who live and work in the spaces we design.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Featured Testimonials */}
      <section className="py-24 px-6 bg-paper border-b border-stone-2">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col gap-24">
            {featured.map((t, index) => (
              <Reveal key={t.name} delay={index  * DURATION.stagger}>
                <div className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 lg:gap-24`}>
                  <div className="w-full md:w-5/12 aspect-[4/5] relative bg-stone-2/20 overflow-hidden shrink-0">
                    {t.image ? (
                      <Image
                        src={t.image}
                        alt={t.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 40vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-bone">
                        <span className="font-serif text-6xl text-ink/10">SA</span>
                      </div>
                    )}
                  </div>
                  <div className="w-full md:w-7/12">
                    <StarRow />
                    <blockquote className="font-serif text-3xl md:text-4xl leading-relaxed text-ink mb-10">
                      "{t.quote}"
                    </blockquote>
                    <div>
                      <p className="font-medium text-ink uppercase tracking-widest text-sm mb-1">{t.name}</p>
                      <p className="text-ink/60 text-sm">{t.project} · {t.city}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Grid Testimonials */}
      {regular.length > 0 && (
        <section className="py-24 px-6 bg-paper">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regular.map((t, index) => (
                <Reveal key={t.name} delay={index  * DURATION.stagger} className="flex h-full">
                  <div className="bg-bone p-8 flex flex-col h-full w-full border border-stone-2/50 hover:border-stone-2 transition-colors">
                    <StarRow />
                    <blockquote className="font-serif text-xl md:text-2xl leading-relaxed text-ink mb-12 flex-1">
                      "{t.quote}"
                    </blockquote>
                    <div className="mt-auto flex items-center gap-4">
                      {t.image && (
                        <div className="w-12 h-12 relative rounded-full overflow-hidden flex-shrink-0 grayscale">
                          <Image src={t.image} alt={t.name} fill className="object-cover" sizes="48px" />
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-ink text-sm mb-0.5">{t.name}</p>
                        <p className="text-ink/60 text-xs">{t.project} · {t.city}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-32 px-6 bg-ink text-paper text-center">
        <div className="container mx-auto max-w-3xl">
          <Reveal>
            <h2 className="font-serif text-4xl md:text-6xl mb-8">See the work</h2>
            <p className="text-lg text-paper/70 mb-10 max-w-xl mx-auto">
              Explore the detailed case studies behind these client stories in our portfolio.
            </p>
            <Button asChild size="lg" variant="primary" className="bg-paper text-ink hover:bg-clay hover:text-paper">
              <Link href="/portfolio">View Portfolio</Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
