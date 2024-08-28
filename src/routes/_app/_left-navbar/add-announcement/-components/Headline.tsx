import { UseFormReturn } from 'react-hook-form';
import { FormControl, FormField, FormItem } from '~/components/ui/form';
import { TextField } from '~/components/ui/textfield';
import { cn } from '~/lib/utils';
import { FormSchemaType } from '../-constants';

type ComponentProps = {
  form: UseFormReturn<FormSchemaType>;
  isDesktop?: boolean;
};

export default function Headline({
  form,
  isDesktop,
}: ComponentProps): JSX.Element {
  return (
    <FormField
      control={form.control}
      name="headline"
      render={({ field }) => (
        <FormItem>
          <div className="relative">
            <FormControl>
              <TextField
                maxLength={50}
                placeholder="Headline announcement"
                inputClassName={cn(
                  'rounded-none border-y border-y-[#EBEEEB] text-body-xl py-4 px-6 font-bold',
                  isDesktop && 'text-xl',
                )}
                errorClassName="absolute top-0.5 left-4 text-xs"
                error={form.formState.errors.headline?.message}
                success={form.formState.isSubmitSuccessful}
                iconClassName="!size-3 !top-auto bottom-0.5 !translate-y-0 !right-12"
                {...field}
              />
            </FormControl>
            <p className="absolute bottom-0 right-4 text-xs text-[#6A6B6A]">
              {field.value.length}/100
            </p>
          </div>
        </FormItem>
      )}
    />
  );
}
