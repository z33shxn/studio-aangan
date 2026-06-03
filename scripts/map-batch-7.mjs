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
  "/images/projects/studio-saaya/before.webp": "proj5_before",
  "/images/projects/anjalis-kitchen/before.webp": "proj6_before",
  "/images/projects/terrazzo-terrace/cover.webp": "proj7_cover",
  "/images/projects/terrazzo-terrace/g1.webp": "proj7_g1",
  "/images/projects/terrazzo-terrace/g2.webp": "proj7_g2",
  "/images/projects/terrazzo-terrace/after.webp": "proj7_after",
  "/images/projects/terrazzo-terrace/g3.webp": "proj7_g3",
  "/images/projects/banyan-cafe/cover.webp": "proj8_cover",
  "/images/projects/banyan-cafe/g1.webp": "proj8_g1",
  "/images/projects/banyan-cafe/g2.webp": "proj8_g2",
  "/images/projects/banyan-cafe/after.webp": "proj8_after",
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
