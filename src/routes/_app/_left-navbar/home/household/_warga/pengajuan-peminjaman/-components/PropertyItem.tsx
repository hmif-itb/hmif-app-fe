import { useState } from 'react';
import { MapPin, Plus, ChevronDown } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { PropertyData } from '../api';

interface PropertyItemProps {
  item: PropertyData;
}

export function PropertyItem({ item }: PropertyItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

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
          <div className="size-9 min-h-9 min-w-9 rounded-lg bg-[#E8C55F]">
            <img src={item.image || ''} alt="" />
          </div>
          {/* Information */}
          <div className="flex flex-col gap-3">
            <h3 className="text-base font-semibold text-black">{item.name}</h3>
            <div className="flex items-center gap-7 text-xs text-[#525352]">
              <span className="rounded-full bg-[#AAB8AD] px-3 py-1 text-[#1D3122]">
                {item.condition === 'new' ? 'Baik' : 'Rusak'}
              </span>
              <span>{item.amount} Tersedia</span>
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
          <div className="flex h-fit items-center rounded-full bg-[#30764B] px-5 py-1 text-sm text-white">
            {item.type === 'eksklusif' ? 'Eksklusif' : 'Non-Eksklusif'}
          </div>
          {/* Borrow Button */}
          <button
            onClick={handleBorrowClick}
            className="flex items-center rounded-xl bg-[#E8C55F] px-6 py-2 font-medium text-[#1D3122] transition-opacity hover:opacity-70"
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
            <div className="size-9 min-h-9 min-w-9 rounded-lg bg-[#E8C55F]">
              <img src={item.image || ''} alt="" />
            </div>
            <div className="flex flex-col justify-center gap-1 ">
              <h3 className="max-w-[120px] truncate text-sm font-semibold text-black md:max-w-[200px]">
                {item.name}
              </h3>
              <span className="flex  w-fit items-center rounded-full bg-[#30764B] px-3  text-xs text-white">
                {item.type === 'eksklusif' ? 'Eksklusif' : 'Non-Eksklusif'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-[#525352]">
              {item.amount} Tersedia
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
                    {item.condition === 'new' ? 'Baik' : 'Rusak'}
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
                className="flex w-full items-center justify-center rounded-xl bg-[#E8C55F] px-4 py-2 font-medium text-[#1D3122] transition-opacity hover:opacity-70"
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
