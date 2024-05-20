import { Dot } from 'lucide-react';

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
      className={`flex flex-col items-center ${currentDate === date.date ? 'bg-yellow-100' : ''} rounded-xl px-3 py-2 font-inter sm:px-4`}
      onClick={() => onClick(date.date)}
    >
      <p
        className={`${currentDate === date.date ? 'font-bold text-green-400' : 'font-semibold'} text-lg`}
      >
        {date.date}
      </p>
      <p
        className={`${currentDate === date.date ? 'font-medium text-green-400' : 'font-normal text-[#94A3B8]'} text-base`}
      >
        {date.day}
      </p>
      {currentDate === date.date && <Dot className="text-green-300" />}
    </button>
  );
}

export default Dates;
