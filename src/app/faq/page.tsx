import Link from "next/link";
import { faqs } from "@/content/faqs";
import { FAQAccordionGroup } from "@/components/ui/FAQAccordion";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Frequently Asked Questions",
  description: "Common questions about working with Studio Aangan, our process, pricing, and timelines.",
};

export default function FAQPage() {
  // Generate FAQPage JSON-LD
  const flatFaqs = faqs.flatMap(cat => cat.items);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: flatFaqs.map(faq => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a
      }
    }))
  };

  return (
    <div className="flex flex-col min-h-screen bg-paper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Hero */}
      <section className="pt-40 pb-24 px-6 border-b border-stone-2">
        <div className="container mx-auto max-w-4xl text-center">
          <Reveal>
            <h1 className="text-xs uppercase tracking-widest font-medium text-brass mb-6">FAQ</h1>
            <h2 className="font-serif text-5xl md:text-7xl leading-tight mb-8">Questions & Answers</h2>
            <p className="text-lg md:text-xl text-ink/70 max-w-2xl mx-auto">
              Everything you need to know about engaging with our studio, from initial timelines to final handover.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Accordions by Category */}
      <section className="py-24 px-6 bg-paper">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col gap-24">
            {faqs.map((categoryGroup) => {
              // Map the items to match FAQAccordionGroup's expected prop shape: { question, answer }
              const mappedItems = categoryGroup.items.map(item => ({ question: item.q, answer: item.a }));
              return (
                <Reveal key={categoryGroup.category}>
                  <h3 className="text-xs uppercase tracking-widest font-medium text-ink/50 mb-8 pb-4 border-b border-stone-2">
                    {categoryGroup.category}
                  </h3>
                  <FAQAccordionGroup items={mappedItems} />
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 bg-ink text-paper text-center">
        <div className="container mx-auto max-w-3xl">
          <Reveal>
            <h2 className="font-serif text-4xl md:text-6xl mb-8">Still have a question?</h2>
            <p className="text-lg text-paper/70 mb-10 max-w-xl mx-auto">
              We're happy to discuss any specific requirements or unique project challenges you might have.
            </p>
            <Button asChild size="lg" variant="primary" className="bg-paper text-ink hover:bg-clay hover:text-paper">
              <Link href="/contact">Get in touch</Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
