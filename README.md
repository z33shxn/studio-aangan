# Studio Aangan

A modern, high-performance web application for Studio Aangan, an interior design and architecture studio based in Bengaluru.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Smooth Scroll**: Lenis
- **Package Manager**: pnpm

## Setup & Development

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Environment Variables**:
   Copy `.env.example` to `.env.local` and populate the optional keys:
   - `NEXT_PUBLIC_SITE_URL`: Canonical URL (e.g. `https://studioaangan.in` or preview URL) for OG images and sitemap.
   - `RESEND_API_KEY`: API key for email delivery via Resend.
   - `CONTACT_TO_EMAIL`: Destination email address for inquiries.
   - `NEXT_PUBLIC_ANALYTICS`: Set to `1` to enable Vercel Analytics and Speed Insights.

3. **Run Development Server**:
   ```bash
   pnpm dev
   ```

## Production QA Sweep

To verify that the application passes all internal quality metrics (zero console errors, layout shift < 0.05, no stranded images, etc.):

1. **Build the application**:
   ```bash
   pnpm build
   ```

2. **Run the production server and QA script**:
   ```bash
   pnpm start
   # In a separate terminal window:
   node scripts/qa-sweep.mjs
   ```

## Deployment

This application is ready to be deployed to Vercel out of the box.

1. **Import via Vercel**: Connect the GitHub repository in the Vercel dashboard. The framework will be automatically detected as Next.js.
2. **Environment Variables**: Ensure `NEXT_PUBLIC_SITE_URL` is set to the production URL in the Vercel project settings to guarantee correct canonical URLs and OpenGraph images.

All features (including the contact form and analytics) degrade gracefully if their respective environment variables are omitted.
