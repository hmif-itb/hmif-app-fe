import * as React from 'react';

import { cn } from '~/lib/utils';

import AlertIcon from '~/assets/icons/textfield/alert.svg';
import CheckIcon from '~/assets/icons/textfield/check.svg';
import WarningIcon from '~/assets/icons/textfield/warning.svg';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  success?: boolean;
  inputClassName?: string;
  inputContainerClassName?: string;
  errorClassName?: string;
  iconClassName?: string;
}

/**
 * A textarea component for user inputs.
 *
 * @component
 * @param [success] - Indicates if the input is successfully submitted.
 * @param [error] - Error message.
 * @param [inputClassName] - Additional class name for the input.
 * @param [inputContainerClassName] - Additional class name for the input container.
 * @param [errorClassName] - Additional class name for the error message.
 * @param [iconClassName] - Additional class name for the info icon.
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      inputContainerClassName,
      inputClassName,
      errorClassName,
      iconClassName,
      error,
      success,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={cn('flex flex-col gap-2 font-inter', className)}>
        <div
          className={cn(
            props.disabled && '!border-[#E2E8F0]',
            'relative',
            inputContainerClassName,
          )}
        >
          <textarea
            className={cn(
              'flex min-h-[80px] w-full rounded-lg border border-[#E2E8F0] bg-background px-4 py-3 text-sm text-[#020617] ring-offset-background placeholder:text-[#64748B] hover:border-[#CBD5E1] focus-visible:border-[#94A3B8] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
              inputClassName,
              className,
            )}
            ref={ref}
            {...props}
          />

          {(props.disabled || error || success) && (
            <img
              src={
                props.disabled ? WarningIcon : success ? CheckIcon : AlertIcon
              }
              className={cn(
                'pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2',
                iconClassName,
              )}
            />
          )}
        </div>

        {!props.disabled && error && (
          <p className={cn('text-sm text-[#FF2C20]', errorClassName)}>
            * {error}
          </p>
        )}
      </div>
    );
  },
);
Textarea.displayName = 'Textarea';

export { Textarea };
