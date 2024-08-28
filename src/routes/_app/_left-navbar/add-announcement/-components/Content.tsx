import { UseFormReturn } from 'react-hook-form';
import { FormControl, FormField, FormItem } from '~/components/ui/form';
import { GrowingTextarea } from '~/components/ui/growingtextarea';
import { Textarea } from '~/components/ui/textarea';
import { cn } from '~/lib/utils';
import { FormSchemaType } from '../-constants';

type ComponentProps = {
  form: UseFormReturn<FormSchemaType>;
  isDesktop?: boolean;
};

export default function Content({
  form,
  isDesktop,
}: ComponentProps): JSX.Element {
  const Element = isDesktop ? Textarea : GrowingTextarea;

  return (
    <FormField
      control={form.control}
      name="announcement"
      render={({ field }) => (
        <FormItem>
          <div className="relative">
            <FormControl>
              <Element
                maxLength={500}
                className={cn(
                  !isDesktop
                    ? 'text-red min-h-[153px] rounded-none border-y border-y-[#EBEEEB] px-6 py-4 text-base'
                    : '',
                )}
                inputClassName="min-h-[153px] rounded-none border-y border-y-[#EBEEEB] px-6 py-4 text-base"
                placeholder="What do you want announce?"
                errorClassName="absolute top-0.5 left-4 text-xs"
                error={form.formState.errors.announcement?.message}
                success={form.formState.isSubmitSuccessful}
                iconClassName="!size-3 !top-auto bottom-1 !translate-y-0 !right-14"
                {...field}
              />
            </FormControl>
            <p className="absolute bottom-0.5 right-4 text-xs text-[#6A6B6A]">
              {field.value.length}/1000
            </p>
          </div>
        </FormItem>
      )}
    />
  );
}
