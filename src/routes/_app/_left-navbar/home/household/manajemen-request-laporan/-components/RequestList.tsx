import React from 'react';
import { RequestItem } from './RequestItem';
const sampleRequests = [
  {
    id: 1,
    name: 'Adinda Putri',
    startDate: '03/01/2022',
    endDate: '05/01/2022',
    status: 'Pending',
    item: 'Proyektor',
    borrowTime: '09:00 - 17:00',
    quantity: 2,
    type: 'Eksklusif',
    reason:
      'Ingin menonton kimetsu no yaiba dari pagi hingga malam, setelah itu karaoke sepanjang hari menggunakan proyektor yang ada.',
  },
  {
    id: 2,
    name: 'Akabane Karma',
    startDate: '03/01/2022',
    endDate: '05/01/2022',
    status: 'Pending',
    item: 'Proyektor',
    borrowTime: '09:00 - 17:00',
    quantity: 2,
    type: 'Eksklusif',
    reason:
      'Ingin menonton kimetsu no yaiba dari pagi hingga malam, setelah itu karaoke sepanjang hari menggunakan proyektor yang ada.',
  },
  {
    id: 3,
    name: 'Akabane Karma',
    startDate: '03/01/2022',
    endDate: '05/01/2022',
    status: 'Pending',
    item: 'Proyektor',
    borrowTime: '09:00 - 17:00',
    quantity: 2,
    type: 'Eksklusif',
    reason:
      'Ingin menonton kimetsu no yaiba dari pagi hingga malam, setelah itu karaoke sepanjang hari menggunakan proyektor yang ada.',
  },
];
function RequestList() {
  return (
    <div className="mb-20 flex w-full flex-col gap-3 lg:mb-5 lg:gap-5">
      {sampleRequests.map((request) => (
        <RequestItem key={request.id} request={request} />
      ))}
    </div>
  );
}

export default RequestList;
