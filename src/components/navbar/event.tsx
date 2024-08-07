import { useState } from 'react';
import { Drawer, DrawerContent, DrawerTrigger } from '~/components/ui/drawer';
import { AddEventPage } from '~/routes/_app/add-event';

export default function Event() {
  const [isOpen, setOpen] = useState(false);

  return (
    <Drawer open={isOpen} shouldScaleBackground>
      <DrawerTrigger
        onClick={() => {
          setOpen(true);
        }}
      >
        Open
      </DrawerTrigger>
      <DrawerContent className="h-[95%] bg-white">
        <AddEventPage setDrawer={setOpen} />
      </DrawerContent>
    </Drawer>
  );
}
