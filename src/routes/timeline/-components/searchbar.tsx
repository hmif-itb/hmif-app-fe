import { useState } from 'react';

import { Drawer, DrawerTrigger } from '~/components/ui/drawer';
import FilterContent from './filtercontent';

import SearchIcon from '~/assets/icons/searchbar/search.svg';
import ReadIcon from '~/assets/icons/searchbar/read.svg';
import FilterIcon from '~/assets/icons/searchbar/filter.svg';

export default function SearchBar() {
  const [drawerState, openDrawer] = useState(false);
  const [readState, setRead] = useState(false);

  return (
    <form className="w-full relative flex flex-row justify-center my-10 items-center gap-5">
      <div className="relative text-[11.25px] w-[70%]">
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-4 py-1 rounded-full outline-none border-[.8px] border-black shadow-sm"
          name=""
          id=""
        />
        <button className="absolute right-0 top-[49%] -translate-y-1/2 p-[.57rem] bg-green-900 rounded-full">
          <img alt="Search Button" src={SearchIcon} className="size-2" />
        </button>
      </div>
      <ThumbToggle
        Icon={ReadIcon}
        isPressed={readState}
        onClick={() => {
          setRead((a) => (a = !a));
        }}
      />
      <Drawer>
        <DrawerTrigger
          onClick={() => {
            openDrawer((a) => (a = !a));
          }}
        >
          <ThumbToggle Icon={FilterIcon} isPressed={drawerState} />
        </DrawerTrigger>
        <FilterContent
          onInteractOutside={() => {
            openDrawer((a) => (a = !a));
          }}
        />
      </Drawer>
    </form>
  );
}

function ThumbToggle({
  Icon,
  isPressed,
  onClick,
}: {
  Icon: string;
  isPressed: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      className={`${isPressed ? `bg-green-900` : `bg-white `} rounded-[14.4px] p-[.6rem] shadow-sm border-[.8px] border-black`}
      type="button"
      onClick={onClick}
    >
      <img
        alt="A button"
        src={Icon}
        className={`size-3 ${isPressed ? `invert` : ``}`}
      />
    </button>
  );
}
