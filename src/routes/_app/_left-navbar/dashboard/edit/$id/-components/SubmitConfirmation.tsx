import React from 'react';
import { X } from 'lucide-react';

interface SubmitConfirmationProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  message?: string;
}

export const SubmitConfirmation: React.FC<SubmitConfirmationProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  title = 'Apakah Anda yakin ingin mengedit entri prestasi berikut?',
  message = 'Pastikan infromasi yang tercantum dalam form sudah tepat',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onCancel} />

      {/* Modal */}
      <div className="relative mx-4 w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <button
          onClick={onCancel}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="size-5" />
        </button>

        <div className="text-center">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-yellow-100">
            <img
              src="/img/admin/question-symbol.png"
              alt="Question"
              className="size-8"
            />
          </div>

          <h3 className="mb-2 text-lg font-semibold text-gray-900">{title}</h3>
          <p className="mb-6 text-sm text-gray-500">{message}</p>

          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 rounded-lg bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700"
            >
              Kirim
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
