// Each language has its own address so search engines can index both: Turkish at the
// root (/ and /showreel), English under /en. The address is the single source of truth.
export type Lang = 'tr' | 'en'

const stripEn = (pathname: string) => pathname.replace(/^\/en(?=\/|$)/, '') || '/'

// Internal links carry the language: '/#isler' becomes '/en#isler' in English
export const withLang = (href: string, lang: Lang) => {
  const [path, hash] = href.split('#')
  const p = path || '/'
  const out = lang === 'en' ? (p === '/' ? '/en' : `/en${p}`) : p
  return `${out}${hash ? `#${hash}` : ''}`
}

// Switching language swaps the copy in place and moves the address to the other
// language's page, so a reload or a copied link opens the same language
export function rememberLang(lang: Lang) {
  document.documentElement.lang = lang
  const url = new URL(window.location.href)
  const next = withLang(stripEn(url.pathname), lang)
  if (url.pathname === next && !url.searchParams.has('lang')) return
  url.pathname = next
  url.searchParams.delete('lang')
  window.history.replaceState(null, '', url)
}
