import { FieldPath, FieldValues } from 'react-hook-form';
import { DrawerFormProps } from './DrawerForm';
import { FormControl, FormField, FormItem } from '../ui/form';
import clsx from 'clsx';
import { TextField } from '../ui/textfield';

interface DrawerTextFieldProps<TFV extends FieldValues>
  extends Pick<DrawerFormProps<TFV>, 'form'> {
  name: FieldPath<TFV>;
  placeholder: string;
  className?: string;
  iconClassName?: string;
  inputClassName?: string;
  icon?: string;
  type?: string;
}

export default function DrawerTextField<T extends FieldValues>(
  props: Readonly<DrawerTextFieldProps<T>>,
) {
  const {
    form,
    name,
    placeholder,
    className,
    icon,
    inputClassName,
    iconClassName,
    type = 'text',
  } = props;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={clsx('flex items-center gap-3 space-y-0 px-4', className)}
        >
          {icon && <img src={icon} alt="" className={iconClassName} />}
          <FormControl>
            <TextField
              type={type}
              id={name}
              placeholder={placeholder}
              inputClassName={clsx(
                'rounded-none border-none px-0 py-6 text-[20px] outline-none',
                inputClassName,
              )}
              className="flex-auto gap-0"
              success={form.formState.isSubmitSuccessful}
              error={form.formState.errors[name]?.message as string}
              errorClassName="-mt-3 relative z-10"
              {...field}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
