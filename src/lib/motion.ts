export const EASE = [0.21, 0.47, 0.32, 0.98] as const; // smooth, cinematic ease-out
export const DURATION = {
  image: 0.85,   // ClipReveal — the image "swipe": watched on-enter, graceful but not draggy
  content: 0.6,  // Reveal — text/content fade-up
  stagger: 0.08, // per-item stagger in grids/lists (tight enough that grids don't feel slow cumulatively)
  ui: 0.35,      // interactive feedback (menu, accordion, filter) — keep snappy
} as const;
