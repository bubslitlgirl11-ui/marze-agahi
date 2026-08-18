'use client'

import React, { useState } from 'react'
import { Search, CheckCircle2, FileText } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { toPersianDigits } from '@/lib/text/persian'

export interface TranscriptSegmentItem {
  startMs: number
  endMs: number
  text: string
  speaker?: string
}

export interface TranscriptViewerProps {
  segments: TranscriptSegmentItem[]
  currentPlayTimeMs?: number
  humanReviewed?: boolean
  onSegmentClick?: (startMs: number) => void
}

export const TranscriptViewer: React.FC<TranscriptViewerProps> = ({
  segments,
  currentPlayTimeMs = 0,
  humanReviewed = false,
  onSegmentClick,
}) => {
  const [searchQuery, setSearchQuery] = useState('')

  const formatMs = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000)
    const m = Math.floor(totalSeconds / 60)
    const s = totalSeconds % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  const filteredSegments = searchQuery
    ? segments.filter((seg) => seg.text.toLowerCase().includes(searchQuery.toLowerCase()))
    : segments

  return (
    <div className="bg-surface rounded-2xl border border-border/80 p-5 space-y-4 text-right shadow-sm">
      {/* Header with status */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border/60">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          <h4 className="text-sm font-bold text-text-primary">متن همگام و رونوشت پیاده‌سازی‌شده (Transcript)</h4>
        </div>

        {humanReviewed ? (
          <Badge variant="success" className="gap-1 text-xs">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>متن بازبینی‌شده انسانی</span>
          </Badge>
        ) : (
          <Badge variant="neutral" className="text-xs">
            پیش‌نویس اولیه
          </Badge>
        )}
      </div>

      {/* In-transcript search */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="جست‌وجو در متن رونوشت..."
          className="w-full pl-9 pr-3.5 py-2 bg-background border border-border rounded-lg text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <Search className="w-3.5 h-3.5 text-text-secondary absolute left-3 top-3 pointer-events-none" />
      </div>

      {/* Segments List */}
      <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
        {filteredSegments.length === 0 ? (
          <p className="text-xs text-text-secondary py-4 text-center">موردی با عبارت جست‌وجو شده یافت نشد.</p>
        ) : (
          filteredSegments.map((seg, idx) => {
            const isActive = currentPlayTimeMs >= seg.startMs && currentPlayTimeMs <= seg.endMs

            return (
              <div
                key={idx}
                onClick={() => onSegmentClick && onSegmentClick(seg.startMs)}
                className={`p-2.5 rounded-lg border transition-all cursor-pointer flex items-start gap-3 text-xs leading-persian ${
                  isActive
                    ? 'bg-primary-light/60 border-primary text-text-primary font-medium shadow-xs'
                    : 'bg-background/50 border-border/40 hover:bg-background text-text-secondary'
                }`}
              >
                <button
                  type="button"
                  className="shrink-0 font-mono text-[11px] text-primary hover:underline bg-surface px-1.5 py-0.5 rounded border border-border/60"
                  dir="ltr"
                >
                  {toPersianDigits(formatMs(seg.startMs))}
                </button>
                <p className="flex-1 text-right">{seg.text}</p>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
