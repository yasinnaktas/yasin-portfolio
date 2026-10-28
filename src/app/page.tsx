'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion'

// ============================================
// I18N COPY
// ============================================
type Lang = 'tr' | 'en'
type CategoryKey = 'ad' | 'ai' | 'brand' | 'social' | 'doc'

// Inline tokens for the scroll-reveal statement: plain words, a video thumbnail chip or a coloured tag
type Token = string | { img: string } | { tag: string; tone: string }

const copy = {
  tr: {
    nav: { projects: 'İşler', impact: 'Etki', products: 'Ürünler', about: 'Hakkımda', experience: 'Deneyim', contact: 'İletişim' },
    hero: {
      kicker: 'Head of Creative · Creative Director',
      title1: 'Markaları izlenen',
      title2: 'hikâyelere dönüştürüyorum.',
      sub: 'Yaklaşık 5 yıldır video prodüksiyon ve medyada; sahadan ekip ve ajans yönetimine. 1000+ marka, 50M+ izlenme ve 2026’da başarılı bir exit.',
      cta1: 'İşleri izle',
      cta2: 'Benimle çalış',
      location: 'İstanbul, Türkiye',
      available: 'Yeni projelere açık',
    },
    reel: { kicker: 'Showreel', title1: 'Kameradan', title2: 'kreatif liderliğe.', watch: 'İzle', by: 'Seçili iş' },
    clients: 'Birlikte çalıştığım kurumlar',
    statement: [
      'Kameranın', 'arkasından', 'başladım;', { img: '/thumbnails/thumb4.jpg' }, 'sahada', 'çektim,', 'kurguladım,', 'yayına', 'hazırladım.',
      'Sonra', 'kendi', 'ajansımı', 'kurdum', { tag: '@creativetouch', tone: 'cobalt' }, '10', 'kişilik', 'ekibi', 'yönettim', 've', '1000+', 'markaya', 'hikâye', 'anlattım.',
      'Bugün', 'yapay', 'zekayı', { img: 'https://img.youtube.com/vi/AKoHR01gtTo/hqdefault.jpg' }, 'üretimin', 'merkezine', 'koyuyor,', 'ekipleri', 've', 'bütçeleri', 'yönetiyorum.',
    ] as Token[],
    marquee: ['Kreatif Liderlik', 'Reklam Filmi', 'AI Video', 'Ekip & Proje Yönetimi', 'İçerik Stratejisi', 'Kamera & Drone', 'Post-Prodüksiyon', 'iOS Ürün Geliştirme'],
    projects: {
      kicker: 'Portföy',
      title1: 'Her kare',
      title2: 'bir hikâye anlatır.',
      desc: 'Reklam filmlerinden yapay zeka destekli kampanyalara; seçili işlerden bir kesit.',
      all: 'Tümü',
      cats: { ad: 'Reklam Filmi', ai: 'AI Video', brand: 'Marka Filmi', social: 'Sosyal İçerik', doc: 'Belgesel' } as Record<CategoryKey, string>,
    },
    impact: {
      kicker: 'Etki',
      title: 'Rakamlarla',
      desc: 'Turkuvaz Medya ve Creative Touch Productions dönemlerinde ürettiğim ve yönettiğim işlerin toplamı.',
      cards: [
        { v: '1000+', l: 'Marka', d: 'Hizmet verilen toplam marka' },
        { v: '50M+', l: 'İzlenme', d: 'İçeriklerin ulaştığı toplam izlenme', badge: 'En büyük etki' },
        { v: '10', l: 'Kişilik ekip', d: 'Doğrudan yönettiğim ekip' },
      ],
      viewsTitle: 'Yıllara göre izlenme',
      viewsDesc: 'Milyon, kümülatif',
      engTitle: '+%35 etkileşim',
      engDesc: 'Aynı bütçeyle yürütülen kampanyalarda veri odaklı optimizasyonla ortalama etkileşim artışı.',
      engBefore: 'Önce',
      engAfter: 'Sonra',
      videos: 'Tamamlanmış video',
      budget: 'Yönetilen medya bütçesi',
    },
    products: {
      kicker: 'Ürünler',
      title1: 'Fikirden',
      title2: 'App Store’a.',
      desc: 'Medya ve prodüksiyon birikimimi ürün vizyonuyla birleştirip, yapay zeka destekli geliştirmeyle üç iOS uygulamasını uçtan uca yayına aldım.',
      apps: [
        { name: 'Speego', tag: 'Yapay zeka destekli konuşma koçu', icon: '/apps/speego.png', tone: 'cobalt',
          desc: '30 saniyelik video kaydından ton, akıcılık, beden dili ve netlik analizi. Mülakat ve sunum hazırlığı için kişisel geri bildirim. Abonelik modeliyle yayında.' },
        { name: 'Sanal Drone', tag: 'Gayrimenkul pazarlama aracı', icon: '/apps/sanal-drone.png', tone: 'flame',
          desc: 'Arsa ve gayrimenkul ilanlarını saniyeler içinde pazarlama içeriğine çevirir: haritadan alan hesabı, sosyal medyaya hazır görseller ve drone tanıtım videoları.' },
        { name: 'Someday', tag: 'Uçtan uca şifreli mesaj kasası', icon: '/apps/someday.png', tone: 'ink',
          desc: 'Sevdiklerinize video, ses ve mektup mesajları; belirlediğiniz tarihte ya da güvenilir kişilerin onayıyla iletilir. Sunucusuz, gizlilik esaslı mimari.' },
      ],
    },
    about: {
      kicker: 'Hakkımda',
      title1: 'Üretimden',
      title2: 'yönetime.',
      desc: 'Medya kuruluşlarında 4 yıl Kreatif Videographer olarak marka kampanyaları ve haber içerikleri ürettim; teknik becerilerimi gazetecilik perspektifiyle birleştirdim. Kariyerimdeki en büyük dönüşüm, kurucusu olduğum Creative Touch Productions ile geldi: içerik üreten değil, süreci yöneten tarafa geçtim.',
      areas: [
        { title: 'Kreatif liderlik', tone: 'lime', items: ['10 kişilik cross-functional ekip ve 15M₺+ medya bütçesi', 'Neyi test edeceğine, ölçekleyeceğine, durduracağına veriyle karar verme', 'Kriz anlarında çözüm ve farklı müşteri dinamiklerine hızlı adaptasyon'] },
        { title: 'Performans & içerik stratejisi', tone: 'blush', items: ['İzleyici davranışı ve YouTube, Instagram, TikTok algoritmaları', 'Platforma özel hook, tempo ve format optimizasyonu', 'UGC yönetimi ve Türkiye pazarına özgü kültürel içgörü'] },
        { title: 'Yapay zeka & inovasyon', tone: 'mint', items: ['AI destekli reklam filmi ve animasyon üretimi', 'Şirketlerin yapay zeka çağına adaptasyonunda yönetici vizyonu', 'Fikirden App Store’a iOS ürün geliştirme'] },
        { title: 'Prodüksiyon temeli', tone: 'sky', items: ['Profesyonel kamera ve drone ile 500+ video', 'Premiere Pro ve After Effects ile kurgu ve VFX', 'Canva / CapCut ile hızlı sosyal üretim'] },
      ],
      exitTitle: 'Başarılı exit',
      exitDesc: 'Sıfırdan kurduğum Creative Touch Productions, 1000’den fazla markaya reklam filmi, yapay zeka destekli video ve dijital danışmanlık sundu. Ajans, Ocak 2026’da Hamburg merkezli bir teknoloji şirketi tarafından satın alındı.',
      exitStats: [ { v: '1000+', l: 'Marka' }, { v: '10', l: 'Kişilik ekip' }, { v: '15M₺', l: 'Reklam bütçesi' }, { v: '50M+', l: 'İzlenme' } ],
    },
    experience: {
      kicker: 'Kariyer', title: 'Deneyim',
      jobs: [
        { role: 'Kurucu & Creative Director', company: 'Creative Touch Productions', place: 'İstanbul', period: 'Mart 2025 – Ocak 2026', isExit: true,
          highlight: 'Yapay zeka destekli reklam filmleri ve animasyonlarda uzmanlaşmış dijital ajansı kurdum ve yönettim. 10 kişilik ekiple farklı sektörlerden 1000+ markaya görsel ve video içerik stratejisi, YouTube ve Instagram için yüksek kaliteli üretim, proje yönetimi ve müşteri ilişkileri. Ajans Ocak 2026’da Hamburg merkezli bir teknoloji şirketine satıldı.' },
        { role: 'Kreatif Videographer', company: 'Turkuvaz Medya', place: 'İstanbul', period: 'Ekim 2021 – Mayıs 2025', isExit: false,
          highlight: 'Sabah, ATV ve A Haber gibi kanallarda marka kampanyaları ve günlük editoryal içerik üretimi; profesyonel kamera ve drone çekimlerinin yönetimi. Premiere Pro ve After Effects ile 500+ tamamlanmış video. Yayın temposu altında hızlı adaptasyon ve sahada güçlü haber takibi.' },
        { role: 'Post Prodüksiyon Editörü', company: 'Matte Post Productions', place: 'İstanbul', period: 'Eylül 2020 – Kasım 2020', isExit: false,
          highlight: 'Post-prodüksiyon ekibinde kurgu süreçlerinde görev aldım.' },
        { role: 'Stajyer', company: 'TV8 / Acun Medya', place: 'İstanbul', period: 'Haziran 2020 – Ağustos 2020', isExit: false,
          highlight: 'TV yayın planlaması ve organizasyon süreçlerine destek; stüdyo ve dış çekimlerde asistanlık.' },
      ],
      eduTitle: 'Eğitim',
      edu: { school: 'İstanbul Kültür Üniversitesi', dept: 'Radyo ve Televizyon Teknolojisi', period: '2018 – 2020' },
      langTitle: 'Diller',
      langs: [ { l: 'Türkçe', v: 'Ana dil' }, { l: 'İngilizce', v: 'Profesyonel' } ],
    },
    contact: {
      kicker: 'İletişim',
      title1: 'Birlikte',
      title2: 'çalışalım.',
      desc: 'Kreatif liderlik pozisyonları, danışmanlık ve iş birlikleri için.',
      email: 'Email gönder',
      quick: 'Hızlı iletişim',
      phone: 'Telefon',
    },
    footer: { rights: '© 2026 Yasin Aktaş', from: 'İstanbul’dan sevgiyle', top: 'Yukarı çık' },
  },
  en: {
    nav: { projects: 'Work', impact: 'Impact', products: 'Products', about: 'About', experience: 'Experience', contact: 'Contact' },
    hero: {
      kicker: 'Head of Creative · Creative Director',
      title1: 'I turn brands into',
      title2: 'stories people watch.',
      sub: 'About 5 years in video production and media; from the field to leading teams and an agency. 1000+ brands, 50M+ views and a successful exit in 2026.',
      cta1: 'Watch the work',
      cta2: 'Work with me',
      location: 'Istanbul, Türkiye',
      available: 'Open to new projects',
    },
    reel: { kicker: 'Showreel', title1: 'From the camera', title2: 'to creative leadership.', watch: 'Watch', by: 'Selected work' },
    clients: 'Organisations I’ve worked with',
    statement: [
      'I', 'started', 'behind', 'the', 'camera;', { img: '/thumbnails/thumb4.jpg' }, 'shooting,', 'editing', 'and', 'getting', 'stories', 'on', 'air.',
      'Then', 'I', 'founded', 'my', 'own', 'agency', { tag: '@creativetouch', tone: 'cobalt' }, 'led', 'a', 'team', 'of', '10', 'and', 'told', 'stories', 'for', '1000+', 'brands.',
      'Today', 'I', 'put', 'AI', { img: 'https://img.youtube.com/vi/AKoHR01gtTo/hqdefault.jpg' }, 'at', 'the', 'heart', 'of', 'production', 'and', 'lead', 'teams', 'and', 'budgets.',
    ] as Token[],
    marquee: ['Creative Leadership', 'Ad Films', 'AI Video', 'Team & Project Management', 'Content Strategy', 'Camera & Drone', 'Post-Production', 'iOS Product Development'],
    projects: {
      kicker: 'Portfolio',
      title1: 'Every frame',
      title2: 'tells a story.',
      desc: 'From ad films to AI-assisted campaigns; a cut of selected work.',
      all: 'All',
      cats: { ad: 'Ad Film', ai: 'AI Video', brand: 'Brand Film', social: 'Social Content', doc: 'Documentary' } as Record<CategoryKey, string>,
    },
    impact: {
      kicker: 'Impact',
      title: 'By the numbers',
      desc: 'Totals across the work I produced and directed at Turkuvaz Media and Creative Touch Productions.',
      cards: [
        { v: '1000+', l: 'Brands', d: 'Total brands served' },
        { v: '50M+', l: 'Views', d: 'Total views reached by content', badge: 'Biggest impact' },
        { v: '10', l: 'Person team', d: 'Team under my direct lead' },
      ],
      viewsTitle: 'Views by year',
      viewsDesc: 'Millions, cumulative',
      engTitle: '+35% engagement',
      engDesc: 'Average engagement lift from data-driven optimisation on campaigns run with the same budget.',
      engBefore: 'Before',
      engAfter: 'After',
      videos: 'Finished videos',
      budget: 'Media budget managed',
    },
    products: {
      kicker: 'Products',
      title1: 'From idea',
      title2: 'to the App Store.',
      desc: 'Combining media and production experience with product vision, I shipped three iOS apps end to end with AI-assisted development.',
      apps: [
        { name: 'Speego', tag: 'AI-powered speaking coach', icon: '/apps/speego.png', tone: 'cobalt',
          desc: 'Analyses tone, fluency, body language and clarity from a 30-second video. Personal feedback for interviews and presentations. Live on a subscription model.' },
        { name: 'Sanal Drone', tag: 'Real estate marketing tool', icon: '/apps/sanal-drone.png', tone: 'flame',
          desc: 'Turns land and property listings into marketing content in seconds: map-based area calculation, social-ready visuals and aerial promo videos.' },
        { name: 'Someday', tag: 'End-to-end encrypted message vault', icon: '/apps/someday.png', tone: 'ink',
          desc: 'Video, voice and letter messages for loved ones, delivered on a chosen date or with trusted contacts’ approval. Serverless, privacy-first design.' },
      ],
    },
    about: {
      kicker: 'About',
      title1: 'From production',
      title2: 'to leadership.',
      desc: 'I spent 4 years as a Creative Videographer at media organisations, producing brand campaigns and news content and pairing technical craft with a journalist’s eye. The biggest shift came with Creative Touch Productions, the agency I founded: I moved from making the content to running the process.',
      areas: [
        { title: 'Creative leadership', tone: 'lime', items: ['10-person cross-functional team and a 15M₺+ media budget', 'Data-led calls on what to test, scale or stop', 'Problem-solving under pressure and fast adaptation to client dynamics'] },
        { title: 'Performance & content strategy', tone: 'blush', items: ['Audience behaviour and YouTube, Instagram, TikTok algorithms', 'Platform-native hooks, pacing and formats', 'UGC direction and cultural insight for the Turkish market'] },
        { title: 'AI & innovation', tone: 'mint', items: ['AI-assisted ad film and animation production', 'Executive lens on companies’ AI adoption', 'iOS products from idea to the App Store'] },
        { title: 'Production foundation', tone: 'sky', items: ['500+ videos with professional camera and drone', 'Editing and VFX in Premiere Pro and After Effects', 'Fast social production with Canva / CapCut'] },
      ],
      exitTitle: 'Successful exit',
      exitDesc: 'Creative Touch Productions, which I built from zero, delivered ad films, AI-assisted video and digital consultancy to over 1,000 brands. The agency was acquired by a Hamburg-based technology company in January 2026.',
      exitStats: [ { v: '1000+', l: 'Brands' }, { v: '10', l: 'Person team' }, { v: '15M₺', l: 'Ad budget' }, { v: '50M+', l: 'Views' } ],
    },
    experience: {
      kicker: 'Career', title: 'Experience',
      jobs: [
        { role: 'Founder & Creative Director', company: 'Creative Touch Productions', place: 'Istanbul', period: 'Mar 2025 – Jan 2026', isExit: true,
          highlight: 'Founded and ran a digital agency specialising in AI-assisted ad films and animation. Led a 10-person team delivering visual and video strategy for 1000+ brands across sectors, high-quality production for YouTube and Instagram, project management and client relations. Acquired by a Hamburg-based tech company in January 2026.' },
        { role: 'Creative Videographer', company: 'Turkuvaz Media', place: 'Istanbul', period: 'Oct 2021 – May 2025', isExit: false,
          highlight: 'Brand campaigns and daily editorial content for channels such as Sabah, ATV and A Haber; led professional camera and drone shoots. Delivered 500+ finished videos in Premiere Pro and After Effects, adapting fast under broadcast pace with strong field news coverage.' },
        { role: 'Post-Production Editor', company: 'Matte Post Productions', place: 'Istanbul', period: 'Sep 2020 – Nov 2020', isExit: false,
          highlight: 'Worked on editing within the post-production team.' },
        { role: 'Intern', company: 'TV8 / Acun Media', place: 'Istanbul', period: 'Jun 2020 – Aug 2020', isExit: false,
          highlight: 'Supported TV broadcast planning and organisation; assisted on studio and location shoots.' },
      ],
      eduTitle: 'Education',
      edu: { school: 'Istanbul Kültür University', dept: 'Radio and Television Technology', period: '2018 – 2020' },
      langTitle: 'Languages',
      langs: [ { l: 'Turkish', v: 'Native' }, { l: 'English', v: 'Professional' } ],
    },
    contact: {
      kicker: 'Contact',
      title1: 'Let’s work',
      title2: 'together.',
      desc: 'For creative leadership roles, consultancy and collaborations.',
      email: 'Send email',
      quick: 'Quick contact',
      phone: 'Phone',
    },
    footer: { rights: '© 2026 Yasin Aktaş', from: 'With love from Istanbul', top: 'Back to top' },
  },
}

