import { projects } from "@/content/projects";
import { Reveal } from "@/components/motion/Reveal";
import { HorizontalGallery } from "@/components/motion/HorizontalGallery";

export const metadata = {
  title: "Portfolio",
  description: "Explore our selected works. Interior design projects across India.",
};

export default function PortfolioPage() {
  return (
    <div className="flex flex-col">
      <div className="container mx-auto px-6 max-w-7xl pt-24 pb-16">
        <Reveal>
          <h1 className="font-serif text-5xl md:text-7xl mb-8">Selected Works</h1>
          <p className="text-xl md:text-2xl text-ink/70 max-w-3xl leading-relaxed">
            Spaces designed for slow living, meaningful connections, and an enduring sense of calm. Scroll to explore.
          </p>
        </Reveal>
      </div>

      <HorizontalGallery projects={projects} />
    </div>
  );
}
