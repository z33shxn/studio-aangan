import { SmartImage as Image } from "@/components/ui/SmartImage";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { DURATION } from "@/lib/motion";

export const metadata = {
  title: "Our Team",
  description: "Meet the founders and the wider team behind Studio Aangan's architecture and interior design projects.",
};

const founders = [
  {
    name: "Ananya Rao",
    role: "Principal Architect & Co-Founder",
    bio: "With over 12 years of experience spanning residential and boutique hospitality, Ananya's approach to architecture is deeply rooted in context and climate. She believes that a well-designed space should feel inevitable—like it was always meant to be there. Before co-founding Studio Aangan, she worked with award-winning firms in Bengaluru and Singapore.",
    image: "/images/studio/founder-ananya.webp"
  },
  {
    name: "Kabir Menon",
    role: "Principal Designer & Co-Founder",
    bio: "Kabir brings a meticulous eye for detail and a passion for craftsmanship. His background in furniture design and spatial planning drives the studio's focus on bespoke interiors. Kabir champions the use of local materials and works closely with our network of artisans and carpenters to ensure every piece tells a story.",
    image: "/images/studio/cofounder-kabir.webp"
  }
];

export default function TeamPage() {
  return (
    <div className="flex flex-col min-h-screen bg-bone">
      {/* Hero */}
      <section className="pt-40 pb-24 px-6 border-b border-stone-2">
        <div className="container mx-auto max-w-4xl text-center">
          <Reveal>
            <h1 className="text-xs uppercase tracking-widest font-medium text-brass mb-6">Our Team</h1>
            <h2 className="font-serif text-5xl md:text-7xl leading-tight mb-8">The minds behind the spaces.</h2>
            <p className="text-lg md:text-xl text-ink/70 max-w-2xl mx-auto">
              We are a collective of architects, interior designers, and visualizers bound by a shared belief in quiet, purposeful design.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Founders */}
      <section className="py-24 px-6 bg-paper border-b border-stone-2">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col gap-32">
            {founders.map((founder, index) => (
              <Reveal key={founder.name} delay={index * DURATION.stagger}>
                <div className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 lg:gap-24`}>
                  <div className="w-full md:w-1/2 aspect-[4/5] relative bg-stone-2/20 overflow-hidden shrink-0">
                    <Image
                      src={founder.image}
                      alt={founder.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <h3 className="font-serif text-4xl md:text-5xl mb-2">{founder.name}</h3>
                    <p className="text-xs uppercase tracking-widest font-medium text-brass mb-8 pb-8 border-b border-stone-2">
                      {founder.role}
                    </p>
                    <p className="text-lg text-ink/80 leading-relaxed">
                      {founder.bio}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Wider Team */}
      <section className="py-24 px-6 bg-paper">
        <div className="container mx-auto max-w-6xl">
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
              <div className="order-2 md:order-1">
                <h3 className="font-serif text-4xl mb-6">The Studio Collective</h3>
                <p className="text-lg text-ink/80 leading-relaxed mb-8">
                  While Ananya and Kabir lead the creative direction, our projects are brought to life by a dedicated team of junior architects, interior stylists, 3D visualizers, and project managers. We foster a studio culture that values continuous learning, open critique, and deep collaboration.
                </p>
                <div className="grid grid-cols-2 gap-x-8 gap-y-4 pt-8 border-t border-stone-2">
                  <div>
                    <h4 className="font-medium text-ink mb-1">Architecture</h4>
                    <p className="text-sm text-ink/60">3 Architects</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-ink mb-1">Interior Design</h4>
                    <p className="text-sm text-ink/60">4 Designers</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-ink mb-1">Visualisation</h4>
                    <p className="text-sm text-ink/60">2 Artists</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-ink mb-1">Project Mgmt</h4>
                    <p className="text-sm text-ink/60">2 Managers</p>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2 w-full aspect-[4/3] relative bg-stone-2/20 overflow-hidden">
                <Image
                  src="/images/studio/team-candid.webp"
                  alt="Studio Aangan Team"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 bg-ink text-paper text-center">
        <div className="container mx-auto max-w-3xl">
          <Reveal>
            <h2 className="font-serif text-4xl md:text-6xl mb-8">Join the studio</h2>
            <p className="text-lg text-paper/70 mb-10 max-w-xl mx-auto">
              We are always on the lookout for meticulous, thoughtful designers to join our team in Bengaluru.
            </p>
            <Button asChild size="lg" variant="primary" className="bg-paper text-ink hover:bg-clay hover:text-paper">
              <Link href="/careers">View Open Roles</Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
