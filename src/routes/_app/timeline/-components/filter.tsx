import { useQuery } from '@tanstack/react-query';
import Options from './options';
import { Drawer, DrawerClose, DrawerFooter } from '~/components/ui/drawer';
import { Button } from '~/components/ui/button';

import { api } from '~/api/client';
import { FILTER_DATA, FormSchema, FormSchemaType } from '../-constants';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '~/components/ui/form';
import { FilterProps } from '../-types';
import useWindowSize from '~/hooks/useWindowSize';

export default function Filter({
  read,
  setRead,
  category,
  setCategory,
}: FilterProps) {
  const windowSize = useWindowSize();

  const { data: catData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => api.category.getListCategory(),
  });

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      category: category || '',
      read: read ? 'Read' : 'Unread',
    },
  });

  const handleSubmit = (data: FormSchemaType) => {
    setRead(data.read === 'Read');
    setCategory(data.category ?? '');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="px-10">
        <div>
          <div className="flex items-baseline justify-between px-0">
            <h1 className="text-[24px] font-bold text-green-400">Filters</h1>
            <Button
              variant="link"
              type="button"
              onClick={() => {
                form.setValue('read', read ? 'Read' : 'Unread');
                form.setValue('category', '');
              }}
            >
              <span className="text-[16px] font-semibold text-green-400">
                Reset
              </span>
            </Button>
          </div>

          <Options
            form={form}
            header="category"
            choices={catData?.categories.map((c) => c.name) ?? []}
          />
          {FILTER_DATA.map((a, idx) => (
            <Options
              key={idx}
              form={form}
              header={a.header.toLowerCase() as 'sort' | 'read'}
              choices={a.choices}
            />
          ))}
        </div>
        {windowSize.width < 1024 ? (
          <Drawer>
            <DrawerFooter className="flex flex-row justify-around">
              <Button
                type="submit"
                className="rounded-full bg-green-300 px-12 py-3 text-white"
              >
                Apply
              </Button>
              <DrawerClose asChild>
                <Button
                  variant="outlined"
                  className="rounded-full border-2 border-green-300 px-12 py-3 text-green-500"
                >
                  Cancel
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </Drawer>
        ) : (
          <div className="flex flex-col justify-around gap-4">
            <Button
              type="submit"
              size="sm"
              className="w-full rounded-full bg-green-300 px-12 py-3 text-white"
            >
              Apply
            </Button>
            <Button
              variant="outlined"
              size="sm"
              className="w-full rounded-full border-2 border-green-300 px-12 py-3 text-green-500"
            >
              Cancel
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
}
