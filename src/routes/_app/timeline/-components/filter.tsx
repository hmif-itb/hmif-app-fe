import Options from './options';
import { RadioGroup } from '@radix-ui/react-radio-group';

export default function Filter() {
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
      <h1 className="flex items-baseline justify-between px-0">
        <h1 className="text-[24px] font-bold text-green-400">Filters</h1>
        <button type="button">
          <span className="text-[16px] font-semibold text-green-400">
            Reset
          </span>
        </button>
      </h1>
      <form action="">
        <RadioGroup>
          {data.map((a) => (
            <Options header={a.header} choices={a.choices} />
          ))}
        </RadioGroup>
      </form>
    </div>
  );
}
