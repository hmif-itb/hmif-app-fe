import { cn } from '~/lib/utils';
import { Button } from '~/components/ui/button';

function NavigationItem({
  src,
  alt,
  title,
  onClick,
  highlighted = false,
}: {
  src: string;
  alt: string;
  title: string;
  onClick: () => void;
  highlighted?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-3 text-center text-[10px] md:text-sm">
      <div className={cn('relative', highlighted && 'animate-pulse')}>
        {highlighted && (
          <span
            aria-hidden="true"
            className="absolute -inset-1.5 rounded-full bg-amber-400/60 blur-sm"
          />
        )}
        <Button
          size={'sm'}
          className={cn(
            'relative flex size-14 items-center justify-center rounded-full border border-solid border-black bg-white md:size-16',
            highlighted && 'ring-4 ring-amber-400 ring-offset-2',
          )}
          onClick={onClick}
        >
          <img
            src={src}
            alt={alt}
            className="size-7 shrink-0 object-contain md:size-8"
          />
        </Button>
      </div>
      <p className={cn(highlighted && 'font-bold text-green-800')}>{title}</p>
    </div>
  );
}

export default NavigationItem;
