import { createFileRoute } from '@tanstack/react-router';
import SearchIcon from '~/assets/icons/history-prestasi/search-icon.svg';
import { DropdownCategory } from './-componets/DropdownCategory';
import { useCallback, useEffect, useRef, useState } from 'react';
import CardHistory from './-componets/CardHistory';
import { Prestasi } from '~/api/generated';
import SkeletonCardHistory from './-componets/SkeletonCardHistory';

const LIMIT = 12;

export const Route = createFileRoute(
  '/_app/_left-navbar/home/history-prestasi/',
)({
  component: HistoryPrestasi,
});

const prestasiOptions = ['Semua', 'Organisasi', 'Kepanitian', 'Perlombaan'];

function HistoryPrestasi() {
  const [search, setSearch] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [resultsCount, setResultsCount] = useState<number>(0);
  const [achievements, setAchievements] = useState<Prestasi[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observerRef = useRef<HTMLDivElement | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearch(e.target.value);
    setPage(1);
    setAchievements([]);
    setHasMore(true);
  };

  const handleCategorySelect = (value: string) => {
    setCategory(value);
    setPage(1);
    setAchievements([]);
    setHasMore(true);
  };

  // Fetch achievements
  const fetchAchievements = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    const params = new URLSearchParams({
      page: page.toString(),
      limit: LIMIT.toString(),
    });

    if (category !== 'Semua') {
      params.append('category', category);
    }
    if (search) {
      params.append('search', search);
    }

    try {
      const response = await fetch(`/api/achievements?${params}`);
      const data = await response.json();
      console.log(data);

      setAchievements((prev) =>
        page === 1 ? data.achievements : [...prev, ...data.achievements],
      );
      setResultsCount(data.total);
      setHasMore(data.achievements.length === LIMIT);
    } catch (error) {
      console.error('Failed to fetch achievements:', error);
    } finally {
      setIsLoading(false);
    }
  }, [page, category, search, hasMore, isLoading]);

  useEffect(() => {
    fetchAchievements();
  }, [fetchAchievements]);

  // Infinite scroll
  useEffect(() => {
    if (isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 },
    );

    const current = observerRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [hasMore, isLoading]);

  return (
    <div className="flex flex-col gap-4 bg-[#2F754A] bg-[url('/img/history-prestasi/vector-history-prestasi.svg')] bg-cover bg-center p-4 lg:px-14">
      <div className="mt-4 text-center text-[36px] font-[700] text-white">
        History <span className="font-normal italic">Prestasi</span>
      </div>
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="relative lg:w-2/3">
          <input
            className="w-full rounded-lg p-2 pr-10"
            type="text"
            onChange={handleSearchChange}
            value={search}
            placeholder="Cari nama atau prestasi"
          />
          <img
            src={SearchIcon}
            alt="search"
            className="absolute right-3 top-1/2 size-5 -translate-y-1/2"
          />
        </div>
        <DropdownCategory
          placeholder="Category"
          options={prestasiOptions}
          onSelect={handleCategorySelect}
          className="lg:w-1/3"
        />
      </div>
      <div className="text-center text-sm font-light text-white lg:text-base lg:font-normal">
        Menampilkan {resultsCount} hasil
      </div>
      <div className="mb-40 grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {achievements.map((prestasi) => (
          <CardHistory
            key={prestasi.id}
            data={prestasi}
            className="w-full lg:flex-col"
          />
        ))}

        {/* Loading skeletons */}
        {isLoading &&
          Array.from({ length: 12 }).map((_, i) => (
            <SkeletonCardHistory
              key={`skeleton-${i}`}
              className="w-full animate-pulse lg:flex-col"
            />
          ))}
      </div>

      {/* Observer target */}
      <div ref={observerRef} className="h-10 w-full"></div>
    </div>
  );
}

