import React from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { DocumentationBadge } from './DocumentationBadge'
import { Video, Mic, FileText, Calendar, MapPin, User } from 'lucide-react'
import { toPersianDigits } from '@/lib/text/persian'

export interface ExperienceCardProps {
  publicId: string
  title: string
  slug: string
  editorialSummary: string
  experienceTypeTitle?: string
  anonymityLevel?: 'anonymous' | 'alias' | 'named'
  publicAlias?: string
  patterns?: { title: string; slug: string }[]
  documentationMethods?: string[]
  occurrenceYear?: string
  country?: string
  hasVideo?: boolean
  hasAudio?: boolean
  publishedAt?: string
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({
  title,
  slug,
  editorialSummary,
  experienceTypeTitle = 'تجربه نزدیک به مرگ',
  anonymityLevel = 'anonymous',
  publicAlias,
  patterns = [],
  documentationMethods = [],
  occurrenceYear,
  country = 'ایران',
  hasVideo = false,
  hasAudio = false,
  publishedAt,
}) => {
  const authorName = anonymityLevel === 'anonymous' ? 'راوی ناشناس' : publicAlias || 'راوی ناشناس'

  return (
    <Card className="p-5 flex flex-col justify-between h-full group hover:border-primary/50 transition-all text-right">
      <div className="space-y-3">
        {/* Header Tags */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Badge variant="outline" className="text-xs font-semibold text-primary bg-primary-light/40">
            {experienceTypeTitle}
          </Badge>

          {/* Media indicator */}
          <div className="flex items-center gap-1.5 text-text-secondary text-xs">
            {hasVideo && (
              <span className="flex items-center gap-1 bg-background px-1.5 py-0.5 rounded border border-border">
                <Video className="w-3.5 h-3.5 text-primary" /> ویدئو
              </span>
            )}
            {hasAudio && (
              <span className="flex items-center gap-1 bg-background px-1.5 py-0.5 rounded border border-border">
                <Mic className="w-3.5 h-3.5 text-accent" /> صوت
              </span>
            )}
            {!hasVideo && !hasAudio && (
              <span className="flex items-center gap-1 bg-background px-1.5 py-0.5 rounded border border-border">
                <FileText className="w-3.5 h-3.5" /> روایت متنی
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-text-primary group-hover:text-primary transition-colors leading-snug">
          <Link href={`/experiences/${slug}`} className="focus:outline-none focus:underline">
            {title}
          </Link>
        </h3>

        {/* Editorial Summary */}
        <p className="text-sm text-text-secondary line-clamp-3 leading-persian">{editorialSummary}</p>

        {/* Patterns list (up to 3) */}
        {patterns.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {patterns.slice(0, 3).map((pat) => (
              <Link key={pat.slug} href={`/patterns/${pat.slug}`} className="hover:opacity-80">
                <Badge variant="neutral" className="text-[11px] py-0.5">
                  #{pat.title}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="pt-4 mt-4 border-t border-border/60 flex flex-wrap items-center justify-between gap-2 text-xs text-text-secondary">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <User className="w-3.5 h-3.5" />
            <span>{authorName}</span>
          </span>
          {occurrenceYear && (
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>وقوع: {toPersianDigits(occurrenceYear)}</span>
            </span>
          )}
        </div>

        {documentationMethods.length > 0 && (
          <DocumentationBadge method={documentationMethods[0]} />
        )}
      </div>
    </Card>
  )
}
