export interface ScientificArticle {
  title: string
  authors: string
  year: number
  journal: string
  doi: string
  pmid?: string
  summaryFa: string
}

export interface ResearchTopic {
  topicId: string
  title: string
  category: string
  image: string
  description: string
  articles: ScientificArticle[]
}

export const RESEARCH_TOPICS: ResearchTopic[] = [
  {
    topicId: 'nde-clinical',
    title: '۱. تجارب نزدیک به مرگ (Near-Death Experiences - NDE)',
    category: 'مطالعات بالینی و طولی',
    image: '/images/research/nde_consciousness_research_1787053160127.jpg',
    description: 'بررسی‌های طولی آینده‌نگر در بخش‌های احیای قلبی و اعتبارسنجی مقیاس‌های استاندارد سنجش NDE.',
    articles: [
      {
        title: 'Near-death experience in survivors of cardiac arrest: a prospective study in the Netherlands',
        authors: 'Pim van Lommel, Ruud van Wees, Vincent Meyers, Ingrid Elfferich',
        year: 2001,
        journal: 'The Lancet, 358(9298), 2039-2045',
        doi: '10.1016/S0140-6736(01)07100-8',
        pmid: '11755177',
        summaryFa:
          'یکی از مهم‌ترین مطالعات آینده‌نگر بالینی روی ۳۴۴ بیمار احیاشده از ایست قلبی در ۱۰ بیمارستان هلند. این پژوهش نشان داد که عوامل فیزیولوژیک مانند کمبود اکسیژن (هیپوکسی) یا داروها به تنهایی نمی‌توانند علت وقوع NDE را تبیین کنند و ۶۲ بیمار (۱۸٪) تجارب ساختاریافته عمیقی را گزارش کردند.',
      },
      {
        title: 'The near-death experience scale: Construction, reliability, and validity',
        authors: 'Bruce Greyson',
        year: 1983,
        journal: 'Journal of Nervous and Mental Disease, 171(6), 369-375',
        doi: '10.1097/00005053-198306000-00007',
        pmid: '6854216',
        summaryFa:
          'مقاله بنیادین دکتر بروس گریسون در تدوین «مقیاس NDE گریسون» با ۱۶ مؤلفه استاندارد در ۴ بعد شناختی، عاطفی، حسی و فراشناختی. این مقیاس امروزه استاندارد طلایی بین‌المللی برای غربالگری و اعتبارسنجی پژوهش‌های تجارب نزدیک به مرگ است.',
      },
    ],
  },
  {
    topicId: 'resuscitation-aware',
    title: '۲. هوشیاری حین احیای قلبی و مطالعات AWARE',
    category: 'علوم اعصاب احیا و مراقبت‌های ویژه',
    image: '/images/research/resuscitation_aware_study_1787053233692.jpg',
    description: 'بررسی عینی ادراکات حسی و ثبت امواج الکتروانسفالوگرافی مغز در دقایق ایست قلبی و حین CPR.',
    articles: [
      {
        title: 'AWAreness during REsuscitation: A prospective study (AWARE)',
        authors: 'Sam Parnia, Ken Spearpoint, Gabriele de Vos, Peter Fenwick, et al.',
        year: 2014,
        journal: 'Resuscitation, 85(12), 1799-1805',
        doi: '10.1016/j.resuscitation.2014.09.004',
        pmid: '25301882',
        summaryFa:
          'مطالعه چندمرکزی در ۲۵ بیمارستان بریتانیا، آمریکا و اتریش روی ۲۰۶۰ مورد ایست قلبی. این پژوهش برای نخستین بار ادراکات شنیداری و بصری دقیق را در زمان فقدان ضربان قلب و خط صاف مغزی مورد سنجش تجربی و تطبیق بالینی قرار داد.',
      },
      {
        title: 'AWAreness during REsuscitation - II: A multi-center study of consciousness and awareness in cardiac arrest',
        authors: 'Sam Parnia, Tarina Keshavarz Shirazi, et al.',
        year: 2023,
        journal: 'Resuscitation, 191, 109902',
        doi: '10.1016/j.resuscitation.2023.109902',
        pmid: '37423334',
        summaryFa:
          'بزرگ‌ترین مطالعه ثبت هم‌زمان نوار مغزی (EEG) حین عملیات احیای قلبی ریوی؛ ثبت فعالیت امواج گاما، دلتا و تتا (نشانگرهای فرآیندهای عالی هوشیاری) تا چند ده دقیقه پس از توقف گردش خون در بیمارستان‌های دانشگاهی.',
      },
    ],
  },
  {
    topicId: 'obe-neuroscience',
    title: '۳. تجارب خروج از بدن (OBE) و عصب‌شناسی ادراک خود',
    category: 'نوروسایکولوژی و پردازش چندحسی',
    image: '/images/research/obe_spatial_perception_1787053250023.jpg',
    description: 'پژوهش‌های عصب‌شناختی درباره اتصال گیجگاهی-آهیانه‌ای (TPJ) و پردازش دیداری-فضایی مکان‌مندی خود.',
    articles: [
      {
        title: 'Neuropsychology: Stimulating illusory own-body perceptions',
        authors: 'Olaf Blanke, Stéphanie Ortigue, Theodor Landis, Margitta Seeck',
        year: 2002,
        journal: 'Nature, 419(6904), 269-270',
        doi: '10.1038/419269a',
        pmid: '12353025',
        summaryFa:
          'مطالعه مشهور دانشگاه ژنو در ژورنال نیچر که نشان داد تحریک الکتریکی ناحیه شکنج زاویه‌دار راست (Right Angular Gyrus / TPJ) در مغز می‌تواند احساس خروج از بدن و تماشای کالبد از زاویه دید ناظر معلق را شبیه‌سازی کند.',
      },
      {
        title: 'Out-of-body experience and autoscopy of neurological origin',
        authors: 'Olaf Blanke, Christine Mohr',
        year: 2005,
        journal: 'Brain Research Reviews, 50(1), 184-199',
        doi: '10.1016/j.brainresrev.2005.05.008',
        pmid: '16019077',
        summaryFa:
          'مرور سیستماتیک نوروسایکولوژیک تفاوت‌های بین تجربه خروج از بدن (OBE)، خوددگرنگری (Autoscopy) و احساس حضور، با تمرکز بر ادغام اطلاعات وستیبولار (تعادل)، بینایی و حس عمقی در قشر مغز.',
      },
    ],
  },
  {
    topicId: 'deathbed-visions',
    title: '۴. مشاهدات و رؤیاهای بستر مرگ (Deathbed Visions - ELDVs)',
    category: 'مراقبت‌های تسکینی و طب تسکین',
    image: '/images/research/deathbed_visions_palliative_1787053336482.jpg',
    description: 'مطالعات بالینی آینده‌نگر در بخش‌های هاسپیس و بررسی تجارب آرامش‌بخش ساعات و روزهای پایانی زندگی.',
    articles: [
      {
        title: 'End-of-life dreams and visions: A longitudinal study of hospice patients’ experiences',
        authors: 'Christopher W. Kerr, Kimberly D. Donnelly, Pei C. Wright, et al.',
        year: 2014,
        journal: 'Journal of Palliative Medicine, 17(3), 296-303',
        doi: '10.1089/jpm.2013.0371',
        pmid: '24517377',
        summaryFa:
          'مطالعه طولی برجسته مرکز مراقبت‌های تسکینی بوفالو روی ۶۶ بیمار رو به احتضار؛ این پژوهش نشان داد ۸۸٪ بیماران حداقل یک بار رؤیاها و مشاهدات بسیار شفاف، تسلی‌بخش و تسکین‌دهنده از حضور دوستان و خویشاوندان درگذشته را تجربه کرده‌اند که کاملاً از هذیان پزشکی متمایز است.',
      },
      {
        title: 'End-of-life dreams and visions: A systematic review of palliative care patients’ experiences',
        authors: 'Pei C. Wright, Christopher W. Kerr, et al.',
        year: 2020,
        journal: 'Annals of Palliative Medicine, 9(4), 2133-2144',
        doi: '10.21037/apm-19-482',
        pmid: '32787361',
        summaryFa:
          'مرور سیستماتیک مداخلات و اثرات روانی مشاهدات بستر مرگ در کاهش اضطراب وجودی بیماران و تسهیل فرآیند سوگواری سالم برای خانواده‌ها و مراقبان در مراکز درمانی بین‌المللی.',
      },
    ],
  },
  {
    topicId: 'mystical-unity',
    title: '۵. تجارب عرفانی و وحدت آگاهی (Mystical Consciousness)',
    category: 'روان‌شناسی آگاهی و تجارب استثنایی',
    image: '/images/research/mystical_experience_unity_1787053353949.jpg',
    description: 'اندازه‌گیری کمی ادراکات وحدت وجود، بی‌زمانی و انحلال مرزهای خود در روان‌شناسی علمی.',
    articles: [
      {
        title: 'The Mystical Scale: Construction and reliability',
        authors: 'Ralph W. Hood Jr.',
        year: 1975,
        journal: 'Journal for the Scientific Study of Religion, 14(1), 29-41',
        doi: '10.2307/1384454',
        summaryFa:
          'تدوین و اعتبارسنجی مقیاس استاندارد M-Scale در روان‌شناسی که ویژگی‌های جهان‌شمول تجارب عرفانی شامل احساس یگانگی، فرارفتن از زمان و مکان، حس قدسیت، معرفت شهودی و عدم گنجایش در قالب الفاظ را اندازه‌گیری می‌کند.',
      },
      {
        title: 'Psilocybin can occasion mystical-type experiences having substantial and sustained personal meaning and spiritual significance',
        authors: 'Roland R. Griffiths, William A. Richards, Una McCann, Robert Jesse',
        year: 2006,
        journal: 'Psychopharmacology, 187(3), 268-283',
        doi: '10.1007/s00213-006-0457-5',
        pmid: '16826400',
        summaryFa:
          'مطالعه دوسوکور و کنترل‌شده دانشگاه جانز هاپکینز که نشان داد القای تجارب عرفانی حاد می‌تواند تغییرات پایدار و مثبت بلندمدت در نگرش فرد، احساس همدلی و کاهش ترس از مرگ در طول چندین ماه و سال ایجاد کند.',
      },
    ],
  },
  {
    topicId: 'aftereffects-transformation',
    title: '۶. پیامدهای روانی و دگرگونی نگرش به مرگ (Aftereffects & Transformation)',
    category: 'روان‌شناسی تحول و اثرات طولی',
    image: '/images/research/transformation_aftereffects_1787053371173.jpg',
    description: 'بررسی علمی تغییر در سیستم ارزش‌ها، رشد نوع‌دوستی و از بین رفتن هراس از مرگ پس از تجارب مرزی.',
    articles: [
      {
        title: 'Near-death experiences and subsequent spiritual and psychological changes: A retrospective study',
        authors: 'Bruce Greyson',
        year: 2006,
        journal: 'Journal of Near-Death Studies, 25(2), 75-88',
        doi: '10.17514/JNDS-2006-25-2-p75-88',
        summaryFa:
          'پژوهش مقایسه‌ای بلندمدت دکتر گریسون در دانشگاه ویرجینیا بر روی نجات‌یافتگان از بحران‌های حیات. نتایج نشان داد افرادی که NDE را تجربه کرده‌اند در مقایسه با افرادی که بدون NDE از همان بحران نجات یافته‌اند، به طور معناداری دچار افزایش حس نوع‌دوستی، کاهش دلبستگی مادی و از بین رفتن ترس از مرگ می‌شوند.',
      },
      {
        title: 'Changes in religious and spiritual beliefs after near-death experiences',
        authors: 'Penny Sartori, Paul Badham, Peter Fenwick',
        year: 2006,
        journal: 'Journal of Near-Death Studies, 24(4), 223-242',
        doi: '10.17514/JNDS-2006-24-4-p223-242',
        summaryFa:
          'بررسی طولی ۵ ساله در بیمارستان‌های ولز درباره پیامدهای تجارب مرزی؛ نشان‌دهنده دگرگونی عمیق در جهان‌بینی راویان، گسترش نگاه اخلاقی فراجناحی و تقویت سلامت روانی پایدار.',
      },
    ],
  },
]
