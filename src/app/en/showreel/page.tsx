import ShowreelView from '../../showreel/ShowreelView'
import JsonLd from '@/lib/JsonLd'
import { showreelMetadata, showreelJsonLd } from '@/lib/seo'

export const metadata = showreelMetadata('en')

export default function Page() {
  return (
    <>
      <JsonLd data={showreelJsonLd('en')} />
      <ShowreelView initialLang="en" />
    </>
  )
}
