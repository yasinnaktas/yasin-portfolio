import type { Metadata } from 'next'
import { Instrument_Sans, Instrument_Serif, JetBrains_Mono } from 'next/font/google'
import './globals.css'

// One type family across the site: Instrument Serif for display, Instrument Sans for text, JetBrains Mono for meta/timecode
const sans = Instrument_Sans({ subsets: ['latin', 'latin-ext'], variable: '--font-sans' })
const serif = Instrument_Serif({ subsets: ['latin', 'latin-ext'], weight: '400', style: ['normal', 'italic'], variable: '--font-serif' })
const mono = JetBrains_Mono({ subsets: ['latin', 'latin-ext'], weight: ['400', '500'], variable: '--font-mono' })

const description = 'Head of Creative · Creative Director — reklam filmi, yapay zeka destekli video ve kreatif liderlik. 1000+ marka, 10 kişilik ekip, başarılı exit ve App Store’da yayında iOS ürünleri.'

export const metadata: Metadata = {
  metadataBase: new URL('https://xn--yasinakta-82b.com'),
  title: 'Yasin Aktaş | Head of Creative · Creative Director',
  description,
  keywords: ['creative director', 'head of creative', 'reklam filmi', 'yapay zeka video', 'video prodüksiyon', 'iOS uygulama', 'İstanbul'],
  openGraph: {
    title: 'Yasin Aktaş | Head of Creative · Creative Director',
    description,
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0A0A0A',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={`${sans.variable} ${serif.variable} ${mono.variable} font-sans`}>{children}</body>
    </html>
  )
}
