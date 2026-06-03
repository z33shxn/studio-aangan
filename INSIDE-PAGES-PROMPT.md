# MASTER PROMPT — Build Out All Inside Pages (Zero Dead Ends) for Studio Aangan
### Paste into Antigravity. Goal: every link on the site opens a real, complete, content-rich page. Build the missing pages, add a deep layer of new inside pages, and wire everything into nav/footer so nothing is a dead end and nothing is orphaned. Integrate with the EXISTING repo. Verify live; keep the build clean.

---

## 0. HOW TO WORK
You are a senior front-end engineer + content designer working **inside the existing `C:\dev\studio-aangan` Next.js (App Router, React 19, Tailwind v4) repo.** Reuse the existing design system, components, and content. Work autonomously to completion: build every page fully (real India-specific copy + real images), wire it into navigation, run `pnpm dev`, click through every link in a browser, fix anything that 404s, and finish only when **every internal link resolves to a real page** and `pnpm build` is clean.

**Governing principle (the whole point of this task):**
> **No dead ends, no orphans.** Every `<Link>`/`href` on the site must open a real, finished page. Every page must be reachable from the header or footer. The custom 404 page should only ever be hit by a genuinely mistyped URL — never by clicking something on the site.

**Apply these hard-won lessons (they have repeatedly bitten this project):**
- **L1 — Never reference a missing asset/route.** Every internal link must point to a real page; every image `src` must resolve on disk or have an `onError` fallback.
- **L2 — No fake content or interactions.** Real copy (no lorem), real working accordions/filters/forms.
- **L3 — Mobile-first parity** (320–430px): nothing hidden or hover-only without a touch equivalent.
- **L4 — Reuse existing images/content; generate new images only when truly needed**, and if you do: make them **unique** (no duplicates), add to `image-manifest.json`, wire with `onError`, and run the verify script.
- **L5 — Respect `prefers-reduced-motion`; do NOT reintroduce the removed CustomCursor; don't break the working build.**

---

## 1. CURRENT STATE (audit result — build against this)
**Existing routes:** `/`, `/studio`, `/services` + `/services/[slug]`, `/portfolio` + `/portfolio/[slug]`, `/journal` + `/journal/[slug]`, `/before-after`, `/pricing`, `/contact`. Error system exists (`not-found.tsx`, `error.tsx`, etc.).

**Confirmed dead links (currently 404 when clicked):**
- `/privacy` — linked in `Footer.tsx` (line ~129), **no page exists.**
- `/terms` — linked in `Footer.tsx` (line ~130), **no page exists.**

**Spec'd pages never built (no depth):** `/process`, `/faq`, `/testimonials`. **No location pages exist.**

**Reuse these:** tokens (`--paper/--bone/--ink/--clay/--brass/--sage/--stone-2`), fonts (`font-serif`=Fraunces, `font-sans`=Inter), components (`Button`, `Reveal`, `Parallax`, `Marquee`, `Counter`, `BeforeAfter`, `ErrorLayout`), content (`@/content/studio`, `projects`, `services`, `posts`, `testimonials`, `faqs`), `formatINR`. There are **80 existing unique images** in `public/images/` — reuse them.

---

## 2. PAGES TO BUILD
Build every page below — full design, real content, mobile-first, SEO metadata, reachable from footer (and header where noted). Each must look like the rest of the site (warm editorial, hairlines, small-caps eyebrows, oversized Fraunces headings, `Reveal`/`Parallax` motion).

### GROUP A — LEGAL (REQUIRED: these are the live dead links)
**`/privacy` → `src/app/privacy/page.tsx`** — Real, readable, India-appropriate Privacy Policy: what data is collected (enquiry form: name, email, phone, project details), why (to respond to enquiries), lawful basis, no selling/sharing of data, third parties (Resend for email, Vercel Analytics — cookieless), cookies note, data retention, user rights, and a contact line (`studio.contact.email`). Clean typographic layout, last-updated date, links back to Contact.

**`/terms` → `src/app/terms/page.tsx`** — Terms of Service / Use: scope, intellectual-property of designs/images, quotations are estimates (final ₹ depends on selections, exclusive of 18% GST), no guarantee of availability, limitation of liability, governing law (Karnataka, India), and contact. Same clean layout.

*(Optional `/cookies` if you reference cookies — otherwise fold into Privacy.)*

