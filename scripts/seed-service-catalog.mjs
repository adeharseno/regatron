import { createClient } from '@sanity/client'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_WRITE_TOKEN
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-07-21'

if (!projectId || !dataset || !token) {
  throw new Error('Missing Sanity environment variables')
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false })

const localizedString = (id, en) => [
  { _key: 'id', _type: 'internationalizedArrayStringValue', language: 'id', value: id },
  { _key: 'en', _type: 'internationalizedArrayStringValue', language: 'en', value: en },
]

const localizedText = (id, en) => [
  { _key: 'id', _type: 'internationalizedArrayTextValue', language: 'id', value: id },
  { _key: 'en', _type: 'internationalizedArrayTextValue', language: 'en', value: en },
]

const serviceItems = [
  {
    key: 'collection',
    id: ['Penjemputan E-Waste', 'Layanan penjemputan untuk rumah tangga, kantor, dan lokasi industri yang cepat, aman, dan minim gangguan operasional.'],
    en: ['E-Waste Collection', 'A streamlined pickup service for households, offices, and industrial sites that is fast, safe, and minimizes disruption.'],
  },
  {
    key: 'sorting',
    id: ['Sortir & Pengolahan', 'Setiap batch dipisahkan menjadi komponen yang dapat digunakan kembali, material daur ulang, dan zat berbahaya agar ditangani secara tepat.'],
    en: ['Sorting & Processing', 'Every batch is separated into reusable components, recyclable materials, and hazardous substances so each stream receives the right handling.'],
  },
  {
    key: 'recycling',
    id: ['Daur Ulang Ramah Lingkungan', 'Kami memulihkan komponen bernilai sekaligus menetralkan material berbahaya secara aman untuk melindungi pekerja dan lingkungan.'],
    en: ['Eco-Friendly Recycling', 'We recover valuable components while safely neutralizing hazardous materials to protect workers and the environment.'],
  },
  {
    key: 'supply',
    id: ['Perdagangan & Pasokan E-Waste', 'Pasokan material e-waste terproses yang andal dengan sumber yang transparan dan dapat ditelusuri untuk mitra industri.'],
    en: ['E-Waste Trading & Supply', 'Reliable processed e-waste materials with transparent, traceable sourcing for industrial partners.'],
  },
]

const servicePage = {
  _id: 'servicePage',
  _type: 'servicePage',
  heroTitle: localizedString('Layanan E-Waste', 'E-Waste Services'),
  heroQuote: localizedText(
    'Dari saat e-waste meninggalkan tangan Anda hingga material berharganya kembali ke rantai pasok, REGATRON mengelola setiap tahap.',
    'From the moment your e-waste leaves your hands to the moment its valuable materials re-enter the supply chain, REGATRON manages every step.',
  ),
  heroImageAlt: localizedString('Fasilitas pengolahan e-waste REGATRON', 'REGATRON e-waste processing facility'),
  lifecycleEyebrow: localizedString('Keunggulan Operasional', 'Operational Excellence'),
  lifecycleHeading: localizedString('Siklus Pemulihan Material Terintegrasi', 'Integrated Material Recovery Lifecycle'),
  items: serviceItems.map((item) => ({
    _key: item.key,
    _type: 'servicePageItem',
    title: localizedString(item.id[0], item.en[0]),
    description: localizedText(item.id[1], item.en[1]),
    imageAlt: localizedString(item.id[0], item.en[0]),
  })),
  seoTitle: localizedString('Layanan Pengelolaan E-Waste | REGATRON', 'E-Waste Management Services | REGATRON'),
  seoDescription: localizedText(
    'Layanan penjemputan, sortir, daur ulang, dan pasokan e-waste terintegrasi dari REGATRON.',
    'Integrated e-waste collection, sorting, recycling, and material supply services from REGATRON.',
  ),
}

const catalogPage = {
  _id: 'catalogPage',
  _type: 'catalogPage',
  heroTitle: localizedString('Katalog E-Waste', 'E-Waste Catalog'),
  heroQuote: localizedText(
    'Jelajahi material elektronik yang ditangani REGATRON secara bertanggung jawab, dari papan sirkuit bermutu tinggi hingga scrap elektronik campuran.',
    'Explore the electronic materials REGATRON handles responsibly, from high-grade circuit boards to mixed electronic scrap.',
  ),
  heroImageAlt: localizedString('Material elektronik yang diproses REGATRON', 'Electronic materials processed by REGATRON'),
  catalogEyebrow: localizedString('Keahlian Material', 'Material Expertise'),
  catalogHeading: localizedString('Temukan Material E-Waste Anda', 'Find Your E-Waste Material'),
  seoTitle: localizedString('Katalog Material E-Waste | REGATRON', 'E-Waste Material Catalog | REGATRON'),
  seoDescription: localizedText(
    'Cari katalog material e-waste berdasarkan kode, nama, dan kategori yang ditangani REGATRON.',
    'Browse REGATRON e-waste materials by item code, name, and category.',
  ),
}

function readCatalog() {
  return readFileSync(join(process.cwd(), 'data/e-waste-catalog.tsv'), 'utf8')
    .trim()
    .split(/\r?\n/)
    .slice(1)
    .map((line) => {
      const [order, prefix, category, code, name] = line.split('\t')
      return { order: Number(order), prefix, category, code, name }
    })
}

async function seed() {
  await Promise.all([
    client.createIfNotExists(servicePage),
    client.createIfNotExists(catalogPage),
  ])

  const sourceItems = readCatalog()
  const existingCodes = new Set(
    await client.fetch(`*[_type == "catalogItem" && defined(code)].code`),
  )
  const missingItems = sourceItems.filter((item) => !existingCodes.has(item.code))

  if (missingItems.length) {
    let transaction = client.transaction()
    for (const item of missingItems) {
      transaction = transaction.create({
        _type: 'catalogItem',
        order: item.order,
        prefix: item.prefix,
        code: item.code,
        category: localizedString(item.category, item.category),
        name: localizedString(item.name, item.name),
        imageAlt: localizedString(item.name, item.name),
      })
    }
    await transaction.commit()
  }

  console.log(`Service and catalog pages are ready. Added ${missingItems.length} catalog items.`)
}

seed().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
