"use client";
import { useState, useRef, ReactNode } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQAccordionItemProps {
  question: string;
  answer: string | ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

export function FAQAccordionItem({ question, answer, isOpen, onToggle }: FAQAccordionItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="border-b border-stone-2 last:border-b-0">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex justify-between items-center w-full py-6 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-4 focus-visible:ring-offset-paper"
      >
        <span className="font-serif text-xl md:text-2xl text-ink group-hover:text-brass transition-colors pr-8">
          {question}
        </span>
        <span className="text-brass flex-shrink-0 transition-transform duration-300">
          {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-ink/70 leading-relaxed text-lg" ref={contentRef}>
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQAccordionGroup({ items }: { items: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col">
      {items.map((item, index) => (
        <FAQAccordionItem
          key={index}
          question={item.question}
          answer={item.answer}
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? null : index)}
        />
      ))}
    </div>
  );
}
