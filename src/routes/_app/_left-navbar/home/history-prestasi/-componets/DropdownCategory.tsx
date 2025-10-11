import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface DropdownCategoryProps {
  options: string[];
  placeholder?: string;
  onSelect?: (
    value: 'competition' | 'organization' | 'committee' | undefined,
  ) => void;
  className?: string;
  disabled?: boolean;
}

export function DropdownCategory({
  placeholder = 'Category',
  options,
  onSelect,
  className = '',
  disabled = false,
}: DropdownCategoryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  // Handling selection later
  const handleSelect = (option: string) => {
    setSelectedValue(option);
    setIsOpen(false);
    if (onSelect) {
      switch (option) {
        case 'Semua':
          onSelect(undefined);
          break;
        case 'Organisasi':
          onSelect('organization');
          break;
        case 'Kepanitian':
          onSelect('committee');
          break;
        case 'Kompetisi':
          onSelect('competition');
          break;
      }
    }
  };

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        className={`flex w-full items-center justify-between rounded-lg border border-[#BABABA]/30 bg-[#FCFCFC] px-3 py-2 text-left text-sm hover:border-[#CBD5E1] focus-visible:border-[#94A3B8] focus-visible:outline-none`}
      >
        <span className={selectedValue ? 'text-black' : 'text-gray-500'}>
          {selectedValue || placeholder}
        </span>
        <ChevronDown
          className={`size-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown options */}
      {isOpen && (
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-lg border border-gray-300 bg-white shadow-lg">
          {options.map((option, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSelect(option)}
              className="w-full px-3 py-2 text-left text-sm first:rounded-t-lg last:rounded-b-lg hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
