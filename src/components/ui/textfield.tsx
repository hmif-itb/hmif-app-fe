import { cva, VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { FieldError } from 'react-hook-form';

import { cn } from '~/lib/utils';

import SearchIcon from '~/assets/icons/textfield/search.svg';
import AlertIcon from '~/assets/icons/textfield/alert.svg';
import CheckIcon from '~/assets/icons/textfield/check.svg';
import WarningIcon from '~/assets/icons/textfield/warning.svg';

const textFieldVariants = cva(
  'flex w-full border-none bg-background text-sm text-[#020617] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#64748B] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: '',
        search:
          'bg-[#F8FAFC] focus-visible:bg-[#F1F5F9] group-hover:bg-[#F1F5F9]',
      },
      fieldSize: {
        default: '',
        m: '',
        xl: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      fieldSize: 'default',
    },
  },
);

const divVariants = cva(
  'group flex w-full items-center gap-2 rounded-lg border',
  {
    variants: {
      variant: {
        default:
          'border-[#E2E8F0] focus-within:border-[#94A3B8] hover:border-[#CBD5E1]',
        search:
          'border-[#F8FAFC] bg-[#F8FAFC] focus-within:border-[#F1F5F9] focus-within:bg-[#F1F5F9] hover:border-[#F1F5F9] hover:bg-[#F1F5F9]',
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
    VariantProps<typeof textFieldVariants>,
    VariantProps<typeof divVariants> {
  error?: FieldError;
  success?: boolean;
}

/**
 * A textfield component for user inputs.
 *
 * @component
 * @param variant - "default" or "search"
 * @param fieldSize - "default", "m", or "xl
 * @param [success] - Indicates if the input is successfully submitted.
 * @param [error] - React-hook-form error object.
 */
const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    { className, variant, fieldSize, type, children, success, error, ...props },
    ref,
  ) => {
    return (
      <div className="flex flex-col gap-2 font-inter">
        <div
          className={cn(
            props.disabled && '!border-[#E2E8F0]',
            divVariants({ className, variant, fieldSize }),
          )}
        >
          {variant === 'search' && <img src={SearchIcon} className="size-4" />}
          <input
            type={type}
            className={cn(
              textFieldVariants({ variant }),
              error ? '!text-[#FF2C20]' : '',
            )}
            ref={ref}
            {...props}
          />
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

        {!props.disabled && error && (
          <p className="text-sm text-[#FF2C20]">* {error.message}</p>
        )}
      </div>
    );
  },
);
TextField.displayName = 'TextField';

export { TextField };
