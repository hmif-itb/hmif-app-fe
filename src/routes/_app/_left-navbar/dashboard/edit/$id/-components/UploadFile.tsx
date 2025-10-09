import React, { forwardRef, useEffect } from 'react';
import { Upload, File, X, ExternalLink } from 'lucide-react';

interface FormFileUploadProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  error?: string;
  description?: string;
  fileName?: string;
  currentFile?: string | null; // URL of existing file
}

export const UploadFile = forwardRef<HTMLInputElement, FormFileUploadProps>(
  (
    {
      label,
      required,
      error,
      description,
      fileName = '',
      currentFile,
      ...props
    },
    ref,
  ) => {
    const [uploadedFile, setUploadedFile] = React.useState<string | null>(
      fileName || null,
    );
    const [existingFileUrl, setExistingFileUrl] = React.useState<string | null>(
      currentFile || null,
    );
    const [hasNewFile, setHasNewFile] = React.useState(false);

    // Update when currentFile prop changes
    useEffect(() => {
      if (currentFile && !hasNewFile) {
        setExistingFileUrl(currentFile);
        // Extract filename from URL
        try {
          const url = new URL(currentFile);
          const pathParts = url.pathname.split('/');
          const filename = pathParts[pathParts.length - 1];
          setUploadedFile(decodeURIComponent(filename));
        } catch {
          setUploadedFile('Existing file');
        }
      }
    }, [currentFile, hasNewFile]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setUploadedFile(file.name);
        setHasNewFile(true);
        setExistingFileUrl(null);
      }
    };

    const handleRemoveFile = () => {
      setUploadedFile(null);
      setHasNewFile(false);
      setExistingFileUrl(null);
      if (ref && 'current' in ref && ref.current) {
        ref.current.value = '';
      }
    };

    const handleViewFile = (e: React.MouseEvent) => {
      e.preventDefault();
      if (existingFileUrl) {
        window.open(existingFileUrl, '_blank');
      }
    };

    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-900">
          {label} {required && <span className="text-red-500">*</span>}
        </label>

        {description && <p className="text-xs text-gray-600">{description}</p>}

        {uploadedFile ? (
          <div className="space-y-2">
            <div className="flex max-w-full items-center justify-between gap-2 rounded-xl border border-[#BABABA4D] bg-[#FCFCFC] p-3">
              <div className="flex min-w-0 flex-1 items-center gap-2">
                <File className="size-4 shrink-0 text-red-600" />
                <span className="truncate text-sm text-black">
                  {uploadedFile}
                </span>
              </div>
              <div className="flex items-center gap-1">
                {/* View button for existing files */}
                {existingFileUrl && !hasNewFile && (
                  <button
                    type="button"
                    onClick={handleViewFile}
                    className="text-blue-600 transition-colors hover:text-blue-800"
                    title="View file"
                  >
                    <ExternalLink className="size-4" />
                  </button>
                )}
                {/* Remove button */}
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

            {/* Show indicator if it's an existing file */}
            {existingFileUrl && !hasNewFile && (
              <p className="text-xs text-gray-500">
                📎 File yang sudah ada (klik ikon untuk melihat)
              </p>
            )}

            {/* Show indicator if it's a new file */}
            {hasNewFile && (
              <p className="text-xs text-green-600">
                ✓ File baru dipilih (akan diupload saat submit)
              </p>
            )}
          </div>
        ) : (
          <div className="relative">
            <input
              ref={ref}
              type="file"
              className="absolute inset-0 size-full cursor-pointer opacity-0"
              onChange={handleFileChange}
              {...props}
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
