'use client'

import React, { useRef, useState, useEffect, useCallback } from 'react'
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  RotateCw,
  Search,
  CheckCircle2,
  FileText,
  Download,
  ScrollText,
  Radio,
  Sparkles,
  ChevronRight,
} from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { toPersianDigits } from '@/lib/text/persian'
import type { TranscriptSegment } from '@/data/experiences'

export interface SynchronizedTranscriptPlayerProps {
  media: {
    src: string
    title: string
    downloadAllowed?: boolean
  }
  transcript: {
    humanReviewed?: boolean
    reviewerNote?: string
    segments: TranscriptSegment[]
  }
}

export const SynchronizedTranscriptPlayer: React.FC<SynchronizedTranscriptPlayerProps> = ({
  media,
  transcript,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const segmentRefs = useRef<{ [key: number]: HTMLDivElement | null }>({})

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [autoScroll, setAutoScroll] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeIdx, setActiveIdx] = useState<number>(-1)

  // Format seconds to mm:ss in Persian format
  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '۰۰:۰۰'
    const m = Math.floor(secs / 60)
    const s = Math.floor(secs % 60)
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  // Format milliseconds to mm:ss
  const formatMs = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000)
    const m = Math.floor(totalSeconds / 60)
    const s = totalSeconds % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  // Play / Pause toggle
  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {})
    }
  }

  // Jump by delta seconds (+/- 10s)
  const jumpTime = (delta: number) => {
    if (!audioRef.current) return
    const newTime = Math.min(Math.max(audioRef.current.currentTime + delta, 0), duration || 9999)
    audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  // Seek on audio range slider
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value)
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  // Seek directly to a segment start time and play
  const seekToSegment = (startMs: number) => {
    if (!audioRef.current) return
    const timeSec = startMs / 1000
    audioRef.current.currentTime = timeSec
    setCurrentTime(timeSec)
    audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {})
  }

  // Speed change cycle
  const changeSpeed = () => {
    const speeds = [1, 1.25, 1.5, 2, 0.75]
    const nextIdx = (speeds.indexOf(playbackRate) + 1) % speeds.length
    const nextSpeed = speeds[nextIdx]
    if (audioRef.current) {
      audioRef.current.playbackRate = nextSpeed
      setPlaybackRate(nextSpeed)
    }
  }

  // Mute / Unmute
  const toggleMute = () => {
    if (!audioRef.current) return
    audioRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  // Audio metadata loaded
  const handleLoadedMetadata = () => {
    if (!audioRef.current) return
    setDuration(audioRef.current.duration || 0)
  }

  // Track time update and synchronize active segment
  const handleTimeUpdate = useCallback(() => {
    if (!audioRef.current) return
    const curSec = audioRef.current.currentTime
    setCurrentTime(curSec)

    const curMs = Math.floor(curSec * 1000)
    const idx = transcript.segments.findIndex(
      (seg) => curMs >= seg.startMs && curMs <= seg.endMs
    )

    if (idx !== -1 && idx !== activeIdx) {
      setActiveIdx(idx)
    } else if (idx === -1) {
      // If between segments or before/after, find closest preceding segment
      const lastPassedIdx = transcript.segments.reduce(
        (acc, seg, i) => (curMs >= seg.startMs ? i : acc),
        -1
      )
      if (lastPassedIdx !== activeIdx) {
        setActiveIdx(lastPassedIdx)
      }
    }
  }, [transcript.segments, activeIdx])

  // Smooth scroll active segment into view when activeIdx changes
  useEffect(() => {
    if (!autoScroll || activeIdx === -1) return
    const activeEl = segmentRefs.current[activeIdx]
    if (activeEl && containerRef.current) {
      activeEl.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      })
    }
  }, [activeIdx, autoScroll])

  // Filter segments for in-transcript search
  const filteredSegments = searchQuery.trim()
    ? transcript.segments.filter((seg) =>
        seg.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (seg.topic && seg.topic.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : transcript.segments

  return (
    <div className="rounded-2xl border border-border/80 bg-surface shadow-md overflow-hidden space-y-0 text-right">
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={media.src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Main Audio Player Bar */}
      <div className="bg-gradient-to-r from-neutral-900 via-neutral-900 to-neutral-800 text-white p-5 sm:p-6 space-y-4 border-b border-border/40">
        {/* Header with Title and Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                {isPlaying && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                )}
                <span
                  className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                    isPlaying ? 'bg-emerald-500' : 'bg-neutral-500'
                  }`}
                ></span>
              </span>
              <span className="text-xs font-medium text-neutral-300">
                {isPlaying ? 'در حال پخش فایل صوتی' : 'آماده پخش'}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
              {media.title}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {transcript.humanReviewed && (
              <Badge variant="success" className="gap-1 text-xs py-1 px-2.5 bg-emerald-950/70 border-emerald-700 text-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>رونوشت بازبینی‌شده و همگام</span>
              </Badge>
            )}
          </div>
        </div>

        {/* Progress Bar with Persian Timestamps */}
        <div className="space-y-1.5" dir="ltr">
          <div className="flex items-center gap-3">
            <span className="text-xs text-neutral-300 font-mono w-12 text-left">
              {toPersianDigits(formatTime(currentTime))}
            </span>
            <div className="relative flex-1 group">
              <input
                type="range"
                min={0}
                max={duration || 100}
                step={0.1}
                value={currentTime}
                onChange={handleSeek}
                aria-label="نوار پیشرفت پخش صوت"
                className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-primary group-hover:h-2.5 transition-all"
              />
            </div>
            <span className="text-xs text-neutral-400 font-mono w-12 text-right">
              {toPersianDigits(formatTime(duration))}
            </span>
          </div>
        </div>

        {/* Playback Controls Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          {/* Main Play / Seek Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => jumpTime(-10)}
              aria-label="۱۰ ثانیه به عقب"
              title="۱۰ ثانیه به عقب"
              className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={togglePlay}
              aria-label={isPlaying ? 'توقف پخش' : 'پخش صوت'}
              className="p-3 rounded-xl bg-primary hover:bg-primary-hover text-white transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
            </button>

            <button
              onClick={() => jumpTime(10)}
              aria-label="۱۰ ثانیه به جلو"
              title="۱۰ ثانیه به جلو"
              className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors cursor-pointer"
            >
              <RotateCw className="w-4 h-4" />
            </button>

            {/* Mute & Speed */}
            <div className="h-6 w-px bg-neutral-700 mx-1" />

            <button
              onClick={toggleMute}
              aria-label={isMuted ? 'وصل صدا' : 'قطع صدا'}
              className="p-2 rounded-lg hover:bg-neutral-800 text-neutral-300 transition-colors cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <button
              onClick={changeSpeed}
              aria-label="سرعت پخش"
              title="تغییر سرعت پخش"
              className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-mono text-neutral-200 transition-colors cursor-pointer border border-neutral-700"
            >
              {playbackRate}x
            </button>
          </div>

          {/* Secondary Actions */}
          <div className="flex items-center gap-2">
            {/* Auto-scroll toggle */}
            <button
              onClick={() => setAutoScroll(!autoScroll)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer border ${
                autoScroll
                  ? 'bg-primary/20 border-primary/60 text-primary-light'
                  : 'bg-neutral-800 border-neutral-700 text-neutral-400 hover:text-neutral-200'
              }`}
              title="پیمایش خودکار متن با جلو رفتن صوت"
            >
              <ScrollText className="w-3.5 h-3.5" />
              <span>اسکرول خودکار: {autoScroll ? 'روشن' : 'خاموش'}</span>
            </button>

            {media.downloadAllowed && (
              <a
                href={media.src}
                download
                className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
                title="دانلود فایل صوتی"
              >
                <Download className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Synchronized Transcript Section */}
      <div className="p-5 sm:p-6 space-y-4">
        {/* Transcript Toolbar & Search */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border/60">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            <div>
              <h4 className="text-sm font-bold text-text-primary">
                متن پیاده‌سازی‌شده همگام با صوت (Interactive Transcript)
              </h4>
              <p className="text-xs text-text-secondary">
                با جلو رفتن صوت، متن به صورت زنده هایلایت می‌شود. برای شنیدن هر بخش روی آن کلیک کنید.
              </p>
            </div>
          </div>

          {/* Search box */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جست‌وجو در متن رونوشت..."
              className="w-full pl-8 pr-3.5 py-1.5 bg-background border border-border rounded-lg text-xs text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Search className="w-3.5 h-3.5 text-text-secondary absolute left-2.5 top-2.5 pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-8 top-2 text-xs text-text-secondary hover:text-text-primary"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Synchronized Segments Container */}
        <div
          ref={containerRef}
          className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1 pl-1 scroll-smooth focus:outline-none"
          tabIndex={0}
          aria-label="فهرست بخش‌های متنی همگام"
        >
          {filteredSegments.length === 0 ? (
            <div className="py-8 text-center text-xs text-text-secondary space-y-1">
              <p>عبارت «{searchQuery}» در متن رونوشت یافت نشد.</p>
              <Button size="sm" variant="ghost" onClick={() => setSearchQuery('')}>
                پاک کردن جست‌وجو
              </Button>
            </div>
          ) : (
            filteredSegments.map((seg, idx) => {
              const originalIndex = transcript.segments.findIndex((s) => s.id === seg.id)
              const isActive = originalIndex === activeIdx
              const isPassed = originalIndex < activeIdx

              return (
                <div
                  key={seg.id || idx}
                  ref={(el) => {
                    segmentRefs.current[originalIndex] = el
                  }}
                  onClick={() => seekToSegment(seg.startMs)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer group relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                    isActive
                      ? 'bg-primary-light/40 border-primary text-text-primary shadow-sm ring-1 ring-primary/30'
                      : isPassed
                      ? 'bg-surface/50 border-border/40 hover:bg-background text-text-secondary opacity-90'
                      : 'bg-surface/90 border-border/70 hover:bg-background text-text-primary'
                  }`}
                >
                  {/* Left Side (Time Badge & Speaker) */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        seekToSegment(seg.startMs)
                      }}
                      className={`font-mono text-xs px-2 py-1 rounded-md border flex items-center gap-1 transition-all ${
                        isActive
                          ? 'bg-primary text-white border-primary shadow-xs'
                          : 'bg-background hover:bg-primary-light text-primary border-border/80 group-hover:border-primary/50'
                      }`}
                      dir="ltr"
                    >
                      {isActive && isPlaying ? (
                        <Radio className="w-3 h-3 animate-pulse" />
                      ) : (
                        <Play className="w-2.5 h-2.5 fill-current" />
                      )}
                      <span>{toPersianDigits(formatMs(seg.startMs))}</span>
                    </button>

                    {seg.topic && (
                      <span className="text-[11px] font-medium text-text-secondary bg-background/80 px-2 py-0.5 rounded border border-border/50">
                        {seg.topic}
                      </span>
                    )}
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 text-right">
                    <p
                      className={`text-sm leading-persian transition-colors ${
                        isActive
                          ? 'font-bold text-text-primary'
                          : 'text-text-secondary group-hover:text-text-primary'
                      }`}
                    >
                      {seg.text}
                    </p>
                  </div>

                  {/* Active Indicator Icon */}
                  {isActive && (
                    <div className="hidden sm:flex items-center text-primary text-xs font-semibold gap-1 shrink-0">
                      <Sparkles className="w-3.5 h-3.5 animate-bounce" />
                      <span>در حال خوانش</span>
                    </div>
                  )}
                </div>
              )
            })
          )}
        </div>

        {/* Footer info & methodology note */}
        {transcript.reviewerNote && (
          <div className="pt-2 text-xs text-text-secondary flex items-center gap-1.5 border-t border-border/50">
            <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>یادداشت بازبینی تحریریه: {transcript.reviewerNote}</span>
          </div>
        )}
      </div>
    </div>
  )
}
