import { X } from 'lucide-react';
import React from 'react';
import { Button } from '~/components/ui/button';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  reportData: string;
  selectedFile: File | null;
  imagePreview: string | null;
}

function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  reportData,
  selectedFile,
  imagePreview,
}: ConfirmationModalProps): JSX.Element | null {
  if (!isOpen) return null;

  const handleConfirm = (): void => {
    onConfirm();
  };

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#424242]/50">
      <div className="relative mx-4 w-full max-w-[564px] rounded-[15px] bg-white p-6  shadow-lg">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute right-[18px] top-[13px] text-[#1D1B20] hover:text-[#1D1B20]/70"
        >
          <X size={24} className="text-[#1D1B20]" />
        </button>

        {/* Title */}
        <h2 className="mb-4 py-5 text-center text-sm font-[400] text-black lg:py-0 lg:text-start lg:text-[20px]">
          Apakah anda yakin ingin mengajukan laporan ini?
        </h2>

        {/* Report Details */}
        <div className="mb-5 flex flex-col gap-2 rounded-lg border border-[#BABABA]/30 bg-[#FCFCFC] px-5 py-[14px]">
          <h3 className="text-base font-medium text-black">Detail Laporan:</h3>
          <p className="text-sm font-normal text-black">{reportData || ''}</p>

          {/* Image Preview */}
          {imagePreview && (
            <div>
              <div className=" overflow-hidden rounded-lg border-2 border-black/20">
                <img
                  src={imagePreview}
                  alt="Report image"
                  className="max-h-[310px] object-cover"
                />
              </div>
              {selectedFile && (
                <p className="mt-2 line-clamp-1 break-all text-sm text-black">
                  Foto: {selectedFile.name}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-[10px]">
          <Button
            onClick={handleClose}
            className="flex-1 border border-black bg-transparent text-black hover:bg-gray-50"
            type="button"
          >
            Batal
          </Button>
          <Button
            onClick={handleConfirm}
            className="flex-1 bg-[#305138] text-white hover:opacity-90"
            type="button"
          >
            Ajukan
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
