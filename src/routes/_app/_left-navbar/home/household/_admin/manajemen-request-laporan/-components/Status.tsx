import React from 'react';

// TODO: Ubah tipe sesuai yang di BE
export type StatusType = 'pending' | 'rejected' | 'accepted';

const statusColorMap: Record<StatusType, string> = {
  pending: 'bg-[#E7D087] text-[#1D3122] ',
  rejected: 'bg-[#C23C31] text-white',
  accepted: 'bg-[#1D3122] text-[#EAEEEB] ',
};

const statusValueMap: Record<StatusType, string> = {
  pending: 'Pending',
  rejected: 'Ditolak',
  accepted: 'Disetujui',
};

function Status({ status = 'pending' }: { status: StatusType }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-[12px] font-medium transition-colors duration-200 lg:text-sm ${statusColorMap[status]}`}
    >
      {statusValueMap[status]}
    </span>
  );
}

export default Status;
