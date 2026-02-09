import { NotebookPen, Upload, X, Loader2 } from 'lucide-react';
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
import { useNavigate, useParams } from '@tanstack/react-router';
import { useSubmitPengembalian, useUploadFile } from '~/hooks/household';
import { Route } from '../index';

function SubmissionForm(): JSX.Element {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [reportText, setReportText] = useState<string>('');
  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();
  const { pengembalianId } = Route.useParams();

  const { mutateAsync: uploadFile, isPending: isUploading } = useUploadFile();
  const { mutate: submitReturn, isPending: isSubmitting } =
    useSubmitPengembalian();

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
    if (!selectedFile) {
      alert('Mohon unggah foto bukti pengembalian.');
      return;
    }
    setShowConfirmationModal(true);
  };

  const handleConfirmSubmission = async (): Promise<void> => {
    setShowConfirmationModal(false);
    if (!selectedFile) return;

    try {
      const uploadResult = await uploadFile(selectedFile);
      const buktiFotoFinalUrl = uploadResult.mediaUrl;

      submitReturn(
        {
          peminjamanId: pengembalianId,
          data: { buktiFotoUrl: buktiFotoFinalUrl },
        },
        {
          onSuccess: () => {
            console.log(
              '✅ Pengembalian berhasil disubmit ke backend:',
              buktiFotoFinalUrl,
            );
            setShowSuccessModal(true);
            setReportText('');
            setSelectedFile(null);
            setImagePreview(null);
            if (fileInputRef.current) {
              fileInputRef.current.value = '';
            }
          },
          onError: (error) => {
            console.error('Gagal submit pengembalian:', error);
            alert(`Gagal submit: ${error.message}`);
          },
        },
      );
    } catch (error) {
      console.error('Gagal upload atau submit pengembalian:', error);
      alert('Gagal mengunggah file bukti.');
    }
  };

  const handleCloseConfirmationModal = (): void => {
    setShowConfirmationModal(false);
  };

  const handleCloseSuccessModal = (): void => {
    setShowSuccessModal(false);
    navigate({ to: '/home/household/peminjaman' });
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
          <h2 className="text-base font-semibold">Formulir Pengembalian</h2>
        </div>

        <div className="space-y-2">
          <label htmlFor="foto-pendukung" className="text-sm text-black">
            Foto Bukti Pengembalian*
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
            'Ajukan Pengembalian'
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
