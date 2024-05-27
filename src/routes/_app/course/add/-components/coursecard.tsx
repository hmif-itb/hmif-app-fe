'use client';
import { useState } from 'react';
import ArrowDownIcon from '~/assets/icons/course/ArrowDown.svg';
import ArrowUpIcon from '~/assets/icons/course/ArrowUp.svg';
import CourseItem from './courseitem';

export default function CourseCard() {
  const [collapse, setCollapse] = useState<boolean>(false);

  return (
    <div>
      <div
        className={`flex items-center justify-between ${collapse ? 'rounded-t-lg' : 'rounded-lg'}  bg-white p-5`}
      >
        <div className="flex gap-5">
          <div className="flex size-12 flex-col items-center justify-center rounded-md bg-green-900 text-neutral-light">
            <p className="pt-1 text-[8px] leading-none">SKS</p>
            <p className="text-xl font-bold leading-6">3</p>
          </div>
          <div className="flex flex-col">
            <p className="text-lg font-bold">II2220</p>
            <p className="text-sm">Manajemen Sumber Daya STI</p>
          </div>
        </div>
        <button type="button" onClick={() => setCollapse(!collapse)}>
          <img
            alt="Dropdown Button"
            src={collapse ? ArrowUpIcon : ArrowDownIcon}
            className="m-auto"
          />
        </button>
      </div>
      {collapse ? (
        <div className="rounded-b-lg bg-neutral-light">
          {/* data.map */}
          <CourseItem kelas={1} />
          <CourseItem kelas={2} />
          <CourseItem kelas={3} />
        </div>
      ) : null}
    </div>
  );
}
