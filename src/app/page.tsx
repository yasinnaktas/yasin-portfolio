'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'

// ============================================
// I18N COPY
// ============================================
type Lang = 'tr' | 'en'

const copy = {
  tr: {
    nav: { projects: 'Projeler', impact: 'Etki', products: 'Ürünler', about: 'Hakkımda', experience: 'Deneyim', contact: 'İletişim' },
    hero: {
      location: 'İstanbul — Kreatif Liderlik & Yapay Zeka',
      title1: 'HEAD OF',
      title2: 'CREATIVE',
      sub: "Video prodüksiyonu yalnızca çekim olarak değil, stratejiden yayına uzanan bütünsel bir üretim süreci olarak ele alıyorum. Beş yılı aşkın sürede 1000'den fazla markaya uçtan uca hizmet sağladım; 10 kişilik kreatif ekip yönettim ve kurduğum ajansı başarılı bir exit ile devrettim. Bugün ekipleri, bütçeleri ve yapay zeka destekli üretim süreçlerini yöneten karar verici pozisyonlara odaklanıyorum.",
      cta1: 'Etkiyi Gör',
      cta2: 'Benimle Çalış',
    },
    marquee: ['Kreatif Liderlik', 'Ekip Yönetimi', 'Performance Marketing', 'AI Strateji', 'Video Prodüksiyon', 'iOS Ürün Geliştirme', 'Bütçe Yönetimi', 'Marka Kampanyaları', 'İçerik Stratejisi', 'Post-Prodüksiyon'],
    impact: {
      kicker: 'Rakamlarla Etki',
      title: 'Kariyerim Boyunca Yarattığım Değer',
      chartViewsTitle: 'İçeriklerimin Ulaştığı Toplam İzlenme',
      chartViewsDesc: 'Turkuvaz Medya ve Creative Touch Productions dönemlerinde ürettiğim ve yönettiğim içeriklerin yıllara göre toplam izlenme sayısı (milyon)',
      chartEngTitle: 'Kampanya Optimizasyonunun Sonucu',
      chartEngDesc: 'Aynı bütçeyle yürütülen kampanyalarda, veri analiziyle yaptığım iyileştirmeler etkileşimi ortalama %35 artırdı (100 = optimizasyon öncesi seviye)',
      engBefore: 'Optimizasyon öncesi',
      engAfter: 'Optimizasyon sonrası',
      statBrands: 'Marka', statBrandsDesc: 'Hizmet verilen toplam marka sayısı',
      statViews: 'İzlenme', statViewsDesc: 'İçeriklerin ulaştığı toplam izlenme',
      statVideos: 'Video', statVideosDesc: 'Teslim edilen tamamlanmış video',
      statTeam: 'Kişilik Ekip', statTeamDesc: 'Doğrudan yönettiğim ekip',
      statEngDesc: 'optimize edilen kampanyalarda ortalama etkileşim artışı',
    },
    projects: { kicker: 'Portföy', title: 'Seçili İşler', all: 'Tümü', featured: 'Öne Çıkan' },
    products: {
      kicker: 'Ürünler',
      title: "Fikirden App Store'a",
      desc: 'Medya ve prodüksiyon birikimini ürün vizyonuyla birleştirerek, yapay zeka destekli geliştirme süreçleriyle iOS uygulamalarını konseptten yayına uçtan uca hayata geçiriyorum.',
      apps: [
        { name: 'Speego', tag: 'Yapay Zeka Destekli Konuşma Koçu · iOS', icon: '/apps/speego.png', accent: '#3B82F6',
          desc: '30 saniyelik video kaydı üzerinden ton, akıcılık, beden dili ve netlik analizi yapan yapay zeka destekli konuşma koçu. Mülakat, sunum ve topluluk önünde konuşma hazırlığı için kişiselleştirilmiş değerlendirme ve gelişim önerileri sunar. Abonelik modeliyle yayındadır.' },
        { name: 'Sanal Drone', tag: 'Gayrimenkul Pazarlama Aracı · iOS', icon: '/apps/sanal-drone.png', accent: '#22C55E',
          desc: 'Arsa ve gayrimenkul ilanlarını saniyeler içinde profesyonel pazarlama içeriğine dönüştüren yapay zeka destekli araç. Harita üzerinde çizilen arsa sınırından otomatik alan hesabı, sosyal medyaya hazır ilan görselleri ve gerçekçi drone tanıtım videoları üretir. Emlak danışmanları ve gayrimenkul ofisleri için geliştirilmiştir.' },
        { name: 'Someday: Sealed Messages', tag: 'Uçtan Uca Şifreli Mesaj Kasası · iOS', icon: '/apps/someday.png', accent: '#F59E0B',
          desc: 'Sevdiklerinize video, ses ve mektup mesajları kaydedip belirlediğiniz tarihte veya güvenilir kişilerin onayıyla ileten dijital mesaj kasası. Tüm içerik cihaz üzerinde uçtan uca şifrelenir; sunucusuz mimarisiyle gizlilik esaslı tasarlanmıştır. Tek seferlik satın alma modeliyle sunulur.' },
      ],
    },
    about: {
      kicker: 'Hakkımda',
      title1: 'Üretimden', title2: 'Yönetime',
      desc: "Turkuvaz Medya'da 4 yıl boyunca Kreatif Videographer olarak görev aldım. Creative Touch Productions Dijital reklam ajansını kurarak 10 kişilik bir ekiple 1000+ markaya video içerikleri ve dijital danışmanlık hizmetleri sundum. Ocak 2026'da ajansım Hamburg merkezli bir teknoloji firması tarafından satın alındı. Sahadan gelen üretim gücünü, ekip ve bütçe yöneten karar verici perspektifiyle birleştiriyorum.",
      areas: [
        { title: 'Kreatif Liderlik ve Karar Verme', items: [
          { label: 'Ekip ve Bütçe Yönetimi', desc: '10 kişilik cross-functional ekip ve 15M₺ üzeri medya bütçesinin uçtan uca yönetimi.' },
          { label: 'Stratejik Vizyon', desc: 'Neyi test edeceğine, neyi ölçeklendireceğine, neyi durduracağına platform verisiyle karar verme.' },
          { label: 'Başarılı Exit', desc: 'Sıfırdan kurulan ajansın Hamburg merkezli teknoloji firmasına devri.' },
        ]},
        { title: 'Performance ve İçerik Stratejisi', items: [
          { label: 'Veri Odaklı Kreatif', desc: 'Dashboard okuyup kazananı ayıran, düşük performansı teşhis eden iterasyon döngüleri — optimize kampanyalarda ~%35 etkileşim artışı.' },
          { label: 'Platform-Native Üretim', desc: 'Meta, TikTok, Instagram ve YouTube için hook, tempo ve format optimizasyonu.' },
          { label: 'UGC ve Lokalizasyon', desc: 'İçerik üreticisi yönetimi ve Türkiye pazarına özgü kültürel içgörü.' },
        ]},
        { title: 'Yapay Zeka ve İnovasyon', items: [
          { label: 'AI Destekli Üretim', desc: 'Reklam filmi ve animasyon süreçlerinde en güncel yapay zeka araçlarıyla hız ve ölçek.' },
          { label: 'Kurumsal AI Dönüşümü', desc: 'Şirketlerin yapay zeka çağına adaptasyonuna yönetici vizyonuyla destek.' },
          { label: 'iOS Ürün Geliştirme', desc: "AI destekli geliştirme yaklaşımıyla fikirden App Store'a uçtan uca ürünler." },
        ]},
        { title: 'Prodüksiyon Temeli', items: [
          { label: 'Görüntü Yönetimi ve Drone', desc: 'Profesyonel kamera ve drone ile 500+ tamamlanmış video işi.' },
          { label: 'Post-Prodüksiyon', desc: 'Premiere Pro ve After Effects ile ileri seviye kurgu ve VFX.' },
        ]},
      ],
      location: 'İstanbul, Avrupa', country: 'Türkiye',
      exitTitle: 'Başarılı Exit',
      exitDesc: "Creative Touch Productions olarak 2025 ve 2026 yılında binden fazla firmaya tanıtım filmi ve sosyal medya danışmanlığı hizmeti sunduk. 2026 Ocak ayı ile ajansımı Hamburg merkezli bir teknoloji firmasına devrettim.",
      exitStats: [ { v: '1000+', l: 'Marka' }, { v: '10', l: 'Kişilik Ekip' }, { v: '15M₺', l: 'Reklam Bütçesi' }, { v: '50M+', l: 'İzlenme' } ],
    },
    experience: {
      kicker: 'Kariyer', title: 'Deneyim',
      jobs: [
        { role: 'Kurucu & Kreatif Direktör', company: 'Creative Touch Productions', period: 'Mart 2025 - Ocak 2026', logo: '◆', isExit: true,
          highlight: "AI destekli reklam filmi, animasyon ve sosyal video üreten dijital ajansı kurdum; 10 kişilik cross-functional ekibi yönettim. 1000+ markaya kreatif teslim ettik, optimize kampanyalarda etkileşimi ~%35 artırdık. Ajans Ocak 2026'da Hamburg merkezli bir teknoloji firmasına devredildi." },
        { role: 'Kreatif Videographer', company: 'Turkuvaz Medya', period: 'Ekim 2021 - Mayıs 2025', logo: 'T', isExit: false,
          highlight: 'Sabah, ATV, A Haber gibi kanallarda marka kampanyaları ve editoryal içerik ürettim. Profesyonel kamera ve drone çekimleri yönettim; Premiere Pro ve After Effects ile 500+ tamamlanmış video teslim ettim.' },
        { role: 'Stajyer — Yayın & Prodüksiyon', company: 'TV8 / Acun Medya', period: 'Haziran 2020 - Ağustos 2020', logo: 'A', isExit: false,
          highlight: 'TV yayın planlaması ve büyük ölçekli prodüksiyon iş akışlarında görev aldım; içerik stratejisinin temellerini sahada öğrendim.' },
      ],
    },
    contact: {
      kicker: 'İletişim', title1: 'Birlikte', title2: 'Çalışalım',
      desc: 'Liderlik pozisyonları, danışmanlık veya iş birlikleri için.',
      email: 'Email Gönder',
    },
    footer: { rights: '© 2026 Yasin Aktaş', from: "İstanbul'dan sevgiler ile" },
  },
  en: {
    nav: { projects: 'Work', impact: 'Impact', products: 'Products', about: 'About', experience: 'Experience', contact: 'Contact' },
    hero: {
      location: 'Istanbul — Creative Leadership & AI',
      title1: 'HEAD OF',
      title2: 'CREATIVE',
      sub: "I treat video production not as shooting, but as an end-to-end process from strategy to distribution. Over 5+ years I delivered full-cycle creative for 1000+ brands, led a 10-person team, and exited the agency I founded to a Hamburg-based tech company. Today I focus on decision-making roles — leading teams, budgets and AI-powered production pipelines.",
      cta1: 'See the Impact',
      cta2: 'Work With Me',
    },
    marquee: ['Creative Leadership', 'Team Management', 'Performance Marketing', 'AI Strategy', 'Video Production', 'iOS Product Development', 'Budget Ownership', 'Brand Campaigns', 'Content Strategy', 'Post-Production'],
    impact: {
      kicker: 'Impact in Numbers',
      title: 'Value Delivered Throughout My Career',
      chartViewsTitle: 'Total Views Reached by My Content',
      chartViewsDesc: 'Total views (in millions) of content I produced and directed across Turkuvaz Media and Creative Touch Productions, by year',
      chartEngTitle: 'Result of Campaign Optimization',
      chartEngDesc: 'On campaigns run with the same budget, my data-driven improvements increased engagement by an average of 35% (100 = pre-optimization baseline)',
      engBefore: 'Before optimization',
      engAfter: 'After optimization',
      statBrands: 'Brands', statBrandsDesc: 'Total brands served',
      statViews: 'Views', statViewsDesc: 'Total views reached by content',
      statVideos: 'Videos', statVideosDesc: 'Completed videos delivered',
      statTeam: 'Person Team', statTeamDesc: 'Team under my direct management',
      statEngDesc: 'average engagement increase on optimized campaigns',
    },
    projects: { kicker: 'Portfolio', title: 'Selected Work', all: 'All', featured: 'Featured' },
    products: {
      kicker: 'Products',
      title: 'From Idea to the App Store',
      desc: 'Combining media and production expertise with product vision, I take iOS applications from concept to release through AI-assisted development workflows.',
      apps: [
        { name: 'Speego', tag: 'AI-Powered Speaking Coach · iOS', icon: '/apps/speego.png', accent: '#3B82F6',
          desc: 'An AI-powered speaking coach that analyzes tone, fluency, body language and clarity from a 30-second video recording. Provides personalized assessment and improvement drills for interview, presentation and public-speaking preparation. Available on a subscription model.' },
        { name: 'Sanal Drone', tag: 'Real Estate Marketing Tool · iOS', icon: '/apps/sanal-drone.png', accent: '#22C55E',
          desc: 'An AI-powered tool that turns land and real estate listings into professional marketing content in seconds. Generates automatic area calculation from map-drawn parcel boundaries, social-ready listing visuals and realistic aerial promo videos. Built for real estate agents and agencies.' },
        { name: 'Someday: Sealed Messages', tag: 'End-to-End Encrypted Message Vault · iOS', icon: '/apps/someday.png', accent: '#F59E0B',
          desc: 'A digital message vault for recording video, voice and letter messages to loved ones, delivered on a chosen date or upon guardian confirmation. All content is end-to-end encrypted on device with a serverless, privacy-first architecture. Offered as a one-time purchase.' },
      ],
    },
    about: {
      kicker: 'About',
      title1: 'From Production', title2: 'to Leadership',
      desc: "I spent 4 years as a Creative Videographer at Turkuvaz Media, then founded Creative Touch Productions — a digital ad agency where a 10-person team served 1000+ brands with video content and digital consultancy. The agency was acquired by a Hamburg-based tech company in January 2026. I pair hands-on production craft with the perspective of a decision-maker who owns teams and budgets.",
      areas: [
        { title: 'Creative Leadership & Decision-Making', items: [
          { label: 'Team & Budget Ownership', desc: 'End-to-end management of a 10-person cross-functional team and a 15M₺+ media budget.' },
          { label: 'Strategic Vision', desc: 'Using platform data to decide what to test, what to scale and what to kill.' },
          { label: 'Successful Exit', desc: 'Agency built from zero, acquired by a Hamburg-based technology company.' },
        ]},
        { title: 'Performance & Content Strategy', items: [
          { label: 'Data-Driven Creative', desc: 'Reading dashboards to spot winners and diagnose underperformance — ~35% engagement lift on optimized campaigns.' },
          { label: 'Platform-Native Production', desc: 'Hooks, pacing and formats tailored for Meta, TikTok, Instagram and YouTube.' },
          { label: 'UGC & Localization', desc: 'Creator direction and native cultural insight for the Turkish market.' },
        ]},
        { title: 'AI & Innovation', items: [
          { label: 'AI-Assisted Production', desc: 'Speed and scale in ad film and animation workflows using cutting-edge AI tools.' },
          { label: 'Corporate AI Transformation', desc: "Supporting companies' adaptation to the AI era with an executive lens." },
          { label: 'iOS Product Development', desc: 'Shipping products from idea to the App Store with AI-assisted development.' },
        ]},
        { title: 'Production Foundation', items: [
          { label: 'Cinematography & Drone', desc: '500+ finished video pieces with professional camera and drone work.' },
          { label: 'Post-Production', desc: 'Advanced editing and VFX in Premiere Pro and After Effects.' },
        ]},
      ],
      location: 'Istanbul, Europe', country: 'Türkiye',
      exitTitle: 'Successful Exit',
      exitDesc: "As Creative Touch Productions, we delivered promo films and social media consultancy to over a thousand companies across 2025-2026. In January 2026 I handed the agency over to a Hamburg-based technology company.",
      exitStats: [ { v: '1000+', l: 'Brands' }, { v: '10', l: 'Person Team' }, { v: '15M₺', l: 'Ad Budget' }, { v: '50M+', l: 'Views' } ],
    },
    experience: {
      kicker: 'Career', title: 'Experience',
      jobs: [
        { role: 'Founder & Creative Director', company: 'Creative Touch Productions', period: 'Mar 2025 - Jan 2026', logo: '◆', isExit: true,
          highlight: 'Built and led a digital agency specializing in AI-assisted ad films, animation and social video, managing a 10-person cross-functional team. Delivered creative for 1000+ brands and improved engagement by ~35% on optimized campaigns. Acquired by a Hamburg-based tech company in January 2026.' },
        { role: 'Creative Videographer', company: 'Turkuvaz Media', period: 'Oct 2021 - May 2025', logo: 'T', isExit: false,
          highlight: 'Produced brand campaigns and editorial content for channels like Sabah, ATV and A Haber. Led professional camera and drone shoots; delivered 500+ finished videos through Premiere Pro and After Effects.' },
        { role: 'Intern — Broadcast & Production', company: 'TV8 / Acun Media', period: 'Jun 2020 - Aug 2020', logo: 'A', isExit: false,
          highlight: 'Supported TV broadcast planning and large-scale production workflows, gaining early grounding in content strategy.' },
      ],
    },
    contact: {
      kicker: 'Contact', title1: "Let's Work", title2: 'Together',
      desc: 'For leadership roles, consultancy or collaborations.',
      email: 'Send Email',
    },
    footer: { rights: '© 2026 Yasin Aktaş', from: 'With love from Istanbul' },
  },
} as const

