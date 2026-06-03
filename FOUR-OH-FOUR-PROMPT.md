# MASTER PROMPT — Premium Error & "Not Found" Experience for Studio Aangan
### Paste into Antigravity. Build every error/empty state in the app into a rich, on-brand, media-driven, mobile-first experience. Integrate with the EXISTING repo — do not reinvent the design system. Verify live, then keep the build clean.

---

## 0. HOW TO WORK
You are a senior front-end engineer + art director working **inside the existing `C:\dev\studio-aangan` Next.js (App Router, React 19, Tailwind v4) repo.** Reuse the existing design system and content. Work autonomously to completion: build it, run `pnpm dev`, open the routes in a browser, fix what's broken, and finish only when every error state renders beautifully on mobile and desktop and `pnpm build` is clean.

**Apply these hard lessons from this project (they have bitten us repeatedly):**
- **L1 — Never reference an asset that doesn't exist.** Every `src` (image OR video) must resolve to a real file on disk, or have an `onError` fallback. A missing file must never show a broken icon or crash a page.
- **L2 — No fake interactions.** The search, the "random project" button, suggested links — all must really work.
- **L3 — Mobile-first parity.** Everything visible/usable on desktop must be visible/usable at 320–430px. Nothing hover-only without a touch equivalent.
- **L4 — Don't break the working build.** `error.tsx`/`global-error.tsx` must be `"use client"`; `global-error.tsx` must render its own `<html>`/`<body>`. `next/image fill` needs a sized, positioned parent.
- **L5 — Respect `prefers-reduced-motion`** and do NOT reintroduce the removed CustomCursor.

---

## 1. EXISTING REPO CONTEXT (reuse all of this)
- **Design tokens** (in `globals.css`): `--paper #FBF8F3`, `--bone #F3ECE1`, `--ink #1C1A17`, `--stone #9A8F7E`, `--stone-2 #C7BCA9`, `--clay #B4583B`, `--sage #6E7763`, `--brass #A98B5D`. Tailwind classes: `bg-paper`, `text-ink`, `text-brass`, `border-stone-2`, etc.
- **Fonts:** `font-serif` = Fraunces (display), `font-sans` = Inter (body).
- **Components to reuse:** `@/components/ui/Button` (variants `primary`/`outline`/`secondary`/`ghost`, sizes `sm`/`md`/`lg`, `asChild`), `@/components/motion/Reveal`, `@/components/motion/Parallax` (now safe for `fill` images), `@/components/motion/Marquee`, `@/components/ui/BeforeAfter`.
- **Content files:** `@/content/studio` (`.contact.email/.phone/.whatsapp/.socials`, `.citiesServed`), `@/content/projects` (`slug,name,city,type,coverImage,beforeAfter{before,after}`), `@/content/services` (`slug,name,promise`), `@/content/posts` (`slug,title,coverImage,category,excerpt`). Helper `formatINR` in `@/lib/format`.
- **Header + Footer are already global** in `layout.tsx`, so `not-found.tsx` renders inside them automatically. `error.tsx` does NOT include them (it replaces the segment) — add a minimal logo/back link there.
- **Existing image you can use now:** `/images/misc/404-room.webp` (a charming empty room mid-renovation). Other real images: project covers `/images/projects/<slug>/cover.webp`, journal covers, `/images/misc/cta-plaster.webp`, `/images/misc/og-default.webp`.

---

## 2. OBJECTIVE & FILES TO CREATE/UPDATE
Turn **every** error and "not found" state into a premium, content-rich, media-rich, mobile-first experience that keeps people on the site. Build:

