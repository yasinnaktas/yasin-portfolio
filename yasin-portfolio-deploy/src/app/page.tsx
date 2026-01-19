'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

// ============================================
// DATA
// ============================================
const projects = [
  { id: 2, title: 'Brand Campaign', category: 'Brand Film', youtubeId: 'EgRRRKSXxzg', thumbnail: '/thumbnails/thumb2.jpg', year: '2024', orientation: 'portrait', color: '#3B82F6', isShort: true },
  { id: 3, title: 'AI-Powered Commercial', category: 'AI Video', youtubeId: '8-YxCmFjRLA', thumbnail: '/thumbnails/thumb3.jpg', year: '2024', orientation: 'portrait', color: '#10B981', isShort: true },
  { id: 4, title: 'Social Media Series', category: 'Social Content', youtubeId: 'vrYuv7i9HUM', thumbnail: '/thumbnails/thumb4.jpg', year: '2023', orientation: 'landscape', color: '#F59E0B' },
  { id: 5, title: 'Corporate Documentary', category: 'Documentary', youtubeId: 'K2H-thz48TI', thumbnail: '/thumbnails/thumb5.jpg', year: '2023', orientation: 'landscape', color: '#EF4444' },
  { id: 7, title: 'Product Launch Film', category: 'Commercial', youtubeId: 'Jmonxy8U3mU', thumbnail: '/thumbnails/thumb7.jpg', year: '2024', orientation: 'landscape', color: '#6366F1' },
]

