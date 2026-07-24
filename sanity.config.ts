'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import { structureTool } from "sanity/structure";
import { internationalizedArray } from 'sanity-plugin-internationalized-array'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './sanity/env'
import {schema} from './sanity/schemaTypes'
import {structure} from './sanity/structure'
import { MigrateHomePageLocalizationAction } from './sanity/actions/migrateHomePageLocalization'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  document: {
    newDocumentOptions: (previous) =>
      previous.filter((template) => template.templateId !== 'homePage'),
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
      fieldTypes: ['string', 'text'],
      languageDisplay: 'titleAndCode',
    }),
    structureTool({structure}),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
  ],
})
