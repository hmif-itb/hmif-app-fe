import useSession from '~/hooks/auth/useSession';
import timeToMessage from '~/lib/time';
import Avatar from '../user/avatar';
import { motion } from 'framer-motion';

function Profile() {
  const user = useSession();
  return (
    <section className="flex w-full max-w-screen-md items-center justify-between px-4 pt-4 lg:max-w-full">
      <div className="flex items-center gap-4">
        <Avatar src={user.picture!} alt="User Profile" className="size-11" />

        <div className="text-sm">
          <p>Hi, {user.fullName}!</p>
          <motion.p
            initial={{ opacity: 0, translateY: 15 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 1 }}
            className="font-bold"
          >
            {timeToMessage()}
          </motion.p>
        </div>
      </div>
      {/* <Button className="rounded-[18px] border border-solid border-black bg-yellow-100 p-2">
        <img src="/img/home/bell.svg" alt="Bell" className="size-4" />
      </Button> */}
    </section>
  );
}

export default Profile;
