import { Button } from '~/components/ui/button';

function NavigationItem({
  src,
  alt,
  title,
  onClick,
}: {
  src: string;
  alt: string;
  title: string;
  onClick: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-3 text-center text-xs md:text-base">
      <Button
        size={'sm'}
        className="flex size-14 items-center justify-center rounded-full border border-solid border-black bg-white md:size-16"
        onClick={onClick}
      >
        <img src={src} alt={alt} className="size-7 shrink-0 md:size-8" />
      </Button>
      <p>{title}</p>
    </div>
  );
}

export default NavigationItem;
