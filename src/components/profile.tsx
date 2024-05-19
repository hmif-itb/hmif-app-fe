import { User } from '~/api/generated';

function Profile({ user }: { user: User }) {
  return (
    <section className="px-4 pt-4 flex justify-between items-center w-full max-w-[500px] lg:max-w-full">
      <div className="flex gap-4 items-center">
        <img
          src={user.picture}
          alt="User Profile"
          className="size-[3.3125rem] rounded-full"
        />

        <div>
          <p>Hi, {user.fullName}!</p>
          <p className="font-bold">Good Morning</p>
        </div>
      </div>
      <button className="bg-yellow-100 p-2 rounded-[18px] border border-black border-solid">
        <img src="/main-dashboard/bell.svg" alt="Bell" className="size-6" />
      </button>
    </section>
  );
}

export default Profile;
