import { X, ChevronDown, Loader2, Upload } from 'lucide-react';
import {
  useState,
  useRef,
  DragEvent,
  MouseEvent,
  useEffect,
  ChangeEvent,
} from 'react';
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutateAsync: uploadFile, isPending: isUploading } = useUploadFile();
  const internalIsLoading = isSubmitting || isUploading;

  useEffect(() => {
    if (!isOpen) {
      // Reset form when modal closes
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
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    try {
      let finalPhotoUrl: string = '';
      if (selectedFile) {
        const uploadResult = await uploadFile(selectedFile);
        finalPhotoUrl = uploadResult.mediaUrl;
      }

      onConfirm({ ...formData, photo: finalPhotoUrl });
    } catch (error) {
      console.error('Gagal mengunggah foto:', error);
      alert('Gagal mengunggah foto. Silakan coba lagi.');
    }
  };

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const handleUploadClick = (): void => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setSelectedFile(file);
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const handleClearImage = (event: MouseEvent<HTMLButtonElement>): void => {
    event.stopPropagation();
    setSelectedFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative mx-auto flex max-h-[90vh] w-full max-w-[564px] flex-col rounded-[15px] bg-white shadow-xl">
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

        <div className="flex flex-col gap-5 overflow-y-auto p-6">
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
              Foto (Opsional)
            </label>
            <div
              onClick={handleUploadClick}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className={`cursor-pointer overflow-hidden rounded-xl border border-dashed border-[#BABABA4D] transition-colors hover:bg-gray-50 ${
                imagePreview
                  ? 'h-[184px]'
                  : 'flex h-[184px] flex-col items-center justify-center'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png"
                onChange={handleFileSelect}
                className="hidden"
              />
              {imagePreview ? (
                <div className="relative h-full w-full">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-full w-full rounded-xl object-cover"
                  />
                  <div className="absolute bottom-2 left-2 rounded bg-blue-500 px-2 py-1 text-xs text-white">
                    {selectedFile?.name || ''}
                  </div>
                  <button
                    onClick={handleClearImage}
                    className="absolute bottom-2 right-2 flex size-6 items-center justify-center rounded-full bg-red-500 text-white transition-colors hover:bg-red-600"
                    type="button"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-5">
                  <div className="flex size-[48px] items-center justify-center rounded-[8px] bg-[#F0F0F0]">
                    <Upload size={28} className="text-gray-600" />
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-600">
                      Upload foto sekre
                    </span>
                    <span className="text-xs text-gray-500">
                      Format: JPG, PNG, maksimal 5MB
                    </span>
                  </div>
                </div>
              )}
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
            className="flex-1 rounded-full bg-[#305138] px-6 py-3 font-medium text-white transition-colors hover:bg-[#305138]/90 disabled:cursor-not-allowed disabled:bg-gray-400"
            disabled={internalIsLoading}
          >
            {internalIsLoading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>{isUploading ? 'Mengupload...' : 'Menyimpan...'}</span>
              </div>
            ) : (
              'Tambah'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