const stats = [
  { value: 1000, suffix: '+', label: 'Marka', desc: 'Hizmet verilen', icon: '◆' },
  { value: 5, suffix: '+', label: 'Yıl', desc: 'Deneyim', icon: '◈' },
  { value: 50, suffix: 'M+', label: 'İzlenme', desc: 'Toplam', icon: '▲' },
  { value: 10, suffix: '+', label: 'Kişi', desc: 'Ekip', icon: '●' },
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
// MESH GRADIENT BACKGROUND
// ============================================
function MeshGradientBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#0a0a0f]">
      {/* Animated Mesh Gradients */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] rounded-full opacity-40"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      <motion.div
        animate={{
          scale: [1, 0.9, 1],
          x: [0, -40, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[30%] right-[-15%] w-[700px] h-[700px] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.5) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 60, 0],
          y: [0, -40, 0],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-10%] left-[30%] w-[900px] h-[900px] rounded-full opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(16,185,129,0.3) 0%, transparent 70%)',
          filter: 'blur(120px)',
        }}
      />
      
      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 0.5,
          }}
          className="absolute w-1 h-1 rounded-full bg-white/30"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + i * 10}%`,
          }}
        />
      ))}

      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />
      
      {/* Radial gradient overlay for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0a0a0f_70%)]" />
      
      {/* Noise texture */}
      <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />
    </div>
  )
}

// ============================================
// GLASSMORPHISM CARD
// ============================================
function GlassCard({ children, className = '', hover = true }: { children: React.ReactNode; className?: string; hover?: boolean }) {
  return (
    <motion.div
      whileHover={hover ? { y: -3, scale: 1.01 } : {}}
      transition={{ duration: 0.3 }}
      className={`relative overflow-hidden rounded-xl md:rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] ${className}`}
      style={{
        boxShadow: '0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)',
      }}
    >
      {/* Glass shine effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent pointer-events-none" />
      {children}
    </motion.div>
  )
}

// ============================================
// COUNTER WITH BACKGROUND GRAPHIC
// ============================================
function BentoStatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (!inView) return
    let current = 0
    const duration = 2000
    const step = stat.value / (duration / 16)
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
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <GlassCard className="relative p-4 md:p-6 h-full min-h-[120px] md:min-h-[150px]">
        {/* Background graphic element */}
        <div className="absolute top-0 right-0 w-16 md:w-24 h-16 md:h-24 opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <motion.path
              d="M10,50 Q30,20 50,50 T90,50"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-emerald-500"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 2, delay: index * 0.2 }}
            />
          </svg>
        </div>

        <div className="relative z-10">
          <span className="text-xl md:text-2xl text-emerald-500/30 mb-2 block">{stat.icon}</span>
          <span className="font-bold bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent text-3xl md:text-4xl">
            {count}{stat.suffix}
          </span>
          <div className="mt-2">
            <span className="text-white/80 font-medium text-sm md:text-base">{stat.label}</span>
            <span className="text-white/40 text-xs md:text-sm ml-1 hidden sm:inline">{stat.desc}</span>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  )
}

// ============================================
// VIDEO CARD WITH COLOR SHADOW
// ============================================
function VideoCard({ project, index, onSelect }: { project: typeof projects[0]; index: number; onSelect: (p: typeof projects[0]) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onClick={() => onSelect(project)}
      className="group cursor-pointer"
    >
      <div 
        className="relative aspect-[4/3] rounded-xl md:rounded-3xl overflow-hidden"
        style={{
          boxShadow: `0 10px 40px -15px ${project.color}40`,
        }}
      >
        {/* Thumbnail */}
        <img 
          src={project.thumbnail} 
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        
        {/* Color accent on hover */}
        <motion.div 
          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
          style={{ backgroundColor: project.color }}
        />
        
        {/* Glass border */}
        <div className="absolute inset-0 rounded-xl md:rounded-3xl border border-white/10 group-hover:border-white/20 transition-colors" />

        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="w-10 h-10 md:w-16 md:h-16 rounded-full backdrop-blur-xl bg-white/10 border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white" className="ml-0.5">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </motion.div>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-3 md:p-5">
          <span 
            className="inline-block px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-medium mb-1 md:mb-2 backdrop-blur-sm"
            style={{ backgroundColor: `${project.color}30`, color: project.color }}
          >
            {project.category}
          </span>
          <h3 className="text-xs md:text-lg font-semibold text-white line-clamp-1">{project.title}</h3>
        </div>
      </div>
    </motion.div>
  )
}

// ============================================
// VIDEO MODAL - YouTube Embed
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

  // YouTube embed URL
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
        className="absolute top-6 right-6 w-12 h-12 rounded-full backdrop-blur-xl bg-white/10 border border-white/20 flex items-center justify-center transition-all hover:bg-white/20 z-10"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
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
// INTERACTIVE TIMELINE
// ============================================
function Timeline() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/50 via-purple-500/50 to-transparent" />
      
      <div className="space-y-4 md:space-y-6">
        {experience.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            onClick={() => setActiveIndex(i)}
            className="relative pl-12 md:pl-20 cursor-pointer group"
          >
            {/* Timeline dot/badge */}
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
// PREMIUM EXIT BADGE
// ============================================
function ExitBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
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
              <span className="text-amber-400 text-xl md:text-2xl font-bold block">230M+</span>
              <p className="text-white/40 mt-1">Toplam İzlenme</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ============================================
// NAVIGATION - Sticky Blur
// ============================================
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
            ? 'backdrop-blur-2xl bg-[#0a0a0f]/60 border-b border-white/5' 
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
              {['Projelerim', 'Hakkımda', 'Deneyim'].map((item) => (
                
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm text-white/50 hover:text-white transition-colors relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-emerald-500 group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>

            
              href="#iletişim"
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 backdrop-blur-2xl bg-[#0a0a0f]/95 pt-16 md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-6">
              {['Projelerim', 'Hakkımda', 'Deneyim', 'İletişim'].map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-medium text-white/80 hover:text-emerald-400 transition-colors"
                >
                  {item}
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
// HERO SECTION - Massive Typography
// ============================================
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 md:pb-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-6 w-full">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full backdrop-blur-xl bg-white/5 border border-white/10 mb-6 md:mb-8"
          >
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs md:text-sm text-white/60">İstanbul, Avrupa</span>
          </motion.div>

          {/* Name */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-base md:text-xl text-emerald-400 font-medium mb-3 md:mb-4"
          >
            Yasin Aktaş
          </motion.p>

          {/* Massive Title with Outline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mb-6 md:mb-8"
          >
            <span className="block text-5xl sm:text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter text-white leading-[0.9]">
              CREATIVE
            </span>
            <span className="block text-3xl sm:text-4xl md:text-6xl lg:text-[7rem] font-black tracking-tighter leading-[1] mt-1 md:mt-2">
              <span className="text-outline">DIRECTOR</span>
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-sm md:text-lg text-white/50 leading-relaxed mb-8 md:mb-10 max-w-xl mx-auto px-2"
          >
            Video prodüksiyon ve marka iletişimi alanında
            <span className="text-white font-medium"> 5+ yıllık deneyim</span> ile 
            <span className="text-white font-medium"> 1000+ markaya</span> hizmet verdim.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 px-4 sm:px-0"
          >
            
              href="#projelerim"
              className="group inline-flex items-center justify-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 rounded-full bg-white text-[#0a0a0f] font-semibold hover:bg-emerald-400 transition-all duration-300 text-sm md:text-base"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="group-hover:translate-x-1 transition-transform">
                <polygon points="5,3 19,12 5,21" />
              </svg>
              Projelerimi Gör
            </a>
            
              href="#contact"
              className="inline-flex items-center justify-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 backdrop-blur-sm transition-all text-sm md:text-base"
            >
              Benimle Çalış
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2"
          >
            <div className="w-1 h-2 rounded-full bg-emerald-500" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================
// WORK SECTION
// ============================================
function WorkSection({ onSelect }: { onSelect: (p: typeof projects[0]) => void }) {
  return (
    <section id="projelerim" className="py-16 md:py-32 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12"
        >
          <div>
            <span className="text-emerald-500 text-xs md:text-sm tracking-wider uppercase mb-2 md:mb-3 block">Portföy</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white">Projelerim</h2>
          </div>
          <a 
            href="https://www.behance.net/yasinakktas"
            target="_blank"
            className="text-white/40 hover:text-emerald-400 text-xs md:text-sm mt-3 md:mt-0 inline-flex items-center gap-2 transition-colors"
          >
            Tümünü Gör
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {projects.map((project, index) => (
            <VideoCard key={project.id} project={project} index={index} onSelect={onSelect} />
          ))}
        </div>
      </div>
      
    </section>
  )
}

// ============================================
// STATS SECTION - Bento Grid
// ============================================
function StatsSection() {
  return (
    <section className="py-16 md:py-32 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-16"
        >
          <span className="text-emerald-500 text-xs md:text-sm tracking-wider uppercase mb-2 md:mb-3 block">Rakamlarla</span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white">Başarılarım</h2>
        </motion.div>
        
        {/* Bento Grid */}
        <div className="grid grid-cols-2 gap-3 md:gap-6">
          {stats.map((stat, i) => (
            <BentoStatCard key={i} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
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
        { label: 'Algoritma Uzmanlığı', desc: 'YouTube ve Instagram algoritmaları üzerine derinlemesine bilgi birikimi.' },
      ]
    },
    {
      title: 'Dijital İçerik Stratejisi',
      items: [
        { label: 'Marka Kampanyaları', desc: 'Yüksek dönüşüm sağlayan görsel içeriklerin uçtan uca üretimi.' },
        { label: 'Platform Odaklı Dağıtım', desc: 'Farklı sosyal medya dinamiklerine özel içerik geliştirme.' },
      ]
    },
  ]

  return (
    <section id="hakkımda" className="py-16 md:py-32 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-emerald-500 text-xs md:text-sm tracking-wider uppercase mb-2 md:mb-3 block">Hakkımda</span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
            Medya ve <span className="text-outline">Teknolojinin</span> Kesişimi
          </h2>
          <p className="text-white/50 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Turkuvaz Medya'da 4 yıl boyunca Kreatif Videographer olarak görev aldım. 
            Creative Touch Productions ile kendi ajansımı kurarak 10 kişilik bir ekiple 
            1000+ markaya video içerikleri ve dijital danışmanlık hizmetleri sundum.
          </p>
        </motion.div>

        {/* Expertise Grid */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
          {expertiseAreas.map((area, areaIndex) => (
            <motion.div
              key={areaIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: areaIndex * 0.1 }}
            >
              <div className="group relative h-full p-5 md:p-6 rounded-xl md:rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-emerald-500/30 hover:bg-white/[0.04] transition-all duration-300">
                {/* Subtle gradient on hover */}
                <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative">
                  {/* Category Title */}
                  <div className="flex items-center gap-3 mb-4 md:mb-5">
                    <div className="w-1 h-6 md:h-8 bg-gradient-to-b from-emerald-500 to-emerald-500/20 rounded-full" />
                    <h3 className="text-lg md:text-xl font-semibold text-white">{area.title}</h3>
                  </div>
                  
                  {/* Items */}
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

        {/* Location Card */}
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
        
        {/* Premium Exit Badge */}
        <div className="mt-12 md:mt-20">
          <ExitBadge />
        </div>
      </div>
    </section>
  )
}

// ============================================
// EXPERIENCE SECTION
// ============================================
function ExperienceSection() {
  return (
    <section id="deneyim" className="py-16 md:py-32 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-16"
        >
          <span className="text-emerald-500 text-xs md:text-sm tracking-wider uppercase mb-2 md:mb-3 block">Kariyer</span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white">Deneyim</h2>
        </motion.div>

        <Timeline />
      </div>
    </section>
  )
}

// ============================================
// CONTACT SECTION
// ============================================
function ContactSection() {
  return (
    <section id="iletişim" className="py-16 md:py-32 px-4 md:px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-emerald-500 text-xs md:text-sm tracking-wider uppercase mb-2 md:mb-3 block">İletişim</span>
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white mb-4 md:mb-6">
            Birlikte<br />
            <span className="text-outline">Çalışalım</span>
          </h2>
          <p className="text-white/40 text-sm md:text-lg mb-8 md:mb-12 max-w-lg mx-auto px-4">
            Yeni projeler, iş birlikleri veya sadece merhaba demek için.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-8 md:mb-12 px-4">
            
              href="mailto:yasin.aktas@outlook.com.tr"
              className="w-full sm:w-auto flex items-center justify-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-medium transition-all text-sm md:text-base"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22,7-8.97,5.7a1.94,1.94,0,0,1-2.06,0L2,7" />
              </svg>
              Email Gönder
            </a>
            
              href="tel:+905304653974"
              className="w-full sm:w-auto flex items-center justify-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 rounded-full border border-white/20 text-white hover:bg-white/5 backdrop-blur-sm transition-all text-sm md:text-base"
            >
              +90 530 465 39 74
            </a>
          </div>

          <div className="flex items-center justify-center gap-6 md:gap-8">
            {[
              { href: 'https://linkedin.com/in/yasinakkts', label: 'LinkedIn' },
              { href: 'https://instagram.com/creativetouchss', label: 'Instagram' },
              { href: 'https://behance.net/yasinakktas', label: 'Behance' },
            ].map((link) => (
              
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
    </section>
  )
}

// ============================================
// FOOTER
// ============================================
function Footer() {
  return (
    <footer className="py-6 md:py-8 px-4 md:px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4">
        <span className="text-white/30 text-xs md:text-sm">© 2026 Yasin Aktaş</span>
        <span className="text-white/30 text-xs md:text-sm">İstanbul'dan ♥ ile</span>
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
      <MeshGradientBackground />
      <Navigation />
      
      <main>
        <HeroSection />
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
