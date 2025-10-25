import React from 'react';
import { PropertyItem } from './PropertyItem';
import { PropertyData } from '../../../-types';
import { FilterOptions } from './FilterModal';

interface PropertyListProps {
  filter: FilterOptions;
  searchTerm: string;
  data: PropertyData[];
  onUpdate: (id: string, updatedData: PropertyData) => void;
  onDelete: (id: string) => void;
  locations: string[];
}

function PropertyList({
  filter,
  searchTerm,
  data,
  onUpdate,
  onDelete,
  locations,
}: PropertyListProps) {
  const filteredProperties = data.filter((property) => {
    const matchesCondition =
      filter.condition === 'all' || property.condition === filter.condition;
    const matchesSearch = property.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCondition && matchesSearch;
  });

  return (
    <div className="mb-20 flex w-full flex-col gap-3 lg:mb-5 lg:gap-5">
      {filteredProperties.map((property, idx) => {
        // Find the original index in the full data array

        return (
          <PropertyItem
            key={`${property.name}-${property.id}`}
            property={property}
            onUpdate={(updatedData) => onUpdate(property.id, updatedData)}
            onDelete={() => onDelete(property.id)}
            locations={locations}
          />
        );
      })}
    </div>
  );
}

export default PropertyList;
