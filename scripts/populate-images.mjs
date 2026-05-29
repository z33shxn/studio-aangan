import fs from 'fs';
import path from 'path';

const SRC_DIR = 'C:\\Users\\Mohammed Zeeshan\\.gemini\\antigravity-ide\\brain\\6e4cf401-7663-4108-8c71-219fa3d7020f';
const DEST_DIR = 'C:\\dev\\studio-aangan\\public';

function ensureDir(filePath) {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
}

function findFile(prefix) {
  const files = fs.readdirSync(SRC_DIR);
  return files.find(f => f.startsWith(prefix) && f.endsWith('.png'));
}

const copyMap = [
  { prefix: 'hero_main', target: '/images/misc/hero-main.webp' },
  { prefix: 'not_found_room', target: '/images/misc/404-room.webp' },
  { prefix: 'founder_ananya', target: '/images/studio/founder-ananya.webp' },
  { prefix: 'cofounder_kabir', target: '/images/studio/cofounder-kabir.webp' },
  { prefix: 'philosophy_detail', target: '/images/studio/philosophy-detail.webp' },
  { prefix: 'studio_space_2', target: '/images/studio/studio-space-2.webp' },
  { prefix: 'studio_space_1', target: '/images/studio/studio-space-1.webp' },
  { prefix: 'designer_sketching', target: '/images/studio/designer-sketching.webp' },

  { prefix: 'residential_service', target: '/images/services/residential.webp' },
  { prefix: 'modular_kitchen', target: '/images/services/modular-kitchen.webp' },
  { prefix: 'wardrobes', target: '/images/services/wardrobes.webp' },
  { prefix: 'turnkey', target: '/images/services/turnkey.webp' },
  { prefix: 'commercial_office', target: '/images/services/commercial-office.webp' },
  { prefix: 'space_planning_3d', target: '/images/services/space-planning-3d.webp' },
  { prefix: 'renovation', target: '/images/services/renovation.webp' },
  { prefix: 'test_image_living_room', target: '/images/services/lighting.webp' },
  { prefix: 'test_image_living_room', target: '/images/services/vastu-styling.webp' },
];

const fallbackImages = [
  'test_image_living_room',
  'hero_main',
  'residential_service',
  'turnkey',
  'renovation'
];

let fallbackIndex = 0;
function getNextFallback() {
  const img = fallbackImages[fallbackIndex % fallbackImages.length];
  fallbackIndex++;
  return img;
}

const requiredPaths = [
  ...copyMap.map(m => m.target),
  '/images/testimonials/client-1.webp',
  '/images/testimonials/client-2.webp',
  '/images/testimonials/client-3.webp',
  '/images/testimonials/client-4.webp',
  '/images/journal/cost-2bhk-bengaluru.webp',
  '/images/journal/vastu-principles.webp',
  '/images/journal/materials-2026.webp',
  '/images/journal/small-kitchen-storage.webp',
  ...['indiranagar-courtyard-house', 'verandah-apartment', 'clay-and-cane', 'the-reading-room', 'studio-saaya', 'anjalis-kitchen', 'terrazzo-terrace', 'banyan-cafe'].flatMap(project => [
    `/images/projects/${project}/cover.webp`,
    `/images/projects/${project}/g1.webp`,
    `/images/projects/${project}/g2.webp`,
    `/images/projects/${project}/g3.webp`,
    `/images/projects/${project}/before.webp`,
    `/images/projects/${project}/after.webp`,
  ])
];

const uniquePaths = [...new Set(requiredPaths)];

for (const targetPath of uniquePaths) {
  let mapped = copyMap.find(m => m.target === targetPath);
  let prefix = mapped ? mapped.prefix : getNextFallback();
  
  let sourceFile = findFile(prefix);
  if (!sourceFile) {
    sourceFile = findFile('test_image_living_room');
  }

  if (sourceFile) {
    const fullSourcePath = path.join(SRC_DIR, sourceFile);
    const fullTargetPath = path.join(DEST_DIR, targetPath);
    ensureDir(fullTargetPath);
    fs.copyFileSync(fullSourcePath, fullTargetPath);
    console.log(`Copied ${sourceFile} to ${targetPath}`);
  }
}

fs.writeFileSync(path.join(process.cwd(), 'image-manifest.json'), JSON.stringify(uniquePaths, null, 2));
console.log('Done mapping and generating image-manifest.json');
