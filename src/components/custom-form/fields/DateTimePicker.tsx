import { FieldPath, FieldValues } from 'react-hook-form';
import { FormProps } from '../-types';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import { Button } from '../../ui/button';
import Calendar from '../../new-calendar';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../../ui/command';
import { PopoverClose } from '@radix-ui/react-popover';
import dayjs from 'dayjs';
import generateTimeOptions from '~/lib/generateTimeOptions';
import clsx from 'clsx';

interface DateTimePickerProps<TFV extends FieldValues>
  extends Pick<FormProps<TFV>, 'form'> {
  startName: FieldPath<TFV>;
  endName: FieldPath<TFV>;
  placeholder: string;
  icon?: string;
  iconClassName?: string;
  className?: string;
}

interface TimePickerProps<TFV extends FieldValues>
  extends Pick<FormProps<TFV>, 'form'> {
  timeDisplay: string;
  baseDate: string;
  name: FieldPath<TFV>;
  placeholder: string;
}

const TimeOptions = generateTimeOptions();

export default function DateTimePicker<T extends FieldValues>(
  props: Readonly<DateTimePickerProps<T>>,
) {
  const {
    form,
    startName,
    endName,
    placeholder,
    icon,
    iconClassName,
    className,
  } = props;

  const watchStart = form.watch(startName);
  const watchEnd = form.watch(endName);

  const dateDisplay = dayjs(watchStart).format('dddd, DD-MM-YYYY');
  const startTimeDisplay = dayjs(watchStart).format('HH:mm');
  const endTimeDisplay = dayjs(watchEnd).format('HH:mm');

  return (
    <div className={clsx('flex items-center gap-3 p-4', className)}>
      {icon && <img src={icon} alt="" className={iconClassName} />}

      <div className="flex w-full items-center justify-between">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="link"
              className={clsx(
                'w-[180px] justify-start p-0 text-base font-normal lg:text-lg',
                dateDisplay === 'Invalid Date' && 'text-[#64748B]',
              )}
            >
              {dateDisplay === 'Invalid Date' ? placeholder : dateDisplay}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-fit rounded-xl p-0 shadow-[0_4px_4px_3px_rgba(0,0,0,0.25)]"
            align="center"
          >
            <Calendar
              onChange={(date) => {
                // eslint-disable-next-line
              form.setValue(startName, date.toISOString() as any);
                // eslint-disable-next-line
              form.setValue(endName, date.toISOString() as any);
              }}
              isMobile={false}
              defaultDate={watchStart && new Date(watchStart)}
              className="p-4 pb-0"
            />
          </PopoverContent>
        </Popover>
        <div className="flex items-center">
          <TimePicker
            form={form}
            timeDisplay={startTimeDisplay}
            baseDate={watchStart}
            name={startName}
            placeholder="Start"
          />
          <p>-</p>
          <TimePicker
            form={form}
            timeDisplay={endTimeDisplay}
            baseDate={watchStart}
            name={endName}
            placeholder="End"
          />
        </div>
      </div>
    </div>
  );
}

function TimePicker<T extends FieldValues>(
  props: Readonly<TimePickerProps<T>>,
) {
  const { form, timeDisplay, baseDate, name, placeholder } = props;

  return (
    <Popover modal={false}>
      <PopoverTrigger asChild>
        <Button
          variant="link"
          className={clsx(
            'w-[60px] p-0 text-center text-base font-normal lg:text-lg',
            timeDisplay === 'Invalid Date' && 'text-[#64748B]',
          )}
        >
          {timeDisplay === 'Invalid Date' ? placeholder : timeDisplay}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-fit p-0" align="start" side="bottom">
        <Command className="w-[80px] min-w-0">
          <CommandInput
            placeholder="Search"
            className="placeholder:text-xs"
            disableIcon
          />
          <CommandList className="max-h-52 w-full px-1">
            <CommandEmpty>Enter a valid time</CommandEmpty>
            <CommandGroup className="overflow-y-auto">
              {TimeOptions?.map((opt) => (
                <CommandItem
                  value={opt.display}
                  key={opt.display}
                  onSelect={() => {
                    const [hour, minute] = opt.display.split(':');
                    const newDate = dayjs(
                      baseDate === '' ? new Date() : baseDate,
                    )
                      .hour(parseInt(hour))
                      .minute(parseInt(minute))
                      .toISOString();
                    // eslint-disable-next-line
                    form.setValue(name, newDate as any);
                  }}
                  className="flex cursor-pointer justify-center"
                >
                  <PopoverClose className="text-center">
                    {opt.display}
                  </PopoverClose>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
