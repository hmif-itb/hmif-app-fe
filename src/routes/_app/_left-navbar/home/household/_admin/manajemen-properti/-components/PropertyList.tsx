import React from 'react';
import { PropertyItem, PropertyData } from './PropertyItem';
import { FilterOptions } from './FilterModal';

interface PropertyListProps {
  filter: FilterOptions;
  searchTerm: string;
  data: PropertyData[];
  onUpdate: (index: number, updatedData: PropertyData) => void;
  onDelete: (index: number) => void;
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
        const originalIndex = data.findIndex(
          (item) =>
            item.name === property.name &&
            item.location === property.location &&
            item.amount === property.amount,
        );

        return (
          <PropertyItem
            key={`${property.name}-${originalIndex}`}
            property={property}
            onUpdate={(updatedData) => onUpdate(originalIndex, updatedData)}
            onDelete={() => onDelete(originalIndex)}
            locations={locations}
          />
        );
      })}
    </div>
  );
}

export default PropertyList;
