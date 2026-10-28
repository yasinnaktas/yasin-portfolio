'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion'

// ============================================
// I18N COPY
// ============================================
type Lang = 'tr' | 'en'
type CategoryKey = 'ad' | 'food' | 'brand' | 'threeD' | 'motion' | 'drone' | 'social' | 'ai' | 'doc'

const copy = {
  tr: {
    nav: { projects: 'İşler', impact: 'Etki', products: 'Ürünler', about: 'Hakkımda', experience: 'Jenerik', contact: 'İletişim' },
    hero: {
      role: 'Head of Creative — Creative Director',
      sub: 'Reklam filmi, 3D, drone ve yapay zekayla markaları izlenen hikâyelere dönüştürüyorum. İstanbul’dan Miami ve Cidde’ye; 1000+ marka, 50M+ izlenme.',
      reel: 'Showreel',
      location: 'İstanbul — 41.00° N 28.97° E',
    },
    // *word* renders italic
    statement: 'Kameranın arkasından başladım; sahada *çektim,* kurguladım, yayına hazırladım. Sonra kendi ajansımı kurdum, 10 kişilik ekibi yönettim ve 1000+ markaya *hikâye* anlattım. Bugün yapay zekayı üretimin *merkezine* koyuyorum.',
    projects: {
      kicker: 'Seçili işler',
      title1: 'Seçili',
      title2: 'işler.',
      meta: 'film — 2026',
      all: 'Tümü',
      watch: 'İzle',
      archive: 'Arşiv',
      archiveMeta: 'Turkuvaz Medya & ajans dönemi',
      cats: { ad: 'Reklam Filmi', food: 'Restoran & F&B', brand: 'Tanıtım Filmi', threeD: '3D Animasyon', motion: 'Motion Graphic', drone: 'Drone', social: 'Sosyal Medya', ai: 'AI Video', doc: 'Belgesel' } as Record<CategoryKey, string>,
    },
    marquee: ['Reklam Filmi', '3D Animasyon', 'Drone', 'Motion Graphic', 'Restoran Filmleri', 'AI Video', 'Post-Prodüksiyon'],
    impact: {
      kicker: 'Etki',
      title1: 'Rakamlarla',
      title2: 'beş yıl.',
      stats: [
        { v: '1000+', l: 'Marka', d: 'Hizmet verilen toplam marka' },
        { v: '50M+', l: 'İzlenme', d: 'İçeriklerin ulaştığı toplam izlenme' },
        { v: '500+', l: 'Video', d: 'Teslim edilen tamamlanmış video' },
        { v: '10', l: 'Kişilik ekip', d: 'Doğrudan yönettiğim ekip' },
        { v: '15M₺', l: 'Bütçe', d: 'Yönetilen medya bütçesi' },
        { v: '+%35', l: 'Etkileşim', d: 'Optimize kampanyalarda ortalama artış' },
      ],
    },
    products: {
      kicker: 'Ürünler',
      title1: 'Fikirden',
      title2: 'App Store’a.',
      desc: 'Prodüksiyon birikimimi ürün vizyonuyla birleştirip, yapay zeka destekli geliştirmeyle üç iOS uygulamasını uçtan uca yayına aldım.',
      apps: [
        { name: 'Speego', tag: 'Yapay zeka konuşma koçu', icon: '/apps/speego.png',
          desc: '30 saniyelik video kaydından ton, akıcılık, beden dili ve netlik analizi. Mülakat ve sunum hazırlığı için kişisel geri bildirim.' },
        { name: 'Sanal Drone', tag: 'Gayrimenkul pazarlama', icon: '/apps/sanal-drone.png',
          desc: 'Arsa ve gayrimenkul ilanlarını saniyeler içinde pazarlama içeriğine çevirir: haritadan alan hesabı, hazır görseller, drone tanıtım videoları.' },
        { name: 'Someday', tag: 'Şifreli mesaj kasası', icon: '/apps/someday.png',
          desc: 'Sevdiklerinize video, ses ve mektup mesajları; belirlediğiniz tarihte ya da güvenilir kişilerin onayıyla iletilir. Gizlilik esaslı.' },
      ],
    },
    about: {
      kicker: 'Hakkımda',
      title1: 'Üretimden',
      title2: 'yönetime.',
      desc: 'Medya kuruluşlarında 4 yıl Kreatif Videographer olarak marka kampanyaları ve haber içerikleri ürettim; teknik becerilerimi gazetecilik perspektifiyle birleştirdim. Kariyerimdeki en büyük dönüşüm, kurucusu olduğum Creative Touch Productions ile geldi: içerik üreten değil, süreci yöneten tarafa geçtim.',
      areas: [
        { title: 'Kreatif liderlik', items: ['10 kişilik cross-functional ekip, 15M₺+ medya bütçesi', 'Neyi test edeceğine, ölçekleyeceğine, durduracağına veriyle karar', 'Kriz anında çözüm, farklı müşteri dinamiklerine hızlı adaptasyon'] },
        { title: 'Performans & içerik', items: ['İzleyici davranışı; YouTube, Instagram, TikTok algoritmaları', 'Platforma özel hook, tempo ve format', 'UGC yönetimi ve yerel pazar içgörüsü'] },
        { title: 'Yapay zeka', items: ['AI destekli reklam filmi, 3D ve animasyon', 'Şirketlerin yapay zeka dönüşümünde yönetici vizyonu', 'Fikirden App Store’a iOS ürünler'] },
        { title: 'Prodüksiyon', items: ['Profesyonel kamera ve drone ile 500+ video', 'Premiere Pro, After Effects ile kurgu ve VFX', 'Canva / CapCut ile hızlı sosyal üretim'] },
      ],
      exitKicker: 'Exit — Ocak 2026',
      exitTitle1: 'Sıfırdan kuruldu,',
      exitTitle2: 'satın alındı.',
      exitDesc: 'Creative Touch Productions, 1000’den fazla markaya reklam filmi, yapay zeka destekli video ve dijital danışmanlık sundu. Ajans, Ocak 2026’da Hamburg merkezli bir teknoloji şirketi tarafından satın alındı.',
      exitStats: [ { v: '1000+', l: 'Marka' }, { v: '10', l: 'Kişilik ekip' }, { v: '15M₺', l: 'Reklam bütçesi' }, { v: '50M+', l: 'İzlenme' } ],
    },
    experience: {
      kicker: 'Jenerik',
      title1: 'Rol',
      title2: 'dağılımı.',
      jobs: [
        { role: 'Kurucu & Creative Director', company: 'Creative Touch Productions', period: 'Mart 2025 — Ocak 2026', isExit: true,
          highlight: 'Yapay zeka destekli reklam filmi ve animasyonda uzmanlaşmış ajansı kurdum ve yönettim. 10 kişilik ekiple 1000+ markaya içerik stratejisi, YouTube ve Instagram üretimi, proje yönetimi ve müşteri ilişkileri.' },
        { role: 'Kreatif Videographer', company: 'Turkuvaz Medya', period: 'Ekim 2021 — Mayıs 2025', isExit: false,
          highlight: 'Sabah, ATV ve A Haber için marka kampanyaları ve günlük editoryal içerik; kamera ve drone çekimleri, Premiere Pro ve After Effects ile 500+ video.' },
        { role: 'Post Prodüksiyon Editörü', company: 'Matte Post Productions', period: 'Eylül 2020 — Kasım 2020', isExit: false,
          highlight: 'Post-prodüksiyon ekibinde kurgu süreçlerinde görev aldım.' },
        { role: 'Stajyer', company: 'TV8 / Acun Medya', period: 'Haziran 2020 — Ağustos 2020', isExit: false,
          highlight: 'TV yayın planlaması ve organizasyon; stüdyo ve dış çekimlerde asistanlık.' },
      ],
      eduTitle: 'Eğitim',
      edu: { school: 'İstanbul Kültür Üniversitesi', dept: 'Radyo ve Televizyon Teknolojisi', period: '2018 — 2020' },
      langTitle: 'Diller',
      langs: [ { l: 'Türkçe', v: 'Ana dil' }, { l: 'İngilizce', v: 'Profesyonel' } ],
    },
    contact: {
      kicker: 'İletişim',
      title1: 'Birlikte',
      title2: 'çalışalım.',
      desc: 'Kreatif liderlik pozisyonları, danışmanlık ve iş birlikleri için.',
      phone: 'Telefon',
    },
    footer: { rights: '© 2026 Yasin Aktaş', from: 'İstanbul’da çekildi', top: 'Başa dön' },
  },
  en: {
    nav: { projects: 'Work', impact: 'Impact', products: 'Products', about: 'About', experience: 'Credits', contact: 'Contact' },
    hero: {
      role: 'Head of Creative — Creative Director',
      sub: 'I turn brands into stories people watch, with ad films, 3D, drone and AI. From Istanbul to Miami and Jeddah; 1000+ brands, 50M+ views.',
      reel: 'Showreel',
      location: 'Istanbul — 41.00° N 28.97° E',
    },
    statement: 'I started behind the camera; *shooting* in the field, editing, getting stories on air. Then I founded my own agency, led a team of 10 and told *stories* for 1000+ brands. Today I put AI at the *heart* of production.',
    projects: {
      kicker: 'Selected work',
      title1: 'Selected',
      title2: 'work.',
      meta: 'films — 2026',
      all: 'All',
      watch: 'Watch',
      archive: 'Archive',
      archiveMeta: 'Turkuvaz Media & agency years',
      cats: { ad: 'Ad Film', food: 'Restaurant & F&B', brand: 'Promo Film', threeD: '3D Animation', motion: 'Motion Graphic', drone: 'Drone', social: 'Social Media', ai: 'AI Video', doc: 'Documentary' } as Record<CategoryKey, string>,
    },
    marquee: ['Ad Films', '3D Animation', 'Drone', 'Motion Graphics', 'Restaurant Films', 'AI Video', 'Post-Production'],
    impact: {
      kicker: 'Impact',
      title1: 'Five years',
      title2: 'in numbers.',
      stats: [
        { v: '1000+', l: 'Brands', d: 'Total brands served' },
        { v: '50M+', l: 'Views', d: 'Total views reached by content' },
        { v: '500+', l: 'Videos', d: 'Finished videos delivered' },
        { v: '10', l: 'Person team', d: 'Team under my direct lead' },
        { v: '15M₺', l: 'Budget', d: 'Media budget managed' },
        { v: '+35%', l: 'Engagement', d: 'Average lift on optimised campaigns' },
      ],
    },
    products: {
      kicker: 'Products',
      title1: 'From idea',
      title2: 'to the App Store.',
      desc: 'Combining production experience with product vision, I shipped three iOS apps end to end with AI-assisted development.',
      apps: [
        { name: 'Speego', tag: 'AI speaking coach', icon: '/apps/speego.png',
          desc: 'Analyses tone, fluency, body language and clarity from a 30-second video. Personal feedback for interviews and presentations.' },
        { name: 'Sanal Drone', tag: 'Real estate marketing', icon: '/apps/sanal-drone.png',
          desc: 'Turns land and property listings into marketing content in seconds: map-based area calculation, ready visuals, aerial promo videos.' },
        { name: 'Someday', tag: 'Encrypted message vault', icon: '/apps/someday.png',
          desc: 'Video, voice and letter messages for loved ones, delivered on a chosen date or with trusted contacts’ approval. Privacy-first.' },
      ],
    },
    about: {
      kicker: 'About',
      title1: 'From production',
      title2: 'to leadership.',
      desc: 'I spent 4 years as a Creative Videographer at media organisations, producing brand campaigns and news content with a journalist’s eye. The biggest shift came with Creative Touch Productions, the agency I founded: I moved from making the content to running the process.',
      areas: [
        { title: 'Creative leadership', items: ['10-person cross-functional team, 15M₺+ media budget', 'Data-led calls on what to test, scale or stop', 'Problem-solving under pressure, fast adaptation to clients'] },
        { title: 'Performance & content', items: ['Audience behaviour; YouTube, Instagram, TikTok algorithms', 'Platform-native hooks, pacing and formats', 'UGC direction and local-market insight'] },
        { title: 'AI', items: ['AI-assisted ad films, 3D and animation', 'Executive lens on companies’ AI transformation', 'iOS products from idea to the App Store'] },
        { title: 'Production', items: ['500+ videos with professional camera and drone', 'Editing and VFX in Premiere Pro and After Effects', 'Fast social production with Canva / CapCut'] },
      ],
      exitKicker: 'Exit — January 2026',
      exitTitle1: 'Built from zero,',
      exitTitle2: 'acquired.',
      exitDesc: 'Creative Touch Productions delivered ad films, AI-assisted video and digital consultancy to over 1,000 brands. The agency was acquired by a Hamburg-based technology company in January 2026.',
      exitStats: [ { v: '1000+', l: 'Brands' }, { v: '10', l: 'Person team' }, { v: '15M₺', l: 'Ad budget' }, { v: '50M+', l: 'Views' } ],
    },
    experience: {
      kicker: 'Credits',
      title1: 'The',
      title2: 'cast.',
      jobs: [
        { role: 'Founder & Creative Director', company: 'Creative Touch Productions', period: 'Mar 2025 — Jan 2026', isExit: true,
          highlight: 'Founded and ran an agency specialising in AI-assisted ad films and animation. Led a 10-person team delivering content strategy, YouTube and Instagram production, project management and client relations for 1000+ brands.' },
        { role: 'Creative Videographer', company: 'Turkuvaz Media', period: 'Oct 2021 — May 2025', isExit: false,
          highlight: 'Brand campaigns and daily editorial content for Sabah, ATV and A Haber; camera and drone shoots, 500+ videos in Premiere Pro and After Effects.' },
        { role: 'Post-Production Editor', company: 'Matte Post Productions', period: 'Sep 2020 — Nov 2020', isExit: false,
          highlight: 'Worked on editing within the post-production team.' },
        { role: 'Intern', company: 'TV8 / Acun Media', period: 'Jun 2020 — Aug 2020', isExit: false,
          highlight: 'TV broadcast planning and organisation; assisted on studio and location shoots.' },
      ],
      eduTitle: 'Education',
      edu: { school: 'Istanbul Kültür University', dept: 'Radio and Television Technology', period: '2018 — 2020' },
      langTitle: 'Languages',
      langs: [ { l: 'Turkish', v: 'Native' }, { l: 'English', v: 'Professional' } ],
    },
    contact: {
      kicker: 'Contact',
      title1: 'Let’s work',
      title2: 'together.',
      desc: 'For creative leadership roles, consultancy and collaborations.',
      phone: 'Phone',
    },
    footer: { rights: '© 2026 Yasin Aktaş', from: 'Shot in Istanbul', top: 'Back to top' },
  },
}

