import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { cn } from '~/lib/utils';
import { Circle } from 'lucide-react';

type CheckboxGroupProps = {
  choices: string[];
  selectedValues: string[];
  onChange: (checkedChoices: string[]) => void;
  className?: string;
};

const CheckboxGroup = React.forwardRef<HTMLDivElement, CheckboxGroupProps>(
  ({ choices, selectedValues, onChange, className }, ref) => {
    return (
      <div ref={ref} className={cn('grid gap-2', className)}>
        {choices.map((choice, idx) => {
          const isChecked = selectedValues.includes(choice);

          return (
            <CheckboxItem
              key={idx}
              checked={isChecked}
              onCheckedChange={(checked: boolean) => {
                const newCheckedChoices = checked
                  ? [...selectedValues, choice]
                  : selectedValues.filter((item) => item !== choice);
                onChange(newCheckedChoices);
              }}
            >
              {choice}
            </CheckboxItem>
          );
        })}
      </div>
    );
  },
);

CheckboxGroup.displayName = 'CheckboxGroup';

const CheckboxItem = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, children, ...props }, ref) => {
  return (
    <label
      className={cn(
        'relative cursor-pointer space-y-0 rounded-[265.71px] border border-green-950',
        className,
      )}
    >
      <div className="absolute left-2 top-1/2 -translate-y-1/2">
        <CheckboxPrimitive.Root
          ref={ref}
          className={cn(
            'h-4·w-4·rounded-full·border·border-primary·text-primary·ring-offset-background·focus:outline-none·focus-visible:ring-2·focus-visible:ring-ring·focus-visible:ring-offset-2·disabled:cursor-not-allowed·disabled:opacity-50·shrink-0·flex·items-center·justify-center` with `flex·h-4·w-4·shrink-0·items-center·justify-center·rounded-full·border·border-primary·text-primary·ring-offset-background·focus:outline-none·focus-visible:ring-2·focus-visible:ring-ring·focus-visible:ring-offset-2·disabled:cursor-not-allowed·disabled:opacity-50',
            className,
          )}
          {...props}
        >
          <CheckboxPrimitive.Indicator className="flex items-center justify-center">
            <Circle className="size-3 fill-green-950 text-current" />
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
      </div>
      <span className="block w-full cursor-pointer py-1 pl-8 pr-3 text-sm font-medium">
        {children}
      </span>
    </label>
  );
});

CheckboxItem.displayName = CheckboxPrimitive.Root.displayName;

export { CheckboxGroup, CheckboxItem };
