import { Check, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface AlertProps {
  type: 'success' | 'error';
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
  title?: string;
  message?: string;
  className?: string;
}

export function Alert({
  type,
  isVisible,
  onClose,
  duration = 5000,
  title,
  message,
  className = '',
}: AlertProps) {
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

  // Default titles dan messages
  const defaultTitle = type === 'success' ? 'Berhasil' : 'Gagal';
  const defaultMessage =
    type === 'success'
      ? 'Operasi telah berhasil dilakukan'
      : 'Terjadi kesalahan saat melakukan operasi';

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

  return (
    <div
      className={`fixed inset-x-2 top-4 z-50 min-h-[48px] w-72 rounded-lg border-l-8 bg-white px-3 py-4 shadow-xl transition-all duration-300 ease-in-out sm:left-auto sm:right-4 sm:max-w-md sm:p-4 ${isAnimating ? 'translate-x-0 opacity-100' : 'translate-y-[-100px] opacity-0 sm:translate-x-full'} ${type === 'success' ? 'border-[#00632B]' : 'border-red-400'} ${className}`}
    >
      <div className="flex items-center gap-2 sm:gap-3">
        {iconStyles[type]}
        <div className="flex flex-1 flex-col gap-0.5 sm:gap-1">
          <p className="text-xs font-semibold text-black sm:text-sm">
            {title || defaultTitle}
          </p>
          <p className="text-[10px] leading-tight text-gray-400 sm:text-xs">
            {message || defaultMessage}
          </p>
        </div>
        <button
          onClick={handleClose}
          className="shrink-0 rounded-full p-1 transition-colors hover:bg-black/10"
        >
          <X className="size-3.5 sm:size-4" color="#D9D9D9" />
        </button>
      </div>
    </div>
  );
}
