"use client";

import { useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      projectType: formData.get("projectType"),
      budget: formData.get("budget"),
      message: formData.get("message"),
    };

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

  return (
    <div className="flex flex-col pt-24 pb-32">
      <div className="container mx-auto px-6 max-w-7xl">
        <Reveal>
          <h1 className="font-serif text-5xl md:text-7xl mb-8">Start a Conversation</h1>
          <p className="text-xl md:text-2xl text-ink/70 max-w-3xl mb-24 leading-relaxed">
            Whether you have a floor plan ready or just a vision, we'd love to hear about your project.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5 space-y-16">
            <Reveal delay={0.1}>
              <h3 className="text-xs uppercase tracking-widest font-medium text-brass mb-4">Studio</h3>
              <p className="text-lg text-ink/80 leading-relaxed mb-6">
                12th Main Road, Indiranagar<br />
                Bengaluru, Karnataka 560038
              </p>
              <div className="aspect-[4/3] w-full bg-bone relative">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.001696423075!2d77.63583547466795!3d12.971754087343603!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae16a3e47bc111%3A0x6b107b3b3a328ab9!2s12th%20Main%20Rd%2C%20Indiranagar%2C%20Bengaluru%2C%20Karnataka%20560038!5e0!3m2!1sen!2sin!4v1709665518296!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, filter: "grayscale(100%) opacity(80%)" }} 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                ></iframe>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <h3 className="text-xs uppercase tracking-widest font-medium text-brass mb-4">Contact</h3>
              <div className="space-y-2 text-lg text-ink/80">
                <p><a href="mailto:hello@studioaangan.com" className="hover:text-brass transition-colors">hello@studioaangan.com</a></p>
                <p><a href="tel:+919876543210" className="hover:text-brass transition-colors">+91 98765 43210</a></p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:pl-12">
            <Reveal delay={0.3}>
              {status === "success" ? (
                <div className="bg-bone p-12 text-center border border-ink/10">
                  <h3 className="font-serif text-3xl mb-4">Thank You</h3>
                  <p className="text-ink/70">We have received your inquiry and will get back to you within 48 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8 bg-paper">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                      <label htmlFor="name" className="block text-xs uppercase tracking-widest font-medium text-ink/70 mb-3">Name *</label>
                      <Input id="name" name="name" required placeholder="Jane Doe" className="bg-bone border-transparent focus:border-brass focus:bg-white" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs uppercase tracking-widest font-medium text-ink/70 mb-3">Email *</label>
                      <Input id="email" name="email" type="email" required placeholder="jane@example.com" className="bg-bone border-transparent focus:border-brass focus:bg-white" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                      <label htmlFor="phone" className="block text-xs uppercase tracking-widest font-medium text-ink/70 mb-3">Phone</label>
                      <Input id="phone" name="phone" type="tel" placeholder="+91" className="bg-bone border-transparent focus:border-brass focus:bg-white" />
                    </div>
                    <div>
                      <label htmlFor="projectType" className="block text-xs uppercase tracking-widest font-medium text-ink/70 mb-3">Project Type</label>
                      <select id="projectType" name="projectType" className="flex h-10 w-full rounded-none border border-input bg-bone px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-transparent focus:border-brass focus:bg-white">
                        <option value="residential">Residential</option>
                        <option value="commercial">Commercial</option>
                        <option value="renovation">Renovation</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="budget" className="block text-xs uppercase tracking-widest font-medium text-ink/70 mb-3">Estimated Budget</label>
                    <select id="budget" name="budget" className="flex h-10 w-full rounded-none border border-input bg-bone px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-transparent focus:border-brass focus:bg-white">
                      <option value="15-25L">₹15L - ₹25L</option>
                      <option value="25-50L">₹25L - ₹50L</option>
                      <option value="50L+">₹50L+</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs uppercase tracking-widest font-medium text-ink/70 mb-3">Tell us about your space *</label>
                    <Textarea id="message" name="message" required rows={5} placeholder="We are looking to redesign our 3BHK..." className="bg-bone border-transparent focus:border-brass focus:bg-white resize-none" />
                  </div>

                  {status === "error" && (
                    <p className="text-red-600 text-sm">Something went wrong. Please try again or email us directly.</p>
                  )}

                  <Button type="submit" disabled={status === "submitting"} size="lg" className="w-full sm:w-auto">
                    {status === "submitting" ? "Sending..." : "Send Inquiry"}
                  </Button>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
