import { createFileRoute } from '@tanstack/react-router';
import { ChevronLeft, ArrowLeft, ArrowRight } from 'lucide-react';
import { IdentityCard } from '../../../-dashboard-component/IdentityCard';
import { ImageCarousel } from '../../../-dashboard-component/ImageCarousel';
import { CertificateButton } from '../../../-dashboard-component/CertificateButton';

export const Route = createFileRoute(
  '/_app/_left-navbar/dashboard/detail/$id/',
)({
  component: DetailPrestasi,
});

function DetailPrestasi() {
  // Mock data - nanti bisa diganti dengan data dari API
  const prestasiData = {
    jenis: 'Jenis Kompetisi',
    nama: 'Nama Kompetisi/Organisasi',
    identitas: {
      nama: 'Noumisyfa Nabila Nareswari',
      avatar: 'NN',
      jurusan: 'Teknik Informatika',
      tahun: "'23",
      kampus: 'Ganesha',
    },
    periode: 'Sept 2025',
    deskripsi:
      'Deskripsi Prestas i  Prestasi Prestasi Prestas Prestas Prestas Prestas',
    images: [
      '/img/prestasi/1.jpg',
      '/img/prestasi/2.jpg',
      '/img/prestasi/3.jpg',
    ],
    sertifikatUrl: '#',
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
          <button className="text-white transition-colors hover:text-yellow-200">
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
                    [{prestasiData.jenis}]
                  </p>
                  <h2 className="font-inter text-lg font-bold text-black">
                    {prestasiData.nama}
                  </h2>
                </div>

                {/* Desktop: Horizontal */}
                <h2 className="hidden font-inter text-2xl font-bold text-black lg:block">
                  <span className="font-inter font-semibold text-gray-600">
                    [{prestasiData.jenis}]
                  </span>{' '}
                  {prestasiData.nama}
                </h2>
              </div>

              {/* Layout: Desktop side by side, Mobile stacked */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Identity Card */}
                  <IdentityCard data={prestasiData.identitas} />

                  {/* Image Carousel - Mobile */}
                  <div className="lg:hidden">
                    <ImageCarousel images={prestasiData.images} />
                  </div>

                  {/* Description Section - Mobile only */}
                  <div className="lg:hidden">
                    <h3 className="mb-2 font-inter text-lg font-bold text-black">
                      {prestasiData.nama}
                    </h3>
                    {/* <p className="mb-3 font-inter text-sm text-[#7B7A73]">
                      {prestasiData.organisasi} | {prestasiData.periode}
                    </p> */}
                    <p className="mb-4 font-inter text-sm leading-relaxed text-black">
                      {prestasiData.deskripsi}
                    </p>
                    <div className="flex justify-end">
                      <CertificateButton url={prestasiData.sertifikatUrl} />
                    </div>
                  </div>

                  {/* Description Section - Desktop only */}
                  <div className="hidden lg:block">
                    <h3 className="mb-2 font-inter text-lg font-bold text-black">
                      {prestasiData.nama}
                    </h3>
                    {/* <p className="mb-3 font-inter text-sm text-[#7B7A73]">
                      {prestasiData.organisasi} | {prestasiData.periode}
                    </p> */}
                    <p className="mb-4 font-inter text-sm leading-relaxed text-black">
                      {prestasiData.deskripsi}
                    </p>
                    <div className="flex justify-end">
                      <CertificateButton url={prestasiData.sertifikatUrl} />
                    </div>
                  </div>
                </div>

                {/* Right Column - Desktop only */}
                <div className="hidden lg:block">
                  <ImageCarousel images={prestasiData.images} />
                </div>
              </div>

              {/* Navigation */}
              <div className="mt-8 flex items-center justify-between border-t pt-6 lg:mt-12">
                <button className="flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-1.5 font-inter text-xs font-medium transition-colors hover:bg-gray-50 lg:gap-2 lg:px-6 lg:py-3 lg:text-base">
                  <ArrowLeft size={16} className="lg:size-5" />
                  <span className="hidden sm:inline">Entri sebelumnya</span>
                  <span className="sm:hidden">Sebelumnya</span>
                </button>

                <span className="font-inter text-xs text-gray-600 lg:text-sm">
                  Entri 17 dari 190
                </span>

                <button className="flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-1.5 font-inter text-xs font-medium transition-colors hover:bg-gray-50 lg:gap-2 lg:px-6 lg:py-3 lg:text-base">
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
