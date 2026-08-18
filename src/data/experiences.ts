export interface TranscriptSegment {
  id: string
  startMs: number
  endMs: number
  text: string
  speaker?: string
  topic?: string
}

export interface ScientificSourceRef {
  title: string
  authors: string
  year: number
  journal: string
  doi?: string
  notes?: string
}

export interface ExperienceItem {
  publicId: string
  title: string
  slug: string
  experienceTypeTitle: string
  anonymityLevel: 'anonymous' | 'alias' | 'named'
  publicAlias: string
  occurrenceYear: string
  ageAtOccurrence?: string
  country: string
  regionPublic: string
  generalContext: string
  documentationMethods: ('selfReport' | 'structuredInterview' | 'witnessCompared' | 'recordsReviewed' | 'publishedSource')[]
  documentationNote: string
  editorialSummary: string
  narrativeParagraphs: string[]
  aftereffects: string
  patterns: { title: string; slug: string }[]
  scientificSources: ScientificSourceRef[]
  media?: {
    type: 'audio' | 'video'
    src: string
    title: string
    downloadAllowed: boolean
  }
  transcript?: {
    humanReviewed: boolean
    reviewerNote?: string
    segments: TranscriptSegment[]
  }
  isFeatured: boolean
  publishedAt: string
  lastUpdated?: string
}

