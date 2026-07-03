'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'

// ============================================
// DATA
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

const stats = [
  { value: 1000, suffix: '+', label: 'Marka', desc: 'Hizmet verilen' },
  { value: 5, suffix: '+', label: 'Yıl', desc: 'Deneyim' },
  { value: 50, suffix: 'M+', label: 'İzlenme', desc: 'Toplam' },
  { value: 10, suffix: '+', label: 'Kişi', desc: 'Ekip' },
]

const marqueeItems = [
  'Video Prodüksiyon', 'AI Video', 'iOS App Development', 'Kreatif Direktörlük',
  'Drone Çekim', 'Post-Prodüksiyon', 'Marka Kampanyaları', 'Yapay Zeka Çözümleri',
  'Sosyal Medya', 'Motion Design',
]

const experience = [
  {
    role: 'Kurucu & Kreatif Direktör',
    company: 'Creative Touch Productions',
    period: 'Mart 2025 - Ocak 2026',
    highlight: '10 kişilik ekiple 1000+ markaya tanıtım filmi, reklam ve sosyal medya içerikleri ürettik. Yapay zeka destekli video içerikleri ve dijital danışmanlık hizmetleri sunduk. Ajans 2026 Ocak ayında Hamburg merkezli bir teknoloji firmasına devredildi.',
    logo: '◆',
    isExit: true
  },
  {
    role: 'Kreatif Videographer',
    company: 'Turkuvaz Medya',
    period: 'Ekim 2021 - Mayıs 2025',
    highlight: 'Sabah, ATV, A Haber gibi kanallarda marka kampanyaları ve haber içerikleri ürettim. Profesyonel kamera ve drone çekimleri, Adobe Premiere Pro ve After Effects ile post-prodüksiyon süreçlerini yönettim.',
    logo: 'T',
    isExit: false
  },
  {
    role: 'Stajyer',
    company: 'TV8 / Acun Medya',
    period: 'Haziran 2020 - Ağustos 2020',
    highlight: 'TV yayın planlaması ve organizasyon süreçlerine destek verdim. Stüdyo ve dış çekimlerde asistanlık yaptım.',
    logo: 'A',
    isExit: false
  },
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
          {char === ' ' ? ' ' : char}
        </motion.span>
      ))}
    </span>
  )
}

