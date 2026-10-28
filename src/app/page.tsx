'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView, MotionValue } from 'framer-motion'

// ============================================
// TYPES
// ============================================
type Lang = 'tr' | 'en'
type CategoryKey = 'ad' | 'food' | 'brand' | 'threeD' | 'motion' | 'drone' | 'social' | 'ai' | 'doc'
type Tone = 'ink' | 'mute' | 'maroon'
// A headline is a list of [text, tone]; '\n' inside text breaks the line
type Parts = [string, Tone?][]
// Scroll-reveal statement tokens: a word, a mini video still, or a highlighted word
type Token = string | { img: string } | { hl: string }

// ============================================
// PROJECT DATA
// ============================================
// Self-hosted work: /public/videos/<slug>.mp4 + <slug>.jpg poster
type Work = { slug: string; client: string; place?: string; title: string; category: CategoryKey; vertical: boolean }

const works: Work[] = [
  { slug: '03-kamuran-mekan-tanitim', client: 'Kamuran', place: 'İstanbul', title: 'Mekân Tanıtım Filmi', category: 'brand', vertical: false },
  { slug: '10-hepsiburada-3d-animasyon', client: 'Hepsiburada', title: '3D Animasyon Reklam', category: 'threeD', vertical: false },
  { slug: '14-statement-coffee', client: 'STATEMENT Coffee', title: 'Behind Every Plate', category: 'food', vertical: false },
  { slug: '12-claudie-miami', client: 'CLAUDIE', place: 'Miami', title: 'Weekday Lunch', category: 'food', vertical: true },
  { slug: '15-mamush-ribeye', client: 'Mamush', title: 'Prime Cut Ribeye', category: 'food', vertical: true },
  { slug: '13-mr-hakans-jeddah', client: 'Mr.Hakans', place: 'Jeddah', title: 'Something Better', category: 'food', vertical: true },
  { slug: '07-ibb-bulgur-palas-drone', client: 'İBB', place: 'Bulgur Palas', title: 'Drone Tanıtım', category: 'drone', vertical: true },
  { slug: '02-kamuran-kruvasan', client: 'Kamuran', title: 'Kruvasan', category: 'ad', vertical: true },
  { slug: '08-zuber-3d-urun-filmi', client: 'Züber', title: '3D Ürün Filmi', category: 'threeD', vertical: true },
  { slug: '11-isijet-motion-graphic', client: 'Isıjet', title: 'Kurutma Çözümleri', category: 'motion', vertical: true },
  { slug: '01-recrea-sosyal-medya', client: 'Recrea', title: 'İncirli & Cevizli Kurabiye', category: 'ad', vertical: true },
  { slug: '09-linde-29-ekim', client: 'Linde', title: '29 Ekim Cumhuriyet Bayramı', category: 'social', vertical: true },
  { slug: '04-kamuran-kreatif-kisa-film', client: 'Kamuran', title: 'Cadılar Bayramı', category: 'social', vertical: true },
]

const bySlug = (s: string) => works.find(w => w.slug === s)!
const films = works.filter(w => !w.vertical)
const verticals = works.filter(w => w.vertical)

// Earlier YouTube-hosted work
type ArchiveItem = { id: number; title: string; category: CategoryKey; youtubeId: string; thumbnail: string; year: string; isShort?: boolean }

const thumbFallback = (e: React.SyntheticEvent<HTMLImageElement>) => {
  const img = e.currentTarget
  if (img.src.includes('maxresdefault')) img.src = img.src.replace('maxresdefault', 'hqdefault')
}
const yt = (id: string) => `https://img.youtube.com/vi/${id}/maxresdefault.jpg`

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
const poster = (slug: string) => `/videos/${slug}.jpg`

