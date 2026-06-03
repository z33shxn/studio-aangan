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

const map = {
  "/images/misc/hero-mobile.webp": "hero_mobile",
  "/images/misc/cta-plaster.webp": "cta_plaster",
  "/images/misc/footer-evening.webp": "footer_evening",
  "/images/misc/og-default.webp": "og_default",
  "/images/studio/materials-flatlay.webp": "materials_flatlay",
  "/images/studio/approach-portrait.webp": "approach_portrait",
  "/images/studio/team-candid.webp": "team_candid",
  "/images/studio/awards-vignette.webp": "awards_vignette",
  "/images/services/vastu-styling.webp": "vastu_styling",
  "/images/testimonials/client-1.webp": "client_1",
  "/images/testimonials/client-2.webp": "client_2",
  "/images/testimonials/client-3.webp": "client_3",
  "/images/testimonials/client-4.webp": "client_4",
  "/images/journal/cost-2bhk-bengaluru.webp": "journal_cost",
  "/images/journal/vastu-principles.webp": "journal_vastu",
};

let copied = 0;
const todo = JSON.parse(fs.readFileSync('image-todo.json', 'utf8'));
const nextTodo = [...todo];

for (const [targetPath, prefix] of Object.entries(map)) {
  const files = fs.readdirSync(SRC_DIR);
  const sourceFile = files.find(f => f.startsWith(prefix) && f.endsWith('.png'));
  
  if (sourceFile) {
    const fullSourcePath = path.join(SRC_DIR, sourceFile);
    const fullTargetPath = path.join(DEST_DIR, targetPath);
    ensureDir(fullTargetPath);
    fs.copyFileSync(fullSourcePath, fullTargetPath);
    copied++;
    console.log(`Successfully mapped ${sourceFile} to ${targetPath}`);
    
    // Remove from todo
    const index = nextTodo.indexOf(targetPath);
    if (index !== -1) {
      nextTodo.splice(index, 1);
    }
  } else {
    console.warn(`Source file missing for prefix: ${prefix}`);
  }
}

fs.writeFileSync('image-todo.json', JSON.stringify(nextTodo, null, 2));
console.log(`\nCopied ${copied} images. Remaining: ${nextTodo.length}`);