// ============================================
// LAYERED 3D HERO — floating depth cards
// ============================================
const floatingCards = [
  // depth: higher = closer to viewer (moves more with mouse)
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

function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.96])

  // normalized mouse position (-1..1)
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
      {/* Floating 3D depth layers */}
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
            <span className="text-xs md:text-sm text-white/60">İstanbul, Avrupa</span>
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
            <span className="block text-5xl sm:text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter text-white leading-[0.9]">
              <LetterReveal text="CREATIVE" delay={0.4} />
            </span>
            <span className="block text-3xl sm:text-4xl md:text-6xl lg:text-[7rem] font-black tracking-tighter leading-[1] mt-1 md:mt-2 text-outline">
              <LetterReveal text="PRODUCER" delay={0.7} />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="text-sm md:text-base text-white/55 leading-relaxed mb-8 md:mb-10 max-w-2xl mx-auto px-2"
          >
            Video prodüksiyonu yalnızca çekim olarak değil, stratejiden yayına uzanan bütünsel bir
            üretim süreci olarak ele alıyorum. Beş yılı aşkın sürede 1000&apos;den fazla markaya görüntü
            yönetimi, kurgu ve post-prodüksiyon dahil uçtan uca hizmet sağladım. Prodüksiyon
            birikimimin yanında, yapay zeka destekli geliştirme yaklaşımıyla iOS uygulamaları hayata
            geçiriyor ve ileri düzey yapay zeka araçlarıyla iş süreçlerine özel çözümler kuruyorum.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 px-4 sm:px-0"
          >
            <a
              href="#projeler"
              className="group inline-flex items-center justify-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 rounded-full bg-white text-[#050508] font-semibold hover:bg-emerald-400 transition-all duration-300 text-sm md:text-base"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="group-hover:translate-x-1 transition-transform">
                <polygon points="5,3 19,12 5,21" />
              </svg>
              Projelerimi Gör
            </a>
            <a
              href="#iletisim"
              className="liquid-glass inline-flex items-center justify-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 rounded-full text-white font-medium transition-all text-sm md:text-base"
            >
              Benimle Çalış
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
function Marquee() {
  const items = [...marqueeItems, ...marqueeItems]
  return (
    <div className="relative z-30 py-6 md:py-10 overflow-hidden border-y border-white/[0.06] bg-[#050508]">
      <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-[#050508] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-[#050508] to-transparent z-10" />
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="flex gap-8 md:gap-14 whitespace-nowrap w-max"
      >
        {items.map((item, i) => (
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
// CINEMATIC SECTION WRAPPER
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
// STAT CARD
// ============================================
function BentoStatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (!inView) return
    let current = 0
    const step = stat.value / (2000 / 16)
    const timer = setInterval(() => {
      current += step
      if (current >= stat.value) {
        setCount(stat.value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, stat.value])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <GlassCard className="relative p-5 md:p-8 h-full min-h-[130px] md:min-h-[170px] group">
        <div className="absolute -bottom-6 -right-2 text-[80px] md:text-[110px] font-black text-white/[0.03] leading-none select-none group-hover:text-emerald-500/[0.06] transition-colors duration-500">
          {index + 1}
        </div>
        <div className="relative z-10">
          <span className="font-black bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent text-4xl md:text-6xl tracking-tight">
            {count}{stat.suffix}
          </span>
          <div className="mt-2 md:mt-3">
            <span className="text-white/80 font-medium text-sm md:text-base">{stat.label}</span>
            <span className="text-white/40 text-xs md:text-sm ml-2">{stat.desc}</span>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  )
}

// ============================================
// VIDEO CARD — 3D tilt + glow
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
// TIMELINE
// ============================================
function Timeline() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="relative">
      <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/50 via-purple-500/50 to-transparent" />

      <div className="space-y-4 md:space-y-6">
        {experience.map((exp, i) => (
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
  )
}

// ============================================
// EXIT BADGE
// ============================================
function ExitBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative max-w-2xl mx-auto"
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
              Başarılı Exit
            </span>
          </h3>

          <p className="text-white/60 text-sm md:text-base mb-5 md:mb-6 leading-relaxed px-2">
            Creative Touch Productions olarak 2025 ve 2026 yılında
            binden fazla firmaya tanıtım filmi ve sosyal medya
            danışmanlığı hizmeti sunduk. <span className="text-white font-semibold">2026 Ocak</span> ayı ile
            ajansımı Hamburg merkezli bir teknoloji firmasına devrettim.
          </p>

          <div className="grid grid-cols-2 gap-3 md:gap-6 text-xs md:text-sm">
            <div className="text-center p-2 md:p-3 rounded-xl bg-amber-500/5">
              <span className="text-amber-400 text-xl md:text-2xl font-bold block">1000+</span>
              <p className="text-white/40 mt-1">Marka</p>
            </div>
            <div className="text-center p-2 md:p-3 rounded-xl bg-amber-500/5">
              <span className="text-amber-400 text-xl md:text-2xl font-bold block">10</span>
              <p className="text-white/40 mt-1">Kişilik Ekip Yönetimi</p>
            </div>
            <div className="text-center p-2 md:p-3 rounded-xl bg-amber-500/5">
              <span className="text-amber-400 text-xl md:text-2xl font-bold block">15M₺</span>
              <p className="text-white/40 mt-1">Reklam Bütçesi</p>
            </div>
            <div className="text-center p-2 md:p-3 rounded-xl bg-amber-500/5">
              <span className="text-amber-400 text-xl md:text-2xl font-bold block">50M+</span>
              <p className="text-white/40 mt-1">Toplam İzlenme</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ============================================
// NAVIGATION
// ============================================
const navLinks = [
  { label: 'Projelerim', href: '#projeler' },
  { label: 'Hakkımda', href: '#hakkimda' },
  { label: 'Deneyim', href: '#deneyim' },
]

function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm text-white/50 hover:text-white transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-emerald-500 group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>

            <a
              href="#iletisim"
              className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-emerald-500 hover:bg-emerald-400 text-white transition-all"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              İletişim
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
              {[...navLinks, { label: 'İletişim', href: '#iletisim' }].map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
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
// WORK SECTION
// ============================================
function FeaturedCard({ project, onSelect }: { project: typeof projects[0]; onSelect: (p: typeof projects[0]) => void }) {
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
            Öne Çıkan
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

function WorkSection({ onSelect }: { onSelect: (p: typeof projects[0]) => void }) {
  const categories = ['Tümü', ...Array.from(new Set(projects.map(p => p.category)))]
  const [activeCategory, setActiveCategory] = useState('Tümü')

  const filtered = activeCategory === 'Tümü' ? projects : projects.filter(p => p.category === activeCategory)
  const [featured, ...rest] = filtered

  return (
    <CinematicSection id="projeler" className="py-16 md:py-32 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8 md:mb-12">
          <SectionHeading kicker="Portföy" title="Projelerim" />
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
            {featured && <FeaturedCard project={featured} onSelect={onSelect} />}
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
// STATS SECTION
// ============================================
function StatsSection() {
  return (
    <CinematicSection className="py-16 md:py-32 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading kicker="Rakamlarla" title="Başarılarım" center />
        <div className="grid grid-cols-2 gap-3 md:gap-6">
          {stats.map((stat, i) => (
            <BentoStatCard key={i} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </CinematicSection>
  )
}

// ============================================
// ABOUT SECTION
// ============================================
function AboutSection() {
  const expertiseAreas = [
    {
      title: 'Kreatif Direktörlük ve Liderlik',
      items: [
        { label: 'Stratejik Vizyon', desc: 'Marka hedeflerine odaklı, görsel derinliği olan sonuç odaklı içerik stratejileri.' },
        { label: 'Ekip Yönetimi', desc: '10 kişilik kreatif ekibin yönetimi ve iş akışı optimizasyonu.' },
        { label: 'Ajans Deneyimi', desc: 'Creative Touch Productions bünyesinde binlerce markaya sunulan reklam hizmetleri.' },
      ]
    },
    {
      title: 'Üst Segment Video Prodüksiyon',
      items: [
        { label: 'Görüntü Yönetimi ve Drone', desc: 'Profesyonel kamera ekipmanları ve drone ile sahada çekim.' },
        { label: 'Post-Prodüksiyon', desc: 'Adobe Premiere Pro ve After Effects ile ileri seviye kurgu ve VFX süreçleri.' },
        { label: 'Gazetecilik Perspektifi', desc: 'Turkuvaz Medya tecrübesiyle haber takibi ve teknik üretim gücü.' },
      ]
    },
    {
      title: 'Yapay Zeka ve İnovasyon',
      items: [
        { label: 'AI Video Entegrasyonu', desc: 'Reklam ve animasyon süreçlerinde en güncel yapay zeka araçlarının kullanımı.' },
        { label: 'İleri Düzey AI Çözümleri', desc: 'İş süreçlerine özel yapay zeka araçları ve otomasyon sistemleri kurulumu.' },
        { label: 'Algoritma Uzmanlığı', desc: 'YouTube ve Instagram algoritmaları üzerine derinlemesine bilgi birikimi.' },
      ]
    },
    {
      title: 'Mobil Uygulama Geliştirme',
      items: [
        { label: 'iOS Uygulamaları', desc: 'Yapay zeka destekli geliştirme yaklaşımıyla fikirden App Store\'a uçtan uca iOS uygulamaları.' },
        { label: 'Ürün Odaklı Yaklaşım', desc: 'Medya ve içerik tecrübesini ürün tasarımıyla birleştirerek kullanıcı odaklı dijital ürünler.' },
      ]
    },
  ]

  return (
    <CinematicSection id="hakkimda" className="py-16 md:py-32 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-emerald-500 text-xs md:text-sm tracking-[0.25em] uppercase mb-2 md:mb-3 block">Hakkımda</span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 tracking-tight">
            Medya ve <span className="text-emerald-400">Teknolojinin</span> Kesişimi
          </h2>
          <p className="text-white/50 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Turkuvaz Medya'da 4 yıl boyunca Kreatif Videographer olarak görev aldım.
            Creative Touch Productions Dijital reklam ajansını kurarak 10 kişilik bir ekiple
            1000+ markaya video içerikleri ve dijital danışmanlık hizmetleri sundum.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
          {expertiseAreas.map((area, areaIndex) => (
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
              <p className="text-white font-medium text-sm md:text-base">İstanbul, Avrupa</p>
              <p className="text-white/40 text-xs md:text-sm">Türkiye</p>
            </div>
          </div>
        </motion.div>

        <div className="mt-12 md:mt-20">
          <ExitBadge />
        </div>
      </div>
    </CinematicSection>
  )
}

// ============================================
// EXPERIENCE SECTION
// ============================================
function ExperienceSection() {
  return (
    <CinematicSection id="deneyim" className="py-16 md:py-32 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeading kicker="Kariyer" title="Deneyim" center />
        <Timeline />
      </div>
    </CinematicSection>
  )
}

// ============================================
// CONTACT SECTION
// ============================================
function ContactSection() {
  return (
    <CinematicSection id="iletisim" className="py-16 md:py-32 px-4 md:px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-emerald-500 text-xs md:text-sm tracking-[0.25em] uppercase mb-2 md:mb-3 block">İletişim</span>
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white mb-4 md:mb-6 tracking-tight">
            Birlikte<br />
            <span className="text-emerald-400">Çalışalım</span>
          </h2>
          <p className="text-white/40 text-sm md:text-lg mb-8 md:mb-12 max-w-lg mx-auto px-4">
            Yeni projeler, iş birlikleri veya sadece merhaba demek için.
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
              Email Gönder
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
// FOOTER
// ============================================
function Footer() {
  return (
    <footer className="py-6 md:py-8 px-4 md:px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
        <span className="text-white/30 text-xs md:text-sm">© 2026 Yasin Aktaş</span>
        <div className="flex items-center gap-5">
          <a href="https://linkedin.com/in/yasinakkts" target="_blank" rel="noopener" className="text-white/30 hover:text-emerald-400 transition-colors text-xs md:text-sm">LinkedIn</a>
          <a href="https://www.instagram.com/yasinakkts/" target="_blank" rel="noopener" className="text-white/30 hover:text-emerald-400 transition-colors text-xs md:text-sm">Instagram</a>
        </div>
        <span className="text-white/30 text-xs md:text-sm">İstanbul'dan sevgiler ile</span>
      </div>
    </footer>
  )
}

// ============================================
// MAIN
// ============================================
export default function HomePage() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)

  return (
    <>
      <AuroraBackground />
      <MouseSpotlight />
      <ScrollProgress />
      <Navigation />

      <main>
        <HeroSection />
        <Marquee />
        <WorkSection onSelect={setSelectedProject} />
        <StatsSection />
        <AboutSection />
        <ExperienceSection />
        <ContactSection />
      </main>

      <Footer />

      <AnimatePresence>
        {selectedProject && (
          <VideoModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </>
  )
}
