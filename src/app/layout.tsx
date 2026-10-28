import type { Metadata } from 'next'
import { Inter, Inter_Tight } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'latin-ext'], variable: '--font-inter' })
const interTight = Inter_Tight({ subsets: ['latin', 'latin-ext'], variable: '--font-display' })

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
  themeColor: '#F4F3EF',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={`${inter.variable} ${interTight.variable} font-sans`}>{children}</body>
    </html>
  )
}
