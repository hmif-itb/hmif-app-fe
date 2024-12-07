import { Button } from '~/components/ui/button';
import dayjs from 'dayjs';

interface VoucherDetailProps {
  data: {
    id: string;
    title: string;
    description?: string;
    averageRating: number;
    link?: string;
    periodeAwal?: Date;
    periodeAkhir?: Date;
    imageUrl: string;
  };
}

export function VoucherDetail({ data }: VoucherDetailProps) {
  return (
    <div className="max-h-[600px] w-full overflow-y-auto rounded-xl bg-white p-4">
      <div className="flex flex-col lg:flex-row lg:gap-6">
        {/* Image */}
        <div className="relative w-full lg:w-1/2">
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
          {/* Header - Desktop only */}
          <div className="hidden justify-between lg:flex">
            <h2 className="text-lg font-bold">Deskripsi</h2>
          </div>

          <hr className="my-4 hidden lg:block" />

          <div className="flex-1 lg:overflow-auto">
            <div className="space-y-2 pt-2 lg:pt-0">
              {data.periodeAwal && data.periodeAkhir && (
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold">Period:</p>
                  <p className="text-sm">
                    {dayjs(data.periodeAwal).format('DD-MM-YYYY')} -{' '}
                    {dayjs(data.periodeAkhir).format('DD-MM-YYYY')}
                  </p>
                </div>
              )}
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold">Rating:</p>
                <p className="text-sm">{data.averageRating}</p>
              </div>
              <div>
                <p className="text-sm font-bold">Description:</p>
                <p className="whitespace-normal break-words text-sm">
                  {data.description}
                </p>
              </div>
            </div>
          </div>

          {/* Button Container */}
          <div className="mt-4 lg:flex lg:justify-end">
            <Button
              variant="solid"
              className="w-full bg-black text-white hover:bg-gray-800 lg:w-1/3"
              onClick={() => window.open(data.link, '_blank')}
            >
              See Voucher
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
