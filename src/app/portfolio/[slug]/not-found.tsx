import Link from "next/link";
import { SmartImage as Image } from "@/components/ui/SmartImage";
import { ErrorLayout } from "@/components/error/ErrorLayout";
import { projects } from "@/content/projects";

export const metadata = {
  robots: { index: false }
};

export default function PortfolioNotFound() {
  return (
    <ErrorLayout
      code="404"
      eyebrow="Project not found"
      title="That project isn't in our portfolio… yet."
      body="We couldn't find the project you're looking for, but there are plenty of other spaces to explore."
      primaryCta={{ label: "Start your own project", href: "/contact" }}
    >
      <div className="mt-16 pt-12 border-t border-stone-2">
        <h3 className="text-xs uppercase tracking-widest font-medium text-brass mb-8">
          Explore Our Work
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Link key={project.slug} href={`/portfolio/${project.slug}`} className="group block">
              <div className="aspect-[4/3] relative w-full overflow-hidden mb-4 bg-stone-2/30">
                <Image 
                  src={project.coverImage} 
                  alt={project.name} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105" 
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <h4 className="font-serif text-lg mb-1 group-hover:text-brass transition-colors">{project.name}</h4>
              <p className="text-xs text-ink/60 uppercase tracking-widest">{project.city} · {project.type}</p>
            </Link>
          ))}
        </div>
      </div>
    </ErrorLayout>
  );
}
