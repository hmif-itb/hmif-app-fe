import React, { useRef } from 'react';
import { Textarea, TextareaProps } from './textarea';
import { cn } from '~/lib/utils';

// Referensi: https://codepen.io/chriscoyier/pen/XWKEVLy

export interface GrowingTextAreaProps extends TextareaProps {}

/**
 * A textarea component that grows based on its content.
 *
 * @component
 * @param [success] - Indicates if the input is successfully submitted.
 * @param [error] - Error message.
 * @param [inputClassName] - Additional class name for the input.
 * @param [inputContainerClassName] - Additional class name for the input container.
 * @param [errorClassName] - Additional class name for the error message.
 * @param [iconClassName] - Additional class name for the info icon.
 */
const GrowingTextarea = React.forwardRef<
  HTMLTextAreaElement,
  GrowingTextAreaProps
>(({ className, ...props }, ref) => {
  const divRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={divRef}
      className='grid after:invisible after:col-start-1 after:col-end-2 after:row-start-1 after:row-end-2 after:whitespace-pre-wrap after:break-all after:border after:border-[#E2E8F0] after:px-6 after:py-4 after:content-[attr(data-replicated-value)_"_"]'
    >
      <Textarea
        onInput={(e) => {
          if (divRef.current && divRef.current.dataset) {
            divRef.current.dataset.replicatedValue = e.currentTarget.value;
          }
        }}
        className="col-start-1 col-end-2 row-start-1 row-end-2 h-full"
        inputClassName={cn('resize-none overflow-hidden break-all', className)}
        inputContainerClassName="h-full"
        ref={ref}
        {...props}
      />
    </div>
  );
});
GrowingTextarea.displayName = 'GrowingTextarea';

export { GrowingTextarea };
