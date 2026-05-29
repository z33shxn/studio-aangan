import { MetadataRoute } from 'next';
import { projects } from '@/content/projects';
import { services } from '@/content/services';
import { posts } from '@/content/posts';

const baseUrl = 'https://studioaangan.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/studio', '/services', '/portfolio', '/before-after', '/pricing', '/journal', '/contact'].map(
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

  return [...routes, ...projectRoutes, ...serviceRoutes, ...postRoutes];
}
