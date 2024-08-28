import QuestionMarkIcon from '../icons/question-mark';
import SettingsIcon from '../icons/settings';
import BottomNavigationItem from './bottom-navigation-item';
// import AddEvent from '~/routes/_app/add-event/add-event';
import HomeFilledIcon from '../icons/home-filled';
import { motion } from 'framer-motion';

function Navbar() {
  return (
    <motion.div
      initial={{ bottom: -100 }}
      animate={{ bottom: 0 }}
      transition={{ duration: 1 }}
      className="fixed z-20 flex w-full flex-col justify-end"
    >
      <nav className="flex w-full justify-between bg-neutral-light px-8 py-3 lg:hidden">
        <BottomNavigationItem
          to="/timeline"
          Icon={QuestionMarkIcon}
          alt="Info"
          title="Info"
        />
        <BottomNavigationItem
          to="/home"
          Icon={HomeFilledIcon}
          alt="Home"
          title="Home"
        />
        {/* <Event /> */}

        <BottomNavigationItem
          to="/settings"
          Icon={SettingsIcon}
          alt="Settings"
          title="Settings"
        />
      </nav>
    </motion.div>
  );
}

export default Navbar;
