'use client'

import { useState } from 'react'
import { SyncIcon } from '@sanity/icons/Sync'
import { type DocumentActionComponent, useClient } from 'sanity'
import { apiVersion } from '../env'

const localizedFields = [
  'heroTitleLine1',
  'heroTitleLine2',
  'heroDescription',
  'heroImageAlt',
  'heroPrimaryCtaLabel',
  'heroSecondaryCtaLabel',
] as const

type LocalizedItem = {
  _key?: string
  _type?: string
  language?: string
  value?: unknown
}

function isLegacyItem(value: unknown): value is LocalizedItem {
  if (!value || typeof value !== 'object') return false
  const item = value as LocalizedItem
  return !item.language && (item._key === 'id' || item._key === 'en')
}

function createArrayKey() {
  return crypto.randomUUID().replaceAll('-', '').slice(0, 12)
}

export const MigrateHomePageLocalizationAction: DocumentActionComponent = (props) => {
  const client = useClient({ apiVersion })
  const [isMigrating, setIsMigrating] = useState(false)
  const document = props.draft ?? props.published

  const needsMigration = localizedFields.some((field) => {
    const value = document?.[field]
    return Array.isArray(value) && value.some(isLegacyItem)
  })

  if (!needsMigration) return null

  return {
    label: isMigrating ? 'Migrating localization…' : 'Migrate localization to v5',
    icon: SyncIcon,
    disabled: isMigrating,
    tone: 'positive',
    onHandle: async () => {
      if (!document) return
      setIsMigrating(true)

      try {
        const migratedFields = Object.fromEntries(
          localizedFields.flatMap((field) => {
            const value = document[field]
            if (!Array.isArray(value)) return []

            return [
              [
                field,
                value.map((item: unknown) => {
                  if (!isLegacyItem(item)) return item
                  return {
                    ...item,
                    _key: createArrayKey(),
                    language: item._key,
                  }
                }),
              ],
            ]
          }),
        )

        const draftId = props.draft?._id ?? `drafts.${props.id.replace(/^drafts\./, '')}`
        await client.patch(draftId).set(migratedFields).commit()
        props.onComplete()
      } finally {
        setIsMigrating(false)
      }
    },
  }
}

MigrateHomePageLocalizationAction.displayName = 'MigrateHomePageLocalizationAction'
