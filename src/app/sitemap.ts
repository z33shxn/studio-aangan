import { MetadataRoute } from 'next';
import { projects } from '@/content/projects';
import { services } from '@/content/services';
import { posts } from '@/content/posts';
import { citySlugMap } from '@/content/locations';

import { SITE_URL } from '@/lib/site';

const baseUrl = SITE_URL;
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '', '/studio', '/services', '/portfolio', '/before-after', 
    '/pricing', '/journal', '/contact', '/team', '/process', 
    '/careers', '/press', '/privacy', '/terms', '/faq', 
    '/testimonials', '/locations'
  ].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : 0.8,
    })
  );

  const projectRoutes = projects.map((p) => ({
    url: `${baseUrl}/portfolio/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const serviceRoutes = services.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const postRoutes = posts.map((p) => ({
    url: `${baseUrl}/journal/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }));

  const locationRoutes = Object.keys(citySlugMap).map((slug) => ({
    url: `${baseUrl}/locations/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...routes, ...projectRoutes, ...serviceRoutes, ...postRoutes, ...locationRoutes];
}
