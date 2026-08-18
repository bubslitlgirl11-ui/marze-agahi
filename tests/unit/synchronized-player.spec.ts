import { describe, it, expect } from 'vitest'
import {
  getExperienceBySlug,
  getFeaturedExperiences,
  getAllExperiences,
} from '@/data/experiences'

describe('Synchronized Player and Experience Repository', () => {
  it('retrieves Mohammad Zamani Ghaleh experience by slug accurately', () => {
    const exp = getExperienceBySlug('mohammad-zamani-ghaleh')
    expect(exp).toBeDefined()
    expect(exp?.publicAlias).toBe('محمد زمانی قلعه')
    expect(exp?.occurrenceYear).toBe('۱۳۵۵')
    expect(exp?.isFeatured).toBe(true)
    expect(exp?.media?.type).toBe('audio')
    expect(exp?.transcript?.humanReviewed).toBe(true)
  })

  it('contains correctly formatted sequential transcript segments for live audio sync', () => {
    const exp = getExperienceBySlug('mohammad-zamani-ghaleh')
    expect(exp?.transcript?.segments.length).toBeGreaterThan(5)

    const segments = exp!.transcript!.segments
    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i]
      expect(seg.endMs).toBeGreaterThan(seg.startMs)
      expect(seg.text.length).toBeGreaterThan(10)
      if (i > 0) {
        expect(seg.startMs).toBeGreaterThanOrEqual(segments[i - 1].startMs)
      }
    }
  })

  it('accurately identifies active segment based on playback millisecond timestamps', () => {
    const exp = getExperienceBySlug('mohammad-zamani-ghaleh')!
    const segments = exp.transcript!.segments

    // Helper to find segment at a given timestamp
    const findSegmentAt = (curMs: number) => {
      return segments.findIndex((seg) => curMs >= seg.startMs && curMs <= seg.endMs)
    }

    // At 1000ms -> should be segment 0
    expect(findSegmentAt(1000)).toBe(0)

    // At 15000ms -> should be segment 2 (14300 - 23500)
    expect(findSegmentAt(15000)).toBe(2)

    // At 50000ms -> should be segment 5 (44100 - 56200)
    expect(findSegmentAt(50000)).toBe(5)

    // At 110000ms -> should be segment 10 (106100 - 120000)
    expect(findSegmentAt(110000)).toBe(10)
  })

  it('includes Mohammad Zamani Ghaleh in featured and all experiences lists', () => {
    const featured = getFeaturedExperiences()
    const all = getAllExperiences()

    expect(featured.some((e) => e.slug === 'mohammad-zamani-ghaleh')).toBe(true)
    expect(all.some((e) => e.slug === 'mohammad-zamani-ghaleh')).toBe(true)
  })
})
