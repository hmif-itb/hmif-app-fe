import * as React from 'react';
import { UseFormReturn } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '~/components/ui/form';
import { CheckboxGroup } from '~/components/ui/checkbox';
import { Separator } from '~/components/ui/separator';
import { CategorySchemaType } from '../-constants';

type ComponentProps = {
  form: UseFormReturn<CategorySchemaType, undefined>;
  header: 'category';
  choices: string[];
  onChange: () => void; // Added onChange prop to trigger auto-refresh
};

export default function Options({
  choices,
  form,
  onChange,
}: ComponentProps) {
  if (choices.length < 2) {
    return <div></div>;
  }

  return (
    <FormField
      control={form.control}
      name='category'
      render={({ field }) => (
        <FormItem>
          <div className="my-4">
            <h2 className="text-base font-semibold capitalize">
              category
            </h2>
            <Separator className="mb-3 mt-1 bg-gray-500" />

            <FormControl>
                <CheckboxGroup
                  selectedValues={choices.filter(
                    (choice) => !field.value?.includes(choice),
                  )}
                  choices={choices}
                  onChange={(checkedChoices) => {
                    const category = choices.filter(
                      (choice) => !checkedChoices.includes(choice),
                    );
                    field.onChange(category);
                    onChange();
                  }}
                  className="flex flex-wrap gap-2"
                />
            </FormControl>
          </div>
        </FormItem>
      )}
    />
  );
}
