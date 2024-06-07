import clsx from 'clsx';
import { User } from '~/api/generated';
import Avatar from '~/components/user/avatar';
import { cn } from '~/lib/utils';

function InfoCreator({
  creator,
  isComment,
  className,
}: {
  creator: User;
  isComment?: boolean;
  className?: string;
}) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <Avatar
        src={creator.picture}
        alt={creator.fullName}
        className={clsx(isComment ? 'size-9' : 'size-[3.25rem]')}
      />
      <div className="flex flex-col items-baseline">
        <h3 className="m-0 text-base font-semibold">{creator.fullName}</h3>
        <span className="text-xs leading-6 text-neutral-dark-active">
          {creator.email}
        </span>
      </div>
    </div>
  );
}

export default InfoCreator;
