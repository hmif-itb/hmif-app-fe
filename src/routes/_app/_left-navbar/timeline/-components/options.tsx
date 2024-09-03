import { UseFormReturn } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '~/components/ui/form';
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';
import { Separator } from '~/components/ui/separator';
import { FormSchemaType } from '../-constants';

type ComponentProps = {
  form: UseFormReturn<FormSchemaType, undefined>;
  header: 'category' | 'sort' | 'unread';
  choices: string[];
  onChange: () => void; // Added onChange prop to trigger auto-refresh
};

export default function Options({
  header,
  choices,
  form,
  onChange, // Destructure onChange prop
}: ComponentProps) {
  if (choices.length < 2) {
    return <div></div>;
  }

  return (
    <FormField
      control={form.control}
      name={header}
      render={({ field }) => (
        <FormItem>
          <div className="my-4">
            <h2 className="text-base font-semibold capitalize">{header}</h2>
            <Separator className="mb-3 mt-1 bg-gray-500" />

            <FormControl>
              <RadioGroup
                value={field.value}
                onValueChange={(value) => {
                  field.onChange(value); // Update the form value
                  onChange(); // Trigger the auto-refresh on change
                }}
                defaultValue={field.value}
              >
                <div className="flex flex-wrap gap-2">
                  {choices.map((choice, idx) => (
                    <FormItem
                      key={idx}
                      className="relative cursor-pointer space-y-0 rounded-[265.71px] border border-green-950"
                    >
                      <FormControl className="absolute left-2 top-1/2 -translate-y-1/2">
                        <RadioGroupItem className="shrink-0" value={choice} />
                      </FormControl>
                      <FormLabel className="block size-full cursor-pointer py-1 pl-8 pr-3 text-sm font-medium">
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
