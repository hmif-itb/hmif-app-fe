import { cva, VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '~/lib/utils';

import AlertIcon from '~/assets/icons/textfield/alert.svg';
import CheckIcon from '~/assets/icons/textfield/check.svg';
import SearchIcon from '~/assets/icons/textfield/search.svg';
import WarningIcon from '~/assets/icons/textfield/warning.svg';

const textFieldVariants = cva(
  'flex w-full rounded-lg border bg-background text-sm text-[#020617] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#64748B] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'border-[#E2E8F0] hover:border-[#CBD5E1] focus-visible:border-[#94A3B8]',
        search:
          'border-[#F8FAFC] bg-[#F8FAFC] !pl-12 hover:border-[#F1F5F9] hover:bg-[#F1F5F9] focus-visible:border-[#F1F5F9] focus-visible:bg-[#F1F5F9] group-hover:bg-[#F1F5F9]',
      },
      fieldSize: {
        default: 'px-4 py-3',
        xl: 'p-4',
        m: 'px-3 py-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      fieldSize: 'default',
    },
  },
);

export interface TextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof textFieldVariants> {
  error?: string;
  success?: boolean;
  inputClassName?: string;
  inputContainerClassName?: string;
  errorClassName?: string;
  iconClassName?: string;
}

/**
 * A textfield component for user inputs.
 *
 * @component
 * @param variant - "default" or "search"
 * @param fieldSize - "default", "m", or "xl
 * @param [success] - Indicates if the input is successfully submitted.
 * @param [error] - Error message.
 * @param [inputClassName] - Additional class name for the input.
 * @param [inputContainerClassName] - Additional class name for the input container.
 * @param [errorClassName] - Additional class name for the error message.
 * @param [iconClassName] - Additional class name for the info icon.
 */
const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      className,
      variant,
      fieldSize,
      type,
      children,
      success,
      error,
      inputClassName,
      inputContainerClassName,
      errorClassName,
      iconClassName,
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
          {variant === 'search' && (
            <img
              src={SearchIcon}
              className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2"
            />
          )}
          <input
            type={type}
            className={cn(
              textFieldVariants({ variant, fieldSize }),
              error ? '!text-[#FF2C20]' : '',
              props.disabled || error || success || children
                ? children && (props.disabled || error || success)
                  ? 'pr-16'
                  : 'pr-9'
                : '',
              inputClassName,
            )}
            ref={ref}
            {...props}
          />
          <div
            className={cn(
              'pointer-events-none absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-2',
              iconClassName,
            )}
          >
            {(props.disabled || error || success) && (
              <img
                src={
                  props.disabled ? WarningIcon : success ? CheckIcon : AlertIcon
                }
                className="size-4"
              />
            )}
            {children}
          </div>
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
TextField.displayName = 'TextField';

export { TextField };