type Copy = typeof copy.tr

const EASE = [0.22, 1, 0.36, 1] as const

const TONES: Record<string, { bg: string; fg: string }> = {
  cobalt: { bg: '#2B3BFF', fg: '#FFFFFF' },
  flame: { bg: '#FF5A1F', fg: '#FFFFFF' },
  ink: { bg: '#0B0B0C', fg: '#FFFFFF' },
  lime: { bg: '#DCFF3F', fg: '#0B0B0C' },
  blush: { bg: '#FFB3D9', fg: '#0B0B0C' },
  mint: { bg: '#7BE0B5', fg: '#0B0B0C' },
  sky: { bg: '#A9D8FF', fg: '#0B0B0C' },
}

// ============================================
// THUMBNAIL FALLBACK — maxresdefault yoksa hqdefault'a düş
// ============================================
const thumbFallback = (e: React.SyntheticEvent<HTMLImageElement>) => {
  const img = e.currentTarget
  if (img.src.includes('maxresdefault')) {
    img.src = img.src.replace('maxresdefault', 'hqdefault')
  }
}

const yt = (id: string, q: 'maxresdefault' | 'hqdefault' = 'maxresdefault') => `https://img.youtube.com/vi/${id}/${q}.jpg`

// ============================================
// PROJECT DATA
// ============================================
type Project = {
  id: number
  title: string
  category: CategoryKey
  youtubeId: string
  thumbnail: string
  year: string
  tone: string
  isShort?: boolean
}

