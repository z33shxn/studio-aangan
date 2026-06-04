import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Studio Aangan',
    short_name: 'Studio Aangan',
    description: 'Boutique Interior Design Studio in Bengaluru',
    start_url: '/',
    display: 'standalone',
    background_color: '#F9F8F6',
    theme_color: '#1A1A1A',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}
