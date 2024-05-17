import * as React from 'react';

import { cn } from '~/lib/utils';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-lg border border-[#E2E8F0] bg-background px-4 py-3 text-sm ring-offset-background  text-[#020617] placeholder:text-[#64748B] hover:border-[#CBD5E1] focus-visible:outline-none focus-visible:border-[#94A3B8] disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = 'Textarea';

export { Textarea };
