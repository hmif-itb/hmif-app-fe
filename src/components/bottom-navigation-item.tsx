import { cn } from '~/lib/utils';
import { Button } from './ui/button';

function BottomNavigationItem({
  src,
  alt,
  title,
  isSelected,
  onClick,
}: {
  src: string;
  alt: string;
  title: string;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      onClick={() => onClick()}
      className={cn(
        'flex size-[5rem] flex-col items-center justify-center rounded-full border border-solid border-black bg-white',
        isSelected && 'border-green-300 bg-yellow-75',
      )}
    >
      <img
        src={src}
        alt={alt}
        className={cn(
          'size-[3rem]',
          isSelected &&
            'filter-[invert(26%)_sepia(14%)_saturate(1090%)_hue-rotate(82deg)_brightness(98%)_contrast(92%)]',
        )}
      />
      <p
        className={cn(
          'text-[0.625rem] text-black',
          isSelected && 'font-bold text-green-300',
        )}
      >
        {title}
      </p>
    </Button>
  );
}

export default BottomNavigationItem;
