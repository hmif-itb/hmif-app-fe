import React from 'react';
import { SekreItem } from './SekreItem';
import { FilterOptions } from './FilterModal';
import { SekreData } from '../../../-types';
import type { UpdatePropertiBodySchema } from '~/api/generated';

interface SekreListProps {
  filter: FilterOptions;
  searchTerm: string;
  data: SekreData[];
  onUpdate: (id: string, updatedData: UpdatePropertiBodySchema) => void;
  onDelete: (id: string) => void;
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

        return (
          <SekreItem
            key={`${sekre.name}-${sekre.id.toString()}`}
            sekre={sekre}
            onUpdate={(updatedData) =>
              onUpdate(sekre.id.toString(), updatedData)
            }
            onDelete={() => onDelete(sekre.id.toString())}
            locations={locations}
          />
        );
      })}
    </div>
  );
}

export default SekreList;
