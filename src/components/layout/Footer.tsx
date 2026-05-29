import Link from "next/link";
import { studio } from "@/content/studio";

export function Footer() {
  return (
    <footer className="bg-ink text-paper pt-20 pb-28 lg:pb-10 relative z-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          <div className="space-y-6 lg:col-span-1">
            <Link href="/" className="inline-block">
              <span className="font-serif text-3xl lowercase tracking-tight">aangan</span>
            </Link>
            <p className="text-sm text-paper/70 leading-relaxed max-w-xs">
              {studio.tagline} {studio.heroProposition}
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-[10px] uppercase tracking-widest font-medium text-brass">Studio</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/studio" className="text-paper/70 hover:text-paper transition-colors">About Us</Link></li>
              <li><Link href="/services" className="text-paper/70 hover:text-paper transition-colors">Services</Link></li>
              <li><Link href="/portfolio" className="text-paper/70 hover:text-paper transition-colors">Portfolio</Link></li>
              <li><Link href="/before-after" className="text-paper/70 hover:text-paper transition-colors">Before & After</Link></li>
              <li><Link href="/pricing" className="text-paper/70 hover:text-paper transition-colors">Pricing</Link></li>
              <li><Link href="/journal" className="text-paper/70 hover:text-paper transition-colors">Journal</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-[10px] uppercase tracking-widest font-medium text-brass">Contact</h3>
            <ul className="space-y-3 text-sm text-paper/70">
              <li><a href={`mailto:${studio.contact.email}`} className="hover:text-paper transition-colors">{studio.contact.email}</a></li>
              <li><a href={`tel:${studio.contact.phone.replace(/\s+/g, '')}`} className="hover:text-paper transition-colors">{studio.contact.phone}</a></li>
              <li>{studio.contact.hours}</li>
            </ul>
            <div className="pt-2">
              <h3 className="text-[10px] uppercase tracking-widest font-medium text-brass mb-3">Social</h3>
              <div className="flex gap-4 text-sm">
                <a href={studio.contact.socials.instagram} target="_blank" rel="noreferrer" className="text-paper/70 hover:text-paper transition-colors">Instagram</a>
                <a href={studio.contact.socials.pinterest} target="_blank" rel="noreferrer" className="text-paper/70 hover:text-paper transition-colors">Pinterest</a>
                <a href={studio.contact.socials.linkedin} target="_blank" rel="noreferrer" className="text-paper/70 hover:text-paper transition-colors">LinkedIn</a>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-[10px] uppercase tracking-widest font-medium text-brass">Location</h3>
            <p className="text-sm text-paper/70">{studio.contact.hq}</p>
            <div className="aspect-[4/3] w-full bg-paper/10 overflow-hidden relative opacity-80 hover:opacity-100 transition-opacity duration-500">
              <iframe
                title="Studio Aangan Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0068866160163!2d77.636652614822!3d12.971415290855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae16a73c523555%3A0xcf953fb30335805c!2s12th%20Main%20Rd%2C%20HAL%202nd%20Stage%2C%20Indiranagar%2C%20Bengaluru%2C%20Karnataka%20560038!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-paper/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-paper/50">
          <p>© {new Date().getFullYear()} Studio Aangan. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-paper transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-paper transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
