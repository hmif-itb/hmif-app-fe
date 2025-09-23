import { createFileRoute, redirect } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { Button } from '~/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from '@tanstack/react-router';
import { isInRoles } from '~/lib/roles';
import { loadUserCache } from '~/lib/session';
import { PropertyLoanForm } from './-components/PropertyForm';
import { PropertyData, fetchPropertyById } from '../../api';

export const Route = createFileRoute(
  '/_app/_left-navbar/home/household/_warga/pengajuan-peminjaman/property/$propertyId/',
)({
  component: PropertyDetailPage,
  //   loader: () => {
  //     if (!loadUserCache!()) {
  //       throw redirect({ to: '/home/household' });
  //     }
  //     if (loadUserCache()) {
  //       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //       // @ts-expect-error
  //       if (!isInRoles(loadUserCache(), ['household'])) {
  //         throw redirect({ to: '/home/household' });
  //       }
  //     }
  //   },
});

function PropertyDetailPage() {
  const router = useRouter();
  const { propertyId } = Route.useParams();
  const [isMobile, setIsMobile] = useState(false);
  const [propertyData, setPropertyData] = useState<PropertyData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Fetch property data
  useEffect(() => {
    const loadPropertyData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const property = await fetchPropertyById(propertyId);
        if (property) {
          setPropertyData(property);
        } else {
          setError('Properti tidak ditemukan');
        }
      } catch (error) {
        console.error('Error fetching property:', error);
        setError('Gagal memuat data properti');
      } finally {
        setIsLoading(false);
      }
    };

    if (propertyId) {
      loadPropertyData();
    }
  }, [propertyId]);

  const mobileStyles = {
    backgroundImage: `url('/img/household/mask-mobile.svg')`,
    backgroundPosition: 'left top',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% auto',
  };

  const desktopStyles = {
    backgroundImage: `url('/img/household/mask-left-top.png'), url('/img/household/mask-right-bottom.png')`,
    backgroundPosition: 'left top, right bottom',
    backgroundRepeat: 'no-repeat, no-repeat',
    backgroundSize: 'auto 1000px, auto 730px',
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex w-full flex-col gap-3 rounded-lg bg-white px-[30px] py-[34px] lg:gap-7">
          <div className="flex items-center gap-3">
            <div className="size-10 animate-pulse rounded-lg bg-gray-200" />
            <div className="h-6 w-48 animate-pulse rounded bg-gray-200" />
          </div>
          <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
          <div className="space-y-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:gap-[60px]">
              <div className="h-16 w-full animate-pulse rounded bg-gray-200 lg:max-w-[242px]" />
              <div className="h-16 w-full animate-pulse rounded bg-gray-200 lg:max-w-[242px]" />
            </div>
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-3 lg:gap-[60px]">
              <div className="h-16 w-full animate-pulse rounded bg-gray-200" />
              <div className="h-16 w-full animate-pulse rounded bg-gray-200" />
              <div className="h-16 w-full animate-pulse rounded bg-gray-200" />
            </div>
            <div className="h-48 w-full animate-pulse rounded bg-gray-200" />
            <div className="h-12 w-full animate-pulse rounded bg-gray-200" />
          </div>
        </div>
      );
    }

    if (error || !propertyData) {
      return (
        <div className="flex w-full flex-col items-center justify-center gap-4 rounded-lg bg-white px-[30px] py-[34px]">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-red-600">{error}</h2>
            <p className="mt-2 text-gray-600">
              Properti yang Anda cari tidak tersedia atau telah dihapus.
            </p>
          </div>
          <Button
            onClick={() => router.history.back()}
            className="bg-[#E8C55F] text-[#333333] hover:opacity-85"
          >
            Kembali
          </Button>
        </div>
      );
    }

    return <PropertyLoanForm propertyData={propertyData} />;
  };

  return (
    <div className="flex h-full flex-col lg:px-10 lg:pb-[60px]">
      {/* Back Button */}
      <Button
        variant="link"
        className="my-6 hidden w-full justify-start gap-8 p-0 text-3xl font-medium lg:flex"
        onClick={() => {
          router.history.back();
        }}
      >
        <ChevronLeft className="size-8" />
        <span>Back</span>
      </Button>
      <main
        className="flex size-full flex-col gap-3 overflow-y-scroll bg-[#30764B] p-[34px] lg:gap-6 lg:rounded-xl lg:px-[26px]"
        style={isMobile ? mobileStyles : desktopStyles}
      >
        <h1 className="flex items-center gap-6 text-[32px] font-bold text-white lg:text-5xl">
          <ChevronLeft
            className="size-16 lg:hidden"
            onClick={() => {
              router.history.back();
            }}
          />
          Pengajuan Peminjaman
        </h1>
        {renderContent()}
      </main>
    </div>
  );
}
