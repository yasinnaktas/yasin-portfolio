import type { MetadataRoute } from 'next'
import { sitemapPages } from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return sitemapPages.map(({ url, languages, priority }) => ({ url, lastModified, changeFrequency: 'monthly', priority, alternates: { languages } }))
}
