/* eslint-disable tailwindcss/no-custom-classname */
import { Link, LinkProps } from '@tanstack/react-router';
import QuestionMarkIcon from '../icons/question-mark';

function BottomNavigationItem({
  Icon,
  alt,
  title,
  to,
}: {
  Icon: typeof QuestionMarkIcon;
  alt: string;
  title: string;
  to: LinkProps['to'];
}) {
  return (
    <Link
      className={`flex size-[4.5625rem] flex-col items-center justify-center rounded-full `}
      to={to as undefined}
      activeProps={{
        className:
          'font-bold text-green-300 [&>svg]:fill-green-300 [&>svg]:stroke-neutral-light',
      }}
      alt={alt}
    >
      <Icon className="active-icon size-[2.625rem] fill-transparent stroke-black" />
      <span className={`text-[0.625rem]`}>{title}</span>
    </Link>
  );
}

export default BottomNavigationItem;
