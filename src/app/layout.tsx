import type { Metadata } from 'next'
import { Inter, Instrument_Serif } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const instrument = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--font-instrument' })

export const metadata: Metadata = {
  title: 'Yasin Aktaş | Head of Creative',
  description: 'Kreatif liderlik, performance marketing ve yapay zeka — 1000+ marka, 10 kişilik ekip yönetimi, başarılı exit ve iOS ürünleri',
  keywords: ['video prodüksiyon', 'creative producer', 'yapay zeka', 'iOS uygulama', 'reklam filmi', 'İstanbul'],
  openGraph: {
    title: 'Yasin Aktaş | Head of Creative',
    description: 'Kreatif liderlik, performance marketing ve yapay zeka — 1000+ marka, 10 kişilik ekip yönetimi, başarılı exit ve iOS ürünleri',
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
