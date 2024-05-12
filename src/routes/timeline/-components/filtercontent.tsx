import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '~/components/ui/drawer';
import Options from './options';
import { RadioGroup } from '@radix-ui/react-radio-group';

export default function FilterContent({
  onInteractOutside,
}: {
  onInteractOutside: () => void;
}) {
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
    <DrawerContent onInteractOutside={onInteractOutside}>
      <div className="mx-10">
        <DrawerHeader className="flex justify-between items-baseline px-0">
          <h1 className="text-green-400 font-bold text-[24px]">Filters</h1>
          <button type="button">
            <DrawerDescription className="text-green-400 text-[16px]">
              Reset
            </DrawerDescription>
          </button>
        </DrawerHeader>
        <form action="">
          <RadioGroup>
            {data.map((a) => (
              <Options header={a.header} choices={a.choices} />
            ))}
          </RadioGroup>
          <DrawerFooter className="flex flex-row justify-around">
            <button>Apply</button>
            <DrawerClose>
              <button>Cancel</button>
            </DrawerClose>
          </DrawerFooter>
        </form>
      </div>
    </DrawerContent>
  );
}