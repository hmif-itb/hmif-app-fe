import { useState } from 'react';

import { Drawer, DrawerTrigger, DrawerContent } from '~/components/ui/drawer';
import FilterContent from './filtercontent';

import FilterIcon from '~/assets/icons/searchbar/filter.svg';
import ReadIcon from '~/assets/icons/searchbar/read.svg';
import SearchIcon from '~/assets/icons/searchbar/search.svg';

export default function SearchBar() {
  const [drawerState, openDrawer] = useState(false);
  const [readState, setRead] = useState(false);

  return (
    <form className="relative my-10 flex w-full flex-row items-center justify-center gap-5">
      <div className="relative w-[70%] text-xs lg:w-full">
        <input
          type="text"
          placeholder="Search..."
          className="w-full rounded-full border border-black py-1 pl-4 shadow-sm outline-none lg:border-2 lg:py-3 lg:text-sm lg:font-semibold"
          name=""
          id=""
        />
        <button className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-green-900 p-[.57rem] lg:p-[.8rem]">
          <img
            alt="Search Button"
            src={SearchIcon}
            className="size-2 lg:size-5"
          />
        </button>
      </div>
      <div className="flex flex-row gap-5 lg:hidden">
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
          <DrawerContent
            onInteractOutside={() => {
              openDrawer((a) => (a = !a));
            }}
            className="bg-green-75"
          >
            <FilterContent />
          </DrawerContent>
        </Drawer>
      </div>
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
      className={`${
        isPressed ? `bg-green-900` : `bg-white `
      } rounded-[14.4px] border-[.8px] border-black p-[.6rem] shadow-sm`}
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
