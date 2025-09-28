import { X } from 'lucide-react';

interface FormData {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  type: string;
  reason: string;
}

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  formData: FormData;
  isSubmitting: boolean;
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  formData,
  isSubmitting,
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  const formatDisplayDate = (dateString: string) => {
    if (!dateString) return '';
    const [day, month, year] = dateString.split('/');
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative mx-[30px] w-[564px] space-y-3 rounded-[15px] bg-white px-[25px] py-9 shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 transition-colors hover:bg-gray-100"
        >
          <X size={30} className="text-[#1D1B20]" />
        </button>

        {/* Title */}
        <h2 className="pb-3 pt-6 text-center  text-sm font-normal text-black lg:px-[10.5px] lg:text-start lg:text-xl">
          Apakah anda yakin ingin mengajukan pinjaman ini?
        </h2>

        {/* Details */}
        <div>
          <div className="rounded-lg border border-[#BABABA]/30 bg-[#FCFCFC] px-5 py-[14px]">
            <h3 className="mb-2 text-sm font-medium text-gray-900">
              Detail Peminjaman:
            </h3>
            <div className="space-y-2 text-sm text-black">
              <p>Properti - {formData.type || 'Projektor'}</p>
              <p>
                Dari: {formatDisplayDate(formData.startDate)}{' '}
                {formData.startTime}
              </p>
              <p>
                Hingga: {formatDisplayDate(formData.endDate)} {formData.endTime}
              </p>
              <p>Alasan: {formData.reason}</p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="flex-1 rounded-full border border-black px-6 py-3 font-medium text-black transition-colors hover:bg-gray-50 disabled:opacity-50"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            disabled={isSubmitting}
            className="flex-1 rounded-full bg-[#305138] px-6 py-3 font-medium text-white transition-colors hover:bg-[#30764B]/90 disabled:opacity-50"
          >
            {isSubmitting ? 'Mengajukan...' : 'Ajukan'}
          </button>
        </div>
      </div>
    </div>
  );
}