// ============================================
// PROJECT DATA
// ============================================
const projects = [
  { id: 1, title: 'AI Creative Project', category: 'Reklam Filmi', youtubeId: 'KooyeFCgugQ', thumbnail: 'https://img.youtube.com/vi/KooyeFCgugQ/maxresdefault.jpg', year: '2026', color: '#8B5CF6' },
  { id: 8, title: 'Brand Film', category: 'AI Video', youtubeId: 'AKoHR01gtTo', thumbnail: 'https://img.youtube.com/vi/AKoHR01gtTo/maxresdefault.jpg', year: '2026', color: '#EC4899' },
  { id: 2, title: 'Brand Campaign', category: 'Brand Film', youtubeId: 'EgRRRKSXxzg', thumbnail: '/thumbnails/thumb2.jpg', year: '2024', color: '#3B82F6', isShort: true },
  { id: 3, title: 'AI-Powered Commercial', category: 'AI Video', youtubeId: '8-YxCmFjRLA', thumbnail: '/thumbnails/thumb3.jpg', year: '2024', color: '#10B981', isShort: true },
  { id: 4, title: 'Social Media Series', category: 'Social Content', youtubeId: 'vrYuv7i9HUM', thumbnail: '/thumbnails/thumb4.jpg', year: '2023', color: '#F59E0B' },
  { id: 5, title: 'Corporate Documentary', category: 'Documentary', youtubeId: 'K2H-thz48TI', thumbnail: '/thumbnails/thumb5.jpg', year: '2023', color: '#EF4444' },
  { id: 7, title: 'Product Launch Film', category: 'Commercial', youtubeId: 'Jmonxy8U3mU', thumbnail: '/thumbnails/thumb7.jpg', year: '2024', color: '#6366F1' },
  { id: 9, title: 'Advertisement Video', category: 'Reklam Filmi', youtubeId: 'IpSYC7O5E7I', thumbnail: 'https://img.youtube.com/vi/IpSYC7O5E7I/hqdefault.jpg', year: '2026', color: '#14B8A6', isShort: true },
  { id: 10, title: 'Advertisement Video', category: 'Reklam Filmi', youtubeId: '8ubs9yfqB08', thumbnail: 'https://img.youtube.com/vi/8ubs9yfqB08/maxresdefault.jpg', year: '2026', color: '#F97316' },
  { id: 11, title: 'Advertisement Video', category: 'Reklam Filmi', youtubeId: 'x1mXofJwhGE', thumbnail: 'https://img.youtube.com/vi/x1mXofJwhGE/maxresdefault.jpg', year: '2026', color: '#06B6D4' },
]

