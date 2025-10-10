import React, { forwardRef, useEffect, useState } from 'react';
import { Upload, File, X, ExternalLink } from 'lucide-react';

interface FormFileUploadProps {
  label: string;
  required?: boolean;
  error?: string;
  description?: string;
  currentFile?: string | null;
  onChange?: (file: File | null) => void;
  value?: File | string | null;
}

export const UploadFile = forwardRef<HTMLInputElement, FormFileUploadProps>(
  ({ label, required, error, description, currentFile, onChange }, ref) => {
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [existingFileUrl, setExistingFileUrl] = useState<string | null>(
      currentFile || null,
    );
    const [displayName, setDisplayName] = useState<string>('');

    useEffect(() => {
      if (currentFile && !uploadedFile) {
        setExistingFileUrl(currentFile);
        try {
          const url = new URL(currentFile);
          const pathParts = url.pathname.split('/');
          const filename = pathParts[pathParts.length - 1];
          setDisplayName(decodeURIComponent(filename));
        } catch {
          setDisplayName('Existing file');
        }
      }
    }, [currentFile, uploadedFile]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setUploadedFile(file);
        setDisplayName(file.name);
        setExistingFileUrl(null);
        onChange?.(file);
      }
    };

    const handleRemoveFile = () => {
      setUploadedFile(null);
      setDisplayName('');
      setExistingFileUrl(null);
      onChange?.(null);

      // Reset input value
      const inputElement = document.querySelector(
        `input[type="file"][data-label="${label}"]`,
      ) as HTMLInputElement;
      if (inputElement) {
        inputElement.value = '';
      }
    };

    const handleViewFile = (e: React.MouseEvent) => {
      e.preventDefault();
      if (existingFileUrl) {
        window.open(existingFileUrl, '_blank');
      }
    };

    const hasFile = uploadedFile || existingFileUrl;

    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-900">
          {label} {required && <span className="text-red-500">*</span>}
        </label>

        {description && <p className="text-xs text-gray-600">{description}</p>}

        {hasFile ? (
          <div className="space-y-2">
            <div className="flex max-w-full items-center justify-between gap-2 rounded-xl border border-[#BABABA4D] bg-[#FCFCFC] p-3">
              <div className="flex min-w-0 flex-1 items-center gap-2">
                <File className="size-4 shrink-0 text-red-600" />
                <span className="truncate text-sm text-black">
                  {displayName}
                </span>
              </div>
              <div className="flex items-center gap-1">
                {existingFileUrl && !uploadedFile && (
                  <button
                    type="button"
                    onClick={handleViewFile}
                    className="text-blue-600 transition-colors hover:text-blue-800"
                    title="View file"
                  >
                    <ExternalLink className="size-4" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="text-gray-600 transition-colors hover:text-red-600"
                  title="Remove file"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>

            {/* {existingFileUrl && !uploadedFile && (
              <p className="text-xs text-gray-500">
                📎 File yang sudah ada (klik ikon untuk melihat)
              </p>
            )} */}

            {uploadedFile && (
              <p className="text-xs text-green-600">File baru dipilih</p>
            )}
          </div>
        ) : (
          <div className="relative">
            <input
              ref={ref}
              type="file"
              data-label={label}
              className="absolute inset-0 size-full cursor-pointer opacity-0"
              onChange={handleFileChange}
              accept="image/*,.pdf,.doc,.docx"
            />
            <div
              className={`flex w-36 cursor-pointer items-center gap-2 rounded-xl border px-3 py-2.5 transition-colors hover:bg-gray-50 ${
                error
                  ? 'border-red-300 bg-red-50'
                  : 'border-gray-300 bg-[#FCFCFC]'
              }`}
            >
              <Upload className="size-4 text-black" />
              <span className="text-sm text-black">Upload file</span>
            </div>
          </div>
        )}

        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    );
  },
);

UploadFile.displayName = 'FormFileUpload';
