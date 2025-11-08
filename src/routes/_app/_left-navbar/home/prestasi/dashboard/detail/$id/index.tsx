import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, ArrowLeft, ArrowRight } from 'lucide-react';
import { IdentityCard } from '../../../../../-dashboard-component/IdentityCard';
import { ImageCarousel } from '../../../../../-dashboard-component/ImageCarousel';
import { CertificateButton } from '../../../../../-dashboard-component/CertificateButton';
import { api } from '~/api/client';

export const Route = createFileRoute(
  '/_app/_left-navbar/home/prestasi/dashboard/detail/$id/',
)({
  component: DetailPrestasi,
});

function DetailPrestasi() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  // Fetch prestasi detail
  const { data: prestasi, isLoading } = useQuery({
    queryKey: ['prestasi-detail', id],
    queryFn: () => api.achievements.getPrestasiById({ idPrestasi: id }),
  });

  // Fetch all prestasi for navigation
  const { data: allPrestasi } = useQuery({
    queryKey: ['all-prestasi'],
    queryFn: () => api.achievements.getListPrestasi({ page: 1, limit: 1000 }),
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#2F754A]">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!prestasi) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#2F754A]">
        <div className="text-white">Prestasi tidak ditemukan</div>
      </div>
    );
  }

  // Map jenisPrestasi to readable format
  const jenisMap = {
    kompetisi: 'Kompetisi',
    organisasi: 'Organisasi',
    kepanitiaan: 'Kepanitiaan',
  };

  // Format bulan tahun
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'Mei',
    'Jun',
    'Jul',
    'Agu',
    'Sep',
    'Okt',
    'Nov',
    'Des',
  ];
  const periode = `${monthNames[prestasi.bulan - 1]} ${prestasi.tahun}`;

  // Prepare identity data
  const identitas = prestasi.user
    ? {
        nama: prestasi.user.fullName,
        avatar: prestasi.user.fullName
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2),
        jurusan:
          prestasi.user.major === 'IF'
            ? 'Teknik Informatika'
            : 'Sistem dan Teknologi Informasi',
        tahun: `'${prestasi.user.angkatan.toString().slice(-2)}`,
        kampus: prestasi.user.region,
      }
    : {
        nama: 'Unknown',
        avatar: '??',
        jurusan: 'Unknown',
        tahun: '??',
        kampus: 'Unknown',
      };

  // Prepare images array
  const images = [
    prestasi.mediaSertifikat,
    prestasi.mediaFotoAwarding,
    prestasi.mediaFotoPribadi,
  ].filter(Boolean) as string[];

  // Navigation logic
  const currentIndex =
    allPrestasi?.prestasi.findIndex((p) => p.id === id) ?? -1;
  const total = allPrestasi?.total ?? 0;
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < (allPrestasi?.prestasi.length ?? 0) - 1;

  const goToPrevious = () => {
    if (hasPrevious && allPrestasi) {
      const prevId = allPrestasi.prestasi[currentIndex - 1].id;
      navigate({
        to: '/home/prestasi/dashboard/detail/$id',
        params: { id: prevId },
      });
    }
  };

  const goToNext = () => {
    if (hasNext && allPrestasi) {
      const nextId = allPrestasi.prestasi[currentIndex + 1].id;
      navigate({
        to: '/home/prestasi/dashboard/detail/$id',
        params: { id: nextId },
      });
    }
  };

  const goBack = () => {
    navigate({ to: '/home/prestasi/dashboard' });
  };

  return (
    <div className="relative min-h-screen bg-[#2F754A] font-inter lg:overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0">
        <img
          src="/img/admin/yellow-gradient-top-right-desktop.png"
          alt=""
          className="absolute right-0 top-0 z-30 hidden lg:block"
        />
        <img
          src="/img/admin/yellow-gradient-top-right-mobile.png"
          alt=""
          className="absolute right-0 top-0 z-30 lg:hidden"
        />

        <img
          src="/img/admin/green-peer-top-left-desktop.png"
          alt=""
          className="absolute left-0 top-0 z-20 hidden lg:block"
        />
        <img
          src="/img/admin/green-peer-top-left-mobile.png"
          alt=""
          className="absolute left-0 top-0 z-20 lg:hidden"
        />

        <img
          src="/img/admin/green-peer-top-right-desktop.png"
          alt=""
          className="absolute right-0 top-0 z-10 hidden lg:block"
        />
        <img
          src="/img/admin/green-peer-top-right-mobile.png"
          alt=""
          className="absolute right-0 top-0 z-10 mt-12 lg:hidden"
        />
      </div>

      {/* Content */}
      <div className="relative z-40 lg:p-4">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4 p-2 lg:relative lg:-left-4">
          <button
            onClick={goBack}
            className="text-white transition-all duration-300 hover:-translate-x-1"
          >
            <ChevronLeft className="hidden lg:block" size={54} />
            <ChevronLeft size={24} className="block lg:hidden" />
          </button>
          <h1 className="p-4 text-2xl text-white lg:text-5xl">
            <span className="font-bold">Entri</span>{' '}
            <span className="italic">Prestasi</span>
          </h1>
        </div>

        {/* Card Container */}
        <div className="mx-auto">
          <div className="size-full overflow-hidden rounded-2xl bg-white shadow-lg">
            <div className="overflow-y-auto p-6 lg:p-10">
              {/* Header */}
              <div className="mb-6 lg:mb-8">
                {/* Mobile: Vertical */}
                <div className="lg:hidden">
                  <p className="mb-1 font-inter text-sm font-semibold text-gray-600">
                    [{jenisMap[prestasi.jenisPrestasi]}]
                  </p>
                  <h2 className="font-inter text-lg font-bold text-black">
                    {prestasi.penyelenggara}
                  </h2>
                </div>

                {/* Desktop: Horizontal */}
                <h2 className="hidden font-inter text-2xl font-bold text-black lg:block">
                  <span className="font-inter font-semibold text-gray-600">
                    [{jenisMap[prestasi.jenisPrestasi]}]
                  </span>{' '}
                  {prestasi.penyelenggara}
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Identity Card */}
                  <IdentityCard data={identitas} />

                  {/* Image Carousel - Mobile */}
                  {images.length > 0 && (
                    <div className="lg:hidden">
                      <ImageCarousel images={images} />
                    </div>
                  )}

                  {/* Description Section - Mobile only */}
                  <div className="lg:hidden">
                    <h3 className="mb-2 font-inter text-lg font-bold text-black">
                      {prestasi.penyelenggara}
                    </h3>
                    <p className="mb-3 font-inter text-sm text-[#7B7A73]">
                      {periode}
                      {prestasi.competitionType &&
                        ` | ${prestasi.competitionType}`}
                    </p>
                    <p className="mb-4 font-inter text-sm leading-relaxed text-black">
                      {prestasi.deskripsi || 'Tidak ada deskripsi'}
                    </p>
                    {prestasi.mediaSertifikat && (
                      <div className="flex justify-end">
                        <CertificateButton url={prestasi.mediaSertifikat} />
                      </div>
                    )}
                  </div>

                  {/* Description Section - Desktop only */}
                  <div className="hidden lg:block">
                    <h3 className="mb-2 font-inter text-lg font-bold text-black">
                      {prestasi.penyelenggara}
                    </h3>
                    <p className="mb-3 font-inter text-sm text-[#7B7A73]">
                      {periode}
                      {prestasi.competitionType &&
                        ` | ${prestasi.competitionType}`}
                    </p>
                    <p className="mb-4 font-inter text-sm leading-relaxed text-black">
                      {prestasi.deskripsi || 'Tidak ada deskripsi'}
                    </p>
                    {prestasi.mediaSertifikat && (
                      <div className="flex justify-end">
                        <CertificateButton url={prestasi.mediaSertifikat} />
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column - Desktop only */}
                {images.length > 0 && (
                  <div className="hidden lg:block">
                    <ImageCarousel images={images} />
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="mt-8 flex items-center justify-between border-t pt-6 lg:mt-12">
                <button
                  onClick={goToPrevious}
                  disabled={!hasPrevious}
                  className="flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-1.5 font-inter text-xs font-medium transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 lg:gap-2 lg:px-6 lg:py-3 lg:text-base"
                >
                  <ArrowLeft size={16} className="lg:size-5" />
                  <span className="hidden sm:inline">Entri sebelumnya</span>
                  <span className="sm:hidden">Sebelumnya</span>
                </button>

                <span className="font-inter text-xs text-gray-600 lg:text-sm">
                  Entri {currentIndex + 1} dari {total}
                </span>

                <button
                  onClick={goToNext}
                  disabled={!hasNext}
                  className="flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-1.5 font-inter text-xs font-medium transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 lg:gap-2 lg:px-6 lg:py-3 lg:text-base"
                >
                  <span className="hidden sm:inline">Entri selanjutnya</span>
                  <span className="sm:hidden">Selanjutnya</span>
                  <ArrowRight size={16} className="lg:size-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
