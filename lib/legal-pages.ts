import type { Locale } from './i18n/config'

export type LegalPageKey = 'privacyPolicy' | 'termsConditions'

interface LocalizedLegalCopy {
  title: string
  metaTitle: string
  metaDescription: string
  body: string
}

interface LegalPageDefinition {
  documentId: string
  path: string
  lastUpdated: string
  id: LocalizedLegalCopy
  en: LocalizedLegalCopy
}

export const legalPages: Record<LegalPageKey, LegalPageDefinition> = {
  privacyPolicy: {
    documentId: 'privacyPolicyPage',
    path: '/privacy-policy',
    lastUpdated: '2026-07-25',
    id: {
      title: 'Kebijakan Privasi',
      metaTitle: 'Kebijakan Privasi | REGATRON',
      metaDescription:
        'Pelajari bagaimana REGATRON mengumpulkan, menggunakan, menyimpan, dan melindungi informasi pribadi pengunjung website.',
      body: `1. Pendahuluan

REGATRON, yang dikelola oleh PT. Regar Karya Utama, menghormati privasi setiap pengunjung website. Kebijakan ini menjelaskan jenis informasi yang kami kumpulkan, alasan penggunaannya, serta pilihan yang tersedia bagi Anda.

2. Informasi yang Kami Kumpulkan

Ketika Anda mengirimkan formulir kontak, kami dapat mengumpulkan:
- Nama lengkap
- Nama perusahaan
- Nomor telepon
- Alamat email
- Jenis kebutuhan atau pertanyaan
- Isi pesan yang Anda kirimkan

Website juga dapat mengumpulkan informasi teknis terbatas, seperti jenis perangkat, browser, halaman yang dikunjungi, serta data penggunaan melalui layanan analitik.

3. Penggunaan Informasi

Informasi tersebut digunakan untuk:
- Menjawab pertanyaan dan permintaan konsultasi
- Menindaklanjuti kebutuhan penjemputan, perdagangan, atau kerja sama
- Mengelola hubungan bisnis dan layanan pelanggan
- Memelihara keamanan serta meningkatkan kualitas website
- Memenuhi kewajiban hukum yang berlaku

4. Penyimpanan dan Keamanan

Kami menyimpan informasi hanya selama diperlukan untuk tujuan pengumpulannya atau selama diwajibkan oleh hukum. Langkah teknis dan organisasi yang wajar diterapkan untuk membantu mencegah akses, penggunaan, perubahan, atau pengungkapan tanpa izin.

5. Pembagian Informasi

Kami tidak menjual informasi pribadi Anda. Informasi hanya dapat dibagikan kepada penyedia layanan yang membantu operasional website atau kepada pihak berwenang apabila diwajibkan oleh hukum. Penyedia layanan tersebut hanya diperbolehkan menggunakan informasi sesuai kebutuhan layanan yang diberikan.

6. Hak Anda

Sesuai hukum yang berlaku, Anda dapat meminta akses, koreksi, pembaruan, atau penghapusan informasi pribadi yang kami simpan. Permintaan dapat diajukan melalui informasi kontak yang tersedia pada website.

7. Tautan Pihak Ketiga

Website dapat memuat tautan menuju layanan pihak ketiga. REGATRON tidak bertanggung jawab atas praktik privasi atau isi layanan eksternal tersebut.

8. Perubahan Kebijakan

Kebijakan Privasi ini dapat diperbarui dari waktu ke waktu. Versi terbaru akan ditampilkan pada halaman ini bersama tanggal pembaruannya.

9. Hubungi Kami

Untuk pertanyaan mengenai Kebijakan Privasi atau pengelolaan informasi pribadi, silakan hubungi REGATRON melalui halaman Contact Us.`,
    },
    en: {
      title: 'Privacy Policy',
      metaTitle: 'Privacy Policy | REGATRON',
      metaDescription:
        'Learn how REGATRON collects, uses, stores, and protects personal information submitted through this website.',
      body: `1. Introduction

REGATRON, operated by PT. Regar Karya Utama, respects the privacy of every website visitor. This policy explains what information we collect, why it is used, and the choices available to you.

2. Information We Collect

When you submit the contact form, we may collect:
- Full name
- Company name
- Phone number
- Email address
- Inquiry type
- The message you submit

The website may also collect limited technical information such as device type, browser, visited pages, and usage data through analytics services.

3. How We Use Information

We use this information to:
- Respond to questions and consultation requests
- Follow up on collection, trading, or partnership requirements
- Manage business relationships and customer service
- Maintain security and improve the website
- Comply with applicable legal obligations

4. Retention and Security

We retain information only for as long as necessary for its original purpose or as required by law. Reasonable technical and organizational safeguards are applied to help prevent unauthorized access, use, alteration, or disclosure.

5. Information Sharing

We do not sell your personal information. Information may only be shared with service providers supporting our website operations or with authorities when required by law. Service providers may only use the information as necessary to perform their services.

6. Your Rights

Subject to applicable law, you may request access to, correction, updating, or deletion of personal information held by us. Requests can be submitted using the contact details available on this website.

7. Third-Party Links

The website may contain links to third-party services. REGATRON is not responsible for the privacy practices or content of those external services.

8. Policy Updates

We may update this Privacy Policy from time to time. The latest version and its revision date will be displayed on this page.

9. Contact Us

For questions regarding this Privacy Policy or our handling of personal information, please contact REGATRON through the Contact Us page.`,
    },
  },
  termsConditions: {
    documentId: 'termsConditionsPage',
    path: '/terms-and-conditions',
    lastUpdated: '2026-07-25',
    id: {
      title: 'Syarat & Ketentuan',
      metaTitle: 'Syarat & Ketentuan | REGATRON',
      metaDescription:
        'Syarat dan ketentuan penggunaan website serta informasi layanan REGATRON.',
      body: `1. Penerimaan Ketentuan

Dengan mengakses website REGATRON, Anda menyetujui Syarat & Ketentuan ini. Jika Anda tidak menyetujuinya, mohon untuk tidak menggunakan website.

2. Informasi dan Layanan

Website menyediakan informasi umum mengenai REGATRON, pengelolaan e-waste, pemulihan material, perdagangan, serta layanan terkait. Informasi pada website bukan merupakan penawaran atau kontrak yang mengikat kecuali dinyatakan secara tertulis.

3. Permintaan Melalui Formulir

Pengiriman formulir kontak tidak secara otomatis membentuk hubungan kontraktual. Jadwal, harga, volume, spesifikasi material, dan persyaratan layanan akan dikonfirmasi secara terpisah oleh REGATRON.

4. Penggunaan yang Diizinkan

Anda setuju untuk tidak:
- Menggunakan website untuk tujuan yang melanggar hukum
- Mengirimkan data palsu, menyesatkan, atau berbahaya
- Mencoba mengakses sistem atau data tanpa izin
- Mengganggu keamanan atau operasional website
- Menyalin atau menggunakan konten REGATRON tanpa izin yang berlaku

5. Hak Kekayaan Intelektual

Nama, merek, logo, teks, gambar, dan materi lain pada website merupakan milik REGATRON atau digunakan berdasarkan izin. Tidak ada bagian website yang boleh direproduksi, didistribusikan, atau digunakan untuk tujuan komersial tanpa persetujuan tertulis.

6. Tautan Pihak Ketiga

Tautan menuju website pihak ketiga disediakan untuk kenyamanan. REGATRON tidak mengendalikan dan tidak bertanggung jawab atas isi, ketersediaan, atau kebijakan layanan eksternal tersebut.

7. Akurasi Informasi

Kami berupaya menjaga informasi tetap akurat dan terkini, tetapi tidak menjamin bahwa seluruh informasi selalu lengkap atau bebas dari kesalahan. Informasi dapat diperbarui tanpa pemberitahuan sebelumnya.

8. Batasan Tanggung Jawab

Sejauh diizinkan hukum, REGATRON tidak bertanggung jawab atas kerugian tidak langsung yang timbul dari penggunaan atau ketidakmampuan menggunakan website. Ketentuan layanan tertentu dapat diatur lebih lanjut dalam perjanjian tertulis terpisah.

9. Perubahan Ketentuan

Syarat & Ketentuan ini dapat diperbarui sewaktu-waktu. Penggunaan website setelah pembaruan berarti Anda menerima versi terbaru.

10. Hukum yang Berlaku

Syarat & Ketentuan ini diatur berdasarkan hukum Republik Indonesia.

11. Hubungi Kami

Jika Anda memiliki pertanyaan mengenai ketentuan ini, silakan hubungi REGATRON melalui halaman Contact Us.`,
    },
    en: {
      title: 'Terms & Conditions',
      metaTitle: 'Terms & Conditions | REGATRON',
      metaDescription:
        'Terms and conditions governing the use of the REGATRON website and its service information.',
      body: `1. Acceptance of Terms

By accessing the REGATRON website, you agree to these Terms & Conditions. If you do not agree, please do not use the website.

2. Information and Services

The website provides general information about REGATRON, e-waste management, material recovery, trading, and related services. Website information does not constitute a binding offer or contract unless confirmed in writing.

3. Form Submissions

Submitting a contact form does not automatically establish a contractual relationship. Schedules, prices, volumes, material specifications, and service requirements will be confirmed separately by REGATRON.

4. Acceptable Use

You agree not to:
- Use the website for unlawful purposes
- Submit false, misleading, or harmful information
- Attempt to access systems or data without authorization
- Interfere with website security or operation
- Copy or use REGATRON content without applicable permission

5. Intellectual Property

Names, trademarks, logos, text, images, and other materials on the website belong to REGATRON or are used with permission. No website content may be reproduced, distributed, or used commercially without written approval.

6. Third-Party Links

Links to third-party websites are provided for convenience. REGATRON does not control and is not responsible for the content, availability, or policies of external services.

7. Information Accuracy

We make reasonable efforts to keep information accurate and current but do not guarantee that all information is always complete or error-free. Information may be updated without prior notice.

8. Limitation of Liability

To the extent permitted by law, REGATRON is not liable for indirect loss arising from the use of, or inability to use, this website. Specific service terms may be governed by separate written agreements.

9. Changes to These Terms

We may update these Terms & Conditions at any time. Continued use of the website after an update means you accept the latest version.

10. Governing Law

These Terms & Conditions are governed by the laws of the Republic of Indonesia.

11. Contact Us

If you have questions about these terms, please contact REGATRON through the Contact Us page.`,
    },
  },
}

export function getLegalPageCopy(key: LegalPageKey, locale: Locale) {
  const page = legalPages[key]
  return locale === 'id' ? page.id : page.en
}

export function localizedStringValue(id: string, en: string) {
  return [
    {
      _key: 'legal-id-string',
      _type: 'internationalizedArrayStringValue',
      language: 'id',
      value: id,
    },
    {
      _key: 'legal-en-string',
      _type: 'internationalizedArrayStringValue',
      language: 'en',
      value: en,
    },
  ]
}

export function localizedTextValue(id: string, en: string) {
  return [
    {
      _key: 'legal-id-text',
      _type: 'internationalizedArrayTextValue',
      language: 'id',
      value: id,
    },
    {
      _key: 'legal-en-text',
      _type: 'internationalizedArrayTextValue',
      language: 'en',
      value: en,
    },
  ]
}
