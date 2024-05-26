import { User } from '~/api/generated';
import { timeToMessage } from '~/routes/dashboard/-lib/utils';
import { Button } from './ui/button';

function Profile({ user }: { user: User }) {
  return (
    <section className="flex w-full max-w-[500px] items-center justify-between px-4 pt-4 lg:max-w-full">
      <div className="flex items-center gap-4">
        <img
          src={user.picture}
          alt="User Profile"
          className="size-[3.3125rem] rounded-full"
        />

        <div>
          <p>Hi, {user.fullName}!</p>
          <p className="font-bold">{timeToMessage()}</p>
        </div>
      </div>
      <Button className="rounded-[18px] border border-solid border-black bg-yellow-100 p-2">
        <img src="/dashboard/bell.svg" alt="Bell" className="size-6" />
      </Button>
    </section>
  );
}

export default Profile;
