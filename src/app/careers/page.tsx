import { SmartImage as Image } from "@/components/ui/SmartImage";
import { Reveal } from "@/components/motion/Reveal";

export const metadata = {
  title: "Careers",
  description: "Join Studio Aangan. Explore open roles and learn about our studio culture in Bengaluru.",
};

const values = [
  {
    title: "Meticulous Craft",
    description: "We sweat the small stuff. We believe that the difference between good design and great design lies in the execution of the smallest details."
  },
  {
    title: "Radical Candor",
    description: "We foster an environment of open critique. No ego, just a shared desire to push the work forward and build better spaces."
  },
  {
    title: "Contextual Empathy",
    description: "We don't design in a vacuum. We design for specific climates, specific materials, and specific human behaviors."
  }
];

export default function CareersPage() {
  return (
    <div className="flex flex-col min-h-screen bg-bone">
      {/* Hero */}
      <section className="pt-40 pb-24 px-6 border-b border-stone-2">
        <div className="container mx-auto max-w-4xl text-center">
          <Reveal>
            <h1 className="text-xs uppercase tracking-widest font-medium text-brass mb-6">Careers</h1>
            <h2 className="font-serif text-5xl md:text-7xl leading-tight mb-8">Build spaces that matter.</h2>
            <p className="text-lg md:text-xl text-ink/70 max-w-2xl mx-auto">
              We're a closely-knit studio in Bengaluru looking for thoughtful, rigorous designers who care deeply about the craft.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Culture & Image */}
      <section className="py-24 px-6 bg-paper">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <Reveal className="order-2 lg:order-1">
              <div className="aspect-[4/5] relative w-full overflow-hidden bg-stone-2/20">
                <Image
                  src="/images/studio/studio-space-1.webp"
                  alt="Studio Aangan Workspace"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </Reveal>
            <div className="order-1 lg:order-2">
              <Reveal>
                <h3 className="font-serif text-3xl md:text-4xl mb-8">Life at the studio</h3>
                <p className="text-lg text-ink/80 leading-relaxed mb-12">
                  We work hard, but we don't believe in burnout. Our studio hours are respected, and we prioritize 
                  focused, deep work over performative long hours. We take team site visits, host weekly material 
                  workshops, and actively encourage our designers to step away from the screen and learn how things 
                  are actually built.
                </p>
                <div className="space-y-8">
                  {values.map((value, idx) => (
                    <div key={idx} className="border-l-2 border-brass pl-6">
                      <h4 className="font-serif text-xl mb-2">{value.title}</h4>
                      <p className="text-ink/70 leading-relaxed">{value.description}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Open Roles & Application */}
      <section className="py-24 px-6 bg-paper border-t border-stone-2">
        <div className="container mx-auto max-w-4xl text-center">
          <Reveal>
            <h2 className="text-xs uppercase tracking-widest font-medium text-brass mb-6">Open Positions</h2>
            <h3 className="font-serif text-4xl mb-8">Currently, our team is at full capacity.</h3>
            <p className="text-lg text-ink/80 leading-relaxed mb-12 max-w-2xl mx-auto">
              While we aren't actively hiring for specific roles right now, we are always open to meeting talented 
              architects and designers. If you resonate with our work and our values, we'd love to hear from you.
            </p>
            
            <div className="bg-bone p-8 md:p-12 border border-stone-2 max-w-2xl mx-auto text-left">
              <h4 className="font-serif text-2xl mb-4">Open Application</h4>
              <p className="text-ink/70 mb-8">
                Send us your portfolio (PDF, max 10MB) and a brief note about why you'd like to join Studio Aangan. 
                We keep all applications on file and will reach out if a fitting role opens up.
              </p>
              <a 
                href="mailto:careers@studioaangan.in?subject=Open Application - [Your Name]" 
                className="inline-flex items-center justify-center h-12 px-8 font-medium tracking-wide text-paper bg-ink transition-colors hover:bg-clay w-full sm:w-auto"
              >
                Email your portfolio
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
