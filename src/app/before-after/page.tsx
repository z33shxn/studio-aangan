import { projects } from "@/content/projects";
import { Reveal } from "@/components/motion/Reveal";
import { BeforeAfter } from "@/components/ui/BeforeAfter";

export const metadata = {
  title: "Before & After",
  description: "See the transformation. Swipe to compare before and after photos.",
};

export default function BeforeAfterPage() {
  const transformedProjects = projects.filter(p => p.beforeAfter);

  return (
    <div className="flex flex-col pt-24 pb-32">
      <div className="container mx-auto px-6 max-w-7xl">
        <Reveal>
          <h1 className="font-serif text-5xl md:text-7xl mb-8">Transformations</h1>
          <p className="text-xl md:text-2xl text-ink/70 max-w-3xl mb-24 leading-relaxed">
            Drag the slider to see how we reimagine spaces.
          </p>
        </Reveal>

        <div className="space-y-32">
          {transformedProjects.map((project, i) => (
            <div key={project.slug} className="flex flex-col">
              <Reveal delay={0.1}>
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <h2 className="font-serif text-3xl mb-1">{project.name}</h2>
                    <p className="text-sm uppercase tracking-widest text-ink/60">{project.city}</p>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.2} className="w-full">
                <BeforeAfter
                  beforeSrc={project.beforeAfter!.before}
                  afterSrc={project.beforeAfter!.after}
                  className="shadow-xl"
                />
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
