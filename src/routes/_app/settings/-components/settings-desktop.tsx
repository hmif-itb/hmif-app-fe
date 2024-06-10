import useSession from '~/hooks/auth/useSession';
import Profile from '../courses/-components/Profile';

function SettingsDekstop() {
  const user = useSession();
  return (
    <div className="px-6 py-[3.25rem]">
      <Profile className="rounded-md border border-[#D2D5DA]" />
      <ul className="mt-9 rounded-md border border-[#D2D5DA] p-6">
        <ProfileItem title="NIM" text={user.nim} />
        <ProfileItem title="Jenis Keanggotaan" text={user.membershipStatus} />
        <ProfileItem title="Angkatan" text={`${user.major}'${user.angkatan}`} />
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
