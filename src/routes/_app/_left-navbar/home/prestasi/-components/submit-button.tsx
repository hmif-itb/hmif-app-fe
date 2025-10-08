import { ArrowRight } from 'lucide-react';
import { isValid } from 'zod';
import { Button } from '~/components/ui/button';

interface SubmitButtonProps {
  text?: string;
  onSubmit?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  isValid?: boolean;
}

// Button submit untuk form submission
export function SubmitButton({
  text = 'Submit',
  onSubmit,
  disabled = false,
  loading = false,
  className = '',
  isValid = true,
}: SubmitButtonProps) {
  return (
    <Button
      className={`group flex items-center gap-2 rounded-lg bg-[#E8C55F] px-4 py-2 text-sm font-semibold text-black duration-300 hover:bg-[#f0cf6a] active:bg-[#fadd84] ${className}`}
      disabled={disabled || loading || !isValid}
      onClick={onSubmit}
    >
      {loading ? (
        <>
          <div className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          Loading...
        </>
      ) : (
        <>
          {text}
          <ArrowRight className="size-4 duration-300 group-hover:translate-x-1" />
        </>
      )}
    </Button>
  );
}
