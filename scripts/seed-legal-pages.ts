import { createClient } from '@sanity/client'
import {
  legalPages,
  localizedStringValue,
  localizedTextValue,
} from '../lib/legal-pages'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_WRITE_TOKEN
const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-07-21'

if (!projectId || !dataset || !token) {
  throw new Error('Missing Sanity environment variables')
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
})

function legalDocument(key: keyof typeof legalPages) {
  const page = legalPages[key]

  return {
    _id: page.documentId,
    _type: 'legalPage',
    title: localizedStringValue(page.id.title, page.en.title),
    body: localizedTextValue(page.id.body, page.en.body),
    lastUpdated: page.lastUpdated,
    metaTitle: localizedStringValue(page.id.metaTitle, page.en.metaTitle),
    metaDescription: localizedTextValue(
      page.id.metaDescription,
      page.en.metaDescription,
    ),
  }
}

async function seedLegalPages() {
  await Promise.all([
    client.createIfNotExists(legalDocument('privacyPolicy')),
    client.createIfNotExists(legalDocument('termsConditions')),
  ])

  await client
    .patch('siteSettings')
    .set({
      'footerLegalLinks[_key == "footer-privacy"].href':
        legalPages.privacyPolicy.path,
      'footerLegalLinks[_key == "footer-terms"].href':
        legalPages.termsConditions.path,
    })
    .commit()

  console.log('Legal pages and footer links are ready.')
}

seedLegalPages().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
