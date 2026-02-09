import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { PeminjamanData } from '../../../-types';

interface PeminjamanItemProps {
  item: PeminjamanData;
}

export function PeminjamanItem({ item }: PeminjamanItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleReturnClick = () => {
    // Navigate to peminjaman form with peminjaman ID
    navigate({
      to: '/home/household/pengajuan-pengembalian/$pengembalianId',
      params: { pengembalianId: item.id },
    });
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'bg-[#305138]';
      case 'completed':
        return 'bg-gray-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'pending_return':
        return 'bg-[#FFA500]';
      case 'rejected':
        return 'bg-red-500';
      default:
        return 'bg-[#305138]';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'Aktif';
      case 'completed':
        return 'Selesai';
      case 'pending':
        return 'Pending';
      case 'pending_return':
        return 'Pengembalian';
      case 'rejected':
        return 'Ditolak';
      default:
        return status;
    }
  };

  return (
    <div className="h-fit w-full rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md">
      <div className="px-5 py-[14px] lg:p-4">
        {/* Collapsed Content */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* User Avatar */}
            {item.userAvatar ? (
              <img
                src={item.userAvatar}
                alt={item.userName}
                className="size-11 min-h-11 min-w-11 rounded-full object-cover"
              />
            ) : (
              <div className="flex size-11 min-h-11 min-w-11 items-center justify-center rounded-full bg-[#E8C55F]">
                <span className="text-sm font-semibold text-white">
                  {getInitials(item.userName)}
                </span>
              </div>
            )}
            <div>
              <h3 className="font-semibold text-black">{item.userName}</h3>
              <p className="text-[12px] text-[#525352] lg:text-sm">
                {item.properti}
              </p>
              <p className="mt-1 text-[12px] text-[#525352] lg:text-sm">
                Mulai: {item.startDate} Selesai: {item.endDate}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Status Badge */}
            <div
              className={`flex h-fit items-center rounded-full px-3 py-1 text-xs text-white lg:text-sm ${getStatusColor(item.status)}`}
            >
              {getStatusText(item.status)}
            </div>
            <button
              onClick={toggleExpanded}
              className="size-8 rounded-md p-1 transition-all duration-200 hover:scale-110 hover:bg-gray-100"
            >
              <ChevronDown
                className={`size-4 transition-transform duration-300 ease-in-out ${
                  isExpanded ? 'rotate-180' : 'rotate-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Expanded Content with Smooth Transition */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isExpanded ? 'opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div
            className="space-y-4 transition-transform duration-300 ease-in-out"
            style={{
              transform: isExpanded ? 'translateY(0)' : 'translateY(-10px)',
            }}
          >
            {/* Details Grid */}
            <div className="mt-4 grid grid-cols-2 gap-4 border-t border-gray-100 pt-4">
              <div className="transition-all delay-75 duration-300">
                <p className="text-sm font-medium text-black">
                  {item.type === 'properti' ? 'Properti' : 'Sekre'}:
                </p>
                <p className="text-xs text-black">{item.properti}</p>
              </div>
              <div className="transition-all delay-100 duration-300">
                <p className="text-sm font-medium text-black">Jumlah:</p>
                <p className="text-xs text-black">{item.jumlah}</p>
              </div>
              <div className="transition-all delay-150 duration-300">
                <p className="text-sm font-medium text-black">Tanggal Mulai:</p>
                <p className="text-xs text-black">{item.tanggalMulai}</p>
              </div>
              <div className="transition-all delay-200 duration-300">
                <p className="text-sm font-medium text-black">
                  Tanggal Selesai:
                </p>
                <p className="text-xs text-black">{item.tanggalSelesai}</p>
              </div>
            </div>

            {/* Proof Photo Section - Only show for pending_return */}
            {item.buktiFotoUrl && (
              <div className="transition-all duration-300">
                <p className=" text-sm font-medium text-black">
                  Bukti Pengembalian:
                </p>
                <div className="mt-2">
                  <img
                    src={item.buktiFotoUrl}
                    alt="Bukti Pengembalian"
                    className="h-auto max-h-[300px] w-full rounded-lg object-contain"
                  />
                </div>
              </div>
            )}

            {/* Return Button - Only show if status is accepted */}
            {item.status.toLowerCase() === 'accepted' && (
              <div className="flex justify-end pt-4">
                <button
                  onClick={handleReturnClick}
                  className="flex w-full max-w-[330px]  items-center justify-center rounded-full  bg-[#305138] px-4 py-2 font-medium text-white transition-all duration-300 hover:bg-[#305138]/90 hover:shadow-lg"
                >
                  <span>Ajukan Pengembalian</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
