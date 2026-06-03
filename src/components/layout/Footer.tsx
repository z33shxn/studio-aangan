"use client";

import { useState } from "react";
import Link from "next/link";
import { studio } from "@/content/studio";
import { slugify } from "@/content/locations";

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to subscribe");
      setStatus("success");
      setEmail("");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  }

  return (
    <footer className="bg-ink text-paper pt-20 pb-28 lg:pb-10 relative z-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand & Newsletter */}
          <div className="space-y-6 lg:col-span-3">
            <Link href="/" className="inline-block">
              <span className="font-serif text-3xl lowercase tracking-tight">aangan</span>
            </Link>
            <p className="text-sm text-paper/70 leading-relaxed max-w-xs">
              {studio.tagline} {studio.heroProposition}
            </p>

            <div className="pt-4">
              <h3 className="text-[10px] uppercase tracking-widest font-medium text-brass mb-3">Newsletter</h3>
              <form onSubmit={handleSubscribe} className="relative max-w-xs">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "submitting" || status === "success"}
                  className="w-full min-h-[44px] bg-transparent border-b border-paper/20 pb-2 text-sm focus:outline-none focus:border-brass text-paper placeholder:text-paper/30 disabled:opacity-50 transition-colors"
                  required
                />
                <button 
                  type="submit" 
                  disabled={status === "submitting" || status === "success"}
                  className="absolute right-0 top-0 bottom-2 text-[10px] uppercase tracking-widest font-medium text-brass hover:text-paper transition-colors disabled:opacity-50 min-w-[44px] min-h-[44px] flex items-center justify-end"
                >
                  {status === "submitting" ? "..." : status === "success" ? "Done" : "Join"}
                </button>
              </form>
              {status === "success" && <p className="text-xs text-[#25D366] mt-2">Thank you for subscribing.</p>}
              {status === "error" && <p className="text-xs text-red-400 mt-2">{errorMsg}</p>}
            </div>
          </div>

          {/* Studio */}
          <div className="space-y-6 lg:col-span-2">
            <h3 className="text-[10px] uppercase tracking-widest font-medium text-brass">Studio</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/studio" className="text-paper/70 hover:text-paper transition-colors">About</Link></li>
              <li><Link href="/team" className="text-paper/70 hover:text-paper transition-colors">Team</Link></li>
              <li><Link href="/process" className="text-paper/70 hover:text-paper transition-colors">Process</Link></li>
              <li><Link href="/careers" className="text-paper/70 hover:text-paper transition-colors">Careers</Link></li>
              <li><Link href="/press" className="text-paper/70 hover:text-paper transition-colors">Press</Link></li>
            </ul>
          </div>

          {/* Work */}
          <div className="space-y-6 lg:col-span-2">
            <h3 className="text-[10px] uppercase tracking-widest font-medium text-brass">Work</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/portfolio" className="text-paper/70 hover:text-paper transition-colors">Portfolio</Link></li>
              <li><Link href="/before-after" className="text-paper/70 hover:text-paper transition-colors">Before & After</Link></li>
              <li><Link href="/services" className="text-paper/70 hover:text-paper transition-colors">Services</Link></li>
              <li><Link href="/pricing" className="text-paper/70 hover:text-paper transition-colors">Pricing</Link></li>
            </ul>
          </div>

          {/* Locations */}
          <div className="space-y-6 lg:col-span-2">
            <h3 className="text-[10px] uppercase tracking-widest font-medium text-brass">Locations</h3>
            <ul className="space-y-3 text-sm">
              {studio.citiesServed.map(city => (
                <li key={city}><Link href={`/locations/${slugify(city)}`} className="text-paper/70 hover:text-paper transition-colors">{city}</Link></li>
              ))}
              <li className="pt-2"><Link href="/locations" className="text-brass hover:text-paper transition-colors">All locations →</Link></li>
            </ul>
          </div>

          {/* More & Contact */}
          <div className="space-y-6 lg:col-span-3">
            <h3 className="text-[10px] uppercase tracking-widest font-medium text-brass">More</h3>
            <ul className="space-y-3 text-sm flex gap-4 lg:gap-0 flex-wrap lg:flex-col">
              <li><Link href="/journal" className="text-paper/70 hover:text-paper transition-colors">Journal</Link></li>
              <li><Link href="/faq" className="text-paper/70 hover:text-paper transition-colors">FAQ</Link></li>
              <li><Link href="/testimonials" className="text-paper/70 hover:text-paper transition-colors">Testimonials</Link></li>
              <li><Link href="/contact" className="text-paper/70 hover:text-paper transition-colors">Contact</Link></li>
            </ul>

            <div className="pt-4">
              <h3 className="text-[10px] uppercase tracking-widest font-medium text-brass mb-3">Reach Us</h3>
              <ul className="space-y-2 text-sm text-paper/70">
                <li><a href={`mailto:${studio.contact.email}`} className="hover:text-paper transition-colors">{studio.contact.email}</a></li>
                <li><a href={`tel:${studio.contact.phone.replace(/\s+/g, '')}`} className="hover:text-paper transition-colors">{studio.contact.phone}</a></li>
              </ul>
              <div className="flex gap-4 text-sm mt-4">
                <a href={studio.contact.socials.instagram} target="_blank" rel="noreferrer" className="text-paper/70 hover:text-paper transition-colors">IG</a>
                <a href={studio.contact.socials.pinterest} target="_blank" rel="noreferrer" className="text-paper/70 hover:text-paper transition-colors">PIN</a>
                <a href={studio.contact.socials.linkedin} target="_blank" rel="noreferrer" className="text-paper/70 hover:text-paper transition-colors">IN</a>
              </div>
            </div>
          </div>

        </div>

        <div className="border-t border-paper/10 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs text-paper/50">
          <div className="space-y-1">
            <p>© {new Date().getFullYear()} Studio Aangan. All rights reserved.</p>
            <p>Made in Bengaluru.</p>
          </div>
          <div className="text-left md:text-right space-y-1">
            <p>Prices in ₹ (INR), exclusive of 18% GST unless stated.</p>
            <div className="flex gap-4 pt-1">
              <Link href="/privacy" className="hover:text-paper transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-paper transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
