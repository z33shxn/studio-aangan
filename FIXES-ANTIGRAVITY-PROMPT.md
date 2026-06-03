# Studio Aangan — Full Audit & Fix Prompt (Mobile-First Parity)

You are a senior full-stack engineer + UI/UX reviewer. Below is a verified audit of THIS repo (`C:\dev\studio-aangan`), based on reading the actual source. Fix **every** item. The governing rule: **MOBILE-FIRST WITH FULL FEATURE PARITY — every feature, content block, and interaction that exists on desktop must be present and fully usable on mobile (320–430px).** Nothing may be hidden, hover-only, or desktop-only without a working touch equivalent.

Work through it, then run the Verification section and don't stop until it all passes and `pnpm build` is clean.

---

## A. CRITICAL — broken / will embarrass on launch

1. **Missing texture assets → console 404s.** `src/app/globals.css` `.bg-grain`/`.bg-plaster` reference `/images/textures/paper.png` and `/plaster.png`, which **do not exist**. Either generate the two textures as real files, or replace both with an inline SVG `feTurbulence`/CSS noise data-URI. Remove the broken `url()` refs. No 404s in console.

2. **Portfolio has NO filters and scroll-jacks on mobile.** `src/app/portfolio/page.tsx` only renders `<HorizontalGallery>`. Required: a **filterable** project index — filter by **category** (All · Residential · Apartment · Villa · Commercial · Kitchen · Hospitality) and **city** — client-side, with animated re-layout, that works by **tap** on mobile. Render it as a responsive **grid** (1 col mobile / 2–3 desktop). Do not subject mobile users to a pinned scroll-jack here.

3. **Pricing calculator can output `₹NaN`.** `src/app/pricing/page.tsx` uses `// @ts-ignore` and `pricing.calculatorBands[city][packageType]`; any missing combo → `undefined` → `NaN`. Type `calculatorBands` properly, remove `@ts-ignore`, guard the lookup with a fallback, and never render `NaN`. Use `formatINR()` from `src/lib/format.ts` instead of inline `Intl.NumberFormat`.

4. **Business contact details are inconsistent across the site (breaks trust + local SEO).**
   - `src/app/contact/page.tsx` hardcodes `hello@studioaangan.com` and `+91 98765 43210`.
   - Footer/menu/`studio.ts` use `hello@studioaangan.in`, `+91 80 4710 2200`, WhatsApp `+91 98860 41148`.
   - `src/app/api/contact/route.ts` sends from/to `hello@studioaangan.com`.
   **Pick ONE canonical email + phone + WhatsApp** and source everything from `src/content/studio.ts`. No page may hardcode contact info. Fix the API `from`/`to` and the map address to match.

---

## B. MOBILE-FIRST PARITY — desktop features that are missing or hidden on mobile (your #1 requirement)

5. **Hero ignores the mobile image.** `src/app/page.tsx` always loads `hero-main.webp`; the portrait `hero-mobile.webp` exists but is unused. Use art-directed responsive sources (`<picture>` with media queries, or two `next/image` with `hidden`/`block` at `sm`) so phones get the **portrait** hero, desktop gets the landscape one.

6. **Stats card is hidden on mobile.** In `src/app/page.tsx` the "180+ Projects Delivered" card has `hidden sm:block`. **Remove the hide** — show it on mobile (place it static below the image instead of absolutely positioned so it never overlaps).

7. **Before/After labels are hover-only → invisible on touch.** `src/components/ui/BeforeAfter.tsx` "Before"/"After" tags use `opacity-0 group-hover:opacity-100`. On touch there is no hover, so they never show. Make them **always visible on coarse-pointer devices** (or visible while dragging). Same for the "drag" affordance — show a persistent handle pill on mobile.

8. **Before/After drag fights page scroll on mobile.** The draggable container in `BeforeAfter.tsx` has `cursor-ew-resize` but **no `touch-action: none`** (only the tiny handle button has `touch-none`). Add `style={{ touchAction: "none" }}` (or `touch-none`) to the **container** so horizontal drags don't scroll the page, and make the **whole image surface** draggable on touch (not just the handle). Verify a smooth, scroll-free drag on a real phone viewport.

9. **Horizontal gallery scroll-jacks on mobile.** `src/components/motion/HorizontalGallery.tsx` applies the scroll-driven X-transform on every non-reduced-motion device, including phones. Implement: **desktop (lg+) = pinned horizontal scroll; mobile/tablet = an Embla swipe carousel** (real touch swipe, snap, dots). Both show the same projects. Also remove the unused `totalWidth` and type `projects` (no `any`).

10. **Cursor-only affordances have no mobile cue.** `data-cursor="View"/"Explore"` labels only render through the desktop `CustomCursor`. Add a **visible static cue on touch** for the same elements (e.g., a small "View →" tag on project cards, a persistent drag pill on sliders) so mobile users get the same signal desktop users get.

---

## C. BUGS & CODE QUALITY

11. **Double cursor on desktop.** `CustomCursor` draws a ring but nothing sets `body { cursor: none }`, so the native arrow shows too. On fine-pointer devices, hide the native cursor (and re-enable `cursor: auto` over text inputs/textareas). Keep it untouched on touch (it already returns null on `pointer: coarse`).

12. **Home hero isn't full-bleed under the header.** `src/app/layout.tsx` body has `pt-[88px] lg:pt-24`, which pushes the home hero down and leaves a blank strip above the transparent header. Make the **home** hero sit under the fixed header (e.g., apply the top padding only to non-home pages, or negative-margin the hero to compensate). Header stays transparent over the hero, condensed/solid after scroll — verify on mobile.