// ============================================
// AURORA BACKGROUND
// ============================================
function AuroraBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#050508]">
      <motion.div
        animate={{ x: ['-10%', '15%', '-10%'], y: ['-5%', '10%', '-5%'], rotate: [0, 30, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[-30%] left-[-10%] w-[70vw] h-[70vw] rounded-full opacity-30"
        style={{ background: 'conic-gradient(from 90deg, rgba(16,185,129,0.35), rgba(139,92,246,0.25), rgba(16,185,129,0.05))', filter: 'blur(120px)' }}
      />
      <motion.div
        animate={{ x: ['5%', '-15%', '5%'], y: ['10%', '-10%', '10%'] }}
        transition={{ duration: 34, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[-30%] right-[-15%] w-[60vw] h-[60vw] rounded-full opacity-25"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.35) 0%, rgba(16,185,129,0.15) 40%, transparent 70%)', filter: 'blur(130px)' }}
      />
      <motion.div
        animate={{ scale: [1, 1.25, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[35%] left-[25%] w-[45vw] h-[45vw] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.3) 0%, transparent 65%)', filter: 'blur(110px)' }}
      />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050508_75%)]" />
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />
    </div>
  )
}

// ============================================
// MOUSE SPOTLIGHT
// ============================================
function MouseSpotlight() {
  const x = useMotionValue(-500)
  const y = useMotionValue(-500)
  const sx = useSpring(x, { stiffness: 60, damping: 20 })
  const sy = useSpring(y, { stiffness: 60, damping: 20 })

  useEffect(() => {
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY) }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [x, y])

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-0 hidden md:block"
      style={{
        background: useTransform(
          [sx, sy] as any,
          ([mx, my]: any) => `radial-gradient(600px circle at ${mx}px ${my}px, rgba(16,185,129,0.06), transparent 65%)`
        ),
      }}
    />
  )
}

