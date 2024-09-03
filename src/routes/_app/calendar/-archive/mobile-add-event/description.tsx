import { FormField, FormItem, FormControl } from '~/components/ui/form';
import { ComponentProps } from './-constants';
import { GrowingTextarea } from '~/components/ui/growingtextarea';

export default function Description({ form }: ComponentProps): JSX.Element {
  return (
    <div>
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <GrowingTextarea
                maxLength={500}
                placeholder="Description"
                iconClassName="!size-3 !top-auto bottom-1 !translate-y-0 !right-14"
                className="rounded-none border-none px-4 outline-none"
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}
