# MASTER PROMPT — Autonomous Full-Site Browser QA Sweep for Studio Aangan
### Paste into Antigravity. Drive a REAL browser through every page, link, button, form, and gesture of the Studio Aangan site. Click everything, test every interaction at every viewport, watch the console + network, FIX what breaks, re-test, and produce a complete QA report. Do not stop until every route and every interactive element has been exercised and every critical issue is fixed.

---

## 0. MISSION
You are a **senior QA / test automation engineer**. Your job is to **manually-but-autonomously operate the entire website in a real browser** — as a meticulous human tester would — and prove that *every* page renders, *every* link goes somewhere real, *every* button and form works, and nothing is broken at any screen size. When you find a defect, **diagnose it, fix the code, and re-test it**. Finish only when the whole site passes and you've written `QA-REPORT.md`.

**Operating rules:**
- **Drive a real browser** (use your browser/preview tooling). Actually navigate, click, type, drag, scroll, resize, and screenshot. Do **not** substitute static code reading for real interaction — though you may read code to diagnose a failure.
- **Runtime truth over build truth.** A clean `pnpm build` proves nothing about behavior (we've been burned by this — dynamic pages 404'd while the build "passed"). Verify by visiting and using.
- **Watch the DevTools the whole time:** Console (JS errors, React hydration warnings, failed promises) and Network (any non-200 for documents/images/fonts/api; any broken `next/image`).
- **Log everything** in a running QA log, then summarize in `QA-REPORT.md`.
- **Fix → re-test loop:** every defect you find must be fixed and re-verified before you call the site done. Keep going autonomously; only ask the user if truly blocked.

**Setup:** `pnpm dev` (if the dev server is in a weird state, stop it, delete `.next`, restart). Confirm the stylesheet loads (page is styled, not raw HTML) before testing. Base URL `http://localhost:3000`.

---

## 1. BUILD THE COMPLETE CRAWL LIST (test ALL of it — no sampling)
Enumerate **every** URL. Derive dynamic slugs from the content files so nothing is missed:
- Read `src/content/projects.ts`, `services.ts`, `posts.ts`, and the locations map (`src/content/locations.ts`) and generate the full slug lists.
- **Static routes (17):** `/`, `/studio`, `/services`, `/portfolio`, `/journal`, `/before-after`, `/pricing`, `/contact`, `/process`, `/faq`, `/testimonials`, `/team`, `/careers`, `/press`, `/locations`, `/privacy`, `/terms`.
- **Dynamic routes (every slug, not a sample):**
  - `/services/<slug>` × all 9 services
  - `/portfolio/<slug>` × all 8 projects
  - `/journal/<slug>` × all 4 posts
  - `/locations/<city>` × all 5 cities (bengaluru, hyderabad, pune, chennai, kochi)
- **Error/edge routes:** a deliberately-bad URL `/this-does-not-exist`, plus `/portfolio/fake`, `/services/fake`, `/journal/fake`, `/locations/atlantis` (each must hit its custom not-found, returning HTTP 404).
That's ~43 valid pages + 5 intentional 404s. **Visit every single one.**

---

## 2. VIEWPORT MATRIX (test each page at these widths)
- **320px** (small phone — overflow torture test)
- **375px / 390px** (iPhone — the primary mobile target)
- **768px** (tablet)
- **1024px** (small laptop / where nav switches)
- **1440px** (desktop)
For each page, at minimum check **390px and 1440px**; spot-check 320/768/1024 on the home page, one project, one city page, pricing, and contact. Use device emulation (touch + coarse pointer) for the mobile widths so hover-only bugs surface.

---

## 3. PER-PAGE UNIVERSAL CHECKLIST (run on EVERY route)
For each URL × viewport:
1. **Status & render:** loads (HTTP 200, or 404 for the intentional-bad ones); content is fully present (real text + images, not empty/placeholder/skeleton-stuck).
2. **Console is clean:** no JS errors, no React hydration mismatch, no `params should be awaited` warnings, no failed fetches, no missing-key warnings.
3. **Network is clean:** no 404/500 on any document, image, font, or API; every `next/image` actually loads (no broken/zero-byte images); images served as AVIF/WebP.
4. **No horizontal overflow** at any width (scroll the page; the body must not scroll sideways at 320–430px).
5. **No layout breakage:** no overlap, clipped text, collapsed sections, invisible-on-background text, or the fixed header / mobile sticky bar covering content.
6. **Headings/SEO:** exactly one `<h1>`; `<title>` is page-specific; images have `alt`.
7. **Screenshot** the page at 390px and 1440px and save to `/qa-screenshots/<route>-<width>.png`.

