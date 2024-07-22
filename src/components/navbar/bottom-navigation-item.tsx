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
      className={`flex size-[4.5625rem] flex-col items-center justify-center rounded-full border-2 border-transparent data-[status]:border-green-300`}
      to={to as undefined}
      activeProps={{
        className: 'font-bold text-green-300 bg-yellow-75',
      }}
      alt={alt}
    >
      <Icon className="size-[2.625rem]" />
      <span className={`text-[0.625rem]`}>{title}</span>
    </Link>
  );
}

export default BottomNavigationItem;
