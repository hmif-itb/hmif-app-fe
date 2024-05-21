import { Link, LinkProps } from '@tanstack/react-router';

function BottomNavigationItem({
  src,
  alt,
  title,
  to,
}: {
  src: string;
  alt: string;
  title: string;
  to: LinkProps['to'];
}) {
  return (
    <Link
      className={`flex size-[4.5625rem] flex-col items-center justify-center rounded-full border-2 border-transparent data-[status]:border-green-300`}
      to={to as undefined}
      activeProps={{
        className:
          'font-bold text-green-300 [&>img]:[filter:invert(26%)_sepia(14%)_saturate(1090%)_hue-rotate(82deg)_brightness(98%)_contrast(92%)] bg-yellow-75',
      }}
    >
      <img src={src} alt={alt} className={`size-[2.625rem]`} />
      <span className={`text-[0.625rem]`}>{title}</span>
    </Link>
  );
}

export default BottomNavigationItem;
