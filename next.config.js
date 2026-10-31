// Content Security Policy: only this site's own files, plus YouTube for the archive films.
// Next inlines its bootstrap scripts and framer-motion writes inline styles, hence 'unsafe-inline';
// the dev server also needs eval for hot reload.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === 'production' ? '' : " 'unsafe-eval'"}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://img.youtube.com https://i.ytimg.com",
  "media-src 'self' blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  'frame-src https://www.youtube.com https://www.youtube-nocookie.com',
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  'upgrade-insecure-requests',
].join('; ')

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  // Older browsers that don't read frame-ancestors: no framing the site (clickjacking)
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  async headers() {
    // Media keeps its file name when replaced, so it isn't cached forever: a week, then
    // served from cache while the browser checks for a newer copy in the background
    const media = [{ key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=2592000' }]
    return [
      { source: '/:path*', headers: securityHeaders },
      { source: '/videos/:path*', headers: media },
      { source: '/apps/:path*', headers: media },
      { source: '/thumbnails/:path*', headers: media },
    ]
  },
}

module.exports = nextConfig
