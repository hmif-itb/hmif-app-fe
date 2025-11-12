import { Upload, File, Trash } from 'lucide-react';
import { Button } from '~/components/ui/button';
import React, { useState, useRef, useEffect } from 'react';

interface UploadButtonProps {
  text: string;
  onFileSelect?: (file: File) => void;
  onFileRemove?: () => void;
  accept?: string;
  className?: string;
  disabled?: boolean;
  maxWidth?: string;
  onInvalidFile?: (error: string) => void;
  initialFile?: File | null; // Initial file prop
  initialUrl?: string | null; // Initial URL prop for existing files
}

// Upload button untuk upload file
export function UploadButton({
  text,
  onFileSelect,
  onFileRemove,
  accept = '*/*', // Default accept semua file
  className = '',
  disabled = false,
  maxWidth = '80px',
  onInvalidFile,
  initialFile = null,
  initialUrl = null,
}: UploadButtonProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(initialFile);
  const [existingFileUrl, setExistingFileUrl] = useState<string | null>(
    initialUrl,
  );
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Update existing file URL when prop changes
  useEffect(() => {
    setExistingFileUrl(initialUrl);
  }, [initialUrl]);

  // Function to validate file type based on accept prop
  const validateFileType = (file: File): boolean => {
    if (accept === '*/*') return true;

    const acceptedTypes = accept.split(',').map((type) => type.trim());

    for (const acceptedType of acceptedTypes) {
      // Handle MIME types (e.g., "image/*", "application/pdf")
      if (acceptedType.includes('/')) {
        if (acceptedType.endsWith('/*')) {
          const baseType = acceptedType.split('/')[0];
          if (file.type.startsWith(baseType + '/')) return true;
        } else if (file.type === acceptedType) {
          return true;
        }
      }
      // Handle file extensions (e.g., ".pdf", ".jpg")
      else if (acceptedType.startsWith('.')) {
        const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
        if (fileExtension === acceptedType.toLowerCase()) return true;
      }
    }
    return false;
  };

  // Function to get readable file types from accept prop
  const getAcceptedFileTypes = (): string => {
    if (accept === '*/*') return 'all file types';

    const types = accept.split(',').map((type) => type.trim());
    const readableTypes: string[] = [];

    types.forEach((type) => {
      if (type === 'image/*') readableTypes.push('images');
      else if (type === 'application/pdf') readableTypes.push('PDF');
      else if (type.startsWith('.')) readableTypes.push(type.toUpperCase());
      else readableTypes.push(type);
    });

    return readableTypes.join(', ');
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!validateFileType(file)) {
        const acceptedTypes = getAcceptedFileTypes();
        const errorMessage = `Invalid file type. Please select ${acceptedTypes} only.`;
        if (onInvalidFile) {
          onInvalidFile(errorMessage);
        }
        // Reset the input value to allow selecting the same file again
        event.target.value = '';
        return;
      }

      setSelectedFile(file);
      setExistingFileUrl(null); // Clear existing URL when new file is selected
      if (onFileSelect) {
        onFileSelect(file);
      }
    }
  };

  // Handling remove file di component -> callback ke parent
  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null); // Clear file di component
    setExistingFileUrl(null); // Clear existing URL
    if (onFileRemove) {
      onFileRemove(); // Callback ke parent
    }
  };

  // Trunc nama file yang diupload
  const truncateFileName = (fileName: string, maxLength: number = 20) => {
    if (fileName.length <= maxLength) return fileName;
    const extension = fileName.split('.').pop();
    const nameWithoutExt = fileName.substring(0, fileName.lastIndexOf('.'));
    const truncatedName = nameWithoutExt.substring(
      0,
      maxLength - extension!.length - 4,
    );
    return `${truncatedName}...${extension}`;
  };

  // Get filename from URL
  const getFileNameFromUrl = (url: string): string => {
    try {
      const urlObj = new URL(url);
      const pathname = urlObj.pathname;
      const fileName = pathname.split('/').pop() || 'existing-file';
      return fileName;
    } catch {
      return 'existing-file';
    }
  };

  const currentFileName = selectedFile
    ? selectedFile.name
    : existingFileUrl
      ? getFileNameFromUrl(existingFileUrl)
      : null;
  return (
    <div className={`relative inline-block w-fit ${className}`}>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
        disabled={disabled}
      />
      <Button
        variant="outlined"
        className={`z-50 flex cursor-pointer items-center gap-2 rounded-lg border border-[#BABABA]/30 bg-[#FCFCFC] text-xs font-semibold duration-300 ${
          className.includes('border-red-400') ? 'border-red-400' : ''
        }`}
        disabled={disabled}
        onClick={() => {
          if (disabled) return;
          if (inputRef.current) {
            inputRef.current.value = '';
            inputRef.current.click();
          }
        }}
      >
        {currentFileName ? (
          <>
            <File className="size-4" color="black" />
            <span
              className="flex-1 truncate"
              style={{ maxWidth }}
              title={currentFileName}
            >
              {truncateFileName(currentFileName, 15)}
            </span>
            <span
              onClick={handleRemoveFile}
              className="relative z-50 ml-1 rounded transition-colors hover:bg-red-100"
              title="Remove file"
            >
              <Trash className="size-4 text-red-500" />
            </span>
          </>
        ) : (
          <>
            <Upload className="size-4" color="black" />
            {text}
          </>
        )}
      </Button>
    </div>
  );
}
