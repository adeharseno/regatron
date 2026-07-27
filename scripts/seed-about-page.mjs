import { createClient } from '@sanity/client'

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

const localizedItems = (items, type) =>
  items.map(([key, id, en]) => ({
    _key: key,
    _type: type,
    text: localizedString(id, en),
  }))

const aboutPage = {
  _id: 'aboutPage',
  _type: 'aboutPage',
  heroTitle: localizedString(
    'Memelopori Sirkularitas Industri Indonesia',
    'Pioneering Circularity in Indonesian Industry',
  ),
  heroDescription: localizedText(
    'Mengubah e-waste industri menjadi bahan baku bermurni tinggi. Kami adalah mitra strategis Indonesia untuk pemulihan material berkelanjutan dan tata kelola lingkungan.',
    "Turning industrial e-waste into high-purity raw materials. We are Indonesia's strategic partner for sustainable material recovery and environmental stewardship.",
  ),
  heroImageAlt: localizedString(
    'Fasilitas pengolahan e-waste industri REGATRON',
    'REGATRON industrial e-waste processing facility',
  ),
  heroPrimaryLabel: localizedString('Kapabilitas Kami', 'Our Capabilities'),
  heroPrimaryHref: '/services',
  heroSecondaryLabel: localizedString('Hubungi Kami', 'Contact Us'),
  heroSecondaryHref: '/contact',
  profileHeading: localizedString('Mengapa REGATRON Hadir', 'Why REGATRON Exists'),
  profileParagraph1: localizedText(
    'Teknologi bergerak sangat cepat — dan meninggalkan jejak di baliknya. Perangkat elektronik yang dibuang mengandung zat berbahaya seperti arsenik dan merkuri, yang jika tidak dikelola dapat mencemari tanah, air, dan makhluk hidup yang bergantung padanya.',
    'Technology moves fast — and it leaves a trail behind. Discarded electronics carry hazardous substances like arsenic and mercury, which, left unmanaged, can contaminate soil, water, and the living things that depend on them.',
  ),
  profileParagraph2: localizedText(
    'REGATRON dibangun untuk menutup celah itu. Kami menghadirkan solusi daur ulang e-waste yang bertanggung jawab dan berkelanjutan, dengan satu misi sederhana: menjadikan daur ulang e-waste mudah, aman, dan benar-benar berdampak.',
    'REGATRON was built to close that gap. We provide responsible, sustainable e-waste recycling solutions with one simple mission: make e-waste recycling easy, safe, and genuinely impactful.',
  ),
  profileHighlightLabel: localizedString('Sekilas Perusahaan', 'At a Glance'),
  profileHighlight: localizedText(
    'REGATRON (PT Regar Karya Utama) adalah perusahaan pengelolaan e-waste Indonesia yang didirikan pada 2015. Kami mengelola seluruh siklus limbah elektronik — dari pengumpulan, pemilahan, hingga pengolahan ramah lingkungan — untuk rumah tangga, bisnis, dan mitra industri di seluruh negeri.',
    'REGATRON (PT Regar Karya Utama) is an Indonesian e-waste management company founded in 2015. We manage the full lifecycle of electronic waste — from collection and sorting to eco-friendly processing — for households, businesses, and industrial partners across the country.',
  ),
  profileImageAlt: localizedString(
    'Proses pemulihan material e-waste REGATRON',
    'REGATRON e-waste material recovery process',
  ),
  visionLabel: localizedString('Visi', 'Vision'),
  visionStatement: localizedText(
    'Menjadi pemimpin global dalam pengelolaan e-waste yang berkelanjutan, dengan mendorong solusi inovatif demi bumi yang lebih bersih dan sehat.',
    'To become a global leader in sustainable e-waste management, driving innovative solutions for a cleaner, healthier planet.',
  ),
  missionLabel: localizedString('Misi', 'Mission'),
  missions: localizedItems([
    ['mission-1', 'Menghadirkan solusi daur ulang e-waste yang praktis dan bertanggung jawab', 'Deliver practical, responsible e-waste recycling solutions'],
    ['mission-2', 'Meningkatkan kesadaran akan bahaya e-waste yang tidak dikelola', 'Raise awareness of the risks of unmanaged e-waste'],
    ['mission-3', 'Mengembangkan teknologi ramah lingkungan untuk pemrosesan yang aman', 'Innovate eco-friendly technologies for safe processing'],
    ['mission-4', 'Membangun kemitraan jangka panjang dalam ekosistem daur ulang berkelanjutan', 'Build lasting partnerships across a sustainable recycling ecosystem'],
  ], 'missionItem'),
  valuesEyebrow: localizedString('Landasan Kami', 'What Guides Us'),
  valuesHeading: localizedString('Nilai Utama', 'Core Values'),
  valuesDescription: localizedText(
    'Prinsip yang mendasari setiap keputusan, kemitraan, dan material yang kami tangani.',
    'The principles behind every decision, partnership, and material we handle.',
  ),
  values: localizedItems([
    ['value-1', 'Keberlanjutan', 'Sustainability'],
    ['value-2', 'Tanggung Jawab', 'Responsibility'],
    ['value-3', 'Inovasi', 'Innovation'],
    ['value-4', 'Integritas', 'Integrity'],
    ['value-5', 'Kolaborasi', 'Collaboration'],
  ], 'valueItem'),
  timelineHeading: localizedString('Rekam Jejak', 'Milestones'),
  timelineDescription: localizedText(
    'Perjalanan REGATRON dari 2015 hingga 2025.',
    "REGATRON's track record from 2015 to 2025.",
  ),
  milestones: [
    ['2015', 'Berdiri', 'Founded', 'REGATRON didirikan untuk menjawab tantangan e-waste yang terus tumbuh di Indonesia.', "REGATRON was established to address Indonesia's growing e-waste challenge."],
    ['2019', 'Ekspansi', 'Expansion', 'Layanan diperluas ke klien korporasi dan industri, disertai teknologi pemilahan dan daur ulang yang lebih canggih.', 'Services extended to corporate and industrial clients, with more advanced sorting and recycling technology introduced.'],
    ['2025', 'Penguatan Skala', 'Scaling Up', 'Memperkuat kemitraan dan infrastruktur menuju cakupan nasional dan standar pengelolaan e-waste bertaraf global.', 'Strengthening partnerships and infrastructure toward nationwide coverage and global-standard e-waste management.'],
  ].map(([year, idLabel, enLabel, idDescription, enDescription]) => ({
    _key: `milestone-${year}`,
    _type: 'milestone',
    year,
    label: localizedString(idLabel, enLabel),
    description: localizedText(idDescription, enDescription),
  })),
  leadershipHeading: localizedString('Tim Manajemen', 'Management Team'),
  leadershipDescription: localizedText(
    'Orang-orang yang memimpin REGATRON melangkah maju.',
    'The people leading REGATRON forward.',
  ),
  members: [
    ['faisal-siregar', 'Faisal Siregar', 'Direktur Utama', 'President Director'],
    ['osama-siregar', 'M. Osama Siregar', 'Kepala Pengembangan Bisnis', 'Head of Business Development'],
    ['soleh', 'Soleh', 'Kepala Pengadaan', 'Head of Procurement'],
    ['randhika-djabal', 'Randhika Djabal', 'Kepala Keuangan & Akuntansi', 'Head of Finance & Accounting'],
    ['aldo-alfanso', 'Aldo Alfanso', 'Kepala Logistik & Gudang', 'Head of Logistics & Warehouse'],
  ].map(([key, name, idRole, enRole]) => ({
    _key: key,
    _type: 'teamMember',
    name,
    role: localizedString(idRole, enRole),
    imageAlt: localizedString(`Foto ${name}`, `Portrait of ${name}`),
  })),
  seoTitle: localizedString(
    'REGATRON | Tentang Kami - Perusahaan Pengelolaan E-Waste',
    'REGATRON | About Us - Sustainable E-Waste Management',
  ),
  seoDescription: localizedText(
    'Berdiri sejak 2015, REGATRON adalah perusahaan pengelolaan limbah elektronik di Indonesia yang berdedikasi pada inovasi daur ulang yang bertanggung jawab dan aman.',
    'Founded in 2015, REGATRON is an Indonesian e-waste management company dedicated to responsible recycling, eco-friendly innovation, and sustainability.',
  ),
}

client
  .createIfNotExists(aboutPage)
  .then(() => console.log('About page is ready.'))
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
