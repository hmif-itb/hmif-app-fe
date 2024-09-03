import { FieldPath, FieldValues } from 'react-hook-form';
import { FormControl, FormField, FormItem } from '../../ui/form';
import clsx from 'clsx';
import { TextField } from '../../ui/textfield';
import { FormProps } from '../-types';
import { GrowingTextarea } from '../../ui/growingtextarea';

interface FormTextFieldProps<TFV extends FieldValues>
  extends Pick<FormProps<TFV>, 'form'> {
  name: FieldPath<TFV>;
  placeholder: string;
  className?: string;
  iconClassName?: string;
  inputClassName?: string;
  icon?: string;
  type?: string;
  growable?: boolean;
  growableMaxLength?: number;
}

export default function FormTextField<T extends FieldValues>(
  props: Readonly<FormTextFieldProps<T>>,
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
    growable,
    growableMaxLength = 0,
  } = props;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={clsx(
            'flex gap-3 space-y-0 px-4',
            growable ? 'items-start' : 'items-center',
            className,
          )}
        >
          {icon && (
            <img
              src={icon}
              alt=""
              className={clsx(iconClassName, growable && 'my-3')}
            />
          )}
          <FormControl>
            <div className="w-full">
              {growable ? (
                <GrowingTextarea
                  maxLength={growableMaxLength}
                  placeholder={placeholder}
                  inputClassName={clsx(
                    '!lg:text-lg min-h-0 rounded-none border-none px-0 py-6 !text-base outline-none',
                    inputClassName,
                  )}
                  iconClassName="!size-3 !top-auto bottom-1 !translate-y-0 !right-14"
                  className="w-full flex-auto gap-0"
                  success={form.formState.isSubmitSuccessful}
                  error={form.formState.errors[name]?.message as string}
                  errorClassName="-mt-3 relative z-10"
                  {...field}
                />
              ) : (
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
              )}
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
