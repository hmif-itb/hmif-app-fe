import { NotebookPen, Upload, X, Loader2, ChevronDown } from 'lucide-react';
import React, {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  FormEvent,
  DragEvent,
  MouseEvent,
  useMemo,
} from 'react';
import { Button } from '~/components/ui/button';
import { Textarea } from '~/components/ui/textarea';
import ConfirmationModal from './ConfirmationModal';
import SuccessModal from './SuccessModal';
import {
  useCreateLaporan,
  useUploadFile,
  useGetWargaPropertiList,
} from '~/hooks/household';

function SubmissionForm(): JSX.Element {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [reportText, setReportText] = useState<string>('');
  const [propertiId, setPropertiId] = useState<string>('');
  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { data: propertiList = [] } = useGetWargaPropertiList({
    category: 'properti',
  });
  const { data: sekreList = [] } = useGetWargaPropertiList({
    category: 'sekre',
  });

  const allProperti = useMemo(
    () => [...propertiList, ...sekreList],
    [propertiList, sekreList],
  );

  const { mutateAsync: uploadFile, isPending: isUploading } = useUploadFile();
  const { mutate: createLaporan, isPending: isSubmitting } = useCreateLaporan();

  const isLoading = isUploading || isSubmitting;

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

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!propertiId) {
      alert('Mohon pilih properti yang ingin dilaporkan.');
      return;
    }
    setShowConfirmationModal(true);
  };

  const handleConfirmSubmission = async (): Promise<void> => {
    setShowConfirmationModal(false);
    let finalMediaUrl: string | null = null;

    try {
      if (selectedFile) {
        const uploadResult = await uploadFile(selectedFile);
        finalMediaUrl = uploadResult.mediaUrl;
      }

      createLaporan(
        {
          propertiId: propertiId,
          deskripsi: reportText,
          fotoUrl: finalMediaUrl,
        },
        {
          onSuccess: () => {
            setShowSuccessModal(true);
            setReportText('');
            setSelectedFile(null);
            setImagePreview(null);
            setPropertiId('');
            if (fileInputRef.current) {
              fileInputRef.current.value = '';
            }
          },
          onError: (error) => {
            console.error('Gagal membuat laporan:', error);
            alert(`Gagal membuat laporan: ${error.message}`);
          },
        },
      );
    } catch (error) {
      console.error('Gagal upload atau submit laporan:', error);
      alert('Gagal mengunggah file atau mengirim data.');
    }
  };

  const handleCloseConfirmationModal = (): void => {
    setShowConfirmationModal(false);
  };

  const handleCloseSuccessModal = (): void => {
    setShowSuccessModal(false);
  };

  const handleReportTextChange = (
    event: ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    setReportText(event.target.value);
  };

  useEffect((): (() => void) | void => {
    return (): void => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-[28px] rounded-xl bg-white px-[30px] py-[34px]"
      >
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-[8px] bg-[#E8C55F]">
            <NotebookPen size={24} />
          </div>
          <h2 className="text-base font-semibold">Formulir Laporan</h2>
        </div>

        <div className="space-y-2">
          <label htmlFor="properti" className="text-sm text-black">
            Properti yang Dilaporkan*
          </label>
          <div className="relative">
            <select
              id="properti"
              value={propertiId}
              onChange={(e) => setPropertiId(e.target.value)}
              className="w-full appearance-none rounded-xl border border-gray-300 px-4 py-3 pr-10 text-sm focus:border-gray-400 focus:outline-none"
              required
            >
              <option value="" disabled>
                Pilih properti atau sekre...
              </option>
              {allProperti.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.category})
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              size={20}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="laporan" className="text-sm text-black">
            Laporan*
          </label>
          <Textarea
            id="laporan"
            name="laporan"
            placeholder="Deskripsikan masalah atau laporanmu..."
            className="h-[184px]"
            value={reportText}
            onChange={handleReportTextChange}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="foto-pendukung" className="text-sm text-black">
            Foto Pendukung (Opsional)
          </label>
          <div
            onClick={handleUploadClick}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={`cursor-pointer overflow-x-hidden rounded-xl border border-dashed  border-[#BABABA4D] transition-colors hover:bg-gray-50 ${
              imagePreview
                ? 'h-[184px] md:h-[440px]'
                : 'flex h-[184px] flex-col items-center justify-center'
            }`}
          >
            <input
              ref={fileInputRef}
              id="foto-pendukung"
              name="foto-pendukung"
              type="file"
              accept="image/jpeg,image/png"
              onChange={handleFileSelect}
              className="hidden"
            />
            {imagePreview ? (
              <>
                <div className="relative hidden h-full w-full md:block">
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
                <div className="flex h-full flex-col items-center justify-center md:hidden">
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="size-20 rounded-xl object-cover"
                    />
                    <button
                      onClick={handleClearImage}
                      className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full bg-red-500 text-white transition-colors hover:bg-red-600"
                      type="button"
                    >
                      <X size={12} />
                    </button>
                  </div>
                  <span className="mt-2 text-center text-sm text-gray-600">
                    {selectedFile?.name || ''}
                  </span>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-5">
                <div className="flex size-[48px] items-center justify-center rounded-[8px] bg-[#F0F0F0]">
                  <Upload size={28} className="text-gray-600" />
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-sm text-gray-600">
                    Upload foto pendukung
                  </span>
                  <span className="text-xs text-gray-500">
                    Format: JPG, PNG, maksimal 5MB
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-[#E2C66F] text-[#333333] hover:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            'Ajukan Laporan'
          )}
        </Button>
      </form>

      <ConfirmationModal
        isOpen={showConfirmationModal}
        onClose={handleCloseConfirmationModal}
        onConfirm={handleConfirmSubmission}
        reportData={reportText}
        selectedFile={selectedFile}
        imagePreview={imagePreview}
      />

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseSuccessModal}
      />
    </>
  );
}

export default SubmissionForm;