// ============================================
// SCROLL PROGRESS
// ============================================
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400"
      style={{ scaleX }}
    />
  )
}

// ============================================
// LETTER REVEAL
// ============================================
function LetterReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span className="inline-block overflow-hidden align-bottom">
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: '110%', rotate: 6 }}
          animate={{ y: 0, rotate: 0 }}
          transition={{ duration: 0.7, delay: delay + i * 0.035, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
        >
          {char === ' ' ? ' ' : char}
        </motion.span>
      ))}
    </span>
  )
}

// ============================================
// LAYERED 3D HERO CARDS
// ============================================
const floatingCards = [
  { src: 'https://img.youtube.com/vi/KooyeFCgugQ/maxresdefault.jpg', className: 'top-[12%] left-[3%] w-40 md:w-64', depth: 2.2, rotate: -8, z: 30, blur: false },
  { src: 'https://img.youtube.com/vi/AKoHR01gtTo/maxresdefault.jpg', className: 'top-[8%] right-[5%] w-32 md:w-52', depth: 1.4, rotate: 6, z: 10, blur: true },
  { src: '/thumbnails/thumb4.jpg', className: 'bottom-[18%] left-[8%] w-32 md:w-48', depth: 1.0, rotate: 5, z: 10, blur: true },
  { src: 'https://img.youtube.com/vi/8ubs9yfqB08/maxresdefault.jpg', className: 'bottom-[10%] right-[4%] w-40 md:w-60', depth: 2.6, rotate: -5, z: 30, blur: false },
  { src: '/thumbnails/thumb7.jpg', className: 'top-[42%] right-[16%] w-24 md:w-36', depth: 0.6, rotate: 10, z: 5, blur: true },
]

