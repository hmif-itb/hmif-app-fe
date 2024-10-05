import { useQuery } from '@tanstack/react-query';
import { Button } from '~/components/ui/button';
import { DrawerClose, DrawerFooter } from '~/components/ui/drawer';
import Options from './options';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { api } from '~/api/client';
import { Form } from '~/components/ui/form';
import useWindowSize from '~/hooks/useWindowSize';
import { FILTER_DATA, FormSchema, FormSchemaType } from '../-constants';
import { FilterProps } from '../-types';

export default function Filter({
  filter,
  setFilter,
  handleCloseDrawer,
}: FilterProps) {
  const windowSize = useWindowSize();

  const { data: catData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => api.category.getListCategory(),
  });

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      excludeCategories: filter.excludeCategories || [], 
      unread: filter.unread ? 'Unread' : 'All',
      sort: filter.sort
        ? filter.sort[0].toUpperCase() + filter.sort.slice(1)
        : 'Newest',
    },
  });

  const handleSubmit = (data: FormSchemaType) => {
    setFilter({
      unread: data.unread === 'Unread',
      excludeCategories: data.excludeCategories, 
      sort: data.sort?.toLowerCase(),
    });
  };

  // Function to auto-submit form on option change
  const handleOptionChange = () => {
    form.handleSubmit(handleSubmit)(); // Auto-submit the form
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="px-6">
        <div>
          <div className="flex items-baseline justify-between px-0">
            <h1 className="text-heading-md font-bold text-green-400">
              Filters
            </h1>
            <Button
              variant="link"
              type="button"
              onClick={() => {
                form.setValue('unread', 'All');
                form.setValue('excludeCategories', []);
                form.setValue('sort', 'Newest');
                handleSubmit(form.getValues()); // Auto-refresh after reset
              }}
            >
              <span className="text-body-lg font-semibold text-green-400">
                Reset
              </span>
            </Button>
          </div>

          <Options
            form={form}
            header="excludeCategories"
            choices={catData?.categories.map((c) => c.name) ?? []}
            onChange={handleOptionChange} // Auto-submit on change
          />
          {FILTER_DATA.map((a, idx) => (
            <Options
              key={idx}
              form={form}
              header={a.name.toLowerCase() as 'sort' | 'unread'}
              choices={a.choices}
              onChange={handleOptionChange} // Auto-submit on change
            />
          ))}
        </div>
        {windowSize.width < 1024 ? (
          // <Drawer>
          <DrawerFooter className="flex flex-row justify-between px-0">
            <DrawerClose asChild>
              <Button
                type="submit"
                className="rounded-full bg-green-300 px-12 py-3 text-white"
                onClick={handleCloseDrawer}
              >
                Apply
              </Button>
            </DrawerClose>
            <DrawerClose asChild>
              <Button
                variant="outlined"
                className="rounded-full border-2 border-green-300 px-12 py-3 text-green-500"
                onClick={handleCloseDrawer}
              >
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        ) : (
          // </Drawer>
          <div className="flex flex-col justify-around gap-4">
            <Button
              type="submit"
              size="sm"
              className="w-full rounded-full bg-green-300 px-12 py-3 text-white"
            >
              Apply
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
}
