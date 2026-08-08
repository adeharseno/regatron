import Script from 'next/script'

const GOOGLE_SWG_BASIC_SRC = 'https://news.google.com/swg/js/v1/swg-basic.js'

export function GoogleSwgBasic() {
  return (
    <>
      <Script id="google-swg-basic-init" strategy="afterInteractive">
        {`
          (self.SWG_BASIC = self.SWG_BASIC || []).push((basicSubscriptions) => {
            basicSubscriptions.init({
              type: 'NewsArticle',
              isPartOfType: ['Product'],
              isPartOfProductId: 'CAowmp_hCw:openaccess',
              clientOptions: { theme: 'light', lang: 'en' },
            });
          });
        `}
      </Script>
      <Script
        id="google-swg-basic"
        src={GOOGLE_SWG_BASIC_SRC}
        strategy="afterInteractive"
        async
      />
    </>
  )
}
