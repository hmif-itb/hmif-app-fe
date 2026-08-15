import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

const DEADLINE = new Date('2026-08-23T23:59:00+07:00');

function getTimeLeft() {
  const diff = DEADLINE.getTime() - Date.now();
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

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (timeLeft.done) {
    return (
      <div className="flex w-full items-center gap-2 rounded-lg bg-red-100 p-3 text-sm font-semibold text-red-700">
        <Clock className="size-4 shrink-0" />
        <span>Batas waktu pengisian pilihan magang SPARTA sudah berakhir.</span>
      </div>
    );
  }

  const units: { label: string; value: number }[] = [
    { label: 'Hari', value: timeLeft.days },
    { label: 'Jam', value: timeLeft.hours },
    { label: 'Menit', value: timeLeft.minutes },
    { label: 'Detik', value: timeLeft.seconds },
  ];

  return (
    <div className="flex w-full flex-col gap-2 rounded-lg bg-white/90 p-3">
      <p className="flex items-center gap-2 text-xs font-semibold text-neutral-black">
        <Clock className="size-4 shrink-0" />
        Batas waktu pengisian: 23 Agustus 2026, 23.59 WIB
      </p>
      <div className="flex items-center gap-2">
        {units.map((u) => (
          <div
            key={u.label}
            className="flex flex-1 flex-col items-center rounded-md bg-green-950 py-2 text-white"
          >
            <span className="text-lg font-bold leading-none lg:text-2xl">
              {pad(u.value)}
            </span>
            <span className="text-[10px] uppercase leading-none opacity-80">
              {u.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
