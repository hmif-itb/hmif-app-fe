import { Check, X } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative mx-[30px] w-full max-w-[564px] rounded-[15px] bg-white px-[25px]  py-9 shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 transition-colors hover:bg-gray-100"
        >
          <X size={30} className="text-[#1D1B20]" />
        </button>

        {/* Checkmark Icon */}
        <div className="mb-6 flex justify-center">
          <span className="text-[145px] font-bold leading-none text-[#30764B]">
            <Check size={145} />
          </span>
        </div>

        {/* Title */}
        <h2 className="px-[70px] pb-3 pt-6 text-center text-2xl font-semibold text-black">
          Pinjaman berhasil diajukan dan akan segera ditinjau oleh Admin
        </h2>
      </div>
    </div>
  );
}
