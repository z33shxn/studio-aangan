import Link from "next/link";
import { studio } from "@/content/studio";

export const metadata = {
  title: "Terms of Use",
  description: "Terms and conditions for engaging with Studio Aangan.",
};

export default function TermsPage() {
  return (
    <div className="flex flex-col pt-40 pb-24 px-6 bg-paper min-h-screen">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-xs uppercase tracking-widest font-medium text-brass mb-6">Legal</h1>
        <h2 className="font-serif text-4xl md:text-5xl mb-12 text-ink">Terms of Use</h2>
        
        <div className="prose prose-neutral prose-lg prose-headings:font-serif prose-headings:font-normal prose-h3:text-2xl prose-h3:mt-12 prose-p:text-ink/80 prose-li:text-ink/80 max-w-none">
          <p>
            Welcome to Studio Aangan. By accessing our website or engaging our services, you agree to comply with 
            and be bound by the following terms and conditions.
          </p>

          <h3>1. Scope of Services</h3>
          <p>
            Studio Aangan provides interior design, architecture, and styling services. The specific scope, timeline, 
            and deliverables of any project will be mutually agreed upon in a formal design contract prior to commencement.
          </p>

          <h3>2. Estimates and Pricing</h3>
          <p>
            All quotations, budget calculators, and pricing bands provided on our website or during initial consultations 
            are <strong>estimates only</strong>. The final cost of your project will depend heavily on material selections, 
            site conditions, and scope adjustments. 
          </p>
          <p>
            Unless explicitly stated otherwise, all prices and estimates are <strong>exclusive of 18% GST</strong>.
          </p>

          <h3>3. Intellectual Property</h3>
          <p>
            All designs, concepts, floor plans, 3D visualizations, and images produced by Studio Aangan remain the 
            intellectual property of the studio. You may not reproduce, distribute, or use these materials for other 
            projects without our explicit written consent. We reserve the right to photograph completed projects and 
            use them in our portfolio and marketing materials.
          </p>

          <h3>4. Limitation of Liability</h3>
          <p>
            While we strive for excellence in every project, Studio Aangan shall not be held liable for delays caused 
            by third-party contractors, supply chain disruptions, or unforeseen site conditions (force majeure). Our 
            liability is limited to the extent of the design fees paid.
          </p>

          <h3>5. Governing Law</h3>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws of India. Any disputes 
            arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the courts 
            in <strong>Bengaluru, Karnataka, India</strong>.
          </p>

          <h3>6. Contact Information</h3>
          <p>
            If you have any questions regarding these terms, please reach out to us at: <br />
            <strong>Email:</strong> <a href={`mailto:${studio.contact.email}`}>{studio.contact.email}</a><br />
            <strong>Phone:</strong> {studio.contact.phone}
          </p>
          <p className="mt-8 text-sm text-ink/60 italic">
            Last Updated: June 2026
          </p>
        </div>
      </div>
    </div>
  );
}
