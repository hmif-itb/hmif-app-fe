import { UseFormReturn } from 'react-hook-form';
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';
import { Separator } from '~/components/ui/separator';
import { FormSchemaType } from '../-constants';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '~/components/ui/form';

type ComponentProps = {
  form: UseFormReturn<FormSchemaType, undefined>;
  header: 'category' | 'sort' | 'read';
  choices: string[];
};

export default function Options({ header, choices, form }: ComponentProps) {
  if (choices.length < 2) {
    return <div></div>;
  }

  return (
    <FormField
      control={form.control}
      name={header}
      render={({ field }) => (
        <FormItem>
          <div className="my-5">
            <h2 className="text-base font-semibold capitalize">{header}</h2>
            <Separator className="mb-3 mt-1 bg-gray-500" />

            <FormControl>
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <div className="flex gap-4">
                  {choices.map((choice, idx) => (
                    <FormItem
                      key={idx}
                      className="flex items-center space-x-2 space-y-0 rounded-[265.71px] border border-green-950 py-1 pl-2 pr-3"
                    >
                      <FormControl>
                        <RadioGroupItem className="shrink-0" value={choice} />
                      </FormControl>
                      <FormLabel className="text-sm font-medium">
                        {choice}
                      </FormLabel>
                    </FormItem>
                  ))}
                </div>
              </RadioGroup>
            </FormControl>
          </div>
        </FormItem>
      )}
    />
  );
}
