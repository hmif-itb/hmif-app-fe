import { X } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  type: 'approve' | 'reject';
  requestData: {
    name: string;
    item: string;
    reason: string;
    startDate: string;
    endDate: string;
  };
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  type,
  requestData,
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  const isApprove = type === 'approve';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-[564px] rounded-[15px] bg-white px-[25px] py-9 shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 transition-colors hover:bg-gray-100"
        >
          <X size={30} className="text-[#1D1B20] " />
        </button>

        {/* Question Mark Icon */}
        <div className="mb-6 flex justify-center">
          <span className="text-[145px] font-bold leading-none text-[#e3c343] ">
            ?
          </span>
        </div>

        {/* Title */}
        <h2 className="mb-2 text-center text-xl font-semibold text-black">
          {isApprove
            ? 'Apakah Anda yakin ingin menyetujui permohonan peminjaman'
            : 'Apakah Anda yakin ingin menolak permohonan peminjaman'}
        </h2>

        {/* Details */}
        <p className="mb-6 text-center text-gray-500">
          {requestData.item} oleh {requestData.name}
          <br />
          untuk {requestData.reason} pada {requestData.startDate} -{' '}
          {requestData.endDate}?
        </p>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 rounded-full border border-black px-6 py-3 font-medium text-black transition-colors hover:bg-gray-50"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 rounded-full px-6 py-3 font-medium text-white transition-colors ${
              isApprove
                ? 'bg-[#305138] hover:bg-[#305138]/90'
                : 'bg-[#B01212] hover:bg-[#B01212]/90'
            }`}
          >
            {isApprove ? 'Setujui' : 'Tolak'}
          </button>
        </div>
      </div>
    </div>
  );
}
