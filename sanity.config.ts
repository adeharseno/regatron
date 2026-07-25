'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig, type Template} from 'sanity'
import { structureTool } from "sanity/structure";
import { internationalizedArray } from 'sanity-plugin-internationalized-array'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './sanity/env'
import {schema} from './sanity/schemaTypes'
import {structure} from './sanity/structure'
import { MigrateHomePageLocalizationAction } from './sanity/actions/migrateHomePageLocalization'
import {
  legalPages,
  localizedStringValue,
  localizedTextValue,
} from './lib/legal-pages'

const legalPageTemplates: Template[] = [
  {
    id: 'privacyPolicyPageTemplate',
    title: 'Privacy Policy',
    schemaType: 'legalPage',
    value: {
      title: localizedStringValue(
        legalPages.privacyPolicy.id.title,
        legalPages.privacyPolicy.en.title,
      ),
      body: localizedTextValue(
        legalPages.privacyPolicy.id.body,
        legalPages.privacyPolicy.en.body,
      ),
      lastUpdated: legalPages.privacyPolicy.lastUpdated,
      metaTitle: localizedStringValue(
        legalPages.privacyPolicy.id.metaTitle,
        legalPages.privacyPolicy.en.metaTitle,
      ),
      metaDescription: localizedTextValue(
        legalPages.privacyPolicy.id.metaDescription,
        legalPages.privacyPolicy.en.metaDescription,
      ),
    },
  },
  {
    id: 'termsConditionsPageTemplate',
    title: 'Terms & Conditions',
    schemaType: 'legalPage',
    value: {
      title: localizedStringValue(
        legalPages.termsConditions.id.title,
        legalPages.termsConditions.en.title,
      ),
      body: localizedTextValue(
        legalPages.termsConditions.id.body,
        legalPages.termsConditions.en.body,
      ),
      lastUpdated: legalPages.termsConditions.lastUpdated,
      metaTitle: localizedStringValue(
        legalPages.termsConditions.id.metaTitle,
        legalPages.termsConditions.en.metaTitle,
      ),
      metaDescription: localizedTextValue(
        legalPages.termsConditions.id.metaDescription,
        legalPages.termsConditions.en.metaDescription,
      ),
    },
  },
]

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  templates: (previous: Template[]) => [...previous, ...legalPageTemplates],
  document: {
    newDocumentOptions: (previous) =>
      previous.filter(
        (template) =>
          ![
            'homePage',
            'siteSettings',
            'contactPage',
            'contactSubmission',
            'legalPage',
            'privacyPolicyPageTemplate',
            'termsConditionsPageTemplate',
          ].includes(template.templateId),
      ),
    actions: (previous, context) =>
      context.schemaType === 'homePage'
        ? [MigrateHomePageLocalizationAction, ...previous]
        : previous,
  },
  plugins: [
    internationalizedArray({
      languages: [
        { id: 'id', title: 'Bahasa Indonesia' },
        { id: 'en', title: 'English' },
      ],
      defaultLanguages: ['id', 'en'],
      fieldTypes: ['string', 'text', 'postBody'],
      languageDisplay: 'titleAndCode',
    }),
    structureTool({structure}),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
  ],
})
