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
    <div className="flex flex-col items-center gap-3 text-center">
      <Button
        className="flex size-[4.5rem] flex-col items-center justify-center rounded-full border border-solid border-black bg-white"
        onClick={onClick}
      >
        <img src={src} alt={alt} className="size-[2.625rem]" />
      </Button>
      <p>{title}</p>
    </div>
  );
}

export default NavigationItem;
