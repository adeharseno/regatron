import type { Metadata } from 'next'
import {
  metadata as studioMetadata,
  NextStudioLayout,
  viewport as studioViewport,
} from 'next-sanity/studio'

export const metadata: Metadata = {
  ...studioMetadata,
  title: 'REGATRON Studio',
}

export const viewport = studioViewport

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <NextStudioLayout>{children}</NextStudioLayout>
      </body>
    </html>
  )
}
