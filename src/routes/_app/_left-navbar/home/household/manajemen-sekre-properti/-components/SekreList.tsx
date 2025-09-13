import React from 'react';
import { SekreItem, SekreData } from './SekreItem';

const sampleSekre: SekreData[] = [
  {
    name: 'Sekre 1',
    condition: 'used',
    location: 'Ruang Rapat Sekre',
    photo:
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=300&fit=crop',
  },
  {
    name: 'Speaker JBL',
    condition: 'new',
    location: 'Gudang Sekre',
    photo:
      'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=300&fit=crop',
  },
  {
    name: 'Meja Kayu',
    condition: 'used',
    location: 'Ruang Utama Sekre',
    photo:
      'https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=400&h=300&fit=crop',
  },
  {
    name: 'Kursi Lipat',
    condition: 'new',
    location: 'Ruang Rapat Sekre',
    photo:
      'https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=400&h=300&fit=crop',
  },
];

function SekreList() {
  return (
    <div className="mb-20 grid w-full grid-cols-3 gap-3 lg:mb-5 lg:gap-5">
      {sampleSekre.map((sekre, idx) => (
        <SekreItem key={idx} sekre={sekre} />
      ))}
    </div>
  );
}
export default SekreList;
