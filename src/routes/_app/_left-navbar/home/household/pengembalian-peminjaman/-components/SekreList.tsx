import React from 'react';
import { SekreItem, SekreData } from './SekreItem';
import { FilterOptions } from './FilterModal';

interface SekreListProps {
  filter: FilterOptions;
  searchTerm: string;
}

const sampleSekre: SekreData[] = [
  {
    name: 'Sekre 1',
    condition: 'used',
    location: 'Ganesha',
    photo:
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=300&fit=crop',
    status: 'unavailable',
  },
  {
    name: 'Speaker JBL',
    condition: 'new',
    location: 'Jatinangor',
    photo:
      'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=300&fit=crop',
    status: 'available',
  },
  {
    name: 'Meja Kayu',
    condition: 'used',
    location: 'Ruang Utama Sekre',
    photo:
      'https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=400&h=300&fit=crop',
    status: 'unavailable',
  },
  {
    name: 'Kursi Lipat',
    condition: 'new',
    location: 'Ganesha',
    photo:
      'https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=400&h=300&fit=crop',
    status: 'available',
  },
];

function SekreList({ filter, searchTerm }: SekreListProps) {
  const filteredSekre = sampleSekre.filter((sekre) => {
    const matchesCondition =
      filter.condition === 'all' || sekre.condition === filter.condition;
    const matchesSearch = sekre.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCondition && matchesSearch;
  });

  return (
    <div className="mb-20 grid w-full grid-cols-1 gap-3 lg:mb-5 lg:grid-cols-2 lg:gap-5 xl:grid-cols-3">
      {filteredSekre.map((sekre, idx) => (
        <SekreItem key={idx} sekre={sekre} />
      ))}
    </div>
  );
}

export default SekreList;
