import { X } from 'lucide-react';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemType: 'property' | 'sekre';
  itemName: string;
}

export function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  itemType,
  itemName,
}: DeleteModalProps) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    console.log(`Deleting ${itemType}: ${itemName}`);
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative mx-[30px] w-[564px] rounded-[15px] bg-white px-[25px] py-9 shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
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
          Apakah Anda yakin ingin menghapus{' '}
          {itemType === 'property' ? 'properti' : 'sekre'}{' '}
          {itemName.toLowerCase()}?
        </h2>

        {/* Subtitle */}
        <p className="mb-6 text-center text-gray-500">
          {itemType === 'property' ? 'Properti' : 'Sekre'} yang telah dihapus
          tidak dapat dikembalikan
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
            onClick={handleConfirm}
            className="flex-1 rounded-full bg-[#B01212] px-6 py-3 font-medium text-white transition-colors hover:bg-[#B01212]/90"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}
