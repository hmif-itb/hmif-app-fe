import { Upload, File, Trash } from 'lucide-react';
import { Button } from '~/components/ui/button';
import React, { useState } from 'react';

interface UploadButtonProps {
    text: string;
    onFileSelect?: (file : File) => void;
    onFileRemove?: () => void;
    accept?: string;
    className?: string;
    disabled?: boolean;
    maxWidth?: string;
}

// Upload button untuk upload file
export function UploadButton({ 
    text, 
    onFileSelect,
    onFileRemove, 
    accept="*/*", // Default accept semua file
    className="", 
    disabled = false,
    maxWidth = "80px"
}: UploadButtonProps ) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            if (onFileSelect) {
                onFileSelect(file);
            }
        }
    }

    // Handling remove file di component -> callback ke parent
    const handleRemoveFile = (e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedFile(null); // Clear file di component
        if (onFileRemove) {
            onFileRemove(); // Callback ke parent
        }
    }

    // Trunc nama file yang diupload
    const truncateFileName = (fileName: string, maxLength: number = 20) => {
        if (fileName.length <= maxLength) return fileName;
        const extension = fileName.split('.').pop();
        const nameWithoutExt = fileName.substring(0, fileName.lastIndexOf('.'));
        const truncatedName = nameWithoutExt.substring(0, maxLength - extension!.length - 4);
        return `${truncatedName}...${extension}`;
    };
    return (
        <div className={`relative ${className}`}>
            {!selectedFile && (
                <input 
                    type="file" 
                    accept={accept}
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    disabled={disabled}    
                />
            )}
            <Button
                variant='outlined'
                className={`font-semibold text-xs bg-[#FCFCFC] border border-[#BABABA]/30 rounded-lg flex items-center gap-2 duration-300 ${
                    className.includes('border-red-400') ? 'border-red-400' : ''
                }`}
                disabled={disabled}
                onClick={!selectedFile ? undefined : () => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = accept;
                    input.onchange = (e) => {
                        const file = (e.target as HTMLInputElement).files?.[0];
                        if (file) {
                            setSelectedFile(file);
                            if (onFileSelect) {
                                onFileSelect(file);
                            }
                        }
                    };
                    input.click();
                }}
            > 
                {selectedFile ? (
                    <>
                        <File className='w-4 h-4' color='black'/>
                        <span className="truncate flex-1" style={{ maxWidth }} title={selectedFile.name}>
                            {truncateFileName(selectedFile.name, 15)}
                        </span>
                        <button
                            type='button'
                            onClick={handleRemoveFile}
                            className='ml-1 hover:bg-red-100 rounded transition-colors z-20 relative'
                            title='Remove file'
                        >
                            <Trash className='w-4 h-4 text-red-500'/>
                        </button>
                    </>
                ) : (
                    <>
                        <Upload className='w-4 h-4' color='black'/>
                        {text}
                    </>
                )}
            </Button>
        </div>
    );
}