import { cn } from '~/lib/utils';

export interface AvatarProps {
  src?: string | null;
  alt: string;
  className?: string;
  containerClassName?: string;
}

function Avatar({ alt, src, className, containerClassName }: AvatarProps) {
  return (
    <div
      className={cn(
        'size-[3.25rem] overflow-hidden rounded-full bg-[#E8C55F]',
        containerClassName,
      )}
    >
      {src && <img src={src} alt={alt} className={cn(className)} />}
    </div>
  );
}

export default Avatar;
