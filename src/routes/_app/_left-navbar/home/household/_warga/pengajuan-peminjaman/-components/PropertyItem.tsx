import { useState } from 'react';
import { MapPin, Plus, ChevronDown } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { PropertyData } from '../../../-types';

interface PropertyItemProps {
  item: PropertyData;
}

export function PropertyItem({ item }: PropertyItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const isAvailable = item.status === 'available';
  const availabilityLabel = isAvailable ? 'Tersedia' : 'Sedang Dipakai';

  const handleBorrowClick = () => {
    navigate({
      to: '/home/household/pengajuan-peminjaman/property/$propertyId',
      params: { propertyId: item.id },
    });
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-full rounded-xl bg-white">
      {/* Desktop Layout - Always visible */}
      <div className="hidden w-full items-center justify-between px-[22px] py-5 lg:flex">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          <div className="size-9 min-h-9 min-w-9 overflow-hidden rounded-lg bg-[#E8C55F]">
            <img
              src={item.photo || '/img/home/calendar-bg.png'}
              alt={item.name}
              className="size-full object-cover"
            />
          </div>
          {/* Information */}
          <div className="flex flex-col gap-3">
            <h3 className="text-base font-semibold text-black">{item.name}</h3>
            <div className="flex items-center gap-7 text-xs text-[#525352]">
              <span className="rounded-full bg-[#AAB8AD] px-3 py-1 text-[#1D3122]">
                {item.condition === 'good' ? 'Baik' : 'Rusak'}
              </span>
              <span>{item.quantity} Tersedia</span>
              <span className="flex items-center gap-1">
                <MapPin size={12} />
                {' ' + item.location}
              </span>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          {/* Tag */}
          <div
            className={`flex h-fit items-center rounded-full px-5 py-1 text-sm text-white ${
              isAvailable ? 'bg-[#30764B]' : 'bg-[#C23B30]'
            }`}
          >
            {availabilityLabel}
          </div>
          {/* Borrow Button */}
          <button
            onClick={handleBorrowClick}
            className="flex items-center rounded-xl bg-[#E8C55F] px-6 py-2 font-medium text-[#1D3122] transition-opacity hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-40"
            disabled={!isAvailable}
          >
            <Plus size={15} />
            <span>Pinjam</span>
          </button>
        </div>
      </div>

      {/* Mobile Layout - Collapsible */}
      <div className="lg:hidden">
        {/* Collapsed Header */}
        <div
          className="flex w-full cursor-pointer items-center justify-between px-4 py-[13px]"
          onClick={toggleExpanded}
        >
          <div className="flex items-center gap-3">
            <div className="size-9 min-h-9 min-w-9 overflow-hidden rounded-lg bg-[#E8C55F]">
              <img
                src={item.photo || '/img/home/calendar-bg.png'}
                alt={item.name}
                className="size-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center gap-1 ">
              <h3 className="max-w-[120px] truncate text-sm font-semibold text-black md:max-w-[200px]">
                {item.name}
              </h3>
              <span
                className={`flex  w-fit items-center rounded-full px-3  text-xs text-white ${
                  isAvailable ? 'bg-[#30764B]' : 'bg-[#C23B30]'
                }`}
              >
                {availabilityLabel}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-[#525352]">
              {item.quantity} Tersedia
            </span>
            <ChevronDown
              size={16}
              className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            />
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className=" space-y-[10px] px-4 pb-4">
            <hr />
            <div className="flex w-full flex-col items-center justify-between gap-[10px] ">
              <div className="flex w-full gap-5 text-sm text-[#525352]">
                {/* Kondisi */}
                <div className="w-full text-black">
                  <span className="text-sm font-medium ">Kondisi:</span>
                  <br />
                  <span className="text-xs">
                    {item.condition === 'good' ? 'Baik' : 'Rusak'}
                  </span>
                </div>
                {/* Lokasi */}
                <div className="w-full text-black">
                  <span className="text-sm font-medium ">Lokasi:</span>
                  <br />
                  <span className="text-xs">{item.location}</span>
                </div>
              </div>
              {/* Borrow Button */}
              <button
                onClick={handleBorrowClick}
                className="flex w-full items-center justify-center rounded-xl bg-[#E8C55F] px-4 py-2 font-medium text-[#1D3122] transition-opacity hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-40"
                disabled={!isAvailable}
              >
                <Plus size={15} />
                <span>Pinjam</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
