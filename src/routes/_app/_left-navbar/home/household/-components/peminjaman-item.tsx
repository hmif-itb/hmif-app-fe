import React from 'react';

function PeminjamanItem() {
  return (
    <div className="flex flex-col gap-2 rounded-[10px]  bg-[#E2C66F4D]/30 px-4 py-[14px] ">
      {/* Header */}
      <div className="flex justify-between">
        <span className="font-medium text-black">Adinda Putri</span>
        <span className="items-center rounded-full bg-[#305138] px-4 py-1 text-xs  text-white">
          L001
        </span>
      </div>
      {/* Item */}
      <div className="text-[14px] font-medium text-[#666666]">Proyektor</div>
      {/* Date */}
      <div className="flex gap-5 text-xs font-normal text-[#525352]">
        <span>Mulai: 03/01/2022</span>
        <span>Selesai: 05/01/2022</span>
      </div>
    </div>
  );
}

export default PeminjamanItem;
