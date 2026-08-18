import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://neadrdeath.ir'

  const videoSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <url>
    <loc>${baseUrl}/experiences/meeting-relatives-border-point</loc>
    <video:video>
      <video:thumbnail_loc>${baseUrl}/images/mock-poster.webp</video:thumbnail_loc>
      <video:title>ملاقات با بستگان درگذشته در جریان بیهوشی</video:title>
      <video:description>مصاحبه مستند با راوی درباره تجربه نزدیک به مرگ و ادراک مرز بدون بازگشت.</video:description>
      <video:content_loc>https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8</video:content_loc>
      <video:duration>420</video:duration>
      <video:publication_date>2026-08-10T00:00:00+03:30</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:requires_subscription>no</video:requires_subscription>
    </video:video>
  </url>
</urlset>`

  return new NextResponse(videoSitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
