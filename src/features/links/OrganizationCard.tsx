'use client'

import React from 'react'
import Image from 'next/image'
import { ExternalLink, Calendar, MapPin, CheckCircle2, Award, BookOpen, Globe } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import type { Organization } from '@/data/organizations'

export interface OrganizationCardProps {
  organization: Organization
}

export const OrganizationCard: React.FC<OrganizationCardProps> = ({ organization }) => {
  const {
    name,
    nameFa,
    acronym,
    countryFa,
    countryFlag,
    foundedYear,
    websiteUrl,
    categoryFa,
    summaryFa,
    descriptionFa,
    keyActivities,
    keyPublications,
    founders,
  } = organization

  return (
    <Card className="p-6 md:p-8 space-y-6 hover:shadow-md transition-all border border-border/80 bg-surface rounded-2xl">
      {/* Top Header: Category, Country, Year, Badges */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-border/60">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="primary" className="text-xs font-semibold py-1 px-3">
            {categoryFa}
          </Badge>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-background text-xs font-medium text-text-secondary border border-border/60">
            <span>{countryFlag}</span>
            <span>{countryFa}</span>
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-background text-xs font-medium text-text-secondary border border-border/60">
            <Calendar className="w-3.5 h-3.5 text-accent" />
            <span>تأسیس: {foundedYear}</span>
          </span>
        </div>

        {acronym && (
          <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-accent-light text-accent border border-accent/20">
            {acronym}
          </span>
        )}
      </div>

      {/* Main Title & Names */}
      <div className="space-y-1.5">
        <h3 className="text-xl sm:text-2xl font-bold text-text-primary hover:text-primary transition-colors">
          {nameFa}
        </h3>
        <p className="text-xs sm:text-sm font-sans text-text-secondary font-medium tracking-wide direction-ltr text-left">
          {name}
        </p>
      </div>

      {/* Summary & Description */}
      <div className="space-y-3 text-sm text-text-secondary leading-persian">
        <p className="font-medium text-text-primary">{summaryFa}</p>
        <p>{descriptionFa}</p>
      </div>

      {/* Founder(s) Spotlight Section */}
      {founders && founders.length > 0 && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2 text-xs font-bold text-accent">
            <Award className="w-4 h-4" />
            <span>بنیانگذار و چهره شاخص علمی</span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {founders.map((founder, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 rounded-xl bg-background/70 border border-border/70 transition-all hover:bg-background"
              >
                {/* Founder Photo */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shadow-sm border-2 border-surface shrink-0 bg-surface">
                  <Image
                    src={founder.image}
                    alt={founder.nameFa}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 640px) 96px, 112px"
                  />
                </div>

                {/* Founder Info */}
                <div className="space-y-2 text-center sm:text-right flex-1">
                  <div>
                    <h4 className="text-base font-bold text-text-primary">{founder.nameFa}</h4>
                    <span className="text-xs font-mono text-text-secondary block dir-ltr sm:inline-block">
                      {founder.name}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-primary">{founder.roleFa}</p>
                  <p className="text-xs text-text-secondary leading-relaxed">{founder.bioFa}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Key Activities & Publications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        {/* Key Activities */}
        <div className="space-y-2 p-4 rounded-xl bg-surface border border-border/60">
          <h4 className="text-xs font-bold text-text-primary flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-primary" />
            <span>محورهای اصلی فعالیت و پژوهش:</span>
          </h4>
          <ul className="space-y-1.5 text-xs text-text-secondary">
            {keyActivities.map((act, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-1.5 shrink-0" />
                <span className="leading-relaxed">{act}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Key Publications / Journals */}
        {keyPublications && keyPublications.length > 0 ? (
          <div className="space-y-2 p-4 rounded-xl bg-surface border border-border/60">
            <h4 className="text-xs font-bold text-text-primary flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-accent" />
              <span>مجلات، آثار و انتشارات شاخص:</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-text-secondary">
              {keyPublications.map((pub, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent/60 mt-1.5 shrink-0" />
                  <span className="leading-relaxed font-medium">{pub}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-surface border border-border/60 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-xs text-text-secondary">
              <Globe className="w-4 h-4 text-primary" />
              <span>همکاری بین‌رشته‌ای با بیمارستان‌ها و مراکز دانشگاهی بین‌المللی</span>
            </div>
          </div>
        )}
      </div>

      {/* Action Footer: Official Website */}
      <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border/60">
        <div className="text-xs text-text-secondary flex items-center gap-1.5">
          <Globe className="w-4 h-4 text-primary" />
          <span>پایگاه رسمی اینترنتی و آرشیو عمومی</span>
        </div>

        <a
          href={websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto"
          aria-label={`مشاهده وب‌سایت رسمی ${nameFa}`}
        >
          <Button variant="outline" size="sm" className="w-full sm:w-auto gap-2 group hover:border-primary">
            <span>ورود به وب‌سایت رسمی</span>
            <ExternalLink className="w-4 h-4 text-primary group-hover:translate-x-[-2px] group-hover:translate-y-[-2px] transition-transform" />
          </Button>
        </a>
      </div>
    </Card>
  )
}
