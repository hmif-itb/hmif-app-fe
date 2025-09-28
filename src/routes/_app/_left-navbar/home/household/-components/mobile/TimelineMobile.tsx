import dayjs from 'dayjs';
import { cn } from '~/lib/utils';
import type { EventType } from '../../-api';

interface TimelineMobileProps {
  events: EventType[];
  isLoading: boolean;
}

const formatEventTime = (value: Date) => dayjs(value).format('HH.mm');

function TimelineMobile({ events, isLoading }: TimelineMobileProps) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-[#333333]">Peminjaman</h2>
      <div className="rounded-3xl">
        <div className="grid grid-cols-[4rem_1fr] items-center gap-4  pb-3 text-[15px] font-medium tracking-wide text-[#BCC1CD]">
          <span>Time</span>
          <span>Agenda</span>
        </div>
        <div className="mt-4 flex flex-col gap-6">
          {isLoading ? (
            Array.from({ length: 2 }).map((_, idx) => (
              <div
                key={`timeline-skeleton-${idx}`}
                className="grid grid-cols-[4rem_1fr] items-start gap-4"
              >
                <div className="h-4 w-12 animate-pulse rounded bg-[#ECECEC]" />
                <div className="flex items-stretch gap-3">
                  <div className="flex flex-col items-center">
                    <span className="mt-1 size-2.5 rounded-full bg-[#ECECEC]" />
                    <span className="mt-2 h-12 w-px bg-[#ECECEC]" />
                  </div>
                  <div className="h-16 flex-1 animate-pulse rounded-2xl bg-[#ECECEC]" />
                </div>
              </div>
            ))
          ) : events.length > 0 ? (
            events.map((event, idx) => (
              <div
                key={`${event.title}-${idx}`}
                className="grid grid-cols-[4rem_1fr] items-start gap-4"
              >
                <span className="text-sm font-semibold text-[#305138]">
                  {formatEventTime(event.start_time)}
                </span>
                <div className="flex items-stretch gap-3">
                  <div className="flex flex-col items-center">
                    <span className="mt-1 size-[18px] rounded-full border-[5px] border-[#305138] bg-white" />
                    {idx !== events.length - 1 && (
                      <span className="mt-2 h-14 w-px bg-[#525352]" />
                    )}
                  </div>
                  <div
                    className={cn(
                      'flex-1 rounded-2xl p-4 text-white shadow-sm',
                      event.type === 'properti'
                        ? 'bg-[#2F5C3B]'
                        : 'bg-[#2A4F34]',
                    )}
                  >
                    <p className="text-base font-semibold leading-tight">
                      {event.title}
                    </p>
                    <p className="mt-[10px] text-xs text-[#DDE8DF]">
                      {event.user}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-sm text-[#6C6C6C]">
              Tidak ada peminjaman pada tanggal ini.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default TimelineMobile;
