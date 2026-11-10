import HomeView from './HomeView'
import JsonLd from '@/lib/JsonLd'
import { homeMetadata, homeJsonLd } from '@/lib/seo'

export const metadata = homeMetadata('tr')

export default function Page() {
  return (
    <>
      <JsonLd data={homeJsonLd('tr')} />
      <HomeView initialLang="tr" />
    </>
  )
}
