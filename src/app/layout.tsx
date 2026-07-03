import type { Metadata } from 'next'
import { Inter, Instrument_Serif } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const instrument = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--font-instrument' })

export const metadata: Metadata = {
  title: 'Yasin Aktaş | Creative Producer',
  description: 'Video prodüksiyon, yapay zeka destekli içerik ve iOS uygulama geliştirme — 5+ yıllık deneyim, 1000+ marka',
  keywords: ['video prodüksiyon', 'creative producer', 'yapay zeka', 'iOS uygulama', 'reklam filmi', 'İstanbul'],
  openGraph: {
    title: 'Yasin Aktaş | Creative Producer',
    description: 'Video prodüksiyon, yapay zeka destekli içerik ve iOS uygulama geliştirme — 5+ yıllık deneyim, 1000+ marka',
    locale: 'tr_TR',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#050508',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={`${inter.variable} ${instrument.variable} font-sans`}>{children}</body>
    </html>
  )
}
