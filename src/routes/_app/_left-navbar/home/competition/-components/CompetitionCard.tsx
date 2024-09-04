import { Link } from '@tanstack/react-router';
import dayjs from 'dayjs';
import { CompetitionCategories } from '~/api/generated';
import CalendarIcon from '~/assets/icons/competition/calendar.svg';
import LinkIcon from '~/assets/icons/competition/link.svg';
import MoneyIcon from '~/assets/icons/competition/money.svg';

type ComponentProps = {
  name: string;
  organizer: string;
  categories: CompetitionCategories;
  registrationStart: Date;
  registrationDeadline: Date;
  registrationUrl?: string;
  price?: number;
  imageURL?: string;
};

export default function CompetitionCard(props: Readonly<ComponentProps>) {
  const {
    name,
    organizer,
    categories,
    registrationStart,
    registrationDeadline,
    registrationUrl,
    price,
    imageURL,
  } = props;

  return (
    <div className="flex size-full flex-col overflow-hidden rounded-xl">
      <div className="aspect-[3/4] w-full bg-gradient-to-br from-blue-300 to-blue-500">
        {imageURL ? (
          <img
            src={imageURL}
            className="aspect-[3/4] w-full object-cover object-center"
            alt="poster"
          ></img>
        ) : null}
      </div>

      <div className="relative z-[1] -mt-2 flex w-full flex-1 flex-col rounded-xl bg-[#F7F6FA]">
        <div className="flex w-full flex-1 justify-between gap-2 p-4">
          <div className="flex w-1/2 flex-col gap-1.5">
            <h2 className="font-semibold">{name}</h2>
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
                {dayjs(registrationStart).format('DD-MM-YYYY')} -{' '}
                {dayjs(registrationDeadline).format('DD-MM-YYYY')}
              </p>
            </div>

            {registrationUrl && (
              <div className="flex items-center gap-1 text-xs">
                <img src={LinkIcon} className="size-4" alt="" />
                <Link
                  to={
                    registrationUrl.startsWith('http')
                      ? registrationUrl
                      : `https://${registrationUrl}`
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  {registrationUrl}
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1 text-xs">
            <img src={MoneyIcon} className="size-4" alt="" />
            {price && price > 0
              ? new Intl.NumberFormat('id', {
                  style: 'currency',
                  currency: 'IDR',
                }).format(price)
              : 'FREE'}
          </div>
        </div>
      </div>
    </div>
  );
}
