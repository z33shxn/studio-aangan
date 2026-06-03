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
  "/images/textures/paper.webp": "texture_paper",
  "/images/textures/plaster.webp": "texture_plaster",
  "/images/projects/indiranagar-courtyard-house/cover.webp": "proj1_cover",
  "/images/projects/indiranagar-courtyard-house/g1.webp": "proj1_g1",
  "/images/projects/indiranagar-courtyard-house/g2.webp": "proj1_g2",
  "/images/projects/indiranagar-courtyard-house/after.webp": "proj1_after",
  "/images/projects/indiranagar-courtyard-house/g3.webp": "proj1_g3",
  "/images/projects/verandah-apartment/cover.webp": "proj2_cover",
  "/images/projects/verandah-apartment/g1.webp": "proj2_g1",
  "/images/projects/verandah-apartment/g2.webp": "proj2_g2",
  "/images/projects/verandah-apartment/after.webp": "proj2_after",
  "/images/projects/verandah-apartment/g3.webp": "proj2_g3",
  "/images/projects/clay-and-cane/cover.webp": "proj3_cover",
  "/images/projects/clay-and-cane/g1.webp": "proj3_g1",
  "/images/projects/clay-and-cane/g2.webp": "proj3_g2",
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
console.log(`\nCopied ${copied} images. Remaining in queue: ${nextTodo.length}`);
