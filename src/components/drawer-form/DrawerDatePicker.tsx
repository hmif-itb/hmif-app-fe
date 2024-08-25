import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';
import { Button } from '~/components/ui/button';
import Calendar from '~/components/new-calendar';
import dayjs from 'dayjs';
import { DrawerFormProps } from './DrawerForm';
import { FieldPath, FieldValues } from 'react-hook-form';
import clsx from 'clsx';

interface DrawerDatePickerProps<TFV extends FieldValues>
  extends Pick<DrawerFormProps<TFV>, 'form'> {
  name: FieldPath<TFV>;
  placeholder: string;
  icon?: string;
  iconClassName?: string;
  className?: string;
}

export default function DrawerDatePicker<T extends FieldValues>(
  props: Readonly<DrawerDatePickerProps<T>>,
): JSX.Element {
  const { form, name, placeholder, icon, iconClassName, className } = props;

  const watchDate = form.watch(name);

  const dateDisplay = dayjs(watchDate).format('dddd, MMMM DD');

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
              'w-full justify-start p-0 text-base font-normal',
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
