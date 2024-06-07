import { Dot } from 'lucide-react';
import { cn } from '~/lib/utils';

function Dates({
  date,
  currentDate,
  onClick,
}: {
  date: { date: string; day: string };
  currentDate: string;
  onClick: (date: string) => void;
}) {
  return (
    <button
      className={cn(
        'flex flex-col items-center rounded-xl px-3 py-2 font-inter sm:px-4',
        currentDate === date.date && 'bg-yellow-100',
      )}
      onClick={() => onClick(date.date)}
    >
      <p
        className={cn(
          'text-lg',
          currentDate === date.date
            ? 'font-bold text-green-400'
            : 'font-semibold',
        )}
      >
        {date.date}
      </p>
      <p
        className={cn(
          'text-base',
          currentDate === date.date ? 'text-green-400' : 'text-[#94A3B8]',
        )}
      >
        {date.day}
      </p>
      {currentDate === date.date && <Dot className="text-green-300" />}
    </button>
  );
}

export default Dates;
