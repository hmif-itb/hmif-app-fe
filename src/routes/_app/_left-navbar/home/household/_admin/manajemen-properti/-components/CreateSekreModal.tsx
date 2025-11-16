import { X, ChevronDown, Loader2 } from 'lucide-react';
import { useState, useRef, DragEvent, ChangeEvent, MouseEvent } from 'react';
import { CreatePropertiBodySchema } from '~/api/generated';
import { useUploadFile } from '~/hooks/household';

interface CreateSekreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: CreatePropertiBodySchema) => void;
  locations: string[];
  isSubmitting: boolean;
}

export function CreateSekreModal({
  isOpen,
  onClose,
  onConfirm,
  locations,
  isSubmitting,
}: CreateSekreModalProps) {
  const [formData, setFormData] = useState<CreatePropertiBodySchema>({
    name: '',
    condition: 'good',
    description: '',
    category: 'sekre',
    quantity: 1,
    location: 'Sekretariat 1',
    photo: '',
    status: 'available',
  });
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutateAsync: uploadFile, isPending: isUploading } = useUploadFile();
  const internalIsLoading = isSubmitting || isUploading;

  if (!isOpen) return null;

  const handleConfirm = async () => {
    try {
      let finalPhotoUrl: string = '';
      if (selectedFile) {
        const uploadResult = await uploadFile(selectedFile);
        finalPhotoUrl = uploadResult.mediaUrl;
      }
      
      onConfirm({ ...formData, photo: finalPhotoUrl });

      onClose();

      setFormData({
        name: '',
        condition: 'good',
        description: '',
        category: 'sekre',
        quantity: 1,
        location: 'Sekretariat 1',
        photo: '',
        status: 'available',
      });
      setSelectedFile(null);
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

    } catch (error) {
      console.error('Gagal mengunggah foto:', error);
      alert('Gagal mengunggah foto. Silakan coba lagi.');
    }
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
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
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

  const clearImage = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setSelectedFile(null);
    setImagePreview(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative mx-[30px] w-[564px] rounded-[15px] bg-white shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 transition-colors hover:bg-gray-100"
        >
          <X size={30} className="text-[#1D1B20]" />
        </button>

        <h2 className="w-full py-6 text-center text-xl font-semibold text-black">
          Tambah Sekre
        </h2>

        <hr className="border-t-2 border-[#A1A1A1]" />

        <div className="flex flex-col gap-5 p-6">
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
              placeholder="Masukkan nama sekre"
            />
          </div>

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
                    condition: e.target.value as
                      | 'good'
                      | 'broken'
                      | 'cant_be_used'
                      | 'lost',
                  })
                }
                className="w-full appearance-none rounded-lg border border-gray-300 px-4 py-3 pr-10 text-sm focus:border-gray-400 focus:outline-none"
              >
                <option value="good">Baik</option>
                <option value="broken">Rusak Ringan</option>
                <option value="cant_be_used">Rusak Berat</option>
                <option value="lost">Hilang</option>
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                size={20}
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-black">
              Lokasi
            </label>
            <div className="relative">
              <select
                value={formData.location}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    location: e.target.value as
                      | 'Sekretariat 1'
                      | 'Sekretariat 2'
                      | 'Jatinangor',
                  })
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
              {imagePreview ? (
                <>
                  <img
                    src={imagePreview}
                    alt="Property"
                    className="h-full w-full object-cover"
                  />
                  <button
                    onClick={clearImage}
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

        <div className="flex gap-2 p-6">
          <button
            onClick={onClose}
            className="flex-1 rounded-full border border-black px-6 py-3 font-medium text-black transition-colors hover:bg-gray-50"
            disabled={internalIsLoading}
          >
            Batal
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 rounded-full bg-[#305138] px-6 py-3 font-medium text-white transition-colors hover:bg-[#305138]/90"
            disabled={internalIsLoading}
          >
            {internalIsLoading ? <Loader2 className="mx-auto h-4 w-4 animate-spin" /> : 'Tambah'}
          </button>
        </div>
      </div>
    </div>
  );
}