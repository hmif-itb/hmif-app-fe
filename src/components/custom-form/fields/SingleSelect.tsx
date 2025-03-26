import { FieldPath, FieldValues } from 'react-hook-form';
import { FormProps } from '../-types';
import { FormControl, FormField, FormItem } from '../../ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import { Button } from '../../ui/button';
import { cn } from '~/lib/utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../../ui/command';
import { PopoverClose } from '@radix-ui/react-popover';
import clsx from 'clsx';

type SingleSelectOption = {
  id: string;
  title: string;
};

interface SingleSelectProps<TFV extends FieldValues>
  extends Pick<FormProps<TFV>, 'form'> {
  name: FieldPath<TFV>;
  options: SingleSelectOption[];
  placeholder: string;
  icon?: string;
  iconClassName?: string;
  className?: string;
}

export default function SingleSelect<T extends FieldValues>(
  props: Readonly<SingleSelectProps<T>>,
) {
  const { form, name, options, placeholder, icon, iconClassName, className } =
    props;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={clsx('flex items-center gap-3 space-y-0 px-4', className)}
        >
          {icon && <img src={icon} alt="" className={iconClassName} />}

          <Popover modal={false}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="link"
                  className={cn(
                    'w-full justify-start p-0 text-base font-normal lg:text-lg',
                    !field.value && 'text-muted-foreground',
                  )}
                >
                  {field.value
                    ? options?.find((opt) => opt.id === field.value)?.title
                    : placeholder}
                </Button>
              </FormControl>
            </PopoverTrigger>

            <PopoverContent
              className="p-0"
              align="start"
              side="bottom"
              // container={containerRef.current}
            >
              <Command>
                <CommandInput placeholder="Search course..." />
                <CommandList className="max-h-52">
                  <CommandEmpty>No courses found</CommandEmpty>
                  <CommandGroup className="overflow-y-auto">
                    {options?.map((opt) => (
                      <CommandItem
                        value={opt.id}
                        key={opt.id}
                        // eslint-disable-next-line
                        onSelect={() => form.setValue(name, opt.id as any)}
                        keywords={[opt.title]}
                        className="cursor-pointer"
                      >
                        <PopoverClose className="text-left">
                          {opt.title}
                        </PopoverClose>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </FormItem>
      )}
    />
  );
}
