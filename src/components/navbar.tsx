import BottomNavigationItem from './bottom-navigation-item';
import { useState } from 'react';

function Navbar() {
  const [isSelected] = useState(true);

  function handleSelected() {
    // setIsSelected(!isSelected);
    console.log(isSelected);
  }

  return (
    <section className="flex w-full max-w-[400px] justify-between px-8 pb-4">
      <section className="flex w-full max-w-[400px] justify-between px-8 pb-4">
        <BottomNavigationItem
          src="/main-dashboard/question-mark.svg"
          alt="Info"
          title="Info"
          isSelected={isSelected}
          onClick={handleSelected}
        />

        <BottomNavigationItem
          src="/main-dashboard/house.svg"
          alt="Home"
          title="Home"
          isSelected={!isSelected}
          onClick={handleSelected}
        />

        <BottomNavigationItem
          src="/main-dashboard/settings.svg"
          alt="Settings"
          title="Settings"
          isSelected={!isSelected}
          onClick={handleSelected}
        />
      </section>
    </section>
  );
}

export default Navbar;