1. `src/app/not-found.tsx` — the flagship global 404 (rich).
2. `src/app/portfolio/[slug]/not-found.tsx` — "project not found".
3. `src/app/services/[slug]/not-found.tsx` — "service not found".
4. `src/app/journal/[slug]/not-found.tsx` — "article not found".
5. `src/app/error.tsx` — runtime error boundary (`"use client"`, 500-style, with retry).
6. `src/app/global-error.tsx` — root error boundary (`"use client"`, renders own `<html>/<body>`).
7. `src/components/error/ErrorLayout.tsx` — shared, reusable layout for all of the above (DRY).
8. `src/components/error/NotFoundSearch.tsx` — working client-side search (`"use client"`).
9. `src/components/error/AmbientMedia.tsx` — image/video hero with real fallback (`"use client"`).
10. **Add `notFound()` guards** in `portfolio/[slug]/page.tsx`, `services/[slug]/page.tsx`, `journal/[slug]/page.tsx` so invalid slugs actually trigger these pages (see §10).

---

## 3. SHARED COMPONENT — `ErrorLayout`
A single, reusable layout so every error page is consistent and on-brand. Props:
```ts
interface ErrorLayoutProps {
  code?: string;              // "404" | "500" | "" 
  eyebrow?: string;           // small-caps label, e.g. "Page not found"
  title: string;             // big Fraunces headline (witty, on-brand)
  body: string;              // reassuring paragraph
  media?: ReactNode;         // <AmbientMedia/> or an image
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  children?: ReactNode;      // suggested links / search / extras
}
```
Layout: full-viewport-height section, `bg-paper`, generous whitespace, editorial asymmetric grid (media on one side, copy on the other; stacks on mobile with media first). Oversized Fraunces title with a `Reveal` stagger, a faint paper-grain overlay, a giant low-opacity outlined "404"/"500" numeral behind the headline as a design accent. Mobile-first: single column, media ~40vh, copy below, CTAs full-width-stacked.

---

## 4. PAGE-BY-PAGE SPECS

