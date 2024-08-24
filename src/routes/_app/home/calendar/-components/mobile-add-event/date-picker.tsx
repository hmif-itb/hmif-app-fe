import { ComponentProps } from './-constants';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';
import { Button } from '~/components/ui/button';
import Calendar from '~/components/new-calendar';
import dayjs from 'dayjs';
import { TextField } from '~/components/ui/textfield';

export default function DatePicker({ form }: ComponentProps): JSX.Element {
  const watchStart = form.watch('start');
  const watchEnd = form.watch('end');

  const dateDisplay = dayjs(watchStart).format('dddd, MMMM DD');
  const startTimeDisplay = dayjs(watchStart).format('hh:mma');
  const endTimeDisplay = dayjs(watchEnd).format('hh:mma');

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="link"
            className="flex w-full items-center justify-between gap-5 p-4 text-base font-normal"
          >
            {dateDisplay}

            <div className="flex items-center">
              <TextField
                readOnly
                value={startTimeDisplay}
                inputClassName="font-normal border-none text-base p-0 text-center"
                className="w-[80px]"
              />
              <p>-</p>
              <TextField
                readOnly
                value={endTimeDisplay}
                inputClassName="font-normal border-none text-base p-0 text-center"
                className="w-[80px]"
              />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-fit rounded-xl p-0 shadow-[0_4px_4px_3px_rgba(0,0,0,0.25)]"
          align="center"
        >
          <Calendar
            onChange={(date) => {
              form.setValue('start', date.toISOString());
              form.setValue('end', date.toISOString());
            }}
            isMobile={false}
            defaultDate={new Date(watchStart)}
            className="p-4 pb-0"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
