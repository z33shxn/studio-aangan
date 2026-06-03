import Link from "next/link";
import { SmartImage as Image } from "@/components/ui/SmartImage";
import { studio } from "@/content/studio";
import { projects } from "@/content/projects";
import { Reveal } from "@/components/motion/Reveal";

export const metadata = {
  title: "Locations",
  description: "Studio Aangan interior design and architecture services across India.",
};

import { slugify } from "@/content/locations";
import { DURATION } from "@/lib/motion";

export default function LocationsIndexPage() {
  const cities = studio.citiesServed.map(city => {
    // Find the first project in this city for the cover image
    const cityProjects = projects.filter(p => p.city.toLowerCase() === city.toLowerCase());
    const image = cityProjects.length > 0 ? cityProjects[0].coverImage : "/images/misc/hero-main.webp";
    
    return {
      name: city,
      slug: slugify(city),
      projectCount: cityProjects.length,
      image
    };
  });

  return (
    <div className="flex flex-col min-h-screen bg-bone">
      {/* Hero */}
      <section className="pt-40 pb-24 px-6 border-b border-stone-2">
        <div className="container mx-auto max-w-4xl text-center">
          <Reveal>
            <h1 className="text-xs uppercase tracking-widest font-medium text-brass mb-6">Locations</h1>
            <h2 className="font-serif text-5xl md:text-7xl leading-tight mb-8">Designing across India.</h2>
            <p className="text-lg md:text-xl text-ink/70 max-w-2xl mx-auto">
              Our studio is headquartered in Bengaluru, but our work takes us to homes across the country.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Grid */}
      <section className="py-24 px-6 bg-paper">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-12">
            {cities.map((city, index) => (
              <Reveal key={city.slug} delay={index  * DURATION.stagger}>
                <Link href={`/locations/${city.slug}`} className="group block">
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone-2/20 mb-6">
                    <Image
                      src={city.image}
                      alt={`Interior Design in ${city.name}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-serif text-3xl group-hover:text-brass transition-colors">{city.name}</h3>
                    <span className="text-sm font-medium text-ink/50 uppercase tracking-widest">
                      {city.projectCount} {city.projectCount === 1 ? 'Project' : 'Projects'}
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
