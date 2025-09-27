import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export interface DropdownOption {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  label: string;
  placeholder?: string;
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  required?: boolean;
  error?: string;
  disabled?: boolean;
}

export const CustomDropdown: React.FC<CustomDropdownProps> = ({
  label,
  placeholder = 'Pilih opsi',
  options,
  value,
  onChange,
  required = false,
  error,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || '');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setSelectedValue(value || '');
  }, [value]);

  const handleSelect = (optionValue: string) => {
    setSelectedValue(optionValue);
    onChange?.(optionValue);
    setIsOpen(false);
  };

  const selectedOption = options.find(
    (option) => option.value === selectedValue,
  );
  const displayText = selectedOption ? selectedOption.label : placeholder;

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-900">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`flex w-full items-center justify-between rounded-lg border px-3 py-2.5 text-left outline-none transition-colors focus:border-green-500 focus:ring-2 focus:ring-green-500 ${
            error ? 'border-red-300 bg-red-50' : 'border-gray-300'
          } ${selectedValue ? 'text-gray-900' : 'text-gray-500'} ${
            disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
          }`}
          style={{ backgroundColor: error ? undefined : '#FCFCFC' }}
        >
          <span className="truncate">{displayText}</span>
          <ChevronDown
            className={`size-4 text-gray-500 transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {isOpen && !disabled && (
          <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-gray-300 bg-white shadow-lg">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={`w-full px-3 py-2.5 text-left transition-colors first:rounded-t-lg last:rounded-b-lg hover:bg-gray-50 ${
                  selectedValue === option.value
                    ? 'bg-green-50 text-green-700'
                    : 'text-gray-900'
                } ${option.value === '' ? 'text-gray-500' : ''}`}
                disabled={option.value === '' && selectedValue !== ''}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};