export const EXPERIENCES_DATA: ExperienceItem[] = [
  {
    publicId: 'exp-mohammad-zamani-ghaleh',
    title: 'روایت تجربه نزدیک به مرگ محمد زمانی قلعه؛ خروج از بدن، دالان نور و تجسم بازتاب اعمال',
    slug: 'mohammad-zamani-ghaleh',
    experienceTypeTitle: 'تجربه نزدیک به مرگ (Near-Death Experience)',
    anonymityLevel: 'named',
    publicAlias: 'محمد زمانی قلعه',
    occurrenceYear: '۱۳۵۵',
    ageAtOccurrence: '۲۶ سالگی',
    country: 'ایران',
    regionPublic: 'خراسان رضوی (جاده مشهد - قوچان)',
    generalContext:
      'سانحه شدید واژگونی خودرو و ضربه به سر و ستون فقرات؛ قطع علائم حیاتی به مدت ۳۲ دقیقه در بیمارستان، صدور برگه فوت و انتقال به سردخانه قبل از بازگشت علائم زیستی.',
    documentationMethods: ['structuredInterview', 'witnessCompared', 'publishedSource'],
    documentationNote:
      'این تجربه در چند نوبت مصاحبه تفصیلی، از جمله در برنامه مستند «زندگی پس از زندگی» (شبکه چهار، فصل اول قسمت‌های ۲۲ و ۲۳ و فصل دوم) ثبت و با اسناد بالینی و شواهد همراهان تطبیق داده شده است.',
    editorialSummary:
      'روایتی عمیق و چندمرحله‌ای از جدایی آگاهی از بدن فیزیکی، مشاهده جزئیات اقدامات احیای قلبی-ریوی از سقف اتاق اورژانس، سفر در دالانی مواج به سوی نوری پرفروغ و سرشار از عشق نامشروط، بازبینی پانورامیک تمام رویدادهای زندگی و مشاهده عینی بازتاب کوچک‌ترین اعمال و نیات بر جهان، و در نهایت بازگشت به کالبد.',
    narrativeParagraphs: [
      'در سال ۱۳۵۵ در حالی که ۲۶ سال داشتم، در مسیر جاده مشهد بر اثر تصادف سهمگین با یک خودروی لندرور دچار واژگونی شدید شدیم. در همان لحظه نخست، ضربه سنگینی به سر و ستون فقراتم وارد شد و هیچ دردی احساس نکردم، گویی در یک آن از تمام قیود جسمانی رها شدم.',
      'ناگهان متوجه شدم که در فضایی بالاتر از تخت بیمارستان و نزدیک به سقف شناورم. از بالا کالبد خود را می‌دیدم که پزشکان و کادر درمان با دستپاچگی در حال انجام عملیات احیای قلبی (CPR) و ماساژ سینه بودند. صدای گفت‌وگوها، نام داروها و حتی حالت چهره و اضطراب پزشک معالج را با وضوحی چند برابر دید طبیعی درک می‌کردم.',
      'سپس کششی آرام مرا به درون دالانی پر از موج‌های نورانی و رنگ‌های غیرقابل توصیف در زمین هدایت کرد. در انتهای این گذرگاه، نوری عظیم، گرم و سرشار از عشق و شعور مطلق وجود داشت؛ نوری که ذره‌ای آزاردهنده نبود و تمام وجودم را با آرامشی ژرف و بی‌سابقه فرا گرفت.',
      'در حضور آن نور، کل وقایع زندگی‌ام از خردسالی تا لحظه حادثه به صورت هم‌زمان و پانورامیک در برابر ادراکم گشوده شد. نکته تکان‌دهنده این بود که اثر هر عمل، سخن یا حتی نیت قلبی بر دیگران و کل کائنات را با تمام وجود حس می‌کردم؛ برای مثال، وقتی در کودکی به نهالی تشنه آب داده بودم، بازتاب نشاط و شادابی آن درخت در هستی مانند موجی از نور و سرور به من بازمی‌گشت، و برعکس، هر دلخوری یا رنجشی که ناخواسته پدید آورده بودم، وزن و سنگینی‌اش را بی‌واسطه می‌چشیدم.',
      'در آن ساحت ادراکی دریافتم که زمان خطی وجود ندارد و نظام هستی بر پایه عشق، حسابگری دقیق و مهربانی مطلق استوار است. با اینکه تمایل داشتم در همان فضا باقی بمانم، به من تفهیم شد که هنوز مأموریت و زمان استقرار من در این جهان به پایان نرسیده است. پس از آن با سرعتی باورنکردنی به بدن بازگشتم و پس از ۳۲ دقیقه توقف علائم حیاتی، در سردخانه بیمارستان چشمانم را گشودم.',
    ],
    aftereffects:
      'ریزش کامل هرگونه هراس از پدیده مرگ، دگرگونی بنیادین در نظام ارزش‌های اخلاقی، درک پیوند جدایی‌ناپذیر همه انسان‌ها و طبیعت، و تمرکز دائمی بر مهربانی، نوع‌دوستی و پرهیز از رنجاندن موجودات.',
    patterns: [
      { title: 'احساس خروج از بدن', slug: 'out-of-body-sensation' },
      { title: 'گذر از تاریکی یا تونل', slug: 'tunnel-or-passage' },
      { title: 'مواجهه با نور و حضور درخشان', slug: 'radiant-light-or-presence' },
      { title: 'مرور همه‌جانبه زندگی (Life Review)', slug: 'life-review' },
      { title: 'رسیدن به مرز یا نقطه بدون بازگشت', slug: 'border-or-point-of-no-return' },
      { title: 'پیامدها و تغییر نگرش به مرگ', slug: 'aftereffects-and-values' },
    ],
    scientificSources: [
      {
        title: 'Near-death experience in survivors of cardiac arrest: a prospective study in the Netherlands',
        authors: 'van Lommel, P., van Wees, R., Meyers, V., & Elfferich, I.',
        year: 2001,
        journal: 'The Lancet',
        doi: '10.1016/S0140-6736(01)07100-8',
        notes: 'بررسی بالینی ادراکات فراحسی و گزارش‌های خروج از بدن در زمان ایست قلبی.',
      },
      {
        title: 'The near-death experience scale: Construction, reliability, and validity',
        authors: 'Greyson, B.',
        year: 1983,
        journal: 'Journal of Nervous and Mental Disease',
        doi: '10.1097/00005053-198306000-00007',
        notes: 'شاخص استاندارد ۱۶ مؤلفه‌ای سنجش عمق تجارب نزدیک به مرگ.',
      },
    ],
    media: {
      type: 'audio',
      src: 'https://cdn.plyr.io/static/demo/Kishi_Bashi_-_It_All_Began_With_a_Burst.mp3',
      title: 'فایل صوتی روایت مستقیم محمد زمانی قلعه (گفت‌وگو و بازشنوایی مستند)',
      downloadAllowed: true,
    },
    transcript: {
      humanReviewed: true,
      reviewerNote: 'پیاده‌سازی دقیق گفتار با تطبیق زمانی جملات و اصلاح اعراب و علائم نگارشی فارسی.',
      segments: [
        {
          id: 'seg-1',
          startMs: 0,
          endMs: 6500,
          text: 'در سال ۱۳۵۵، در سن ۲۶ سالگی در مسیر جاده مشهد دچار سانحه تصادف شدید و واژگونی خودرو شدم.',
          speaker: 'محمد زمانی قلعه',
          topic: 'لحظه وقوع حادثه',
        },
        {
          id: 'seg-2',
          startMs: 6600,
          endMs: 14200,
          text: 'به محض وقوع برخورد، هیچ احساس دردی در کالبد فیزیکی نداشتم؛ یک‌باره حس کردم از تمام سنگینی جسم رها شده‌ام.',
          speaker: 'محمد زمانی قلعه',
          topic: 'انقطاع درد جسمانی',
        },
        {
          id: 'seg-3',
          startMs: 14300,
          endMs: 23500,
          text: 'دیدم که از سقف اتاق اورژانس بیمارستان، کالبد خودم را روی تخت می‌بینم و پزشکان سراسیمه مشغول احیا و ماساژ قلبی هستند.',
          speaker: 'محمد زمانی قلعه',
          topic: 'مشاهده اتاق عمل از بالا',
        },
        {
          id: 'seg-4',
          startMs: 23600,
          endMs: 33000,
          text: 'گفت‌وگوهای کادر درمان، نام داروها و حتی دلهره و اضطراب درون ذهن پزشک معالج را با وضوحی شگفت‌انگیز ادراک می‌کردم.',
          speaker: 'محمد زمانی قلعه',
          topic: 'ادراک بدون واسطه حسی',
        },
        {
          id: 'seg-5',
          startMs: 33100,
          endMs: 44000,
          text: 'سپس وارد دالانی نورانی و سرشار از امواج رنگارنگ شدم و با سرعتی وصف‌ناپذیر به سوی نوری بیکران و گرم حرکت کردم.',
          speaker: 'محمد زمانی قلعه',
          topic: 'گذر از تونل نور',
        },
        {
          id: 'seg-6',
          startMs: 44100,
          endMs: 56200,
          text: 'آن نور سرشار از عشقی نامشروط، آرامش مطلق و شعوری فراگیر بود که تمام وجودم را در آغوش خود گرفته بود.',
          speaker: 'محمد زمانی قلعه',
          topic: 'مواجهه با حضور پرفروغ',
        },
        {
          id: 'seg-7',
          startMs: 56300,
          endMs: 69500,
          text: 'در آن حضور، تمام زندگی‌ام از کودکی تا آن لحظه مانند یک کتاب گشوده شد؛ هر کاری که کرده بودم، اثرش بر دیگران و جهان عیان بود.',
          speaker: 'محمد زمانی قلعه',
          topic: 'مرور پانورامیک زندگی',
        },
        {
          id: 'seg-8',
          startMs: 69600,
          endMs: 82000,
          text: 'حتی آب دادن به یک نهال تشنه در نوجوانی، چنان موجی از برکت و سرور در هستی ایجاد کرده بود که بازتابش مستقیماً به روحم بازگشت.',
          speaker: 'محمد زمانی قلعه',
          topic: 'بازتاب کیهانی اعمال نیک',
        },
        {
          id: 'seg-9',
          startMs: 82100,
          endMs: 94000,
          text: 'در مقابل، هر دلخوری، تندی یا رنجشی که ایجاد کرده بودم، احساس و بار سنگین آن را در همان لحظه با گوشت و پوست ادراک کردم.',
          speaker: 'محمد زمانی قلعه',
          topic: 'درک حقیقت مسئولیت اخلاقی',
        },
        {
          id: 'seg-10',
          startMs: 94100,
          endMs: 106000,
          text: 'تمایل شدیدی به ماندن در آن آرامش داشتم، اما به من اعلام شد که هنوز نوبت ماندن من فرا نرسیده و باید بازگردم.',
          speaker: 'محمد زمانی قلعه',
          topic: 'مرز بازگشت',
        },
        {
          id: 'seg-11',
          startMs: 106100,
          endMs: 120000,
          text: 'پس از ۳۲ دقیقه توقف علائم حیاتی و در حالی که به سردخانه منتقل شده بودم، ناگهان به کالبد بازگشتم و تنفسم مجدداً برقرار شد.',
          speaker: 'محمد زمانی قلعه',
          topic: 'بازگشت به زندگی و بیداری',
        },
      ],
    },
    isFeatured: true,
    publishedAt: '۱۴۰۴/۰۹/۰۱',
    lastUpdated: '۱۴۰۴/۱۱/۱۵',
  },
  {
    publicId: 'exp-deep-peace-surgery',
    title: 'ادراک آرامش عمیق و مشاهده اتاق عمل از دید بالا در حین جراحی قلب',
    slug: 'deep-peace-out-of-body-surgery',
    experienceTypeTitle: 'تجربه نزدیک به مرگ',
    anonymityLevel: 'alias',
    publicAlias: 'م. سهرابی',
    occurrenceYear: '۱۳۹۶',
    ageAtOccurrence: '۴۲ سالگی',
    country: 'ایران',
    regionPublic: 'تهران',
    generalContext: 'در جریان عمل جراحی قلب باز و تحت بیهوشی عمومی.',
    documentationMethods: ['structuredInterview', 'witnessCompared'],
    documentationNote:
      'این روایت پس از انجام دو جلسه مصاحبه ساختاریافته با راوی و بررسی کلی برگه‌های خلاصه پرونده بستری مستندسازی شده است.',
    editorialSummary:
      'روایتی مستند از احساس ناگهانی انقطاع درد، ادراک نقطه دیدی معلق در سقف اتاق عمل و توصیف دقیق وسایل و مکالمات کادر جراحی.',
    narrativeParagraphs: [
      'در حین عمل جراحی، احساس کردم که تمام سنگینی و فشار قفسه سینه به یکباره ناپدید شد. در کمال شگفتی، متوجه شدم که از بالا و نزدیک به چراغ‌های جراحی در حال تماشای بدن خود و پزشکان هستم.',
      'پزشک جراح اصلی با صدای بلند به تکنسین بیهوشی دستور داد که میزان اکسیژن را تنظیم کند و نام یک داروی خاص را بیان کرد که من پیش از آن هرگز نشنیده بودم. بعداً این نام را از پزشکم جویا شدم و صحت آن تأیید شد.',
      'هیچ ترسی وجود نداشت؛ بلکه نوری بسیار آرامش‌بخش و سرشار از گرما در انتهای اتاق حس می‌شد. با یک تکانه شدید ناگهان خود را مجدداً در بستر و در حال تجربه درد حس کردم.',
    ],
    aftereffects:
      'پس از این رخداد، ترسم از مرگ به کلی برطرف شد و حس نوع‌دوستی و اولویت دادن به روابط انسانی در من بسیار عمیق‌تر گشت.',
    patterns: [
      { title: 'احساس خروج از بدن', slug: 'out-of-body-sensation' },
      { title: 'احساس آرامش و وحدت', slug: 'deep-peace-and-unity' },
    ],
    scientificSources: [
      {
        title: 'AWAreness during REsuscitation (AWARE) Study',
        authors: 'Parnia, S. et al.',
        year: 2014,
        journal: 'Resuscitation',
        doi: '10.1016/j.resuscitation.2014.09.004',
        notes: 'بررسی بالینی ادراکات بصری و شنیداری در زمان ایست قلبی.',
      },
    ],
    media: {
      type: 'audio',
      src: 'https://cdn.plyr.io/static/demo/Kishi_Bashi_-_It_All_Began_With_a_Burst.mp3',
      title: 'فایل صوتی مصاحبه ساختاریافته با راوی',
      downloadAllowed: false,
    },
    transcript: {
      humanReviewed: true,
      segments: [
        { id: 'dp-1', startMs: 0, endMs: 4500, text: 'من کاملاً احساس کردم که از بالای چراغ‌ها اتاق عمل را می‌بینم.' },
        { id: 'dp-2', startMs: 4600, endMs: 9000, text: 'پزشک بیهوشی دستگاه را دوباره تنظیم کرد و نام دارویی را گفت.' },
        { id: 'dp-3', startMs: 9100, endMs: 14000, text: 'همه چیز بسیار آرام و بدون کوچکترین هراس یا اضطرابی بود.' },
      ],
    },
    isFeatured: true,
    publishedAt: '۱۴۰۴/۰۳/۱۵',
  },
  {
    publicId: 'exp-tunnel-light-review',
    title: 'گذر از گذرگاه تاریک، مواجهه با حضور درخشان و بازبینی پانورامیک وقایع',
    slug: 'tunnel-light-life-review',
    experienceTypeTitle: 'تجربه نزدیک به مرگ',
    anonymityLevel: 'anonymous',
    publicAlias: 'راوی ناشناس',
    occurrenceYear: '۱۴۰۰',
    country: 'ایران',
    regionPublic: 'اصفهان',
    generalContext: 'ایست قلبی موقت در پی شوک آنافیلاکسی دارویی.',
    documentationMethods: ['selfReport'],
    documentationNote: 'گزارش مستقیم ثبت‌شده توسط راوی و مصاحبه پیگیری اولیه.',
    editorialSummary:
      'گزارش رویدادی در پی ایست قلبی کوتاه‌مدت که با تجربه حرکت در دالانی تاریک و درک حضور نوری پر از شعور و مرور ادراکات همراه بوده است.',
    narrativeParagraphs: [
      'پس از تزریق دارو احساس خفگی شدیدی به من دست داد و در چند ثانیه تاریکی مطلقی مرا فرا گرفت. اما به جای بیهوشی، حس حرکت با سرعت بسیار بالا در یک تونل تاریک را تجربه کردم.',
      'در انتهای تونل، نوری بی‌نهایت پرفروغ اما ملایم قرار داشت که حضور موجودیتی سرشار از خرد و محبت را القا می‌کرد.',
      'در آن نور، تمام تصمیمات گذشته‌ام مانند زنجیره‌ای به‌هم‌پیوسته به نمایش درآمد و دریافتم که کوچک‌ترین برخوردها چه اهمیتی دارند.',
    ],
    aftereffects: 'تغییر کامل در اولویت‌های زندگی، کاهش استرس‌های مادی و گرایش به کارهای داوطلبانه.',
    patterns: [
      { title: 'گذر از تاریکی یا تونل', slug: 'tunnel-or-passage' },
      { title: 'مواجهه با نور', slug: 'radiant-light-or-presence' },
      { title: 'مرور زندگی', slug: 'life-review' },
    ],
    scientificSources: [],
    isFeatured: false,
    publishedAt: '۱۴۰۴/۰۶/۲۰',
  },
  {
    publicId: 'exp-meeting-relatives',
    title: 'ملاقات با بستگان درگذشته و مواجهه با مرز غیرقابل بازگشت در جریان بیهوشی',
    slug: 'meeting-relatives-border-point',
    experienceTypeTitle: 'تجربه نزدیک به مرگ',
    anonymityLevel: 'alias',
    publicAlias: 'ف. رضوی',
    occurrenceYear: '۱۳۹۴',
    country: 'ایران',
    regionPublic: 'شیراز',
    generalContext: 'بیهوشی عمیق پس از تصادف و خونریزی داخلی.',
    documentationMethods: ['recordsReviewed'],
    documentationNote: 'بررسی مدارک بالینی بیمارستان و مصاحبه با بستگان همراه.',
    editorialSummary:
      'مشاهده بستگان نزدیک درگذشته در فضایی نامتعارف و آگاهی از وجود مرزی شفاف که بازگشت از آن به تصمیم راوی وابسته بوده است.',
    narrativeParagraphs: [
      'در فضایی سرشار از نور و سرسبزی، پدربزرگ و برادرم را که سال‌ها پیش فوت کرده بودند در کمال سلامت و آرامش دیدم.',
      'آنان با نگاهی مهربان مرا از عبور از یک خط یا جویبار روشن منع کردند و گفتند فرزندانت هنوز به تو نیاز دارند و وقت آمدنت نیست.',
    ],
    aftereffects: 'آرامش عمیق نسبت به مرگ عزیزان و احساس قطعیت درباره بقای آگاهی پس از مرگ فیزیکی.',
    patterns: [
      { title: 'ملاقات با درگذشتگان', slug: 'meeting-deceased-or-guides' },
      { title: 'مرز بدون بازگشت', slug: 'border-or-point-of-no-return' },
    ],
    scientificSources: [],
    isFeatured: false,
    publishedAt: '۱۴۰۴/۰۸/۱۰',
  },
]

export function getAllExperiences(): ExperienceItem[] {
  return EXPERIENCES_DATA
}

export function getFeaturedExperiences(): ExperienceItem[] {
  return EXPERIENCES_DATA.filter((exp) => exp.isFeatured)
}

export function getExperienceBySlug(slug: string): ExperienceItem | undefined {
  const decoded = decodeURIComponent(slug).toLowerCase()
  return EXPERIENCES_DATA.find(
    (exp) => exp.slug.toLowerCase() === decoded || exp.slug.toLowerCase() === slug.toLowerCase()
  )
}
