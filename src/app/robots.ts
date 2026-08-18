import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://neadrdeath.ir'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/', '/submit/success', '/withdraw'],
    },
    sitemap: [`${baseUrl}/sitemap.xml`, `${baseUrl}/video-sitemap.xml`],
  }
}
