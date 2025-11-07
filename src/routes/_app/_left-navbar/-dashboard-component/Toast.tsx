import { Check, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ToastProps {
  type: 'success' | 'error';
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
  title?: string;
  message?: string;
}

export function Toast({
  type,
  isVisible,
  onClose,
  duration = 5000,
  title,
  message,
}: ToastProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);

      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!isVisible) return null;

  const iconStyles = {
    success: (
      <div className="rounded-full bg-[#00632B] p-2">
        <Check className="h-5 w-auto text-white" />
      </div>
    ),
    error: (
      <div className="rounded-full bg-red-400 p-2">
        <X className="h-5 w-auto text-white" />
      </div>
    ),
  };

  // Default messages
  const defaultTitle = type === 'success' ? 'Aksi Berhasil' : 'Aksi Gagal';
  const defaultMessage =
    type === 'success'
      ? 'Aksi telah berhasil dilakukan'
      : 'Aksi gagal untuk dilakukan';

  return (
    <div
      className={`fixed right-0 top-4 z-50 mx-4 max-w-md rounded-lg border-l-8 bg-white p-4 shadow-xl transition-all duration-300 ease-in-out ${
        isAnimating ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      } ${type === 'success' ? 'border-[#00632B]' : 'border-red-400'}`}
    >
      <div className="flex items-start gap-3">
        {iconStyles[type]}
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold text-black">
            {title || defaultTitle}
          </p>
          <p className="text-xs text-gray-400">{message || defaultMessage}</p>
        </div>
        <button
          onClick={handleClose}
          className="shrink-0 rounded-full p-1 transition-colors hover:bg-black/10"
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
}
