import { Separator } from '~/components/ui/separator';
import { cn } from '~/lib/utils';
import type { Schedule } from '../-dummy/info';

function Schedule({
  info,
  isLastIndex,
  isSecondLastIndex,
}: {
  info: Schedule;
  isLastIndex: boolean;
  isSecondLastIndex: boolean;
}) {
  return (
    <div className="flex justify-between space-x-6">
      {/* Schedule Time */}
      <div className="flex flex-col">
        <p className="text-[#212525]">{info.timeStart}</p>
        <p className="text-[#BCC1CD]">{info.timeEnd}</p>
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
          'mb-4 flex min-h-36 min-w-[250px] max-w-[300px] flex-col gap-2 rounded-2xl p-4 text-white',
          info.category === 'Himpunan' ? 'bg-green-300' : 'bg-yellow-300',
        )}
      >
        <div className="flex justify-between">
          <p className="font-semibold">{info.title}</p>
          <p className="font-extrabold">∶</p>
        </div>

        <p className="text-sm">{info.description}</p>

        <div className="flex items-center gap-1">
          <img src="/img/home/location.svg" alt="Location" className="size-4" />
          <p className="text-sm">{info.location}</p>
        </div>

        <div className="flex w-fit items-center gap-2 rounded-xl bg-white px-2 py-1">
          <div
            className={cn(
              'size-2 rounded-full',
              info.category === 'Himpunan' ? 'bg-green-300' : 'bg-yellow-300',
            )}
          ></div>
          <p className="text-xs text-black">{info.category}</p>
        </div>
      </div>
    </div>
  );
}

export default Schedule;
