import * as Select from '@radix-ui/react-select';
import { ChevronRight } from 'lucide-react';

export type DropdownOption = {
  value: string;
  label: string;
};

type KategoriDropdownProps = {
  value: string;
  onChange: (value: string) => void;
  options: DropdownOption[];
  placeholder?: string;
  placeholderMobile?: string;
};

export const KategoriDropdown = ({
  value,
  onChange,
  options,
  placeholder = 'Pilih Kategori',
  placeholderMobile = 'Pilih Kategori ...',
}: KategoriDropdownProps) => {
  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger className="flex items-center justify-between gap-1 rounded-lg border border-black py-1.5 pl-2 pr-1 font-inter text-xs font-medium hover:bg-gray-50 md:min-w-[180px] md:gap-2 md:px-3 md:py-2 md:text-sm">
        <Select.Value
          placeholder={
            <>
              <span className="block lg:hidden">{placeholderMobile}</span>
              <span className="hidden lg:block">{placeholder}</span>
            </>
          }
        />
        <Select.Icon>
          <ChevronRight size={14} className="md:hidden" />
          <ChevronRight size={16} className="hidden md:block" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          className="z-[100] rounded-lg border border-gray-300 bg-white p-1 shadow-xl"
          position="popper"
          sideOffset={5}
        >
          <Select.Viewport>
            {options.map((option) => (
              <Select.Item
                key={option.value}
                value={option.value}
                className="cursor-pointer rounded px-12 py-2 font-inter text-sm outline-none hover:bg-gray-100 focus:bg-gray-100 data-[highlighted]:bg-gray-100"
              >
                <Select.ItemText>{option.label}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};
