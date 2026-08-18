import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Alert } from '@/components/ui/Alert'
import { ExperienceCard } from '@/features/experiences/ExperienceCard'
import { getFeaturedExperiences } from '@/data/experiences'
import { BookOpen, Compass, ShieldCheck, FileEdit, ArrowLeft, CheckCircle2, Sparkles } from 'lucide-react'

export default function HomePage() {
  const featuredExperiences = getFeaturedExperiences()

  const corePatterns = [
    {
      title: 'احساس خروج از بدن',
      slug: 'out-of-body-sensation',
      desc: 'نگریستن به کالبد فیزیکی و محیط اطراف از زاویه‌ای بیرون از بدن.',
    },
    {
      title: 'تغییر ادراک زمان',
      slug: 'altered-time-perception',
      desc: 'احساس خروج از خطی بودن زمان و تجربه حالت بی‌زمانی.',
    },
    {
      title: 'مواجهه با نور درخشان',
      slug: 'radiant-light-or-presence',
      desc: 'درک نوری پرفروغ و در عین حال نامتصاعد، توأم با شعور و آرامش.',
    },
    {
      title: 'مرور همه‌جانبه زندگی',
      slug: 'life-review',
      desc: 'بازبینی سریع و پانورامیک آثار اعمال و احساسات بر دیگران.',
    },
  ]

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-surface border-b border-border/80 pt-16 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <Badge variant="primary" className="py-1 px-3.5 text-xs font-semibold gap-1.5 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>آرشیو مستقل و مستند تجارب مرزی</span>
          </Badge>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-primary tracking-tight leading-tight">
            تجربه‌های مرزی آگاهی؛ ثبت، روایت و بررسی مسئولانه
          </h1>

          <p className="text-base sm:text-lg text-text-secondary max-w-3xl mx-auto leading-persian">
            آرشیوی مستقل برای مستندسازی تجربه‌های نزدیک به مرگ و بررسی الگوهای مشترک، با احترام به روایت شخصی و
            مرزهای دانش علمی.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link href="/experiences">
              <Button size="lg" variant="primary" className="gap-2 px-6 shadow-sm">
                <Compass className="w-5 h-5" />
                <span>مشاهده تجربه‌ها</span>
              </Button>
            </Link>

            <Link href="/submit">
              <Button size="lg" variant="outline" className="gap-2 px-6">
                <FileEdit className="w-5 h-5 text-primary" />
                <span>ثبت تجربه من</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Experiences Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-text-primary">روایت‌های منتخب و شاخص آرشیو</h2>
            <p className="text-sm text-text-secondary">نمونه‌هایی از مستندات ثبت‌شده همراه با فایل صوتی، رونوشت همگام و شواهد بررسی‌شده</p>
          </div>
          <Link href="/experiences" className="text-sm font-semibold text-primary hover:underline flex items-center gap-1">
            <span>مشاهده همه تجارب</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredExperiences.map((exp) => (
            <ExperienceCard
              key={exp.publicId}
              publicId={exp.publicId}
              title={exp.title}
              slug={exp.slug}
              editorialSummary={exp.editorialSummary}
              experienceTypeTitle={exp.experienceTypeTitle}
              anonymityLevel={exp.anonymityLevel}
              publicAlias={exp.publicAlias}
              patterns={exp.patterns}
              documentationMethods={exp.documentationMethods}
              occurrenceYear={exp.occurrenceYear}
              country={exp.country}
              hasAudio={Boolean(exp.media && exp.media.type === 'audio')}
              hasVideo={Boolean(exp.media && exp.media.type === 'video')}
              publishedAt={exp.publishedAt}
            />
          ))}
        </div>
      </section>

      {/* Patterns Atlas Introduction */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="bg-surface rounded-2xl border border-border/80 p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-text-primary">اطلس الگوهای مشترک آگاهی</h2>
              <p className="text-sm text-text-secondary">
                طبقه‌بندی ساختاریافته عناصر و پدیدارهای تکرارشونده در گزارش‌های تجارب مرزی
              </p>
            </div>
            <Link href="/patterns">
              <Button variant="outline" size="sm" className="gap-1.5">
                <BookOpen className="w-4 h-4 text-primary" />
                <span>مشاهده اطلس کامل</span>
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {corePatterns.map((pat) => (
              <Link key={pat.slug} href={`/patterns/${pat.slug}`} className="group">
                <Card className="p-4 h-full group-hover:border-primary/40 transition-all space-y-2">
                  <h4 className="text-sm font-bold text-text-primary group-hover:text-primary transition-colors">
                    {pat.title}
                  </h4>
                  <p className="text-xs text-text-secondary leading-relaxed">{pat.desc}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology & Review Process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center text-primary">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-text-primary">حریم خصوصی و ناشناس‌سازی</h3>
            <p className="text-xs text-text-secondary leading-persian">
              اطلاعات تماس با استاندارد نظامی AES-256-GCM رمزگذاری می‌شوند. نام واقعی و مکان‌های حساس پیش از انتشار به
              طور کامل حذف می‌گردند (مگر در موارد رضایت صریح راوی).
            </p>
          </Card>

          <Card className="p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center text-primary">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-text-primary">روششناسی غیرارزشی</h3>
            <p className="text-xs text-text-secondary leading-persian">
              ما هیچ ادعای اثبات ماورایی یا رتبه‌بندی حقیقت تولید نمی‌کنیم؛ برچسب‌ها صرفاً روش گردآوری شواهد و مصاحبه را
              توضیح می‌دهند.
            </p>
          </Card>

          <Card className="p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center text-primary">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-text-primary">استناد به مقالات داوری‌شده</h3>
            <p className="text-xs text-text-secondary leading-persian">
              پدیدارها در کنار مقالات علمی منتشرشده در مجلات بین‌المللی علوم اعصاب، بیهوشی و روان‌پزشکی تحلیل می‌شوند.
            </p>
          </Card>
        </div>
      </section>

      {/* Medical Alert Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <Alert variant="warning" title="تذکر شفاف بالینی و اخلاقی">
          این وب‌سایت یک پایگاه مستقل پژوهشی و روایی است و اطلاعات آن جایگزین خدمات تخصصی درمانی، پزشکی یا خدمات بحران
          روان‌پزشکی نیست. هرگونه اقدام پرخطر یا تلاش عمدی برای ایجاد حالت‌های تهدیدکننده حیات به هیچ وجه مورد تأیید این
          پایگاه نیست.
        </Alert>
      </section>
    </div>
  )
}
