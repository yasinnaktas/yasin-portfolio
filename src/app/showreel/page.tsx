import ShowreelView from './ShowreelView'
import JsonLd from '@/lib/JsonLd'
import { showreelMetadata, showreelJsonLd } from '@/lib/seo'

export const metadata = showreelMetadata('tr')

export default function Page() {
  return (
    <>
      <JsonLd data={showreelJsonLd('tr')} />
      <ShowreelView initialLang="tr" />
    </>
  )
}
