import QuestionMarkIcon from '../icons/question-mark';
import SettingsIcon from '../icons/settings';
import BottomNavigationItem from './bottom-navigation-item';
// import AddEvent from '~/routes/_app/add-event/add-event';
import HomeFilledIcon from '../icons/home-filled';

function Navbar() {
  return (
    <div className="sticky bottom-0 z-20 flex flex-col justify-end">
      <nav className="flex w-full justify-between bg-neutral-light px-8 py-2 lg:hidden">
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
    </div>
  );
}

export default Navbar;