13. **Contact form has no real validation.** `src/app/contact/page.tsx` posts raw `FormData`; `react-hook-form`+`zod` are installed but unused. Add **zod** validation on client (field-level errors, email format, required) and in `route.ts` (return `400` with messages on invalid). Keep the real fetch — do not fake success.

14. **Dead shadcn token classes (no border/focus ring).** The `<select>`s in `contact/page.tsx` (check `Textarea.tsx` too) use `border-input`, `ring-ring`, `ring-offset-background`, `text-muted-foreground` — none defined in this Tailwind v4 theme, so they render nothing. Replace with the real tokens used in `Input.tsx` (`border-stone-2`, `focus-visible:border-brass`, `placeholder:text-stone`). Style native selects consistently (custom chevron, 44px min height).

15. **Email HTML injection.** `route.ts` interpolates raw user input into the email HTML. Escape all values before building the HTML. Add light rate-limiting and don't leak internals in error responses.

---

## D. MISSING vs. SPEC (build them, responsive on both)

16. **Home is missing major sections.** `page.tsx` currently has only Hero → Intro → Services marquee → 4-project grid → CTA. Add, all mobile-first: a **Before/After teaser** (one slider) linking to `/before-after`; a dedicated **stats band** (ink bg, animated counters); a **testimonials** slider; a **journal teaser** (latest 3); and a second hero CTA ("Book a consultation"). 

17. **Pricing → Contact handoff missing.** Add a **"Get an exact quote"** button on the calculator that carries the area/city/package into `/contact` (query params) and pre-fills the form.

18. **Contact page has no WhatsApp/call on mobile.** `MobileStickyBar` is hidden on `/contact`, so mobile users there get no WhatsApp/tel affordance. Add prominent **WhatsApp** + **Call** buttons on the contact page itself.

19. **Footer gaps.** Add a working **newsletter** input (real validation + submit) and a fine-print line: `Prices in ₹ (INR), exclusive of 18% GST unless stated · © {year} Studio Aangan · Made in Bengaluru`.

20. **SEO/metadata is thin.** `layout.tsx` only sets title/description. Add `metadataBase`, a title **template** (`%s · Studio Aangan`), **OpenGraph + Twitter** cards (use `og-default.webp`), per-route metadata, and **JSON-LD `LocalBusiness`/`InteriorDesigner`** (unified NAP + geo + opening hours + `areaServed` + `priceRange "₹₹₹"`). Needed for the SEO = 100 target and Google/Maps.

---

## E. APPLY THE SAME CHECKS TO PAGES NOT LISTED ABOVE

Re-audit and fix `studio`, `services` + `services/[slug]`, `portfolio/[slug]`, `journal` + `journal/[slug]`, `not-found`, `Textarea`, and the motion wrappers (`Reveal`, `Parallax`, `ClipReveal`, `Counter`, `Marquee`, `SmoothScroll`) for the same classes of problem:
- any `hidden …:block` / `…:hidden` that removes content or a feature on mobile → give mobile a working equivalent;
- any hover-only reveal (`group-hover`, `:hover`) that exposes info/actions → must also trigger on tap/focus or be always-visible on touch;
- any undefined Tailwind token classes;
- any hardcoded contact info (must come from `studio.ts`);
- `SmoothScroll`/Lenis must be **disabled under `prefers-reduced-motion`** and must not fight the fixed header or sticky bar;
- remove double top-padding (pages adding `pt-24` on top of the body's header padding — fix the spacing system once, globally).

---

## F. GLOBAL MOBILE-FIRST RULES (enforce everywhere)

- Design at **375px first**, then scale up. No horizontal overflow at any width 320–430px (the body already has `overflow-x: hidden` — fix the underlying overflow, don't rely on hiding it).
- Tap targets ≥ 44×44px; inputs ≥ 16px font (prevents iOS zoom).
- Every interactive thing works with **touch + keyboard**, not just hover/mouse.
- Respect `prefers-reduced-motion` for all motion (Lenis, parallax, counters, marquee, cursor, before/after hint).
- Keep the mobile sticky bar from covering content (footer already pads for it — verify nothing else is obscured).

---

## G. VERIFICATION — do this for real before declaring done

1. `pnpm dev`, open the site, and use device emulation at **390px** (and 320, 768, 1024, 1440).
2. Click **every** route incl. dynamic ones (`/services/[slug]`, `/portfolio/[slug]`, `/journal/[slug]`, 404). For each, at 390px:
   - No horizontal scroll; no overlap/clipping; header + sticky bar don't cover content.
   - DevTools **Console clean** (no 404s, no hydration warnings); **Network** has no failed image/asset.
   - Every feature visible on desktop is present and usable here.
3. **Touch-test** the before/after sliders (drag the whole surface, no page-scroll hijack, labels visible), the portfolio filters (tap), the horizontal gallery (swipe), the pricing calculator, and the contact form (validation + real submit + success/error).
4. Verify the **map** loads on contact + footer, WhatsApp/tel links work, and all contact details match `studio.ts`.
5. Run **Lighthouse mobile** on home, a service, portfolio, a case study, pricing, contact → Performance ≥ 90, Accessibility = 100, Best Practices = 100, SEO = 100. Fix and re-run.
6. `pnpm build` must be **clean** (no TS/ESLint errors — including removing `@ts-ignore` and `any`). Then report what changed.

Do not deploy yet — when this passes, I'll re-audit on disk.
