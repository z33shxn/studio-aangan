import fs from 'fs/promises';
import path from 'path';

async function getFiles(dir) {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(dirents.map((dirent) => {
    const res = path.resolve(dir, dirent.name);
    return dirent.isDirectory() ? getFiles(res) : res;
  }));
  return Array.prototype.concat(...files);
}

async function run() {
  const files = await getFiles('src');
  const tsxFiles = files.filter(f => f.endsWith('.tsx'));
  let replacedCount = 0;
  for (const file of tsxFiles) {
    let content = await fs.readFile(file, 'utf8');
    if (content.includes('import Image from "next/image"') || content.includes("import Image from 'next/image'")) {
      content = content.replace(/import Image from ["']next\/image["'];?/, 'import { SmartImage as Image } from "@/components/ui/SmartImage";');
      await fs.writeFile(file, content);
      replacedCount++;
    }
  }
  console.log('Replaced imports in', replacedCount, 'files');
}

run();
