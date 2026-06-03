import fs from 'fs';
import path from 'path';

// All images listed in the manifest plus the missing ones requested by the user
const requiredImages = [
  // Misc
  "/images/misc/hero-main.webp",
  "/images/misc/hero-mobile.webp",
  "/images/misc/404-room.webp",
  "/images/misc/cta-plaster.webp",
  "/images/misc/footer-evening.webp",
  "/images/misc/og-default.webp",

  // Studio
  "/images/studio/founder-ananya.webp",
  "/images/studio/cofounder-kabir.webp",
  "/images/studio/philosophy-detail.webp",
  "/images/studio/studio-space-1.webp",
  "/images/studio/studio-space-2.webp",
  "/images/studio/designer-sketching.webp",
  "/images/studio/materials-flatlay.webp",
  "/images/studio/approach-portrait.webp",
  "/images/studio/team-candid.webp",
  "/images/studio/awards-vignette.webp",

  // Services
  "/images/services/residential.webp",
  "/images/services/modular-kitchen.webp",
  "/images/services/wardrobes.webp",
  "/images/services/turnkey.webp",
  "/images/services/commercial-office.webp",
  "/images/services/space-planning-3d.webp",
  "/images/services/renovation.webp",
  "/images/services/lighting.webp",
  "/images/services/vastu-styling.webp",

  // Testimonials
  "/images/testimonials/client-1.webp",
  "/images/testimonials/client-2.webp",
  "/images/testimonials/client-3.webp",
  "/images/testimonials/client-4.webp",

  // Journal
  "/images/journal/cost-2bhk-bengaluru.webp",
  "/images/journal/vastu-principles.webp",
  "/images/journal/materials-2026.webp",
  "/images/journal/small-kitchen-storage.webp",

  // Textures
  "/images/textures/paper.webp",
  "/images/textures/plaster.webp"
];

// Add all project images
const projects = [
  'indiranagar-courtyard-house', 
  'verandah-apartment', 
  'clay-and-cane', 
  'the-reading-room', 
  'studio-saaya', 
  'anjalis-kitchen', 
  'terrazzo-terrace', 
  'banyan-cafe'
];

for (const project of projects) {
  requiredImages.push(
    `/images/projects/${project}/cover.webp`,
    `/images/projects/${project}/g1.webp`,
    `/images/projects/${project}/g2.webp`,
    `/images/projects/${project}/before.webp`,
    `/images/projects/${project}/after.webp`
  );
  // Optional images some projects had
  if (['indiranagar-courtyard-house', 'verandah-apartment', 'clay-and-cane', 'studio-saaya', 'terrazzo-terrace'].includes(project)) {
    requiredImages.push(`/images/projects/${project}/g3.webp`);
  }
}

// These are the 16 we successfully generated and will map strictly 1:1
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

const todo = requiredImages.filter(img => !successfullyGenerated[img]);

// Make sure we output the newly augmented manifest for completeness 
fs.writeFileSync('image-manifest.json', JSON.stringify(requiredImages, null, 2));
fs.writeFileSync('image-todo.json', JSON.stringify(todo, null, 2));

console.log(`Generated manifest with ${requiredImages.length} images.`);
console.log(`Identified ${todo.length} missing images for generation.`);
