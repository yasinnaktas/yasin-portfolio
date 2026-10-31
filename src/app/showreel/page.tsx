import type { Metadata } from 'next'
import ShowreelView from './ShowreelView'

const title = 'Showreel 2026 | Yasin Aktaş'
const description = 'Yasin Aktaş — Creative Director / Video Production. Reklam filmi, 3D, drone ve motion design işlerinden 50 saniyelik showreel.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/showreel' },
  openGraph: {
    title,
    description,
    url: '/showreel',
    locale: 'tr_TR',
    type: 'video.other',
    images: [{ url: '/videos/showreel-tr.jpg', width: 1920, height: 1080 }],
    videos: [{ url: '/videos/showreel-tr.mp4', width: 1920, height: 1080, type: 'video/mp4' }],
  },
  twitter: { card: 'summary_large_image', images: ['/videos/showreel-tr.jpg'] },
}

export default function ShowreelPage() {
  return <ShowreelView />
}
