import { stegaClean } from '@sanity/client/stega'

interface JsonLdProps {
  data: Record<string, unknown>
}

export function JsonLd({ data }: JsonLdProps) {
  const cleanData = stegaClean(data)

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(cleanData).replace(/</g, '\\u003c'),
      }}
    />
  )
}
