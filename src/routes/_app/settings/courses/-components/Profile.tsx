import Avatar from '~/components/user/avatar';
import useSession from '~/hooks/auth/useSession';
import { cn } from '~/lib/utils';

export default function Profile({ className }: { className?: string }) {
  const user = useSession();
  return (
    <section
      className={cn(
        'flex w-full items-center gap-4 px-5 py-4 lg:gap-9',
        className,
      )}
    >
      <Avatar
        src={user.picture}
        alt="User Profile"
        className="size-[3.3125rem] lg:size-[5.25rem]"
      />

      <div>
        <p className="font-bold lg:text-heading-md">{user.fullName}</p>
        <p className="text-[#B0B3B0] lg:text-body-xl lg:text-neutral-darker">
          {user.email}
        </p>
      </div>
    </section>
  );
}
