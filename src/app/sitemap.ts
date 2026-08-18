import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://neadrdeath.ir'
  const currentDate = new Date().toISOString()

  // Core static pages
  const staticRoutes = [
    '',
    '/experiences',
    '/patterns',
    '/research',
    '/about',
    '/methodology',
    '/ethics',
    '/privacy',
    '/terms',
    '/contact',
    '/submit',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }))

  // Sample dynamic experiences (in full app, queried from Payload Local API)
  const experienceRoutes = [
    '/experiences/deep-peace-out-of-body-surgery',
    '/experiences/tunnel-light-life-review',
    '/experiences/meeting-relatives-border-point',
  ].map((slug) => ({
    url: `${baseUrl}${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  // Patterns routes
  const patternRoutes = [
    '/patterns/out-of-body-sensation',
    '/patterns/altered-time-perception',
    '/patterns/tunnel-or-passage',
    '/patterns/radiant-light-or-presence',
    '/patterns/meeting-deceased-or-guides',
    '/patterns/life-review',
    '/patterns/deep-peace-and-unity',
    '/patterns/distressing-experience',
    '/patterns/border-or-point-of-no-return',
    '/patterns/aftereffects-and-values',
  ].map((slug) => ({
    url: `${baseUrl}${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  return [...staticRoutes, ...experienceRoutes, ...patternRoutes]
}
