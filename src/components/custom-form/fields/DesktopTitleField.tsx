import { FieldPath, FieldValues } from 'react-hook-form';
import { FormField, FormItem } from '../../ui/form';
import { TextField } from '../../ui/textfield';
import clsx from 'clsx';
import { FormProps } from '../-types';

interface DesktopTitleFieldProps<TFV extends FieldValues>
  extends Pick<FormProps<TFV>, 'form'> {
  name: FieldPath<TFV>;
  placeholder: string;
  className?: string;
  icon?: string;
  iconClassName?: string;
}

export default function DesktopTitleField<T extends FieldValues>(
  props: Readonly<DesktopTitleFieldProps<T>>,
) {
  const { form, placeholder, className, name, icon, iconClassName } = props;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <div className={clsx('flex w-full items-start gap-3 px-4', className)}>
          {icon && <img src={icon} alt="" className={iconClassName} />}

          <FormItem className="w-full">
            <TextField
              placeholder={placeholder}
              error={form.formState.errors.title?.message as string}
              inputClassName="!border-b-2 px-0 text-3xl font-medium border-0 rounded-none"
              success={form.formState.isSubmitSuccessful}
              {...field}
            />
          </FormItem>
        </div>
      )}
    />
  );
}
