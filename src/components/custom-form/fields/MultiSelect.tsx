import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from '~/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';
import { FieldPath, FieldValues, useWatch } from 'react-hook-form';
import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { XIcon } from 'lucide-react';
import clsx from 'clsx';
import { FormProps } from '../-types';

type MultiSelectOption = {
  id: string;
  title: string;
};

interface MultiSelectProps<TFV extends FieldValues>
  extends Pick<FormProps<TFV>, 'form'> {
  name: FieldPath<TFV>;
  options: MultiSelectOption[];
  placeholder: string;
  icon?: string;
  iconClassName?: string;
  className?: string;
  selectedClassName?: string;
}

export default function MultiSelect<T extends FieldValues>(
  props: Readonly<MultiSelectProps<T>>,
) {
  const {
    form,
    name,
    options,
    icon,
    iconClassName,
    placeholder,
    className,
    selectedClassName,
  } = props;

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const values = useWatch({
    control: form.control,
    name,
    // eslint-disable-next-line
    defaultValue: [] as any,
  }) as MultiSelectOption[];

  const handleDeleteValue = (id: string) => {
    form.setValue(
      name,
      // eslint-disable-next-line
      values.filter((v) => v.id !== id) as any,
    );
  };

  return (
    <section
      className={clsx('flex w-full items-center gap-3 px-4 py-3', className)}
    >
      {icon && <img alt="" className={iconClassName} src={icon} />}

      <div className="flex flex-wrap items-center gap-1 lg:gap-2">
        {values.map((v, idx) => (
          <div
            key={idx}
            className={clsx(
              'flex items-center gap-2 rounded-2xl bg-gray-300 px-2 pb-[5px] pt-1.5',
              selectedClassName,
            )}
          >
            <p className="h-fit text-xs leading-none text-[#8E8E93] lg:text-sm">
              {v.title}
            </p>
            <Button
              variant="link"
              className="rounded-full bg-white p-0.5"
              type="button"
              onClick={() => handleDeleteValue(v.id)}
            >
              <XIcon size={12} className="text-[#8E8E93]" />
            </Button>
          </div>
        ))}
        <Popover open={dropdownOpen} onOpenChange={setDropdownOpen}>
          <PopoverTrigger asChild>
            <Button
              className="min-w-[100px] flex-auto justify-start p-0 text-base font-normal text-[#64748B] lg:text-lg"
              size="sm"
              variant="link"
            >
              {placeholder}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="p-0">
            <Command>
              <CommandInput placeholder={placeholder} />
              <CommandList>
                {options
                  .filter((opt) => !values.map((v) => v.id).includes(opt.id))
                  .map((opt, idx) => (
                    <CommandItem
                      value={opt.id}
                      onSelect={(val) => {
                        const opt = options.find((opt) => opt.id === val);
                        if (!opt) return;
                        const currOpts = form.getValues(
                          name,
                        ) as MultiSelectOption[];
                        if (!currOpts.map((opt) => opt.id).includes(opt.id))
                          form.setValue(name, [
                            ...form.getValues(name),
                            opt,
                            // eslint-disable-next-line
                          ] as any);
                      }}
                      className="gap-2"
                      key={idx}
                    >
                      <p>{opt.title}</p>
                    </CommandItem>
                  ))}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </section>
  );
}
