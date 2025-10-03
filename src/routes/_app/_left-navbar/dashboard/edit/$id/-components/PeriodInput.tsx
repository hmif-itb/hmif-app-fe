import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

interface PeriodInputProps {
  label: string;
  required?: boolean;
  error?: string;
  onChange?: (from: string, to: string) => void;
  defaultFrom?: string;
  defaultTo?: string;
  placeholder?: string;
}

export const PeriodInput: React.FC<PeriodInputProps> = ({
  label,
  required = false,
  error,
  onChange,
  defaultFrom = '',
  defaultTo = '',
  placeholder = 'Pilih Periode ...',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [fromMonth, setFromMonth] = useState(defaultFrom.split('/')[0] || '');
  const [fromYear, setFromYear] = useState(defaultFrom.split('/')[1] || '');
  const [toMonth, setToMonth] = useState(defaultTo.split('/')[0] || '');
  const [toYear, setToYear] = useState(defaultTo.split('/')[1] || '');

  const handleFromChange = (month: string, year: string) => {
    setFromMonth(month);
    setFromYear(year);
  };

  const handleToChange = (month: string, year: string) => {
    setToMonth(month);
    setToYear(year);
  };

  const handleApply = () => {
    const fromValue = fromMonth && fromYear ? `${fromMonth}/${fromYear}` : '';
    const toValue = toMonth && toYear ? `${toMonth}/${toYear}` : '';
    onChange?.(fromValue, toValue);
    setIsOpen(false);
  };

  const displayValue = () => {
    const fromValue = fromMonth && fromYear ? `${fromMonth}/${fromYear}` : '';
    const toValue = toMonth && toYear ? `${toMonth}/${toYear}` : '';
    if (fromValue && toValue) {
      return `${fromValue} - ${toValue}`;
    }
    return '';
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-900">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          value={displayValue()}
          onClick={() => setIsOpen(true)}
          readOnly
          className={`w-full cursor-pointer rounded-lg border px-3 py-2.5 outline-none transition-colors focus:border-green-500 focus:ring-2 focus:ring-green-500 ${
            error ? 'border-red-300 bg-red-50' : 'border-gray-300'
          } ${displayValue() ? 'text-gray-900' : 'text-gray-500'}`}
          style={{ backgroundColor: error ? undefined : '#FCFCFC' }}
        />
        <Calendar className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-gray-500" />
      </div>

      {/* Period Picker Modal */}
      {isOpen && (
        <div className="absolute z-50 mt-1  w-72 rounded-lg border border-gray-300 bg-white p-4 shadow-lg">
          <div className="grid grid-cols-2 gap-4">
            {/* From Section */}
            <div className="space-y-2">
              <span
                className="block text-xs font-medium"
                style={{ color: '#419E6A' }}
              >
                From
              </span>
              <div className="flex justify-center gap-1">
                <input
                  type="text"
                  placeholder="01"
                  maxLength={2}
                  value={fromMonth}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    if (parseInt(value) <= 12 || value === '') {
                      handleFromChange(value, fromYear);
                    }
                  }}
                  className="w-10 rounded-lg border border-gray-300 px-1 py-2 text-center text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500"
                  style={{ backgroundColor: '#FCFCFC' }}
                />
                <span className="flex items-center text-sm text-gray-500">
                  /
                </span>
                <input
                  type="text"
                  placeholder="2005"
                  maxLength={4}
                  value={fromYear}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    handleFromChange(fromMonth, value);
                  }}
                  className="w-14 rounded-lg border border-gray-300 px-1 py-2 text-center text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500"
                  style={{ backgroundColor: '#FCFCFC' }}
                />
              </div>
            </div>

            <div
              className="space-y-2 border-l pl-4"
              style={{ borderColor: '#BABABA' }}
            >
              <span
                className="block text-xs font-medium"
                style={{ color: '#419E6A' }}
              >
                To
              </span>
              <div className="flex justify-center gap-1">
                <input
                  type="text"
                  placeholder="01"
                  maxLength={2}
                  value={toMonth}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    if (parseInt(value) <= 12 || value === '') {
                      handleToChange(value, toYear);
                    }
                  }}
                  className="w-10 rounded-lg border border-gray-300 px-1 py-2 text-center text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500"
                  style={{ backgroundColor: '#FCFCFC' }}
                />
                <span className="flex items-center text-sm text-gray-500">
                  /
                </span>
                <input
                  type="text"
                  placeholder="2006"
                  maxLength={4}
                  value={toYear}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    handleToChange(toMonth, value);
                  }}
                  className="w-14 rounded-lg border border-gray-300 px-1 py-2 text-center text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500"
                  style={{ backgroundColor: '#FCFCFC' }}
                />
              </div>
            </div>
          </div>

          <div className="mt-3 flex justify-end gap-2 border-t border-gray-200 pt-3">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-md px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="rounded-md bg-gray-900 px-4 py-1.5 text-sm text-white transition-colors hover:bg-gray-800"
            >
              Apply
            </button>
          </div>
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};
