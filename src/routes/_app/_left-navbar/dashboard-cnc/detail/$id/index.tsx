import { createFileRoute } from '@tanstack/react-router';
import { ChevronLeft, ArrowLeft, ArrowRight } from 'lucide-react';
import { IdentityCard } from '../../../-dashboard-component/IdentityCard';
import { ImageCarousel } from '../../../-dashboard-component/ImageCarousel';
import { CertificateButton } from '../../../-dashboard-component/CertificateButton';
export const Route = createFileRoute(
  '/_app/_left-navbar/dashboard-cnc/detail/$id/',
)({
  component: DetailPrestasi,
});

function DetailPrestasi() {
  const prestasiData = {
    jenis: 'Jenis Kompetisi',
    nama: 'Nama Prestasi #1',
    identitas: {
      nama: 'Noumisyfa Nabila Nareswari',
      avatar: 'NN',
      jurusan: 'Teknik Informatika',
      tahun: "'23",
      kampus: 'Ganesha',
    },
    title: 'Title Prestasi Lengkap',
    organisasi: 'Organisasi penyelenggara',
    periode: 'Sept 2025',
    deskripsi:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc volutpat id mi ac vulputate. Nulla posuere a leo id sagittis. Suspendisse nibh est, tristique id nunc sit amet, venenatis molestie velit.',
    images: [
      '/img/prestasi/1.jpg',
      '/img/prestasi/2.jpg',
      '/img/prestasi/3.jpg',
    ],
    sertifikatUrl: '#',
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] font-inter">
      {/* Header with background */}
      <div className="relative overflow-hidden bg-[#2F754A]">
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

        <div className="relative z-40 px-4 py-8 lg:py-12">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center space-x-3 lg:space-x-4">
              <button className="text-white transition-colors hover:text-gray-200">
                <ChevronLeft className="hidden lg:block" size={54} />
                <ChevronLeft size={24} className="block lg:hidden" />
              </button>
              <h1 className="text-2xl font-bold text-white lg:text-5xl">
                Entri <span className="font-light italic">Prestasi</span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="min-h-screen w-full bg-[#FFFFFF] px-4 py-6 lg:px-0 lg:py-0">
        <div className="mx-auto max-w-7xl lg:-mt-8">
          <div className="rounded-2xl bg-white p-6 shadow-sm lg:p-10">
            {/* Header */}
            <div className="mb-6 lg:mb-8">
              <p className="mb-2 font-inter text-base font-semibold text-gray-600 lg:text-2xl">
                [{prestasiData.jenis}]
              </p>
              <h2 className="font-inter text-xl font-bold text-black lg:text-2xl">
                {prestasiData.nama}
              </h2>
            </div>

            {/* Layout: Desktop side by side, Mobile stacked */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Identity Card */}
                <IdentityCard data={prestasiData.identitas} />

                {/* Description Section - Mobile only */}
                <div className="lg:hidden">
                  <h3 className="mb-2 font-inter text-lg font-bold text-black">
                    {prestasiData.title}
                  </h3>
                  <p className="mb-3 font-inter text-sm text-[#7B7A73]">
                    {prestasiData.organisasi} | {prestasiData.periode}
                  </p>
                  <p className="mb-4 font-inter text-sm leading-relaxed text-black">
                    {prestasiData.deskripsi}
                  </p>
                  <CertificateButton url={prestasiData.sertifikatUrl} />
                </div>

                {/* Image Carousel - Mobile */}
                <div className="lg:hidden">
                  <ImageCarousel images={prestasiData.images} />
                </div>

                {/* Description Section - Desktop only */}
                <div className="hidden lg:block">
                  <h3 className="mb-2 font-inter text-lg font-bold text-black">
                    {prestasiData.title}
                  </h3>
                  <p className="mb-3 font-inter text-sm text-[#7B7A73]">
                    {prestasiData.organisasi} | {prestasiData.periode}
                  </p>
                  <p className="mb-4 font-inter text-sm leading-relaxed text-black">
                    {prestasiData.deskripsi}
                  </p>
                  <CertificateButton url={prestasiData.sertifikatUrl} />
                </div>
              </div>

              {/* Right Column - Desktop only */}
              <div className="hidden lg:block">
                <ImageCarousel images={prestasiData.images} />
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-between border-t pt-6 lg:mt-12">
              <button className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 font-inter text-sm font-medium transition-colors hover:bg-gray-50 lg:px-6 lg:py-3 lg:text-base">
                <ArrowLeft size={18} className="lg:size-5" />
                Entri sebelumnya
              </button>

              <span className="font-inter text-xs text-gray-600 lg:text-sm">
                Entri 17 dari 190
              </span>

              <button className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 font-inter text-sm font-medium transition-colors hover:bg-gray-50 lg:px-6 lg:py-3 lg:text-base">
                Entri selanjutnya
                <ArrowRight size={18} className="lg:size-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
