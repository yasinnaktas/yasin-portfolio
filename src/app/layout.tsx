import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

// Satoshi (Fontshare, ITF Free Font License) — one family for display and text
const satoshi = localFont({
  src: [
    { path: './fonts/Satoshi-Variable.woff2', weight: '300 900', style: 'normal' },
    { path: './fonts/Satoshi-VariableItalic.woff2', weight: '300 900', style: 'italic' },
  ],
  variable: '--font-satoshi',
  display: 'swap',
})

const description = 'Creative Director / Video Production — reklam filmi, 3D, drone ve yapay zeka destekli video. 1000+ marka, 50M+ izlenme, başarılı exit ve App Store’da yayında iOS ürünleri.'

export const metadata: Metadata = {
  metadataBase: new URL('https://xn--yasinakta-82b.com'),
  title: 'Yasin Aktaş | Creative Director / Video Production',
  description,
  keywords: ['creative director', 'head of creative', 'reklam filmi', 'yapay zeka video', 'video prodüksiyon', 'iOS uygulama', 'İstanbul'],
  openGraph: {
    title: 'Yasin Aktaş | Creative Director / Video Production',
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
  themeColor: '#F4F4F3',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={`${satoshi.variable} font-sans`}>{children}</body>
    </html>
  )
}