type Copy = typeof copy.tr

const EASE = [0.22, 1, 0.36, 1] as const

// ============================================
// THUMBNAIL FALLBACK — maxresdefault yoksa hqdefault'a düş
// ============================================
const thumbFallback = (e: React.SyntheticEvent<HTMLImageElement>) => {
  const img = e.currentTarget
  if (img.src.includes('maxresdefault')) {
    img.src = img.src.replace('maxresdefault', 'hqdefault')
  }
}

const yt = (id: string) => `https://img.youtube.com/vi/${id}/maxresdefault.jpg`

// ============================================
// PROJECT DATA
// ============================================
// Self-hosted work: /public/videos/<slug>.mp4 + <slug>.jpg poster. `secs` is the clip length.
type Work = {
  slug: string
  client: string
  place?: string
  title: string
  category: CategoryKey
  secs: number
  vertical: boolean
}

const works: Work[] = [
  { slug: '03-kamuran-mekan-tanitim', client: 'Kamuran', place: 'İstanbul', title: 'Mekân Tanıtım Filmi', category: 'brand', secs: 27, vertical: false },
  { slug: '10-hepsiburada-3d-animasyon', client: 'Hepsiburada', title: '3D Animasyon Reklam', category: 'threeD', secs: 26, vertical: false },
  { slug: '14-statement-coffee', client: 'STATEMENT Coffee', title: 'Behind Every Plate', category: 'food', secs: 18, vertical: false },
  { slug: '12-claudie-miami', client: 'CLAUDIE', place: 'Miami', title: 'Weekday Lunch', category: 'food', secs: 13, vertical: true },
  { slug: '15-mamush-ribeye', client: 'Mamush', title: 'Prime Cut Ribeye', category: 'food', secs: 16, vertical: true },
  { slug: '13-mr-hakans-jeddah', client: 'Mr.Hakans', place: 'Jeddah', title: 'Something Better', category: 'food', secs: 12, vertical: true },
  { slug: '07-ibb-bulgur-palas-drone', client: 'İBB', place: 'Bulgur Palas', title: 'Drone Tanıtım', category: 'drone', secs: 59, vertical: true },
  { slug: '02-kamuran-kruvasan', client: 'Kamuran', title: 'Kruvasan', category: 'ad', secs: 23, vertical: true },
  { slug: '08-zuber-3d-urun-filmi', client: 'Züber', title: '3D Ürün Filmi', category: 'threeD', secs: 10, vertical: true },
  { slug: '11-isijet-motion-graphic', client: 'Isıjet', title: 'Kurutma Çözümleri', category: 'motion', secs: 31, vertical: true },
  { slug: '01-recrea-sosyal-medya', client: 'Recrea', title: 'İncirli & Cevizli Kurabiye', category: 'ad', secs: 11, vertical: true },
  { slug: '09-linde-29-ekim', client: 'Linde', title: '29 Ekim Cumhuriyet Bayramı', category: 'social', secs: 47, vertical: true },
  { slug: '04-kamuran-kreatif-kisa-film', client: 'Kamuran', title: 'Cadılar Bayramı', category: 'social', secs: 7, vertical: true },
]

