import { Link } from '@tanstack/react-router';
import clsx from 'clsx';
import dayjs from 'dayjs';
import CalendarIcon from '~/assets/icons/competition/calendar.svg';
import LinkIcon from '~/assets/icons/competition/link.svg';
import MoneyIcon from '~/assets/icons/competition/money.svg';

type ComponentProps = {
  title: string;
  organizer: string;
  categories: string[];
  startDate: Date;
  endDate: Date;
  link?: string;
  entranceFee?: number;
  imageURL?: string;
};

export default function CompetitionCard(props: Readonly<ComponentProps>) {
  const {
    title,
    organizer,
    categories,
    startDate,
    endDate,
    link,
    entranceFee,
    imageURL,
  } = props;

  return (
    <div className="w-full overflow-hidden rounded-xl">
      {imageURL && (
        <img
          src={imageURL}
          className="aspect-[3/4] w-full object-cover object-center"
          alt="poster"
        ></img>
      )}

      <div
        className={clsx(
          'relative z-[1] w-full rounded-xl bg-[#F7F6FA]',
          imageURL && '-mt-2',
        )}
      >
        <div className="flex w-full justify-between gap-2 p-4">
          <div className="flex w-1/2 flex-col gap-1.5">
            <h2 className="font-semibold">{title}</h2>
            <p className="text-xs">{organizer}</p>
          </div>

          <ul className="flex flex-wrap items-start justify-end gap-1">
            {categories.map((c, idx) => (
              <li
                key={idx}
                className="rounded-xl bg-yellow-75 px-2 py-1 text-[10px] text-yellow-500"
              >
                {c}
              </li>
            ))}
          </ul>
        </div>

        <hr />

        <div className="flex w-full items-start justify-between gap-2 p-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-1 text-xs">
              <img src={CalendarIcon} className="size-4" alt="" />
              <p className="text-balance">
                {dayjs(startDate).format('DD-MM-YYYY')} -{' '}
                {dayjs(endDate).format('DD-MM-YYYY')}
              </p>
            </div>

            {link && (
              <div className="flex items-center gap-1 text-xs">
                <img src={LinkIcon} className="size-4" alt="" />
                <Link to={link} target="_blank" rel="noreferrer">
                  {link}
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1 text-xs">
            <img src={MoneyIcon} className="size-4" alt="" />
            {entranceFee && entranceFee > 0
              ? new Intl.NumberFormat('id', {
                  style: 'currency',
                  currency: 'IDR',
                }).format(entranceFee)
              : 'FREE'}
          </div>
        </div>
      </div>
    </div>
  );
}
