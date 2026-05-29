import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative h-screen flex flex-col justify-center px-6">
        <div className="absolute inset-0 z-0">
          <Parallax offset={50} className="w-full h-full">
            <Image
              src="/images/misc/404-room.webp"
              alt="Empty Room"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-ink/40" />
          </Parallax>
        </div>
        
        <div className="container mx-auto max-w-7xl relative z-10 text-paper text-center">
          <Reveal>
            <h1 className="font-serif text-8xl md:text-9xl mb-6">404</h1>
            <p className="text-xl md:text-2xl text-paper/80 italic mb-12">
              This space seems to be empty.
            </p>
            <Button asChild size="lg" variant="primary" className="bg-paper text-ink hover:bg-paper/90 rounded-sm">
              <Link href="/">Return home</Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