export const dummyPrestasi: Prestasi[] = [
  {
    id: '1',
    userId: 'u1',
    jenisPrestasi: 'organisasi',
    penyelenggara: 'Himpunan Mahasiswa Informatika',
    deskripsi: 'Menjadi ketua himpunan selama satu periode.',
    bulan: 3,
    tahun: 2023,
    competitionType: null,
    createdAt: '2023-03-15T10:00:00Z',
    user: { id: 'u1', nim: '13521001', fullName: 'Han Pratama', picture: null },
  },
  {
    id: '2',
    userId: 'u2',
    jenisPrestasi: 'kepanitiaan',
    penyelenggara: 'BEM Fakultas Teknik',
    deskripsi: 'Koordinator acara pada Festival Teknologi 2023.',
    bulan: 5,
    tahun: 2023,
    competitionType: null,
    createdAt: '2023-05-20T11:00:00Z',
    user: { id: 'u2', nim: '13521002', fullName: 'Rafi Ahmad', picture: null },
  },
  {
    id: '3',
    userId: 'u3',
    jenisPrestasi: 'kompetisi',
    penyelenggara: 'Compfest UI',
    deskripsi: 'Juara 1 Competitive Programming nasional.',
    bulan: 8,
    tahun: 2024,
    competitionType: 'CP',
    createdAt: '2024-08-10T09:00:00Z',
    user: {
      id: 'u3',
      nim: '13521003',
      fullName: 'Dewi Lestari',
      picture: null,
    },
  },
  {
    id: '4',
    userId: 'u4',
    jenisPrestasi: 'kompetisi',
    penyelenggara: 'Hackathon Bangkit 2024',
    deskripsi: 'Finalis dalam hackathon tingkat nasional.',
    bulan: 4,
    tahun: 2024,
    competitionType: 'Hackathon',
    createdAt: '2024-04-12T12:00:00Z',
    user: {
      id: 'u4',
      nim: '13521004',
      fullName: 'Andika Putra',
      picture: null,
    },
  },
  {
    id: '5',
    userId: 'u5',
    jenisPrestasi: 'organisasi',
    penyelenggara: 'UKM Musik Kampus',
    deskripsi: 'Anggota aktif UKM Musik selama 2 tahun.',
    bulan: 9,
    tahun: 2022,
    competitionType: null,
    createdAt: '2022-09-01T08:00:00Z',
    user: {
      id: 'u5',
      nim: '13521005',
      fullName: 'Siti Nurhaliza',
      picture: null,
    },
  },
  {
    id: '6',
    userId: 'u6',
    jenisPrestasi: 'kompetisi',
    penyelenggara: 'Binus Data Science Competition',
    deskripsi: 'Juara 2 bidang Data Science.',
    bulan: 10,
    tahun: 2023,
    competitionType: 'DS',
    createdAt: '2023-10-14T14:00:00Z',
    user: {
      id: 'u6',
      nim: '13521006',
      fullName: 'Bayu Nugraha',
      picture: null,
    },
  },
  {
    id: '7',
    userId: 'u7',
    jenisPrestasi: 'kompetisi',
    penyelenggara: 'Cyber Security Challenge Indonesia',
    deskripsi: 'Finalis kategori CTF.',
    bulan: 7,
    tahun: 2024,
    competitionType: 'CTF',
    createdAt: '2024-07-18T10:30:00Z',
    user: {
      id: 'u7',
      nim: '13521007',
      fullName: 'Mega Kartika',
      picture: null,
    },
  },
  {
    id: '8',
    userId: 'u8',
    jenisPrestasi: 'kepanitiaan',
    penyelenggara: 'Dies Natalis Kampus 2023',
    deskripsi: 'Menjadi sekretaris panitia utama.',
    bulan: 11,
    tahun: 2023,
    competitionType: null,
    createdAt: '2023-11-20T15:00:00Z',
    user: {
      id: 'u8',
      nim: '13521008',
      fullName: 'Budi Hartono',
      picture: null,
    },
  },
  {
    id: '9',
    userId: 'u9',
    jenisPrestasi: 'organisasi',
    penyelenggara: 'Komunitas Open Source Kampus',
    deskripsi: 'Menjadi kontributor aktif proyek internal.',
    bulan: 2,
    tahun: 2024,
    competitionType: null,
    createdAt: '2024-02-02T09:00:00Z',
    user: { id: 'u9', nim: '13521009', fullName: 'Eka Yuliani', picture: null },
  },
  {
    id: '10',
    userId: 'u10',
    jenisPrestasi: 'kompetisi',
    penyelenggara: 'AI Challenge Indonesia',
    deskripsi: 'Mendapat penghargaan Best Innovation.',
    bulan: 6,
    tahun: 2023,
    competitionType: 'AI',
    createdAt: '2023-06-10T11:00:00Z',
    user: {
      id: 'u10',
      nim: '13521010',
      fullName: 'Rizky Aditya',
      picture: null,
    },
  },
  {
    id: '11',
    userId: 'u11',
    jenisPrestasi: 'kepanitiaan',
    penyelenggara: 'Pekan Ilmiah Mahasiswa',
    deskripsi: 'Menjadi humas dalam kegiatan ilmiah nasional.',
    bulan: 4,
    tahun: 2022,
    competitionType: null,
    createdAt: '2022-04-18T13:00:00Z',
    user: {
      id: 'u11',
      nim: '13521011',
      fullName: 'Intan Prameswari',
      picture: null,
    },
  },
  {
    id: '12',
    userId: 'u12',
    jenisPrestasi: 'kompetisi',
    penyelenggara: 'Bangkit BCC 2024',
    deskripsi: 'Top 5 Business Case Competition nasional.',
    bulan: 3,
    tahun: 2024,
    competitionType: 'BCC',
    createdAt: '2024-03-25T09:00:00Z',
    user: {
      id: 'u12',
      nim: '13521012',
      fullName: 'Adi Nugroho',
      picture: null,
    },
  },
  {
    id: '13',
    userId: 'u13',
    jenisPrestasi: 'organisasi',
    penyelenggara: 'Lembaga Dakwah Kampus',
    deskripsi: 'Bendahara kegiatan sosial kampus.',
    bulan: 5,
    tahun: 2023,
    competitionType: null,
    createdAt: '2023-05-08T08:00:00Z',
    user: {
      id: 'u13',
      nim: '13521013',
      fullName: 'Farhan Ramadhan',
      picture: null,
    },
  },
  {
    id: '14',
    userId: 'u14',
    jenisPrestasi: 'kepanitiaan',
    penyelenggara: 'Career Fair 2024',
    deskripsi: 'Menjadi penanggung jawab divisi publikasi.',
    bulan: 1,
    tahun: 2024,
    competitionType: null,
    createdAt: '2024-01-14T10:00:00Z',
    user: { id: 'u14', nim: '13521014', fullName: 'Nur Aisyah', picture: null },
  },
  {
    id: '15',
    userId: 'u15',
    jenisPrestasi: 'kompetisi',
    penyelenggara: 'GDSC Hackathon',
    deskripsi: 'Finalis Hackathon kampus tingkat nasional.',
    bulan: 10,
    tahun: 2024,
    competitionType: 'Hackathon',
    createdAt: '2024-10-03T09:30:00Z',
    user: {
      id: 'u15',
      nim: '13521015',
      fullName: 'Iqbal Maulana',
      picture: null,
    },
  },
  {
    id: '16',
    userId: 'u16',
    jenisPrestasi: 'organisasi',
    penyelenggara: 'Badan Eksekutif Mahasiswa',
    deskripsi: 'Anggota Divisi Sosial dan Pengabdian Masyarakat.',
    bulan: 2,
    tahun: 2022,
    competitionType: null,
    createdAt: '2022-02-10T10:00:00Z',
    user: { id: 'u16', nim: '13521016', fullName: 'Rahmawati', picture: null },
  },
  {
    id: '17',
    userId: 'u17',
    jenisPrestasi: 'kompetisi',
    penyelenggara: 'ICPC Asia Regional',
    deskripsi: 'Juara 3 tim pemrograman.',
    bulan: 12,
    tahun: 2023,
    competitionType: 'CP',
    createdAt: '2023-12-20T14:00:00Z',
    user: {
      id: 'u17',
      nim: '13521017',
      fullName: 'Satria Alamsyah',
      picture: null,
    },
  },
  {
    id: '18',
    userId: 'u18',
    jenisPrestasi: 'kepanitiaan',
    penyelenggara: 'Tech Expo 2024',
    deskripsi: 'Mengelola sponsor acara teknologi terbesar kampus.',
    bulan: 8,
    tahun: 2024,
    competitionType: null,
    createdAt: '2024-08-05T09:00:00Z',
    user: {
      id: 'u18',
      nim: '13521018',
      fullName: 'Lina Puspita',
      picture: null,
    },
  },
  {
    id: '19',
    userId: 'u19',
    jenisPrestasi: 'kompetisi',
    penyelenggara: 'National AI Challenge',
    deskripsi: 'Juara Harapan AI Model Development.',
    bulan: 11,
    tahun: 2024,
    competitionType: 'AI',
    createdAt: '2024-11-12T12:00:00Z',
    user: {
      id: 'u19',
      nim: '13521019',
      fullName: 'Rendi Kusuma',
      picture: null,
    },
  },
  {
    id: '20',
    userId: 'u20',
    jenisPrestasi: 'organisasi',
    penyelenggara: 'UKM Pecinta Alam',
    deskripsi: 'Mengorganisir kegiatan pendakian tahunan.',
    bulan: 7,
    tahun: 2023,
    competitionType: null,
    createdAt: '2023-07-22T08:00:00Z',
    user: {
      id: 'u20',
      nim: '13521020',
      fullName: 'Tari Anindya',
      picture: null,
    },
  },
  {
    id: '21',
    userId: 'u21',
    jenisPrestasi: 'kompetisi',
    penyelenggara: 'CodeFest 2024',
    deskripsi: 'Finalis lomba Competitive Programming regional.',
    bulan: 9,
    tahun: 2024,
    competitionType: 'CP',
    createdAt: '2024-09-10T08:00:00Z',
    user: {
      id: 'u21',
      nim: '13521021',
      fullName: 'Galih Prakoso',
      picture: null,
    },
  },
  {
    id: '22',
    userId: 'u22',
    jenisPrestasi: 'kepanitiaan',
    penyelenggara: 'Seminar Nasional AI',
    deskripsi: 'Koordinator publikasi dan media sosial.',
    bulan: 3,
    tahun: 2023,
    competitionType: null,
    createdAt: '2023-03-14T09:00:00Z',
    user: {
      id: 'u22',
      nim: '13521022',
      fullName: 'Yuliana Maharani',
      picture: null,
    },
  },
  {
    id: '23',
    userId: 'u23',
    jenisPrestasi: 'organisasi',
    penyelenggara: 'Koperasi Mahasiswa',
    deskripsi: 'Sekretaris selama periode 2023-2024.',
    bulan: 1,
    tahun: 2024,
    competitionType: null,
    createdAt: '2024-01-03T10:00:00Z',
    user: {
      id: 'u23',
      nim: '13521023',
      fullName: 'Taufik Hidayat',
      picture: null,
    },
  },
  {
    id: '24',
    userId: 'u24',
    jenisPrestasi: 'kompetisi',
    penyelenggara: 'CyberFest CTF 2024',
    deskripsi: 'Memenangkan lomba Capture The Flag tingkat nasional.',
    bulan: 4,
    tahun: 2024,
    competitionType: 'CTF',
    createdAt: '2024-04-09T11:00:00Z',
    user: {
      id: 'u24',
      nim: '13521024',
      fullName: 'Dina Rosalia',
      picture: null,
    },
  },
  {
    id: '25',
    userId: 'u25',
    jenisPrestasi: 'kompetisi',
    penyelenggara: 'BizTech Case Competition',
    deskripsi: 'Juara 2 bidang Business Case.',
    bulan: 5,
    tahun: 2023,
    competitionType: 'BCC',
    createdAt: '2023-05-25T09:00:00Z',
    user: {
      id: 'u25',
      nim: '13521025',
      fullName: 'Aditya Nanda',
      picture: null,
    },
  },
  {
    id: '26',
    userId: 'u26',
    jenisPrestasi: 'organisasi',
    penyelenggara: 'Forum Diskusi Mahasiswa',
    deskripsi: 'Moderator rutin diskusi publik kampus.',
    bulan: 10,
    tahun: 2022,
    competitionType: null,
    createdAt: '2022-10-10T08:00:00Z',
    user: {
      id: 'u26',
      nim: '13521026',
      fullName: 'Citra Amelia',
      picture: null,
    },
  },
  {
    id: '27',
    userId: 'u27',
    jenisPrestasi: 'kompetisi',
    penyelenggara: 'TechnoHack 2023',
    deskripsi: 'Top 10 Hackathon dengan ide aplikasi sosial.',
    bulan: 6,
    tahun: 2023,
    competitionType: 'Hackathon',
    createdAt: '2023-06-22T09:00:00Z',
    user: {
      id: 'u27',
      nim: '13521027',
      fullName: 'Rifky Santoso',
      picture: null,
    },
  },
  {
    id: '28',
    userId: 'u28',
    jenisPrestasi: 'kepanitiaan',
    penyelenggara: 'Expo Kampus 2022',
    deskripsi: 'Divisi dokumentasi dan publikasi.',
    bulan: 9,
    tahun: 2022,
    competitionType: null,
    createdAt: '2022-09-18T10:00:00Z',
    user: {
      id: 'u28',
      nim: '13521028',
      fullName: 'Dewangga Saputra',
      picture: null,
    },
  },
  {
    id: '29',
    userId: 'u29',
    jenisPrestasi: 'organisasi',
    penyelenggara: 'Lembaga Pers Mahasiswa',
    deskripsi: 'Reporter aktif selama dua tahun.',
    bulan: 12,
    tahun: 2023,
    competitionType: null,
    createdAt: '2023-12-10T08:00:00Z',
    user: {
      id: 'u29',
      nim: '13521029',
      fullName: 'Nabila Rahma',
      picture: null,
    },
  },
  {
    id: '30',
    userId: 'u30',
    jenisPrestasi: 'kompetisi',
    penyelenggara: 'Data Science Cup 2024',
    deskripsi: 'Juara 1 lomba analisis data tingkat nasional.',
    bulan: 8,
    tahun: 2024,
    competitionType: 'DS',
    createdAt: '2024-08-27T11:00:00Z',
    user: {
      id: 'u30',
      nim: '13521030',
      fullName: 'Bagas Wirawan',
      picture: null,
    },
  },
];

export default HistoryPrestasi;
