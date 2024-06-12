import { cn } from '~/lib/utils';
import Avatar from './avatar';

type ComponentProps = {
  name: string;
  email: string;
  imageURL: string | null;
  className?: string;
  avatarClassName?: string;
  nameClassName?: string;
  emailClassName?: string;
};

export default function UserInfo({
  name,
  email,
  imageURL,
  className,
  avatarClassName,
  nameClassName,
  emailClassName,
}: ComponentProps): JSX.Element {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <Avatar src={imageURL} alt={name} className={avatarClassName} />

      <div>
        <h3 className={cn('text-body-lg font-bold', nameClassName)}>{name}</h3>
        <p className={cn('text-xs text-[#6A6B6A]', emailClassName)}>{email}</p>
      </div>
    </div>
  );
}
