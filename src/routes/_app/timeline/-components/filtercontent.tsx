import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
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
        <DrawerHeader className="flex items-baseline justify-between px-0">
          <h1 className="text-[24px] font-bold text-green-400">Filters</h1>
          <button type="button">
            <DrawerDescription className="text-[16px] text-green-400">
              Reset
            </DrawerDescription>
          </button>
        </DrawerHeader>
        <form action="">
          <RadioGroup>
            {data.map((a, idx) => (
              <Options key={idx} header={a.header} choices={a.choices} />
            ))}
          </RadioGroup>
          <DrawerFooter className="flex flex-row justify-around">
            <button>Apply</button>
            <DrawerClose asChild>
              <button>Cancel</button>
            </DrawerClose>
          </DrawerFooter>
        </form>
      </div>
    </DrawerContent>
  );
}
