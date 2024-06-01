import { cn } from '~/lib/utils';

export interface AvatarProps {
  src?: string | null;
  alt: string;
  className?: string;
  imgClassName?: string;
}

function Avatar({ alt, src, className, imgClassName }: AvatarProps) {
  return (
    <div
      className={cn(
        'size-[3.25rem] overflow-hidden rounded-full bg-[#E8C55F]',
        className,
      )}
    >
      {src && <img src={src} alt={alt} className={cn(imgClassName)} />}
    </div>
  );
}

export default Avatar;
