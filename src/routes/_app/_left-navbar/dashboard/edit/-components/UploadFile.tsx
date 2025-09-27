import React, { forwardRef } from 'react';
import { Upload, File, X } from 'lucide-react';

interface FormFileUploadProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  error?: string;
  description?: string;
  fileName?: string;
}

export const UploadFile = forwardRef<HTMLInputElement, FormFileUploadProps>(
  ({ label, required, error, description, fileName = '', ...props }, ref) => {
    const [uploadedFile, setUploadedFile] = React.useState<string | null>(
      fileName || null,
    );

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setUploadedFile(file.name);
      }
    };

    const handleRemoveFile = () => {
      setUploadedFile(null);
      if (ref && 'current' in ref && ref.current) {
        ref.current.value = '';
      }
    };

    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-900">
          {label} {required && <span className="text-red-500">*</span>}
        </label>

        {description && <p className="text-xs text-gray-600">{description}</p>}

        {uploadedFile ? (
          <div className="flex w-36 items-center justify-between gap-2 rounded-xl border border-[#BABABA4D] bg-[#FCFCFC]  p-3">
            <div className="flex items-center gap-2">
              <File className="size-4 text-red-600" />
              <span className="text-sm text-black">{uploadedFile}</span>
            </div>
            <button
              type="button"
              onClick={handleRemoveFile}
              className="text-red-600 transition-colors hover:text-red-800"
            >
              <X color="#666666" />
            </button>
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
            <div className="flex w-36 cursor-pointer items-center gap-2  rounded-xl border  border-gray-300 bg-[#FCFCFC]  px-3 py-2.5 transition-colors hover:bg-gray-50">
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
