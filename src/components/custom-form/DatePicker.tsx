import clsx from 'clsx';
import dayjs from 'dayjs';
import { FieldPath, FieldValues } from 'react-hook-form';
import Calendar from '~/components/new-calendar';
import { Button } from '~/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';
import { FormProps } from './-types';

interface DatePickerProps<TFV extends FieldValues>
  extends Pick<FormProps<TFV>, 'form'> {
  name: FieldPath<TFV>;
  placeholder: string;
  icon?: string;
  iconClassName?: string;
  className?: string;
}

export default function DatePicker<T extends FieldValues>(
  props: Readonly<DatePickerProps<T>>,
): JSX.Element {
  const { form, name, placeholder, icon, iconClassName, className } = props;

  const watchDate = form.watch(name);

  const dateDisplay = dayjs(watchDate).format('dddd, MMMM DD YYYY');

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={clsx('flex items-center gap-3 space-y-0 p-4', className)}
        >
          {icon && <img src={icon} alt="" className={iconClassName} />}
          <Button
            variant="link"
            type="button"
            className={clsx(
              'w-full justify-start p-0 text-base font-normal lg:text-lg',
              dateDisplay === 'Invalid Date' && 'text-[#64748B]',
            )}
          >
            {dateDisplay === 'Invalid Date' ? placeholder : dateDisplay}
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="w-fit rounded-xl p-0 shadow-[0_4px_4px_3px_rgba(0,0,0,0.25)]"
        align="center"
      >
        <Calendar
          onChange={(date) => {
            // eslint-disable-next-line
            form.setValue(name, date.toISOString() as any);
          }}
          isMobile={false}
          defaultDate={watchDate && new Date(watchDate)}
          className="p-4 pb-0"
        />
      </PopoverContent>
    </Popover>
  );
}
