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
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'gap-2 px-7 py-4 text-lg',
        'icon-l-sm': 'gap-1 py-2 pl-3 pr-4 text-sm',
        'icon-l-md': 'gap-[6px] py-3 pl-5 pr-6 text-base',
        'icon-l-lg': 'gap-2 py-4 pl-6 pr-7 text-lg',
        'icon-r-sm': 'gap-1 py-2 pl-4 pr-3 text-sm',
        'icon-r-md': 'gap-[6px] py-3 pl-6 pr-5 text-base',
        'icon-r-lg': 'gap-2 py-3 pl-7 pr-6 text-lg',
        'icon-c-sm': 'p-2 text-sm',
        'icon-c-md': 'p-3 text-base',
        'icon-c-lg': 'p-4 text-lg',
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