// ============================================
// I18N COPY
// ============================================
const copy = {
  tr: {
    nav: { projects: 'İşler', about: 'Hakkımda', products: 'Ürünler', experience: 'Deneyim', contact: 'İletişim' },
    hero: {
      title: [['Video prodüksiyon\nve kreatif liderlik.']] as Parts,
      sub: 'Creative Director / Video Production',
      cta1: 'İşleri izle',
      cta2: 'Showreel',
    },
    showcase: {
      kicker: 'Prodüksiyon',
      title: [['Kameradan kurguya,\n'], ['çekimden yayına,\n', 'maroon'], ['uçtan uca prodüksiyon.']] as Parts,
      desc: 'Profesyonel kamera ekipmanları ve drone ile çekim yapıyor; Premiere Pro, After Effects ve yapay zeka destekli programlarla post-prodüksiyon süreçlerini uçtan uca yönetiyorum.',
      cta1: 'İşleri izle',
      cta2: 'Hakkımda',
    },
    reel: {
      kicker: ['Showreel', 'Yasin Aktaş'],
      title: [['Kameradan\n'], ['kreatif '], ['liderliğe.', 'mute']] as Parts,
      watch: 'İzle',
    },
    statement: [
      'Medya', 'kuruluşlarında', '4', 'yıl', 'Kreatif', 'Videographer', 'olarak', { img: poster('07-ibb-bulgur-palas-drone') }, 'marka', 'kampanyaları', 've', 'haber', 'içerikleri', 'ürettim.',
      'Creative', 'Touch', 'Productions', 'ile', 'içerik', 'üreten', 'değil,', { hl: 'süreci' }, 'yöneten', { img: poster('12-claudie-miami') }, 'bir', 'konuma', 'geçtim.',
    ] as Token[],
    stair: { title: 'Seçili işler', meta: '13 film · 2026', desc: 'Reklam filmi, 3D animasyon, drone ve sosyal medya içerikleri.' },
    products: {
      title: [['Fikirden\n'], ['App Store’a.', 'mute']] as Parts,
      desc: 'Yapay zeka destekli geliştirme yaklaşımıyla üç iOS uygulamasını fikirden App Store’a taşıdım.',
      label: 'Uygulamalar',
      store: 'App Store',
      apps: [
        { name: 'Speego', tag: 'Yapay zeka konuşma koçu', icon: '/apps/speego.png',
          desc: '30 saniyelik video kaydından ton, akıcılık, beden dili ve netlik analizi. Mülakat, sunum ve topluluk önünde konuşma için kişisel geri bildirim.',
          features: ['30 sn video', 'Ton & akıcılık', 'Abonelik'] },
        { name: 'Sanal Drone', tag: 'Gayrimenkul pazarlama aracı', icon: '/apps/sanal-drone.png',
          desc: 'Arsa ve gayrimenkul ilanlarını saniyeler içinde pazarlama içeriğine çevirir. Emlak danışmanları ve ofisleri için geliştirildi.',
          features: ['Haritadan alan', 'İlan görselleri', 'Drone videosu'] },
        { name: 'Someday', tag: 'Şifreli mesaj kasası', icon: '/apps/someday.png',
          desc: 'Sevdiklerinize video, ses ve mektup mesajları; belirlediğiniz tarihte ya da güvenilir kişilerin onayıyla iletilir.',
          features: ['Uçtan uca şifreli', 'Zamanlı teslim', 'Sunucusuz'] },
      ],
    },
    community: {
      title: [['1000+ marka,\n'], ['10 kişilik ekip.', 'mute']] as Parts,
      desc: 'Creative Touch Productions’ta 10 kişilik bir ekibi yöneterek binden fazla markaya reklam filmi, yapay zeka destekli video ve dijital danışmanlık hizmeti sundum.',
      stats: [ ['50M+', 'izlenme'], ['500+', 'video'], ['10', 'kişilik ekip'], ['15M₺', 'bütçe'], ['+%35', 'etkileşim'] ],
    },
    story: {
      kicker: ['Hakkımda', 'Yetkinlikler'],
      title: [['Üretimden\n'], ['yönetime.']] as Parts,
      desc: 'İzleyici davranışı, içerik stratejisi ve YouTube, Instagram gibi platformların algoritmaları konusunda güçlü bilgi birikimine sahibim. Sahadaki teknik üretim gücümü, ajans yönetiminden gelen liderlik ve stratejik bakış açısıyla birleştiriyorum.',
      a: { chip: 'Showreel izle', title: 'Çekim ve post-prodüksiyon', desc: 'Profesyonel kamera ve drone ile çekim; Premiere Pro, After Effects ve yapay zeka destekli programlarla kurgu.', cta: 'Showreel' },
      b: { title: 'Yapay zeka destekli üretim', desc: 'Yapay zeka destekli reklam filmleri ve animasyonlar; App Store’da yayınlanan iOS uygulamaları.', cta: 'Ürünler' },
      c: { title: 'Ekip ve proje yönetimi', desc: '10 kişilik ekip yönetimi, kriz anlarında çözüm üretme ve farklı müşteri dinamiklerine hızla adapte olma.', cta: 'Deneyim' },
      d: { kicker: 'Creative Touch Productions', title: 'Ajans satışı', meta: 'Ocak 2026 · Hamburg', desc: 'Ajans, Ocak 2026’da Hamburg merkezli bir teknoloji şirketi tarafından satın alındı.' },
    },
    work: {
      kicker: ['Portföy', '2026'],
      title: [['Seçili işler,\n'], ['2026.', 'mute']] as Parts,
      desc: 'Bir işe tıklayın, ortada büyüsün ve oynasın. Kapatınca ızgaraya dönün.',
      like: 'İzle',
      unmute: 'Sesi aç',
      cats: { ad: 'Reklam Filmi', food: 'Restoran & F&B', brand: 'Tanıtım Filmi', threeD: '3D Animasyon', motion: 'Motion Graphic', drone: 'Drone', social: 'Sosyal Medya', ai: 'AI Video', doc: 'Belgesel' } as Record<CategoryKey, string>,
    },
    archive: {
      kicker: ['Arşiv', 'Önceki işler'],
      title: [['Turkuvaz\n'], ['ve ajans dönemi.']] as Parts,
      desc: 'Sabah, ATV, A Haber ve ajans dönemimden seçili reklam filmleri ve belgeseller.',
      all: 'YouTube',
    },
    experience: {
      title: 'Deneyim',
      desc: 'Yaklaşık 5 yıldır video prodüksiyon ve medya sektöründe aktif olarak çalışıyorum.',
      cards: [
        { label: 'Turkuvaz Medya', big: '4 yıl', small: 'Kreatif Videographer' },
        { label: 'Creative Touch', big: 'Kurucu', small: 'Creative Director', badge: 'Exit' },
        { label: 'TV8 · Matte Post', big: '2020', small: 'Staj · Post Prodüksiyon' },
      ],
      jobs: [
        { role: 'Kurucu & Creative Director', company: 'Creative Touch Productions', period: 'Mart 2025 — Ocak 2026',
          highlight: 'Yapay zeka destekli reklam filmi ve animasyonda uzmanlaşmış ajansı kurdum ve yönettim; 10 kişilik ekiple 1000+ markaya içerik stratejisi ve üretim. Ocak 2026’da Hamburg merkezli bir teknoloji şirketine satıldı.' },
        { role: 'Kreatif Videographer', company: 'Turkuvaz Medya', period: 'Ekim 2021 — Mayıs 2025',
          highlight: 'Sabah, ATV ve A Haber için marka kampanyaları ve günlük editoryal içerik; kamera ve drone çekimleri, 500+ video.' },
        { role: 'Post Prodüksiyon Editörü', company: 'Matte Post Productions', period: 'Eylül 2020 — Kasım 2020',
          highlight: 'Post-prodüksiyon ekibinde kurgu süreçlerinde görev aldım.' },
        { role: 'Stajyer', company: 'TV8 / Acun Medya', period: 'Haziran 2020 — Ağustos 2020',
          highlight: 'TV yayın planlaması ve organizasyon; stüdyo ve dış çekimlerde asistanlık.' },
      ],
      edu: ['Eğitim', 'İstanbul Kültür Üniversitesi — Radyo ve Televizyon Teknolojisi', '2018 — 2020'],
      langs: ['Diller', 'Türkçe (ana dil) · İngilizce (profesyonel)', ''],
    },
    band: { words: ['Reklam Filmi', '3D Animasyon', 'Drone', 'AI Video', 'Restoran Filmleri', 'Motion Graphic'], caption: ['2026', 'portfolyo'] },
    closing: {
      a: { title: [['Birlikte\n'], ['çalışalım.']] as Parts, desc: 'Değer katabileceğim ve birlikte büyüyebileceğim kurumlarla yeni projelere açığım.', cta: 'Email gönder' },
      b: { title: [['Kariyerim\n'], ['LinkedIn’de.']] as Parts, desc: 'Deneyimlerim ve güncel işlerim LinkedIn profilimde.', cta: 'LinkedIn' },
    },
    footer: {
      title: 'Yasin Aktaş.',
      desc: 'Creative Director / Video Production. İstanbul, Türkiye.',
      cols: [ ['Sayfalar', 'İşler', 'Hakkımda', 'Ürünler', 'Deneyim'], ['İletişim', 'Email', 'Telefon', 'İstanbul, TR'], ['Ürünler', 'Speego', 'Sanal Drone', 'Someday'] ],
      rights: '© 2026 · Tüm hakları saklıdır',
    },
  },
  en: {
    nav: { projects: 'Work', about: 'About', products: 'Products', experience: 'Experience', contact: 'Contact' },
    hero: {
      title: [['Video production and\ncreative leadership.']] as Parts,
      sub: 'Creative Director / Video Production',
      cta1: 'Watch the work',
      cta2: 'Showreel',
    },
    showcase: {
      kicker: 'Production',
      title: [['From camera to edit,\n'], ['shoot to release,\n', 'maroon'], ['end-to-end production.']] as Parts,
      desc: 'I shoot with professional camera gear and drones, and run post-production end to end in Premiere Pro, After Effects and AI-assisted tools.',
      cta1: 'Watch the work',
      cta2: 'About me',
    },
    reel: {
      kicker: ['Showreel', 'Yasin Aktaş'],
      title: [['From the camera\n'], ['to creative '], ['leadership.', 'mute']] as Parts,
      watch: 'Watch',
    },
    statement: [
      'I', 'spent', '4', 'years', 'as', 'a', 'Creative', 'Videographer', { img: poster('07-ibb-bulgur-palas-drone') }, 'producing', 'brand', 'campaigns', 'and', 'news', 'content.',
      'With', 'Creative', 'Touch', 'Productions', 'I', 'moved', 'from', 'making', 'content', 'to', { hl: 'running' }, 'the', 'process.', { img: poster('12-claudie-miami') },
    ] as Token[],
    stair: { title: 'Selected work', meta: '13 films · 2026', desc: 'Ad films, 3D animation, drone and social media content.' },
    products: {
      title: [['From idea\n'], ['to the App Store.', 'mute']] as Parts,
      desc: 'With an AI-assisted development approach, I took three iOS apps from idea to the App Store.',
      label: 'Apps',
      store: 'App Store',
      apps: [
        { name: 'Speego', tag: 'AI speaking coach', icon: '/apps/speego.png',
          desc: 'Analyses tone, fluency, body language and clarity from a 30-second video. Personal feedback for interviews, presentations and public speaking.',
          features: ['30-sec video', 'Tone & fluency', 'Subscription'] },
        { name: 'Sanal Drone', tag: 'Real estate marketing tool', icon: '/apps/sanal-drone.png',
          desc: 'Turns land and property listings into marketing content in seconds. Built for real estate agents and agencies.',
          features: ['Map-based area', 'Listing visuals', 'Drone video'] },
        { name: 'Someday', tag: 'Encrypted message vault', icon: '/apps/someday.png',
          desc: 'Video, voice and letter messages for loved ones, delivered on a chosen date or with trusted contacts’ approval.',
          features: ['End-to-end encrypted', 'Scheduled delivery', 'Serverless'] },
      ],
    },
    community: {
      title: [['1000+ brands,\n'], ['a team of 10.', 'mute']] as Parts,
      desc: 'At Creative Touch Productions I led a 10-person team delivering ad films, AI-assisted video and digital consultancy to over a thousand brands.',
      stats: [ ['50M+', 'views'], ['500+', 'videos'], ['10', 'person team'], ['15M₺', 'budget'], ['+35%', 'engagement'] ],
    },
    story: {
      kicker: ['About', 'Skills'],
      title: [['From production\n'], ['to leadership.']] as Parts,
      desc: 'I have strong knowledge of audience behaviour, content strategy and the algorithms of platforms like YouTube and Instagram. I combine hands-on production with the leadership and strategic view that came from running an agency.',
      a: { chip: 'Watch showreel', title: 'Shooting and post-production', desc: 'Shooting with professional camera and drone; editing in Premiere Pro, After Effects and AI-assisted tools.', cta: 'Showreel' },
      b: { title: 'AI-assisted production', desc: 'AI-assisted ad films and animation; iOS apps published on the App Store.', cta: 'Products' },
      c: { title: 'Team and project management', desc: 'Leading a 10-person team, solving problems under pressure and adapting quickly to different client dynamics.', cta: 'Experience' },
      d: { kicker: 'Creative Touch Productions', title: 'Agency acquired', meta: 'January 2026 · Hamburg', desc: 'The agency was acquired by a Hamburg-based technology company in January 2026.' },
    },
    work: {
      kicker: ['Portfolio', '2026'],
      title: [['Selected work,\n'], ['2026.', 'mute']] as Parts,
      desc: 'Click a piece and it grows into the centre and plays. Close it to return to the grid.',
      like: 'Watch',
      unmute: 'Unmute',
      cats: { ad: 'Ad Film', food: 'Restaurant & F&B', brand: 'Promo Film', threeD: '3D Animation', motion: 'Motion Graphic', drone: 'Drone', social: 'Social Media', ai: 'AI Video', doc: 'Documentary' } as Record<CategoryKey, string>,
    },
    archive: {
      kicker: ['Archive', 'Earlier work'],
      title: [['Turkuvaz\n'], ['and agency years.']] as Parts,
      desc: 'Selected ad films and documentaries from Sabah, ATV, A Haber and my agency years.',
      all: 'YouTube',
    },
    experience: {
      title: 'Experience',
      desc: 'About 5 years working actively in video production and media.',
      cards: [
        { label: 'Turkuvaz Media', big: '4 yrs', small: 'Creative Videographer' },
        { label: 'Creative Touch', big: 'Founder', small: 'Creative Director', badge: 'Exit' },
        { label: 'TV8 · Matte Post', big: '2020', small: 'Intern · Post-Production' },
      ],
      jobs: [
        { role: 'Founder & Creative Director', company: 'Creative Touch Productions', period: 'Mar 2025 — Jan 2026',
          highlight: 'Founded and ran an agency specialising in AI-assisted ad films and animation; content strategy and production for 1000+ brands with a 10-person team. Acquired by a Hamburg-based tech company in January 2026.' },
        { role: 'Creative Videographer', company: 'Turkuvaz Media', period: 'Oct 2021 — May 2025',
          highlight: 'Brand campaigns and daily editorial content for Sabah, ATV and A Haber; camera and drone shoots, 500+ videos.' },
        { role: 'Post-Production Editor', company: 'Matte Post Productions', period: 'Sep 2020 — Nov 2020',
          highlight: 'Worked on editing within the post-production team.' },
        { role: 'Intern', company: 'TV8 / Acun Media', period: 'Jun 2020 — Aug 2020',
          highlight: 'TV broadcast planning and organisation; assisted on studio and location shoots.' },
      ],
      edu: ['Education', 'Istanbul Kültür University — Radio and Television Technology', '2018 — 2020'],
      langs: ['Languages', 'Turkish (native) · English (professional)', ''],
    },
    band: { words: ['Ad Films', '3D Animation', 'Drone', 'AI Video', 'Restaurant Films', 'Motion Graphics'], caption: ['2026', 'portfolio'] },
    closing: {
      a: { title: [['Let’s work\n'], ['together.']] as Parts, desc: 'I’m open to new projects with teams where I can add value and keep growing.', cta: 'Send email' },
      b: { title: [['My career\n'], ['on LinkedIn.']] as Parts, desc: 'My experience and recent work are on my LinkedIn profile.', cta: 'LinkedIn' },
    },
    footer: {
      title: 'Yasin Aktaş.',
      desc: 'Creative Director / Video Production. Istanbul, Türkiye.',
      cols: [ ['Pages', 'Work', 'About', 'Products', 'Experience'], ['Contact', 'Email', 'Phone', 'Istanbul, TR'], ['Products', 'Speego', 'Sanal Drone', 'Someday'] ],
      rights: '© 2026 · All rights reserved',
    },
  },
}

