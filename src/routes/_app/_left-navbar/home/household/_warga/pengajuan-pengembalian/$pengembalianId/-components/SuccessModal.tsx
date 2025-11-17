import { Check, X } from 'lucide-react';
import React from 'react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function SuccessModal({
  isOpen,
  onClose,
}: SuccessModalProps): JSX.Element | null {
  if (!isOpen) return null;

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#424242]/50">
      <div className="relative mx-4 w-full max-w-[560px] rounded-lg bg-white px-4 pb-9 pt-[46px] text-center">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute right-[17px] top-[16px] text-[#1D1B20] hover:text-[#1D1B20]/80"
          type="button"
        >
          <X size={20} />
        </button>

        {/* Success Icon */}
        <div className="mx-auto flex items-center justify-center">
          <Check size={160} className="text-[#2e5137]" />
        </div>

        {/* Success Message */}
        <div className="px-[62px] pb-3 pt-6 ">
          <p className="text-[24px] font-semibold text-gray-800 ">
            Pengembalian berhasil diajukan dan akan segera ditinjau oleh Admin
          </p>
        </div>
      </div>
    </div>
  );
}

export default SuccessModal;
