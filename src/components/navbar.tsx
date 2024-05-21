import BottomNavigationItem from './bottom-navigation-item';

function Navbar() {
  return (
    <nav className="sticky bottom-0 z-20 flex w-full justify-between bg-neutral-light px-8 py-2 lg:hidden">
      <BottomNavigationItem
        to="/info-detail"
        src="/main-dashboard/question-mark.svg"
        alt="Info"
        title="Info"
      />
      <BottomNavigationItem
        to="/home"
        src="/main-dashboard/house.svg"
        alt="Home"
        title="Home"
      />

      <BottomNavigationItem
        to="/settings"
        src="/main-dashboard/settings.svg"
        alt="Settings"
        title="Settings"
      />
    </nav>
  );
}

export default Navbar;
