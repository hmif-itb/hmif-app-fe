import { useQuery } from '@tanstack/react-query';
import { XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { UseFormReturn, useWatch } from 'react-hook-form';
import { api } from '~/api/client';
import HashIcon from '~/assets/icons/add-announcement/hash.svg';
import { Button } from '~/components/ui/button';
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
import { useAngkatanList } from '~/hooks/useAngkatanList';
import { cn } from '~/lib/utils';
import { FormSchemaType } from '../-constants';

type ComponentProps = {
  form: UseFormReturn<FormSchemaType>;
  isDesktop?: boolean;
};

export default function Categories({
  form,
  isDesktop,
}: ComponentProps): JSX.Element {
  const [catDropdownOpen, setCatDropdownOpen] = useState(false);
  const angkatanList = useAngkatanList();
  const [catOptions, setCatOptions] = useState<
    {
      id: string;
      type: string;
      title: string;
    }[]
  >([]);

  const categories = useWatch({
    control: form.control,
    name: 'categories',
    defaultValue: [],
  });

  const { data } = useQuery({
    queryKey: ['categories'],
    queryFn: () => api.category.getListCategory(),
  });

  useEffect(() => {
    const options: typeof catOptions = [];
    if (angkatanList) {
      options.push(
        ...angkatanList.map((a) => ({
          id: a.id,
          type: 'ANGKATAN',
          title: `${a.year} ${a.name}`,
        })),
      );
    }
    if (data) {
      options.push(
        ...data.categories.map((c) => ({
          id: c.id,
          type: 'KATEGORI',
          title: c.name,
        })),
      );
    }
    setCatOptions(
      options.filter(
        (cat) =>
          !categories.some((c) => c.id === cat.id && c.type === cat.type),
      ),
    );
  }, [data, categories, angkatanList]);

  const handleDeleteCategory = (id: string) => {
    form.setValue(
      'categories',
      categories.filter((c) => c.id !== id),
    );
  };

  return (
    <section className="flex w-full flex-wrap items-center gap-x-2 gap-y-4 border-b border-b-[#EBEEEB] px-5 py-3">
      <img src={HashIcon} alt="" className="size-3" />
      {categories.map((category, idx) => (
        <div
          key={idx}
          className="-my-2 flex items-center gap-2 rounded-2xl bg-[#305138] pb-[5px] pl-3 pr-2 pt-1.5"
        >
          <p className="text-[10px] text-white">{category.title}</p>
          <Button
            variant="link"
            className="rounded-full bg-white p-0.5"
            type="button"
            onClick={() => handleDeleteCategory(category.id)}
          >
            <XIcon size={10} className="text-black" />
          </Button>
        </div>
      ))}
      <Popover open={catDropdownOpen} onOpenChange={setCatDropdownOpen}>
        <PopoverTrigger asChild>
          <Button
            className="min-w-[100px] flex-auto justify-start px-0 py-1 text-xs text-[#64748B]"
            size="sm"
            variant="link"
          >
            Enter Categories
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className={cn('p-0', !isDesktop && 'w-[70vw]')}
        >
          <Command>
            <CommandInput placeholder="Select a category..." />
            <CommandList>
              {catOptions.map((cat, idx) => (
                <CommandItem
                  value={cat.id}
                  keywords={[cat.title]}
                  onSelect={(val) => {
                    const cat = catOptions.find((c) => c.id === val);
                    if (!cat) return;
                    const currCats = form.getValues('categories');
                    if (!currCats.map((c) => c.id).includes(cat.id))
                      form.setValue('categories', [
                        ...form.getValues('categories'),
                        cat,
                      ]);
                  }}
                  className="gap-2"
                  key={idx}
                >
                  <div
                    key={idx}
                    className={cn(
                      'items-center gap-1 rounded-2xl px-3',
                      cat.type === 'ANGKATAN' ? 'bg-[#E7613E]' : 'bg-[#E5B52B]',
                    )}
                  >
                    <p className="text-[10px] uppercase text-white">
                      {cat.type}
                    </p>
                  </div>
                  <p>{cat.title}</p>
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </section>
  );
}
