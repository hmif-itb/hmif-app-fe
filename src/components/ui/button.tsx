import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '~/lib/utils';

const buttonVariants = cva(
  'inline-flex size-fit items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        solid: 'rounded-full bg-neutral-black text-neutral-light',
        outlined:
          'rounded-full border border-solid border-neutral-darker text-neutral-black',
        link: 'text-neutral-black',
      },
      size: {
        sm: 'gap-[6px] px-4 py-2 text-sm',
        md: 'gap-2 px-6 py-3 text-base',
        lg: 'gap-[10px] px-7 py-4 text-lg',
        'icon-sm': 'p-2 text-sm',
        'icon-md': 'p-3 text-base',
        'icon-lg': 'p-4 text-lg',
      },
    },
    defaultVariants: {
      variant: 'solid',
      size: 'md',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

/**
 * A button component used to trigger an action or event
 * @component
 * @param variant - "solid", "outlined", or "link"
 * @param size - "sm", "md", "lg", "icon-sm", "icon-md", "icon-lg"
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