// Earlier YouTube-hosted work
type ArchiveItem = { id: number; title: string; category: CategoryKey; youtubeId: string; thumbnail: string; year: string; isShort?: boolean }

const archive: ArchiveItem[] = [
  { id: 1, title: 'AI Creative Project', category: 'ad', youtubeId: 'KooyeFCgugQ', thumbnail: yt('KooyeFCgugQ'), year: '2026' },
  { id: 8, title: 'Brand Film', category: 'ai', youtubeId: 'AKoHR01gtTo', thumbnail: yt('AKoHR01gtTo'), year: '2026' },
  { id: 7, title: 'Product Launch Film', category: 'ad', youtubeId: 'Jmonxy8U3mU', thumbnail: '/thumbnails/thumb7.jpg', year: '2024' },
  { id: 4, title: 'Social Media Series', category: 'social', youtubeId: 'vrYuv7i9HUM', thumbnail: '/thumbnails/thumb4.jpg', year: '2023' },
  { id: 5, title: 'Corporate Documentary', category: 'doc', youtubeId: 'K2H-thz48TI', thumbnail: '/thumbnails/thumb5.jpg', year: '2023' },
  { id: 3, title: 'AI-Powered Commercial', category: 'ai', youtubeId: '8-YxCmFjRLA', thumbnail: '/thumbnails/thumb3.jpg', year: '2024', isShort: true },
]

