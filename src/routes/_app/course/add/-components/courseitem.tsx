import { useState } from 'react';
import MinusIcon from '~/assets/icons/course/Minus.svg';
import PlusIcon from '~/assets/icons/course/Plus.svg';

export default function CourseItem({ kelas }: { kelas: number }) {
  const [add, setAdd] = useState<boolean>(false);

  return (
    <div className="flex items-center justify-between rounded-b-lg border-t-2 border-neutral-300 bg-white p-5">
      <div className="flex flex-col">
        <p className="text-lg font-bold">
          K{kelas} - {kelas === 3 ? 'Jatinangor' : 'Ganesha'}
        </p>
        <p className="text-sm">Dr. tech. Wikan Danar Sunindyo, S.T, M.Sc.</p>
      </div>
      <button type="button" onClick={() => setAdd(!add)}>
        <img
          alt="Dropdown Button"
          src={add ? MinusIcon : PlusIcon}
          className="m-auto"
        />
      </button>
    </div>
  );
}
