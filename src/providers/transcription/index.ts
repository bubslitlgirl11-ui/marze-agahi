/**
 * TranscriptionProvider Interface & Manual Implementation
 * Avoids any automatic paid AI charges.
 */

export interface TranscriptSegment {
  startMs: number
  endMs: number
  text: string
  speaker?: string
}

export interface TranscriptChapter {
  startMs: number
  title: string
}

export interface TranscriptData {
  mediaAssetId: string
  language: string
  fullText: string
  segments: TranscriptSegment[]
  chapters: TranscriptChapter[]
  humanReviewed: boolean
}

export interface TranscriptionProvider {
  parseVtt(vttContent: string): Promise<TranscriptSegment[]>
  generateVtt(segments: TranscriptSegment[]): string
}

export class ManualTranscriptionProvider implements TranscriptionProvider {
  async parseVtt(vttContent: string): Promise<TranscriptSegment[]> {
    const lines = vttContent.split('\n')
    const segments: TranscriptSegment[] = []
    let currentStart = 0
    let currentEnd = 0
    let currentText = ''

    for (const line of lines) {
      const trimmed = line.trim()
      if (trimmed.includes('-->')) {
        const [startStr, endStr] = trimmed.split('-->').map((s) => s.trim())
        currentStart = this.timeStringToMs(startStr)
        currentEnd = this.timeStringToMs(endStr)
      } else if (trimmed && !trimmed.startsWith('WEBVTT') && !trimmed.startsWith('NOTE')) {
        currentText = trimmed
        if (currentEnd > currentStart) {
          segments.push({
            startMs: currentStart,
            endMs: currentEnd,
            text: currentText,
          })
          currentStart = 0
          currentEnd = 0
          currentText = ''
        }
      }
    }

    return segments
  }

  generateVtt(segments: TranscriptSegment[]): string {
    let vtt = 'WEBVTT\n\n'
    segments.forEach((seg, idx) => {
      const start = this.msToTimeString(seg.startMs)
      const end = this.msToTimeString(seg.endMs)
      vtt += `${idx + 1}\n${start} --> ${end}\n${seg.text}\n\n`
    })
    return vtt
  }

  private timeStringToMs(timeStr: string): number {
    const parts = timeStr.split(':')
    if (parts.length === 3) {
      const [hours, minutes, seconds] = parts
      const [secs, ms] = seconds.split('.')
      return (parseInt(hours, 10) * 3600 + parseInt(minutes, 10) * 60 + parseInt(secs, 10)) * 1000 + (parseInt(ms, 10) || 0)
    } else if (parts.length === 2) {
      const [minutes, seconds] = parts
      const [secs, ms] = seconds.split('.')
      return (parseInt(minutes, 10) * 60 + parseInt(secs, 10)) * 1000 + (parseInt(ms, 10) || 0)
    }
    return 0
  }

  private msToTimeString(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000)
    const milliseconds = ms % 1000
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`
  }
}

let transcriptionProviderInstance: TranscriptionProvider | null = null

export function getTranscriptionProvider(): TranscriptionProvider {
  if (!transcriptionProviderInstance) {
    transcriptionProviderInstance = new ManualTranscriptionProvider()
  }
  return transcriptionProviderInstance
}
