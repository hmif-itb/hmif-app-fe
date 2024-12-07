// routes/_app/_left-navbar/home/rekomendasi/$rekomendasiId/-components/place-detail.tsx
import { Button } from '~/components/ui/button';

interface PlaceDetailProps {
  data: {
    id: string;
    title: string;
    address: string;
    mapsURL: string;
    description?: string;
    averageRating: number;
    region: 'Ganesha' | 'Jatinangor';
    imageUrl: string;
  };
}
export function PlaceDetail({ data }: PlaceDetailProps) {
  return (
    <div className="max-h-full w-full overflow-y-auto rounded-xl bg-white p-4">
      <div className="flex flex-col lg:flex-row lg:gap-6">
        {/* Image */}
        <div className="relative w-full lg:w-1/2">
          <span className="absolute right-2 top-2 rounded-lg bg-[#F3E8C4] px-2 py-1 text-xs lg:hidden">
            {data.region}
          </span>
          <div className="aspect-[4/3] w-full overflow-hidden rounded-xl">
            <img
              src={data.imageUrl}
              alt={data.title}
              className="size-full object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex size-full flex-col lg:w-1/2">
          {/* Header with region - Desktop */}
          <div className="hidden justify-between lg:flex">
            <h2 className="text-lg font-bold">Deskripsi</h2>
            <span className="rounded-lg bg-yellow-100 px-2 py-1 text-sm">
              {data.region}
            </span>
          </div>

          <hr className="my-4 hidden border-black lg:block" />

          <div className="h-0 flex-1 lg:h-auto  lg:overflow-auto  ">
            <div className="space-y-2 pt-2 lg:pt-0 ">
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold">Location:</p>
                <p className="text-sm">{data.address}</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold">Rating:</p>
                <p className="text-sm">{data.averageRating}</p>
              </div>

              <div>
                <p className="font-bold">Description :</p>
                <p className="whitespace-normal break-words text-sm">
                  {data.description}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 lg:flex lg:justify-end">
            <Button
              variant="solid"
              className="w-full items-center justify-between bg-black text-white hover:bg-gray-800 lg:w-fit"
              onClick={() => window.open(data.mapsURL, '_blank')}
            >
              See Location
              <img
                src="/img/rekomendasi/location.svg"
                alt="Location"
                className="size-5 "
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
