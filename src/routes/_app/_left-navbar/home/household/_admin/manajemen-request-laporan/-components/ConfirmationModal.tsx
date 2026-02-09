import dayjs from 'dayjs';
import { Check, X } from 'lucide-react';
import { useState } from 'react';

const formatReadableDate = (dateString: string): string => {
  const date = dayjs(dateString);
  return date.format('D MMM YYYY HH:mm');
};

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  type: 'approve' | 'reject' | 'complete';
  requestData: {
    borrowerName: string;
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
  const [showSuccess, setShowSuccess] = useState(false);

  if (!isOpen) return null;

  const isApprove = type === 'approve';
  const isComplete = type === 'complete';
  const isReject = type === 'reject';

  const handleConfirm = () => {
    setShowSuccess(true);
    onConfirm();
  };

  const handleClose = () => {
    setShowSuccess(false);
    onClose();
  };

  // Success state
  if (showSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="relative mx-[30px] w-[564px] rounded-[15px] bg-white px-[25px] py-9 shadow-xl">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 rounded-full p-1 transition-colors hover:bg-gray-100"
          >
            <X size={30} className="text-[#1D1B20]" />
          </button>

          {/* Success Checkmark Icon */}
          <div className="mb-6 flex justify-center">
            <div className="flex size-[145px] items-center justify-center">
              <Check size={120} className="text-[#30764B]" strokeWidth={3} />
            </div>
          </div>

          {/* Success Message */}
          <p className="text-center text-xl font-semibold text-black">
            {isApprove
              ? 'Permohonan peminjaman berhasil diterima dan disetujui.'
              : isComplete
                ? 'Pengembalian berhasil dikonfirmasi.'
                : 'Permohonan peminjaman berhasil ditolak.'}
          </p>
        </div>
      </div>
    );
  }

  // Confirmation state
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative mx-[30px] w-[564px] rounded-[15px] bg-white px-[25px] py-9 shadow-xl">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-full p-1 transition-colors hover:bg-gray-100"
        >
          <X size={30} className="text-[#1D1B20]" />
        </button>

        {/* Question Mark Icon */}
        <div className="mb-6 flex justify-center">
          <span className="text-[145px] font-bold leading-none text-[#e3c343]">
            ?
          </span>
        </div>

        {/* Title */}
        <h2 className="mb-2 text-center text-xl font-semibold text-black">
          {isApprove
            ? 'Apakah Anda yakin ingin menyetujui permohonan peminjaman'
            : isComplete
              ? 'Apakah Anda yakin ingin mengkonfirmasi pengembalian'
              : 'Apakah Anda yakin ingin menolak permohonan peminjaman'}
        </h2>

        {/* Details */}
        <p className="mb-6 text-center text-gray-500">
          {requestData.item} oleh {requestData.borrowerName}
          {!isComplete && (
            <>
              <br />
              untuk {requestData.reason} pada{' '}
              {formatReadableDate(requestData.startDate)} -{' '}
              {formatReadableDate(requestData.endDate)}
            </>
          )}
          ?
        </p>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleClose}
            className="flex-1 rounded-full border border-black px-6 py-3 font-medium text-black transition-colors hover:bg-gray-50"
          >
            Batal
          </button>
          <button
            onClick={handleConfirm}
            className={`flex-1 rounded-full px-6 py-3 font-medium text-white transition-colors ${
              isReject
                ? 'bg-[#B01212] hover:bg-[#B01212]/90'
                : 'bg-[#305138] hover:bg-[#305138]/90'
            }`}
          >
            {isApprove ? 'Setujui' : isComplete ? 'Konfirmasi' : 'Tolak'}
          </button>
        </div>
      </div>
    </div>
  );
}
