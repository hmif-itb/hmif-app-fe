import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
} from '~/components/ui/drawer';
import Options from './options';
import { RadioGroup } from '@radix-ui/react-radio-group';
import Filter from './filter';

export default function FilterContent() {
  const data = [
    {
      header: 'Category',
      choices: ['Himpunan', 'Akademik'],
    },
    {
      header: 'Sort',
      choices: ['Newest', 'Oldest'],
    },
    {
      header: 'Read',
      choices: ['Read', 'Unread'],
    },
  ];

  return (
    <div className="mx-10">
      <Filter />
      <DrawerFooter className="flex flex-row justify-around">
        <button className="rounded-full bg-green-500 px-12 py-3 text-white">
          Apply
        </button>
        <DrawerClose>
          <button className="rounded-full border-2 border-green-500 px-12 py-3 text-green-500">
            Cancel
          </button>
        </DrawerClose>
      </DrawerFooter>
    </div>
  );
}
