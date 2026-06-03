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
  "/images/projects/clay-and-cane/after.webp": "proj3_after",
  "/images/projects/clay-and-cane/g3.webp": "proj3_g3",
  "/images/projects/the-reading-room/cover.webp": "proj4_cover",
  "/images/projects/the-reading-room/g1.webp": "proj4_g1",
  "/images/projects/the-reading-room/g2.webp": "proj4_g2",
  "/images/projects/the-reading-room/after.webp": "proj4_after",
  "/images/projects/studio-saaya/cover.webp": "proj5_cover",
  "/images/projects/studio-saaya/g1.webp": "proj5_g1",
  "/images/projects/studio-saaya/g2.webp": "proj5_g2",
  "/images/projects/studio-saaya/after.webp": "proj5_after",
  "/images/projects/studio-saaya/g3.webp": "proj5_g3",
  "/images/projects/anjalis-kitchen/cover.webp": "proj6_cover",
  "/images/projects/anjalis-kitchen/g1.webp": "proj6_g1",
  "/images/projects/anjalis-kitchen/g2.webp": "proj6_g2",
  "/images/projects/anjalis-kitchen/after.webp": "proj6_after",
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