function FloatingCard({ card, mx, my, scrollY }: { card: typeof floatingCards[0]; mx: any; my: any; scrollY: any }) {
  const x = useTransform(mx, (v: number) => v * card.depth * 22)
  const yMouse = useTransform(my, (v: number) => v * card.depth * 16)
  const yScroll = useTransform(scrollY, [0, 1], [0, -60 * card.depth])
  const y = useTransform([yMouse, yScroll] as any, ([a, b]: any) => a + b)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 60 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, delay: 1.2 + card.depth * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute ${card.className} hidden md:block pointer-events-none`}
      style={{ zIndex: card.z }}
    >
      <motion.div
        style={{ x, y, rotate: card.rotate }}
        className="rounded-xl md:rounded-2xl overflow-hidden border border-white/15"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5 + card.depth * 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <img
            src={card.src}
            alt=""
            className={`w-full aspect-video object-cover ${card.blur ? 'blur-[2px] opacity-50' : 'opacity-90'}`}
            style={{ boxShadow: '0 30px 60px -20px rgba(0,0,0,0.8)' }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

// ============================================
// HERO
// ============================================
function HeroSection({ t }: { t: typeof copy.tr }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.96])

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const smx = useSpring(mx, { stiffness: 50, damping: 20 })
  const smy = useSpring(my, { stiffness: 50, damping: 20 })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 2)
      my.set((e.clientY / window.innerHeight - 0.5) * 2)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [mx, my])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center pt-20 pb-16 md:pb-20 overflow-hidden" style={{ perspective: 1200 }}>
      {floatingCards.map((card, i) => (
        <FloatingCard key={i} card={card} mx={smx} my={smy} scrollY={scrollYProgress} />
      ))}

      <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="relative z-20 max-w-6xl mx-auto px-4 md:px-6 w-full">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full backdrop-blur-xl bg-white/5 border border-white/10 mb-6 md:mb-8"
          >
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs md:text-sm text-white/60">{t.hero.location}</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-base md:text-xl text-emerald-400 font-medium mb-3 md:mb-4"
          >
            Yasin Aktaş
          </motion.p>

          <h1 className="mb-6 md:mb-8">
            <span className="block text-3xl sm:text-4xl md:text-6xl lg:text-[6rem] font-black tracking-tighter leading-[1] text-outline">
              <LetterReveal text={t.hero.title1} delay={0.4} />
            </span>
            <span className="block text-5xl sm:text-6xl md:text-8xl lg:text-[9rem] font-black tracking-tighter text-white leading-[0.95] mt-1 md:mt-2">
              <LetterReveal text={t.hero.title2} delay={0.7} />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="text-sm md:text-base text-white/55 leading-relaxed mb-8 md:mb-10 max-w-2xl mx-auto px-2"
          >
            {t.hero.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 px-4 sm:px-0"
          >
            <a
              href="#etki"
              className="group inline-flex items-center justify-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 rounded-full bg-white text-[#050508] font-semibold hover:bg-emerald-400 transition-all duration-300 text-sm md:text-base"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:translate-y-0.5 transition-transform">
                <path d="M3 17l6-6 4 4 8-8" /><path d="M14 7h7v7" />
              </svg>
              {t.hero.cta1}
            </a>
            <a
              href="#iletisim"
              className="liquid-glass inline-flex items-center justify-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 rounded-full text-white font-medium transition-all text-sm md:text-base"
            >
              {t.hero.cta2}
            </a>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 hidden md:block z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2"
        >
          <div className="w-1 h-2 rounded-full bg-emerald-500" />
        </motion.div>
      </motion.div>
    </section>
  )
}

// ============================================
// MARQUEE
// ============================================
function Marquee({ items }: { items: readonly string[] }) {
  const doubled = [...items, ...items]
  return (
    <div className="relative z-30 py-6 md:py-10 overflow-hidden border-y border-white/[0.06] bg-[#050508]">
      <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-[#050508] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-[#050508] to-transparent z-10" />
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="flex gap-8 md:gap-14 whitespace-nowrap w-max"
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-8 md:gap-14 text-lg md:text-2xl font-medium text-white/25">
            {item}
            <span className="text-emerald-500/50 text-sm">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}

// ============================================
// CINEMATIC SECTION
// ============================================
function CinematicSection({ children, id, className = '' }: { children: React.ReactNode; id?: string; className?: string }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.35'] })
  const opacity = useTransform(scrollYProgress, [0, 1], [0.35, 1])

  return (
    <motion.section ref={ref} id={id} style={{ opacity }} className={`relative ${className}`}>
      {children}
    </motion.section>
  )
}

// ============================================
// SECTION HEADING
// ============================================
function SectionHeading({ kicker, title, center = false }: { kicker: string; title: React.ReactNode; center?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`mb-10 md:mb-16 ${center ? 'text-center' : ''}`}
    >
      <span className="inline-flex items-center gap-2 text-emerald-400 text-xs md:text-sm tracking-[0.25em] uppercase mb-3">
        <span className="w-6 h-px bg-emerald-500/60" />
        {kicker}
        {center && <span className="w-6 h-px bg-emerald-500/60" />}
      </span>
      <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">{title}</h2>
    </motion.div>
  )
}

// ============================================
// GLASS CARD
// ============================================
function GlassCard({ children, className = '', hover = true }: { children: React.ReactNode; className?: string; hover?: boolean }) {
  return (
    <motion.div
      whileHover={hover ? { y: -4 } : {}}
      transition={{ duration: 0.3 }}
      className={`relative overflow-hidden rounded-xl md:rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] ${className}`}
      style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)' }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent pointer-events-none" />
      {children}
    </motion.div>
  )
}

// ============================================
// IMPACT SECTION — animated charts
// ============================================
const viewsData = [
  { year: '2021', value: 1 },
  { year: '2022', value: 5 },
  { year: '2023', value: 12 },
  { year: '2024', value: 22 },
  { year: '2025', value: 38 },
  { year: '2026', value: 50 },
]

function ViewsChart({ t }: { t: typeof copy.tr }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const W = 560, H = 260, PAD = 40
  const maxV = 50
  const pts = viewsData.map((d, i) => ({
    x: PAD + (i / (viewsData.length - 1)) * (W - PAD * 2),
    y: H - PAD - (d.value / maxV) * (H - PAD * 2),
  }))
  const linePath = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ')
  const areaPath = `${linePath} L${pts[pts.length - 1].x},${H - PAD} L${pts[0].x},${H - PAD} Z`

  return (
    <div ref={ref}>
      <GlassCard className="p-5 md:p-8 h-full" hover={false}>
        <h3 className="text-lg md:text-xl font-semibold text-white mb-1">{t.impact.chartViewsTitle}</h3>
        <p className="text-white/40 text-xs md:text-sm mb-6">{t.impact.chartViewsDesc}</p>
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0, 12.5, 25, 37.5, 50].map((v) => {
            const y = H - PAD - (v / maxV) * (H - PAD * 2)
            return (
              <g key={v}>
                <line x1={PAD} y1={y} x2={W - PAD} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                <text x={PAD - 8} y={y + 4} textAnchor="end" fill="rgba(255,255,255,0.3)" fontSize="11">{v}M</text>
              </g>
            )
          })}
          <motion.path
            d={areaPath}
            fill="url(#areaGrad)"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.8 }}
          />
          <motion.path
            d={linePath}
            fill="none"
            stroke="#10B981"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          />
          {pts.map((p, i) => (
            <motion.g key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 + i * 0.25, type: 'spring', stiffness: 300 }}
              style={{ transformOrigin: `${p.x}px ${p.y}px` }}
            >
              <circle cx={p.x} cy={p.y} r="6" fill="#050508" stroke="#10B981" strokeWidth="2.5" />
              <text x={p.x} y={p.y - 14} textAnchor="middle" fill="#34D399" fontSize="12" fontWeight="700">{viewsData[i].value}M</text>
              <text x={p.x} y={H - PAD + 18} textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="11">{viewsData[i].year}</text>
            </motion.g>
          ))}
        </svg>
      </GlassCard>
    </div>
  )
}

function EngagementChart({ t }: { t: typeof copy.tr }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div ref={ref}>
      <GlassCard className="p-5 md:p-8 h-full" hover={false}>
        <h3 className="text-lg md:text-xl font-semibold text-white mb-1">{t.impact.chartEngTitle}</h3>
        <p className="text-white/40 text-xs md:text-sm mb-8">{t.impact.chartEngDesc}</p>

        <div className="space-y-7">
          <div>
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-white/50 text-sm">{t.impact.engBefore}</span>
              <span className="text-white/60 font-mono text-sm">100</span>
            </div>
            <div className="h-9 md:h-11 rounded-lg bg-white/[0.04] overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={inView ? { width: '62%' } : {}}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-lg bg-gradient-to-r from-white/20 to-white/10"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-emerald-400 text-sm font-medium">{t.impact.engAfter}</span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 1.4 }}
                className="text-emerald-400 font-mono text-sm font-bold"
              >
                135 <span className="text-emerald-300">(+35%)</span>
              </motion.span>
            </div>
            <div className="h-9 md:h-11 rounded-lg bg-white/[0.04] overflow-hidden relative">
              <motion.div
                initial={{ width: 0 }}
                animate={inView ? { width: '84%' } : {}}
                transition={{ duration: 1.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-lg bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-400 relative overflow-hidden"
              >
                <motion.div
                  animate={{ x: ['-100%', '250%'] }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5 }}
                  className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12"
                />
              </motion.div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.6 }}
          className="mt-8 flex items-center gap-3 p-3 md:p-4 rounded-xl bg-emerald-500/[0.07] border border-emerald-500/20"
        >
          <span className="text-emerald-400 text-2xl md:text-3xl font-black">+35%</span>
          <span className="text-white/50 text-xs md:text-sm leading-snug">{t.impact.statEngDesc}</span>
        </motion.div>
      </GlassCard>
    </div>
  )
}

function ImpactStat({ value, suffix, label, desc, index }: { value: number; suffix: string; label: string; desc: string; index: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (!inView) return
    let current = 0
    const step = value / (1800 / 16)
    const timer = setInterval(() => {
      current += step
      if (current >= value) { setCount(value); clearInterval(timer) }
      else setCount(Math.floor(current))
    }, 16)
    return () => clearInterval(timer)
  }, [inView, value])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="text-center p-4 md:p-6 rounded-xl md:rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-emerald-500/25 transition-colors duration-300"
    >
      <span className="block font-black bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent text-3xl md:text-5xl tracking-tight">
        {count}{suffix}
      </span>
      <span className="block mt-2 text-white/75 font-medium text-xs md:text-sm">{label}</span>
      <span className="block text-white/35 text-[10px] md:text-xs mt-0.5">{desc}</span>
    </motion.div>
  )
}

function ImpactSection({ t }: { t: typeof copy.tr }) {
  return (
    <CinematicSection id="etki" className="py-16 md:py-32 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading kicker={t.impact.kicker} title={t.impact.title} center />

        <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
          <ViewsChart t={t} />
          <EngagementChart t={t} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <ImpactStat value={1000} suffix="+" label={t.impact.statBrands} desc={t.impact.statBrandsDesc} index={0} />
          <ImpactStat value={50} suffix="M+" label={t.impact.statViews} desc={t.impact.statViewsDesc} index={1} />
          <ImpactStat value={500} suffix="+" label={t.impact.statVideos} desc={t.impact.statVideosDesc} index={2} />
          <ImpactStat value={10} suffix="+" label={t.impact.statTeam} desc={t.impact.statTeamDesc} index={3} />
        </div>
      </div>
    </CinematicSection>
  )
}

// ============================================
// PRODUCTS SECTION — iOS apps
// ============================================
function ProductsSection({ t }: { t: typeof copy.tr }) {
  return (
    <CinematicSection id="urunler" className="py-16 md:py-32 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <SectionHeading kicker={t.products.kicker} title={t.products.title} center />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white/50 text-sm md:text-base max-w-2xl mx-auto leading-relaxed -mt-6 md:-mt-10"
          >
            {t.products.desc}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {t.products.apps.map((app, i) => (
            <motion.div
              key={app.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="group relative h-full p-6 md:p-8 rounded-2xl md:rounded-3xl bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.2] transition-all duration-500 overflow-hidden">
                <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-15 blur-3xl transition-opacity duration-500 group-hover:opacity-30" style={{ background: app.accent }} />

                <div className="relative">
                  <motion.div
                    whileHover={{ scale: 1.06, rotate: -3 }}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden mb-6 border border-white/10"
                    style={{ boxShadow: `0 12px 32px -12px ${app.accent}60` }}
                  >
                    <img src={app.icon} alt={`${app.name} uygulama ikonu`} className="w-full h-full object-cover" />
                  </motion.div>

                  <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{app.name}</h3>
                  <p className="text-xs md:text-sm font-medium mb-4" style={{ color: app.accent }}>{app.tag}</p>
                  <p className="text-white/50 text-sm leading-relaxed">{app.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </CinematicSection>
  )
}

// ============================================
// VIDEO CARD — 3D tilt
// ============================================
function VideoCard({ project, index, onSelect }: { project: typeof projects[0]; index: number; onSelect: (p: typeof projects[0]) => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springX = useSpring(rotateX, { stiffness: 200, damping: 20 })
  const springY = useSpring(rotateY, { stiffness: 200, damping: 20 })

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    rotateY.set(px * 10)
    rotateX.set(-py * 10)
  }
  const resetTilt = () => { rotateX.set(0); rotateY.set(0) }

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.12, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onSelect(project)}
      className="group cursor-pointer"
      style={{ perspective: 800 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouse}
        onMouseLeave={resetTilt}
        style={{ rotateX: springX, rotateY: springY, boxShadow: `0 10px 40px -15px ${project.color}40`, transformStyle: 'preserve-3d' }}
        className="relative aspect-[4/3] rounded-xl md:rounded-3xl overflow-hidden"
      >
        <img
          src={project.thumbnail}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
          style={{ backgroundColor: project.color }}
        />
        <div className="absolute inset-0 rounded-xl md:rounded-3xl border border-white/10 group-hover:border-white/25 transition-colors" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="liquid-glass w-10 h-10 md:w-16 md:h-16 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white" className="ml-0.5">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-3 md:p-5">
          <span
            className="inline-block px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-medium mb-1 md:mb-2 backdrop-blur-sm"
            style={{ backgroundColor: `${project.color}30`, color: project.color }}
          >
            {project.category}
          </span>
          <h3 className="text-xs md:text-lg font-semibold text-white line-clamp-1">{project.title}</h3>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ============================================
// FEATURED CARD
// ============================================
function FeaturedCard({ project, onSelect, label }: { project: typeof projects[0]; onSelect: (p: typeof projects[0]) => void; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onSelect(project)}
      className="group cursor-pointer mb-3 md:mb-6"
    >
      <div
        className="relative aspect-video md:aspect-[21/9] rounded-2xl md:rounded-3xl overflow-hidden"
        style={{ boxShadow: `0 20px 60px -20px ${project.color}50` }}
      >
        <img
          src={project.thumbnail}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
        <div className="absolute inset-0 rounded-2xl md:rounded-3xl border border-white/10 group-hover:border-white/25 transition-colors" />

        <div className="absolute top-4 left-4 md:top-6 md:left-6">
          <span className="liquid-glass inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-[10px] md:text-xs font-semibold tracking-[0.15em] uppercase text-white">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {label}
          </span>
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.08 }}
            className="liquid-glass w-14 h-14 md:w-20 md:h-20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white" className="ml-1">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-10 flex items-end justify-between gap-4">
          <div>
            <span
              className="inline-block px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-medium mb-2 backdrop-blur-sm"
              style={{ backgroundColor: `${project.color}30`, color: project.color }}
            >
              {project.category}
            </span>
            <h3 className="text-xl md:text-4xl font-bold text-white">{project.title}</h3>
          </div>
          <span className="text-white/40 text-xs md:text-base font-mono shrink-0">{project.year}</span>
        </div>
      </div>
    </motion.div>
  )
}

// ============================================
// WORK SECTION
// ============================================
function WorkSection({ onSelect, t }: { onSelect: (p: typeof projects[0]) => void; t: typeof copy.tr }) {
  const categories: string[] = [t.projects.all, ...Array.from(new Set(projects.map(p => p.category)))]
  const [activeCategory, setActiveCategory] = useState<string>(t.projects.all)

  useEffect(() => { setActiveCategory(t.projects.all) }, [t])

  const filtered = activeCategory === t.projects.all ? projects : projects.filter(p => p.category === activeCategory)
  const [featured, ...rest] = filtered

  return (
    <CinematicSection id="projeler" className="py-16 md:py-32 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8 md:mb-12">
          <SectionHeading kicker={t.projects.kicker} title={t.projects.title} />
          <div className="flex flex-wrap gap-2 md:mb-16">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 border ${
                  activeCategory === cat
                    ? 'bg-emerald-500 border-emerald-500 text-white'
                    : 'bg-white/[0.03] border-white/10 text-white/50 hover:text-white hover:border-white/25'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {featured && <FeaturedCard project={featured} onSelect={onSelect} label={t.projects.featured} />}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
              {rest.map((project, index) => (
                <VideoCard key={project.id} project={project} index={index} onSelect={onSelect} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </CinematicSection>
  )
}

// ============================================
// VIDEO MODAL
// ============================================
function VideoModal({ project, onClose }: { project: typeof projects[0] | null; onClose: () => void }) {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden'
      const handleEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
      window.addEventListener('keydown', handleEsc)
      return () => {
        document.body.style.overflow = ''
        window.removeEventListener('keydown', handleEsc)
      }
    }
  }, [project, onClose])

  if (!project) return null

  const embedUrl = project.isShort
    ? `https://www.youtube.com/embed/${project.youtubeId}?autoplay=1&loop=1&playlist=${project.youtubeId}`
    : `https://www.youtube.com/embed/${project.youtubeId}?autoplay=1`

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="liquid-glass absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:bg-white/10 z-10"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 30 }}
        transition={{ type: 'spring', stiffness: 200, damping: 24 }}
        className={project.isShort ? 'w-full max-w-sm' : 'w-full max-w-5xl'}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center mb-6">
          <span className="text-emerald-400 text-sm">{project.category}</span>
          <h3 className="text-2xl md:text-3xl font-bold text-white">{project.title}</h3>
        </div>

        <div
          className="relative rounded-3xl overflow-hidden border border-white/10"
          style={{ boxShadow: `0 30px 80px -20px ${project.color}50` }}
        >
          <div className={project.isShort ? 'aspect-[9/16]' : 'aspect-video'}>
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
// ABOUT SECTION
// ============================================
function AboutSection({ t }: { t: typeof copy.tr }) {
  return (
    <CinematicSection id="hakkimda" className="py-16 md:py-32 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-emerald-500 text-xs md:text-sm tracking-[0.25em] uppercase mb-2 md:mb-3 block">{t.about.kicker}</span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 tracking-tight">
            {t.about.title1} <span className="text-emerald-400">{t.about.title2}</span>
          </h2>
          <p className="text-white/50 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            {t.about.desc}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
          {t.about.areas.map((area, areaIndex) => (
            <motion.div
              key={areaIndex}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: (areaIndex % 2) * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="group relative h-full p-5 md:p-6 rounded-xl md:rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-emerald-500/30 hover:bg-white/[0.04] transition-all duration-300">
                <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4 md:mb-5">
                    <div className="w-1 h-6 md:h-8 bg-gradient-to-b from-emerald-500 to-emerald-500/20 rounded-full" />
                    <h3 className="text-lg md:text-xl font-semibold text-white">{area.title}</h3>
                  </div>
                  <div className="space-y-3 md:space-y-4">
                    {area.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="pl-4 border-l border-white/[0.06]">
                        <h4 className="text-sm md:text-base font-medium text-white/90 mb-1">{item.label}</h4>
                        <p className="text-xs md:text-sm text-white/40 leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto"
        >
          <div className="flex items-center justify-center gap-3 md:gap-4 p-4 md:p-5 rounded-xl md:rounded-2xl bg-white/[0.02] border border-white/[0.06]">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div>
              <p className="text-white font-medium text-sm md:text-base">{t.about.location}</p>
              <p className="text-white/40 text-xs md:text-sm">{t.about.country}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-2xl mx-auto mt-12 md:mt-20"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-500/20 blur-3xl" />
          <div className="relative p-5 md:p-10 rounded-2xl md:rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-transparent to-yellow-500/5 backdrop-blur-xl overflow-hidden">
            <div className="absolute top-0 left-0 w-12 md:w-20 h-12 md:h-20 border-t-2 border-l-2 border-amber-500/50 rounded-tl-2xl md:rounded-tl-3xl" />
            <div className="absolute bottom-0 right-0 w-12 md:w-20 h-12 md:h-20 border-b-2 border-r-2 border-amber-500/50 rounded-br-2xl md:rounded-br-3xl" />
            <motion.div
              animate={{ x: [-200, 400] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              className="absolute inset-0 w-32 bg-gradient-to-r from-transparent via-amber-400/20 to-transparent skew-x-12"
            />
            <div className="relative text-center">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="inline-block mb-3 md:mb-4"
              >
                <span className="text-4xl md:text-5xl">🏆</span>
              </motion.div>
              <h3 className="text-xl md:text-3xl font-bold mb-3 md:mb-4">
                <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
                  {t.about.exitTitle}
                </span>
              </h3>
              <p className="text-white/60 text-sm md:text-base mb-5 md:mb-6 leading-relaxed px-2">
                {t.about.exitDesc}
              </p>
              <div className="grid grid-cols-2 gap-3 md:gap-6 text-xs md:text-sm">
                {t.about.exitStats.map((s) => (
                  <div key={s.l} className="text-center p-2 md:p-3 rounded-xl bg-amber-500/5">
                    <span className="text-amber-400 text-xl md:text-2xl font-bold block">{s.v}</span>
                    <p className="text-white/40 mt-1">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </CinematicSection>
  )
}

// ============================================
// EXPERIENCE
// ============================================
function ExperienceSection({ t }: { t: typeof copy.tr }) {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <CinematicSection id="deneyim" className="py-16 md:py-32 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeading kicker={t.experience.kicker} title={t.experience.title} center />

        <div className="relative">
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/50 via-purple-500/50 to-transparent" />
          <div className="space-y-4 md:space-y-6">
            {t.experience.jobs.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setActiveIndex(i)}
                className="relative pl-12 md:pl-20 cursor-pointer group"
              >
                <motion.div
                  className={`absolute left-0 md:left-4 top-4 w-7 h-7 md:w-8 md:h-8 rounded-lg md:rounded-xl flex items-center justify-center font-bold text-xs md:text-sm transition-all duration-300 ${
                    exp.isExit
                      ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-black shadow-lg shadow-amber-500/30'
                      : activeIndex === i
                        ? 'bg-emerald-500 text-white'
                        : 'bg-white/10 text-white/50 group-hover:bg-white/20'
                  }`}
                  whileHover={{ scale: 1.1 }}
                >
                  {exp.logo}
                </motion.div>

                <GlassCard
                  className={`p-4 md:p-6 transition-all duration-300 ${
                    exp.isExit
                      ? 'border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-transparent'
                      : activeIndex === i
                        ? 'border-emerald-500/30'
                        : ''
                  }`}
                  hover={false}
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 md:gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base md:text-lg font-semibold text-white">{exp.role}</h3>
                        {exp.isExit && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] md:text-xs font-bold bg-gradient-to-r from-amber-400 to-amber-600 text-black shadow-lg">
                            EXIT ✦
                          </span>
                        )}
                      </div>
                      <span className="text-white/30 text-xs md:text-sm font-mono">{exp.period}</span>
                    </div>
                    <p className="text-white/50 text-sm">{exp.company}</p>
                    <p className="text-white/30 text-xs md:text-sm mt-1">{exp.highlight}</p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </CinematicSection>
  )
}

// ============================================
// CONTACT
// ============================================
function ContactSection({ t }: { t: typeof copy.tr }) {
  return (
    <CinematicSection id="iletisim" className="py-16 md:py-32 px-4 md:px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-emerald-500 text-xs md:text-sm tracking-[0.25em] uppercase mb-2 md:mb-3 block">{t.contact.kicker}</span>
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white mb-4 md:mb-6 tracking-tight">
            {t.contact.title1}<br />
            <span className="text-emerald-400">{t.contact.title2}</span>
          </h2>
          <p className="text-white/40 text-sm md:text-lg mb-8 md:mb-12 max-w-lg mx-auto px-4">
            {t.contact.desc}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-8 md:mb-12 px-4">
            <a
              href="mailto:yasin.aktas@outlook.com.tr"
              className="w-full sm:w-auto flex items-center justify-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-medium transition-all text-sm md:text-base"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22,7-8.97,5.7a1.94,1.94,0,0,1-2.06,0L2,7" />
              </svg>
              {t.contact.email}
            </a>
            <a
              href="tel:+905304653974"
              className="liquid-glass w-full sm:w-auto flex items-center justify-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 rounded-full text-white transition-all text-sm md:text-base"
            >
              +90 530 465 39 74
            </a>
          </div>

          <div className="flex items-center justify-center gap-6 md:gap-8">
            {[
              { href: 'https://linkedin.com/in/yasinakkts', label: 'LinkedIn' },
              { href: 'https://www.instagram.com/yasinakkts/', label: 'Instagram' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener"
                className="text-white/30 hover:text-emerald-400 transition-colors text-xs md:text-sm"
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </CinematicSection>
  )
}

// ============================================
// NAVIGATION
// ============================================
function Navigation({ t, lang, setLang }: { t: typeof copy.tr; lang: Lang; setLang: (l: Lang) => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
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
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'backdrop-blur-2xl bg-[#050508]/60 border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center h-14 md:h-20">
            <a href="#" className="text-base md:text-xl font-bold">
              <span className="text-white">Yasin</span>
              <span className="text-emerald-500">.</span>
            </a>

            <div className="hidden md:flex items-center gap-7">
              {navLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm text-white/50 hover:text-white transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-emerald-500 group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2 md:gap-3">
              <button
                onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')}
                className="liquid-glass px-3 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-semibold text-white/70 hover:text-white transition-colors"
              >
                {lang === 'tr' ? 'EN' : 'TR'}
              </button>

              <a
                href="#iletisim"
                className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-emerald-500 hover:bg-emerald-400 text-white transition-all"
              >
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                {t.nav.contact}
              </a>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden w-10 h-10 flex items-center justify-center"
              >
                <div className="space-y-1.5">
                  <motion.span animate={{ rotate: mobileMenuOpen ? 45 : 0, y: mobileMenuOpen ? 6 : 0 }} className="block w-5 h-0.5 bg-white" />
                  <motion.span animate={{ opacity: mobileMenuOpen ? 0 : 1 }} className="block w-5 h-0.5 bg-white" />
                  <motion.span animate={{ rotate: mobileMenuOpen ? -45 : 0, y: mobileMenuOpen ? -6 : 0 }} className="block w-5 h-0.5 bg-white" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 backdrop-blur-2xl bg-[#050508]/95 pt-16 md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-6">
              {[...navLinks, { label: t.nav.contact, href: '#iletisim' }].map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-medium text-white/80 hover:text-emerald-400 transition-colors"
                >
                  {item.label}
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
// FOOTER
// ============================================
function Footer({ t }: { t: typeof copy.tr }) {
  return (
    <footer className="py-6 md:py-8 px-4 md:px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
        <span className="text-white/30 text-xs md:text-sm">{t.footer.rights}</span>
        <div className="flex items-center gap-5">
          <a href="https://linkedin.com/in/yasinakkts" target="_blank" rel="noopener" className="text-white/30 hover:text-emerald-400 transition-colors text-xs md:text-sm">LinkedIn</a>
          <a href="https://www.instagram.com/yasinakkts/" target="_blank" rel="noopener" className="text-white/30 hover:text-emerald-400 transition-colors text-xs md:text-sm">Instagram</a>
        </div>
        <span className="text-white/30 text-xs md:text-sm">{t.footer.from}</span>
      </div>
    </footer>
  )
}

// ============================================
// MAIN
// ============================================
export default function HomePage() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)
  const [lang, setLang] = useState<Lang>('tr')
  const t = copy[lang] as typeof copy.tr

  return (
    <>
      <AuroraBackground />
      <MouseSpotlight />
      <ScrollProgress />
      <Navigation t={t} lang={lang} setLang={setLang} />

      <main>
        <HeroSection t={t} />
        <Marquee items={t.marquee} />
        <ImpactSection t={t} />
        <WorkSection onSelect={setSelectedProject} t={t} />
        <ProductsSection t={t} />
        <AboutSection t={t} />
        <ExperienceSection t={t} />
        <ContactSection t={t} />
      </main>

      <Footer t={t} />

      <AnimatePresence>
        {selectedProject && (
          <VideoModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </>
  )
}
