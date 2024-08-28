import { forwardRef, useState } from 'react';

import { Drawer, DrawerContent, DrawerTrigger } from '~/components/ui/drawer';
import FilterContent from './filtercontent';

import FilterIcon from '~/assets/icons/searchbar/filter.svg';
import ReadIcon from '~/assets/icons/searchbar/read.svg';
import SearchIcon from '~/assets/icons/searchbar/search.svg';
import { Input } from '~/components/ui/input';
import { FilterProps } from '../-types';

type ComponentProps = {
  search: string;
  setSearch: (value: string) => void;
} & FilterProps;

export default function SearchBar({
  search,
  setSearch,
  ...props
}: ComponentProps) {
  const [drawerState, openDrawer] = useState(false);

  return (
    <form className="relative my-10 flex w-full flex-row items-center justify-center gap-5">
      <div className="relative w-[70%] text-xs lg:w-full">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search..."
          className="h-auto w-full rounded-full border-2 border-black py-2 pl-4 shadow-sm outline-none lg:border-2 lg:py-3 lg:text-sm lg:font-semibold"
          name=""
          id=""
        />
        <button className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-green-900 p-[.57rem] lg:p-[.8rem]">
          <img
            alt="Search Button"
            src={SearchIcon}
            className="size-4 lg:size-5"
          />
        </button>
      </div>
      <div className="flex flex-row gap-5 lg:hidden">
        <ThumbToggle
          Icon={ReadIcon}
          isPressed={props.filter.unread}
          onClick={() => props.setFilter({ unread: !props.filter.unread })}
        />
        <Drawer>
          <DrawerTrigger
            asChild
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
            className="z-[100] bg-[#EAEEEB] p-0"
          >
            <FilterContent
              {...props}
              handleCloseDrawer={() => openDrawer(false)}
            />
          </DrawerContent>
        </Drawer>
      </div>
    </form>
  );
}

type ThumbToggleProps = {
  Icon: string;
  isPressed: boolean;
  onClick?: () => void;
};

const ThumbToggle = forwardRef<HTMLButtonElement, ThumbToggleProps>(
  ({ Icon, isPressed, onClick }, ref) => {
    return (
      <button
        ref={ref}
        className={`${
          isPressed ? `bg-green-900` : `bg-white `
        } rounded-[14.4px] border border-black p-[.6rem] shadow-sm`}
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
  },
);
