import { Calendar, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface DropdownCalendarProps {
  placeholder?: string;
  onSelect?: (month: string, year: number) => void;
  className?: string;
  disabled?: boolean;
}

export function DropdownCalendar({ 
  placeholder = "Default...", 
  onSelect,
  className = "",
  disabled = false 
}: DropdownCalendarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear()); // Curr Year sekarang

  // Bulan untuk disimpan
  const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
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
    setCurrentYear(prev => direction === 'prev' ? prev - 1 : prev + 1);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Button membuka state calendar */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
          className={`w-full bg-[#FCFCFC] rounded-lg hover:border-[#CBD5E1] focus-visible:outline-none focus-visible:border-[#94A3B8] border border-[#BABABA]/30 px-3 py-2 text-left flex items-center justify-between text-sm ${
            className.includes('border-red-400') ? 'border-red-400 focus-visible:border-red-400' : ''
          }`}
      > 
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <span className={selectedValue ? "text-black" : "text-gray-500"}>
            {selectedValue || placeholder}
          </span>
        </div>
        <ChevronDown 
          className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`} 
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-80 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
          {/* Calendar Header */}
          <div className="flex items-center justify-between p-3 border-b">
            <button
              type="button"
              onClick={() => handleYearChange('prev')}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <h3 className="font-semibold text-sm">{currentYear}</h3>
            <button
              type="button"
              onClick={() => handleYearChange('next')}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ChevronRight className="w-4 h-4" />
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
                  className="p-2 text-xs text-center hover:bg-gray-100 focus:bg-gray-100 focus:outline-none rounded transition-colors"
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