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
  "/images/projects/clay-and-cane/before.webp": "proj3_before",
  "/images/projects/the-reading-room/before.webp": "proj4_before",
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
