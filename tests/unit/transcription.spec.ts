import { describe, it, expect } from 'vitest'
import { ManualTranscriptionProvider } from '@/providers/transcription'

describe('ManualTranscriptionProvider VTT parser and generator', () => {
  const provider = new ManualTranscriptionProvider()

  it('parses standard WebVTT subtitles accurately into millisecond segments', async () => {
    const vtt = `WEBVTT

1
00:00:01.000 --> 00:00:04.500
من ناگهان خودم را بالای سقف اتاق دیدم.

2
00:00:04.600 --> 00:00:08.200
پزشکان در حال احیای قلبی بودند.`

    const segments = await provider.parseVtt(vtt)
    expect(segments.length).toBe(2)
    expect(segments[0].startMs).toBe(1000)
    expect(segments[0].endMs).toBe(4500)
    expect(segments[0].text).toBe('من ناگهان خودم را بالای سقف اتاق دیدم.')
    expect(segments[1].startMs).toBe(4600)
    expect(segments[1].endMs).toBe(8200)
  })

  it('generates standard WebVTT content from segment array', () => {
    const segments = [
      { startMs: 0, endMs: 2500, text: 'نوری پرفروغ و آرامش‌بخش نمایان شد.' },
      { startMs: 2600, endMs: 5000, text: 'هیچ دردی احساس نمی‌کردم.' },
    ]

    const vtt = provider.generateVtt(segments)
    expect(vtt).toContain('WEBVTT')
    expect(vtt).toContain('00:00:00.000 --> 00:00:02.500')
    expect(vtt).toContain('نوری پرفروغ و آرامش‌بخش نمایان شد.')
  })
})
