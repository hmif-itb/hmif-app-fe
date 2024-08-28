import { Link } from '@tanstack/react-router';

type ComponentProps = {
  icon: string;
  title: string;
  linkFrom: string;
  linkTo: string;
};

export default function TestiListItem({
  icon,
  title,
  linkFrom,
  linkTo,
}: ComponentProps): JSX.Element {
  return (
    <Link
      from={linkFrom}
      to={linkTo}
      className="flex w-full items-center gap-4 rounded-xl bg-white p-4"
    >
      <img alt="" src={icon} className="size-8" />
      <p>{title}</p>
    </Link>
  );
}
