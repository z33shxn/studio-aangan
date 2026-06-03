import Link from "next/link";
import { studio } from "@/content/studio";

export const metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Studio Aangan. Learn how we handle your data.",
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col pt-40 pb-24 px-6 bg-paper min-h-screen">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-xs uppercase tracking-widest font-medium text-brass mb-6">Legal</h1>
        <h2 className="font-serif text-4xl md:text-5xl mb-12 text-ink">Privacy Policy</h2>
        
        <div className="prose prose-neutral prose-lg prose-headings:font-serif prose-headings:font-normal prose-h3:text-2xl prose-h3:mt-12 prose-p:text-ink/80 prose-li:text-ink/80 max-w-none">
          <p>
            At Studio Aangan, we respect your privacy and are committed to protecting your personal data. 
            This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website 
            or use our services in India.
          </p>

          <h3>1. Information We Collect</h3>
          <p>
            We only collect information that is necessary to provide you with our design and architectural services. 
            When you contact us via our enquiry forms, we may collect:
          </p>
          <ul>
            <li><strong>Identity Data:</strong> Full name.</li>
            <li><strong>Contact Data:</strong> Email address, phone number.</li>
            <li><strong>Project Data:</strong> Location, site details, floor plans, and specific project requirements.</li>
          </ul>

          <h3>2. How We Use Your Information</h3>
          <p>We use your data solely for the following purposes:</p>
          <ul>
            <li>To respond to your inquiries and provide consultations.</li>
            <li>To generate design proposals and estimates.</li>
            <li>To communicate with you throughout the lifecycle of your project.</li>
          </ul>

          <h3>3. Data Sharing & Third Parties</h3>
          <p>
            We <strong>never</strong> sell, rent, or trade your personal information to third parties for marketing purposes. 
            We share data only with trusted partners necessary for our operations:
          </p>
          <ul>
            <li><strong>Resend:</strong> For transactional email delivery (e.g., sending contact form submissions to our team).</li>
            <li><strong>Vercel Analytics:</strong> For aggregate, cookieless website performance and traffic analysis.</li>
          </ul>

          <h3>4. Cookies</h3>
          <p>
            Our website uses minimal, strictly necessary cookies to ensure basic functionality. We rely on cookieless 
            analytics to protect your privacy while understanding how our site performs.
          </p>

          <h3>5. Data Retention</h3>
          <p>
            We retain your project data for as long as necessary to fulfill the purposes we collected it for, including 
            for the purposes of satisfying any legal, accounting, or reporting requirements under Indian law.
          </p>

          <h3>6. Your Rights</h3>
          <p>
            You have the right to request access to the personal data we hold about you, or to request its correction 
            or deletion. To exercise these rights, please contact us.
          </p>

          <h3>7. Contact Us</h3>
          <p>
            If you have any questions about this Privacy Policy, please contact us at: <br />
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
