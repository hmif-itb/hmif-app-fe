import { X, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export interface PropertyFormData {
  name: string;
  condition: 'new' | 'used';
  amount: number;
  location: string;
}

interface EditPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: PropertyFormData) => void;
  data: PropertyFormData;
  locations: string[];
}

export function EditPropertyModal({
  isOpen,
  onClose,
  onConfirm,
  data,
  locations,
}: EditPropertyModalProps) {
  const [formData, setFormData] = useState<PropertyFormData>({
    name: data.name,
    condition: data.condition,
    amount: data.amount,
    location: data.location,
  });

  if (!isOpen) return null;

  const handleConfirm = () => {
    console.log('Editing property with data:', formData);
    onConfirm(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative mx-[30px] w-[564px] rounded-[15px] bg-white shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 transition-colors hover:bg-gray-100"
        >
          <X size={30} className="text-[#1D1B20]" />
        </button>

        {/* Title */}
        <h2 className="w-full py-6 text-center text-xl font-semibold text-black">
          Edit Properti
        </h2>

        <hr className="border-t-2 border-[#A1A1A1]" />

        {/* Form Fields */}
        <div className="flex flex-col gap-5 p-6">
          {/* Nama Field */}
          <div>
            <label className="mb-2 block text-sm font-medium text-black">
              Nama
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-gray-400 focus:outline-none"
            />
          </div>

          {/* Kondisi Field */}
          <div>
            <label className="mb-2 block text-sm font-medium text-black">
              Kondisi
            </label>
            <div className="relative">
              <select
                value={formData.condition}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    condition: e.target.value as 'new' | 'used',
                  })
                }
                className="w-full appearance-none rounded-xl border border-gray-300 px-4 py-3 pr-10 text-sm focus:border-gray-400 focus:outline-none"
              >
                <option value="new">Baik</option>
                <option value="used">Rusak</option>
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                size={20}
              />
            </div>
          </div>

          {/* Jumlah Field */}
          <div>
            <label className="mb-2 block text-sm font-medium text-black">
              Jumlah
            </label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  amount: parseInt(e.target.value) || 0,
                })
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-gray-400 focus:outline-none"
            />
          </div>

          {/* Lokasi Field */}
          <div>
            <label className="mb-2 block text-sm font-medium text-black">
              Lokasi
            </label>
            <div className="relative">
              <select
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="w-full appearance-none rounded-xl border border-gray-300 px-4 py-3 pr-10 text-sm focus:border-gray-400 focus:outline-none"
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                size={20}
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 p-6">
          <button
            onClick={onClose}
            className="flex-1 rounded-full border border-black px-6 py-3 font-medium text-black transition-colors hover:bg-gray-50"
          >
            Batal
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 rounded-full bg-[#305138] px-6 py-3 font-medium text-white transition-colors hover:bg-[#305138]/90"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
