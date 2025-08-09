import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || 'https://pratham-potfolio.vercel.app').replace(/\/$/, '');

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}