const projects: Project[] = [
  { id: 1, title: 'AI Creative Project', category: 'ad', youtubeId: 'KooyeFCgugQ', thumbnail: yt('KooyeFCgugQ'), year: '2026', tone: 'flame' },
  { id: 8, title: 'Brand Film', category: 'ai', youtubeId: 'AKoHR01gtTo', thumbnail: yt('AKoHR01gtTo'), year: '2026', tone: 'cobalt' },
  { id: 10, title: 'Advertisement Video', category: 'ad', youtubeId: '8ubs9yfqB08', thumbnail: yt('8ubs9yfqB08'), year: '2026', tone: 'lime' },
  { id: 9, title: 'Advertisement Short', category: 'ad', youtubeId: 'IpSYC7O5E7I', thumbnail: yt('IpSYC7O5E7I', 'hqdefault'), year: '2026', tone: 'blush', isShort: true },
  { id: 11, title: 'Advertisement Film', category: 'ad', youtubeId: 'x1mXofJwhGE', thumbnail: yt('x1mXofJwhGE'), year: '2026', tone: 'mint' },
  { id: 2, title: 'Brand Campaign', category: 'brand', youtubeId: 'EgRRRKSXxzg', thumbnail: '/thumbnails/thumb2.jpg', year: '2024', tone: 'sky', isShort: true },
  { id: 7, title: 'Product Launch Film', category: 'ad', youtubeId: 'Jmonxy8U3mU', thumbnail: '/thumbnails/thumb7.jpg', year: '2024', tone: 'flame' },
  { id: 3, title: 'AI-Powered Commercial', category: 'ai', youtubeId: '8-YxCmFjRLA', thumbnail: '/thumbnails/thumb3.jpg', year: '2024', tone: 'cobalt', isShort: true },
  { id: 4, title: 'Social Media Series', category: 'social', youtubeId: 'vrYuv7i9HUM', thumbnail: '/thumbnails/thumb4.jpg', year: '2023', tone: 'lime' },
  { id: 5, title: 'Corporate Documentary', category: 'doc', youtubeId: 'K2H-thz48TI', thumbnail: '/thumbnails/thumb5.jpg', year: '2023', tone: 'blush' },
]

// Showreel rotates through the latest horizontal films
const reelProjects = projects.filter(p => !p.isShort && p.year === '2026')

const viewsData = [
  { year: '2021', value: 1 },
  { year: '2022', value: 5 },
  { year: '2023', value: 12 },
  { year: '2024', value: 22 },
  { year: '2025', value: 38 },
  { year: '2026', value: 50 },
]

const clients = ['TV8 / Acun Medya', 'Matte Post', 'Turkuvaz Medya', 'Sabah', 'ATV', 'A Haber', 'Creative Touch']

