import type { Schedule } from '../-dummy/info';
import { Separator } from '~/components/ui/separator';

function Schedule({
  info,
  isLastIndex,
}: {
  info: Schedule;
  isLastIndex: boolean;
}) {
  return (
    <div className="flex justify-between">
      {/* Schedule Time */}
      <div className="flex flex-col">
        <p className="text-[#212525]">{info.timeStart}</p>
        <p className="text-[#BCC1CD]">{info.timeEnd}</p>
      </div>

      {/* Schedule Separator and Dots */}
      <div className="relative">
        <div
          className={`absolute bg-[#245236] size-[1.125rem] rounded-full top-2 left-0 -translate-x-1/2 -translate-y-1/2 ${isLastIndex ? 'bg-[#B0B3B0]' : ''}`}
        ></div>
        <div className="absolute bg-[#D9D9D9] size-2 rounded-full top-2 -left-0 -translate-x-1/2 -translate-y-1/2"></div>
        <Separator
          orientation="vertical"
          className={`bg-[#525352] ${isLastIndex ? 'invisible' : ''}`}
        />
      </div>

      {/* Schedule Info */}
      <div
        className={`flex flex-col min-h-36 text-white rounded-2xl p-4 gap-2 min-w-[250px] max-w-[300px] mb-4 ${info.category === 'Himpunan' ? 'bg-green-300' : 'bg-yellow-300'}`}
      >
        <div className="flex justify-between">
          <p className="font-semibold">{info.title}</p>
          <p className="font-extrabold">∶</p>
        </div>

        <p className="text-sm">{info.description}</p>

        <div className="flex gap-1 items-center">
          <img
            src="/main-dashboard/location.svg"
            alt="Location"
            className="size-4"
          />
          <p className="text-sm">{info.location}</p>
        </div>

        <div className="flex gap-2 items-center bg-white w-fit px-2 py-1 rounded-xl">
          <div
            className={`size-2 rounded-full ${info.category === 'Himpunan' ? 'bg-green-300' : 'bg-yellow-300'}`}
          ></div>
          <p className="text-black text-xs">{info.category}</p>
        </div>
      </div>
    </div>
  );
}

export default Schedule;
