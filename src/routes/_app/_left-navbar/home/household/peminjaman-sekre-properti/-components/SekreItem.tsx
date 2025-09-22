import { MapPin, Plus } from 'lucide-react';

export interface SekreData {
  name: string;
  type: 'eksklusif' | 'non-eksklusif';
  condition: 'new' | 'used';
  location: string;
  photo?: string;
  status?: 'available' | 'unavailable';
}

interface SekreItemProps {
  sekre: SekreData;
  onPinjam?: () => void;
}

export function SekreItem({ sekre, onPinjam }: SekreItemProps) {
  return (
    <div
      className={`flex w-full flex-col rounded-xl bg-white px-4 py-[15px] lg:px-[22px] lg:py-5 ${
        !sekre.status || sekre.status === 'unavailable' ? 'opacity-60' : ''
      }`}
    >
      {/* Top Section */}
      <div className="flex justify-between">
        <div className="mb-5 flex items-center gap-3">
          <div className="size-9 min-h-9 min-w-9 rounded-lg bg-[#E8C55F]">
            <img src="" alt="" />
          </div>
          {/* Information */}
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-semibold text-black lg:text-base">
              {sekre.name}
            </h3>
            <div className="flex items-center gap-4 text-xs text-[#525352] ">
              <span className="rounded-full bg-[#AAB8AD] px-3 py-1 text-[#1D3122]">
                {sekre.condition === 'new' ? 'Baik' : 'Rusak'}
              </span>
              <span className="flex items-center gap-1">
                <MapPin size={12} />
                <span className="max-w-[70px] truncate md:max-w-[80px] lg:max-w-[100px]">
                  {sekre.location}
                </span>
              </span>
            </div>
          </div>
        </div>
        {/* Adjust the conditional */}
        {sekre.status && sekre.status === 'available' ? (
          <span className="size-fit rounded-full bg-[#305138]  px-2 text-[12px] font-normal text-white lg:py-[2px] lg:text-sm">
            Tersedia
          </span>
        ) : (
          <span className="size-fit rounded-full bg-[#C23B30]  px-2 text-[12px] font-normal text-white lg:py-[2px] lg:text-sm">
            Tidak Tersedia
          </span>
        )}
      </div>
      {/* Image Section */}
      <div className="relative mb-3 aspect-[2/1] w-full overflow-hidden rounded-lg bg-[#E8C55F]">
        <img
          src={sekre.photo || '/img/home/calendar-bg.png'}
          alt=""
          className="size-full rounded-lg object-cover"
        />
        {true && (
          // Change the conditional rendering as needed
          <span className="absolute bottom-2 left-2 flex w-fit items-center rounded-full bg-[#30764B] px-3 py-[2px] text-xs text-white">
            {sekre.type === 'eksklusif' ? 'Eksklusif' : 'Non-Eksklusif'}
          </span>
        )}
      </div>
      {/* Bottom Section */}
      <div className="flex w-full justify-center gap-[60px]">
        <button
          onClick={onPinjam}
          className="flex items-center rounded-xl bg-[#E8C55F] px-6 py-1 font-medium text-[#1D3122] transition-opacity hover:opacity-70 lg:py-2"
        >
          <Plus size={15} />
          <span className="text-xs lg:text-base"> Pinjam</span>
        </button>
      </div>
    </div>
  );
}
