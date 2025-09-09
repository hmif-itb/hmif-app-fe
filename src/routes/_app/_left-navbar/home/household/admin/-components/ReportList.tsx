import React from 'react';
import { ReportItem } from './ReportItem';

const sampleReports = [
  {
    id: 1,
    name: 'Adinda Putri',
    startDate: '03/01/2022',
    endDate: '05/01/2022',
    status: 'Pending',
    reportContent: 'Proyektor tidak bisa menampilkan gambar',
    photo:
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=300&fit=crop',
  },
  {
    id: 2,
    name: 'Akabane Karma',
    startDate: '03/01/2022',
    endDate: '05/01/2022',
    status: 'Pending',
    reportContent:
      'Proyektor mengalami masalah pada sistem audio, suara tidak keluar dengan jelas dan terdengar berdecit.',
    photo:
      'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=300&fit=crop',
  },
  {
    id: 3,
    name: 'Akabane Karma',
    startDate: '05/01/2022',
    endDate: '05/01/2022',
    status: 'Pending',
    reportContent:
      'Kabel proyektor putus dan perlu diganti. Kondisi fisik proyektor juga kotor dan perlu dibersihkan.',
    photo:
      'https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=400&h=300&fit=crop',
  },
];

function ReportList() {
  return (
    <div className="flex w-full flex-col gap-5">
      {sampleReports.map((request) => (
        <ReportItem key={request.id} request={request} />
      ))}
    </div>
  );
}

export default ReportList;
