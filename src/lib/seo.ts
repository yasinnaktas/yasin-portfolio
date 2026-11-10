import type { Metadata } from 'next'
import type { Lang } from './lang'

// The domain is yasinaktaş.com; crawlers and share cards need its ASCII (punycode) form
export const SITE = 'https://xn--yasinakta-82b.com'
export const NAME = 'Yasin Aktaş'
const OG_IMAGE = { url: '/og.jpg', width: 1200, height: 630, alt: 'Yasin Aktaş — Creative Director / Video Production' }
const SAME_AS = ['https://www.linkedin.com/in/yasinakkts', 'https://www.instagram.com/yasinakkts/']
// When the current showreel cut was published
const REEL_DATE = '2026-11-06'

const text = {
  tr: {
    home: {
      title: 'Yasin Aktaş | Creative Director & Video Prodüksiyon, İstanbul',
      description: 'Yasin Aktaş, İstanbul merkezli Creative Director. Reklam filmi, 3D animasyon, drone ve yapay zeka destekli video prodüksiyon: 1000+ marka, 50M+ izlenme. Showreel ve seçili işler.',
    },
    reel: {
      title: 'Showreel 2026 | Yasin Aktaş, Creative Director',
      description: 'Yasin Aktaş’ın 2026 showreel’i: reklam filmi, 3D animasyon, drone ve motion design işlerinden 52 saniyelik seçki.',
    },
    job: 'Creative Director',
    bio: 'İstanbul merkezli Creative Director ve video prodüksiyon yönetmeni. Reklam filmi, 3D animasyon, drone çekimi, motion design ve yapay zeka destekli video üretiyor.',
    knows: ['Kreatif yönetmenlik', 'Video prodüksiyon', 'Reklam filmi', '3D animasyon', 'Motion design', 'Drone çekimi', 'Yapay zeka destekli video', 'iOS uygulama geliştirme'],
  },
  en: {
    home: {
      title: 'Yasin Aktaş | Creative Director & Video Production, Istanbul',
      description: 'Yasin Aktaş is an Istanbul-based Creative Director. Ad films, 3D animation, drone and AI-assisted video production for 1000+ brands, with 50M+ views. Watch the showreel and selected work.',
    },
    reel: {
      title: 'Showreel 2026 | Yasin Aktaş, Creative Director',
      description: 'Yasin Aktaş’s 2026 showreel: 52 seconds of ad films, 3D animation, drone and motion design work.',
    },
    job: 'Creative Director',
    bio: 'Istanbul-based Creative Director and video production lead, making ad films, 3D animation, drone footage, motion design and AI-assisted video.',
    knows: ['Creative direction', 'Video production', 'Advertising film', '3D animation', 'Motion design', 'Drone cinematography', 'AI-assisted video', 'iOS app development'],
  },
} as const

const path = (page: 'home' | 'reel', lang: Lang) => {
  const base = page === 'home' ? '/' : '/showreel'
  return lang === 'en' ? (base === '/' ? '/en' : `/en${base}`) : base
}
// Tells search engines the two addresses are the same page in two languages
const languages = (page: 'home' | 'reel') => ({ tr: path(page, 'tr'), en: path(page, 'en'), 'x-default': path(page, 'tr') })
const locale = (lang: Lang) => (lang === 'en' ? 'en_US' : 'tr_TR')

export function homeMetadata(lang: Lang): Metadata {
  const { title, description } = text[lang].home
  return {
    title,
    description,
    alternates: { canonical: path('home', lang), languages: languages('home') },
    openGraph: { title, description, url: path('home', lang), siteName: NAME, locale: locale(lang), alternateLocale: locale(lang === 'en' ? 'tr' : 'en'), type: 'profile', firstName: 'Yasin', lastName: 'Aktaş', images: [OG_IMAGE] },
    twitter: { card: 'summary_large_image', title, description, images: [OG_IMAGE.url] },
  }
}

export function showreelMetadata(lang: Lang): Metadata {
  const { title, description } = text[lang].reel
  const still = `/videos/showreel-${lang}.jpg`
  return {
    title,
    description,
    alternates: { canonical: path('reel', lang), languages: languages('reel') },
    openGraph: {
      title, description, url: path('reel', lang), siteName: NAME, locale: locale(lang), alternateLocale: locale(lang === 'en' ? 'tr' : 'en'), type: 'video.other',
      images: [{ url: still, width: 1920, height: 1080 }],
      videos: [{ url: `/videos/showreel-${lang}.mp4`, width: 1920, height: 1080, type: 'video/mp4' }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [still] },
  }
}

const PERSON_ID = `${SITE}/#person`

// Who the site is about, in the vocabulary search engines read (schema.org)
export function homeJsonLd(lang: Lang) {
  const t = text[lang]
  const url = `${SITE}${path('home', lang)}`
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': PERSON_ID,
        name: NAME,
        alternateName: 'Yasin Aktas',
        givenName: 'Yasin',
        familyName: 'Aktaş',
        jobTitle: t.job,
        description: t.bio,
        url: SITE,
        sameAs: SAME_AS,
        address: { '@type': 'PostalAddress', addressLocality: lang === 'en' ? 'Istanbul' : 'İstanbul', addressCountry: 'TR' },
        knowsAbout: t.knows,
        knowsLanguage: ['tr', 'en'],
        alumniOf: { '@type': 'CollegeOrUniversity', name: lang === 'en' ? 'Istanbul Kültür University' : 'İstanbul Kültür Üniversitesi' },
      },
      { '@type': 'WebSite', '@id': `${SITE}/#website`, url: SITE, name: NAME, inLanguage: ['tr', 'en'], publisher: { '@id': PERSON_ID } },
      { '@type': 'ProfilePage', '@id': `${url}#page`, url, name: t.home.title, description: t.home.description, inLanguage: lang, isPartOf: { '@id': `${SITE}/#website` }, about: { '@id': PERSON_ID }, mainEntity: { '@id': PERSON_ID } },
    ],
  }
}

export function showreelJsonLd(lang: Lang) {
  const t = text[lang]
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: t.reel.title,
    description: t.reel.description,
    thumbnailUrl: `${SITE}/videos/showreel-${lang}.jpg`,
    contentUrl: `${SITE}/videos/showreel-${lang}.mp4`,
    embedUrl: `${SITE}${path('reel', lang)}`,
    uploadDate: `${REEL_DATE}T12:00:00+03:00`,
    duration: 'PT52S',
    inLanguage: lang,
    creator: { '@type': 'Person', '@id': PERSON_ID, name: NAME, url: SITE },
  }
}

// Pages listed in the sitemap, each with its other-language twin
export const sitemapPages = (['home', 'reel'] as const).flatMap((page) =>
  (['tr', 'en'] as const).map((lang) => ({
    url: `${SITE}${path(page, lang)}`,
    languages: Object.fromEntries(Object.entries(languages(page)).map(([k, v]) => [k, `${SITE}${v}`])),
    priority: page === 'home' ? 1 : 0.8,
  })),
)
