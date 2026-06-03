import Link from "next/link";
import { ErrorLayout } from "@/components/error/ErrorLayout";
import { services } from "@/content/services";

export const metadata = {
  robots: { index: false }
};

export default function ServiceNotFound() {
  return (
    <ErrorLayout
      code="404"
      eyebrow="Service not found"
      title="We don't offer that — but we offer plenty."
      body="We couldn't find the specific service you requested. Explore our core design and architecture offerings below."
      primaryCta={{ label: "Contact us", href: "/contact" }}
    >
      <div className="mt-16 pt-12 border-t border-stone-2">
        <h3 className="text-xs uppercase tracking-widest font-medium text-brass mb-8">
          Our Services
        </h3>
        
        <div className="flex flex-col border-t border-stone-2">
          {services.map((service) => (
            <Link key={service.slug} href={`/services/${service.slug}`} className="group block py-6 border-b border-stone-2 hover:bg-bone transition-colors px-4 -mx-4">
              <h4 className="font-serif text-2xl md:text-3xl mb-2 group-hover:text-brass transition-colors">{service.name}</h4>
              <p className="text-ink/70 max-w-2xl">{service.promise}</p>
            </Link>
          ))}
        </div>
      </div>
    </ErrorLayout>
  );
}
