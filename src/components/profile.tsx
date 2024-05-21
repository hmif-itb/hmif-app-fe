import useSession from '~/hooks/auth/useSession';

function Profile() {
  const user = useSession();
  return (
    <section className="flex w-full max-w-screen-md items-center justify-between px-4 pt-4 lg:max-w-full">
      <div className="flex items-center gap-4">
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
      <button className="rounded-[18px] border border-solid border-black bg-yellow-100 p-2">
        <img src="/main-dashboard/bell.svg" alt="Bell" className="size-6" />
      </button>
    </section>
  );
}

export default Profile;
