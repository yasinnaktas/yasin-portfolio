'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// A shareable page that is nothing but the reel: it starts playing (muted) the moment it
// opens, and one tap brings the sound in from the top. ?lang=en opens the English cut.
type Lang = 'tr' | 'en'

const copy = {
  tr: {
    kicker: 'Showreel 2026',
    title: ['Tüm işler,', '50 saniyede.'],
    sub: 'Creative Director / Video Production',
    cta: 'Sesli izle',
    work: 'Tüm işler',
    contact: 'İletişim',
    roles: ['Roller', 'Konsept · Yönetmenlik · Çekim · Drone · Kurgu · Renk · Motion design · Ses'],
    brands: ['Bu filmdeki markalar', 'Hepsiburada · Kamuran · İBB · Züber · Recrea · Isıjet · Mamush · CLAUDIE · Mr.Hakans · STATEMENT Coffee'],
    stats: ['Rakamlar', '1000+ marka · 50M+ izlenme · 15M₺ reklam bütçesi'],
    more: 'Tüm işleri izle',
    hire: 'Birlikte çalışalım',
  },
  en: {
    kicker: 'Showreel 2026',
    title: ['All the work,', 'in 50 seconds.'],
    sub: 'Creative Director / Video Production',
    cta: 'Watch with sound',
    work: 'All work',
    contact: 'Contact',
    roles: ['Roles', 'Concept · Direction · Cinematography · Drone · Editing · Colour · Motion design · Sound'],
    brands: ['Brands in this reel', 'Hepsiburada · Kamuran · IBB · Züber · Recrea · Isıjet · Mamush · CLAUDIE · Mr.Hakans · STATEMENT Coffee'],
    stats: ['Numbers', '1000+ brands · 50M+ views · 15M₺ ad spend'],
    more: 'Watch the work',
    hire: 'Work with me',
  },
}

const EASE = [0.16, 1, 0.3, 1] as const
const HOVER = { type: 'spring', stiffness: 320, damping: 28 } as const
const CARD = 'ring-1 ring-black/[0.04] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_24px_44px_-26px_rgba(0,0,0,0.38)]'
const wrap = 'max-w-[1120px] mx-auto px-5 md:px-8'
const btnDark = 'inline-flex items-center justify-center gap-1.5 h-9 px-4 rounded-full bg-ink text-white text-[12px] font-medium hover:bg-black/75 transition-colors'
const btnGhost = 'inline-flex items-center justify-center gap-1.5 h-9 px-4 rounded-full text-[12px] font-medium text-ink hover:bg-black/[0.05] transition-colors'
const MAIL = 'mailto:yasin.aktas@outlook.com.tr'

export default function ShowreelView() {
  const [lang, setLang] = useState<Lang>('tr')
  const [heard, setHeard] = useState(false)
  const ref = useRef<HTMLVideoElement>(null)
  const c = copy[lang]

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('lang') === 'en') setLang('en')
    // React doesn't reliably write `muted`, and without it phones refuse to autoplay
    const v = ref.current
    if (!v) return
    v.muted = true
    v.defaultMuted = true
    v.setAttribute('muted', '')
  }, [])

  // A language switch swaps the source; muted carries over, so sound stays as the viewer left it
  useEffect(() => {
    document.documentElement.lang = lang
    ref.current?.play().catch(() => {})
  }, [lang])

  const switchLang = () => {
    const next = lang === 'tr' ? 'en' : 'tr'
    setLang(next)
    window.history.replaceState(null, '', next === 'en' ? '?lang=en' : window.location.pathname)
  }

  const withSound = () => {
    const v = ref.current
    if (!v) return
    v.currentTime = 0
    v.muted = false
    setHeard(true)
    v.play().catch(() => {
      v.muted = true
      v.play().catch(() => {})
    })
  }

  return (
    <>
      <header className={`${wrap} h-14 flex items-center justify-between`}>
        <a href="/" className="text-[17px] md:text-[18px] font-bold tracking-[-0.035em] leading-none">Yasin Aktaş</a>
        <div className="flex items-center gap-1.5">
          <button onClick={switchLang} className="h-8 px-3 rounded-full text-[11px] font-bold text-body hover:text-ink hover:bg-black/[0.04] transition-colors" aria-label="Change language">
            {lang === 'tr' ? 'EN' : 'TR'}
          </button>
          <a href="/#isler" className={`${btnGhost} h-8 hidden sm:inline-flex`}>{c.work}</a>
          <a href={MAIL} className={`${btnDark} h-8`}>{c.contact}</a>
        </div>
      </header>

      <main className="pt-8 md:pt-14 pb-16">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE }} className={`${wrap} text-center`}>
          <p className="kicker text-cobalt mb-3">{c.kicker}</p>
          <h1 className="title text-[38px] sm:text-[52px] md:text-[64px]">
            {c.title[0]}<br /><span className="text-mute">{c.title[1]}</span>
          </h1>
          <p className="mt-4 text-[15px] md:text-[17px] font-medium tracking-[-0.025em] text-ink/85">{c.sub}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 0.15 }} className="max-w-[1240px] mx-auto px-3 md:px-8 mt-8 md:mt-12">
          <div className={`relative overflow-hidden rounded-[14px] md:rounded-[24px] bg-ink aspect-video ${CARD}`}>
            <video
              ref={ref}
              src={`/videos/showreel-${lang}.mp4`}
              poster={`/videos/showreel-${lang}.jpg`}
              muted
              autoPlay
              loop
              playsInline
              controls={heard}
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <AnimatePresence>
              {!heard && (
                <motion.button
                  key="cta"
                  onClick={withSound}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/0 transition-colors"
                >
                  <motion.span
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    transition={HOVER}
                    className="inline-flex items-center gap-2.5 md:gap-3 h-11 md:h-16 pl-1.5 md:pl-2 pr-5 md:pr-7 rounded-full bg-white text-ink shadow-[0_20px_40px_-16px_rgba(0,0,0,0.5)]"
                  >
                    <span className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-ink text-white flex items-center justify-center">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M4 9v6h4l5 4V5L8 9z" /><path d="M16 9a4 4 0 010 6M18.5 6.5a7.5 7.5 0 010 11" />
                      </svg>
                    </span>
                    <span className="text-[13px] md:text-[16px] font-bold tracking-[-0.02em]">{c.cta}</span>
                    <span className="text-[12px] font-medium text-mute">0:50</span>
                  </motion.span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <div className={`${wrap} mt-10 md:mt-14 grid gap-6 md:grid-cols-3 md:gap-10`}>
          {[c.roles, c.brands, c.stats].map(([head, body]) => (
            <div key={head} className="border-t border-line pt-4">
              <p className="text-[12px] font-bold mb-2">{head}</p>
              <p className="text-[12px] md:text-[13px] text-body leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        <div className={`${wrap} mt-10 flex flex-wrap items-center justify-center gap-2`}>
          <a href="/#isler" className={`${btnDark} h-12 px-6 text-[13px]`}>{c.more}</a>
          <a href={MAIL} className={`${btnGhost} h-12 px-6 text-[13px]`}>{c.hire}</a>
        </div>
      </main>

      <footer className={`${wrap} pb-8 text-center text-[11px] text-body`}>
        yasin.aktas@outlook.com.tr · +90 530 465 39 74
      </footer>
    </>
  )
}
