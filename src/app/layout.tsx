import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { SITE, NAME } from '@/lib/seo'

// Satoshi (Fontshare, ITF Free Font License) — one family for display and text.
// Nothing on the site is set in italics, so only the upright face is loaded.
const satoshi = localFont({
  src: [
    { path: './fonts/Satoshi-Variable.woff2', weight: '300 900', style: 'normal' },
  ],
  variable: '--font-satoshi',
  display: 'swap',
})

// Site-wide defaults; each page sets its own title, description, canonical address and share card
export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: 'Yasin Aktaş | Creative Director / Video Production',
  applicationName: NAME,
  authors: [{ name: NAME, url: SITE }],
  creator: NAME,
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-video-preview': -1, 'max-snippet': -1 } },
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
