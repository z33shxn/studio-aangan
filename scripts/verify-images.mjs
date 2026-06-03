import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const IMG_DIR = 'C:\\dev\\studio-aangan\\public\\images';
const MANIFEST_PATH = 'C:\\dev\\studio-aangan\\image-manifest.json';
const SRC_DIR = 'C:\\dev\\studio-aangan\\src';

function getFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getFiles(fullPath, files);
    } else if (file.match(/\.(webp|png|jpg)$/)) {
      files.push(fullPath);
    }
  }
  return files;
}

function getSrcFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getSrcFiles(fullPath, files);
    } else if (file.match(/\.(tsx|ts|css)$/)) {
      files.push(fullPath);
    }
  }
  return files;
}

function computeHash(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  const hashSum = crypto.createHash('sha256');
  hashSum.update(fileBuffer);
  return hashSum.digest('hex');
}

const allFiles = getFiles(IMG_DIR);
const hashes = new Set();
const diskPaths = new Set();
let duplicates = 0;

console.log('--- ENDPOINT MAPPING TABLE ---');
for (const file of allFiles) {
  const hash = computeHash(file);
  if (hashes.has(hash)) {
    duplicates++;
  }
  hashes.add(hash);
  const relPath = file.substring(file.indexOf('public\\images')).replace(/\\/g, '/').replace('public', '');
  diskPaths.add(relPath);
  console.log(`${relPath.padEnd(65)} | Hash: ${hash.substring(0,8)}`);
}

console.log('\n--- VERIFICATION RESULTS ---');
console.log(`Total images on disk: ${allFiles.length}`);
console.log(`Total unique hashes:  ${hashes.size}`);

// Two-way integrity check
const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
let missingOnDisk = [];
let orphansOnDisk = [];

for (const entry of manifest) {
  if (!diskPaths.has(entry)) {
    missingOnDisk.push(entry);
  }
}

for (const diskFile of diskPaths) {
  if (!manifest.includes(diskFile)) {
    orphansOnDisk.push(diskFile);
  }
}

// Source reference check
const srcFiles = getSrcFiles(SRC_DIR);
const srcImageRefs = new Set();
for (const src of srcFiles) {
  const content = fs.readFileSync(src, 'utf8');
  const matches = content.match(/\/(images|videos)\/[a-zA-Z0-9_/-]+\.(webp|png|jpg|webm|mp4)/g);
  if (matches) {
    for (const match of matches) {
      srcImageRefs.add(match);
    }
  }
}

let danglingRefs = [];
for (const ref of srcImageRefs) {
  if (!diskPaths.has(ref)) {
    danglingRefs.push(ref);
  }
}

let passed = true;

if (duplicates > 0) {
  console.error(`\n❌ FAILED: Found ${duplicates} duplicate files. totalFiles !== uniqueHashes.`);
  passed = false;
}

if (missingOnDisk.length > 0) {
  console.error(`\n❌ FAILED: ${missingOnDisk.length} manifest entries are missing from disk:`);
  missingOnDisk.forEach(m => console.error(`   - ${m}`));
  passed = false;
}

if (orphansOnDisk.length > 0) {
  console.error(`\n❌ FAILED: ${orphansOnDisk.length} orphan files on disk (not in manifest):`);
  orphansOnDisk.forEach(o => console.error(`   - ${o}`));
  passed = false;
}

if (danglingRefs.length > 0) {
  console.error(`\n❌ FAILED: ${danglingRefs.length} dangling image references found in src code (file missing from disk):`);
  danglingRefs.forEach(d => console.error(`   - ${d}`));
  passed = false;
}

if (passed) {
  console.log('\n✅ PASSED: All files are byte-unique, two-way integrity check is clean, and no dangling references in source code.');
} else {
  process.exit(1);
}
