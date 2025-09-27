import { PrestasiData } from '../-constant';

type DeleteConfirmationProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  item?: PrestasiData | null;
};

export const DeleteConfirmation = ({
  isOpen,
  onClose,
  onConfirm,
  item,
}: DeleteConfirmationProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-md rounded-lg bg-white p-6">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <div className="text-center">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full ">
            <img
              src="/img/admin/question-symbol.png"
              alt="Question"
              className=""
            />
          </div>
          <h3 className="mb-2 font-inter text-lg font-semibold text-gray-900">
            Apakah Anda yakin ingin menghapus entri prestasi berikut?
          </h3>
          <p className="mb-6 font-inter text-gray-500">
            Entri yang telah dihapus tidak dapat dikembalikan
          </p>
          {item && (
            <div className="mb-6 rounded-lg bg-gray-50 p-3 text-left">
              <p className="text-sm font-medium">{item.nama}</p>
              <p className="text-sm text-gray-600">{item.namaPrestasi}</p>
            </div>
          )}

          <div className="flex gap-8">
            <button
              onClick={onClose}
              className="flex-1 rounded-[20rem]  border border-gray-300 px-4 py-2 font-inter font-medium text-gray-700 hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 rounded-[20rem] bg-red-600 px-4 py-2 font-inter font-medium text-white hover:bg-red-700"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
