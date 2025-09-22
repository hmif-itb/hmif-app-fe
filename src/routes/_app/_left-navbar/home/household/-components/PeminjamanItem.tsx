import React from 'react';
import { PeminjamanItemData } from '../index';

interface PeminjamanItemProps {
  data: PeminjamanItemData;
}

function PeminjamanItem({ data }: PeminjamanItemProps) {
  return (
    <div className="flex flex-col gap-2 rounded-[10px] bg-[#E2C66F4D]/30 px-4 py-[14px]">
      {/* Header */}
      <div className="flex justify-between">
        <span className="font-medium text-black">{data.name}</span>
        <span className="items-center rounded-full bg-[#305138] px-4 py-1 text-xs text-white">
          {data.id}
        </span>
      </div>
      {/* Item */}
      <div className="text-[14px] font-medium text-[#666666]">{data.item}</div>
      {/* Date */}
      <div className="flex gap-5 text-xs font-normal text-[#525352]">
        <span>Mulai: {data.startDate}</span>
        <span>Selesai: {data.endDate}</span>
      </div>
    </div>
  );
}

export default PeminjamanItem;