// ============================================
// SMALL PRIMITIVES
// ============================================
function Bubble({ children, tone = 'cobalt', right = false, big = false, className = '' }: { children: React.ReactNode; tone?: string; right?: boolean; big?: boolean; className?: string }) {
  const c = TONES[tone] ?? TONES.cobalt
  return (
    <span
      className={`bubble ${right ? 'bubble-right' : ''} relative inline-flex items-center rounded-full font-semibold ${big ? 'px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-lg' : 'px-3 py-1.5 text-[11px] md:text-xs'} whitespace-nowrap shadow-[0_8px_20px_-8px_rgba(0,0,0,0.35)] ${className}`}
      style={{ background: c.bg, color: c.fg }}
    >
      {children}
    </span>
  )
}

function Kicker({ children, center = false }: { children: React.ReactNode; center?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2 text-[11px] md:text-xs font-semibold tracking-[0.2em] uppercase text-muted mb-4 ${center ? 'justify-center' : ''}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-flame" />
      {children}
    </span>
  )
}

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function Heading({ kicker, line1, line2, center = false, className = '' }: { kicker: string; line1: string; line2: string; center?: boolean; className?: string }) {
  return (
    <Reveal className={`${center ? 'text-center' : ''} ${className}`}>
      <Kicker center={center}>{kicker}</Kicker>
      <h2 className="font-display font-medium text-[2.4rem] leading-[1] sm:text-5xl md:text-6xl lg:text-7xl">
        <span className="block">{line1}</span>
        <span className="block text-muted">{line2}</span>
      </h2>
    </Reveal>
  )
}

function PlayIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><polygon points="6,4 20,12 6,20" /></svg>
  )
}

