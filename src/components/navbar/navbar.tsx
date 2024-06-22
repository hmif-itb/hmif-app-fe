import BottomNavigationItem from './bottom-navigation-item';
import HomeIcon from '../icons/home';
import QuestionMarkIcon from '../icons/question-mark';
import SettingsIcon from '../icons/settings';

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
          Icon={HomeIcon}
          alt="Home"
          title="Home"
        />

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
