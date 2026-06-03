import { chromium, devices } from 'playwright';
import fs from 'fs/promises';
import { spawn } from 'child_process';
import http from 'http';

// Helper to poll the server
const waitForServer = (url, timeoutMs = 60000) => {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      if (Date.now() - startTime > timeoutMs) {
        clearInterval(interval);
        reject(new Error(`Timeout waiting for server at ${url}`));
      }
      http.get(url, (res) => {
        if (res.statusCode === 200) {
          clearInterval(interval);
          resolve();
        }
      }).on('error', () => { /* ignore */ });
    }, 1000);
  });
};

// Helper to extract slugs using regex
async function getSlugsFromFile(filePath, regex) {
  const content = await fs.readFile(filePath, 'utf-8');
  const slugs = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    slugs.push(match[1]);
  }
  return slugs;
}

function slugify(text) {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

// Extract cities from studio.ts
async function getCities() {
  const content = await fs.readFile('src/content/studio.ts', 'utf-8');
  const match = content.match(/citiesServed:\s*\[([^\]]+)\]/);
  if (match) {
    return match[1].split(',').map(s => slugify(s.replace(/"/g, '').trim()));
  }
  return [];
}

const staticRoutes = [
  '/', '/studio', '/services', '/portfolio', '/journal', '/before-after', '/pricing', 
  '/contact', '/process', '/faq', '/testimonials', '/team', '/careers', '/press', 
  '/locations', '/privacy', '/terms'
];

const badRoutes = [
  '/this-does-not-exist',
  '/portfolio/fake',
  '/services/fake',
  '/journal/fake',
  '/locations/atlantis'
];

const BASE_URL = 'http://localhost:3000';

async function runSweep() {
  console.log('Starting Next.js production server...');
  const serverProcess = spawn('npx', ['next', 'start'], { stdio: 'pipe', shell: true });
  
  const cleanup = () => {
    console.log('Shutting down server...');
    if (process.platform === 'win32') {
      spawn('taskkill', ['/pid', serverProcess.pid, '/f', '/t']);
    } else {
      serverProcess.kill('SIGTERM');
    }
  };
  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);

  try {
    await waitForServer(BASE_URL);
    console.log('Server is ready. Extracting slugs...');

    const projects = await getSlugsFromFile('src/content/projects.ts', /slug:\s*"([^"]+)"/g);
    const services = await getSlugsFromFile('src/content/services.ts', /slug:\s*"([^"]+)"/g);
    const posts = await getSlugsFromFile('src/content/posts.ts', /slug:\s*"([^"]+)"/g);
    const cities = await getCities();

    console.log(`Found: ${projects.length} projects, ${services.length} services, ${posts.length} posts, ${cities.length} cities.`);

    const validRoutes = [
      ...staticRoutes,
      ...projects.map(s => `/portfolio/${s}`),
      ...services.map(s => `/services/${s}`),
      ...posts.map(s => `/journal/${s}`),
      ...cities.map(s => `/locations/${s}`)
    ];

    console.log(`Starting QA Sweep for ${validRoutes.length + badRoutes.length} routes...`);

    const browser = await chromium.launch({ headless: true });
    await fs.mkdir('qa-screenshots', { recursive: true });

    const summary = {
      total: 0,
      passed: 0,
      failed: 0,
      defects: []
    };
    const routeResults = [];

    const checkPage = async (route, isMobile) => {
      let context;
      try {
        context = await browser.newContext(
          isMobile 
            ? { ...devices['iPhone 13'], hasTouch: true, isMobile: true } 
            : { viewport: { width: 1440, height: 900 } }
        );
        
        const page = await context.newPage();
        let status = 0;
        const consoleLogs = [];
        const networkFailures = [];

        const isBadRoute = badRoutes.includes(route);

        page.on('console', msg => {
          if (msg.type() === 'error' || msg.type() === 'warning') {
            const text = msg.text();
            // Ignore 404 resource errors on expected 404 pages
            if (isBadRoute && text.includes('Failed to load resource: the server responded with a status of 404')) return;
            // Ignore benign Next.js font preload warnings
            if (text.includes('was preloaded using link preload but not used within a few seconds')) return;
            consoleLogs.push(`[${msg.type()}] ${text}`);
          }
        });

        page.on('response', response => {
          const respStatus = response.status();
          const url = response.url();
          if (respStatus >= 400 && url !== `${BASE_URL}${route}`) {
            networkFailures.push(`${respStatus} ${url}`);
          }
          if (response.request().resourceType() === 'image') {
             const headers = response.headers();
             const size = parseInt(headers['content-length'] || '0');
             if (size > 420000) { // ~410KB budget
               networkFailures.push(`Oversized Image: ${Math.round(size/1024)}KB ${url}`);
             }
          }
        });

        const response = await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle' });
        status = response.status();
        
        await page.waitForTimeout(200);

        // Scroll to bottom and back to trigger all reveals
        await page.evaluate(async () => {
          const wait = (ms) => new Promise(r => setTimeout(r, ms));
          const scrollHeight = document.body.scrollHeight;
          const viewportHeight = window.innerHeight;
          // scroll down
          for (let i = 0; i < scrollHeight; i += viewportHeight / 2) {
            window.scrollTo(0, i);
            await wait(100);
          }
          window.scrollTo(0, scrollHeight);
          await wait(1500); // allow animations to finish
          
          // scroll back to top
          window.scrollTo(0, 0);
          await wait(500);
        });

        const scrollY = await page.evaluate(() => window.scrollY);
        const FALLBACK_BLUR = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAD0lEQVQIW2NkYGD4z0AEMAIuABFj0B1aAAAAAElFTkSuQmCC';
        const imagesLoaded = await page.evaluate((fallback) => {
          const imgs = Array.from(document.querySelectorAll('img'));
          for (let img of imgs) {
            if (!img.src) continue;
            // If the image is loaded but has 0 width, it's broken
            if (img.complete && img.src.includes('.') && img.naturalWidth === 0) return false;
            // Ensure no fallback blur is used
            if (img.style.backgroundImage && img.style.backgroundImage.includes(fallback)) return false;
          }
          const pic = document.querySelector('picture');
          if (pic && pic.style.backgroundImage && pic.style.backgroundImage.includes(fallback)) return false;
          return true;
        }, FALLBACK_BLUR);

        const strandedReveal = await page.evaluate(() => {
          const imgs = Array.from(document.querySelectorAll('img'));
          for (let img of imgs) {
            if (!img.src) continue;
            let el = img.parentElement;
            let isDisplayNone = window.getComputedStyle(img).display === 'none';
            let p = el;
            while (p && p !== document.body) {
               if (window.getComputedStyle(p).display === 'none') {
                  isDisplayNone = true;
                  break;
               }
               p = p.parentElement;
            }
            if (isDisplayNone) continue;
            
            // Now check for stranded reveal
            while (el && el !== document.body) {
              const style = window.getComputedStyle(el);
              const clip = style.clipPath || '';
              if (clip.replace(/ /g, '').includes('inset(100%')) {
                return true;
              }
              if (style.overflow === 'hidden' && el.getBoundingClientRect().height === 0) {
                 return true;
              }
              el = el.parentElement;
            }
          }
          return false;
        });

        const cls = await page.evaluate(() => {
          return new Promise(resolve => {
            let clsValue = 0;
            try {
              const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                  if (!entry.hadRecentInput) clsValue += entry.value;
                }
              });
              observer.observe({ type: 'layout-shift', buffered: true });
              setTimeout(() => {
                observer.disconnect();
                resolve(clsValue);
              }, 300);
            } catch (e) { resolve(0); }
          });
        });

        let hasOverflow = false;
        if (isMobile) {
          hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
        }

        const bodyBg = await page.evaluate(() => window.getComputedStyle(document.body).backgroundColor);
        const isUnstyled = bodyBg === 'rgba(0, 0, 0, 0)' || bodyBg === 'transparent';

        const safeRoute = route === '/' ? 'home' : route.replace(/\//g, '-').replace(/^-/, '');
        const widthLabel = isMobile ? '390' : '1440';
        const screenshotPath = `qa-screenshots/${safeRoute}-${widthLabel}.png`;
        await page.screenshot({ path: screenshotPath, fullPage: true });

        const expectedStatus = isBadRoute ? 404 : 200;
        
        const passed = status === expectedStatus && !hasOverflow && !isUnstyled && consoleLogs.length === 0 && networkFailures.length === 0 && (isBadRoute || (scrollY === 0 && cls < 0.05 && imagesLoaded && !strandedReveal));

        if (!passed) {
          summary.defects.push({ route, width: widthLabel, status: `${status} (Expected: ${expectedStatus})`, overflow: hasOverflow, unstyled: isUnstyled, console: consoleLogs, network: networkFailures, scrollY, cls, imagesLoaded, strandedReveal });
          summary.failed++;
        } else {
          summary.passed++;
        }
        summary.total++;
        routeResults.push({ route, viewport: widthLabel, status, passed, overflow: hasOverflow ? "FAIL" : "PASS", consoleCount: consoleLogs.length, screenshot: screenshotPath });

      } catch (err) {
        summary.defects.push({ route, width: isMobile ? '390' : '1440', error: err.message });
        summary.failed++;
        summary.total++;
      } finally {
        if (context) await context.close();
      }
    };

    for (const route of [...validRoutes, ...badRoutes]) {
      console.log(`[Desktop] ${route}`);
      await checkPage(route, false);
    }

    const spotCheckMobile = ['/', '/portfolio/' + (projects[0] || 'fake'), '/locations/' + (cities[0] || 'fake'), '/pricing', '/contact'];
    for (const route of spotCheckMobile) {
      console.log(`[Mobile] ${route}`);
      await checkPage(route, true);
    }

    // INTERACTION TESTS
    console.log(`Running Interaction Tests...`);
    const interactions = [];
    let iContext;
    try {
      iContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const iPage = await iContext.newPage();

      // Test Pricing NaN
      try {
        await iPage.goto(`${BASE_URL}/pricing`);
        const priceElement = iPage.getByTestId('price-estimate');
        const priceText = await priceElement.innerText();
        const validFormat = /₹[\d,]+/.test(priceText) && !priceText.includes('NaN');
        interactions.push({ element: 'Pricing Calculator', action: 'Load', expected: 'Valid Currency /₹[\\d,]+/', actual: priceText, passed: validFormat });
      } catch (e) { interactions.push({ element: 'Pricing Calculator', action: 'Load', expected: 'Valid Currency', actual: `Error: ${e.message}`, passed: false }); }

      // Test Portfolio Filter
      try {
        await iPage.goto(`${BASE_URL}/portfolio`);
        await iPage.click('button:has-text("Apartment")');
        await iPage.waitForTimeout(500); 
        const cards = await iPage.locator('a.group.block').count();
        interactions.push({ element: 'Portfolio Filter (Apartment)', action: 'Click', expected: '>= 1 card', actual: `${cards} cards`, passed: cards >= 1 });
      } catch (e) { interactions.push({ element: 'Portfolio Filter (Apartment)', action: 'Click', expected: '>= 1 card', actual: `Error: ${e.message}`, passed: false }); }

      // Test Desktop Dropdown
      try {
        await iPage.goto(`${BASE_URL}/`);
        await iPage.click('button:has-text("Studio")');
        const dropdownVisible = await iPage.locator('text="About"').first().isVisible();
        interactions.push({ element: 'Header Dropdown', action: 'Click "Studio"', expected: 'Dropdown shows "About"', actual: dropdownVisible ? 'Visible' : 'Hidden', passed: dropdownVisible });
      } catch (e) { interactions.push({ element: 'Header Dropdown', action: 'Click "Studio"', expected: 'Dropdown shows "About"', actual: `Error: ${e.message}`, passed: false }); }

    } finally {
      if (iContext) await iContext.close();
    }

    // Mobile Interactions
    let mContext;
    try {
      mContext = await browser.newContext({ ...devices['iPhone 13'], hasTouch: true, isMobile: true });
      const mPage = await mContext.newPage();
      
      try {
        await mPage.goto(`${BASE_URL}/`);
        await mPage.click('button[aria-label="Open menu"]');
        const submenuBtn = mPage.locator('[role=dialog], .fixed.inset-0').getByRole('button', { name: 'Studio' });
        await submenuBtn.click();
        const submenuOpen = await mPage.locator('[role=dialog], .fixed.inset-0').locator('a:has-text("About")').isVisible();
        interactions.push({ element: 'Mobile Menu', action: 'Tap Burger -> Tap Studio Overlay', expected: 'Submenu expands inline', actual: submenuOpen ? 'Expanded' : 'Failed', passed: submenuOpen });
      } catch (e) { interactions.push({ element: 'Mobile Menu', action: 'Tap Burger -> Tap Studio Overlay', expected: 'Submenu expands inline', actual: `Error: ${e.message}`, passed: false }); }

      try {
        if (projects.length > 0) {
          await mPage.goto(`${BASE_URL}/portfolio/${projects[0]}`);
          const handle = mPage.getByTestId('ba-handle');
          const isVisible = await handle.isVisible();
          interactions.push({ element: 'Before/After Slider', action: 'Load mobile', expected: 'Slider handle visible', actual: isVisible ? 'Visible' : 'Missing', passed: isVisible });
          
          if (isVisible) {
            const initialVal = await handle.getAttribute('aria-valuenow');
            await handle.focus();
            await mPage.keyboard.press('ArrowRight');
            await mPage.waitForTimeout(100);
            const finalVal = await handle.getAttribute('aria-valuenow');
            const moved = initialVal !== finalVal;
            interactions.push({ element: 'Before/After Slider', action: 'ArrowRight on handle', expected: 'Value changes', actual: `From ${initialVal} to ${finalVal}`, passed: moved });
          }
        }
      } catch (e) { interactions.push({ element: 'Before/After Slider', action: 'Drag handle', expected: 'Value changes', actual: `Error: ${e.message}`, passed: false }); }

    } finally {
      if (mContext) await mContext.close();
    }

    await browser.close();

    const reportMd = `
# QA Sweep Report

## 1. Summary
- **Total Checks**: ${summary.total}
- **Passed**: ${summary.passed}
- **Failed**: ${summary.failed}

## 2. Defects Log
${summary.defects.length === 0 ? "No defects found! 🎉" : summary.defects.map(d => `
### ${d.route} (${d.width}px)
- **Status**: ${d.status}
- **Overflow**: ${d.overflow ? 'FAIL' : 'PASS'}
- **Unstyled**: ${d.unstyled ? 'FAIL' : 'PASS'}
- **Console Errors**: ${d.console && d.console.length > 0 ? d.console.length : 0}
${d.console && d.console.length > 0 ? d.console.map(c => `  - \`${c}\``).join('\n') : ''}
- **Network Failures**: ${d.network && d.network.length > 0 ? d.network.length : 0}
${d.network && d.network.length > 0 ? d.network.map(n => `  - \`${n}\``).join('\n') : ''}
- **Error**: ${d.error || 'N/A'}
- **ScrollY**: ${d.scrollY}
- **CLS**: ${d.cls}
- **Images Loaded**: ${d.imagesLoaded}
- **Stranded Reveal**: ${d.strandedReveal}
`).join('\n')}

## 3. Interaction Tests
| Element | Action | Expected | Actual | Pass/Fail |
|---------|--------|----------|--------|-----------|
${interactions.map(i => `| ${i.element} | ${i.action} | ${i.expected} | ${i.actual} | ${i.passed ? '✅' : '❌'} |`).join('\n')}

## 4. Route Table
| Route | Viewport | Status | Overflow | Console | Result |
|-------|----------|--------|----------|---------|--------|
${routeResults.map(r => `| ${r.route} | ${r.viewport} | ${r.status} | ${r.overflow} | ${r.consoleCount} | ${r.passed ? '✅' : '❌'} |`).join('\n')}

`;

    await fs.writeFile('QA-REPORT.md', reportMd);
    console.log('QA-REPORT.md written.');

  } finally {
    cleanup();
  }
}

runSweep().catch(err => {
  console.error("Fatal Sweep Error:", err);
  process.exit(1);
});
