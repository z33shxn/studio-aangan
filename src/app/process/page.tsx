import { SmartImage as Image } from "@/components/ui/SmartImage";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Our Process",
  description: "How we work at Studio Aangan. From initial consultation to final styling and handover.",
};

const steps = [
  {
    number: "01",
    title: "Consultation & Briefing",
    duration: "1-2 Weeks",
    description: "We start by understanding how you live. We visit your site, discuss your requirements, budget, and timeline, and outline the scope of work. It's about ensuring we are the right fit for each other.",
    deliverables: ["Site Visit & Measurement", "Initial Space Planning", "Design Contract"],
    image: "/images/studio/designer-sketching.webp"
  },
  {
    number: "02",
    title: "Concept & Moodboard",
    duration: "2-3 Weeks",
    description: "Once the foundation is set, we explore the aesthetic direction. We develop moodboards, material palettes, and conceptual layouts that align with your vision and our design philosophy.",
    deliverables: ["Conceptual Layouts", "Moodboards", "Material Direction"],
    image: "/images/studio/materials-flatlay.webp"
  },
  {
    number: "03",
    title: "3D Visualisation",
    duration: "3-4 Weeks",
    description: "We bring the concept to life through detailed 3D renders. This allows you to experience the space, understand the scale, and visualize the lighting and textures before any construction begins.",
    deliverables: ["Photorealistic 3D Renders", "Spatial Walkthroughs"],
    image: "/images/services/space-planning-3d.webp"
  },
  {
    number: "04",
    title: "Material & Budget Sign-off",
    duration: "2-3 Weeks",
    description: "With the design approved, we finalize every detail. We visit vendors together, select specific finishes, fixtures, and furniture, and generate a precise, itemized Bill of Quantities (BOQ).",
    deliverables: ["Finalized Material Selection", "Detailed BOQ & Costing", "Working Drawings (GFC)"],
    image: "/images/studio/philosophy-detail.webp"
  },
  {
    number: "05",
    title: "Execution & Site Management",
    duration: "12-24 Weeks",
    description: "Our execution team takes over. We conduct regular site visits to ensure the design is being implemented exactly as envisioned, coordinating with contractors, carpenters, and vendors to maintain quality and timelines.",
    deliverables: ["Site Supervision", "Quality Control", "Vendor Coordination"],
    image: "/images/studio/studio-space-1.webp"
  },
  {
    number: "06",
    title: "Styling & Handover",
    duration: "1-2 Weeks",
    description: "The final layer. We bring in the soft furnishings, art, plants, and decor to style the space. Once everything is perfect, we walk you through your new home and hand over the keys.",
    deliverables: ["Final Deep Clean", "Art & Decor Styling", "Project Handover"],
    image: "/images/studio/studio-space-2.webp"
  }
];

export default function ProcessPage() {
  return (
    <div className="flex flex-col min-h-screen bg-bone">
      {/* Hero */}
      <section className="pt-40 pb-24 px-6 border-b border-stone-2">
        <div className="container mx-auto max-w-5xl text-center">
          <Reveal>
            <h1 className="text-xs uppercase tracking-widest font-medium text-brass mb-6">How We Work</h1>
            <h2 className="font-serif text-5xl md:text-7xl leading-tight mb-8">A methodical approach to effortless spaces.</h2>
            <p className="text-lg md:text-xl text-ink/70 max-w-2xl mx-auto">
              Great design isn't just about the final reveal; it's about a transparent, structured journey to get there.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 px-6 bg-paper">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col gap-32">
            {steps.map((step, index) => (
              <div key={step.number} className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24 items-start relative">
                {/* Sticky Number/Title on Desktop */}
                <div className="md:col-span-5 md:sticky md:top-32">
                  <Reveal>
                    <div className="flex items-baseline gap-4 mb-4">
                      <span className="font-serif text-3xl md:text-4xl text-brass italic">{step.number}</span>
                      <h3 className="font-serif text-3xl md:text-4xl text-ink">{step.title}</h3>
                    </div>
                    <div className="text-xs uppercase tracking-widest font-medium text-ink/50 mb-8 pb-8 border-b border-stone-2">
                      Duration: {step.duration}
                    </div>
                    <p className="text-lg text-ink/80 leading-relaxed mb-8">
                      {step.description}
                    </p>
                    <div className="bg-bone/50 p-6 border border-stone-2">
                      <h4 className="text-xs uppercase tracking-widest font-medium text-ink mb-4">What you receive</h4>
                      <ul className="space-y-3">
                        {step.deliverables.map((item, i) => (
                          <li key={i} className="flex gap-3 text-sm text-ink/80">
                            <span className="text-brass">→</span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                </div>
                
                {/* Image Side */}
                <div className="md:col-span-7">
                  <Reveal delay={0.2} className="w-full">
                    <div className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] w-full overflow-hidden bg-stone-2/20">
                      <Image
                        src={step.image}
                        alt={step.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </Reveal>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 bg-ink text-paper text-center">
        <div className="container mx-auto max-w-3xl">
          <Reveal>
            <h2 className="font-serif text-4xl md:text-6xl mb-8">Ready to begin?</h2>
            <p className="text-lg text-paper/70 mb-10 max-w-xl mx-auto">
              We take on a limited number of projects each year to ensure we can dedicate the time and detail required.
            </p>
            <Button asChild size="lg" variant="primary" className="bg-paper text-ink hover:bg-clay hover:text-paper">
              <Link href="/contact">Book a consultation</Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