### GROUP B — DEPTH PAGES (build + add to nav/footer)
**`/process` → `src/app/process/page.tsx`** — "How We Work." A vertical, scroll-animated **timeline** with sticky step labels: **01 Consultation → 02 Concept & Moodboard → 03 3D Visualisation → 04 Material & Budget Sign-off → 05 Execution & Site Management → 06 Styling & Handover.** Each step: what happens, what you receive, rough duration (in weeks). Use existing studio/service images. Open with a hero, close with a CTA to `/contact`. Add to header nav.

**`/faq` → `src/app/faq/page.tsx`** — Accessible **accordion** (keyboard-operable, one or many open) built from `@/content/faqs`, grouped: *Working with us · Timelines · Pricing & payments · Cities & site visits · Vastu · After handover.* Add **`FAQPage` JSON-LD**. CTA to `/contact`. Add to footer (and header if room).

**`/testimonials` → `src/app/testimonials/page.tsx`** — Full client-stories page from `@/content/testimonials`: a mix of large featured quotes and compact cards, client name + project + city, optional portraits (`testimonials/client-1..4.webp` exist), a star row, and a "Read case studies" link to `/portfolio`. Add to footer.

### GROUP C — LOCATION PAGES (the big depth + local-SEO layer)
Create a dynamic location system from `studio.citiesServed` = **Bengaluru, Hyderabad, Pune, Chennai, Kochi**.
- **`/locations` → `src/app/locations/page.tsx`** — index listing all 5 cities as elegant cards (city name, count of projects there, a representative image), linking to each.
- **`/locations/[city]` → `src/app/locations/[city]/page.tsx`** with `generateStaticParams()` from the slugified city list (e.g. `bengaluru`), and `notFound()` for any other slug. Each city page (real, derived from existing data — minimal/no new images):
  1. **Hero:** "Interior Designers in {City}" + a local one-liner. Image = a real **project cover from that city** if one exists (filter `projects` by `city`), else `404-room.webp` or one newly-generated unique city hero.
  2. **Intro:** Studio Aangan's presence in {City} — how they work there (design remotely + on-site visits), turnaround, and the broader cities served.
  3. **Projects in {City}:** filter `projects` by `city` → grid of real case studies (covers exist). If none, show "Now taking on projects in {City}" + nearest work.
  4. **What we do in {City}:** the full `services` list as linked rows.
  5. **Pricing in {City}:** pull `pricing.calculatorBands[City]` → show ₹/sq ft ranges via `formatINR` ("Design from ₹X/sq ft · Turnkey from ₹Y/sq ft"), GST note.
  6. **Process teaser** → `/process`, **testimonials** (filter by city if any), **FAQ teaser** (site visits/timelines).
  7. **CTA:** Book a consultation + WhatsApp.
  8. **`LocalBusiness`/`InteriorDesignBusiness` JSON-LD** with `areaServed` = {City}, plus `BreadcrumbList`.
- Add a **"Locations"** column to the footer linking all 5 cities.

### GROUP D — STUDIO SUB-PAGES (depth)
**`/team` → `src/app/team/page.tsx`** — Full team: founders **Ananya Rao** & **Kabir Menon** (real portraits exist) with expanded bios, plus a "the wider team" section using the existing `team-candid.webp`, and named roles (designers, project managers, site supervisors). Real, not invented faces beyond what's needed — describe roles rather than fabricate many portraits. CTA to `/careers` and `/contact`.

**`/careers` → `src/app/careers/page.tsx`** — "Work with us": studio culture/values, what you look for, perks, and roles. If there are no live openings, a genuine **open-application** block ("Send your portfolio to careers@studioaangan.in"). Reuse `studio-space-1/2.webp`. Real working mailto.

**`/press` → `src/app/press/page.tsx`** — Press & awards from `studio.press` and `studio.awards`: an awards grid (name + year), a "featured in" list of publications, and a press-enquiries contact. Reuse `awards-vignette.webp`.

---

## 3. WIRE NAVIGATION & FOOTER (no orphans)
- **Footer (`Footer.tsx`):** expand into clear columns so every new page is discoverable:
  - **Studio:** About (`/studio`), Team (`/team`), Process (`/process`), Careers (`/careers`), Press (`/press`)
  - **Work:** Portfolio, Before & After, Services, Pricing
  - **Locations:** Bengaluru, Hyderabad, Pune, Chennai, Kochi (`/locations/<slug>`) + "All locations" (`/locations`)
  - **More:** Journal, FAQ (`/faq`), Testimonials (`/testimonials`), Contact
  - **Legal row:** Privacy (`/privacy`), Terms (`/terms`)
