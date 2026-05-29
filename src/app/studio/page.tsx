import Image from "next/image";
import { studio } from "@/content/studio";
import { Reveal } from "@/components/motion/Reveal";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { Parallax } from "@/components/motion/Parallax";

export const metadata = {
  title: "Studio",
  description: "Meet the team and understand our design philosophy.",
};

export default function StudioPage() {
  return (
    <div className="flex flex-col pt-24 pb-32">
      <div className="container mx-auto px-6 max-w-7xl">
        <Reveal>
          <h1 className="font-serif text-5xl md:text-7xl mb-8">About the Studio</h1>
          <p className="text-xl md:text-2xl text-ink/70 max-w-3xl mb-24 leading-relaxed">
            {studio.story}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-32">
          {studio.founders.map((founder, i) => (
            <div key={founder.name} className="flex flex-col">
              <ClipReveal delay={i * 0.2}>
                <div className="aspect-[4/5] relative w-full overflow-hidden mb-6 bg-paper/50">
                  <Image
                    src={founder.image}
                    alt={founder.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </ClipReveal>
              <Reveal delay={0.2 + i * 0.2}>
                <h3 className="font-serif text-3xl mb-1">{founder.name}</h3>
                <p className="text-xs uppercase tracking-widest text-brass font-medium mb-4">{founder.role}</p>
                <p className="text-ink/70 leading-relaxed">{founder.bio}</p>
              </Reveal>
            </div>
          ))}
        </div>

        <Reveal>
          <h2 className="font-serif text-4xl md:text-5xl mb-16 text-center">Our Philosophy</h2>
        </Reveal>

        <div className="space-y-32">
          {studio.philosophy.map((item, i) => (
            <div key={item.title} className={`flex flex-col gap-12 items-center ${i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
              <div className="w-full md:w-1/2">
                <ClipReveal>
                  <div className="aspect-[4/3] relative w-full overflow-hidden bg-paper/50">
                    <Parallax offset={20}>
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </Parallax>
                  </div>
                </ClipReveal>
              </div>
              <div className="w-full md:w-1/2 flex flex-col justify-center px-0 md:px-12">
                <Reveal>
                  <h3 className="font-serif text-3xl md:text-4xl mb-4">{item.title}</h3>
                  <p className="text-lg text-ink/70 leading-relaxed">{item.description}</p>
                </Reveal>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
