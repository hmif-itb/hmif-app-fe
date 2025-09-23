import { X, ChevronDown } from 'lucide-react';
import { useState, useRef, DragEvent } from 'react';

export interface SekreFormData {
  name: string;
  condition: 'new' | 'used';
  location: string;
  photo?: string;
}

interface EditSekreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: SekreFormData) => void;
  data: SekreFormData;
  locations: string[];
}

export function EditSekreModal({
  isOpen,
  onClose,
  onConfirm,
  data,
  locations,
}: EditSekreModalProps) {
  const [formData, setFormData] = useState<SekreFormData>({
    name: data.name,
    condition: data.condition,
    location: data.location,
    photo: data.photo || '',
  });
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleConfirm = () => {
    console.log('Editing sekre with data:', formData);
    onConfirm(formData);
    onClose();
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleImageFile(files[0]);
    }
  };

  const handleImageFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setFormData({ ...formData, photo: result });
        console.log('Image uploaded:', file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageFile(file);
    }
  };

  const clearImage = () => {
    setFormData({ ...formData, photo: '' });
    console.log('Image cleared');
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
          Edit Sekre
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
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-gray-400 focus:outline-none"
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
                className="w-full appearance-none rounded-lg border border-gray-300 px-4 py-3 pr-10 text-sm focus:border-gray-400 focus:outline-none"
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
                className="w-full appearance-none rounded-lg border border-gray-300 px-4 py-3 pr-10 text-sm focus:border-gray-400 focus:outline-none"
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

          {/* Foto Field */}
          <div>
            <label className="mb-2 block text-sm font-medium text-black">
              Foto
            </label>
            <div
              className={`relative aspect-[2/1] w-full cursor-pointer overflow-hidden rounded-lg bg-gray-100 ${
                isDragging ? 'border-2 border-dashed border-gray-400' : ''
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              {formData.photo ? (
                <>
                  <img
                    src={formData.photo}
                    alt="Property"
                    className="h-full w-full object-cover"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      clearImage();
                    }}
                    className="absolute bottom-2 right-2 rounded-full bg-red-500 px-3 py-1 text-xs text-white hover:bg-red-600"
                  >
                    Clear
                  </button>
                </>
              ) : (
                <div className="flex h-full items-center justify-center text-gray-400">
                  <p>Drag & drop image here or click to select</p>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
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
