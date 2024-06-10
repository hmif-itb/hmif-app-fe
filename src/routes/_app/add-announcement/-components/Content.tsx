import { UseFormReturn } from 'react-hook-form';
import { FormSchemaType } from '../-constants';
import { FormControl, FormField, FormItem } from '~/components/ui/form';
import { GrowingTextarea } from '~/components/ui/growingtextarea';

type ComponentProps = {
  form: UseFormReturn<FormSchemaType>;
};

export default function Content({ form }: ComponentProps): JSX.Element {
  return (
    <FormField
      control={form.control}
      name="announcement"
      render={({ field }) => (
        <FormItem>
          <div className="relative">
            <FormControl>
              <GrowingTextarea
                maxLength={500}
                className="min-h-[153px] rounded-none border-y border-y-[#EBEEEB] px-6 py-4 text-base"
                placeholder="What do you want announce?"
                errorClassName="absolute top-0.5 left-4 text-xs"
                error={
                  form.formState.errors.announcement?.message &&
                  "Announcement can't be empty"
                }
                success={form.formState.isSubmitSuccessful}
                iconClassName="!size-3 !top-auto bottom-1 !translate-y-0 !right-14"
                {...field}
              />
            </FormControl>
            <p className="absolute bottom-0.5 right-4 text-xs text-[#6A6B6A]">
              {field.value.length}/500
            </p>
          </div>
        </FormItem>
      )}
    />
  );
}