### 4.1 Global 404 — `app/not-found.tsx` (the flagship)
A server component composing `ErrorLayout` + client children. Sections:
1. **Ambient hero media** via `<AmbientMedia/>` (§5): full-bleed empty-room visual with Ken-Burns/parallax + grain.
2. **Copy:** eyebrow "Error 404 — Page not found", a witty Fraunces headline (pick from the §7 bank, e.g. *"You've wandered into an empty room."*), reassuring body, and CTAs: primary **"Back to home"** (`/`), secondary **"View our work"** (`/portfolio`).
3. **Working search** `<NotFoundSearch/>` (§6) — "Looking for something? Search the studio."
4. **Suggested destinations** — a responsive grid (1 col mobile / 3 desktop) of **real** cards using existing images: top 3 projects (`projects.slice(0,3)` → `coverImage`, name, city·type, link to case study) and a row of quick links (Services, Pricing, Journal, Contact). Cards use `next/image` with `onError` fallback to a tinted block.
5. **"Take me somewhere beautiful"** — a working button that navigates to a **random** project case study (client component using `useRouter`).
6. **Contact nudge** — "Think this is a broken link? Tell us." → `mailto:${studio.contact.email}` and a WhatsApp link.
7. Page returns **HTTP 404** automatically (it's `not-found.tsx`). Add `export const metadata = { title: "Page not found", robots: { index: false, follow: true } }`.

### 4.2 Project not found — `portfolio/[slug]/not-found.tsx`
`ErrorLayout` with code "404", title *"That project isn't in our portfolio… yet."*, body inviting them to browse. Below: a grid of **all** real projects (covers from disk) as links, plus CTA "Start your own project" → `/contact`. Media = a real project cover or `404-room.webp`.

### 4.3 Service not found — `services/[slug]/not-found.tsx`
Title *"We don't offer that — but we offer plenty."* Render the full `services` list as elegant linked rows (name + `promise`), CTA → `/contact`.

### 4.4 Article not found — `journal/[slug]/not-found.tsx`
Title *"This story hasn't been written."* Show `posts` (recent 3–4) with real covers + excerpts, CTA "Read the journal" → `/journal`.

### 4.5 Runtime error — `app/error.tsx` (`"use client"`)
Receives `{ error, reset }`. Title *"Something cracked in the foundation."* Body reassures. Buttons: **"Try again"** (calls `reset()`) and **"Back to home"** (`/`). Include a small `aangan` wordmark + a subtle ambient image (`cta-plaster.webp`). `useEffect(() => console.error(error), [error])`. Keep it self-contained (Header/Footer aren't present here) — add a minimal top bar with the logo.

### 4.6 Root error — `app/global-error.tsx` (`"use client"`)
Must render its own `<html lang="en"><body>…`. Minimal, on-brand fatal-error screen with the wordmark, a calm message *"We're patching the plaster. Please refresh."*, and a "Try again" (`reset()`) button. Inline the few critical styles or import `globals.css` so it isn't unstyled.

---

## 5. MEDIA STRATEGY — images + video + motion (read carefully; this is where things break)
Build `src/components/error/AmbientMedia.tsx` (`"use client"`) that renders a beautiful, lightweight hero. **Priority order, with real fallbacks (L1):**

1. **Optimized ambient VIDEO (if you can produce a real one).** If you can generate/produce a short, calm, muted interior loop (≈8–16s, ≤2–3 MB, encode **both** `.webm` and `.mp4`, ~720p), put it in `public/videos/404-ambient.{webm,mp4}` and render:
   ```tsx
   <video autoPlay muted loop playsInline preload="metadata"
     poster="/images/misc/404-room.webp"
     onError={() => setVideoFailed(true)}
     className="absolute inset-0 w-full h-full object-cover">
     <source src="/videos/404-ambient.webm" type="video/webm" />
     <source src="/videos/404-ambient.mp4" type="video/mp4" />
   </video>
   ```
   On mobile (`max-width: 768px`) or `prefers-reduced-motion`, **skip the video** and show the poster image only (save data/battery). If `videoFailed`, fall back to the image.
2. **If you CANNOT produce a real video file, DO NOT add a `<video>` pointing at a missing path.** Instead use the image (`404-room.webp` or a newly generated unique one) with a slow **Ken-Burns** CSS animation (scale 1→1.08 over ~12s) wrapped in the existing `Parallax`, plus a faint film-grain overlay. This looks "video-like" with zero risk.
3. **New images:** if you generate any new image for these pages, make it **unique** (no duplicates), save under `public/images/misc/`, add it to `image-manifest.json`, and wire it with an `onError` fallback. Reuse `404-room.webp` where it fits.

Always include: a soft `bg-ink/20` scrim for text contrast, grain, and a sized/positioned parent so `object-cover`/`fill` actually shows (L4).

---

## 6. WORKING SEARCH — `NotFoundSearch.tsx` (`"use client"`, real)
Build a small, genuinely-working client search:
- Build a static index at module load from real data: every route (`/`, `/studio`, `/services`, `/portfolio`, `/before-after`, `/pricing`, `/journal`, `/contact`, `/faq`) + every `project` (title+slug→`/portfolio/${slug}`) + every `service` (→`/services/${slug}`) + every `post` (→`/journal/${slug}`). Each entry: `{ label, href, type, image? }`.
- Controlled input; on type, case-insensitive `includes` filter; render up to 6 results as links with a tiny thumbnail (real `coverImage` where available, `onError` fallback) + type tag. Keyboard accessible (focusable results, Enter navigates, Esc clears). Empty input shows a few "popular" suggestions. No external libs needed.
- Styled to the system: `bg-bone`, `border-stone-2`, brass focus ring, ≥44px tap height, 16px font (no iOS zoom).

---

## 7. COPY BANK (pick the best; keep it warm, witty, confident — Studio Aangan voice)
**404 headlines:** "You've wandered into an empty room." · "This page is off the floor plan." · "Nothing's been built here… yet." · "A room without a door." · "This wall doesn't lead anywhere."
**404 body:** "The page you're looking for may have moved, been renovated, or never existed. Let's walk you back to something beautiful."
**Project-not-found:** "That project isn't in our portfolio… yet."
**Service-not-found:** "We don't offer that — but we offer plenty."
**Article-not-found:** "This story hasn't been written."
**500 / error:** "Something cracked in the foundation." · body: "A beam came loose on our end. Try again, or head back home while we patch the plaster."
**global-error:** "We're patching the plaster. Please refresh."
Use proper typography (curly quotes, ₹, en/em dashes). One tasteful line of wit max — never corny.

---

## 8. MOTION & INTERACTION
- `Reveal` stagger on eyebrow → title → body → CTAs. `Parallax` + Ken-Burns on the media. Faint grain. Giant outlined "404"/"500" numeral drifting subtly behind the headline (parallax, reduced-motion safe).
- Magnetic hover on the primary CTA (desktop, `pointer: fine` only).
- "Random project" button works on click. Search works on input.
- **All motion respects `prefers-reduced-motion`** (no Ken-Burns, no parallax, no drift — content appears instantly).

---

## 9. MOBILE-FIRST & ACCESSIBILITY (parity is mandatory — L3)
- Design at 375px first. No horizontal overflow 320–430px. Media ~40vh on mobile, copy below, CTAs full-width stacked, search full-width. Suggested cards 1-col on mobile.
- Tap targets ≥44px; inputs ≥16px. Everything works by touch + keyboard.
- Semantic: one `<h1>` per page, `role`/labels on search, focus-visible brass rings, sufficient contrast (verify clay/brass on paper, and white on the scrim).
- Screen-reader: the 404 announces itself (the `<h1>` + the eyebrow "Error 404"). Don't trap focus.

---

## 10. STATUS CODES, ROUTING & SEO
- **Trigger the pages:** in `portfolio/[slug]/page.tsx`, `services/[slug]/page.tsx`, `journal/[slug]/page.tsx`, import `notFound` from `next/navigation` and call it when the slug lookup returns undefined (e.g. `const project = projects.find(p => p.slug === slug); if (!project) notFound();`). Add `generateStaticParams()` if missing so valid slugs are statically generated and invalid ones 404.
- `not-found.tsx` returns HTTP 404 automatically — keep it that way. Add `metadata` with `robots: { index: false }` to all not-found pages.
- Do not let any error page reference a missing asset (re-confirm against disk).

---

## 11. DESIGN-SYSTEM INTEGRATION (don't reinvent)
Use the existing `Button`, `Reveal`, `Parallax`, tokens, fonts, and content files. Match the look of the rest of the site (warm, editorial, hairlines, small-caps eyebrows, square-ish corners). Do **not** reintroduce the removed CustomCursor. Keep the global Header/Footer behavior intact (they wrap `not-found.tsx`). Reuse `formatINR` only if you show prices.

---

## 12. VERIFICATION (do it for real before declaring done)
1. `pnpm dev`. Visit a bogus URL `/this-does-not-exist` → the rich global 404 renders, returns 404, console clean, all images load (Network tab — no 404s on assets), video plays OR cleanly falls back to the image.
2. Visit `/portfolio/nope`, `/services/nope`, `/journal/nope` → the segment-specific not-found pages render with real suggested content and working links.
3. Force a runtime error (temporarily throw in a page) → `error.tsx` shows, "Try again" calls `reset()` and recovers. Revert the throw.
4. At **390px**: every error page has no horizontal overflow, media + copy + CTAs + search are all usable by touch; mobile sticky bar doesn't cover the CTAs.
5. Toggle `prefers-reduced-motion` → animations degrade gracefully; video is skipped.
6. `pnpm build` is clean (no TS/ESLint errors; `error.tsx`/`global-error.tsx` are `"use client"`; `global-error.tsx` renders its own `<html>/<body>`). Run a quick Lighthouse on the 404 → A11y/BP/SEO stay at 100.
7. Re-scan: grep every `/images/` and `/videos/` reference you added and confirm each file exists on disk (or has an `onError` fallback).

---

## 13. GUARDRAILS
- No broken asset references; no `<video>` pointing at a missing file; every media has a fallback.
- No placeholders, no lorem, no fake search/buttons.
- Mobile parity is mandatory; respect reduced-motion.
- Don't break the existing working build or design system; don't reintroduce the custom cursor.
- When done, report exactly which files you created/changed and the result of each verification step.

**Now build the full error-experience system, verify it live in the browser at desktop and 390px, and finish with a clean `pnpm build`.**