function Arrow({ dir = 'right', size = 16 }: { dir?: 'right' | 'left' | 'up' | 'upright'; size?: number }) {
  const rot = { right: 0, left: 180, up: -90, upright: -45 }[dir]
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${rot}deg)` }}>
      <path d="M5 12h14" /><path d="m13 6 6 6-6 6" />
    </svg>
  )
}

// ============================================
// SCROLL PROGRESS
// ============================================
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return <motion.div className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left bg-flame" style={{ scaleX }} />
}

// ============================================
// NAVIGATION
// ============================================
function Navigation({ t, lang, setLang }: { t: Copy; lang: Lang; setLang: (l: Lang) => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: t.nav.projects, href: '#projeler' },
    { label: t.nav.impact, href: '#etki' },
    { label: t.nav.products, href: '#urunler' },
    { label: t.nav.about, href: '#hakkimda' },
    { label: t.nav.experience, href: '#deneyim' },
  ]

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="fixed top-3 md:top-4 inset-x-0 z-50 px-3 md:px-6"
      >
        <div className={`max-w-6xl mx-auto flex justify-between items-center h-14 md:h-16 pl-4 pr-2 md:pl-6 rounded-full transition-all duration-500 ${
          scrolled ? 'bg-white/80 backdrop-blur-xl shadow-[0_10px_30px_-15px_rgba(0,0,0,0.25)] border border-black/[0.06]' : 'bg-transparent border border-transparent'
        }`}>
          <a href="#" className="flex items-center gap-2 font-display font-semibold text-base md:text-lg">
            <span className="relative w-6 h-6 rounded-lg bg-lime flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-ink" />
            </span>
            Yasin Aktaş
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((item) => (
              <a key={item.href} href={item.href} className="px-3 py-2 rounded-full text-sm text-ink/60 hover:text-ink hover:bg-black/[0.04] transition-colors">
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-1.5 md:gap-2">
            <button
              onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')}
              className="h-9 md:h-10 px-3 rounded-full text-xs md:text-sm font-semibold text-ink/70 hover:text-ink border border-black/10 bg-white/60 transition-colors"
              aria-label="Change language"
            >
              {lang === 'tr' ? 'EN' : 'TR'}
            </button>
            <a href="#iletisim" className="hidden md:inline-flex items-center gap-2 h-10 px-5 rounded-full text-sm font-medium bg-ink text-white hover:bg-flame transition-colors">
              {t.nav.contact}
              <Arrow dir="upright" size={14} />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 rounded-full bg-ink flex items-center justify-center"
              aria-label="Menu"
            >
              <div className="space-y-1">
                <motion.span animate={{ rotate: mobileMenuOpen ? 45 : 0, y: mobileMenuOpen ? 5 : 0 }} className="block w-4 h-0.5 bg-white" />
                <motion.span animate={{ opacity: mobileMenuOpen ? 0 : 1 }} className="block w-4 h-0.5 bg-white" />
                <motion.span animate={{ rotate: mobileMenuOpen ? -45 : 0, y: mobileMenuOpen ? -5 : 0 }} className="block w-4 h-0.5 bg-white" />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-paper pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-2">
              {[...navLinks, { label: t.nav.contact, href: '#iletisim' }].map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, ease: EASE }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-display font-medium text-4xl py-2 border-b border-black/[0.06] flex items-center justify-between"
                >
                  {item.label}
                  <span className="text-muted"><Arrow size={22} /></span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ============================================
// HERO — fanned card stack
// ============================================
const fanCards = [
  '/thumbnails/thumb5.jpg',
  yt('x1mXofJwhGE'),
  '/thumbnails/thumb7.jpg',
  yt('KooyeFCgugQ'),
  yt('AKoHR01gtTo'),
  '/thumbnails/thumb4.jpg',
  yt('8ubs9yfqB08'),
]

function CardFan({ onOpen }: { onOpen: () => void }) {
  const mid = (fanCards.length - 1) / 2
  return (
    <div className="relative h-[230px] sm:h-[280px] md:h-[340px] w-full flex items-center justify-center">
      <div className="relative w-0 h-0 scale-[0.62] sm:scale-[0.8] md:scale-100">
        {fanCards.map((src, i) => {
          const o = i - mid
          return (
            <motion.button
              key={i}
              onClick={onOpen}
              initial={{ x: 0, y: 40, rotate: 0, opacity: 0 }}
              animate={{ x: o * 112, y: Math.abs(o) * Math.abs(o) * 7, rotate: o * 7, opacity: 1 }}
              transition={{ duration: 1.1, delay: 0.5 + Math.abs(o) * 0.06, ease: EASE }}
              whileHover={{ y: Math.abs(o) * Math.abs(o) * 7 - 28, scale: 1.06, zIndex: 50, transition: { duration: 0.35 } }}
              className="absolute -left-[88px] -top-[120px] w-[176px] h-[240px] rounded-[22px] overflow-hidden bg-white p-1.5 shadow-[0_25px_50px_-20px_rgba(0,0,0,0.45)] cursor-pointer"
              style={{ zIndex: 10 - Math.abs(Math.round(o)) }}
              aria-label="Showreel"
            >
              <img src={src} alt="" onError={thumbFallback} className="w-full h-full object-cover rounded-[17px]" />
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

function HeroSection({ t, onPlay }: { t: Copy; onPlay: () => void }) {
  return (
    <section className="relative pt-28 md:pt-36 pb-10 md:pb-16 px-4 md:px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, ease: EASE }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-black/[0.06] mb-6 md:mb-8"
        >
          <span className="relative flex w-2 h-2">
            <span className="absolute inset-0 rounded-full bg-[#22C55E] animate-ping opacity-60" />
            <span className="relative w-2 h-2 rounded-full bg-[#22C55E]" />
          </span>
          <span className="text-xs md:text-sm text-ink/70">{t.hero.available} · {t.hero.location}</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, ease: EASE }}
          lang="en"
          className="text-[11px] md:text-xs font-semibold tracking-[0.22em] uppercase text-muted mb-4"
        >
          {t.hero.kicker}
        </motion.p>

        <div className="relative max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: -12 }}
            animate={{ opacity: 1, scale: 1, rotate: -6 }}
            transition={{ delay: 1.1, type: 'spring', stiffness: 260, damping: 16 }}
            className="absolute left-2 -bottom-8 sm:bottom-auto sm:left-[4%] sm:-top-4 z-10"
          >
            <Bubble tone="cobalt">@reklamfilmi</Bubble>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: 12 }}
            animate={{ opacity: 1, scale: 1, rotate: 6 }}
            transition={{ delay: 1.3, type: 'spring', stiffness: 260, damping: 16 }}
            className="absolute right-2 -bottom-8 sm:bottom-auto sm:right-[2%] sm:top-[52%] z-10"
          >
            <Bubble tone="mint" right>@aivideo</Bubble>
          </motion.div>

          <h1 className="font-display font-medium text-[2.6rem] leading-[0.98] sm:text-6xl md:text-7xl lg:text-[5.6rem]">
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.9, ease: EASE }}
              className="block"
            >
              {t.hero.title1}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.9, ease: EASE }}
              className="block text-muted"
            >
              {t.hero.title2}
            </motion.span>
          </h1>
        </div>

        <CardFan onOpen={onPlay} />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, ease: EASE }}
          className="text-sm md:text-base text-ink/60 leading-relaxed max-w-xl mx-auto mb-7"
        >
          {t.hero.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, ease: EASE }}
          className="flex items-center justify-center gap-2 md:gap-3"
        >
          <a href="#projeler" className="group inline-flex items-center gap-2 h-11 md:h-12 px-5 md:px-6 rounded-full bg-ink text-white text-sm font-medium hover:bg-flame transition-colors">
            <PlayIcon size={12} />
            {t.hero.cta1}
          </a>
          <a href="#iletisim" className="group inline-flex items-center gap-2 h-11 md:h-12 px-5 md:px-6 rounded-full text-sm font-medium text-ink hover:bg-black/[0.05] transition-colors">
            {t.hero.cta2}
            <span className="transition-transform group-hover:translate-x-0.5"><Arrow size={14} /></span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================
// SHOWREEL — big colour card with carousel
// ============================================
function ShowreelSection({ t, onSelect }: { t: Copy; onSelect: (p: Project) => void }) {
  const [i, setI] = useState(0)
  const p = reelProjects[i]
  const go = (d: number) => setI((v) => (v + d + reelProjects.length) % reelProjects.length)

  return (
    <section className="px-4 md:px-6 pb-16 md:pb-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between gap-4 mb-5 md:mb-8">
          <Reveal>
            <Kicker>{t.reel.kicker}</Kicker>
            <h2 className="font-display font-medium text-3xl md:text-5xl leading-[1]">
              {t.reel.title1}<br /><span className="text-muted">{t.reel.title2}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="hidden sm:block">
            <Bubble tone="ink" right>@yasinakkts</Bubble>
          </Reveal>
        </div>

        <Reveal>
          <div className="relative rounded-[28px] md:rounded-[36px] p-2 md:p-3 bg-flame">
            <div className="relative aspect-[4/3] sm:aspect-video md:aspect-[21/9] rounded-[22px] md:rounded-[28px] overflow-hidden bg-black">
              <AnimatePresence mode="popLayout">
                <motion.img
                  key={p.id}
                  src={p.thumbnail}
                  alt={p.title}
                  onError={thumbFallback}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: EASE }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

              <div className="absolute top-4 left-4 md:top-6 md:left-6 flex flex-col gap-1.5">
                <span className="w-6 h-6 md:w-7 md:h-7 rounded-lg bg-white" />
                <span className="w-6 h-6 md:w-7 md:h-7 rounded-lg bg-ink" />
              </div>
              <div className="absolute top-4 right-4 md:top-6 md:right-6 flex gap-1">
                {reelProjects.map((_, k) => (
                  <span key={k} className={`h-1 rounded-full transition-all duration-500 ${k === i ? 'w-6 bg-white' : 'w-2 bg-white/50'}`} />
                ))}
              </div>

              <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 flex items-end justify-between gap-3">
                <div className="text-white">
                  <p className="text-[11px] md:text-xs uppercase tracking-[0.2em] text-white/70 mb-1">{t.reel.by} · {p.year}</p>
                  <p className="font-display text-xl md:text-3xl font-medium mb-3">{p.title}</p>
                  <button onClick={() => onSelect(p)} className="inline-flex items-center gap-2 h-9 md:h-10 px-4 rounded-full bg-white text-ink text-xs md:text-sm font-semibold hover:bg-lime transition-colors">
                    <PlayIcon size={11} /> {t.reel.watch}
                  </button>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => go(-1)} aria-label="Previous" className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white text-ink flex items-center justify-center hover:bg-lime transition-colors"><Arrow dir="left" size={14} /></button>
                  <button onClick={() => go(1)} aria-label="Next" className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white text-ink flex items-center justify-center hover:bg-lime transition-colors"><Arrow size={14} /></button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-10 md:mt-14">
          <p className="text-center text-xs md:text-sm text-muted mb-5">{t.clients}</p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 md:gap-x-10">
            {clients.map((c) => (
              <span key={c} className="font-display font-semibold text-base md:text-xl text-ink/30 hover:text-ink transition-colors">{c}</span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ============================================
// SCROLL-REVEAL STATEMENT
// ============================================
function RevealWord({ children, progress, range }: { children: React.ReactNode; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.15, 1])
  return <motion.span style={{ opacity }} className="inline-block mr-[0.25em]">{children}</motion.span>
}

function StatementSection({ t }: { t: Copy }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const n = t.statement.length

  return (
    <section className="px-4 md:px-6 py-16 md:py-28">
      <div ref={ref} className="max-w-4xl mx-auto text-center">
        <p className="font-display font-medium text-[1.65rem] leading-[1.25] sm:text-4xl md:text-5xl md:leading-[1.15]">
          {t.statement.map((tok, k) => {
            const range: [number, number] = [k / n, Math.min(1, (k + 1.5) / n)]
            if (typeof tok === 'string') return <RevealWord key={k} progress={scrollYProgress} range={range}>{tok}</RevealWord>
            if ('img' in tok) return (
              <RevealWord key={k} progress={scrollYProgress} range={range}>
                <img src={tok.img} alt="" className="inline-block align-middle w-[1.9em] h-[1.1em] rounded-[0.3em] object-cover -mt-[0.15em]" />
              </RevealWord>
            )
            return (
              <RevealWord key={k} progress={scrollYProgress} range={range}>
                <span className="inline-block align-middle -mt-[0.2em] leading-none font-sans tracking-normal"><Bubble tone={tok.tone} big>{tok.tag}</Bubble></span>
              </RevealWord>
            )
          })}
        </p>
      </div>
    </section>
  )
}

// ============================================
// WORK SECTION
// ============================================
function VideoCard({ project, label, onSelect, index }: { project: Project; label: string; onSelect: (p: Project) => void; index: number }) {
  const tone = TONES[project.tone]
  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.06, ease: EASE }}
      onClick={() => onSelect(project)}
      className="group relative block w-full text-left mb-3 md:mb-5 break-inside-avoid rounded-[24px] bg-white p-2 shadow-[0_1px_0_rgba(0,0,0,0.04)] hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)] transition-shadow duration-500"
    >
      <div className={`relative overflow-hidden rounded-[18px] ${project.isShort ? 'aspect-[9/14]' : 'aspect-video'}`}>
        <img
          src={project.thumbnail}
          alt={project.title}
          onError={thumbFallback}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-500" />
        <span
          className="absolute top-3 left-3 w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center pl-0.5 scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300"
          style={{ background: tone.bg, color: tone.fg }}
        >
          <PlayIcon size={13} />
        </span>
        {project.isShort && (
          <span className="absolute top-3 right-3 px-2 py-1 rounded-full bg-white/90 text-[10px] font-semibold tracking-wide">9:16</span>
        )}
      </div>
      <div className="flex items-center justify-between gap-3 px-2 pt-3 pb-1.5">
        <div className="min-w-0">
          <h3 className="font-display font-semibold text-[15px] md:text-base truncate">{project.title}</h3>
          <p className="text-xs text-muted">{label}</p>
        </div>
        <span className="shrink-0 text-xs font-mono text-muted">{project.year}</span>
      </div>
    </motion.button>
  )
}

function WorkSection({ onSelect, t }: { onSelect: (p: Project) => void; t: Copy }) {
  const used = Array.from(new Set(projects.map(p => p.category)))
  const [active, setActive] = useState<CategoryKey | 'all'>('all')
  const filtered = active === 'all' ? projects : projects.filter(p => p.category === active)

  return (
    <section id="projeler" className="px-4 md:px-6 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8 md:mb-12">
          <Heading kicker={t.projects.kicker} line1={t.projects.title1} line2={t.projects.title2} />
          <Reveal delay={0.1} className="md:max-w-xs">
            <p className="text-sm text-ink/60 leading-relaxed">{t.projects.desc}</p>
          </Reveal>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 md:mx-0 md:px-0 mb-6 md:mb-8">
          {(['all', ...used] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`shrink-0 h-9 md:h-10 px-4 rounded-full text-xs md:text-sm font-medium transition-colors ${
                active === cat ? 'bg-ink text-white' : 'bg-white text-ink/60 hover:text-ink'
              }`}
            >
              {cat === 'all' ? t.projects.all : t.projects.cats[cat]}
            </button>
          ))}
        </div>

        <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-3 md:gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <VideoCard key={project.id} project={project} label={t.projects.cats[project.category]} onSelect={onSelect} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================
// LIME MARQUEE
// ============================================
function Marquee({ items }: { items: readonly string[] }) {
  const doubled = [...items, ...items]
  const dots = ['bg-flame', 'bg-cobalt', 'bg-ink', 'bg-blush']
  return (
    <section className="px-4 md:px-6 py-6 md:py-10">
      <div className="max-w-6xl mx-auto rounded-[24px] md:rounded-[32px] bg-lime overflow-hidden py-5 md:py-8">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
          className="flex whitespace-nowrap w-max"
        >
          {doubled.map((item, i) => (
            <span key={i} className="flex items-center gap-5 md:gap-8 pr-5 md:pr-8 font-display font-medium text-3xl md:text-6xl">
              {item}
              <span className={`w-4 h-4 md:w-7 md:h-7 ${i % 2 ? 'rounded-full' : 'rounded-md rotate-12'} ${dots[i % dots.length]}`} />
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ============================================
// IMPACT — fanned stat cards + charts
// ============================================
function ImpactSection({ t }: { t: Copy }) {
  const chartRef = useRef<HTMLDivElement>(null)
  const inView = useInView(chartRef, { once: true, margin: '-80px' })
  const rot = [-7, 0, 7]
  const off = ['md:translate-y-6', 'md:-translate-y-2', 'md:translate-y-6']

  return (
    <section id="etki" className="px-4 md:px-6 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-6 items-center mb-10 md:mb-16">
          <div>
            <Heading kicker={t.impact.kicker} line1={t.impact.title} line2="" />
            <Reveal delay={0.1}>
              <p className="text-sm md:text-base text-ink/60 leading-relaxed max-w-sm mt-5">{t.impact.desc}</p>
            </Reveal>
          </div>

          <div className="flex justify-center items-center py-6">
            {t.impact.cards.map((c, i) => {
              const hot = 'badge' in c
              return (
                <motion.div
                  key={c.l}
                  initial={{ opacity: 0, y: 50, rotate: 0 }}
                  whileInView={{ opacity: 1, y: 0, rotate: rot[i] }}
                  whileHover={{ rotate: 0, y: -12, zIndex: 20 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
                  className={`relative w-[34%] max-w-[210px] -mx-[1%] ${off[i]} ${hot ? 'z-10' : 'z-0'}`}
                >
                  <div className={`rounded-[20px] md:rounded-[26px] p-4 md:p-6 aspect-[3/4] flex flex-col justify-between shadow-[0_30px_60px_-30px_rgba(0,0,0,0.45)] ${hot ? 'bg-flame text-white md:scale-110' : 'bg-white text-ink'}`}>
                    <div className="flex items-start justify-between gap-1">
                      <span className={`text-[10px] md:text-xs font-medium ${hot ? 'text-white/80' : 'text-muted'}`}>{c.l}</span>
                      {hot && <span className="hidden sm:inline px-2 py-0.5 rounded-full bg-white text-flame text-[9px] md:text-[10px] font-bold">{(c as { badge: string }).badge}</span>}
                    </div>
                    <div>
                      <span className="block font-display font-semibold text-[1.7rem] sm:text-4xl lg:text-5xl leading-none">{c.v}</span>
                      <span className={`block mt-2 text-[10px] md:text-xs leading-snug ${hot ? 'text-white/80' : 'text-muted'}`}>{c.d}</span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        <div ref={chartRef} className="grid md:grid-cols-[1.4fr_1fr] gap-3 md:gap-5">
          <Reveal className="rounded-[24px] md:rounded-[28px] bg-white p-5 md:p-8">
            <div className="flex items-baseline justify-between mb-6">
              <h3 className="font-display font-semibold text-lg md:text-xl">{t.impact.viewsTitle}</h3>
              <span className="text-xs text-muted">{t.impact.viewsDesc}</span>
            </div>
            <div className="flex items-end gap-2 md:gap-4 h-44 md:h-56">
              {viewsData.map((d, i) => {
                const last = i === viewsData.length - 1
                return (
                  <div key={d.year} className="flex-1 flex flex-col items-center justify-end h-full gap-2">
                    <span className={`text-[10px] md:text-xs font-semibold ${last ? 'text-ink' : 'text-muted'}`}>{d.value}M</span>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={inView ? { height: `${(d.value / 50) * 100}%` } : {}}
                      transition={{ duration: 1, delay: 0.2 + i * 0.1, ease: EASE }}
                      className={`w-full rounded-[10px] md:rounded-[14px] ${last ? 'bg-lime' : 'bg-paper'}`}
                      style={{ minHeight: 6 }}
                    />
                    <span className="text-[10px] md:text-xs text-muted font-mono">{d.year}</span>
                  </div>
                )
              })}
            </div>
          </Reveal>

          <div className="grid gap-3 md:gap-5">
            <Reveal delay={0.1} className="rounded-[24px] md:rounded-[28px] bg-cobalt text-white p-5 md:p-7">
              <h3 className="font-display font-semibold text-2xl md:text-3xl mb-2">{t.impact.engTitle}</h3>
              <p className="text-white/70 text-xs md:text-sm leading-relaxed mb-5">{t.impact.engDesc}</p>
              <div className="space-y-2.5">
                {[{ l: t.impact.engBefore, v: 100, w: '62%', c: 'bg-white/25' }, { l: t.impact.engAfter, v: 135, w: '84%', c: 'bg-lime' }].map((b, k) => (
                  <div key={b.l} className="flex items-center gap-3">
                    <span className="w-12 text-[11px] text-white/70">{b.l}</span>
                    <div className="flex-1 h-7 rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: b.w } : {}}
                        transition={{ duration: 1.2, delay: 0.3 + k * 0.3, ease: EASE }}
                        className={`h-full rounded-full ${b.c} flex items-center justify-end pr-3`}
                      >
                        <span className={`text-[11px] font-bold ${k ? 'text-ink' : 'text-white'}`}>{b.v}</span>
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
            <div className="grid grid-cols-2 gap-3 md:gap-5">
              <Reveal delay={0.15} className="rounded-[24px] bg-ink text-white p-5">
                <span className="block font-display font-semibold text-3xl md:text-4xl">500+</span>
                <span className="text-xs text-white/60">{t.impact.videos}</span>
              </Reveal>
              <Reveal delay={0.2} className="rounded-[24px] bg-blush p-5">
                <span className="block font-display font-semibold text-3xl md:text-4xl">15M₺</span>
                <span className="text-xs text-ink/60">{t.impact.budget}</span>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================
// PRODUCTS — iOS apps
// ============================================
function ProductsSection({ t }: { t: Copy }) {
  return (
    <section id="urunler" className="px-4 md:px-6 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8 md:mb-12">
          <Heading kicker={t.products.kicker} line1={t.products.title1} line2={t.products.title2} />
          <Reveal delay={0.1} className="md:max-w-sm">
            <p className="text-sm text-ink/60 leading-relaxed">{t.products.desc}</p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-3 md:gap-5">
          {t.products.apps.map((app, i) => {
            const tone = TONES[app.tone]
            return (
              <Reveal key={app.name} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -8, rotate: i === 1 ? 0 : i === 0 ? -1 : 1 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="h-full rounded-[26px] md:rounded-[30px] p-6 md:p-7 flex flex-col min-h-[340px] md:min-h-[400px]"
                  style={{ background: tone.bg, color: tone.fg }}
                >
                  <div className="flex items-start justify-between mb-auto">
                    <img src={app.icon} alt={`${app.name} icon`} className="w-16 h-16 md:w-20 md:h-20 rounded-[18px] md:rounded-[22px] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]" />
                    <span className="px-2.5 py-1 rounded-full bg-white/15 text-[10px] md:text-[11px] font-semibold tracking-wide">iOS · App Store</span>
                  </div>
                  <div className="pt-10">
                    <h3 className="font-display font-semibold text-3xl md:text-4xl mb-1">{app.name}</h3>
                    <p className="text-xs md:text-sm font-medium opacity-70 mb-4">{app.tag}</p>
                    <p className="text-sm leading-relaxed opacity-80">{app.desc}</p>
                  </div>
                </motion.div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ============================================
// ABOUT
// ============================================
function AboutSection({ t }: { t: Copy }) {
  const [open, setOpen] = useState(0)
  const exitThumbs = [yt('KooyeFCgugQ'), '/thumbnails/thumb7.jpg', yt('8ubs9yfqB08')]

  return (
    <section id="hakkimda" className="px-4 md:px-6 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-10 md:mb-14">
          <div>
            <Heading kicker={t.about.kicker} line1={t.about.title1} line2={t.about.title2} />
            <Reveal delay={0.1}>
              <p className="mt-6 text-sm md:text-base text-ink/65 leading-relaxed max-w-md">{t.about.desc}</p>
            </Reveal>
          </div>

          <div className="space-y-2.5">
            {t.about.areas.map((area, k) => {
              const isOpen = open === k
              const tone = TONES[area.tone]
              return (
                <Reveal key={area.title} delay={k * 0.06}>
                  <button
                    onClick={() => setOpen(isOpen ? -1 : k)}
                    className={`w-full text-left rounded-[22px] p-5 md:p-6 transition-colors duration-300 ${isOpen ? 'bg-white' : 'bg-white/50 hover:bg-white'}`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: tone.bg, color: tone.fg }}>0{k + 1}</span>
                        <span className="font-display font-semibold text-lg md:text-xl">{area.title}</span>
                      </span>
                      <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="text-2xl leading-none text-muted">+</motion.span>
                    </div>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: EASE }}
                          className="overflow-hidden pl-11"
                        >
                          {area.items.map((it) => (
                            <li key={it} className="pt-3 text-sm text-ink/65 leading-relaxed">{it}</li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </button>
                </Reveal>
              )
            })}
          </div>
        </div>

        <Reveal>
          <div className="relative overflow-hidden rounded-[28px] md:rounded-[36px] bg-ink text-white p-6 md:p-12">
            <div className="grid md:grid-cols-[1.2fr_1fr] gap-10 items-center">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-lime text-ink text-xs font-bold mb-5">EXIT ✦ 2026</span>
                <h3 className="font-display font-medium text-4xl md:text-6xl leading-[1] mb-4">{t.about.exitTitle}</h3>
                <p className="text-white/65 text-sm md:text-base leading-relaxed max-w-lg mb-8">{t.about.exitDesc}</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {t.about.exitStats.map((s) => (
                    <div key={s.l}>
                      <span className="block font-display font-semibold text-2xl md:text-3xl">{s.v}</span>
                      <span className="text-xs text-white/50">{s.l}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative h-56 md:h-72 hidden sm:block">
                {exitThumbs.map((src, k) => (
                  <motion.img
                    key={src}
                    src={src}
                    alt=""
                    onError={thumbFallback}
                    initial={{ opacity: 0, y: 40, rotate: 0 }}
                    whileInView={{ opacity: 1, y: 0, rotate: (k - 1) * 9 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.2 + k * 0.1, ease: EASE }}
                    className="absolute top-1/2 left-1/2 w-40 md:w-52 aspect-[3/4] object-cover rounded-[20px] border-4 border-white/10"
                    style={{ marginLeft: `${(k - 1) * 90 - 100}px`, marginTop: '-130px', zIndex: k === 1 ? 2 : 1 }}
                  />
                ))}
                <div className="absolute right-2 top-2 z-10"><Bubble tone="lime" right>@hamburg</Bubble></div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ============================================
// EXPERIENCE
// ============================================
function ExperienceSection({ t }: { t: Copy }) {
  return (
    <section id="deneyim" className="px-4 md:px-6 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <Heading kicker={t.experience.kicker} line1={t.experience.title} line2="" className="mb-4 md:mb-6" />

        <div className="rounded-[26px] md:rounded-[32px] bg-white px-5 md:px-10">
          {t.experience.jobs.map((exp, i) => (
            <Reveal key={exp.company} delay={i * 0.05}>
              <div className={`group grid md:grid-cols-[220px_1fr] gap-2 md:gap-10 py-6 md:py-8 ${i ? 'border-t border-black/[0.06]' : ''}`}>
                <span className="text-xs md:text-sm font-mono text-muted pt-1">{exp.period}</span>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-display font-semibold text-xl md:text-2xl">{exp.role}</h3>
                    {exp.isExit && <span className="px-2 py-0.5 rounded-full bg-lime text-[10px] md:text-xs font-bold">EXIT ✦</span>}
                  </div>
                  <p className="text-sm text-ink/50 mb-3">{exp.company} · {exp.place}</p>
                  <p className="text-sm text-ink/70 leading-relaxed max-w-2xl">{exp.highlight}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-3 md:gap-5 mt-3 md:mt-5">
          <Reveal className="rounded-[24px] bg-white p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-muted mb-3">{t.experience.eduTitle}</p>
            <p className="font-display font-semibold text-xl md:text-2xl">{t.experience.edu.school}</p>
            <p className="text-sm text-ink/60">{t.experience.edu.dept} · <span className="font-mono">{t.experience.edu.period}</span></p>
          </Reveal>
          <Reveal delay={0.08} className="rounded-[24px] bg-white p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-muted mb-3">{t.experience.langTitle}</p>
            <div className="flex flex-wrap gap-2">
              {t.experience.langs.map((l, k) => (
                <span key={l.l} className="inline-flex items-center gap-2 h-10 pl-4 pr-1.5 rounded-full bg-paper text-sm font-medium">
                  {l.l}
                  <span className={`px-2.5 py-1 rounded-full text-xs ${k ? 'bg-cobalt text-white' : 'bg-lime'}`}>{l.v}</span>
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// ============================================
// CONTACT
// ============================================
function ContactSection({ t }: { t: Copy }) {
  const rows = [
    { label: 'Email', value: 'yasin.aktas@outlook.com.tr', href: 'mailto:yasin.aktas@outlook.com.tr' },
    { label: t.contact.phone, value: '+90 530 465 39 74', href: 'tel:+905304653974' },
    { label: 'LinkedIn', value: '/in/yasinakkts', href: 'https://linkedin.com/in/yasinakkts' },
    { label: 'Instagram', value: '@yasinakkts', href: 'https://www.instagram.com/yasinakkts/' },
  ]
  return (
    <section id="iletisim" className="px-4 md:px-6 py-16 md:py-24">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-3 md:gap-5">
        <Reveal className="relative overflow-hidden rounded-[28px] md:rounded-[36px] min-h-[420px] md:min-h-[520px] bg-flame text-white">
          <img src={yt('KooyeFCgugQ')} alt="" onError={thumbFallback} className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-flame via-flame/40 to-transparent" />
          <div className="absolute top-6 right-6"><Bubble tone="ink" right>@yasin</Bubble></div>
          <div className="relative h-full flex flex-col justify-end p-6 md:p-10">
            <Kicker><span className="text-white/80">{t.contact.kicker}</span></Kicker>
            <h2 className="font-display font-medium text-5xl md:text-7xl leading-[0.95] mb-4">{t.contact.title1}<br />{t.contact.title2}</h2>
            <p className="text-white/80 text-sm md:text-base mb-6 max-w-sm">{t.contact.desc}</p>
            <a href="mailto:yasin.aktas@outlook.com.tr" className="self-start inline-flex items-center gap-2 h-12 px-6 rounded-full bg-white text-ink text-sm font-semibold hover:bg-lime transition-colors">
              {t.contact.email} <Arrow dir="upright" size={14} />
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="rounded-[28px] md:rounded-[36px] bg-white p-6 md:p-10 flex flex-col">
          <p className="font-display font-semibold text-2xl md:text-3xl mb-6">{t.contact.quick}</p>
          <div className="flex-1">
            {rows.map((r) => (
              <a
                key={r.label}
                href={r.href}
                target={r.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener"
                className="group flex items-center justify-between gap-4 py-4 md:py-5 border-b border-black/[0.06] last:border-0"
              >
                <span>
                  <span className="block text-xs text-muted mb-0.5">{r.label}</span>
                  <span className="block text-sm md:text-lg font-medium break-all">{r.value}</span>
                </span>
                <span className="shrink-0 w-10 h-10 rounded-full bg-paper flex items-center justify-center group-hover:bg-ink group-hover:text-white transition-colors">
                  <Arrow dir="upright" size={14} />
                </span>
              </a>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-2 text-sm text-ink/60">
            <span className="w-2 h-2 rounded-full bg-[#22C55E]" /> İstanbul, Türkiye
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ============================================
// FOOTER
// ============================================
function Footer({ t }: { t: Copy }) {
  return (
    <footer className="px-4 md:px-6 pt-6 pb-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-xs md:text-sm text-ink/50 pb-4">
          <span>{t.footer.rights}</span>
          <div className="flex items-center gap-5">
            <a href="https://linkedin.com/in/yasinakkts" target="_blank" rel="noopener" className="hover:text-ink transition-colors">LinkedIn</a>
            <a href="https://www.instagram.com/yasinakkts/" target="_blank" rel="noopener" className="hover:text-ink transition-colors">Instagram</a>
            <a href="#" className="inline-flex items-center gap-1 hover:text-ink transition-colors">{t.footer.top} <Arrow dir="up" size={12} /></a>
          </div>
          <span>{t.footer.from}</span>
        </div>
        <p className="font-display font-semibold text-center leading-[0.8] text-[17vw] lg:text-[13rem] text-ink/[0.06] select-none -mb-[0.12em]">
          yasin aktaş
        </p>
      </div>
    </footer>
  )
}

// ============================================
// VIDEO MODAL
// ============================================
function VideoModal({ project, label, onClose }: { project: Project; label: string; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const handleEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handleEsc)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleEsc)
    }
  }, [onClose])

  const embedUrl = project.isShort
    ? `https://www.youtube.com/embed/${project.youtubeId}?autoplay=1&loop=1&playlist=${project.youtubeId}`
    : `https://www.youtube.com/embed/${project.youtubeId}?autoplay=1`

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-paper/90 backdrop-blur-xl p-4"
      onClick={onClose}
    >
      <button onClick={onClose} aria-label="Close" className="absolute top-5 right-5 w-12 h-12 rounded-full bg-ink text-white flex items-center justify-center hover:bg-flame transition-colors z-10">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
      </button>

      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 30 }}
        transition={{ type: 'spring', stiffness: 220, damping: 26 }}
        className={project.isShort ? 'w-full max-w-[360px]' : 'w-full max-w-5xl'}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-end justify-between gap-4 mb-4">
          <div>
            <p className="text-xs text-muted">{label} · {project.year}</p>
            <h3 className="font-display font-semibold text-2xl md:text-3xl">{project.title}</h3>
          </div>
        </div>
        <div className="rounded-[24px] p-2 bg-white shadow-[0_40px_80px_-30px_rgba(0,0,0,0.45)]">
          <div className={`rounded-[18px] overflow-hidden bg-black ${project.isShort ? 'aspect-[9/16]' : 'aspect-video'}`}>
            <iframe
              src={embedUrl}
              title={project.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ============================================
// MAIN
// ============================================
export default function HomePage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [lang, setLang] = useState<Lang>('tr')
  const t = copy[lang] as Copy

  useEffect(() => { document.documentElement.lang = lang }, [lang])

  return (
    <>
      <ScrollProgress />
      <Navigation t={t} lang={lang} setLang={setLang} />

      <main>
        <HeroSection t={t} onPlay={() => setSelectedProject(reelProjects[0])} />
        <ShowreelSection t={t} onSelect={setSelectedProject} />
        <StatementSection t={t} />
        <WorkSection onSelect={setSelectedProject} t={t} />
        <Marquee items={t.marquee} />
        <ImpactSection t={t} />
        <ProductsSection t={t} />
        <AboutSection t={t} />
        <ExperienceSection t={t} />
        <ContactSection t={t} />
      </main>

      <Footer t={t} />

      <AnimatePresence>
        {selectedProject && (
          <VideoModal
            project={selectedProject}
            label={t.projects.cats[selectedProject.category]}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
