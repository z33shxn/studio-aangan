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

const successfullyGenerated = {
  "/images/misc/hero-main.webp": "hero_main_1780083450925.png",
  "/images/misc/404-room.webp": "not_found_room_1780083464213.png",
  "/images/studio/founder-ananya.webp": "founder_ananya_1780083483192.png",
  "/images/studio/cofounder-kabir.webp": "cofounder_kabir_1780083498256.png",
  "/images/studio/philosophy-detail.webp": "philosophy_detail_1780083582190.png",
  "/images/studio/studio-space-2.webp": "studio_space_2_1780083555430.png",
  "/images/studio/studio-space-1.webp": "studio_space_1_1780083541953.png",
  "/images/studio/designer-sketching.webp": "designer_sketching_1780083568944.png",
  "/images/services/residential.webp": "residential_service_1780083511572.png",
  "/images/services/modular-kitchen.webp": "modular_kitchen_1780083601671.png",
  "/images/services/wardrobes.webp": "wardrobes_1780083616105.png",
  "/images/services/turnkey.webp": "turnkey_1780083631890.png",
  "/images/services/commercial-office.webp": "commercial_office_1780083652386.png",
  "/images/services/space-planning-3d.webp": "space_planning_3d_1780083666642.png",
  "/images/services/renovation.webp": "renovation_1780083681818.png",
  "/images/services/lighting.webp": "lighting_service_1780083712789.png",
};

let copied = 0;
for (const [targetPath, sourceFile] of Object.entries(successfullyGenerated)) {
  const fullSourcePath = path.join(SRC_DIR, sourceFile);
  const fullTargetPath = path.join(DEST_DIR, targetPath);
  
  if (fs.existsSync(fullSourcePath)) {
    ensureDir(fullTargetPath);
    fs.copyFileSync(fullSourcePath, fullTargetPath);
    copied++;
    console.log(`Successfully mapped ${sourceFile} to ${targetPath}`);
  } else {
    console.warn(`Source file missing: ${fullSourcePath}`);
  }
}

console.log(`\nCopied ${copied} base images to their unique endpoints.`);
