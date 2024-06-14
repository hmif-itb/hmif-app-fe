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

/**
 * User info component to display profile picture, name, and email
 * @component
 * @param name - User's name
 * @param email - User's email
 * @param imageURL - User's profile picture URL
 * @param [className] - Additional class name for the container
 * @param [avatarClassName] - Additional class name for the avatar
 * @param [nameClassName] - Additional class name for the name
 * @param [emailClassName] - Additional class name for the email
 */
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
