import BottomNavigationItem from './bottom-navigation-item';
import { useState } from 'react';

function Navbar() {
  const [isSelected, setIsSelected] = useState(true);

  function handleSelected() {
    // setIsSelected(!isSelected);
    console.log(isSelected);
  }

  return (
    <section className="px-8 pb-4 flex justify-between max-w-[400px] w-full">
      <section className="px-8 pb-4 flex justify-between max-w-[400px] w-full">
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
