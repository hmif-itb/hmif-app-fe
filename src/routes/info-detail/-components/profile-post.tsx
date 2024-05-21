import { IProfile } from '../-interface/IProfile';

const ProfilePost = ({
  type,
  profile,
}: {
  type: string;
  profile: IProfile;
}) => {
  if (!profile) {
    return null;
  }
  return (
    <div className="flex items-center">
      <div className="relative">
        <img
          src={profile.picture}
          alt="Avatar"
          className={`rounded-full ${type == 'poster' ? 'size-12' : 'size-9'}`}
        />
      </div>
      <div className="ml-3">
        <p className="text-base font-semibold leading-6">{profile.name}</p>
        <p className="text-xs text-neutral-dark-active">{profile.email}</p>
      </div>
    </div>
  );
};

export default ProfilePost;
