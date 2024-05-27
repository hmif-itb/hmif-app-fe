import { User } from '~/api/generated';
import { cn } from '~/lib/utils';

const ProfilePost = ({ type, profile }: { type: string; profile: User }) => {
  if (!profile) {
    return null;
  }
  return (
    <div className="flex items-center">
      <div className="relative">
        <img
          // TODO: default picture if null
          src={profile.picture!}
          alt="Avatar"
          className={cn(
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
