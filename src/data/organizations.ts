export interface OrganizationFounder {
  name: string
  nameFa: string
  roleFa: string
  bioFa: string
  image: string
}

export interface Organization {
  id: string
  slug: string
  name: string
  nameFa: string
  acronym?: string
  country: string
  countryFa: string
  countryFlag: string
  foundedYear: number
  websiteUrl: string
  category: 'association' | 'academic_research' | 'archive_database' | 'foundation'
  categoryFa: string
  summaryFa: string
  descriptionFa: string
  keyActivities: string[]
  keyPublications?: string[]
  founders: OrganizationFounder[]
  isFeatured?: boolean
}

export const ORGANIZATIONS: Organization[] = [
  {
    id: 'iands-usa',
    slug: 'iands-usa',
    name: 'International Association for Near-Death Studies (IANDS)',
    nameFa: 'انجمن بین‌المللی مطالعات نزدیک به مرگ',
    acronym: 'IANDS',
    country: 'United States',
    countryFa: 'ایالات متحده آمریکا',
    countryFlag: '🇺🇸',
    foundedYear: 1981,
    websiteUrl: 'https://iands.org',
    category: 'association',
    categoryFa: 'انجمن علمی و شبکه بین‌المللی',
    summaryFa: 'قدیمی‌ترین و بزرگ‌ترین نهاد علمی-پژوهشی غیرانتفاعی جهان برای کاوش، مستندسازی و تبادل اطلاعات داوری‌شده درباره تجارب نزدیک به مرگ.',
    descriptionFa:
      'انجمن بین‌المللی مطالعات نزدیک به مرگ (IANDS) در سال ۱۹۸۱ توسط جمعی از پیشگامان پزشکی و روانشناسی دانشگاهی از جمله دکتر ریموند مودی، دکتر بروس گریسون، دکتر کنث رینگ و دکتر مایکل سبوم پایه‌گذاری شد. این نهاد با انتشار فصلنامه علمی معتبر «Journal of Near-Death Studies»، برگزاری همایش‌های بین‌المللی سالانه و ایجاد گروه‌های پشتیبانی محلی در سراسر جهان، مرجع اصلی پژوهشگران و پزشکان در سراسر جهان محسوب می‌شود.',
    keyActivities: [
      'انتشار فصلنامه تخصصی و داوری‌شده Journal of Near-Death Studies (JNDS)',
      'برگزاری کنفرانس‌های علمی سالانه با حضور دانشمندان علوم اعصاب، پزشکان و راویان',
      'مدیریت شبکه گروه‌های پشتیبانی و همیاری برای ادغام روانی تجارب راویان در بیش از ۵۰ کشور',
      'تدوین راهنماهای بالینی برای پرستاران و پزشکان بخش مراقبت‌های ویژه در مواجهه با تجارب بیماران',
    ],
    keyPublications: [
      'Journal of Near-Death Studies (از ۱۹۸۱ تاکنون)',
      'The Handbook of Near-Death Experiences: Thirty Years of Investigation (2009)',
    ],
    founders: [
      {
        name: 'Dr. Raymond Moody, MD, PhD',
        nameFa: 'دکتر ریموند مودی',
        roleFa: 'روان‌پزشک، فیلسوف و پایه‌گذار اصطلاح Near-Death Experience (NDE)',
        bioFa:
          'دکتر ریموند مودی با انتشار کتاب جریان‌ساز و پرفروش «زندگی پس از زندگی» (Life After Life) در سال ۱۹۷۵ برای نخستین بار پدیده تجربه نزدیک به مرگ را به عرصه مطالعات مدرن پزشکی و فلسفی جهان وارد کرد و زمینه تأسیس انجمن بین‌المللی IANDS را فراهم آورد.',
        image: '/images/founders/dr-raymond-moody.jpg',
      },
    ],
    isFeatured: true,
  },
  {
    id: 'netzwerk-nde-germany',
    slug: 'netzwerk-nde-germany',
    name: 'Netzwerk Nahtoderfahrung e.V.',
    nameFa: 'شبکه و انجمن تحقیقات تجارب نزدیک به مرگ آلمان',
    acronym: 'Netzwerk NDE',
    country: 'Germany',
    countryFa: 'آلمان',
    countryFlag: '🇩🇪',
    foundedYear: 2002,
    websiteUrl: 'https://netzwerk-nahtoderfahrung.de',
    category: 'association',
    categoryFa: 'انجمن علمی و پژوهشی',
    summaryFa: 'اصلی‌ترین مرجع آلمانی‌زبان برای پژوهش‌های بین‌رشته‌ای پزشکی، روانشناختی و فلسفی پیرامون تجارب مرزی آگاهی و پدیده‌های نزدیک به مرگ.',
    descriptionFa:
      'انجمن «Netzwerk Nahtoderfahrung e.V.» یک نهاد پژوهشی و غیرانتفاعی در آلمان است که توسط تیمی از پزشکان، محققان و نویسندگان برجسته از جمله پروفسور دکتر والتر ون لاک و دکتر الویس سرووشوک تأسیس شده است. این مرکز به ترویج پژوهش‌های روش‌مند در جهان آلمانی‌زبان (آلمان، اتریش و سوئیس)، آموزش کادر درمان بیمارستانی و کمک به راویان برای تبیین تجارب خود بدون برچسب‌های آسیب‌شناختی اختصاص دارد.',
    keyActivities: [
      'سازمان‌دهی سمینارها و همایش‌های علمی سالانه در شهرهای فرانکفورت، ویسلوخ و آخن',
      'انتشار کتاب‌ها، مقالات و بروشورهای راهنمای تخصصی به زبان آلمانی برای جامعه پزشکی و عموم',
      'ارائه مشاوره‌های تخصصی و کارگاه‌های هم‌اندیشی برای افراد دارای تجارب دگرگون‌کننده آگاهی',
      'همکاری با دانشگاه‌های علوم پزشکی آلمان در بررسی شواهد بالینی ایست قلبی و هوشیاری',
    ],
    keyPublications: [
      'Wer stirbt, ist nicht tot! (Walter van Laack)',
      'Nahtod-Erfahrungen: Eine physikalisch-medizinische Gesamtschau',
    ],
    founders: [
      {
        name: 'Prof. Dr. med. Walter van Laack',
        nameFa: 'پروفسور والتر ون لاک',
        roleFa: 'پزشک متخصص، استاد دانشگاه آخن و از بانیان اصلی شبکه تحقیقات تجارب آلمان',
        bioFa:
          'پروفسور والتر ون لاک، پزشک جراح ارتوپدی و استاد بازنشسته دانشگاه آخن آلمان است که دهه‌ها به پژوهش‌های بنیادین درباره ماهیت فیزیکی، پزشکی و فلسفی آگاهی و پدیده‌های نزدیک به مرگ پرداخته و چندین اثر مرجع دانشگاهی در این حوزه تألیف کرده است.',
        image: '/images/founders/prof-walter-van-laack.jpg',
      },
    ],
    isFeatured: true,
  },
  {
    id: 'nderf-usa',
    slug: 'nderf-usa',
    name: 'Near Death Experience Research Foundation (NDERF)',
    nameFa: 'بنیاد تحقیقات تجربه نزدیک به مرگ',
    acronym: 'NDERF',
    country: 'United States',
    countryFa: 'ایالات متحده آمریکا / بین‌المللی',
    countryFlag: '🌐',
    foundedYear: 1998,
    websiteUrl: 'https://nderf.org',
    category: 'archive_database',
    categoryFa: 'بزرگ‌ترین پایگاه داده و آرشیو جهانی NDE',
    summaryFa: 'بزرگ‌ترین آرشیو داده‌های ساختاریافته تجارب نزدیک به مرگ در جهان به بیش از ۳۰ زبان زنده با بیش از ۵۰۰۰ گزارش تفصیلی موردکاوی.',
    descriptionFa:
      'بنیاد NDERF در سال ۱۹۹۸ توسط دکتر جفری لانگ (متخصص انکولوژی پرتو‌درمانی) و همسرش جودی لانگ تأسیس شد. این بنیاد با به‌کارگیری یک پرسشنامه اعتبارسنجی‌شده ۶۵ سوالی، جامع‌ترین پایگاه داده آنلاین تجارب را در مقیاس چندزبانه گردآوری کرده است. دکتر لانگ با اتکا به تحلیل‌های آماری این جامعه آماری گسترده، مقالات پژوهشی متعددی درباره الگوهای جهان‌شمول NDE منتشر کرده است.',
    keyActivities: [
      'گردآوری و انتشار آنلاین بزرگ‌ترین جامعه آماری باز از تجارب نزدیک به مرگ به زبان‌های مختلف از جمله فارسی',
      'تحلیل آماری سیستماتیک بر روی متغیرهایی نظیر دیدن در نابینایی مادرزادی، تجارب کودکان و هماهنگی الگوها در فرهنگ‌های مختلف',
      'ارائه دسترسی آزاد به پژوهشگران دانشگاهی برای کاوش در داده‌های روایی و متغیرهای پرسشنامه‌ای',
    ],
    keyPublications: [
      'Evidence of the Afterlife: The Science of Near-Death Experiences (2010)',
      'God and the Afterlife: The Groundbreaking New Evidence for God and Near-Death Experience (2016)',
    ],
    founders: [
      {
        name: 'Dr. Jeffrey Long, MD',
        nameFa: 'دکتر جفری لانگ',
        roleFa: 'متخصص انکولوژی پرتو‌درمانی و بنیانگذار بنیاد NDERF',
        bioFa:
          'دکتر جفری لانگ پزشک و محقق برجسته آمریکایی است که بیش از ۲۵ سال گذشته را وقف گردآوری و تحلیل آماری هزاران گزارش NDE از فرهنگ‌ها و قاره‌های گوناگون کرده و از سرشناس‌ترین مراجع داده‌محور در این حوزه است.',
        image: '/images/founders/dr-jeffrey-long.jpg',
      },
    ],
    isFeatured: true,
  },
  {
    id: 'horizon-research-foundation',
    slug: 'horizon-research-foundation',
    name: 'Horizon Research Foundation / Resuscitation Consciousness',
    nameFa: 'بنیاد پژوهشی افق و مطالعات آگاهی احیا',
    acronym: 'HRF',
    country: 'United Kingdom',
    countryFa: 'بریتانیا / بین‌المللی',
    countryFlag: '🇬🇧',
    foundedYear: 1998,
    websiteUrl: 'https://horizonresearch.org',
    category: 'academic_research',
    categoryFa: 'پژوهش‌های بالینی و مراقبت‌های ویژه',
    summaryFa: 'نهاد حامی بزرگ‌ترین مطالعات کارآزمایی بالینی آینده‌نگر بیمارستانی در زمینه هوشیاری در حین ایست قلبی (پروژه‌های AWARE I & II).',
    descriptionFa:
      'بنیاد تحقیقات افق توسط دکتر سام پرنیا و دکتر پیتر فنویک به منظور بررسی علمی و بالینی وضعیت ذهن، مغز و هوشیاری در لحظات مرگ بالینی تأسیس شد. این بنیاد مجری مطالعات آینده‌نگر چندمرکزی در بیمارستان‌های بریتانیا، اروپا و ایالات متحده است که با بهره‌گیری از تجهیزات پایش اکسیژن‌رسانی مغزی (NIRS) و نشانگرهای بصری پنهان، شواهد عینی ادراکات فراحسی حین احیا را می‌سنجد.',
    keyActivities: [
      'طراحی و اجرای کارآزمایی‌های چندمرکزی AWARE I (۲۰۰۸–۲۰۱۴) و AWARE II (۲۰۱۵–۲۰۲۳)',
      'پایش فعالیت‌های الکتریکی مغز و امواج گاما در دقایق اولیه پس از توقف ضربان قلب',
      'تدوین استانداردهای بازبینی هوشیاری و عملکرد نورولوژیک در دستورالعمل‌های رسمی احیای قلبی ریوی (CPR)',
    ],
    keyPublications: [
      'AWARE Study: Resuscitation Journal (2014)',
      'AWARE II Study: Resuscitation Journal & NYU Langone (2023)',
      'What Happens When We Die (Dr. Sam Parnia)',
    ],
    founders: [
      {
        name: 'Dr. Sam Parnia, MD, PhD',
        nameFa: 'دکتر سام پرنیا',
        roleFa: 'استاد مراقبت‌های ویژه دانشگاه نیویورک و سرپرست مطالعات بین‌المللی AWARE',
        bioFa:
          'دکتر سام پرنیا، پزشک فوق تخصص مراقبت‌های ویژه و مدیر بخش پژوهش‌های احیا در مرکز پزشکی لانگون دانشگاه نیویورک (NYU Langone)، یکی از تأثیرگذارترین دانشمندان جهان در ثبت علمی هوشیاری در هنگام مرگ بالینی است.',
        image: '/images/founders/dr-sam-parnia.jpg',
      },
    ],
    isFeatured: true,
  },
  {
    id: 'dops-virginia',
    slug: 'dops-virginia',
    name: 'Division of Perceptual Studies (DOPS) - University of Virginia',
    nameFa: 'بخش مطالعات ادراکی دانشکده پزشکی دانشگاه ویرجینیا',
    acronym: 'UVA DOPS',
    country: 'United States',
    countryFa: 'ایالات متحده آمریکا',
    countryFlag: '🇺🇸',
    foundedYear: 1967,
    websiteUrl: 'https://med.virginia.edu/perceptual-studies/',
    category: 'academic_research',
    categoryFa: 'دپارتمان دانشگاهی و پژوهش‌های پایه',
    summaryFa: 'یکی از معتبرترین دپارتمان‌های رسمی دانشگاهی در آمریکا که بیش از نیم قرن به مطالعه علمی رابطه ذهن و مغز و NDE پرداخته است.',
    descriptionFa:
      'بخش مطالعات ادراکی در دپارتمان علوم رفتاری و روانپزشکی دانشکده پزشکی دانشگاه ویرجینیا، توسط دکتر ایان استیونسون پایه‌گذاری شد و با هدایت علمی دکتر بروس گریسون به قطب اصلی تولید مقالات داوری‌شده دانشگاهی درباره مقیاس NDE، تغییرات روانشناختی پس از تجربه، و ادراکات بستر مرگ تبدیل شده است.',
    keyActivities: [
      'ابداع و استانداردسازی مقیاس جهانی گریسون (Greyson NDE Scale) که استاندارد طلایی پژوهش‌های بین‌المللی است',
      'انجام پژوهش‌های تصویربرداری مغزی fMRI و EEG از افراد با تجارب استثنایی آگاهی',
      'ثبت و بررسی طولی بیش از هزاران پرونده مستند با شواهد پزشکی و گزارش‌های راستی‌آزمایی‌شده',
    ],
    keyPublications: [
      'The Greyson NDE Scale: Journal of Nervous and Mental Disease (1983)',
      'After: A Doctor Explores What Near-Death Experiences Reveal (Dr. Bruce Greyson, 2021)',
    ],
    founders: [
      {
        name: 'Dr. Bruce Greyson, MD',
        nameFa: 'دکتر بروس گریسون',
        roleFa: 'استاد بازنشسته روان‌پزشکی دانشگاه ویرجینیا و طراح مقیاس استاندارد NDE Scale',
        bioFa:
          'دکتر بروس گریسون به عنوان «پدر پژوهش‌های تجربی NDE» شناخته می‌شود. مقیاس ۱۶ گزینه‌ای او از سال ۱۹۸۳ تاکنون به ده‌ها زبان ترجمه شده و اساس تمام مقالات داوری‌شده در روانپزشکی و علوم اعصاب است.',
        image: '/images/founders/dr-raymond-moody.jpg',
      },
    ],
    isFeatured: true,
  },
  {
    id: 'coma-science-group',
    slug: 'coma-science-group',
    name: 'Coma Science Group & GIGA Consciousness - University of Liège',
    nameFa: 'گروه علوم کما و مرکز تحقیقات آگاهی دانشگاه لیژ',
    acronym: 'GIGA Consciousness',
    country: 'Belgium',
    countryFa: 'بلژیک',
    countryFlag: '🇧🇪',
    foundedYear: 2007,
    websiteUrl: 'https://www.gigaconsciousness.uliege.be',
    category: 'academic_research',
    categoryFa: 'مرکز علوم اعصاب و تصویربرداری مغزی',
    summaryFa: 'پیشرفته‌ترین مرکز علوم اعصاب اروپا در زمینه تصویربرداری عصبی، کما و پدیدارشناسی تجارب نزدیک به مرگ.',
    descriptionFa:
      'این مرکز دانشگاهی در بیمارستان دانشگاهی لیژ بلژیک تحت هدایت پروفسور دکتر استیون لوریس و دکتر شارلوت مارشال، از پیشرفته‌ترین ابزارهای نقشه‌برداری مغز، fMRI عملکردی و پت‌اسکن (PET) برای تحلیل ویژگی‌های شناختی و نورونی افرادی که تجارب نزدیک به مرگ داشته‌اند استفاده می‌کند.',
    keyActivities: [
      'تصویربرداری پیشرفته از شبکه‌های پیش‌فرض مغزی (Default Mode Network) در تجربه نزدیک به مرگ',
      'مقایسه خاطرات NDE با خاطرات واقعی و خیالی از طریق پرسشنامه‌های روان‌سنجی حافظه رویدادی',
      'بررسی شباهت‌ها و تفاوت‌های حالت‌های ناشی از کما، تجارب خروج از بدن (OBE) و مدیتیشن‌های عمیق',
    ],
    keyPublications: [
      'Neurocognitive phenomenology of near-death experiences (Neuroscience & Biobehavioral Reviews)',
      'The Noetic Experience: Frontiers in Human Neuroscience',
    ],
    founders: [
      {
        name: 'Prof. Dr. Steven Laureys, MD, PhD',
        nameFa: 'پروفسور استیون لوریس',
        roleFa: 'متخصص برجسته مغز و اعصاب و مدیر پیشین مرکز تحقیقات علوم کما در دانشگاه لیژ',
        bioFa:
          'پروفسور استیون لوریس از سرشناس‌ترین عصب‌شناسان جهان در مطالعه بیماران در حالت نباتی و کما است که جوایز متعدد بین‌المللی از جمله جایزه مکس پلانک و بنیاد فرانکی را کسب کرده است.',
        image: '/images/founders/dr-sam-parnia.jpg',
      },
    ],
    isFeatured: false,
  },
  {
    id: 'inrees-france',
    slug: 'inrees-france',
    name: 'INREES & IANDS France',
    nameFa: 'مؤسسه تحقیقات تجارب استثنایی و انجمن مطالعات فرانسه',
    acronym: 'INREES',
    country: 'France',
    countryFa: 'فرانسه',
    countryFlag: '🇫🇷',
    foundedYear: 2007,
    websiteUrl: 'https://www.inrees.com',
    category: 'association',
    categoryFa: 'انجمن علمی و پژوهشی فرانسه‌زبان',
    summaryFa: 'مرکز پیشگام در جهان فرانسه‌زبان برای ایجاد گفت‌وگوی بین‌رشته‌ای میان پزشکان، روان‌شناسان و عموم مردم پیرامون آگاهی نامتعارف.',
    descriptionFa:
      'مؤسسه INREES (Institut de Recherche sur les Expériences Extraordinaires) در پاریس با هدف رویکردی علمی، باز و عاری از تعصب به تجارب دگرگون‌ساز آگاهی از جمله تجارب نزدیک به مرگ بنا شده است. این نهاد با همکاری متخصصان برجسته بیهوشی فرانسه مانند دکتر ژان ژاک شاربونیه و دکتر ژان پیر پوستل، همایش‌های متعددی در دانشگاه‌ها و سالن‌های علمی پاریس برگزار کرده است.',
    keyActivities: [
      'انتشار مجله پژوهشی Inexploré و پادکست‌های علمی-فرهنگی درباره مطالعات آگاهی',
      'برگزاری کنفرانس‌های بزرگ با حضور بیش از ۲۰۰۰ پزشک و متخصص در سالن‌های کنگره پاریس',
      'حمایت از پایان‌نامه‌های دکتری و پژوهش‌های روانشناسی بالینی در حوزه مراقبت‌های تسکینی',
    ],
    keyPublications: [
      'La mort n’est pas la fin (Stéphane Allix)',
      'Les preuves scientifiques d’une vie après la vie (Dr. Jean-Jacques Charbonier)',
    ],
    founders: [
      {
        name: 'Stéphane Allix',
        nameFa: 'استفان الیکس',
        roleFa: 'روزنامه‌نگار تحقیقی، نویسنده و بنیانگذار مؤسسه فرانسوی INREES',
        bioFa:
          'استفان الیکس پس از سال‌ها گزارشگری جنگی و تحقیقی، مؤسسه INREES را برای ایجاد پلی آکادمیک و موثق میان جهان پژوهش‌های پزشکی و تجارب انسانی تأسیس نمود.',
        image: '/images/founders/prof-walter-van-laack.jpg',
      },
    ],
    isFeatured: false,
  },
  {
    id: 'swiss-iands',
    slug: 'swiss-iands',
    name: 'Swiss IANDS (Association Suisse pour l’Étude des Expériences de Mort Imminente)',
    nameFa: 'انجمن مطالعات تجارب نزدیک به مرگ سوئیس',
    acronym: 'Swiss IANDS',
    country: 'Switzerland',
    countryFa: 'سوئیس',
    countryFlag: '🇨🇭',
    foundedYear: 1993,
    websiteUrl: 'https://iands.ch',
    category: 'association',
    categoryFa: 'انجمن مستقل پژوهشی و حمایتی',
    summaryFa: 'شاخه رسمی پژوهش‌های NDE در کنفدراسیون سوئیس به زبان‌های فرانسوی و آلمانی.',
    descriptionFa:
      'انجمن سوئیسی IANDS با هدف ایجاد بستری چندزبانه و استاندارد برای ثبت روایات، آموزش کادر درمانی بیمارستان‌های ژنو، زوریخ و لوزان و ارائه مشاوره‌های تخصصی بالینی در کشور سوئیس فعالیت دارد.',
    keyActivities: [
      'سازمان‌دهی نشست‌های هم‌اندیشی ماهانه و کارگاه‌های آموزشی برای روان‌درمانگران سوئیسی',
      'ترجمه و نشر مقالات مرجع بین‌المللی به زبان‌های فرانسوی و آلمانی',
      'همکاری با بیمارستان‌های مراقبت تسکینی در کانتون‌های مختلف سوئیس',
    ],
    founders: [
      {
        name: 'Dr. med. Reto Eberhard Rast',
        nameFa: 'دکتر رتو ابرهارد راست',
        roleFa: 'پزشک عمومی و پژوهشگر ارشد تجارب مرزی در سوئیس',
        bioFa:
          'دکتر رتو ابرهارد راست از پزشکان پیشرو در سوئیس است که کارگاه‌های متعددی برای آموزش کادر سلامت در مواجهه بدون پیش‌داوری با تجارب بیماران برگزار نموده است.',
        image: '/images/founders/dr-raymond-moody.jpg',
      },
    ],
    isFeatured: false,
  },
  {
    id: 'bics-usa',
    slug: 'bics-usa',
    name: 'Bigelow Institute for Consciousness Studies (BICS)',
    nameFa: 'مؤسسه مطالعات آگاهی بیگلو',
    acronym: 'BICS',
    country: 'United States',
    countryFa: 'ایالات متحده آمریکا',
    countryFlag: '🇺🇸',
    foundedYear: 2020,
    websiteUrl: 'https://www.bigelowinstitute.org',
    category: 'foundation',
    categoryFa: 'بنیاد گرنت‌های تحقیقاتی آگاهی',
    summaryFa: 'بزرگ‌ترین نهاد حامی مالی و گرنت‌های پژوهشی جهان برای اثبات علمی بقای آگاهی و تجارب مرزی.',
    descriptionFa:
      'مؤسسه مطالعات آگاهی بیگلو (BICS) توسط رابرت بیگلو کارآفرین و حامی پروژه‌های پیشرفته فضایی تأسیس شد. در سال ۲۰۲۱، این مؤسسه با اختصاص جایزه ۱.۸ میلیون دلاری برای برترین مقالات علمی مستندکننده بقای آگاهی، توجه محافل بزرگ علوم اعصاب و پزشکی جهان را به پدیده تجارب نزدیک به مرگ و ادراکات پس از احیا جلب کرد.',
    keyActivities: [
      'اعطای گرنت‌های پژوهشی بزرگ به دانشگاه‌ها و دانشمندان حوزه هوشیاری و تجارب پس از ایست قلبی',
      'انتشار برترین مقالات داوری‌شده در قالب مجلدات مرجع چاپی و دیجیتال',
      'ایجاد پل ارتباطی میان فیزیک کوانتومی، علوم اعصاب و مطالعات فراشخصی',
    ],
    founders: [
      {
        name: 'Robert Bigelow',
        nameFa: 'رابرت بیگلو',
        roleFa: 'کارآفرین، بنیانگذار مؤسسه BICS و حامی مالی پروژه‌های علمی آگاهی',
        bioFa:
          'رابرت بیگلو با اختصاص بودجه‌های تحقیقاتی میلیون دلاری، امکان همکاری برجسته‌ترین دانشمندان جهان (نظیر دکتر جفری لانگ، دکتر پیم ون لومل و دکتر پیتر فنویک) را در قالب گزارش‌های جامع فراهم کرد.',
        image: '/images/founders/dr-jeffrey-long.jpg',
      },
    ],
    isFeatured: false,
  },
]

export function getAllOrganizations(): Organization[] {
  return ORGANIZATIONS
}

export function getFeaturedOrganizations(): Organization[] {
  return ORGANIZATIONS.filter((org) => org.isFeatured)
}

export function getOrganizationBySlug(slug: string): Organization | undefined {
  return ORGANIZATIONS.find((org) => org.slug === slug)
}
