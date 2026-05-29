import Image from "next/image";
import Link from "next/link";
import { services } from "@/content/services";
import { Reveal } from "@/components/motion/Reveal";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Services",
  description: "Comprehensive interior design services, from concept to turnkey execution.",
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col pt-24 pb-32">
      <div className="container mx-auto px-6 max-w-7xl">
        <Reveal>
          <h1 className="font-serif text-5xl md:text-7xl mb-8">Services</h1>
          <p className="text-xl md:text-2xl text-ink/70 max-w-3xl mb-24 leading-relaxed">
            From single-room restyling to complete turnkey execution, we offer flexible services to bring your vision to life.
          </p>
        </Reveal>

        <div className="space-y-32">
          {services.map((service, i) => (
            <div key={service.slug} className={`flex flex-col gap-12 lg:gap-16 items-center ${i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'}`} id={service.slug}>
              <div className="w-full md:w-1/2">
                <ClipReveal>
                  <Link href={`/services/${service.slug}`} className="block relative w-full aspect-[4/3] overflow-hidden bg-paper/50 group" data-cursor="View">
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </Link>
                </ClipReveal>
              </div>
              <div className="w-full md:w-1/2 flex flex-col justify-center px-0 lg:px-12">
                <Reveal>
                  <h2 className="font-serif text-3xl md:text-4xl mb-2">{service.name}</h2>
                  <p className="text-sm uppercase tracking-widest text-brass font-medium mb-6">{service.priceHint}</p>
                  <p className="text-xl text-ink/90 mb-8 italic">{service.promise}</p>
                  
                  <div className="mb-8">
                    <h4 className="text-xs uppercase tracking-widest font-medium text-ink mb-3">Includes:</h4>
                    <ul className="text-sm text-ink/70 space-y-2">
                      {service.whatIsIncluded.map((item, index) => (
                        <li key={index} className="flex gap-2">
                          <span className="text-brass">/</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button asChild variant="outline">
                    <Link href={`/services/${service.slug}`}>View full details</Link>
                  </Button>
                </Reveal>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
