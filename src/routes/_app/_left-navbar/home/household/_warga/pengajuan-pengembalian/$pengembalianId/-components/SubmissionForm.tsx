import { NotebookPen, Upload, X } from 'lucide-react';
import React, {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  FormEvent,
  DragEvent,
  MouseEvent,
} from 'react';
import { Button } from '~/components/ui/button';
import { Textarea } from '~/components/ui/textarea';
import ConfirmationModal from './ConfirmationModal';
import SuccessModal from './SuccessModal';

interface FormData {
  report: string;
  file: File | null;
}

function SubmissionForm(): JSX.Element {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [reportText, setReportText] = useState<string>('');
  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Image preview URL
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
      // Image preview URL
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
    // Show confirmation modal
    setShowConfirmationModal(true);
  };

  const handleConfirmSubmission = (): void => {
    // Close confirmation modal
    setShowConfirmationModal(false);

    const formData: FormData = {
      report: reportText,
      file: selectedFile,
    };

    // TODO: Ganti logic BE
    console.log('Form submitted with data:', formData);

    setShowSuccessModal(true);

    // Reset form
    setReportText('');
    setSelectedFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
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

  // Cleanup object URL when component unmounts or image changes
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
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-[8px] bg-[#E8C55F]">
            <NotebookPen size={24} />
          </div>
          <h2 className="text-base font-semibold">Formulir Pengembalian</h2>
        </div>

        {/* Detail Pengembalian */}
        <div className="space-y-2">
          <label htmlFor="laporan" className="text-sm text-black">
            Detail Pengembalian*
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

        {/* Foto Bukti */}
        <div className="space-y-2">
          <label htmlFor="foto-pendukung" className="text-sm text-black">
            Foto Bukti Pengembalian
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
                {/* Desktop View */}
                <div className="relative hidden h-full w-full md:block">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-full w-full rounded-xl object-cover"
                  />
                  {/* Filename - Bottom Left */}
                  <div className="absolute bottom-2 left-2 rounded bg-blue-500 px-2 py-1 text-xs text-white">
                    {selectedFile?.name || ''}
                  </div>
                  {/* Clear Button - Bottom Right */}
                  <button
                    onClick={handleClearImage}
                    className="absolute bottom-2 right-2 flex size-6 items-center justify-center rounded-full bg-red-500 text-white transition-colors hover:bg-red-600"
                    type="button"
                  >
                    <X size={14} />
                  </button>
                </div>

                {/* Mobile View */}
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

        {/* Button */}
        <Button
          type="submit"
          className="w-full bg-[#E2C66F] text-[#333333] hover:opacity-50"
        >
          Ajukan Pengembalian
        </Button>
      </form>

      {/* Modals */}
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
