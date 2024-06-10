import {
  Link,
  Outlet,
  createFileRoute,
  useMatch,
} from '@tanstack/react-router';
import CoursesIcon from '~/assets/icons/settings/courses.svg';
import SubscriptionIcon from '~/assets/icons/settings/subscription.svg';
import Avatar from '~/components/user/avatar';
import useSession from '~/hooks/auth/useSession';

export const Route = createFileRoute('/_app/settings/')({
  component: SettingsPage,
});

function SettingsPage() {
  const match = useMatch({ from: '/_app/settings/' });
  return (
    <>
      {match && <SettingMobile />}
      <Outlet />
    </>
  );
}

const settingsOptions = [
  {
    icon: CoursesIcon,
    title: 'Set Courses',
    href: '/settings/courses',
  },
  {
    icon: SubscriptionIcon,
    title: 'Subscription',
    href: '/settings/courses',
  },
] as const;

function SettingMobile() {
  const user = useSession();
  return (
    <div className="flex h-full flex-col bg-[#30764B] lg:hidden lg:bg-transparent">
      <div className="flex flex-col items-center py-6">
        <Avatar
          alt={user.fullName}
          src={user.picture}
          className="size-[5.25rem]"
        />
        <h3 className="text-heading-sm mt-4 font-bold text-white">
          {user.fullName}
        </h3>
        <p className="text-body-lg text-neutral-normal-hover">{user.email}</p>
      </div>
      <div className="flex-1 rounded-t-2xl bg-green-50 px-7 py-9">
        <ul className="flex flex-col gap-1 rounded-[0.375rem] bg-white">
          <ProfileItem title="NIM" text={user.nim} />
          <ProfileItem title="Jenis Keanggotaan" text={user.membershipStatus} />
          <ProfileItem
            title="Angkatan"
            text={`${user.major}'${user.angkatan}`}
          />
        </ul>
        <ul className="mt-6 flex flex-col gap-1 rounded-[0.375rem] bg-white">
          {settingsOptions.map((option) => (
            <Link
              to="/settings/courses"
              className="text-body-lg flex items-center gap-9 p-3 pl-6 font-bold"
              key={option.title}
            >
              <img src={option.icon} alt={option.title} aria-hidden="true" />
              <span>{option.title}</span>
            </Link>
          ))}
        </ul>
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