---

## 4. "CLICK EVERYTHING" PROTOCOL (the core of this task)
On **every** page, find and exercise **every** interactive element — links, buttons, CTAs, icons, cards, tabs, accordions, sliders, form fields, dropdowns, social icons, the logo, the WhatsApp/call/email links. For each:
- **Hover** (desktop) → expect the intended state (underline, color, scale).
- **Click/tap** → it must DO something real: navigate to a real page (no 404), open/close, submit, filter, expand, or trigger the action it claims.
- **Verify the destination** for links: the resulting URL is a real page that renders (no dead ends). Maintain a checklist that **every `href` on the site resolves** — if any click 404s (other than the intentional bad URLs), log it as a defect and fix the link or build the missing page.
- **Keyboard:** Tab to it, confirm a visible focus ring, activate with Enter/Space.
Record: element, page, action, expected, actual, pass/fail.

---

## 5. COMPONENT-BY-COMPONENT INTERACTION SCRIPTS (test each thoroughly)

**Header (desktop ≥1024px):** every nav link navigates; the **"Studio" dropdown** opens on click and via keyboard (Enter/Space/Arrow, Esc closes, `aria-expanded` toggles), and each item (About/Team/Process/Careers/Press) goes to the right page; "Contact" + "Book a consultation" work; logo → home; header condenses/hides on scroll-down and reappears on scroll-up; it's transparent over hero pages and solid elsewhere without covering the `<h1>`.

**Mobile menu (≤1024px, touch emulation):** hamburger opens a **full-screen** overlay (not a clipped strip — regression check); every link works; the **inline "Studio" submenu** expands on tap; the close (X) button closes it; body scroll is locked while open; it closes on route change; focus is sensible. WhatsApp + Contact inside it work.

**Mobile sticky bar (≤1024px):** appears after the hero scrolls past; **"Book consultation"** → `/contact`; **"WhatsApp"** → `wa.me` deep link opens; it is **hidden on `/contact`**; it doesn't cover the footer's last row.

**Before/After slider (home teaser, `/before-after`, and project case studies):** drag the handle with **mouse**; then with **touch** (emulation) — the wipe follows the finger and the **page does not scroll** during drag (regression check); **arrow keys** move it when focused; BEFORE/AFTER labels are visible on mobile; the courtyard transformation actually shows two different images (not identical). Test on every project that has a pair.

**Portfolio (`/portfolio`):** each **category** pill filters (and returns real results — Apartment/Villa/Commercial/Kitchen/Hospitality all non-empty); the **city** select filters; layout animates; the **empty state + "Clear filters"** works if a combo yields nothing; the mobile "View Project →" cue shows; every card → its case study (200, renders).

**Pricing (`/pricing`):** move the **area slider**, change **city** and **package** selects → the **₹ estimate updates live and is NEVER `NaN`** (regression check) and uses Indian grouping; the math/labels are sane; **"Get an exact quote"** carries values to `/contact` and pre-fills the form.

**Contact (`/contact`):** submit the form **empty** → real inline zod errors (name, email format, message length); submit with **valid** data (name, valid email, message ≥10 chars) → real **success panel**, and confirm in the Network tab that **POST `/api/contact` returned 200** (not a fake/no-op); the **WhatsApp** and **Call** quick links work; the **Google Map** iframe loads and is interactive; contact details match `studio.ts` (`.in` email, correct phone).

**FAQ (`/faq`):** the **accordion** opens/closes on click **and** keyboard; multiple/again-close behaves; no layout jump breaks the page.

**Footer (every page):** all five columns' links resolve (Studio/Work/Locations/More/Legal incl. `/privacy` and `/terms`); the **newsletter** input validates an email and submits for real (success/error state, not fake); social links open in a new tab; the footer **mini-map** loads.

**Location pages (`/locations` and each city):** the index cards link to each city; each city page shows **real projects for that city** (or the graceful "now taking on projects" fallback), **valid ₹ pricing** (or "Pricing on request" — never NaN), working Services links, Process/Pricing/Contact CTAs, and the WhatsApp link.

**Journal:** index featured + grid → each article (200); article body renders; related/back links work. **Services:** overview rows → each of 9 detail pages (200); their CTAs work. **Studio/Team/Careers/Press:** images load, mailto links (careers) work, awards/press data renders.

