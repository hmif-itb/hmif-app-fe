// routes/_app/_left-navbar/home/rekomendasi/$rekomendasiId/route.tsx
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { ChevronLeft } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { PlaceDetail } from './-components/place-detail';
import { VoucherDetail } from './-components/voucher-detail';
import { Header } from './-components/header';
import { ReviewSection } from './-components/review-section';
import useSession from '~/hooks/auth/useSession';

type RecommendationType = {
  id: string;
  title: string;
  creatorId: string;
  description?: string;
  averageRating: number;
  imageUrl: string;
} & (
  | {
      type: 'co-working'; //sementara untuk mock up data
      address: string;
      mapsURL: string;
      region: 'Ganesha' | 'Jatinangor';
    }
  | {
      type: 'voucher'; //sementara untuk mock up data
      link?: string;
      periodeAwal?: Date;
      periodeAkhir?: Date;
    }
);

export const Route = createFileRoute(
  '/_app/_left-navbar/home/rekomendasi/$rekomendasiId/',
)({
  component: RecommendationDetail,
});

function RecommendationDetail() {
  const router = useRouter();
  const user = useSession();
  // const { rekomendasiId, type } = ...

  const mockReviews = [
    {
      userName: 'Jeremy Deandito',
      userEmail: '18222xxx@std.stei.itb.ac.id',
      rating: 4,
      review:
        'Nice place for shopping, average price is cheaper than minimarket or the other supermarket. It also have more choices of products than the other supermarket.',
    },
    {
      userName: 'Jeremy Deandito',
      userEmail: '18222xxx@std.stei.itb.ac.id',
      rating: 4,
      review:
        'Nice place for shopping, average price is cheaper than minimarket or the other supermarket. It also have more choices of products than the other supermarket.',
    },
    {
      userName: 'Jeremy Deandito',
      userEmail: '18222xxx@std.stei.itb.ac.id',
      rating: 4,
      review:
        'Nice place for shopping, average price is cheaper than minimarket or the other supermarket. It also have more choices of products than the other supermarket.',
    },
    {
      userName: 'Jeremy Deandito',
      userEmail: '18222xxx@std.stei.itb.ac.id',
      rating: 4,
      review:
        'Nice place for shopping, average price is cheaper than minimarket or the other supermarket. It also have more choices of products than the other supermarket.',
    },
    {
      userName: 'Jeremy Deandito',
      userEmail: '18222xxx@std.stei.itb.ac.id',
      rating: 4,
      review:
        'Nice place for shopping, average price is cheaper than minimarket or the other supermarket. It also have more choices of products than the other supermarket.',
    },
    {
      userName: 'Jeremy Deandito',
      userEmail: '18222xxx@std.stei.itb.ac.id',
      rating: 4,
      review:
        'Nice place for shopping, average price is cheaper than minimarket or the other supermarket. It also have more choices of products than the other supermarket.',
    },
    {
      userName: 'Jeremy Deandito',
      userEmail: '18222xxx@std.stei.itb.ac.id',
      rating: 4,
      review:
        'Nice place for shopping, average price is cheaper than minimarket or the other supermarket. It also have more choices of products than the other supermarket.',
    },
    {
      userName: 'Jeremy Deandito',
      userEmail: '18222xxx@std.stei.itb.ac.id',
      rating: 4,
      review:
        'Nice place for shopping, average price is cheaper than minimarket or the other supermarket. It also have more choices of products than the other supermarket.',
    },
  ];

  // const mockData: RecommendationType = {
  //   id: '2',
  //   title: 'Voucher Diskon',
  //   type: 'voucher',
  //   creatorId: user?.id ?? '',
  //   description:
  //     'Dapatkan diskon spesial untuk pembelian pertama segera biar menjadi org sigmaa ayo buruannnn pake vouchernya',
  //   averageRating: 4.5,
  //   link: 'https://example.com/voucher',
  //   periodeAwal: new Date('2024-01-01'),
  //   periodeAkhir: new Date('2024-12-31'),
  //   imageUrl: '/img/rekomendasi/foto-voucher-mock.png',
  // };
  const mockData: RecommendationType = {
    id: '1',
    title: 'Someplace Cool',
    type: 'co-working',
    creatorId: user?.id ?? '',
    address: 'Jl. Ganesa No 10',
    mapsURL: 'https://maps.google.com',
    description:
      'Pemilihan Ketua SPARTA HMIF 2023 sudah ditutup pada 21 April 2024zzzzzzzzzzz ' +
      '(23.59) dengan total suara sah sebanyak 188 suara zzzzzzzzz ',
    averageRating: 4.5,
    region: 'Ganesha',
    imageUrl: '/img/rekomendasi/foto-tempat-mock.png',
  };

  return (
    <div className="flex size-full h-screen flex-col overflow-auto bg-green-50">
      <div className="relative mx-auto flex max-h-screen w-full flex-col items-center lg:max-w-screen-lg lg:px-8">
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

        <main className="flex h-auto flex-col items-center gap-3 bg-[url(/img/rekomendasi/recommendation-bg-mobile.jpg)] bg-cover bg-center md:bg-[url(/img/rekomendasi/recommendation-bg-desktop.jpg)] lg:h-auto lg:max-w-screen-lg lg:rounded-t-2xl lg:px-[82px]">
          <div className="w-full px-6 pt-6 lg:mt-8 lg:px-0">
            <Header title={mockData.title} creatorId={mockData.creatorId} />
          </div>
          <div className="size-full px-6 pb-28 pt-6 lg:px-0 lg:pb-6 lg:pt-3">
            {mockData.type === 'co-working' ? (
              <div className="flex flex-col gap-6">
                <PlaceDetail data={mockData} />
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                <VoucherDetail data={mockData} />
              </div>
            )}
            <div className="min-h-screen overflow-y-auto lg:min-h-0">
              <ReviewSection reviews={mockReviews} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
