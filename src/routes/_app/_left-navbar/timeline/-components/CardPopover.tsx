import { useState } from 'react';
import HamburgerIcon from '~/assets/icons/timeline/hamburger.svg';
import MarkAsReadIcon from '~/assets/icons/timeline/mark-as-read.svg';
import MegaphoneSmall from '~/assets/icons/timeline/megaphone-small.svg';
import TrashIcon from '~/assets/icons/timeline/trash.svg';
import { Button } from '~/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';

type ComponentProps = {
  showRead?: boolean;
  isRead?: boolean;
  onRead?: (unread: boolean) => void;
  showDelete?: boolean;
  onDelete?: () => void;
  showreannounce?: boolean;
  onReannounce?: () => void;
};

export default function CardPopover(props: Readonly<ComponentProps>) {
  const {
    showRead,
    onRead,
    showDelete,
    onDelete,
    showreannounce,
    onReannounce,
  } = props;
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <img src={HamburgerIcon} className="size-5" alt="" />
      </PopoverTrigger>

      <PopoverContent className="w-fit px-4 py-3" align="end">
        <ul className="flex flex-col gap-4">
          {showRead && (
            <li className="flex flex-col gap-4 leading-none">
              <Button
                onClick={() => {
                  onRead?.(!!props.isRead);
                  setOpen(false);
                }}
                variant="link"
                className="p-0 text-xs font-normal md:text-sm"
              >
                <img src={MarkAsReadIcon} className="size-4 md:size-5" alt="" />
                {props.isRead ? 'Mark as unread' : 'Mark as read'}
              </Button>
              {showreannounce && (
                <Button
                  onClick={() => {
                    onReannounce?.();
                    setOpen(false);
                  }}
                  variant="link"
                  className="p-0 text-xs font-normal md:text-sm"
                >
                  <img
                    src={MegaphoneSmall}
                    className="size-4 p-0.5 md:size-5"
                    alt=""
                  />
                  Reannounce
                </Button>
              )}
            </li>
          )}
          {showDelete && (
            <li className="leading-none">
              <Button
                variant="link"
                className="p-0 text-xs font-normal text-[#FF3B30] md:text-sm"
                onClick={() => {
                  onDelete?.();
                  setOpen(false);
                }}
              >
                <img src={TrashIcon} className="size-4 md:size-5" alt="" />
                Delete
              </Button>
            </li>
          )}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
