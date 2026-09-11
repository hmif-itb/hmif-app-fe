import { Link } from '@tanstack/react-router';
import { Button } from '~/components/ui/button';
import Avatar from '~/components/user/avatar';
import useLogout from '~/hooks/auth/useLogout';
import useSession from '~/hooks/auth/useSession';
import { settingsOptions } from '../-config/settings-options';

export default function SettingsMobile() {
  const user = useSession();
  const { logout } = useLogout();
  return (
    <div className="flex h-full flex-col bg-[#30764B] lg:hidden lg:bg-transparent">
      <div className="flex flex-col items-center py-6">
        <Avatar
          alt={user.fullName}
          src={user.picture}
          className="size-[5.25rem]"
        />
        <h3 className="mt-4 text-heading-sm font-bold text-white">
          {user.fullName}
        </h3>
        <p className="text-body-lg text-neutral-normal-hover">{user.email}</p>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto rounded-t-2xl bg-green-50 px-7 py-9 pb-28 lg:pb-6">
        <ul className="flex flex-col gap-1 rounded-[0.375rem] bg-white">
          <ProfileItem title="NIM" text={user.nim} />
          <ProfileItem title="Jenis Keanggotaan" text={user.membershipStatus} />
          <ProfileItem
            title="Angkatan"
            text={`${user.major}'${user.angkatan}`}
          />
        </ul>
        <div className="mt-6 flex flex-col gap-1 rounded-[0.375rem] bg-white">
          {settingsOptions.map((option) => (
            <Link
              to={option.href}
              className="flex items-center gap-9 p-3 pl-6 text-body-lg font-bold"
              key={option.title}
            >
              <img src={option.icon} alt={option.title} aria-hidden="true" />
              <span>{option.title}</span>
            </Link>
          ))}
        </div>
        <div className="mt-4 flex flex-1 items-center">
          <Button
            variant={'link'}
            className="w-full text-[#FF3B30]"
            onClick={() => logout()}
          >
            Log out
          </Button>
        </div>
      </div>
    </div>
  );
}

function ProfileItem({ title, text }: { title: string; text: string }) {
  return (
    <li className="flex justify-between p-3">
      <span className="text-body-lg font-bold">{title}</span>
      <span className="text-body-lg text-[#525352]">{text}</span>
    </li>
  );
}
