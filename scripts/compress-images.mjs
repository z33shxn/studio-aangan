import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

async function getFiles(dir) {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(dirents.map((dirent) => {
    const res = path.resolve(dir, dirent.name);
    return dirent.isDirectory() ? getFiles(res) : res;
  }));
  return Array.prototype.concat(...files);
}

async function compress() {
  const files = await getFiles('public/images');
  for (const file of files) {
    if (!/\.(webp|jpg|jpeg|png)$/i.test(file)) continue;

    try {
      const buffer = await fs.readFile(file);
      const meta = await sharp(buffer).metadata();

      let targetWidth = meta.width;
      let quality = 75;

      if (file.includes('hero-main')) {
        targetWidth = Math.min(meta.width, 2400);
        quality = 72;
      } else if (file.includes('hero-mobile')) {
        targetWidth = Math.min(meta.width, 800);
        quality = 70;
      } else if (file.includes('journal')) {
        targetWidth = Math.min(meta.width, 800);
      } else {
        targetWidth = Math.min(meta.width, 1600);
      }

      const compressed = await sharp(buffer)
        .resize({ width: targetWidth, withoutEnlargement: true })
        .webp({ quality })
        .toBuffer();

      await fs.writeFile(file, compressed);
      console.log(`Compressed ${path.basename(file)}: ${Math.round(buffer.length/1024)}KB -> ${Math.round(compressed.length/1024)}KB`);
    } catch(e) {
      console.error(`Error compressing ${file}`, e);
    }
  }
}

compress().catch(console.error);
