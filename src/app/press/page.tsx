import { SmartImage as Image } from "@/components/ui/SmartImage";
import { studio } from "@/content/studio";
import { Reveal } from "@/components/motion/Reveal";

export const metadata = {
  title: "Press & Awards",
  description: "Studio Aangan in the media and our industry recognition.",
};

export default function PressPage() {
  return (
    <div className="flex flex-col min-h-screen bg-bone">
      {/* Hero */}
      <section className="pt-40 pb-24 px-6 border-b border-stone-2">
        <div className="container mx-auto max-w-4xl text-center">
          <Reveal>
            <h1 className="text-xs uppercase tracking-widest font-medium text-brass mb-6">Press & Awards</h1>
            <h2 className="font-serif text-5xl md:text-7xl leading-tight mb-8">Recognition & Media.</h2>
            <p className="text-lg md:text-xl text-ink/70 max-w-2xl mx-auto">
              Our work has been recognized by industry bodies and featured in leading design publications across the country.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-24 px-6 bg-paper">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Awards & Press */}
            <div className="order-2 lg:order-1 flex flex-col gap-16">
              
              <Reveal>
                <h3 className="font-serif text-3xl mb-8 pb-4 border-b border-stone-2">Awards & Honors</h3>
                <ul className="flex flex-col">
                  {studio.awards.map((award, index) => (
                    <li key={index} className="flex flex-col sm:flex-row sm:items-baseline justify-between py-6 border-b border-stone-2/50 last:border-0">
                      <span className="font-serif text-xl text-ink mb-2 sm:mb-0 pr-4">{award.name}</span>
                      <span className="text-sm font-medium text-brass uppercase tracking-widest flex-shrink-0">{award.year}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal>
                <h3 className="font-serif text-3xl mb-8 pb-4 border-b border-stone-2">Featured In</h3>
                <ul className="flex flex-col">
                  {studio.press.map((publication, index) => (
                    <li key={index} className="flex flex-col py-6 border-b border-stone-2/50 last:border-0">
                      <span className="font-serif text-xl text-ink">{publication}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal className="bg-bone p-8 border border-stone-2 mt-4">
                <h4 className="font-serif text-2xl mb-4">Press Enquiries</h4>
                <p className="text-ink/70 mb-6">
                  For high-resolution images, interviews, or publication requests, please reach out to our media team.
                </p>
                <a 
                  href={`mailto:press@studioaangan.in`}
                  className="inline-block text-sm font-medium uppercase tracking-widest text-ink hover:text-clay transition-colors border-b border-ink/20 hover:border-clay pb-1"
                >
                  press@studioaangan.in
                </a>
              </Reveal>

            </div>

            {/* Image */}
            <Reveal className="order-1 lg:order-2 h-full">
              <div className="sticky top-32">
                <div className="aspect-[4/5] relative w-full overflow-hidden bg-stone-2/20">
                  <Image
                    src="/images/studio/awards-vignette.webp"
                    alt="Studio Aangan Awards"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>
    </div>
  );
}
