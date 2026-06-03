import { studio } from "./studio";

// Map city name to a slug
export function slugify(text: string) {
  return text.toLowerCase().replace(/\s+/g, '-');
}

// Generate the source of truth mapping
export const citySlugMap = studio.citiesServed.reduce((acc, city) => {
  acc[slugify(city)] = city;
  return acc;
}, {} as Record<string, string>);

export function getCityFromSlug(slug: string): string | undefined {
  return citySlugMap[slug];
}
