import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const IMAGES_DIR = path.join(process.cwd(), 'public/images');
const OUTPUT_FILE = path.join(process.cwd(), 'src/content/blur-data.json');

const FALLBACK_BLUR = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAD0lEQVQIW2NkYGD4z0AEMAIuABFj0B1aAAAAAElFTkSuQmCC'; 

async function getFiles(dir) {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(dirents.map((dirent) => {
    const res = path.resolve(dir, dirent.name);
    return dirent.isDirectory() ? getFiles(res) : res;
  }));
  return Array.prototype.concat(...files);
}

async function generateBlur() {
  console.log('Generating blur data...');
  try {
    const allFiles = await getFiles(IMAGES_DIR);
    const imageFiles = allFiles.filter(f => /\.(jpg|jpeg|png|webp|avif)$/i.test(f));
    
    const blurData = {};
    let successCount = 0;
    
    for (const file of imageFiles) {
      // Get the relative path starting with /images/
      const relativePath = file.substring(file.indexOf('public' + path.sep) + 6).replace(/\\/g, '/');
      
      try {
        const buffer = await fs.readFile(file);
        const resizedBuffer = await sharp(buffer)
          .resize(16, 16, { fit: 'inside' })
          .blur()
          .toBuffer({ resolveWithObject: true });
          
        const base64 = `data:image/${resizedBuffer.info.format};base64,${resizedBuffer.data.toString('base64')}`;
        blurData[relativePath] = base64;
        successCount++;
      } catch (err) {
        console.warn(`Failed to generate blur for ${relativePath}, using fallback. Error: ${err.message}`);
        blurData[relativePath] = FALLBACK_BLUR;
      }
    }
    
    await fs.writeFile(OUTPUT_FILE, JSON.stringify(blurData, null, 2));
    console.log(`Successfully generated blur data for ${successCount}/${imageFiles.length} images.`);
    console.log(`Saved to ${OUTPUT_FILE}`);
  } catch (err) {
    console.error('Error generating blur data:', err);
    process.exit(1);
  }
}

generateBlur();