type Playing = { kind: 'file'; work: Work } | { kind: 'yt'; item: ArchiveItem }

const vsrc = (slug: string) => `/videos/${slug}.mp4`
const vposter = (slug: string) => `/videos/${slug}.jpg`
const dur = (s: number) => `00:${String(s).padStart(2, '0')}`

const clients = ['Hepsiburada', 'İBB', 'Linde', 'CLAUDIE Miami', 'Mr.Hakans Jeddah', 'Mamush', 'STATEMENT Coffee', 'Isıjet', 'Züber', 'Kamuran', 'Recrea', 'Turkuvaz Medya']

// ============================================
// PRIMITIVES
// ============================================
const wrap = 'max-w-[1440px] mx-auto px-5 md:px-10'

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Line-mask reveal for display type
function MaskLine({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    // The observer sits on the visible mask; the clipped inner line can't be observed itself
    <motion.span initial="hidden" whileInView="shown" viewport={{ once: true, margin: '-40px' }} className={`block overflow-hidden pb-[0.12em] -mb-[0.06em] ${className}`}>
      <motion.span
        variants={{ hidden: { y: '105%' }, shown: { y: 0 } }}
        transition={{ duration: 1.1, delay, ease: EASE }}
        className="block"
      >
        {children}
      </motion.span>
    </motion.span>
  )
}

// Every section opens the same way: hairline, mono index row, serif title
function SectionHead({ index, kicker, line1, line2, aside }: { index: string; kicker: string; line1: string; line2: string; aside?: React.ReactNode }) {
  return (
    <div className="mb-12 md:mb-20">
      <div className="flex items-center justify-between border-t border-bone/15 pt-4 mb-8 md:mb-12 meta text-bone/50">
        <span>({index}) &nbsp;{kicker}</span>
        {aside && <span>{aside}</span>}
      </div>
      <h2 className="display text-[15vw] md:text-[9vw] lg:text-[8.5rem]">
        <MaskLine>{line1}</MaskLine>
        <MaskLine delay={0.08} className="italic text-bone/45 pl-[8vw] md:pl-[6vw]">{line2}</MaskLine>
      </h2>
    </div>
  )
}

