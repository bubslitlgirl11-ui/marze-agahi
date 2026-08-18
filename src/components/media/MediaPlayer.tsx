'use client'

import React, { useRef, useState, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, Download } from 'lucide-react'
import { toPersianDigits } from '@/lib/text/persian'

export interface MediaPlayerProps {
  src: string
  type: 'video' | 'audio'
  poster?: string
  title?: string
  downloadAllowed?: boolean
  chapters?: { startMs: number; title: string }[]
  onTimeUpdate?: (currentTimeMs: number) => void
  onSeek?: (seekToMs: number) => void
}

export const MediaPlayer: React.FC<MediaPlayerProps> = ({
  src,
  type,
  poster,
  title,
  downloadAllowed = false,
  chapters = [],
  onTimeUpdate,
}) => {
  const mediaRef = useRef<HTMLVideoElement | HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)

  const togglePlay = () => {
    if (!mediaRef.current) return
    if (isPlaying) {
      mediaRef.current.pause()
    } else {
      mediaRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleTimeUpdate = () => {
    if (!mediaRef.current) return
    const cur = mediaRef.current.currentTime
    setCurrentTime(cur)
    if (onTimeUpdate) {
      onTimeUpdate(Math.floor(cur * 1000))
    }
  }

  const handleLoadedMetadata = () => {
    if (!mediaRef.current) return
    setDuration(mediaRef.current.duration || 0)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value)
    if (mediaRef.current) {
      mediaRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  const toggleMute = () => {
    if (!mediaRef.current) return
    mediaRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const changeSpeed = () => {
    const speeds = [1, 1.25, 1.5, 2, 0.75]
    const nextIdx = (speeds.indexOf(playbackRate) + 1) % speeds.length
    const nextSpeed = speeds[nextIdx]
    if (mediaRef.current) {
      mediaRef.current.playbackRate = nextSpeed
      setPlaybackRate(nextSpeed)
    }
  }

  const toggleFullscreen = () => {
    if (!mediaRef.current) return
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      mediaRef.current.requestFullscreen()
    }
  }

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
    const s = Math.floor(secs % 60)
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  return (
    <div className="w-full rounded-2xl overflow-hidden bg-text-primary text-white shadow-md border border-border/40">
      {type === 'video' ? (
        <div className="relative aspect-video bg-black flex items-center justify-center">
          <video
            ref={mediaRef as React.RefObject<HTMLVideoElement>}
            src={src}
            poster={poster}
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
            className="w-full h-full object-contain"
          />
        </div>
      ) : (
        <div className="p-4 bg-primary/10 flex items-center justify-between">
          <span className="text-sm font-medium text-text-primary">{title || 'فایل صوتی روایت'}</span>
          <audio
            ref={mediaRef as React.RefObject<HTMLAudioElement>}
            src={src}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
          />
        </div>
      )}

      {/* Persian Accessible Custom Controls */}
      <div className="p-3.5 bg-neutral-900 flex flex-col gap-2.5" dir="ltr">
        {/* Progress bar */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-neutral-400 font-mono">{toPersianDigits(formatTime(currentTime))}</span>
          <input
            type="range"
            min={0}
            max={duration || 100}
            step={0.1}
            value={currentTime}
            onChange={handleSeek}
            aria-label="نوار پیشرفت پخش"
            className="w-full h-1.5 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none"
          />
          <span className="text-xs text-neutral-400 font-mono">{toPersianDigits(formatTime(duration))}</span>
        </div>

        {/* Buttons Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? 'توقف پخش' : 'شروع پخش'}
              className="p-2 rounded-lg bg-primary hover:bg-primary-hover text-white transition-colors cursor-pointer"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            <button
              onClick={toggleMute}
              aria-label={isMuted ? 'وصل صدا' : 'قطع صدا'}
              className="p-2 rounded-lg hover:bg-neutral-800 text-neutral-300 transition-colors cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <button
              onClick={changeSpeed}
              aria-label="تغییر سرعت پخش"
              className="px-2 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-xs font-mono text-neutral-300"
            >
              {playbackRate}x
            </button>
          </div>

          <div className="flex items-center gap-2">
            {downloadAllowed && (
              <a
                href={src}
                download
                className="p-2 rounded-lg hover:bg-neutral-800 text-neutral-300 transition-colors"
                title="دانلود فایل"
              >
                <Download className="w-4 h-4" />
              </a>
            )}

            {type === 'video' && (
              <button
                onClick={toggleFullscreen}
                aria-label="تمام صفحه"
                className="p-2 rounded-lg hover:bg-neutral-800 text-neutral-300 transition-colors cursor-pointer"
              >
                <Maximize className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
