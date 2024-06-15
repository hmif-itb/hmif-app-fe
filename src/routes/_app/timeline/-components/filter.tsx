import { useQuery } from '@tanstack/react-query';
import Options from './options';
import { RadioGroup } from '@radix-ui/react-radio-group';
import { api } from '~/api/client';

const data = [
  {
    header: 'Sort',
    choices: ['Newest', 'Oldest'],
  },
  {
    header: 'Read',
    choices: ['Read', 'Unread'],
  },
];

export default function Filter() {
  const { data: catData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => api.category.getListCategory(),
  });

  return (
    <div className="mx-10">
      <div className="flex items-baseline justify-between px-0">
        <h1 className="text-[24px] font-bold text-green-400">Filters</h1>
        <button type="button">
          <span className="text-[16px] font-semibold text-green-400">
            Reset
          </span>
        </button>
      </div>
      <Options
        header="Category"
        choices={catData?.categories.map((c) => c.name) ?? []}
      />
      {data.map((a, idx) => (
        <Options key={idx} header={a.header} choices={a.choices} />
      ))}
    </div>
  );
}