- **Header (`Header.tsx`):** keep it clean but make depth reachable — either add **Process** and **FAQ** to the nav, or convert "Studio" into a small dropdown (About / Team / Process / Press / Careers) that works on **tap** (mobile) and hover/focus (desktop). Ensure the **mobile menu** lists the new top-level pages too (parity).
- **`app/sitemap.ts`:** add every new route (legal, process, faq, testimonials, locations index + 5 cities, team, careers, press) so they're in the XML sitemap.

---

## 4. CONTENT & DATA
- Reuse existing typed content (`studio`, `projects`, `services`, `posts`, `testimonials`, `faqs`). Add new typed data files only as needed (e.g., `src/content/legal.ts` for privacy/terms sections, `src/content/team.ts` if you add team roles, `src/content/locations.ts` for any per-city blurbs not derivable from data).
- Derive location pages from existing data wherever possible (projects by city, pricing bands, services).
- All copy: real, specific, India-rooted, Studio Aangan voice. ₹ via `formatINR`, "exclusive of 18% GST" where prices appear. No lorem, no placeholders.

---

## 5. IMAGES (controlled — avoid the duplicate trap)
- **Reuse the 80 existing images first.** Map city heroes to real project covers from that city; team → existing portraits + `team-candid`; press → `awards-vignette`; process → studio/service images; legal/faq/testimonials → little or no imagery.
- **Generate a new image only if a page has no suitable existing one.** If you must (e.g., 1 city without a project cover): make it **unique**, save under `public/images/...`, add to `image-manifest.json`, wire with `onError`, and run `node scripts/verify-images.mjs` (which now scans `src` references). Never reference a file that doesn't exist.

---

## 6. SEO
- Per-page `metadata` (title via the existing `%s | Studio Aangan` template, description, canonical). 
- JSON-LD: `FAQPage` on `/faq`; `LocalBusiness` + `areaServed` + `BreadcrumbList` on each `/locations/[city]`; `BreadcrumbList` on deep pages.
- Keep legal pages indexable; everything reachable and crawlable.

---

## 7. MOBILE-FIRST, ACCESSIBILITY, MOTION
- 375px-first; no horizontal overflow 320–430px; tap targets ≥44px; inputs ≥16px.
- The header dropdown (if added) and the FAQ accordion must work by **touch + keyboard**, with focus-visible states.
- Reuse `Reveal`/`Parallax` (reduced-motion safe). One `<h1>` per page, logical headings, alt text on all images.

---

## 8. VERIFICATION (the core acceptance test — do it for real)
1. `pnpm dev`. **Click every link in the header, the mobile menu, and the footer** — each must open a real, finished page. **Zero 404s from any on-site link.** (Specifically confirm `/privacy`, `/terms`, `/process`, `/faq`, `/testimonials`, `/locations`, all 5 `/locations/<city>`, `/team`, `/careers`, `/press`.)
2. Spot-check the new pages at **390px** and desktop: no overflow, content complete, images load (Network: no asset 404s), interactions work (FAQ accordion, any dropdown), CTAs/WhatsApp/mailto work.
3. Confirm dynamic guards: `/locations/atlantis` → custom not-found; valid cities render.
4. `node scripts/verify-images.mjs` → passes (no dangling refs).
5. `pnpm build` → clean (0 errors), and the route list includes **all** new pages. Lighthouse on a couple new pages → A11y/BP/SEO = 100.
6. Re-grep internal links vs routes: every `href="/..."` in `src` resolves to a real `page.tsx`. Report any that don't and fix them.

---

## 9. GUARDRAILS
- No dead ends (every link resolves) and no orphans (every page reachable from nav/footer).
- No lorem/placeholders; real India-specific content and ₹ pricing.
- No broken asset references; reuse existing images; generate new ones uniquely + verified.
- Mobile parity + reduced-motion; don't reintroduce the custom cursor; don't break existing pages.
- When done, report the full list of new routes created and the result of each verification step (especially the "clicked every nav/footer link, zero 404s" check).

**Now build all the inside pages, wire them into the header/footer/sitemap, verify by clicking every link in a real browser at desktop and 390px, and finish with a clean `pnpm build`.**