**Error pages:** visit `/this-does-not-exist` → rich 404 renders (200-status-page content but HTTP 404); the **search** filters and its results navigate; the **"random project"** button lands on a real case study; suggested cards link correctly. Visit `/portfolio/fake` etc. → the **segment-specific** not-found renders. (If safe, momentarily force a thrown error to confirm `error.tsx` shows and **"Try again"** recovers — then revert.)

**Global motion:** confirm reveals, parallax, marquee, and stat **counters animate** (counters reach their real numbers like 180+, not stuck at 0 — regression check). Then enable **`prefers-reduced-motion`** and confirm everything degrades gracefully (no parallax/Ken-Burns, counters jump to final).

---

## 6. REGRESSION CHECKLIST (explicitly re-confirm these known-bad-then-fixed issues)
- [ ] **All dynamic routes return 200** (projects/services/journal/locations) — the Next 16 `await params` fix holds.
- [ ] **No duplicated/broken images** anywhere; every `<img>` loads; before/after pairs are two distinct, same-room images.
- [ ] **CSS fully loads** (site is styled, not raw HTML).
- [ ] **Mobile menu** opens full-screen (not trapped in the header).
- [ ] **Cursor** is a normal pointer over links/buttons, text over inputs (no I-beam over nav, no custom-cursor ring).
- [ ] **Pricing/city ₹** never renders `NaN`.
- [ ] **Portfolio filters** return results for every category.
- [ ] **No dead links** — every on-site `href` resolves (only the intentional bad URLs 404).
- [ ] Contact details consistent (`hello@studioaangan.in`, correct phone) everywhere.

---

## 7. CROSS-CUTTING AUDITS
- **Accessibility:** keyboard-only pass through the key flows (nav → dropdown → a page → a form → submit) with visible focus throughout; check color contrast (clay/brass on paper, white on hero scrims); confirm ARIA on the slider, dropdown, accordion, and menu; images have alt.
- **Performance:** run **Lighthouse (mobile, throttled)** on Home, a service, `/portfolio`, a case study, a city page, `/pricing`, `/contact` → record scores; target Performance ≥ 90, Accessibility = 100, Best Practices = 100, SEO = 100. Note LCP/CLS issues.
- **Console-zero rule:** by the end, no page may log an error or warning in the console.

---

## 8. FIX → RE-TEST LOOP
For every defect found: log it, **diagnose the root cause in code, fix it, and re-run that page's checks** (and any related ones). Re-run a final full sweep after all fixes. Prioritize: broken routes/links > broken interactions/forms > broken images > layout/overflow > console warnings > polish. Don't introduce regressions (re-check §6 after fixes).

---

## 9. DELIVERABLE — `QA-REPORT.md`
Write a thorough report:
1. **Summary:** total pages tested, total interactive elements exercised, pass/fail counts, # defects found, # fixed, # remaining.
2. **Route table:** every URL × {desktop, mobile} → status, render, console, network, overflow, screenshot link.
3. **Interaction table:** every component/element → action → expected → actual → pass/fail.
4. **Defects log:** each issue → page, repro steps, root cause, the fix you applied, re-test result.
5. **Regression checklist (§6)** with ticks.
6. **Lighthouse scores** per audited page.
7. **Accessibility findings.**
8. **Screenshots** in `/qa-screenshots/`.
9. **Final verdict:** is the site ship-ready? Any remaining risks?

---

## 10. DEFINITION OF DONE
- [ ] Every route in §1 visited at ≥2 viewports; every valid page 200 + renders; every intentional-bad URL 404s into the right not-found.
- [ ] Every link, button, form, slider, dropdown, accordion, filter, and CTA on the site exercised (mouse + touch + keyboard) and working.
- [ ] Zero dead links; zero broken images; zero console errors/warnings; no horizontal overflow 320–430px.
- [ ] All §6 regressions confirmed fixed; all §5 component scripts pass.
- [ ] Contact + newsletter submit for real; pricing/city ₹ never NaN; before/after works on touch.
- [ ] Lighthouse targets met (or deltas explained); a11y pass.
- [ ] All defects fixed and re-tested; `QA-REPORT.md` + screenshots written.

---

## 11. GUARDRAILS
- Test behavior in a real browser; never report "works" from code-reading alone.
- Test **all** dynamic slugs, not one example.
- When you fix something, re-test it and the regression list; don't break working pages.
- No fake passes — if something half-works, it fails.
- Keep going autonomously to completion; only stop for a genuine blocker. End with the report and a clear ship/no-ship verdict.

**Begin: start the dev server, build the full crawl list, and systematically drive the browser through every page and every element at desktop and mobile — clicking, typing, dragging, and verifying — fixing as you go, until the whole site passes and `QA-REPORT.md` is written.**
