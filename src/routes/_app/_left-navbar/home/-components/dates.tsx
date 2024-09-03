import { Dayjs } from 'dayjs';
import { Dot } from 'lucide-react';
import { cn } from '~/lib/utils';

function Dates({
  date,
  currentDate,
  onClick,
}: {
  date: Dayjs;
  currentDate: Dayjs;
  onClick: (date: Dayjs) => void;
}) {
  const isSame = currentDate.isSame(date, 'date');
  return (
    <button
      className={cn(
        'flex flex-col items-center rounded-xl px-3 py-2 font-inter sm:px-4',
        isSame && 'bg-yellow-100',
      )}
      onClick={() => onClick(date)}
    >
      <p
        className={cn(
          'text-lg',
          isSame ? 'font-bold text-green-400' : 'font-semibold',
        )}
      >
        {date.date()}
      </p>
      <p
        className={cn(
          'text-base',
          isSame ? 'text-green-400' : 'text-[#94A3B8]',
        )}
      >
        {date.format('ddd')}
      </p>
      {isSame && <Dot className="text-green-300" />}
    </button>
  );
}

export default Dates;
