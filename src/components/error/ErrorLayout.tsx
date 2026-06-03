import { ReactNode } from "react";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

interface ErrorLayoutProps {
  code?: string;
  eyebrow?: string;
  title: string;
  body: string;
  media?: ReactNode;
  primaryCta?: { label: string; href?: string; onClick?: () => void };
  secondaryCta?: { label: string; href?: string; onClick?: () => void };
  children?: ReactNode;
}

export function ErrorLayout({
  code,
  eyebrow,
  title,
  body,
  media,
  primaryCta,
  secondaryCta,
  children
}: ErrorLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-paper overflow-hidden relative">
      {/* Optional faint background code (like 404/500) behind the content */}
      {code && (
        <div className="absolute top-1/4 left-0 w-full flex justify-center pointer-events-none select-none overflow-hidden z-0 opacity-[0.03]">
          <span className="font-serif text-[40vw] leading-none text-transparent" style={{ WebkitTextStroke: "2px var(--color-ink)" }}>
            {code}
          </span>
        </div>
      )}

      {/* Main Grid */}
      <section className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-[90vh] relative z-10">
        
        {/* Media Side (Stacks first on mobile) */}
        {media && (
          <div className="lg:col-span-5 h-[40vh] lg:h-auto relative overflow-hidden border-b lg:border-b-0 lg:border-r border-stone-2">
            {media}
          </div>
        )}

        {/* Copy Side */}
        <div className={`flex flex-col justify-center px-6 py-20 lg:py-32 ${media ? 'lg:col-span-7' : 'lg:col-span-12 max-w-4xl mx-auto w-full'}`}>
          <div className="max-w-2xl mx-auto lg:mx-0 w-full lg:px-12">
            <Reveal>
              {eyebrow && (
                <h1 className="text-xs uppercase tracking-widest font-medium text-brass mb-6">
                  {code && `Error ${code} — `}{eyebrow}
                </h1>
              )}
              {!eyebrow && code && (
                <h1 className="text-xs uppercase tracking-widest font-medium text-brass mb-6">
                  Error {code}
                </h1>
              )}
              
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-8 text-ink">
                {title}
              </h2>
            </Reveal>
            
            <Reveal delay={0.1}>
              <p className="text-lg md:text-xl text-ink/70 mb-12 max-w-lg leading-relaxed">
                {body}
              </p>
            </Reveal>

            <Reveal delay={0.2} className="flex flex-col sm:flex-row gap-4 mb-16">
              {primaryCta && (
                <Button 
                  asChild={!!primaryCta.href}
                  onClick={primaryCta.onClick}
                  size="lg" 
                  variant="primary" 
                  className="w-full sm:w-auto bg-ink text-paper hover:bg-clay hover:text-paper"
                >
                  {primaryCta.href ? (
                    <Link href={primaryCta.href}>{primaryCta.label}</Link>
                  ) : (
                    <span>{primaryCta.label}</span>
                  )}
                </Button>
              )}
              {secondaryCta && (
                <Button 
                  asChild={!!secondaryCta.href}
                  onClick={secondaryCta.onClick}
                  size="lg" 
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  {secondaryCta.href ? (
                    <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
                  ) : (
                    <span>{secondaryCta.label}</span>
                  )}
                </Button>
              )}
            </Reveal>

            <Reveal delay={0.3}>
              {children}
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
