import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import dayjs from 'dayjs';

function getTimeLeft(target: Date) {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) {
    return { done: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  return {
    done: false,
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number) {
  return n.toString().padStart(2, '0');
}

type ComponentProps = {
  target: Date;
  onDone?: () => void;
};

export default function CountdownTimer(props: Readonly<ComponentProps>) {
  const { target, onDone } = props;
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(target));

  useEffect(() => {
    const interval = setInterval(() => {
      const next = getTimeLeft(target);
      setTimeLeft(next);
      if (next.done) onDone?.();
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  const units: { label: string; value: number }[] = [
    { label: 'Hari', value: timeLeft.days },
    { label: 'Jam', value: timeLeft.hours },
    { label: 'Menit', value: timeLeft.minutes },
    { label: 'Detik', value: timeLeft.seconds },
  ];

  return (
    <div className="flex w-full flex-col items-center gap-4 rounded-lg bg-white/90 p-6">
      <p className="flex flex-wrap items-center justify-center gap-2 break-words text-center text-sm font-semibold text-neutral-black">
        <Clock className="size-4 shrink-0" />
        Form dibuka {dayjs(target).format('DD MMMM YYYY, HH.mm')} WIB
      </p>
      {timeLeft.done ? (
        <p className="text-center text-sm text-green-800">
          Form sudah dibuka, silakan muat ulang halaman.
        </p>
      ) : (
        <div className="flex w-full max-w-sm items-center gap-2">
          {units.map((u) => (
            <div
              key={u.label}
              className="flex flex-1 flex-col items-center rounded-md bg-green-950 py-3 text-white"
            >
              <span className="text-xl font-bold leading-none lg:text-3xl">
                {pad(u.value)}
              </span>
              <span className="text-[10px] uppercase leading-none opacity-80">
                {u.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
