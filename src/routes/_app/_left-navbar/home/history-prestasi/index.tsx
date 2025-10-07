import { createFileRoute } from '@tanstack/react-router';
import SearchIcon from '~/assets/icons/history-prestasi/search-icon.svg';
import { DropdownCategory } from './-componets/DropdownCategory';
import { useEffect, useRef, useState } from 'react';
import CardHistory from './-componets/CardHistory';
import { Prestasi } from '~/api/generated';
import SkeletonCardHistory from './-componets/SkeletonCardHistory';
import { useQuery } from '@tanstack/react-query';
import { api } from '~/api/client';

const LIMIT = 12;

export const Route = createFileRoute(
  '/_app/_left-navbar/home/history-prestasi/',
)({
  component: HistoryPrestasi,
});

const prestasiOptions = ['Semua', 'Organisasi', 'Kepanitian', 'Kompetisi'];

function HistoryPrestasi() {
  const [search, setSearch] = useState<string>('');
  const [category, setCategory] = useState<
    'competition' | 'organization' | 'committee' | undefined
  >(undefined);
  const [achievements, setAchievements] = useState<Prestasi[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const observerRef = useRef<HTMLDivElement | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearch(e.target.value);
    setPage(1);
    setAchievements([]);
    setHasMore(true);
  };

  const handleCategorySelect = (value: typeof category) => {
    setCategory(value);
    setPage(1);
    setAchievements([]);
    setHasMore(true);
  };

  // Fetch achievements
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['achievements', { page, category, search }],
    queryFn: async () =>
      api.achievements.getListPrestasi({
        category,
        search: search || undefined,
        page,
        limit: LIMIT,
      }),
    staleTime: 30000,
  });

  useEffect(() => {
    if (!data) return;

    setAchievements((prev) => {
      if (page === 1) {
        return data.prestasi || [];
      }
      return [...prev, ...(data.prestasi || [])];
    });

    setHasMore((data?.prestasi?.length || 0) === LIMIT);
  }, [data, page]);

  // Infinite scroll
  useEffect(() => {
    if (isLoading || !hasMore) return;

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

  const resultsCount = data?.total || 0;

  return (
    <div className="flex flex-col gap-4 bg-[#2F754A] bg-[url('/img/history-prestasi/vector-history-prestasi.svg')] bg-cover bg-center p-4 lg:min-h-screen lg:px-14">
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

        {/* Error message */}
        {isError && !isLoading && (
          <div className="col-span-full rounded-lg bg-red-100 p-4 text-center text-red-700">
            {error instanceof Error
              ? error.message
              : 'Gagal memuat data. Silakan coba lagi.'}
          </div>
        )}

        {/* Loading skeletons for infinite scroll */}
        {isLoading &&
          achievements.length > 0 &&
          Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCardHistory
              key={`skeleton-${i}`}
              className="w-full animate-pulse lg:flex-col"
            />
          ))}

        {/* Initial loading state */}
        {isLoading &&
          achievements.length === 0 &&
          Array.from({ length: 12 }).map((_, i) => (
            <SkeletonCardHistory
              key={`skeleton-initial-${i}`}
              className="w-full animate-pulse lg:flex-col"
            />
          ))}
      </div>

      {/* Observer target */}
      <div ref={observerRef} className="h-20 w-full"></div>
    </div>
  );
}

export default HistoryPrestasi;
