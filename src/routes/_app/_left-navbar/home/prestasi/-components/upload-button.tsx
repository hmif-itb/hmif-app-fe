import { Upload } from 'lucide-react';
import { Button } from '~/components/ui/button';

interface UploadButtonProps {
    text: string;
    onFileSelect?: (file : File) => void;
    accept?: string;
    className?: string;
    disabled?: boolean;
}

export function UploadButton({ 
    text, 
    onFileSelect, 
    accept="*/*", 
    className="", 
    disabled = false 
}: UploadButtonProps ) {

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && onFileSelect) {
            onFileSelect(file);
        }
    }
    return (
        <div className={`relative ${className}`}>
            <input 
                type="file" 
                accept={accept}
                onChange={handleFileChange}
                className='absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed'
                disabled={disabled}    
            />
                <Button
                    variant='outlined'
                    className='w-[140px] font-semibold text-xs bg-[#FCFCFC] border border-[#BABABA]/30 rounded-lg flex items-center gap-2'
                    disabled={disabled}
                > 
                    <Upload className='w-auto h-4' color='black'/>
                    {text}
                </Button>
        </div>
    );
}