type Copy = typeof copy.tr

const EASE = [0.16, 1, 0.3, 1] as const
// Entrances settle on a soft spring; hovers use a tighter one so they track the cursor
const SPRING = { type: 'spring', stiffness: 70, damping: 18, mass: 1 } as const
const HOVER = { type: 'spring', stiffness: 320, damping: 28 } as const
const CARD = 'ring-1 ring-black/[0.04] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_24px_44px_-26px_rgba(0,0,0,0.38)]'
const wrap = 'max-w-[1120px] mx-auto px-5 md:px-8'
const btnDark = 'inline-flex items-center justify-center gap-1.5 h-9 px-4 rounded-full bg-ink text-white text-[12px] font-medium hover:bg-black/75 transition-colors'
const btnGhost = 'inline-flex items-center justify-center gap-1.5 h-9 px-4 rounded-full text-[12px] font-medium text-ink hover:bg-black/[0.05] transition-colors'
const TONE: Record<Tone, string> = { ink: 'text-ink', mute: 'text-mute', maroon: 'text-maroon' }

// True only for a real mouse; touch screens skip hover effects so one tap = one action
const useCanHover = () => useMedia('(hover: hover) and (pointer: fine)')

function useMedia(query: string) {
  const [match, setMatch] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const update = () => setMatch(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [query])
  return match
}

// ============================================
// PRIMITIVES
// ============================================
// Headline whose words resolve from blur, one after another
function Title({ parts, className = '', as = 'h2', immediate = false, center = false }: { parts: Parts; className?: string; as?: 'h1' | 'h2' | 'h3'; immediate?: boolean; center?: boolean }) {
  const words: { w: string; tone: Tone; br?: boolean }[] = []
  parts.forEach(([text, tone = 'ink']) => {
    text.split(/(\n)/).forEach((seg) => {
      if (seg === '\n') words.push({ w: '', tone, br: true })
      else seg.split(' ').filter(Boolean).forEach((w) => words.push({ w, tone }))
    })
  })
  const Tag = as
  const shown = { opacity: 1, filter: 'blur(0px)', y: 0 }
  return (
    <Tag className={`title ${center ? 'text-center' : ''} ${className}`}>
      {words.map((x, i) =>
        x.br ? <br key={i} /> : (
          <motion.span
            key={i}
            initial={{ opacity: 0, filter: 'blur(12px)', y: 10 }}
            {...(immediate ? { animate: shown } : { whileInView: shown, viewport: { once: true, margin: '-40px' } })}
            transition={{ duration: 0.8, delay: (immediate ? 0.15 : 0) + i * 0.045, ease: EASE }}
            className={`inline-block mr-[0.24em] last:mr-0 ${TONE[x.tone]}`}
          >
            {x.w}
          </motion.span>
        )
      )}
    </Tag>
  )
}

function Kicker({ parts, className = '', accent = 'text-cobalt' }: { parts: string[]; className?: string; accent?: string }) {
  return (
    <p className={`kicker text-ink/80 ${className}`}>
      {parts[0]} {parts[1] && <span className={accent}>{parts[1]}</span>}
    </p>
  )
}

