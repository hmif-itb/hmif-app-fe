import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface DropdownCategoryProps { 
    options: string[]; // Multiple string options
    placeholder?: string;
    onSelect?: (value: string) => void;
    className?: string;
    disabled?: boolean;
}

export function DropdownCategory({
    placeholder = 'Pilih jenis prestasi...',
    options,
    onSelect,
    className = '',
    disabled = false,
}: DropdownCategoryProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');

    // Handling selection nanti
    const handleSelect = (option: string) => {
        setSelectedValue(option);
        setIsOpen(false);
        if (onSelect) {
            onSelect(option);
        }
    };

    return (
        <div className={`relative ${className}`}>
            <button
                type='button'
                onClick={() => setIsOpen(!isOpen)}
                disabled={disabled}
                className={`min-w-[185px] bg-[#FCFCFC] rounded-lg hover:border-[#CBD5E1] focus-visible:outline-none focus-visible:border-[#94A3B8] border border-[#BABABA]/30 px-3 py-2 text-left flex items-center justify-between text-sm ${
              className.includes('border-red-400') ? 'border-red-400 focus-visible:border-red-400' : ''
            }`}
            >
                <span className={selectedValue ? 'text-black' : 'text-gray-500'}>
                    { selectedValue || placeholder }
                </span>
                <ChevronDown className={`size-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Dropdown options */}
            {isOpen && (
                <div className='absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto'>
                {options.map((option, index) => (
                    <button
                    key={index}
                    type='button'
                    onClick={() => handleSelect(option)}
                    className='w-full px-3 py-2 text-left text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none first:rounded-t-lg last:rounded-b-lg'
                    >
                    {option}
                    </button>
                ))}
                </div>
            )}
        </div>
    );
}