import dayjs from 'dayjs';
import { CalendarEvent } from '~/api/generated';
import { Separator } from '~/components/ui/separator';
import { cn } from '~/lib/utils';
import type { Schedule } from '~/routes/_app/home/-dummy/info';

function Schedule({
  event,
  isLastIndex,
  isSecondLastIndex,
}: {
  event: CalendarEvent;
  isLastIndex: boolean;
  isSecondLastIndex: boolean;
}) {
  const start = dayjs(event.start);
  const end = dayjs(event.end);
  return (
    <div className="flex w-full justify-between space-x-6">
      {/* Schedule Time */}
      <div className="flex w-[50px] shrink-0 flex-col">
        <p className="font-bold text-[#212525]">{start.format('HH:mm')}</p>
        <p className="text-[#BCC1CD]">
          {end.isSame(start, 'date')
            ? end.format('HH:mm')
            : end.format('DD/MM/YYYY HH:mm')}
        </p>
      </div>

      {/* Schedule Separator and Dots */}
      <div className="relative">
        <div
          className={cn(
            'absolute left-0 top-2 size-[1.125rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#245236]',
            isLastIndex && 'bg-[#B0B3B0]',
          )}
        ></div>
        <div className="absolute -left-0 top-2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D9D9D9]"></div>
        <Separator
          orientation="vertical"
          className={cn(
            'bg-[#525352]',
            isLastIndex && 'invisible',
            isSecondLastIndex && 'bg-[#B0B3B0]',
          )}
        />
      </div>

      {/* Schedule Info */}
      <div
        className={cn(
          'mb-4 flex flex-auto flex-col gap-2 rounded-2xl p-4 text-white',
          event.category === 'himpunan' ? 'bg-green-300' : 'bg-yellow-300',
        )}
      >
        <div className="flex justify-between">
          <p className="font-semibold">{event.title}</p>
          <p className="font-extrabold">∶</p>
        </div>

        {event.description && <p className="text-sm">{event.description}</p>}

        <div className="flex w-fit items-center gap-1 rounded-xl bg-white px-2 py-1">
          <div
            className={cn(
              'size-2 rounded-full',
              event.category === 'Himpunan' ? 'bg-green-300' : 'bg-yellow-300',
            )}
          ></div>
          <p className="text-xs capitalize text-black">{event.category}</p>
        </div>
      </div>
    </div>
  );
}

export default Schedule;
