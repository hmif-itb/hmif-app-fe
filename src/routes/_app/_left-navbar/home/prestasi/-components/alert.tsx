import { Check, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface AlertProps {
    type: 'success' | 'error';
    isVisible: boolean;
    onClose: () => void;
    duration?: number;
}

export function Alert({
    type,
    isVisible,
    onClose,
    duration = 5000
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

    const iconStyles = {
        success: 
        <div className='bg-[#00632B] rounded-full p-2'>
             <Check className='w-auto h-5 text-white'/>
        </div>,
        error:
        <div className='bg-red-400 rounded-full p-2'>
            <X className='w-auto h-5 text-white'/>
        </div>
    }

    return (
        <div
            className={`fixed p-4 border-l-8 top-4 right-0 z-50 bg-white max-w-md rounded-lg shadow-xl mx-4 transform transition-all duration-300 ease-in-out
            ${isAnimating? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
            ${type === 'success' ? 'border-[#00632B]' : 'border-red-400'}`}
        >
                <div className='flex items-start gap-3'>
                    {iconStyles[type]}
                    <div className='flex flex-col gap-2'>
                        <p className='text-sm text-black font-semibold'>
                            {type === 'success' ? 'Submisi Berhasil' : 'Submisi Gagal'}
                        </p>
                        <p className='text-xs text-gray-400'>
                            {type === 'success' ? 'Submisi prestasi anda telah berhasil ditambahkan' : 'Submisi prestasi anda gagal untuk ditambahkan'}
                        </p>
                    </div>
                    <button
                        onClick={handleClose}
                        className="flex-shrink-0 p-1 hover:bg-black/10 rounded-full transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

        </div>
    );
}