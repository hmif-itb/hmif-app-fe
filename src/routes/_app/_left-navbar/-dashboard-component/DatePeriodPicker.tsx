import { useState, useRef, useEffect } from 'react';
import { CalendarSearch, RotateCcw, X } from 'lucide-react';

type DatePeriodPickerProps = {
  onPeriodChange?: (from: string, to: string) => void;
  className?: string;
};

export const DatePeriodPicker = ({ onPeriodChange, className }: DatePeriodPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [tempFromDate, setTempFromDate] = useState('');
  const [tempToDate, setTempToDate] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatDateForDisplay = (dateStr: string) => {
    if (!dateStr) return '';
    return dateStr;
  };

  const handleApply = () => {
    const fromParts = tempFromDate.split('/');
    const toParts = tempToDate.split('/');

    if (!tempFromDate || !tempToDate || fromParts.length !== 2 || toParts.length !== 2) {
      setIsInvalid(true);
      return;
    }

    const fromMonth = parseInt(fromParts[0]);
    const fromYear = parseInt(fromParts[1]);
    const toMonth = parseInt(toParts[0]);
    const toYear = parseInt(toParts[1]);

    if (
      fromMonth < 1 || fromMonth > 12 ||
      toMonth < 1 || toMonth > 12 ||
      fromYear < 1900 || toYear < 1900 ||
      (fromYear > toYear) ||
      (fromYear === toYear && fromMonth > toMonth)
    ) {
      setIsInvalid(true);
      return;
    }

    setIsInvalid(false);
    setFromDate(tempFromDate);
    setToDate(tempToDate);
    setIsOpen(false);
    
    if (onPeriodChange) {
      onPeriodChange(tempFromDate, tempToDate);
    }
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFromDate('');
    setToDate('');
    setTempFromDate('');
    setTempToDate('');
    setIsInvalid(false);
    if (onPeriodChange) {
      onPeriodChange('', '');
    }
  };

  const displayText = fromDate && toDate 
    ? `${formatDateForDisplay(fromDate)} - ${formatDateForDisplay(toDate)}`
    : 'Pilih Periode';

  return (
    <div className={`relative inline-block ${className || ''}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-1.5 rounded-lg border border-gray-300 bg-white px-5 py-0.5 font-inter text-xs font-medium text-[#666666] hover:bg-gray-50 md:gap-2 md:px-3 md:py-2 md:text-sm lg:w-72"
      >
        <div className="flex items-center gap-1.5 md:gap-2">
          <CalendarSearch size={14} color="#666666" className="md:hidden" />
          <CalendarSearch size={16} color="#666666" className="hidden md:block" />
          <span className="text-sm">{displayText}</span>
        </div>
        
        {fromDate && toDate ? (
          <X 
            size={14} 
            color="#666666" 
            onClick={handleReset}
            className="cursor-pointer hover:text-gray-800 md:hidden"
          />
        ) : (
          <RotateCcw size={14} color="#666666" className="md:hidden" />
        )}
        {fromDate && toDate ? (
          <X 
            size={16} 
            color="#666666" 
            onClick={handleReset}
            className="hidden cursor-pointer hover:text-gray-800 md:block"
          />
        ) : (
          <RotateCcw size={16} color="#666666" className="hidden md:block" />
        )}
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-2 w-80 rounded-lg border border-gray-300 bg-white shadow-xl">
          <div className="p-4">
            <div className="mb-4 flex items-start gap-3">
              <div className="flex-1">
                <label className="mb-1.5 block font-inter text-xs font-semibold leading-5 tracking-[-0.02em] text-[#419E6A]">
                  From
                </label>
                <input
                  type="text"
                  placeholder="MM/YYYY"
                  value={tempFromDate}
                  onChange={(e) => {
                    setTempFromDate(e.target.value);
                    setIsInvalid(false);
                  }}
                  className="w-full rounded bg-white px-3 py-2 font-inter text-sm text-black placeholder:text-gray-400 hover:border-b-2 hover:border-b-[#419E6A] focus:border-[#419E6A] focus:outline-none focus:ring-1 focus:ring-[#419E6A]"
                />
              </div>

              <div className="relative  mt-7 h-8 w-px bg-[#BABABA66]" />
              <div className="flex-1">
                <label className="mb-1.5 block font-inter text-xs font-semibold leading-5 tracking-[-0.02em] text-[#419E6A]">
                  To
                </label>
                <input
                  type="text"
                  placeholder="MM/YYYY"
                  value={tempToDate}
                  onChange={(e) => {
                    setTempToDate(e.target.value);
                    setIsInvalid(false);
                  }}
                  className="w-full rounded  bg-white px-3 py-2 font-inter text-sm text-black placeholder:text-gray-400 hover:border-b-2 hover:border-b-[#419E6A] focus:border-[#419E6A] focus:outline-none focus:ring-1 focus:ring-[#419E6A]"
                />
              </div>
            </div>

            {/* Horizontal Separator before button */}
            <div className="mb-4 border-t border-[#BABABA66]" style={{ marginLeft: '8px', marginRight: '8px' }} />

            {/* Bottom Section - Invalid Message & Button */}
            <div className="flex items-center justify-between gap-3">
              {/* Invalid Message */}
              <div className="flex-1">
                {isInvalid && (
                  <p className="font-inter text-xs text-red-500">
                    Input Tidak Valid
                  </p>
                )}
              </div>

              {/* Apply Button */}
              <button
                onClick={handleApply}
                className="rounded-md bg-black px-6 py-2 font-inter text-sm font-medium text-white hover:bg-gray-800"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};