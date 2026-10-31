// The site is one language at a time across pages: ?lang= in the link wins, then the
// viewer's last choice, then Turkish. Storage can be blocked (private mode), so it's best effort.
export type Lang = 'tr' | 'en'

const KEY = 'lang'

export function savedLang(): Lang | null {
  const q = new URLSearchParams(window.location.search).get('lang')
  if (q === 'en' || q === 'tr') return q
  try {
    const s = localStorage.getItem(KEY)
    if (s === 'en' || s === 'tr') return s
  } catch {}
  return null
}

// Remembers the choice and keeps the address in step, so a reload or a copied link opens the same language
export function rememberLang(lang: Lang) {
  document.documentElement.lang = lang
  try { localStorage.setItem(KEY, lang) } catch {}
  const url = new URL(window.location.href)
  if (lang === 'en') url.searchParams.set('lang', 'en')
  else url.searchParams.delete('lang')
  window.history.replaceState(null, '', url)
}

// Internal links carry the language, so it survives even where storage doesn't
export const withLang = (href: string, lang: Lang) => {
  if (lang !== 'en') return href
  const [path, hash] = href.split('#')
  return `${path || '/'}?lang=en${hash ? `#${hash}` : ''}`
}
