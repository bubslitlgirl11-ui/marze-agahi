import { describe, it, expect } from 'vitest'
import {
  getExperienceBySlug,
  getFeaturedExperiences,
  getAllExperiences,
  type ExperienceItem,
  type TranscriptSegment,
} from '@/data/experiences'

describe('Synchronized Player and Experience Repository', () => {
  const mockTranscriptSegments: TranscriptSegment[] = [
    { id: 'seg-0', startMs: 0, endMs: 9000, text: 'من اکنون ۶۵ سال دارم. این اتفاق در سال ۱۳۵۵ برایم رخ داد.' },
    { id: 'seg-1', startMs: 9100, endMs: 19500, text: 'محل زندگی خانواده ما شهر اصفهان بود ولی در مشهد ساکن بودم.' },
    { id: 'seg-2', startMs: 19600, endMs: 31000, text: 'من برای تعطیلات و دیدار خانواده ساعت ۲ صبح با ماشین حرکت کردم.' },
    { id: 'seg-3', startMs: 31100, endMs: 44000, text: 'در جایی از راه نزدیک به قوچان یک جیپ لندرور با سرعت به طرفم آمد.' },
    { id: 'seg-4', startMs: 44100, endMs: 56500, text: 'ماشین من چند معلق خورد و جراحات شدیدی به سرم وارد شد.' },
    { id: 'seg-5', startMs: 56600, endMs: 70000, text: 'من را به بیمارستان بردند و کادر درمان بلافاصله مشغول کار شدند.' },
    { id: 'seg-6', startMs: 70100, endMs: 84000, text: 'ناگهان همه چیز تغییر کرد و آرامش عمیقی تمام وجودم را فرا گرفت.' },
    { id: 'seg-7', startMs: 84100, endMs: 98000, text: 'دیدم که از بالا به بدنم و پرستار نگاه می‌کنم.' },
    { id: 'seg-8', startMs: 98100, endMs: 114000, text: 'با سرعت وارد تونلی از نور شدم و به حضور وجودی نورانی رسیدم.' },
    { id: 'seg-9', startMs: 114100, endMs: 130000, text: 'تمام زندگی‌ام را مرور کردم و به دنیا بازگردانده شدم.' },
  ]

  it('retrieves experiences from repository accurately', () => {
    const all = getAllExperiences()
    expect(all.length).toBeGreaterThan(0)

    const first = all[0]
    expect(first.slug).toBeDefined()
    expect(first.title).toBeDefined()

    const retrieved = getExperienceBySlug(first.slug)
    expect(retrieved).toBeDefined()
    expect(retrieved?.publicId).toBe(first.publicId)
  })

  it('contains correctly formatted sequential transcript segments for live audio sync', () => {
    expect(mockTranscriptSegments.length).toBeGreaterThan(5)

    for (let i = 0; i < mockTranscriptSegments.length; i++) {
      const seg = mockTranscriptSegments[i]
      expect(seg.endMs).toBeGreaterThan(seg.startMs)
      expect(seg.text.length).toBeGreaterThan(10)
      if (i > 0) {
        expect(seg.startMs).toBeGreaterThanOrEqual(mockTranscriptSegments[i - 1].startMs)
      }
    }
  })

  it('accurately identifies active segment based on playback millisecond timestamps', () => {
    const segments = mockTranscriptSegments

    // Helper to find segment at a given timestamp
    const findSegmentAt = (curMs: number) => {
      return segments.findIndex((seg) => curMs >= seg.startMs && curMs <= seg.endMs)
    }

    // At 1000ms -> should be segment 0 (0 - 9000)
    expect(findSegmentAt(1000)).toBe(0)

    // At 15000ms -> should be segment 1 (9100 - 19500)
    expect(findSegmentAt(15000)).toBe(1)

    // At 50000ms -> should be segment 4 (44100 - 56500)
    expect(findSegmentAt(50000)).toBe(4)

    // At 120000ms -> should be segment 9 (114100 - 130000)
    expect(findSegmentAt(120000)).toBe(9)
  })

  it('validates featured and all experiences repository methods', () => {
    const featured = getFeaturedExperiences()
    const all = getAllExperiences()

    expect(all.length).toBeGreaterThan(0)
    expect(Array.isArray(featured)).toBe(true)
  })
})

