import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Yasin Aktas | Kreatif Direktör',
  description: '5+ yıl deneyimle video prodüksiyon, AI destekli içerik üretimi ve marka stratejileri. 1000+ markaya hizmet.',
  keywords: ['Yasin Aktas', 'Kreatif Direktör', 'Video Prodüksiyon', 'AI Video', 'İstanbul'],
}

export const viewport: Viewport = {
  themeColor: '#08080c',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