function Reveal({ children, delay = 0, className = '', y = 24 }: { children: React.ReactNode; delay?: number; className?: string; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 1, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Hover lift lives on its own layer so it never inherits an entrance delay
function Lift({ children, className = '', y = -10, scale = 1.03, rotate }: { children: React.ReactNode; className?: string; y?: number; scale?: number; rotate?: number }) {
  const canHover = useCanHover()
  return (
    <motion.div whileHover={canHover ? { y, scale, ...(rotate !== undefined ? { rotate } : {}) } : undefined} transition={HOVER} className={`will-change-transform ${className}`}>
      {children}
    </motion.div>
  )
}

// Muted, inline, looping background video. React doesn't reliably write the `muted`
// attribute and iOS won't autoplay without it, so it's set on the element directly.
function AutoVideo({ src, poster: still, className = '' }: { src: string; poster?: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const v = ref.current
    if (!v) return
    v.muted = true
    v.defaultMuted = true
    v.setAttribute('muted', '')
    v.setAttribute('playsinline', '')
    v.play().catch(() => {})
  }, [src])
  return <video ref={ref} src={src} poster={still} muted loop playsInline autoPlay preload="metadata" className={className} />
}

// Click-to-watch player. The click counts as a gesture, so it first tries with sound;
// if the browser still refuses (common on phones), it plays muted and offers unmute.
function Player({ src, poster: still, className = '', unmuteLabel }: { src: string; poster?: string; className?: string; unmuteLabel: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(false)
  useEffect(() => {
    const v = ref.current
    if (!v) return
    v.muted = false
    setMuted(false)
    v.play().catch(() => {
      v.muted = true
      setMuted(true)
      v.play().catch(() => {})
    })
    const sync = () => setMuted(v.muted)
    v.addEventListener('volumechange', sync)
    return () => v.removeEventListener('volumechange', sync)
  }, [src])
  const unmute = () => {
    const v = ref.current
    if (!v) return
    v.muted = false
    v.play().catch(() => {})
  }
  return (
    <div className="relative w-full h-full">
      <video ref={ref} src={src} poster={still} controls playsInline loop preload="auto" className={className} />
      {muted && (
        <button onClick={unmute} className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-white text-ink text-[12px] font-semibold shadow-lg">
          <Icon name="sound" size={14} /> {unmuteLabel}
        </button>
      )}
    </div>
  )
}

function Tile({ src, className = '', alt = '' }: { src: string; className?: string; alt?: string }) {
  return (
    <div className={`overflow-hidden bg-[#e9e9e7] ${CARD} ${className}`}>
      <img src={src} alt={alt} onError={thumbFallback} loading="lazy" className="w-full h-full object-cover" />
    </div>
  )
}

const ICONS: Record<string, React.ReactNode> = {
  camera: <><rect x="3" y="7" width="18" height="13" rx="2" /><circle cx="12" cy="13.5" r="3.5" /><path d="M8 7l1.5-3h5L16 7" /></>,
  drone: <><circle cx="5" cy="5" r="2.5" /><circle cx="19" cy="5" r="2.5" /><circle cx="5" cy="19" r="2.5" /><circle cx="19" cy="19" r="2.5" /><rect x="9" y="9" width="6" height="6" rx="1.5" /><path d="M7 7l2 2M17 7l-2 2M7 17l2-2M17 17l-2-2" /></>,
  film: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4" /></>,
  spark: <path d="M12 3l1.8 5.6L19.5 10l-5.7 1.6L12 17l-1.8-5.4L4.5 10l5.7-1.4z" />,
  phone: <><rect x="7" y="2.5" width="10" height="19" rx="2.5" /><path d="M11 18.5h2" /></>,
  layers: <><path d="M12 3l9 5-9 5-9-5z" /><path d="M3 13l9 5 9-5" /></>,
  pen: <><path d="M4 20l4-1 11-11-3-3L5 16z" /><path d="M14 6l3 3" /></>,
  play: <><circle cx="12" cy="12" r="9" /><path d="M10 8.5l5 3.5-5 3.5z" /></>,
  cube: <><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z" /><path d="M12 12l8-4.5M12 12v9M12 12L4 7.5" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></>,
  bolt: <path d="M13 2L4 14h7l-1 8 9-12h-7z" />,
  heart: <path d="M12 20s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.5-7 10-7 10z" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>,
  link: <><path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1" /><path d="M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1" /></>,
  insta: <><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17" cy="7" r="0.8" fill="currentColor" /></>,
  linkedin: <><rect x="3.5" y="3.5" width="17" height="17" rx="3" /><path d="M8 10.5V16M8 7.8v.2M11.5 16v-3.2a2 2 0 014 0V16M11.5 10.5V16" /></>,
  arrowL: <path d="M15 6l-6 6 6 6" />,
  arrowR: <path d="M9 6l6 6-6 6" />,
  arrowU: <path d="M6 15l6-6 6 6" />,
  arrowD: <path d="M6 9l6 6 6-6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  sound: <><path d="M4 9v6h4l5 4V5L8 9z" /><path d="M16 9a4 4 0 010 6M18.5 6.5a7.5 7.5 0 010 11" /></>,
  dots: <><circle cx="5" cy="12" r="1" fill="currentColor" /><circle cx="12" cy="12" r="1" fill="currentColor" /><circle cx="19" cy="12" r="1" fill="currentColor" /></>,
}

function Icon({ name, size = 18, className = '' }: { name: string; size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {ICONS[name]}
    </svg>
  )
}

function IconDot({ name, className = '', size = 'w-10 h-10' }: { name: string; className?: string; size?: string }) {
  return (
    <span className={`${size} rounded-full bg-white shadow-[0_6px_16px_-8px_rgba(0,0,0,0.3)] flex items-center justify-center text-ink ${className}`}>
      <Icon name={name} size={17} />
    </span>
  )
}

function RoundBtn({ icon, onClick, light = false, label }: { icon: string; onClick?: () => void; light?: boolean; label: string }) {
  return (
    <button onClick={onClick} aria-label={label} className={`w-9 h-9 md:w-7 md:h-7 rounded-full flex items-center justify-center transition-colors ${light ? 'bg-white text-ink hover:bg-white/80' : 'bg-white/70 border border-line text-ink/70 hover:text-ink'}`}>
      <Icon name={icon} size={13} />
    </button>
  )
}

// ============================================
// NAVIGATION
// ============================================
function Navigation({ t, lang, setLang }: { t: Copy; lang: Lang; setLang: (l: Lang) => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: t.nav.projects, href: '#isler' },
    { label: t.nav.about, href: '#hakkimda' },
    { label: t.nav.products, href: '#urunler' },
    { label: t.nav.experience, href: '#deneyim' },
  ]

  return (
    <>
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'bg-paper/80 backdrop-blur-xl border-b border-line' : 'border-b border-transparent'}`}>
        <div className={`${wrap} h-14 flex items-center justify-between`}>
          <a href="#" className="text-[17px] md:text-[18px] font-bold tracking-[-0.035em] leading-none">Yasin Aktaş</a>
          <div className="hidden md:flex items-center gap-8 text-[13px] font-medium text-body">
            {links.map((l, i) => (
              <a key={l.href} href={l.href} className="flex items-center gap-1.5 hover:text-ink transition-colors">
                {i === 0 && <span className="w-1.5 h-1.5 rounded-full bg-ink" />}{l.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <button onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')} className="h-8 px-3 rounded-full text-[11px] font-bold text-body hover:text-ink hover:bg-black/[0.04] transition-colors" aria-label="Change language">
              {lang === 'tr' ? 'EN' : 'TR'}
            </button>
            <a href="#iletisim" className={`${btnDark} h-8 hidden md:inline-flex`}>{t.nav.contact}</a>
            <button onClick={() => setOpen(!open)} className="md:hidden w-8 h-8 rounded-full bg-ink text-white flex items-center justify-center" aria-label="Menu">
              <Icon name={open ? 'plus' : 'dots'} size={14} className={open ? 'rotate-45' : ''} />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="fixed top-16 inset-x-3 z-40 rounded-2xl bg-white p-3 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.4)] md:hidden">
            {[...links, { label: t.nav.contact, href: '#iletisim' }].map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="flex items-center justify-between px-3 py-3 rounded-xl text-[15px] font-medium hover:bg-paper">
                {l.label} <Icon name="arrowR" size={14} className="text-mute" />
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ============================================
// HERO — headline + fanned stack
// ============================================
const heroFan = ['12-claudie-miami', '08-zuber-3d-urun-filmi', '11-isijet-motion-graphic', '15-mamush-ribeye', '01-recrea-sosyal-medya', '13-mr-hakans-jeddah', '02-kamuran-kruvasan']

function HeroSection({ t, onPlay }: { t: Copy; onPlay: (w: Work) => void }) {
  const md = useMedia('(min-width: 768px)')
  const step = md ? 84 : 40
  const mid = (heroFan.length - 1) / 2
  const tilt = [-7, 4, -3, 2, -4, 5, 8]
  // Raise the hovered card instantly; animating zIndex makes it slide through its neighbours
  const [hover, setHover] = useState<number | null>(null)
  const canHover = useCanHover()

  return (
    <section className="relative pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_30%,#ffffff_0%,rgba(255,255,255,0)_70%)]" />
      <div className={`${wrap} text-center`}>
        <Title as="h1" immediate parts={t.hero.title} className="text-[38px] sm:text-[52px] md:text-[64px]" />

        <div className="relative h-[180px] sm:h-[220px] md:h-[280px] mt-6 md:mt-8">
          {heroFan.map((slug, i) => {
            const o = i - mid
            return (
              <motion.button
                key={slug}
                onClick={() => onPlay(bySlug(slug))}
                initial={{ x: 0, y: 40, rotate: 0, opacity: 0, scale: 0.9 }}
                animate={{ x: o * step, y: Math.abs(o) * 4, rotate: tilt[i], opacity: 1, scale: 1 }}
                transition={{ ...SPRING, delay: 0.45 + Math.abs(o) * 0.08, opacity: { duration: 0.5, delay: 0.45 } }}
                onHoverStart={() => canHover && setHover(i)}
                onHoverEnd={() => setHover(null)}
                className="absolute left-1/2 top-1/2 -ml-[44px] -mt-[55px] md:-ml-[72px] md:-mt-[88px] w-[88px] h-[110px] md:w-[144px] md:h-[176px] will-change-transform"
                style={{ zIndex: hover === i ? 50 : 10 + i }}
                aria-label={bySlug(slug).client}
              >
                <Lift y={-16} scale={1.05} rotate={0} className={`w-full h-full rounded-[12px] md:rounded-[16px] overflow-hidden bg-white ${CARD}`}>
                  <img src={poster(slug)} alt="" className="w-full h-full object-cover" />
                </Lift>
              </motion.button>
            )
          })}
        </div>

        <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.9, ease: EASE }} className="mt-5 text-[15px] md:text-[17px] font-medium tracking-[-0.025em] text-ink/85">
          {t.hero.sub.split(' / ').map((part, i) => (
            <span key={part}>{i > 0 && <span className="text-mute mx-2">/</span>}{part}</span>
          ))}
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.25, duration: 0.8 }} className="flex items-center justify-center gap-2 mt-6">
          <a href="#isler" className={btnDark}>{t.hero.cta1}</a>
          <button onClick={() => onPlay(films[0])} className={btnGhost}><Icon name="play" size={14} /> {t.hero.cta2}</button>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================
// SHOWCASE — copy + cascading cards
// ============================================
const cascadeSets = [
  ['15-mamush-ribeye', '12-claudie-miami', '08-zuber-3d-urun-filmi', '09-linde-29-ekim', '11-isijet-motion-graphic'],
  ['02-kamuran-kruvasan', '13-mr-hakans-jeddah', '07-ibb-bulgur-palas-drone', '01-recrea-sosyal-medya', '04-kamuran-kreatif-kisa-film'],
]

function ShowcaseSection({ t, onPlay }: { t: Copy; onPlay: (w: Work) => void }) {
  const [set, setSet] = useState(0)
  const cards = cascadeSets[set]
  const deckRef = useRef<HTMLDivElement>(null)
  const deckIn = useInView(deckRef, { once: true, margin: '-60px' })
  const pos = [
    { l: '0%', t: '6%' }, { l: '19%', t: '16%' }, { l: '38%', t: '26%' }, { l: '56%', t: '34%' }, { l: '73%', t: '41%' },
  ]
  return (
    <section className="py-16 md:py-28">
      <div className={`${wrap} grid md:grid-cols-[0.85fr_1.15fr] gap-12 md:gap-6 items-center`}>
        <div>
          <Title parts={t.showcase.title} className="text-[32px] md:text-[34px] lg:text-[44px]" />
          <Reveal delay={0.2}><p className="text-[12px] md:text-[13px] text-body leading-relaxed max-w-[270px] mt-5">{t.showcase.desc}</p></Reveal>
          <Reveal delay={0.3} className="flex gap-2 mt-6">
            <a href="#isler" className={btnDark}>{t.showcase.cta1}</a>
            <a href="#hakkimda" className={btnGhost}>{t.showcase.cta2}</a>
          </Reveal>
        </div>

        <div className="relative">
          {/* The deck is observed as a whole and the flag persists, so cards that start
              off-screen, and cards swapped in later with the arrows, still get dealt */}
          <div ref={deckRef} className="relative aspect-[1.55/1]">
            <AnimatePresence mode="popLayout">
              {cards.map((slug, i) => (
                <motion.button
                  key={`${set}-${slug}`}
                  onClick={() => onPlay(bySlug(slug))}
                  initial="hidden"
                  animate={deckIn ? 'shown' : 'hidden'}
                  variants={{
                    hidden: { opacity: 0, x: `${-56 * i}%`, y: `${-30 * i}%`, rotate: -4 },
                    shown: { opacity: 1, x: '0%', y: '0%', rotate: 0, transition: { ...SPRING, delay: i * 0.07 } },
                  }}
                  exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.25 } }}
                  className="absolute w-[34%] aspect-[4/3.4] will-change-transform"
                  style={{ left: pos[i].l, top: pos[i].t, zIndex: i + 1 }}
                  aria-label={bySlug(slug).client}
                >
                  <Lift className={`w-full h-full rounded-[12px] md:rounded-[14px] overflow-hidden bg-white ${CARD}`}>
                    <img src={poster(slug)} alt="" className="w-full h-full object-cover" />
                  </Lift>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
          <div className="absolute right-0 -bottom-12 md:bottom-auto md:top-[8%] flex md:flex-col gap-1.5">
            <RoundBtn icon="arrowU" label="Previous" onClick={() => setSet((set - 1 + cascadeSets.length) % cascadeSets.length)} />
            <RoundBtn icon="arrowD" label="Next" onClick={() => setSet((set + 1) % cascadeSets.length)} />
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================
// GATEWAY — showreel card
// ============================================
function ReelSection({ t, onPlay }: { t: Copy; onPlay: (w: Work) => void }) {
  const [i, setI] = useState(0)
  const w = films[i]
  const go = (d: number) => setI((v) => (v + d + films.length) % films.length)

  return (
    <section className="py-12 md:py-20">
      <div className={wrap}>
        <div className="relative flex items-end justify-between mb-6 md:mb-8">
          <div>
            <Kicker parts={t.reel.kicker} accent="text-mute" className="mb-2" />
            <Title parts={t.reel.title} className="text-[32px] md:text-[44px]" />
          </div>
        </div>

        <Reveal y={40}>
          <div className="relative overflow-hidden rounded-[14px] md:rounded-[18px] bg-flame aspect-[4/3] sm:aspect-[16/9] md:aspect-[2.45/1]">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={w.slug}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: EASE }}
                className="absolute inset-0"
              >
                <AutoVideo src={vsrc(w.slug)} poster={poster(w.slug)} className="absolute inset-0 w-full h-full object-cover" />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />
            <div className="absolute top-4 left-4 md:top-6 md:left-6 flex flex-col gap-1">
              <span className="w-6 h-6 md:w-7 md:h-7 rounded-[8px] bg-white" />
              <span className="w-6 h-6 md:w-7 md:h-7 rounded-[8px] bg-ink" />
            </div>
            <div className="absolute top-5 right-5 md:top-7 md:right-7 flex gap-1">
              {films.map((_, k) => <span key={k} className={`w-1 h-1 rounded-full ${k === i ? 'bg-white' : 'bg-white/50'}`} />)}
            </div>
            <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-white/80 text-[11px] font-medium mb-2">{w.client} — {w.title}</p>
                <button onClick={() => onPlay(w)} className="inline-flex items-center gap-1.5 h-7 px-3 rounded-full bg-white text-ink text-[11px] font-semibold hover:bg-white/85 transition-colors">
                  <Icon name="play" size={12} /> {t.reel.watch}
                </button>
              </div>
              <div className="flex gap-1.5">
                <RoundBtn icon="arrowL" light label="Previous" onClick={() => go(-1)} />
                <RoundBtn icon="arrowR" light label="Next" onClick={() => go(1)} />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ============================================
// STATEMENT — scroll-revealed sentence with a card stack
// ============================================
function RevealWord({ children, progress, range, className = '' }: { children: React.ReactNode; progress: MotionValue<number>; range: [number, number]; className?: string }) {
  const opacity = useTransform(progress, range, [0.18, 1])
  return <motion.span style={{ opacity }} className={`inline-block mr-[0.24em] ${className}`}>{children}</motion.span>
}

// Fan card that opens out as the section scrolls in
function SpreadCard({ slug, i, n, progress }: { slug: string; i: number; n: number; progress: MotionValue<number> }) {
  const o = i - (n - 1) / 2
  const smooth = useSpring(progress, { stiffness: 60, damping: 20, mass: 0.8 })
  const x = useTransform(smooth, [0, 1], [o * 10, o * 122])
  const rotate = useTransform(smooth, [0, 1], [o * 2, o * 7])
  const y = useTransform(smooth, [0, 1], [0, Math.abs(o) * 14])
  return (
    <motion.div style={{ x, rotate, y, zIndex: 10 - Math.abs(Math.round(o)) }} className="absolute left-1/2 top-0 -ml-[72px] w-[144px] h-[180px] will-change-transform">
      <div className={`w-full h-full rounded-[16px] overflow-hidden bg-white ${CARD}`}>
        <img src={poster(slug)} alt="" className="w-full h-full object-cover" />
      </div>
    </motion.div>
  )
}

function StatementSection({ t }: { t: Copy }) {
  const ref = useRef<HTMLDivElement>(null)
  const fanRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.45'] })
  const { scrollYProgress: fanProgress } = useScroll({ target: fanRef, offset: ['start 0.95', 'start 0.4'] })
  const n = t.statement.length
  const stack = ['04-kamuran-kreatif-kisa-film', '09-linde-29-ekim', '11-isijet-motion-graphic', '08-zuber-3d-urun-filmi', '01-recrea-sosyal-medya']

  return (
    <section className="py-24 md:py-36 overflow-hidden">
      <div className={`${wrap} text-center`}>
        {/* The fan owns its own band of space, so it never covers the sentence */}
        <div ref={fanRef} className="relative h-[110px] sm:h-[160px] md:h-[210px] mb-10 md:mb-14">
          <div className="absolute inset-x-0 top-0 h-[180px] origin-top scale-[0.56] sm:scale-[0.8] md:scale-100">
            {stack.map((slug, i) => <SpreadCard key={slug} slug={slug} i={i} n={stack.length} progress={fanProgress} />)}
          </div>
        </div>
        <div ref={ref} className="max-w-[760px] mx-auto">
          <p className="title text-[24px] sm:text-[30px] md:text-[38px] leading-[1.22] tracking-[-0.035em]">
            {t.statement.map((tok, k) => {
              const range: [number, number] = [k / n, Math.min(1, (k + 2) / n)]
              if (typeof tok === 'string') return <RevealWord key={k} progress={scrollYProgress} range={range}>{tok}</RevealWord>
              if ('hl' in tok) return <RevealWord key={k} progress={scrollYProgress} range={range} className="text-jade">{tok.hl}</RevealWord>
              return (
                <RevealWord key={k} progress={scrollYProgress} range={range}>
                  <img src={tok.img} alt="" className="inline-block align-middle w-[0.95em] h-[1.1em] rounded-[0.22em] object-cover -mt-[0.18em]" />
                </RevealWord>
              )
            })}
          </p>
        </div>
        <Reveal delay={0.2} className="flex justify-center gap-2 mt-8">
          <IconDot name="camera" size="w-8 h-8" />
          <IconDot name="film" size="w-8 h-8" />
          <IconDot name="drone" size="w-8 h-8" />
        </Reveal>
      </div>
    </section>
  )
}

// ============================================
// PRODUCTS — staircase intro + folder card
// ============================================
const stairSlugs = ['13-mr-hakans-jeddah', '15-mamush-ribeye', '12-claudie-miami', '07-ibb-bulgur-palas-drone', '02-kamuran-kruvasan']

function ProductsSection({ t, onPlay }: { t: Copy; onPlay: (w: Work) => void }) {
  const md = useMedia('(min-width: 768px)')
  const [tab, setTab] = useState(0)
  const app = t.products.apps[tab]
  const iconSpots = [
    { n: 'pen', l: '18%', t: '0%' }, { n: 'phone', l: '0%', t: '30%' }, { n: 'layers', l: '28%', t: '32%' }, { n: 'spark', l: '58%', t: '42%' },
    { n: 'cube', l: '80%', t: '30%' }, { n: 'heart', l: '10%', t: '64%' }, { n: 'camera', l: '38%', t: '68%' }, { n: 'bolt', l: '66%', t: '72%' },
  ]
  const tiles = ['bg-lime', 'bg-cobalt text-white', 'bg-flame text-white']

  return (
    <section id="urunler" className="py-16 md:py-24">
      {/* Staircase of work */}
      <div className={`${wrap} relative mb-20 md:mb-28`}>
        {/* On phones the note sits above the steps; from md up it floats over the first step's left */}
        <motion.div className="relative aspect-[1.7/1] md:aspect-[2.6/1] mt-[150px] md:mt-0" initial="hidden" whileInView="shown" viewport={{ once: true, margin: '-80px' }}>
          <Reveal className={`absolute left-0 -top-[140px] md:top-[2%] z-20 w-[180px] md:w-[190px] rounded-[14px] bg-white p-3.5 md:p-4 ${CARD}`}>
            <div className="flex items-start justify-between mb-6">
              <p className="text-[12px] md:text-[13px] font-bold leading-tight tracking-[-0.02em]">{t.stair.title}</p>
              <span className="w-5 h-5 rounded-full bg-ink text-white flex items-center justify-center shrink-0"><Icon name="play" size={11} /></span>
            </div>
            <p className="text-[9px] text-mute mb-1">— {t.stair.meta}</p>
            <p className="text-[10px] md:text-[11px] text-body leading-snug">{t.stair.desc}</p>
          </Reveal>
          {stairSlugs.map((slug, i) => (
            <motion.button
              key={slug}
              onClick={() => onPlay(bySlug(slug))}
              variants={{
                hidden: { opacity: 0, x: `${-94 * i}%`, y: `${-22 * i}%` },
                shown: { opacity: 1, x: '0%', y: '0%', transition: { ...SPRING, delay: 0.1 + i * 0.08 } },
              }}
              className="absolute w-[22%] md:w-[17%] aspect-[4/5] will-change-transform"
              style={{ left: md ? `${22 + i * 16}%` : `${i * 19.5}%`, top: md ? `${8 + i * 12}%` : `${i * 10}%`, zIndex: i + 1 }}
              aria-label={bySlug(slug).client}
            >
              <Lift className={`w-full h-full rounded-[10px] md:rounded-[14px] overflow-hidden bg-white ${CARD}`}>
                <img src={poster(slug)} alt="" className="w-full h-full object-cover" />
              </Lift>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Vision + folder */}
      <div className={`${wrap} grid md:grid-cols-[0.8fr_1.2fr] gap-12 md:gap-10 items-start`}>
        <div>
          <Icon name="phone" size={16} className="mb-6 text-ink/70" />
          <Title parts={t.products.title} className="text-[32px] md:text-[40px]" />
          <Reveal delay={0.2}><p className="text-[12px] md:text-[13px] text-body leading-relaxed max-w-[300px] mt-4">{t.products.desc}</p></Reveal>
          <div className="relative h-[170px] max-w-[300px] mt-10">
            {iconSpots.map((s, i) => (
              <motion.span
                key={s.n}
                initial={{ opacity: 0, scale: 0.4, y: -30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 160, damping: 18, delay: 0.2 + i * 0.06 }}
                className="absolute"
                style={{ left: s.l, top: s.t }}
              >
                <IconDot name={s.n} />
              </motion.span>
            ))}
          </div>
        </div>

        <Reveal y={40}>
          <div className={`rounded-[16px] bg-white p-2.5 md:p-3 ${CARD}`}>
            <div className="flex items-center justify-between px-2 pt-1 pb-3">
              <span className="text-[13px] font-medium">{t.products.label}</span>
              <span className="inline-flex items-center gap-1.5 h-7 px-3 rounded-full bg-paper text-[11px] font-medium"><Icon name="plus" size={11} /> {t.products.store}</span>
            </div>
            <div className="relative bg-ink rounded-t-[12px] h-11 flex items-center px-3 gap-1" style={{ clipPath: 'polygon(0 0, 78% 0, 84% 100%, 100% 100%, 100% 100%, 0 100%)' }}>
              {t.products.apps.map((a, i) => (
                <button key={a.name} onClick={() => setTab(i)} className={`h-7 px-3 rounded-full text-[12px] font-medium transition-colors ${tab === i ? 'bg-white text-ink' : 'text-white/55 hover:text-white'}`}>
                  {a.name}
                </button>
              ))}
            </div>
            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={app.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  className="bg-white rounded-b-[12px] border border-t-0 border-line p-4 md:p-6"
                >
                  <div className="flex items-start gap-4 md:gap-5 mb-5">
                    <img src={app.icon} alt={`${app.name} icon`} className="w-16 h-16 md:w-20 md:h-20 rounded-[18px] md:rounded-[22px] shadow-[0_16px_30px_-16px_rgba(0,0,0,0.5)]" />
                    <div className="pt-1">
                      <p className="title text-[24px] md:text-[30px]">{app.name}</p>
                      <p className="text-[11px] md:text-[12px] text-mute mt-0.5">{app.tag} · iOS</p>
                    </div>
                  </div>
                  <p className="text-[12px] md:text-[13px] text-body leading-relaxed mb-5">{app.desc}</p>
                  <div className="grid grid-cols-3 gap-2">
                    {app.features.map((f, k) => (
                      <div key={f} className={`rounded-[12px] aspect-[1/0.72] p-3 flex flex-col justify-between ${tiles[k]}`}>
                        <Icon name={['spark', 'layers', 'bolt'][k]} size={16} />
                        <span className="text-[11px] md:text-[13px] font-bold leading-tight tracking-[-0.02em]">{f}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ============================================
// COMMUNITY — numbers between drifting tiles
// ============================================
function DriftRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items]
  const offsets = [0, 14, -6, 18, 4, -10, 12, -2, 16, 6]
  return (
    <div className="overflow-hidden fade-x py-4">
      <motion.div animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }} transition={{ duration: 50, repeat: Infinity, ease: 'linear' }} className="flex w-max gap-5 md:gap-8">
        {doubled.map((src, i) => (
          <div key={i} style={{ transform: `translateY(${offsets[i % offsets.length]}px) rotate(${(i % 5) - 2}deg)` }}>
            <Tile src={src} className="w-[52px] h-[60px] md:w-[66px] md:h-[76px] rounded-[10px] md:rounded-[12px]" />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

function CommunitySection({ t }: { t: Copy }) {
  const all = [...works.map(w => poster(w.slug)), ...archive.map(a => a.thumbnail)]
  return (
    <section id="etki" className="py-16 md:py-24">
      <DriftRow items={all.slice(0, 10)} />
      <div className={`${wrap} text-center py-10 md:py-14`}>
        <Icon name="spark" size={14} className="mx-auto mb-5 text-ink/70" />
        <Title parts={t.community.title} center className="text-[32px] md:text-[44px]" />
        <Reveal delay={0.2}><p className="text-[12px] md:text-[13px] text-body max-w-[340px] mx-auto mt-3 leading-relaxed">{t.community.desc}</p></Reveal>
        <div className="flex flex-wrap justify-center gap-2 mt-7">
          {t.community.stats.map(([v, l], i) => (
            <Reveal key={l} delay={0.25 + i * 0.05}>
              <span className="inline-flex items-baseline gap-1.5 h-9 px-4 rounded-full bg-white shadow-[0_8px_20px_-14px_rgba(0,0,0,0.35)] items-center">
                <span className="text-[14px] font-bold tracking-[-0.03em]">{v}</span>
                <span className="text-[11px] text-body">{l}</span>
              </span>
            </Reveal>
          ))}
        </div>
      </div>
      <DriftRow items={all.slice(9)} reverse />
    </section>
  )
}

// ============================================
// STORY — "every frame tells a story" cards
// ============================================
function StorySection({ t, onPlay }: { t: Copy; onPlay: (w: Work) => void }) {
  const s = t.story
  const cardBase = `rounded-[16px] bg-white overflow-hidden ${CARD}`
  return (
    <section id="hakkimda" className="py-16 md:py-24">
      <div className={wrap}>
        <Kicker parts={s.kicker} className="text-center mb-3" />
        <Title parts={s.title} center className="text-[32px] md:text-[44px]" />
        <Reveal delay={0.2}><p className="text-[12px] md:text-[13px] text-body text-center max-w-[460px] mx-auto mt-4 leading-relaxed">{s.desc}</p></Reveal>

        <div className="grid md:grid-cols-2 gap-4 md:gap-5 mt-12 md:mt-16">
          <div className="space-y-4 md:space-y-5">
            {/* A — production */}
            <Reveal className={`${cardBase} p-4 md:p-5`}>
              <button onClick={() => onPlay(films[0])} className="inline-flex items-center gap-1.5 text-[11px] font-medium"><span className="w-4 h-4 rounded-full bg-ink text-white flex items-center justify-center"><Icon name="play" size={9} /></span>{s.a.chip}</button>
              <div className="relative h-[170px] md:h-[200px] my-4">
                {['01-recrea-sosyal-medya', '11-isijet-motion-graphic', '02-kamuran-kruvasan'].map((slug, i) => (
                  <motion.div
                    key={slug}
                    initial={{ rotate: 0, x: 0 }}
                    whileInView={{ rotate: (i - 1) * 9, x: (i - 1) * 26 }}
                    viewport={{ once: true }}
                    transition={{ ...SPRING, delay: 0.2 }}
                    className="absolute left-1/2 top-1/2 -ml-[52px] -mt-[70px] md:-ml-[60px] md:-mt-[80px]"
                    style={{ zIndex: i }}
                  >
                    <Tile src={poster(slug)} className="w-[104px] h-[140px] md:w-[120px] md:h-[160px] rounded-[12px]" />
                  </motion.div>
                ))}
              </div>
              <p className="text-[14px] font-bold tracking-[-0.02em]">{s.a.title}</p>
              <p className="text-[11px] md:text-[12px] text-body mt-1 leading-relaxed">{s.a.desc}</p>
              <button onClick={() => onPlay(films[0])} className={`${btnGhost} h-8 px-3 mt-3 -ml-3`}>{s.a.cta}</button>
            </Reveal>

            {/* C — leadership */}
            <Reveal className={cardBase}>
              <div className="aspect-[16/10] overflow-hidden">
                <img src={poster('14-statement-coffee')} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="p-4 md:p-5 bg-[#EFEFED]">
                <p className="text-[14px] font-bold tracking-[-0.02em]">{s.c.title}</p>
                <p className="text-[11px] md:text-[12px] text-body mt-1 leading-relaxed">{s.c.desc}</p>
                <a href="#deneyim" className={`${btnGhost} h-8 px-3 mt-3 -ml-3`}>{s.c.cta}</a>
              </div>
            </Reveal>
          </div>

          <div className="space-y-4 md:space-y-5 md:pt-16">
            {/* B — AI */}
            <Reveal className={cardBase}>
              <div className="relative aspect-[16/9] bg-cobalt overflow-hidden">
                <AutoVideo src={vsrc('10-hepsiburada-3d-animasyon')} poster={poster('10-hepsiburada-3d-animasyon')} className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <div className="p-4 md:p-5 bg-[#EFEFED]">
                <p className="text-[14px] font-bold tracking-[-0.02em]">{s.b.title}</p>
                <p className="text-[11px] md:text-[12px] text-body mt-1 leading-relaxed">{s.b.desc}</p>
                <a href="#urunler" className={`${btnGhost} h-8 px-3 mt-3 -ml-3`}>{s.b.cta}</a>
              </div>
            </Reveal>

            {/* D — exit, in a phone */}
            <Reveal className={`${cardBase} relative p-6 md:p-8 flex flex-col items-center`}>
              <span className="absolute top-4 right-4 w-6 h-6 rounded-full bg-ink text-white flex items-center justify-center"><Icon name="spark" size={12} /></span>
              <div className="w-[170px] md:w-[190px] h-[260px] md:h-[300px] rounded-[30px] bg-ink p-4 flex flex-col items-center shadow-[0_30px_50px_-25px_rgba(0,0,0,0.6)]">
                <span className="w-12 h-1 rounded-full bg-white/20 mt-1 mb-auto" />
                <p className="text-[9px] text-white/40 text-center">{s.d.kicker}</p>
                <p className="text-[18px] md:text-[20px] text-white font-medium tracking-[-0.03em] my-1.5">{s.d.title}</p>
                <p className="text-[10px] text-white/50">{s.d.meta}</p>
                <span className="mt-auto mb-1 text-[10px] text-lime font-bold tracking-[0.2em]">EXIT ✦</span>
              </div>
              <p className="text-[11px] md:text-[12px] text-body text-center mt-5 max-w-[280px] leading-relaxed">{s.d.desc}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================
// WORK — grid; a clicked card grows into the centre over a blurred page
// ============================================
const LAYOUT = { type: 'spring', stiffness: 210, damping: 30, mass: 0.9 } as const

function WorkSection({ t, onArchive }: { t: Copy; onArchive: (a: ArchiveItem) => void }) {
  // origin = the tile the card grew out of (and returns to); slug = what's playing now.
  // Prev/next only swap the slug, so the shared-layout card never changes identity mid-flight.
  const [open, setOpen] = useState<{ origin: string; slug: string } | null>(null)
  // 15 tiles: 13 works + two archive stills, so the 5×3 grid closes
  type Cell = { key: string; img: string; label: string; work?: Work; item?: ArchiveItem }
  const fromWork = (w: Work): Cell => ({ key: w.slug, img: poster(w.slug), label: w.client, work: w })
  const fromArchive = (a: ArchiveItem): Cell => ({ key: `a${a.id}`, img: a.thumbnail, label: a.title, item: a })
  const grid: Cell[] = [...verticals.slice(0, 7).map(fromWork), ...films.map(fromWork), ...verticals.slice(7).map(fromWork), fromArchive(archive[0]), fromArchive(archive[1])]
  const order = grid.filter((c) => c.work).map((c) => c.key)
  const current = open ? bySlug(open.slug) : null
  const step = (d: number) => open && setOpen({ origin: open.origin, slug: order[(order.indexOf(open.slug) + d + order.length) % order.length] })

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null)
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  })

  return (
    <section id="isler" className="py-16 md:py-24">
      <div className={wrap}>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-14">
          <div>
            <Kicker parts={t.work.kicker} accent="text-flame" className="mb-2" />
            <Title parts={t.work.title} className="text-[32px] md:text-[44px]" />
          </div>
          <Reveal delay={0.2}><p className="text-[12px] md:text-[13px] text-body max-w-[260px] leading-relaxed">{t.work.desc}</p></Reveal>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-5 lg:px-[4%]">
          {grid.map((c, i) => (
            <motion.button
              key={c.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ ...SPRING, delay: (i % 5) * 0.05 }}
              onClick={() => (c.item ? onArchive(c.item) : setOpen({ origin: c.key, slug: c.key }))}
              className="group relative aspect-[4/5]"
              aria-label={c.label}
            >
              {open?.origin === c.key ? (
                <div className="absolute inset-0 rounded-[14px] bg-black/[0.04]" />
              ) : (
                <motion.div layoutId={`work-${c.key}`} transition={LAYOUT} style={{ borderRadius: 14 }} className="absolute inset-0 overflow-hidden bg-[#e9e9e7]">
                  <img src={c.img} alt="" loading="lazy" onError={thumbFallback} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                  <span className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-black/60 to-transparent text-white text-[11px] font-bold text-left opacity-0 group-hover:opacity-100 transition-opacity duration-300 truncate">{c.label}</span>
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {current && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[90] bg-paper/60 backdrop-blur-xl"
            onClick={() => setOpen(null)}
          />
        )}
        {open && current && (
          <div key="stage" className="fixed inset-0 z-[95] flex flex-col items-center justify-center gap-4 p-4 pointer-events-none">
            <motion.div
              layoutId={`work-${open.origin}`}
              transition={LAYOUT}
              style={{ borderRadius: 20 }}
              className={`pointer-events-auto relative overflow-hidden bg-black ${CARD} ${current.vertical ? 'h-[min(76svh,760px)] aspect-[9/16]' : 'w-[min(92vw,1100px)] aspect-video'}`}
            >
              {/* Keyed remount: the previous film unmounts at once, so two never play together */}
              <motion.div
                key={current.slug}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35, delay: open.slug === open.origin ? 0.3 : 0 }}
                className="absolute inset-0"
              >
                <img src={poster(current.slug)} alt="" className="absolute inset-0 w-full h-full object-cover" />
                <Player src={vsrc(current.slug)} poster={poster(current.slug)} unmuteLabel={t.work.unmute} className="absolute inset-0 w-full h-full object-contain bg-black" />
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.2, duration: 0.35 }}
              className="pointer-events-auto flex items-center gap-3 max-w-[92vw]"
            >
              <RoundBtn icon="arrowL" label="Previous" onClick={() => step(-1)} />
              {/* Fixed width so the arrows stay put while captions change length */}
              <div className="text-center w-[190px] sm:w-[260px] px-1">
                <p className="text-[13px] md:text-[14px] font-bold tracking-[-0.02em] truncate">{current.client}{current.place ? ` · ${current.place}` : ''}</p>
                <p className="text-[11px] text-body truncate">{current.title} — {t.work.cats[current.category]}</p>
              </div>
              <RoundBtn icon="arrowR" label="Next" onClick={() => step(1)} />
              <button onClick={() => setOpen(null)} aria-label="Close" className="ml-2 w-9 h-9 rounded-full bg-ink text-white flex items-center justify-center">
                <Icon name="plus" size={15} className="rotate-45" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}

// ============================================
// ARCHIVE — card carousel
// ============================================
function ArchiveSection({ t, onPlay }: { t: Copy; onPlay: (a: ArchiveItem) => void }) {
  const rowRef = useRef<HTMLDivElement>(null)
  const [prog, setProg] = useState(0)
  const scroll = (d: number) => rowRef.current?.scrollBy({ left: d * 260, behavior: 'smooth' })
  useEffect(() => {
    const el = rowRef.current
    if (!el) return
    const onScroll = () => setProg(el.scrollLeft / Math.max(1, el.scrollWidth - el.clientWidth))
    el.addEventListener('scroll', onScroll)
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="py-16 md:py-24">
      <div className={`${wrap} grid md:grid-cols-[0.55fr_1.45fr] gap-8 md:gap-6`}>
        <div className="flex md:flex-col justify-between gap-6">
          <div>
            <Kicker parts={t.archive.kicker} accent="text-violet" className="mb-2" />
            <Title parts={t.archive.title} className="text-[30px] md:text-[40px]" />
            <Reveal delay={0.2}><p className="text-[11px] md:text-[12px] text-body leading-relaxed max-w-[220px] mt-3">{t.archive.desc}</p></Reveal>
          </div>
          <div className="hidden md:flex gap-1.5"><RoundBtn icon="arrowL" label="Previous" onClick={() => scroll(-1)} /><RoundBtn icon="arrowR" label="Next" onClick={() => scroll(1)} /></div>
        </div>
        <div className="min-w-0">
          <div className="flex justify-end mb-4">
            <button onClick={() => onPlay(archive[0])} className="inline-flex items-center gap-1 h-7 px-3.5 rounded-full bg-violet text-white text-[11px] font-semibold"><Icon name="play" size={11} /> {t.archive.all}</button>
          </div>
          <div ref={rowRef} className="flex gap-3 md:gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory">
            {archive.map((a, i) => (
              <Reveal key={a.id} delay={i * 0.06} className="snap-start shrink-0 w-[46%] sm:w-[31%] md:w-[24%]">
                <button onClick={() => onPlay(a)} className="group block w-full text-left">
                  <div className="aspect-square rounded-[12px] overflow-hidden bg-[#e9e9e7]">
                    <img src={a.thumbnail} alt={a.title} onError={thumbFallback} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <p className="text-[12px] font-bold tracking-[-0.02em] mt-2.5 truncate">{a.title}</p>
                  <p className="text-[10px] text-mute">{t.work.cats[a.category]} · {a.year}</p>
                </button>
              </Reveal>
            ))}
          </div>
          <div className="relative h-[2px] bg-line mt-6 max-w-[200px]">
            <span className="absolute inset-y-0 left-0 bg-ink transition-all duration-300" style={{ width: `${30 + prog * 70}%` }} />
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================
// EXPERIENCE — fanned cards + detail list
// ============================================
function ExperienceSection({ t }: { t: Copy }) {
  const e = t.experience
  const rot = [-5, 0, 5]
  const [hover, setHover] = useState<number | null>(null)
  const canHover = useCanHover()
  return (
    <section id="deneyim" className="py-16 md:py-24">
      <div className={`${wrap} grid md:grid-cols-[0.8fr_1.2fr] gap-12 items-center`}>
        <div>
          <Icon name="film" size={16} className="mb-5 text-ink/70" />
          <Title parts={[[e.title]]} className="text-[30px] md:text-[36px]" />
          <Reveal delay={0.2}><p className="text-[12px] md:text-[13px] text-body leading-relaxed max-w-[300px] mt-3">{e.desc}</p></Reveal>
        </div>
        <div className="flex justify-center md:justify-end items-center py-6">
          {e.cards.map((c, i) => {
            const hot = 'badge' in c
            return (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 50, rotate: 0 }}
                whileInView={{ opacity: 1, y: hot ? -10 : 0, rotate: rot[i] }}
                onHoverStart={() => canHover && setHover(i)}
                onHoverEnd={() => setHover(null)}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ ...SPRING, delay: i * 0.08 }}
                className="relative w-[31%] max-w-[170px] -mx-[1.5%] will-change-transform"
                style={{ zIndex: hover === i ? 30 : hot ? 10 : 1 }}
              >
                <Lift y={-14} scale={1.02} rotate={-rot[i]} className={`rounded-[14px] p-3 md:p-4 aspect-[0.86/1] flex flex-col ${CARD} ${hot ? 'bg-flame text-white' : 'bg-white text-ink'}`}>
                <div className="flex items-start justify-between gap-1">
                  <span className={`text-[10px] md:text-[11px] font-medium ${hot ? 'text-white/85' : 'text-body'}`}>{c.label}</span>
                  {hot && <span className="px-2 py-0.5 rounded-full bg-white text-ink text-[9px] font-bold -rotate-6">{(c as { badge: string }).badge}</span>}
                </div>
                <span className="title text-[26px] sm:text-[32px] md:text-[38px] mt-auto">{c.big}</span>
                <span className={`text-[9px] md:text-[10px] mt-2 ${hot ? 'text-white/75' : 'text-mute'}`}>{c.small}</span>
                </Lift>
              </motion.div>
            )
          })}
        </div>
      </div>

      <div className={`${wrap} mt-12 md:mt-16`}>
        <Reveal className="rounded-[16px] bg-white px-5 md:px-8">
          {e.jobs.map((j, i) => (
            <div key={j.company} className={`grid md:grid-cols-[180px_1fr_1.3fr] gap-1 md:gap-8 py-5 ${i ? 'border-t border-line' : ''}`}>
              <span className="text-[11px] text-mute pt-0.5">{j.period}</span>
              <div>
                <p className="text-[14px] font-bold tracking-[-0.02em]">{j.company}{i === 0 && <span className="ml-2 align-middle px-1.5 py-0.5 rounded-full bg-lime text-[9px] font-bold">EXIT</span>}</p>
                <p className="text-[11px] text-body">{j.role}</p>
              </div>
              <p className="text-[11px] md:text-[12px] text-body leading-relaxed mt-1 md:mt-0">{j.highlight}</p>
            </div>
          ))}
          {[e.edu, e.langs].map(([label, text, period]) => (
            <div key={label} className="grid md:grid-cols-[180px_1fr] gap-1 md:gap-8 py-5 border-t border-line">
              <span className="text-[11px] text-mute">{label}</span>
              <p className="text-[12px] md:text-[13px] font-medium">{text}{period && <span className="text-mute font-normal"> · {period}</span>}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

// ============================================
// LIME BAND
// ============================================
function BandSection({ t }: { t: Copy }) {
  const thumbs = ['12-claudie-miami', '10-hepsiburada-3d-animasyon', '15-mamush-ribeye', '11-isijet-motion-graphic', '07-ibb-bulgur-palas-drone', '13-mr-hakans-jeddah']
  const words = [...t.band.words, ...t.band.words]
  const icons = ['camera', 'cube', 'drone', 'spark', 'film', 'pen', 'layers', 'play', 'bolt', 'heart']
  return (
    <section className="py-10 md:py-16">
      <div className={wrap}>
        <div className="relative rounded-[16px] md:rounded-[20px] bg-lime overflow-hidden h-[280px] md:h-[340px]">
          <span className="absolute -right-6 -bottom-16 text-[260px] md:text-[360px] font-bold leading-none tracking-[-0.08em] text-white/25 select-none">YA</span>
          <div className="pt-5 md:pt-7">
            <motion.div animate={{ x: ['0%', '-50%'] }} transition={{ duration: 32, repeat: Infinity, ease: 'linear' }} className="flex w-max items-center">
              {words.map((w, i) => (
                <span key={i} className="flex items-center gap-3 md:gap-4 pr-3 md:pr-4 title text-[36px] md:text-[56px] whitespace-nowrap">
                  {w}
                  <span className="relative">
                    <img src={poster(thumbs[i % thumbs.length])} alt="" className="w-[30px] h-[34px] md:w-[44px] md:h-[50px] rounded-[6px] object-cover" />
                    {i % 3 === 0 && <span className="absolute left-1/2 -translate-x-1/2 top-full mt-1 text-[8px] font-bold tracking-normal leading-tight text-center">{t.band.caption[0]}<br /><span className="font-normal">{t.band.caption[1]}</span></span>}
                  </span>
                </span>
              ))}
            </motion.div>
          </div>
          <div className="absolute left-5 right-5 bottom-5 md:left-8 md:bottom-7 flex flex-wrap gap-2 md:gap-3">
            {icons.map((n, i) => (
              <motion.span
                key={n}
                initial={{ y: -220, opacity: 0, rotate: -40 }}
                whileInView={{ y: 0, opacity: 1, rotate: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ type: 'spring', stiffness: 110, damping: 15, delay: 0.1 + i * 0.07 }}
                style={{ marginTop: (i % 3) * 10 }}
              >
                <IconDot name={n} size="w-9 h-9 md:w-11 md:h-11" />
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================
// CLOSING CARDS
// ============================================
function ClosingSection({ t }: { t: Copy }) {
  const c = t.closing
  return (
    <section id="iletisim" className="py-10 md:py-16">
      <div className={`${wrap} grid md:grid-cols-2 gap-4 md:gap-5`}>
        <Reveal className="relative overflow-hidden rounded-[16px] md:rounded-[20px] bg-berry aspect-[4/4.4] md:aspect-[5/5.6]">
          <AutoVideo src={vsrc('15-mamush-ribeye')} poster={poster('15-mamush-ribeye')} className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-berry via-berry/50 to-berry/10" />
          <div className="absolute left-5 right-5 bottom-5 md:left-8 md:bottom-8 text-white">
            <span className="w-6 h-6 rounded-full border border-white/60 flex items-center justify-center mb-4"><Icon name="pen" size={12} /></span>
            <Title parts={c.a.title} className="text-[30px] md:text-[38px] [&_span]:!text-white" />
            <p className="text-[11px] md:text-[12px] text-white/80 max-w-[240px] mt-2 leading-relaxed">{c.a.desc}</p>
            <a href="mailto:yasin.aktas@outlook.com.tr" className="inline-flex items-center h-8 px-4 mt-5 rounded-full bg-white text-ink text-[11px] font-semibold hover:bg-white/85 transition-colors">{c.a.cta}</a>
            <p className="text-[11px] text-white/70 mt-3">yasin.aktas@outlook.com.tr · +90 530 465 39 74</p>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="relative overflow-hidden rounded-[16px] md:rounded-[20px] bg-white aspect-[4/4.4] md:aspect-[5/5.6]">
          <img
            src={poster('08-zuber-3d-urun-filmi')}
            alt=""
            className="absolute right-0 top-0 h-[78%] w-[70%] object-cover"
            style={{ WebkitMaskImage: 'linear-gradient(200deg,#000 40%,transparent 85%)', maskImage: 'linear-gradient(200deg,#000 40%,transparent 85%)' }}
          />
          <div className="absolute left-5 right-5 bottom-5 md:left-8 md:bottom-8">
            <span className="w-6 h-6 rounded-full bg-ink text-white flex items-center justify-center mb-4"><Icon name="linkedin" size={12} /></span>
            <Title parts={c.b.title} className="text-[30px] md:text-[38px]" />
            <p className="text-[11px] md:text-[12px] text-body max-w-[240px] mt-2 leading-relaxed">{c.b.desc}</p>
            <div className="flex gap-2 mt-5">
              <a href="https://linkedin.com/in/yasinakkts" target="_blank" rel="noopener" className={`${btnDark} h-8`}>{c.b.cta}</a>
              <a href="https://www.instagram.com/yasinakkts/" target="_blank" rel="noopener" className={`${btnGhost} h-8`}>Instagram</a>
            </div>
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
  const f = t.footer
  const hrefs: Record<string, string> = {
    [t.nav.projects]: '#isler', [t.nav.about]: '#hakkimda', [t.nav.products]: '#urunler', [t.nav.experience]: '#deneyim',
    Email: 'mailto:yasin.aktas@outlook.com.tr', [f.cols[1][2]]: 'tel:+905304653974',
  }
  return (
    <footer className="pt-10 pb-6">
      <div className={wrap}>
        <div className="rounded-[16px] md:rounded-[20px] bg-[#EAEAE8] p-6 md:p-10 grid gap-10 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <p className="title text-[22px] md:text-[26px]">{f.title}</p>
            <p className="text-[11px] md:text-[12px] text-body leading-relaxed max-w-[240px] mt-2">{f.desc}</p>
            <div className="flex gap-2 mt-6">
              {[['linkedin', 'https://linkedin.com/in/yasinakkts'], ['insta', 'https://www.instagram.com/yasinakkts/'], ['mail', 'mailto:yasin.aktas@outlook.com.tr'], ['phone', 'tel:+905304653974']].map(([n, h]) => (
                <a key={n} href={h} target={h.startsWith('http') ? '_blank' : undefined} rel="noopener" aria-label={n} className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-ink hover:text-white transition-colors">
                  <Icon name={n} size={14} />
                </a>
              ))}
            </div>
          </div>
          {f.cols.map(([head, ...items]) => (
            <div key={head}>
              <p className="text-[12px] font-bold mb-3">{head}</p>
              <ul className="space-y-2">
                {items.map((it) => (
                  <li key={it}>
                    {hrefs[it] ? <a href={hrefs[it]} className="text-[12px] text-body hover:text-ink transition-colors">{it}</a> : <span className="text-[12px] text-body">{it}</span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <p className="md:col-span-4 md:text-right text-[11px] text-body">{f.rights}</p>
        </div>
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
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  const vertical = playing.kind === 'file' ? playing.work.vertical : !!playing.item.isShort
  const title = playing.kind === 'file' ? playing.work.title : playing.item.title
  const meta = playing.kind === 'file'
    ? `${playing.work.client}${playing.work.place ? ` · ${playing.work.place}` : ''} — ${t.work.cats[playing.work.category]}`
    : `${t.work.cats[playing.item.category]} — ${playing.item.year}`

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-paper/85 backdrop-blur-xl p-4" onClick={onClose}>
      <button onClick={onClose} aria-label="Close" className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 rounded-full bg-ink text-white flex items-center justify-center z-10">
        <Icon name="plus" size={16} className="rotate-45" />
      </button>
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 20 }}
        transition={{ type: 'spring', stiffness: 260, damping: 28 }}
        className={vertical ? 'w-full max-w-[min(400px,calc((100svh-150px)*9/16))]' : 'w-full max-w-5xl'}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 px-1">
          <p className="text-[11px] text-body">{meta}</p>
          <p className="title text-[22px] md:text-[28px]">{title}</p>
        </div>
        <div className={`overflow-hidden rounded-[16px] bg-black shadow-[0_40px_80px_-30px_rgba(0,0,0,0.5)] ${vertical ? 'aspect-[9/16]' : 'aspect-video'}`}>
          {playing.kind === 'file' ? (
            <Player src={vsrc(playing.work.slug)} poster={poster(playing.work.slug)} unmuteLabel={t.work.unmute} className="w-full h-full object-contain" />
          ) : (
            <iframe
              src={`https://www.youtube.com/embed/${playing.item.youtubeId}?autoplay=1&playsinline=1&rel=0${playing.item.isShort ? `&loop=1&playlist=${playing.item.youtubeId}` : ''}`}
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
  const play = (work: Work) => setPlaying({ kind: 'file', work })

  useEffect(() => { document.documentElement.lang = lang }, [lang])

  return (
    <>
      <Navigation t={t} lang={lang} setLang={setLang} />
      <main>
        <HeroSection t={t} onPlay={play} />
        <ShowcaseSection t={t} onPlay={play} />
        <ReelSection t={t} onPlay={play} />
        <StatementSection t={t} />
        <ProductsSection t={t} onPlay={play} />
        <CommunitySection t={t} />
        <StorySection t={t} onPlay={play} />
        <WorkSection t={t} onArchive={(item) => setPlaying({ kind: 'yt', item })} />
        <ArchiveSection t={t} onPlay={(item) => setPlaying({ kind: 'yt', item })} />
        <ExperienceSection t={t} />
        <BandSection t={t} />
        <ClosingSection t={t} />
      </main>
      <Footer t={t} />
      <AnimatePresence>
        {playing && <VideoModal playing={playing} t={t} onClose={() => setPlaying(null)} />}
      </AnimatePresence>
    </>
  )
}
