import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://neadrdeath.ir'

  const sampleItems = [
    {
      title: 'ادراک آرامش عمیق و مشاهده اتاق عمل از دید بالا در حین جراحی قلب',
      slug: 'deep-peace-out-of-body-surgery',
      summary: 'روایتی مستند از احساس ناگهانی انقطاع درد و ادراک نقطه دیدی معلق در سقف اتاق عمل.',
      pubDate: new Date('2026-05-15').toUTCString(),
    },
    {
      title: 'گذر از گذرگاه تاریک، مواجهه با حضور درخشان و بازبینی پانورامیک وقایع',
      slug: 'tunnel-light-life-review',
      summary: 'گزارش رویدادی در پی ایست قلبی کوتاه‌مدت و درک حضور نوری پر از شعور.',
      pubDate: new Date('2026-06-20').toUTCString(),
    },
  ]

  let rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>مرز آگاهی - آرشیو مستقل تجربه‌های نزدیک به مرگ</title>
    <link>${baseUrl}</link>
    <description>تازه‌ترین روایت‌های مستندسازی‌شده و مقالات پژوهشی تجارب مرزی آگاهی</description>
    <language>fa</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>`

  sampleItems.forEach((item) => {
    rss += `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${baseUrl}/experiences/${item.slug}</link>
      <guid isPermaLink="true">${baseUrl}/experiences/${item.slug}</guid>
      <description><![CDATA[${item.summary}]]></description>
      <pubDate>${item.pubDate}</pubDate>
    </item>`
  })

  rss += `
  </channel>
</rss>`

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
