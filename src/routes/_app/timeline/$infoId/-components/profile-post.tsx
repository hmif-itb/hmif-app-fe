import clsx from 'clsx';
import { User } from '~/api/generated';
import Avatar from '~/components/user/avatar';

const ProfilePost = ({ type, profile }: { type: string; profile: User }) => {
  if (!profile) {
    return null;
  }
  return (
    <div className="flex items-center">
      <div className="relative">
        <Avatar
          src={profile.picture!}
          alt={profile.fullName}
          className={clsx(
            'rounded-full',
            type == 'poster' && 'size-12',
            type == 'commenter' && 'size-9',
          )}
        />
      </div>
      <div className="ml-3">
        <p className="text-base font-semibold leading-6">{profile.fullName}</p>
        <p className="text-xs text-neutral-dark-active">{profile.email}</p>
      </div>
    </div>
  );
};

export default ProfilePost;
