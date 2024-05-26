import { Dot } from 'lucide-react';
import { Button } from '~/components/ui/button';
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
    <Button
      className={cn(
        'flex flex-col w-full min-w-[55px] items-center rounded-xl px-3 py-2 font-inter sm:px-4',
        currentDate === date.date ? 'bg-yellow-100 z-10' : 'bg-white',
      )}
      onClick={() => onClick(date.date)}
    >
      <p
        className={cn(
          'text-lg text-black',
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
          currentDate === date.date
            ? 'font-medium text-green-400'
            : 'font-normal text-[#94A3B8]',
        )}
      >
        {date.day}
      </p>
      {currentDate === date.date && <Dot className="text-green-300" />}
    </Button>
  );
}

export default Dates;
