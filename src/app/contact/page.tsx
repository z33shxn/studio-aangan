"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { studio } from "@/content/studio";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  projectType: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10, "Please tell us a bit more about your project"),
});

type FormValues = z.infer<typeof formSchema>;

function ContactFormInner() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const searchParams = useSearchParams();

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      projectType: "residential",
      budget: "15-25L",
      message: "",
    }
  });

  useEffect(() => {
    // Pre-fill from pricing handoff if available
    const area = searchParams.get("area");
    const city = searchParams.get("city");
    const pkg = searchParams.get("package");
    
    if (area && city && pkg) {
      setValue("message", `I would like to get a quote for a ${area} sq ft property in ${city} using the ${pkg} package.`);
    }
  }, [searchParams, setValue]);

  async function onSubmit(data: FormValues) {
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to submit");
      setStatus("success");
    } catch (error) {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-bone p-12 text-center border border-ink/10">
        <h3 className="font-serif text-3xl mb-4">Thank You</h3>
        <p className="text-ink/70">We have received your inquiry and will get back to you within 48 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-paper">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <label htmlFor="name" className="block text-xs uppercase tracking-widest font-medium text-ink/70 mb-3">Name *</label>
          <Input id="name" {...register("name")} placeholder="Jane Doe" className="bg-bone border-transparent focus-visible:border-brass focus-visible:bg-white" />
          {errors.name && <span className="text-red-500 text-xs mt-1 block">{errors.name.message}</span>}
        </div>
        <div>
          <label htmlFor="email" className="block text-xs uppercase tracking-widest font-medium text-ink/70 mb-3">Email *</label>
          <Input id="email" type="email" {...register("email")} placeholder="jane@example.com" className="bg-bone border-transparent focus-visible:border-brass focus-visible:bg-white" />
          {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email.message}</span>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <label htmlFor="phone" className="block text-xs uppercase tracking-widest font-medium text-ink/70 mb-3">Phone</label>
          <Input id="phone" type="tel" {...register("phone")} placeholder="+91" className="bg-bone border-transparent focus-visible:border-brass focus-visible:bg-white" />
        </div>
        <div>
          <label htmlFor="projectType" className="block text-xs uppercase tracking-widest font-medium text-ink/70 mb-3">Project Type</label>
          <select id="projectType" {...register("projectType")} className="flex min-h-[44px] w-full rounded-none border-b border-stone-2 bg-bone px-3 py-2 text-sm focus-visible:outline-none focus-visible:border-brass focus-visible:bg-white transition-colors cursor-pointer">
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="renovation">Renovation</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="budget" className="block text-xs uppercase tracking-widest font-medium text-ink/70 mb-3">Estimated Budget</label>
        <select id="budget" {...register("budget")} className="flex min-h-[44px] w-full rounded-none border-b border-stone-2 bg-bone px-3 py-2 text-sm focus-visible:outline-none focus-visible:border-brass focus-visible:bg-white transition-colors cursor-pointer">
          <option value="15-25L">₹15L - ₹25L</option>
          <option value="25-50L">₹25L - ₹50L</option>
          <option value="50L+">₹50L+</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-xs uppercase tracking-widest font-medium text-ink/70 mb-3">Tell us about your space *</label>
        <Textarea id="message" {...register("message")} rows={5} placeholder="We are looking to redesign our 3BHK..." className="bg-bone border-transparent focus-visible:border-brass focus-visible:bg-white resize-none" />
        {errors.message && <span className="text-red-500 text-xs mt-1 block">{errors.message.message}</span>}
      </div>

      {status === "error" && (
        <p className="text-red-600 text-sm">Something went wrong. Please try again or email us directly.</p>
      )}

      <Button type="submit" disabled={status === "submitting"} size="lg" className="w-full sm:w-auto">
        {status === "submitting" ? "Sending..." : "Send Inquiry"}
      </Button>
    </form>
  );
}

export default function ContactPage() {
  return (
    <div className="flex flex-col pt-40 pb-32">
      <div className="container mx-auto px-6 max-w-7xl">
        <Reveal>
          <h1 className="font-serif text-5xl md:text-7xl mb-8">Start a Conversation</h1>
          <p className="text-xl md:text-2xl text-ink/70 max-w-3xl mb-12 lg:mb-24 leading-relaxed">
            Whether you have a floor plan ready or just a vision, we'd love to hear about your project.
          </p>
        </Reveal>

        {/* Mobile Quick Contact Links */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16 lg:hidden">
          <a href={`https://wa.me/${studio.contact.whatsapp.replace(/\D/g, '')}`} className="flex items-center justify-center h-12 px-6 rounded-sm bg-[#25D366] text-white font-medium hover:bg-[#20bd5a] transition-colors">
            WhatsApp Us
          </a>
          <a href={`tel:${studio.contact.phone.replace(/\D/g, '')}`} className="flex items-center justify-center h-12 px-6 rounded-sm border border-ink/20 text-ink font-medium hover:bg-ink/5 transition-colors">
            Call Us
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5 space-y-16">
            <Reveal delay={0.1}>
              <h3 className="text-xs uppercase tracking-widest font-medium text-brass mb-4">Studio</h3>
              <p className="text-lg text-ink/80 leading-relaxed mb-6">
                {studio.contact.address.split(', ').map((line, i) => (
                  <span key={i}>{line}<br /></span>
                ))}
              </p>
              <div className="aspect-[4/3] w-full bg-bone relative">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0068866160163!2d77.636652614822!3d12.971415290855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae16a73c523555%3A0xcf953fb30335805c!2s12th%20Main%20Rd%2C%20HAL%202nd%20Stage%2C%20Indiranagar%2C%20Bengaluru%2C%20Karnataka%20560038!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, filter: "grayscale(100%) opacity(80%)" }} 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                  title="Map showing location of Studio Aangan"
                ></iframe>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <h3 className="text-xs uppercase tracking-widest font-medium text-brass mb-4">Contact</h3>
              <div className="space-y-2 text-lg text-ink/80">
                <p><a href={`mailto:${studio.contact.email}`} className="hover:text-brass transition-colors">{studio.contact.email}</a></p>
                <p><a href={`tel:${studio.contact.phone.replace(/\D/g, '')}`} className="hover:text-brass transition-colors">{studio.contact.phone}</a></p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:pl-12">
            <Reveal delay={0.3}>
              <Suspense fallback={<div className="h-64 flex items-center justify-center text-ink/50">Loading form...</div>}>
                <ContactFormInner />
              </Suspense>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
