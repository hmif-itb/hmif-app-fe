import { X, ChevronDown, Upload, Loader2 } from 'lucide-react';
import {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  DragEvent,
  MouseEvent,
} from 'react';
import { PropertyFormData } from '../../../-types';
import type { UpdatePropertiBodySchema } from '~/api/generated';
import { useUploadFile } from '~/hooks/household';

interface EditPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: UpdatePropertiBodySchema) => void;
  data: PropertyFormData & { photo?: string | null };
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
    quantity: data.quantity,
    location: data.location,
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    data.photo || null,
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { mutateAsync: uploadFile, isPending: isUploading } = useUploadFile();

  useEffect(() => {
    if (isOpen) {
      setImagePreview(data.photo || null);
    }
  }, [isOpen, data.photo]);

  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview !== data.photo) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview, data.photo]);

  if (!isOpen) return null;

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

  const handleConfirm = async () => {
    console.log('Editing property with data:', formData);

    let finalPhotoUrl: string | undefined = undefined;

    try {
      if (selectedFile) {
        const uploadResult = await uploadFile(selectedFile);
        finalPhotoUrl = uploadResult.mediaUrl;
      } else if (imagePreview) {
        finalPhotoUrl = imagePreview;
      }

      const payload: UpdatePropertiBodySchema = {
        name: formData.name,
        condition: formData.condition,
        quantity: formData.quantity,
        location: formData.location as UpdatePropertiBodySchema['location'],
        ...(finalPhotoUrl !== undefined && { photo: finalPhotoUrl }),
      };

      onConfirm(payload);
      onClose();
    } catch (error) {
      console.error('Gagal upload foto:', error);
      alert('Gagal mengunggah foto.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative mx-auto flex max-h-[90vh] w-full max-w-[564px] flex-col rounded-[15px] bg-white shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 transition-colors hover:bg-gray-100"
        >
          <X size={30} className="text-[#1D1B20]" />
        </button>

        <h2 className="w-full py-6 text-center text-xl font-semibold text-black">
          Edit Properti
        </h2>

        <hr className="border-t-2 border-[#A1A1A1]" />

        {/* Form Fields */}
        <div className="flex flex-col gap-5 overflow-y-auto p-6">
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
                    condition: e.target.value as
                      | 'good'
                      | 'broken'
                      | 'cant_be_used'
                      | 'lost',
                  })
                }
                className="w-full appearance-none rounded-xl border border-gray-300 px-4 py-3 pr-10 text-sm focus:border-gray-400 focus:outline-none"
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

          {/* Jumlah Field */}
          <div>
            <label className="mb-2 block text-sm font-medium text-black">
              Jumlah
            </label>
            <input
              type="number"
              value={formData.quantity}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  quantity: parseInt(e.target.value) || 0,
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

          {/* Foto Field */}
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
                    {selectedFile?.name || 'Current Photo'}
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
                      Upload foto properti
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

        {/* Buttons */}
        <div className="flex gap-2 p-6">
          <button
            onClick={onClose}
            className="flex-1 rounded-full border border-black px-6 py-3 font-medium text-black transition-colors hover:bg-gray-50"
            disabled={isUploading}
          >
            Batal
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 rounded-full bg-[#305138] px-6 py-3 font-medium text-white transition-colors hover:bg-[#305138]/90 disabled:cursor-not-allowed disabled:bg-gray-400"
            disabled={isUploading}
          >
            {isUploading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Mengupload...</span>
              </div>
            ) : (
              'Edit'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
