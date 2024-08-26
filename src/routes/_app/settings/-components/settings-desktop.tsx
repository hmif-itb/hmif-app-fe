import UserInfo from '~/components/user/user-info';
import useSession from '~/hooks/auth/useSession';
import { useUserAcademic } from '~/hooks/useUserAcademic';

function SettingsDekstop() {
  const user = useSession();
  const { userAcademic } = useUserAcademic();
  return (
    <div className="hidden px-6 py-[3.25rem] lg:block">
      <UserInfo
        name={user.fullName}
        email={user.email}
        imageURL={user.picture}
        className="w-full gap-4 rounded-md border border-[#D2D5DA] px-5 py-4 lg:gap-9"
        avatarClassName="size-[3.3125rem] lg:size-[5.25rem]"
        nameClassName="font-bold lg:text-heading-md"
        emailClassName="text-[#B0B3B0] lg:text-body-xl lg:text-neutral-darker"
      />
      <ul className="mt-9 rounded-md border border-[#D2D5DA] p-6">
        <ProfileItem title="NIM" text={user.nim} />
        <ProfileItem title="Jenis Keanggotaan" text={user.membershipStatus} />
        <ProfileItem title="Angkatan" text={`${user.major}'${user.angkatan}`} />
        <ProfileItem title="Semester" text={`${userAcademic?.semester}`} />
      </ul>
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

export default SettingsDekstop;
