import Link from "next/link";
import { SmartImage as Image } from "@/components/ui/SmartImage";
import { ErrorLayout } from "@/components/error/ErrorLayout";
import { AmbientMedia } from "@/components/error/AmbientMedia";
import { NotFoundSearch } from "@/components/error/NotFoundSearch";
import { RandomProjectButton } from "@/components/error/RandomProjectButton";
import { projects } from "@/content/projects";
import { studio } from "@/content/studio";

export const metadata = {
  title: "Page not found",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <ErrorLayout
      code="404"
      eyebrow="Page not found"
      title="You've wandered into an empty room."
      body="The page you're looking for may have moved, been renovated, or never existed. Let's walk you back to something beautiful."
      media={<AmbientMedia src="/images/misc/404-room.webp" />}
      primaryCta={{ label: "Back to home", href: "/" }}
      secondaryCta={{ label: "View our work", href: "/portfolio" }}
    >
      <div className="mt-12 pt-12 border-t border-stone-2">
        <h3 className="text-xs uppercase tracking-widest font-medium text-brass mb-8">
          Or, try searching
        </h3>
        <NotFoundSearch />
      </div>

      <div className="mt-16 pt-12 border-t border-stone-2">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-8 gap-4">
          <h3 className="text-xs uppercase tracking-widest font-medium text-brass">
            Recent Projects
          </h3>
          <RandomProjectButton />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          {projects.slice(0, 3).map((project) => (
            <Link key={project.slug} href={`/portfolio/${project.slug}`} className="group block">
              <div className="aspect-[4/3] relative w-full overflow-hidden mb-4 bg-stone-2/30">
                <Image 
                  src={project.coverImage} 
                  alt={project.name} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105" 
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <h4 className="font-serif text-lg mb-1 group-hover:text-brass transition-colors">{project.name}</h4>
              <p className="text-xs text-ink/60 uppercase tracking-widest">{project.city} · {project.type}</p>
            </Link>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-6 bg-bone/50 border border-stone-2 rounded-sm">
          <div>
            <h4 className="font-serif text-xl mb-1">Think this is a broken link?</h4>
            <p className="text-sm text-ink/70">Let us know so we can fix it.</p>
          </div>
          <div className="flex gap-4">
            <a href={`mailto:${studio.contact.email}`} className="text-sm font-medium hover:text-clay transition-colors">Email us</a>
            <span className="text-stone-2">|</span>
            <a href={`https://wa.me/${studio.contact.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="text-sm font-medium hover:text-clay transition-colors">WhatsApp</a>
          </div>
        </div>
      </div>
    </ErrorLayout>
  );
}
