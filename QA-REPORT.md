
# QA Sweep Report

## 1. Summary
- **Total Checks**: 53
- **Passed**: 52
- **Failed**: 1

## 2. Defects Log

### /faq (1440px)
- **Status**: 200 (Expected: 200)
- **Overflow**: PASS
- **Unstyled**: PASS
- **Console Errors**: 3
  - `[error] WebSocket connection to 'ws://localhost:3000/_next/webpack-hmr?id=wJwpaZaD-OufBfDbZMmOZ' failed: Error in connection establishment: net::ERR_NETWORK_IO_SUSPENDED`
  - `[error] WebSocket connection to 'ws://localhost:3000/_next/webpack-hmr?id=wJwpaZaD-OufBfDbZMmOZ' failed: Error in connection establishment: net::ERR_NETWORK_IO_SUSPENDED`
  - `[error] WebSocket connection to 'ws://localhost:3000/_next/webpack-hmr?id=wJwpaZaD-OufBfDbZMmOZ' failed: Error in connection establishment: net::ERR_NETWORK_IO_SUSPENDED`
- **Network Failures**: 0

- **Error**: N/A
- **ScrollY**: 0
- **CLS**: 0
- **Images Loaded**: true
- **Stranded Reveal**: false


## 3. Interaction Tests
| Element | Action | Expected | Actual | Pass/Fail |
|---------|--------|----------|--------|-----------|
| Pricing Calculator | Load | Valid Currency /₹[\d,]+/ | ₹26,40,000 | ✅ |
| Portfolio Filter (Apartment) | Click | >= 1 card | 3 cards | ✅ |
| Header Dropdown | Click "Studio" | Dropdown shows "About" | Visible | ✅ |
| Mobile Menu | Tap Burger -> Tap Studio Overlay | Submenu expands inline | Expanded | ✅ |
| Before/After Slider | Load mobile | Slider handle visible | Visible | ✅ |
| Before/After Slider | ArrowRight on handle | Value changes | From 50 to 55 | ✅ |

## 4. Route Table
| Route | Viewport | Status | Overflow | Console | Result |
|-------|----------|--------|----------|---------|--------|
| / | 1440 | 200 | PASS | 0 | ✅ |
| /studio | 1440 | 200 | PASS | 0 | ✅ |
| /services | 1440 | 200 | PASS | 0 | ✅ |
| /portfolio | 1440 | 200 | PASS | 0 | ✅ |
| /journal | 1440 | 200 | PASS | 0 | ✅ |
| /before-after | 1440 | 200 | PASS | 0 | ✅ |
| /pricing | 1440 | 200 | PASS | 0 | ✅ |
| /contact | 1440 | 200 | PASS | 0 | ✅ |
| /process | 1440 | 200 | PASS | 0 | ✅ |
| /faq | 1440 | 200 | PASS | 3 | ❌ |
| /testimonials | 1440 | 200 | PASS | 0 | ✅ |
| /team | 1440 | 200 | PASS | 0 | ✅ |
| /careers | 1440 | 200 | PASS | 0 | ✅ |
| /press | 1440 | 200 | PASS | 0 | ✅ |
| /locations | 1440 | 200 | PASS | 0 | ✅ |
| /privacy | 1440 | 200 | PASS | 0 | ✅ |
| /terms | 1440 | 200 | PASS | 0 | ✅ |
| /portfolio/indiranagar-courtyard-house | 1440 | 200 | PASS | 0 | ✅ |
| /portfolio/verandah-apartment | 1440 | 200 | PASS | 0 | ✅ |
| /portfolio/clay-and-cane | 1440 | 200 | PASS | 0 | ✅ |
| /portfolio/the-reading-room | 1440 | 200 | PASS | 0 | ✅ |
| /portfolio/studio-saaya | 1440 | 200 | PASS | 0 | ✅ |
| /portfolio/anjalis-kitchen | 1440 | 200 | PASS | 0 | ✅ |
| /portfolio/terrazzo-terrace | 1440 | 200 | PASS | 0 | ✅ |
| /portfolio/banyan-cafe | 1440 | 200 | PASS | 0 | ✅ |
| /services/residential-interior-design | 1440 | 200 | PASS | 0 | ✅ |
| /services/modular-kitchens | 1440 | 200 | PASS | 0 | ✅ |
| /services/wardrobes-storage | 1440 | 200 | PASS | 0 | ✅ |
| /services/turnkey-execution | 1440 | 200 | PASS | 0 | ✅ |
| /services/commercial-office | 1440 | 200 | PASS | 0 | ✅ |
| /services/space-planning-3d | 1440 | 200 | PASS | 0 | ✅ |
| /services/renovation-remodel | 1440 | 200 | PASS | 0 | ✅ |
| /services/lighting-design | 1440 | 200 | PASS | 0 | ✅ |
| /services/vastu-styling | 1440 | 200 | PASS | 0 | ✅ |
| /journal/cost-2bhk-bengaluru | 1440 | 200 | PASS | 0 | ✅ |
| /journal/vastu-principles | 1440 | 200 | PASS | 0 | ✅ |
| /journal/materials-2026 | 1440 | 200 | PASS | 0 | ✅ |
| /journal/small-kitchen-storage | 1440 | 200 | PASS | 0 | ✅ |
| /locations/bengaluru | 1440 | 200 | PASS | 0 | ✅ |
| /locations/hyderabad | 1440 | 200 | PASS | 0 | ✅ |
| /locations/pune | 1440 | 200 | PASS | 0 | ✅ |
| /locations/chennai | 1440 | 200 | PASS | 0 | ✅ |
| /locations/kochi | 1440 | 200 | PASS | 0 | ✅ |
| /this-does-not-exist | 1440 | 404 | PASS | 0 | ✅ |
| /portfolio/fake | 1440 | 404 | PASS | 0 | ✅ |
| /services/fake | 1440 | 404 | PASS | 0 | ✅ |
| /journal/fake | 1440 | 404 | PASS | 0 | ✅ |
| /locations/atlantis | 1440 | 404 | PASS | 0 | ✅ |
| / | 390 | 200 | PASS | 0 | ✅ |
| /portfolio/indiranagar-courtyard-house | 390 | 200 | PASS | 0 | ✅ |
| /locations/bengaluru | 390 | 200 | PASS | 0 | ✅ |
| /pricing | 390 | 200 | PASS | 0 | ✅ |
| /contact | 390 | 200 | PASS | 0 | ✅ |

