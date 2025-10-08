import { Calendar, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface DropdownCalendarProps {
  placeholder?: string;
  onSelect?: (month: string, year: number) => void;
  className?: string;
  disabled?: boolean;
}

export function DropdownCalendar({
  placeholder = 'Default...',
  onSelect,
  className = '',
  disabled = false,
}: DropdownCalendarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear()); // Curr Year sekarang

  // Bulan untuk disimpan
  const months = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];

  // Memilih bulan dan tahun
  const handleSelect = (month: string, year: number) => {
    const displayValue = `${month} ${year}`;
    setSelectedValue(displayValue);
    setIsOpen(false);
    if (onSelect) {
      onSelect(month, year);
    }
  };

  // Perubahan tahun calendar
  const handleYearChange = (direction: 'prev' | 'next') => {
    setCurrentYear((prev) => (direction === 'prev' ? prev - 1 : prev + 1));
  };

  return (
    <div className={`relative ${className}`}>
      {/* Button membuka state calendar */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        className={`flex w-full items-center justify-between rounded-lg border border-[#BABABA]/30 bg-[#FCFCFC] px-3 py-2 text-left text-sm hover:border-[#CBD5E1] focus-visible:border-[#94A3B8] focus-visible:outline-none ${
          className.includes('border-red-400')
            ? 'border-red-400 focus-visible:border-red-400'
            : ''
        }`}
      >
        <div className="flex items-center gap-2">
          <Calendar className="size-4 text-gray-500" />
          <span className={selectedValue ? 'text-black' : 'text-gray-500'}>
            {selectedValue || placeholder}
          </span>
        </div>
        <ChevronDown
          className={`size-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-80 rounded-lg border border-gray-300 bg-white shadow-lg">
          {/* Calendar Header */}
          <div className="flex items-center justify-between border-b p-3">
            <button
              type="button"
              onClick={() => handleYearChange('prev')}
              className="rounded p-1 hover:bg-gray-100"
            >
              <ChevronLeft className="size-4" />
            </button>
            <h3 className="text-sm font-semibold">{currentYear}</h3>
            <button
              type="button"
              onClick={() => handleYearChange('next')}
              className="rounded p-1 hover:bg-gray-100"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="p-3">
            <div className="grid grid-cols-3 gap-2">
              {months.map((month) => (
                <button
                  key={month}
                  type="button"
                  onClick={() => handleSelect(month, currentYear)}
                  className="rounded p-2 text-center text-xs transition-colors hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                >
                  {month}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
