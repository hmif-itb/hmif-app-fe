export type PrestasiData = {
  id: number;
  nama: string;
  namaPrestasi: string;
  jenisPrestasi: string;
  namaOrganisasi: string;
  avatar: string;
};

export const mockPrestasiData: PrestasiData[] = [
  {
    id: 1,
    nama: 'Noumisyifa Nabila N.',
    namaPrestasi: 'Lorem ipsum dolor sit amet consectetur adipiscing elit',
    jenisPrestasi: 'Kepanitiaan',
    namaOrganisasi: 'Lorem ipsum dolor sit amet consectetur',
    avatar: 'N',
  },
  {
    id: 2,
    nama: 'Ahmad Rizki Setiawan',
    namaPrestasi: 'Juara 1 Kompetisi Programming National Championship',
    jenisPrestasi: 'Kompetisi',
    namaOrganisasi: 'IEEE Computer Society Indonesia',
    avatar: 'A',
  },
  {
    id: 3,
    nama: 'Sarah Dewi Maharani',
    namaPrestasi: 'Ketua Organisasi Mahasiswa Fakultas Teknik',
    jenisPrestasi: 'Organisasi',
    namaOrganisasi: 'Himpunan Mahasiswa Informatika',
    avatar: 'S',
  },
  {
    id: 4,
    nama: 'Budi Santoso Wijaya',
    namaPrestasi: 'Koordinator Panitia Acara Nasional Dies Natalis',
    jenisPrestasi: 'Kepanitiaan',
    namaOrganisasi: 'Panitia Dies Natalis Universitas',
    avatar: 'B',
  },
  {
    id: 5,
    nama: 'Noumisyifa Nabila N.',
    namaPrestasi: 'Lorem ipsum dolor sit amet consectetur adipiscing elit',
    jenisPrestasi: 'Kepanitiaan',
    namaOrganisasi: 'Lorem ipsum dolor sit amet consectetur',
    avatar: 'N',
  },
  {
    id: 6,
    nama: 'Ahmad Rizki Setiawan',
    namaPrestasi: 'Juara 1 Kompetisi Programming National Championship',
    jenisPrestasi: 'Kompetisi',
    namaOrganisasi: 'IEEE Computer Society Indonesia',
    avatar: 'A',
  },
  {
    id: 7,
    nama: 'Sarah Dewi Maharani',
    namaPrestasi: 'Ketua Organisasi Mahasiswa Fakultas Teknik',
    jenisPrestasi: 'Organisasi',
    namaOrganisasi: 'Himpunan Mahasiswa Informatika',
    avatar: 'S',
  },
  {
    id: 8,
    nama: 'Budi Santoso Wijaya',
    namaPrestasi: 'Koordinator Panitia Acara Nasional Dies Natalis',
    jenisPrestasi: 'Kepanitiaan',
    namaOrganisasi: 'Panitia Dies Natalis Universitas',
    avatar: 'B',
  },
];

export const JENIS_PRESTASI = {
  KOMPETISI: 'kompetisi',
  ORGANISASI: 'organisasi',
  KEPANITIAAN: 'kepanitiaan',
} as const;

export const JENIS_PRESTASI_LABELS = {
  [JENIS_PRESTASI.KOMPETISI]: 'Kompetisi',
  [JENIS_PRESTASI.ORGANISASI]: 'Organisasi',
  [JENIS_PRESTASI.KEPANITIAAN]: 'Kepanitiaan',
} as const;
