import { createFileRoute } from '@tanstack/react-router';
import SearchIcon from '~/assets/icons/history-prestasi/search-icon.svg';
import { DropdownCategory } from './-componets/DropdownCategory';
import { useState } from 'react';
import CardHistory, { Achievement } from './-componets/CardHistory';

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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const handleCategorySelect = (value: string) => {
    setCategory(value);
  };

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
        {dummyAchievements.map((achievement) => (
          <CardHistory
            key={achievement.id}
            data={achievement}
            className="w-full lg:flex-col"
          />
        ))}
      </div>
    </div>
  );
}

const dummyAchievements: Achievement[] = [
  {
    id: '1',
    user_id: 101,
    jenis_prestasi: 'Perlombaan',
    nama_prestasi: 'Juara 1 Lomba Desain UI/UX Nasional',
    penyelenggara: 'Universitas Indonesia',
    periode_prestasi: 'Maret 2024',
    url_sertifikat: 'https://example.com/certificates/uiux-1.pdf',
    url_foto_diri: 'https://example.com/photos/user101.jpg',
    url_foto_awarding: 'https://example.com/photos/award-uiux.jpg',
    created_at: '2024-03-15T10:23:00Z',
    updated_at: '2024-03-15T10:23:00Z',
  },
  {
    id: '2',
    user_id: 102,
    jenis_prestasi: 'Organisasi',
    nama_prestasi: 'Ketua BEM Fakultas Teknik',
    penyelenggara: 'Fakultas Teknik Universitas Gadjah Mada',
    periode_prestasi: '2023/2024',
    url_sertifikat: 'https://example.com/certificates/bem-leader.pdf',
    url_foto_diri: 'https://example.com/photos/user102.jpg',
    url_foto_awarding: 'https://example.com/photos/award-bem.jpg',
    created_at: '2023-09-10T14:00:00Z',
    updated_at: '2023-09-10T14:00:00Z',
  },
  {
    id: '3',
    user_id: 103,
    jenis_prestasi: 'Kepanitiaan',
    nama_prestasi: 'Koordinator Acara TEDx Campus 2024',
    penyelenggara: 'TEDx Universitas Airlangga',
    periode_prestasi: 'Februari 2024',
    url_sertifikat: 'https://example.com/certificates/tedx-staff.pdf',
    url_foto_diri: 'https://example.com/photos/user103.jpg',
    url_foto_awarding: 'https://example.com/photos/award-tedx.jpg',
    created_at: '2024-02-05T09:12:00Z',
    updated_at: '2024-02-05T09:12:00Z',
  },
  {
    id: '4',
    user_id: 104,
    jenis_prestasi: 'Perlombaan',
    nama_prestasi: 'Finalis Kompetisi Data Science Indonesia',
    penyelenggara: 'Kaggle Indonesia Community',
    periode_prestasi: 'Juli 2024',
    url_sertifikat: 'https://example.com/certificates/datasci-final.pdf',
    url_foto_diri: 'https://example.com/photos/user104.jpg',
    url_foto_awarding: 'https://example.com/photos/award-datasci.jpg',
    created_at: '2024-07-25T12:30:00Z',
    updated_at: '2024-07-25T12:30:00Z',
  },
  {
    id: '5',
    user_id: 105,
    jenis_prestasi: 'Organisasi',
    nama_prestasi: 'Sekretaris Himpunan Mahasiswa Informatika',
    penyelenggara: 'HIMAFORKA',
    periode_prestasi: '2023/2024',
    url_sertifikat: 'https://example.com/certificates/himaforka-secretary.pdf',
    url_foto_diri: 'https://example.com/photos/user105.jpg',
    url_foto_awarding: 'https://example.com/photos/award-himaforka.jpg',
    created_at: '2023-12-01T08:45:00Z',
    updated_at: '2023-12-01T08:45:00Z',
  },
  {
    id: '6',
    user_id: 106,
    jenis_prestasi: 'Kepanitiaan',
    nama_prestasi: 'Panitia Sponsorship Gadjah Mada Fair',
    penyelenggara: 'Universitas Gadjah Mada',
    periode_prestasi: 'Oktober 2024',
    url_sertifikat: 'https://example.com/certificates/gmf-sponsor.pdf',
    url_foto_diri: 'https://example.com/photos/user106.jpg',
    url_foto_awarding: 'https://example.com/photos/award-gmf.jpg',
    created_at: '2024-10-10T11:20:00Z',
    updated_at: '2024-10-10T11:20:00Z',
  },
  {
    id: '7',
    user_id: 107,
    jenis_prestasi: 'Perlombaan',
    nama_prestasi: 'Juara 2 Hackathon Kampus Merdeka',
    penyelenggara: 'Kemendikbudristek',
    periode_prestasi: 'Agustus 2024',
    url_sertifikat: 'https://example.com/certificates/hackathon-2.pdf',
    url_foto_diri: 'https://example.com/photos/user107.jpg',
    url_foto_awarding: 'https://example.com/photos/award-hackathon.jpg',
    created_at: '2024-08-18T17:00:00Z',
    updated_at: '2024-08-18T17:00:00Z',
  },
  {
    id: '8',
    user_id: 108,
    jenis_prestasi: 'Organisasi',
    nama_prestasi: 'Bendahara UKM Musik Kampus',
    penyelenggara: 'Universitas Brawijaya',
    periode_prestasi: '2022/2023',
    url_sertifikat: 'https://example.com/certificates/ukm-music.pdf',
    url_foto_diri: 'https://example.com/photos/user108.jpg',
    url_foto_awarding: 'https://example.com/photos/award-ukm.jpg',
    created_at: '2023-03-09T15:45:00Z',
    updated_at: '2023-03-09T15:45:00Z',
  },
];

export default HistoryPrestasi;
