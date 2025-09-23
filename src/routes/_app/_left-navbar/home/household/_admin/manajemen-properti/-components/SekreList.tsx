import React from 'react';
import { SekreItem, SekreData } from './SekreItem';
import { FilterOptions } from './FilterModal';

interface SekreListProps {
  filter: FilterOptions;
  searchTerm: string;
  data: SekreData[];
  onUpdate: (index: number, updatedData: SekreData) => void;
  onDelete: (index: number) => void;
  locations: string[];
}

function SekreList({
  filter,
  searchTerm,
  data,
  onUpdate,
  onDelete,
  locations,
}: SekreListProps) {
  const filteredSekre = data.filter((sekre) => {
    const matchesCondition =
      filter.condition === 'all' || sekre.condition === filter.condition;
    const matchesSearch = sekre.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCondition && matchesSearch;
  });

  return (
    <div className="mb-20 grid w-full grid-cols-1 gap-3 lg:mb-5 lg:grid-cols-2 lg:gap-5 xl:grid-cols-3">
      {filteredSekre.map((sekre, idx) => {
        // Find the original index in the full data array
        const originalIndex = data.findIndex(
          (item) =>
            item.name === sekre.name &&
            item.location === sekre.location &&
            item.condition === sekre.condition,
        );

        return (
          <SekreItem
            key={`${sekre.name}-${originalIndex}`}
            sekre={sekre}
            onUpdate={(updatedData) => onUpdate(originalIndex, updatedData)}
            onDelete={() => onDelete(originalIndex)}
            locations={locations}
          />
        );
      })}
    </div>
  );
}

export default SekreList;
