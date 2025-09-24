import { ArrowRight } from 'lucide-react';
import { Button } from '~/components/ui/button';

interface SubmitButtonProps {
    text?: string;
    onSubmit?: () => void;
    disabled?: boolean;
    loading?: boolean;
    className?: string;
}

export function SubmitButton({
    text = 'Submit',
    onSubmit,
    disabled = false,
    loading = false,
    className = ''
}: SubmitButtonProps) {
    return (
        <Button
            className={`flex items-center gap-2 text-sm font-semibold bg-[#E8C55F] hover:bg-[#f0cf6a] active:bg-[#fadd84] text-black duration-300 px-4 py-2 rounded-lg ${className}`}
            disabled={disabled || loading}
            onClick={onSubmit}
        >
           {loading ? (
            <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Loading...
            </>
            ) : (
                <>
                {text}
                <ArrowRight className="w-4 h-4" />
                </>
            )}
        </Button>
    );
}