function PlayIcon({ size = 14 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><polygon points="6,4 20,12 6,20" /></svg>
}

function Arrow({ dir = 'right', size = 16 }: { dir?: 'right' | 'up' | 'upright' | 'down'; size?: number }) {
  const rot = { right: 0, up: -90, upright: -45, down: 90 }[dir]
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${rot}deg)` }}>
      <path d="M5 12h14" /><path d="m13 6 6 6-6 6" />
    </svg>
  )
}

function RecDot() {
  return (
    <span className="relative inline-flex w-2 h-2">
      <span className="absolute inset-0 rounded-full bg-rec animate-ping opacity-70" />
      <span className="relative w-2 h-2 rounded-full bg-rec" />
    </span>
  )
}

// Running SMPTE-style timecode (25 fps)
function Timecode() {
  const [tc, setTc] = useState('00:00:00:00')
  useEffect(() => {
    const start = performance.now()
    const id = setInterval(() => {
      const f = Math.floor((performance.now() - start) / 40)
      const p = (n: number) => String(n).padStart(2, '0')
      setTc(`${p(Math.floor(f / 90000))}:${p(Math.floor(f / 1500) % 60)}:${p(Math.floor(f / 25) % 60)}:${p(f % 25)}`)
    }, 40)
    return () => clearInterval(id)
  }, [])
  return <span className="tabular-nums">{tc}</span>
}

// Camera viewfinder corner marks
function Viewfinder() {
  const c = 'absolute w-5 h-5 md:w-7 md:h-7 border-bone/60'
  return (
    <div className="pointer-events-none absolute inset-4 md:inset-8 z-10">
      <span className={`${c} top-0 left-0 border-t border-l`} />
      <span className={`${c} top-0 right-0 border-t border-r`} />
      <span className={`${c} bottom-0 left-0 border-b border-l`} />
      <span className={`${c} bottom-0 right-0 border-b border-r`} />
    </div>
  )
}

// ============================================
// SCROLL PROGRESS
// ============================================
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return <motion.div className="fixed top-0 left-0 right-0 h-px z-[60] origin-left bg-rec" style={{ scaleX }} />
}

// ============================================
// NAVIGATION
// ============================================
function Navigation({ t, lang, setLang }: { t: Copy; lang: Lang; setLang: (l: Lang) => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className={`fixed top-0 inset-x-0 z-50 transition-colors duration-500 ${scrolled ? 'bg-night/80 backdrop-blur-xl' : 'bg-transparent'}`}
      >
        <div className={`${wrap} h-14 md:h-16 flex items-center justify-between`}>
          <a href="#" className="display text-2xl md:text-[1.7rem] leading-none tracking-[-0.02em]">
            Yasin Aktaş
          </a>

          <div className="hidden md:flex items-center gap-7 meta">
            {navLinks.map((item, i) => (
              <a key={item.href} href={item.href} className="text-bone/55 hover:text-bone transition-colors">
                <span className="text-bone/30 mr-1">0{i + 1}</span>{item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4 meta">
            <button onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')} className="text-bone/55 hover:text-bone transition-colors" aria-label="Change language">
              {lang === 'tr' ? 'EN' : 'TR'}
            </button>
            <a href="#iletisim" className="hidden md:inline-flex items-center gap-2 text-bone hover:text-rec transition-colors">
              <RecDot /> {t.nav.contact}
            </a>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden w-9 h-9 flex items-center justify-end" aria-label="Menu">
              <div className="space-y-1.5">
                <motion.span animate={{ rotate: mobileMenuOpen ? 45 : 0, y: mobileMenuOpen ? 4 : 0 }} className="block w-6 h-px bg-bone" />
                <motion.span animate={{ rotate: mobileMenuOpen ? -45 : 0, y: mobileMenuOpen ? -3 : 0 }} className="block w-6 h-px bg-bone" />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-night pt-20 px-5 md:hidden">
            {[...navLinks, { label: t.nav.contact, href: '#iletisim' }].map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, ease: EASE }}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-baseline gap-4 py-3 border-b border-bone/10"
              >
                <span className="meta text-bone/40">0{i + 1}</span>
                <span className="display text-5xl">{item.label}</span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ============================================
// HERO — full-bleed film, name as title card
// ============================================
function HeroSection({ t, onReel }: { t: Copy; onReel: () => void }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const textY = useTransform(scrollYProgress, [0, 1], [0, 140])
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[620px] overflow-hidden">
      <motion.div style={{ scale: videoScale }} className="absolute inset-0">
        <video className="absolute inset-0 w-full h-full object-cover" src="/videos/hero-loop.mp4" poster={vposter('03-kamuran-mekan-tanitim')} autoPlay muted loop playsInline />
      </motion.div>
      <div className="absolute inset-0 bg-night/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-night via-transparent to-night/40" />
      <Viewfinder />

      {/* Top meta row */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }} className="absolute top-20 md:top-24 inset-x-0 z-10">
        <div className={`${wrap} flex justify-between meta text-bone/70`} lang="en">
          <span className="flex items-center gap-2"><RecDot /> REC</span>
          <span className="hidden md:inline">{t.hero.role}</span>
          <span>4K · 25FPS</span>
        </div>
      </motion.div>

      <motion.div style={{ y: textY, opacity: fade }} className={`relative z-10 h-full ${wrap} flex flex-col justify-end pb-20 md:pb-24`}>
        <p className="meta text-bone/70 mb-3 md:hidden" lang="en">{t.hero.role}</p>
        <h1 className="display text-[length:min(29vw,30svh)] md:text-[length:min(21vw,32svh)] leading-[0.8] -ml-[0.05em]">
          <span className="block overflow-hidden">
            <motion.span initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ duration: 1.3, delay: 0.15, ease: EASE }} className="block">Yasin</motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.14em] text-right md:-mt-[0.12em]">
            <motion.span initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ duration: 1.3, delay: 0.3, ease: EASE }} className="block italic">Aktaş</motion.span>
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.9, ease: EASE }}
          className="mt-6 md:mt-4 grid md:grid-cols-[1fr_auto] gap-6 items-end"
        >
          <p className="max-w-md text-[15px] md:text-base text-bone/80 leading-relaxed">{t.hero.sub}</p>
          <button onClick={onReel} className="group inline-flex items-center gap-4 justify-self-start">
            <span className="relative w-16 h-16 md:w-20 md:h-20 rounded-full border border-bone/40 flex items-center justify-center pl-1 transition-all duration-500 group-hover:bg-bone group-hover:text-night">
              <PlayIcon size={16} />
            </span>
            <span className="meta">{t.hero.reel} <span className="text-bone/50">· 00:27</span></span>
          </button>
        </motion.div>
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className={`${wrap} h-14 flex items-center justify-between meta text-bone/50`}>
          <span className="hidden sm:inline">{t.hero.location}</span>
          <span className="sm:hidden">İST</span>
          <Timecode />
          <a href="#projeler" className="inline-flex items-center gap-2 hover:text-bone transition-colors"><Arrow dir="down" size={12} /></a>
        </div>
      </div>
    </section>
  )
}

// ============================================
// CLIENT STRIP
// ============================================
function ClientStrip() {
  const doubled = [...clients, ...clients]
  return (
    <div className="border-y border-bone/10 py-5 overflow-hidden">
      <motion.div animate={{ x: ['0%', '-50%'] }} transition={{ duration: 45, repeat: Infinity, ease: 'linear' }} className="flex whitespace-nowrap w-max meta text-bone/45">
        {doubled.map((c, i) => (
          <span key={i} className="pr-8 md:pr-12">{c} <span className="text-bone/20 pl-8 md:pl-12">/</span></span>
        ))}
      </motion.div>
    </div>
  )
}

// ============================================
// SCROLL-REVEAL STATEMENT
// ============================================
function RevealWord({ children, progress, range, italic }: { children: React.ReactNode; progress: MotionValue<number>; range: [number, number]; italic: boolean }) {
  const opacity = useTransform(progress, range, [0.14, 1])
  return <motion.span style={{ opacity }} className={`inline-block mr-[0.22em] ${italic ? 'italic' : ''}`}>{children}</motion.span>
}

function StatementSection({ t }: { t: Copy }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.5'] })
  const words = t.statement.split(' ')
  const n = words.length

  return (
    <section className="py-28 md:py-44">
      <div ref={ref} className={wrap}>
        <p className="display text-[10.5vw] leading-[1] md:text-[5.6vw] lg:text-[5.2rem] max-w-[1200px]">
          {words.map((w, k) => {
            const italic = w.startsWith('*')
            return (
              <RevealWord key={k} progress={scrollYProgress} range={[k / n, Math.min(1, (k + 1.5) / n)]} italic={italic}>
                {w.replace(/\*/g, '')}
              </RevealWord>
            )
          })}
        </p>
      </div>
    </section>
  )
}

// ============================================
// WORK — self-hosted video cards
// ============================================
function useCanHover() {
  const [canHover, setCanHover] = useState(true)
  useEffect(() => { setCanHover(window.matchMedia('(hover: hover) and (pointer: fine)').matches) }, [])
  return canHover
}

function WorkCard({ work, label, watch, onPlay, canHover, aspect, autoplay = false }: { work: Work; label: string; watch: string; onPlay: (w: Work) => void; canHover: boolean; aspect: string; autoplay?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const boxRef = useRef<HTMLButtonElement>(null)
  const no = String(works.indexOf(work) + 1).padStart(2, '0')

  // Featured cards, and every card on touch devices, play while on screen
  useEffect(() => {
    if ((canHover && !autoplay) || !boxRef.current) return
    const io = new IntersectionObserver(([e]) => {
      const v = videoRef.current
      if (!v) return
      if (e.isIntersecting) v.play().catch(() => {})
      else v.pause()
    }, { threshold: 0.5 })
    io.observe(boxRef.current)
    return () => io.disconnect()
  }, [canHover, autoplay])

  const start = () => { if (canHover && !autoplay) videoRef.current?.play().catch(() => {}) }
  const stop = () => { if (canHover && !autoplay) videoRef.current?.pause() }

  return (
    <motion.button
      ref={boxRef}
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: EASE }}
      onMouseEnter={start}
      onMouseLeave={stop}
      onClick={() => onPlay(work)}
      className="group relative block w-full text-left"
    >
      <div className={`relative overflow-hidden bg-coal ${aspect}`}>
        <video
          ref={videoRef}
          src={vsrc(work.slug)}
          poster={vposter(work.slug)}
          muted
          loop
          playsInline
          preload={autoplay ? 'metadata' : 'none'}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-night/10 group-hover:bg-transparent transition-colors duration-500" />
        <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <span className="meta inline-flex items-center gap-2 px-4 h-9 rounded-full bg-bone text-night"><PlayIcon size={9} /> {watch}</span>
        </span>
        <span className="absolute top-3 left-3 meta text-bone/80 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-rec" />{dur(work.secs)}</span>
      </div>
      <div className="pt-3 md:pt-4">
        <div className="flex justify-between gap-3 meta text-bone/45 mb-1.5">
          <span className="truncate">{no} — {work.client}{work.place ? ` · ${work.place}` : ''}</span>
          {!work.vertical && <span className="shrink-0 hidden sm:inline">{label}</span>}
        </div>
        <h3 className="display text-2xl md:text-[2rem] leading-[1] transition-colors group-hover:text-bone text-bone/90">{work.title}</h3>
      </div>
    </motion.button>
  )
}

function WorkSection({ t, onPlay, onArchive }: { t: Copy; onPlay: (w: Work) => void; onArchive: (a: ArchiveItem) => void }) {
  const canHover = useCanHover()
  const used = Array.from(new Set(works.map(w => w.category)))
  const [active, setActive] = useState<CategoryKey | 'all'>('all')
  const filtered = active === 'all' ? works : works.filter(w => w.category === active)
  const [feature, ...restFilms] = filtered.filter(w => !w.vertical)
  const verticals = filtered.filter(w => w.vertical)
  const count = (c: CategoryKey | 'all') => c === 'all' ? works.length : works.filter(w => w.category === c).length
  const card = { watch: t.projects.watch, onPlay, canHover }

  return (
    <section id="projeler" className="pt-10 pb-24 md:pb-40">
      <div className={wrap}>
        <SectionHead index="01" kicker={t.projects.kicker} line1={t.projects.title1} line2={t.projects.title2} aside={`${works.length} ${t.projects.meta}`} />

        <div className="flex gap-5 md:gap-7 overflow-x-auto no-scrollbar mb-10 md:mb-14 -mx-5 px-5 md:mx-0 md:px-0 meta">
          {(['all', ...used] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`relative shrink-0 pb-2 transition-colors ${active === cat ? 'text-bone' : 'text-bone/40 hover:text-bone/80'}`}
            >
              {cat === 'all' ? t.projects.all : t.projects.cats[cat]} <span className="text-bone/30">({count(cat)})</span>
              {active === cat && <motion.span layoutId="tab" className="absolute left-0 right-0 bottom-0 h-px bg-rec" />}
            </button>
          ))}
        </div>

        <AnimatePresence mode="popLayout">
          {feature && (
            <div key={`f-${feature.slug}`} className="mb-12 md:mb-20">
              <WorkCard work={feature} label={t.projects.cats[feature.category]} aspect="aspect-[4/3] md:aspect-[2.39/1]" autoplay {...card} />
            </div>
          )}
        </AnimatePresence>

        {restFilms.length > 0 && (
          <div className="grid md:grid-cols-2 gap-x-5 md:gap-x-8 gap-y-12 mb-12 md:mb-20">
            <AnimatePresence mode="popLayout">
              {restFilms.map((w) => <WorkCard key={w.slug} work={w} label={t.projects.cats[w.category]} aspect="aspect-video" {...card} />)}
            </AnimatePresence>
          </div>
        )}

        {verticals.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 md:gap-x-6 gap-y-10 md:gap-y-14">
            <AnimatePresence mode="popLayout">
              {verticals.map((w, i) => (
                <div key={w.slug} className={(i % 5) % 2 ? 'lg:mt-24' : ''}>
                  <WorkCard work={w} label={t.projects.cats[w.category]} aspect="aspect-[9/16]" {...card} />
                </div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Archive */}
        <div className="mt-28 md:mt-48">
          <div className="flex items-baseline justify-between border-t border-bone/15 pt-4 mb-8">
            <h3 className="display text-4xl md:text-6xl">{t.projects.archive}</h3>
            <span className="meta text-bone/45">{t.projects.archiveMeta}</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 md:gap-x-6 gap-y-8">
            {archive.map((a, i) => (
              <Reveal key={a.id} delay={(i % 3) * 0.05}>
                <button onClick={() => onArchive(a)} className="group block w-full text-left">
                  <div className="relative aspect-video overflow-hidden bg-coal">
                    <img src={a.thumbnail} alt={a.title} onError={thumbFallback} loading="lazy" className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105" />
                  </div>
                  <div className="flex justify-between gap-2 pt-3 meta text-bone/45">
                    <span className="truncate">{t.projects.cats[a.category]}</span>
                    <span>{a.year}</span>
                  </div>
                  <p className="display text-xl md:text-2xl mt-1 text-bone/80 group-hover:text-bone transition-colors">{a.title}</p>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================
// MARQUEE
// ============================================
function Marquee({ items }: { items: readonly string[] }) {
  const doubled = [...items, ...items]
  return (
    <section className="py-8 md:py-12 overflow-hidden border-y border-bone/10">
      <motion.div animate={{ x: ['0%', '-50%'] }} transition={{ duration: 55, repeat: Infinity, ease: 'linear' }} className="flex whitespace-nowrap w-max">
        {doubled.map((item, i) => (
          <span key={i} className={`display text-[18vw] md:text-[10rem] leading-[1] pr-[0.35em] ${i % 2 ? 'italic text-bone/25' : 'text-bone'}`}>
            {item}
          </span>
        ))}
      </motion.div>
    </section>
  )
}

// ============================================
// IMPACT
// ============================================
function ImpactSection({ t }: { t: Copy }) {
  return (
    <section id="etki" className="pt-24 md:pt-40 pb-24 md:pb-40">
      <div className={wrap}>
        <SectionHead index="02" kicker={t.impact.kicker} line1={t.impact.title1} line2={t.impact.title2} />
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-5 md:gap-x-10">
          {t.impact.stats.map((s, i) => (
            <Reveal key={s.l} delay={(i % 3) * 0.08} className="border-t border-bone/15 pt-4 pb-10 md:pb-16">
              <span className="meta text-bone/45 block mb-6 md:mb-10">0{i + 1} — {s.l}</span>
              <span className="display block text-[19vw] md:text-[10vw] lg:text-[7.5rem] xl:text-[9rem] leading-[0.8] mb-4">{s.v}</span>
              <span className="block text-sm text-bone/55 max-w-[16rem]">{s.d}</span>
            </Reveal>
          ))}
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
    <section id="urunler" className="pb-24 md:pb-40">
      <div className={wrap}>
        <SectionHead index="03" kicker={t.products.kicker} line1={t.products.title1} line2={t.products.title2} aside="iOS · App Store" />
        <Reveal><p className="max-w-xl text-base md:text-lg text-bone/65 leading-relaxed mb-12 md:mb-16">{t.products.desc}</p></Reveal>

        <div className="border-t border-bone/15">
          {t.products.apps.map((app, i) => (
            <Reveal key={app.name} delay={i * 0.06}>
              <div className="group grid grid-cols-[auto_1fr] md:grid-cols-[3rem_auto_1fr_1.1fr] gap-x-5 md:gap-x-10 gap-y-4 items-center py-8 md:py-10 border-b border-bone/15">
                <span className="hidden md:block meta text-bone/40">0{i + 1}</span>
                <img src={app.icon} alt={`${app.name} icon`} className="w-16 h-16 md:w-24 md:h-24 rounded-[18px] md:rounded-[26px] transition-transform duration-700 group-hover:-rotate-6 group-hover:scale-105" />
                <div>
                  <h3 className="display text-5xl md:text-7xl leading-[0.9]">{app.name}</h3>
                  <p className="meta text-bone/45 mt-2">{app.tag}</p>
                </div>
                <p className="col-span-2 md:col-span-1 text-sm md:text-base text-bone/60 leading-relaxed">{app.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================
// ABOUT + EXIT
// ============================================
function AboutSection({ t }: { t: Copy }) {
  return (
    <section id="hakkimda" className="pb-24 md:pb-40">
      <div className={wrap}>
        <SectionHead index="04" kicker={t.about.kicker} line1={t.about.title1} line2={t.about.title2} />
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-24 mb-24 md:mb-40">
          <Reveal>
            <p className="display text-3xl md:text-[2.6rem] leading-[1.12] tracking-[-0.02em] text-bone/90">{t.about.desc}</p>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-10">
            {t.about.areas.map((area, k) => (
              <Reveal key={area.title} delay={k * 0.05} className="border-t border-bone/15 pt-4">
                <span className="meta text-bone/40 block mb-4">0{k + 1}</span>
                <h3 className="display text-3xl md:text-4xl mb-4">{area.title}</h3>
                <ul className="space-y-2">
                  {area.items.map((it) => <li key={it} className="text-sm text-bone/55 leading-relaxed">{it}</li>)}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Exit — full-bleed film */}
      <div className="relative min-h-[90svh] flex items-end overflow-hidden">
        <video src={vsrc('15-mamush-ribeye')} poster={vposter('15-mamush-ribeye')} autoPlay muted loop playsInline preload="metadata" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-night/65" />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/20 to-night" />
        <Viewfinder />
        <div className={`relative w-full ${wrap} py-24 md:py-32`}>
          <p className="meta text-bone/70 mb-8 flex items-center gap-2"><RecDot /> {t.about.exitKicker}</p>
          <h3 className="display text-[14vw] md:text-[9vw] lg:text-[8.5rem] mb-10">
            <MaskLine>{t.about.exitTitle1}</MaskLine>
            <MaskLine delay={0.1} className="italic">{t.about.exitTitle2}</MaskLine>
          </h3>
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 items-end">
            <p className="max-w-md text-[15px] md:text-base text-bone/75 leading-relaxed">{t.about.exitDesc}</p>
            <div className="grid grid-cols-4 gap-4 border-t border-bone/25 pt-5">
              {t.about.exitStats.map((s) => (
                <div key={s.l}>
                  <span className="display block text-3xl md:text-5xl xl:text-6xl leading-none mb-2">{s.v}</span>
                  <span className="meta text-bone/55 text-[10px]">{s.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================
// EXPERIENCE — end credits
// ============================================
function ExperienceSection({ t }: { t: Copy }) {
  return (
    <section id="deneyim" className="pt-24 md:pt-40 pb-24 md:pb-40">
      <div className={wrap}>
        <SectionHead index="05" kicker={t.experience.kicker} line1={t.experience.title1} line2={t.experience.title2} />

        <div className="max-w-4xl mx-auto text-center space-y-20 md:space-y-28">
          {t.experience.jobs.map((exp, i) => (
            <Reveal key={exp.company} delay={i * 0.04}>
              <p className="meta text-bone/45 mb-4">{exp.role}</p>
              <h3 className="display text-[12vw] md:text-7xl lg:text-[6.5rem] leading-[0.9]">
                {exp.company}
                {exp.isExit && <sup className="meta text-rec text-[11px] ml-2 align-super tracking-[0.15em]">Exit</sup>}
              </h3>
              <p className="meta text-bone/60 mt-5">{exp.period}</p>
              <p className="text-sm md:text-[15px] text-bone/55 leading-relaxed max-w-xl mx-auto mt-5">{exp.highlight}</p>
            </Reveal>
          ))}

          <div className="grid md:grid-cols-2 gap-16 pt-8 border-t border-bone/15">
            <Reveal className="pt-10">
              <p className="meta text-bone/45 mb-4">{t.experience.eduTitle}</p>
              <p className="display text-4xl md:text-5xl leading-[0.95]">{t.experience.edu.school}</p>
              <p className="meta text-bone/60 mt-4">{t.experience.edu.dept}</p>
              <p className="meta text-bone/40 mt-1">{t.experience.edu.period}</p>
            </Reveal>
            <Reveal delay={0.08} className="pt-10">
              <p className="meta text-bone/45 mb-4">{t.experience.langTitle}</p>
              {t.experience.langs.map((l) => (
                <p key={l.l} className="display text-4xl md:text-5xl leading-[1.05]">{l.l} <span className="italic text-bone/40">— {l.v}</span></p>
              ))}
            </Reveal>
          </div>
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
    { label: t.contact.phone, value: '+90 530 465 39 74', href: 'tel:+905304653974' },
    { label: 'LinkedIn', value: '/in/yasinakkts', href: 'https://linkedin.com/in/yasinakkts' },
    { label: 'Instagram', value: '@yasinakkts', href: 'https://www.instagram.com/yasinakkts/' },
  ]
  return (
    <section id="iletisim" className="pb-16">
      <div className={wrap}>
        <div className="flex items-center justify-between border-t border-bone/15 pt-4 mb-10 md:mb-16 meta text-bone/50">
          <span>(06) &nbsp;{t.contact.kicker}</span>
          <span className="flex items-center gap-2"><RecDot /> {t.contact.desc}</span>
        </div>
        <h2 className="display text-[22vw] md:text-[16vw] lg:text-[15rem] leading-[0.8] mb-14 md:mb-20">
          <MaskLine>{t.contact.title1}</MaskLine>
          <MaskLine delay={0.08} className="italic text-right">{t.contact.title2}</MaskLine>
        </h2>

        <Reveal>
          <a href="mailto:yasin.aktas@outlook.com.tr" className="group flex items-center justify-between gap-4 border-y border-bone/15 py-6 md:py-10">
            <span className="display text-[7.5vw] md:text-6xl lg:text-7xl leading-none break-all">yasin.aktas@outlook.com.tr</span>
            <span className="shrink-0 w-12 h-12 md:w-20 md:h-20 rounded-full border border-bone/30 flex items-center justify-center transition-all duration-500 group-hover:bg-bone group-hover:text-night group-hover:rotate-45">
              <Arrow dir="upright" size={24} />
            </span>
          </a>
        </Reveal>

        <div className="grid sm:grid-cols-3">
          {rows.map((r) => (
            <a key={r.label} href={r.href} target={r.href.startsWith('http') ? '_blank' : undefined} rel="noopener" className="group flex items-center justify-between py-5 md:py-7 border-b border-bone/15 sm:border-b-0 sm:border-r sm:last:border-r-0 sm:px-6 sm:first:pl-0">
              <span>
                <span className="meta text-bone/45 block mb-1">{r.label}</span>
                <span className="display text-2xl md:text-3xl">{r.value}</span>
              </span>
              <span className="text-bone/40 group-hover:text-bone transition-colors"><Arrow dir="upright" size={18} /></span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================
// FOOTER
// ============================================
function Footer({ t }: { t: Copy }) {
  return (
    <footer className="pb-8">
      <div className={`${wrap} flex flex-col md:flex-row justify-between items-center gap-3 pt-6 border-t border-bone/10 meta text-bone/40`}>
        <span>{t.footer.rights}</span>
        <span className="flex items-center gap-2"><RecDot /> {t.footer.from}</span>
        <a href="#" className="inline-flex items-center gap-1.5 hover:text-bone transition-colors">{t.footer.top} <Arrow dir="up" size={12} /></a>
      </div>
    </footer>
  )
}

// ============================================
// VIDEO MODAL
// ============================================
function VideoModal({ playing, t, onClose }: { playing: Playing; t: Copy; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const handleEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handleEsc)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleEsc)
    }
  }, [onClose])

  const vertical = playing.kind === 'file' ? playing.work.vertical : !!playing.item.isShort
  const title = playing.kind === 'file' ? playing.work.title : playing.item.title
  const meta = playing.kind === 'file'
    ? `${playing.work.client}${playing.work.place ? ` · ${playing.work.place}` : ''} — ${t.projects.cats[playing.work.category]}`
    : `${t.projects.cats[playing.item.category]} — ${playing.item.year}`

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-night/95 backdrop-blur-md p-4" onClick={onClose}>
      <button onClick={onClose} aria-label="Close" className="absolute top-4 right-4 md:top-6 md:right-6 w-12 h-12 rounded-full border border-bone/25 flex items-center justify-center hover:bg-bone hover:text-night transition-colors z-10">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
      </button>

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className={vertical ? 'w-full max-w-[min(420px,calc((100svh-170px)*9/16))]' : 'w-full max-w-6xl'}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4">
          <p className="meta text-bone/50 mb-2">{meta}</p>
          <h3 className="display text-3xl md:text-5xl">{title}</h3>
        </div>
        <div className={`overflow-hidden bg-black ${vertical ? 'aspect-[9/16]' : 'aspect-video'}`}>
          {playing.kind === 'file' ? (
            <video src={vsrc(playing.work.slug)} poster={vposter(playing.work.slug)} controls autoPlay playsInline className="w-full h-full object-contain" />
          ) : (
            <iframe
              src={`https://www.youtube.com/embed/${playing.item.youtubeId}?autoplay=1${playing.item.isShort ? `&loop=1&playlist=${playing.item.youtubeId}` : ''}`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

// ============================================
// MAIN
// ============================================
export default function HomePage() {
  const [playing, setPlaying] = useState<Playing | null>(null)
  const [lang, setLang] = useState<Lang>('tr')
  const t = copy[lang] as Copy

  useEffect(() => { document.documentElement.lang = lang }, [lang])

  return (
    <>
      <div className="grain" />
      <ScrollProgress />
      <Navigation t={t} lang={lang} setLang={setLang} />

      <main>
        <HeroSection t={t} onReel={() => setPlaying({ kind: 'file', work: works[0] })} />
        <ClientStrip />
        <StatementSection t={t} />
        <WorkSection t={t} onPlay={(work) => setPlaying({ kind: 'file', work })} onArchive={(item) => setPlaying({ kind: 'yt', item })} />
        <Marquee items={t.marquee} />
        <ImpactSection t={t} />
        <ProductsSection t={t} />
        <AboutSection t={t} />
        <ExperienceSection t={t} />
        <ContactSection t={t} />
      </main>

      <Footer t={t} />

      <AnimatePresence>
        {playing && <VideoModal playing={playing} t={t} onClose={() => setPlaying(null)} />}
      </AnimatePresence>
    </>
  )
}
