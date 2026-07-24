import type { Dictionary } from '../dictionaries'

const id: Dictionary = {
  nav: {
    aboutUs: 'Tentang Kami',
    ourStory: 'Perjalanan Kami',
    services: 'Layanan',
    products: 'Produk',
    news: 'Berita',
    contact: 'Kontak',
    contactCta: 'Hubungi Kami',
  },
  footer: {
    description:
      'Solusi tepercaya untuk ekstraksi logam mulia dan pengelolaan e-waste dengan standar lingkungan tertinggi. Pelopor industri elektronik sirkular Indonesia.',
    navigationHeading: 'Navigasi',
    navigationLinks: ['Tentang Kami', 'Layanan & Solusi', 'Katalog Produk', 'Pusat Berita'],
    legalHeading: 'Legal',
    legalLinks: ['Kebijakan Privasi', 'Syarat & Ketentuan', 'Sertifikasi ISO'],
    socialHeading: 'Media Sosial',
    socials: ['LinkedIn', 'Instagram', 'YouTube'],
    copyright: '© 2024 PT. Regar Karya Utama. Seluruh Hak Cipta Dilindungi.',
    tagline: 'Precision Enterprise',
    location: 'Bekasi, Indonesia',
  },
  home: {
    hero: {
      titleLine1: 'Mengubah E-Waste Menjadi',
      titleLine2: 'Masa Depan yang Lebih Bersih dan Aman',
      description:
        'Daur ulang e-waste dan pemulihan material yang bertanggung jawab untuk bisnis, industri, dan institusi di seluruh Indonesia.',
      ctaPrimary: 'Konsultasi Gratis',
      ctaSecondary: 'Lihat Layanan',
    },
    milestones: {
      heading: 'Masalah yang Kami Selesaikan',
      description:
        'Setiap tahun, semakin banyak perangkat elektronik mencapai akhir masa pakainya — tanpa penanganan yang tepat, material di dalamnya bisa meresap ke tanah dan air, membahayakan masyarakat dan ekosistem. REGATRON hadir untuk memastikan hal itu tidak terjadi.',
    },
    services: {
      heading: 'Yang Membedakan Kami',
      description:
        'Solusi end-to-end untuk pengelolaan limbah elektronik bernilai tinggi dengan efisiensi pemulihan material maksimal.',
      items: [
        {
          title: 'Penjemputan E-Waste',
          desc: 'Logistik tersertifikasi untuk penjemputan limbah dari rumah tangga, kantor, dan kawasan industri.',
        },
        {
          title: 'Sortir & Analisis',
          desc: 'Pemisahan material menggunakan teknologi AI untuk mengidentifikasi kandungan logam mulia dengan presisi tinggi.',
        },
        {
          title: 'Eco-Refining',
          desc: 'Ekstraksi logam mulia menggunakan metode hidrometalurgi ramah lingkungan dengan emisi karbon minimal.',
        },
        {
          title: 'Pasokan Material',
          desc: 'Distribusi material hasil ekstraksi ke produsen teknologi global untuk mendukung ekonomi sirkular.',
        },
      ],
    },
    products: {
      heading: 'Produk Kami',
      description:
        'Katalog material hasil ekstraksi dengan tingkat kemurnian tinggi, siap diintegrasikan kembali ke rantai pasok manufaktur global.',
      downloadCta: 'Unduh Katalog Lengkap',
      cat1: {
        title: 'Scrap PCB',
        desc: 'Papan sirkuit dari berbagai perangkat elektronik dengan kandungan logam mulia yang dioptimalkan untuk proses pemurnian.',
        items: ['Motherboard', 'Server Board', 'PCB Laptop', 'PCB Desktop'],
      },
      cat2: {
        title: 'IC & Chip Scrap',
        desc: 'Komponen semikonduktor dengan konsentrasi emas dan perak tinggi.',
        tag: 'BGA • RAM • CPU • GPU',
      },
      cat3: {
        title: 'Konektor PM',
        desc: 'Konektor berlapis emas dan soket presisi tinggi.',
        tag: 'Berlapis Emas • Soket CPU',
      },
      cat4: {
        title: 'Kapasitor & Resistor',
        desc: 'Komponen pasif mengandung palladium dan perak, diproses melalui pemisahan mekanis presisi.',
        tag: 'Industrial Grade',
      },
    },
    news: {
      heading: 'Wawasan & Berita',
      description: 'Wawasan industri daur ulang dan pembaruan terbaru dari REGATRON.',
      seeAll: 'Lihat Semua',
      empty: 'Belum ada artikel yang dipublikasikan. Silakan cek kembali nanti.',
      archiveTitle: 'Berita & Artikel',
      backToHome: 'Kembali ke Beranda',
      backToNews: 'Kembali ke Berita',
    },
  },
  about: {
    hero: {
      title: 'Memelopori Sirkularitas Industri Indonesia',
      description:
        'Mengubah e-waste industri menjadi bahan baku bermurni tinggi. Kami adalah mitra strategis Indonesia untuk pemulihan material berkelanjutan dan tata kelola lingkungan.',
      primaryCta: 'Kapabilitas Kami',
      secondaryCta: 'Laporan Keberlanjutan',
    },
    why: {
      heading: 'Mengapa REGATRON Hadir',
      quote: 'Menyelesaikan krisis tersembunyi dari manufaktur modern.',
      paragraph1:
        'Indonesia adalah salah satu pasar barang elektronik dengan pertumbuhan tercepat di dunia. Namun tanpa infrastruktur pemulihan berskala industri, sumber daya berharga akan terbuang ke tempat pembuangan dan berisiko mencemari lingkungan.',
      paragraph2:
        'REGATRON didirikan untuk menjembatani hal ini. Kami menyediakan solusi "Closed-Loop" bagi produsen elektronik, data center, dan entitas korporat untuk membuang perangkat keras secara aman sekaligus mengintegrasikan kembali emas, palladium, dan tembaga ke rantai pasok.',
      stat1: { value: '98%', label: 'Tingkat Pemulihan Sumber Daya' },
      stat2: { value: '15K', label: 'Ton Diproses per Tahun' },
      badge:
        'Fasilitas bersertifikat ISO 14001 & R2v3 yang memenuhi standar global pengelolaan lingkungan.',
    },
    principles: {
      heading: 'Prinsip Utama',
      description: 'Peta jalan kami menuju ekosistem industri nol limbah di Asia Tenggara.',
      vision: {
        title: 'Visi Kami',
        desc: 'Menjadi fondasi utama ekonomi sirkular Indonesia, menetapkan standar presisi teknis dan transparansi etis dalam pengelolaan limbah industri.',
        since: 'BERDIRI 2015',
      },
      tech: {
        title: 'Integritas Teknologi',
        desc: 'Mengembangkan teknologi eco-refining eksklusif untuk memaksimalkan ekstraksi material bermurni tinggi.',
      },
      eco: {
        title: 'Tanggung Jawab Lingkungan',
        desc: 'Melindungi ekosistem lokal melalui proses zero-discharge dan kepatuhan ketat.',
      },
      partnership: {
        title: 'Kemitraan Strategis',
        desc: 'Memberdayakan industri mencapai target keberlanjutan melalui pelaporan dan logistik berbasis data.',
      },
    },
    timeline: {
      heading: 'Satu Dekade Kemajuan',
      description: 'Evolusi infrastruktur REGATRON.',
      items: [
        {
          year: '2015',
          label: 'Pendirian',
          desc: 'Mendirikan hub pengumpulan pertama di Bekasi, fokus pada peremajaan perangkat keras korporat.',
        },
        {
          year: '2018',
          label: 'Hub Pemurnian',
          desc: 'Membuka fasilitas hidrometalurgi utama untuk ekstraksi emas dan perak.',
        },
        {
          year: '2021',
          label: 'Digitalisasi',
          desc: 'Meluncurkan portal klien REGATRACK untuk pelaporan keberlanjutan secara real-time.',
        },
        {
          year: '2024',
          label: 'Ekspansi Regional',
          desc: 'Ekspansi ke koridor industri Jawa Barat dengan sistem sortir otomatis.',
        },
        {
          year: '2025',
          label: 'Zero Waste 2.0',
          desc: 'Rencana aktivasi unit pemulihan unsur tanah jarang tingkat lanjut.',
        },
      ],
    },
    leadership: {
      heading: 'Kepemimpinan Strategis',
      description: 'Keahlian rekayasa dan lingkungan sebagai fondasi utama.',
      viewBoard: 'Lihat Dewan Penasihat',
      members: [
        {
          name: 'Budi Santoso',
          role: 'Chief Executive Officer',
          bio: 'Mantan lead engineer di perusahaan elektronik otomotif global. 15+ tahun di bidang materials science.',
          quote: '"Presisi adalah penggerak dampak."',
        },
        {
          name: 'Dr. Maya Lestari',
          role: 'Chief Technology Officer',
          bio: 'PhD Teknik Kimia. Spesialis pemulihan logam non-ferrous dan sistem waste-to-resource.',
          quote: '"Keberlanjutan adalah kebutuhan teknis."',
        },
        {
          name: 'Hendrik Wijaya',
          role: 'Operations Director',
          bio: 'Ahli strategi operasional dengan pengalaman mendalam di logistik dan manajemen fasilitas industri di Jawa.',
          quote: '"Keselamatan dan efisiensi tidak terpisahkan."',
        },
      ],
    },
  },
  ctaBanner: {
    heading: 'Siap mengamankan rantai pasok Anda?',
    description:
      'Bergabunglah dengan ratusan perusahaan Indonesia dalam transisi menuju sirkularitas industri. Mari bangun masa depan yang lebih bersih bersama.',
    primary: 'Mulai Konsultasi',
    secondary: 'Ajukan Kunjungan Lokasi',
  },
  contact: {
    heading: 'Hubungi Kami',
    description:
      'Baik Anda butuh penjemputan e-waste, ingin mendapatkan pasokan scrap berkualitas, atau menjajaki kerja sama — kami ingin mendengar dari Anda.',
    addressLabel: 'Kantor Pusat',
    address: 'Jababeka Industrial Estate Phase III, Cikarang, Bekasi, Jawa Barat 17530',
    phoneLabel: 'Telepon/WhatsApp',
    phone: '+62 8-596-055-6937',
    emailLabel: 'Email',
    email: 'faisalregar30@gmail.com',
    form: {
      fullName: 'Nama Lengkap',
      company: 'Perusahaan (opsional)',
      phone: 'Telepon',
      email: 'Email Bisnis',
      inquiryTypeLabel: 'Jenis Kebutuhan',
      inquiryOptions: ['Penjemputan E-Waste', 'Sourcing & Trading', 'Kemitraan', 'Lainnya'],
      message: 'Pesan',
      submit: 'Kirim Pesan',
    },
  },
}

export default id
