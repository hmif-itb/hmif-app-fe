import React from 'react';
import { PropertyItem, PropertyData } from './PropertyItem';
import { FilterOptions } from './FilterModal';

interface PropertyListProps {
  filter: FilterOptions;
  searchTerm: string;
}

const sampleProperty: PropertyData[] = [
  {
    name: 'Proyektor Epson X200',
    condition: 'used',
    amount: 2,
    location: 'Ruang Multimedia',
  },
  {
    name: 'Speaker JBL',
    condition: 'new',
    amount: 1,
    location: 'Ruang Sekretariat',
  },
  {
    name: 'Kabel HDMI',
    condition: 'used',
    amount: 5,
    location: 'Gudang Properti',
  },
];

function PropertyList({ filter, searchTerm }: PropertyListProps) {
  const filteredProperties = sampleProperty.filter((property) => {
    const matchesCondition =
      filter.condition === 'all' || property.condition === filter.condition;
    const matchesSearch = property.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCondition && matchesSearch;
  });

  return (
    <div className="mb-20 flex w-full flex-col gap-3 lg:mb-5 lg:gap-5">
      {filteredProperties.map((property, idx) => (
        <PropertyItem key={idx} property={property} />
      ))}
    </div>
  );
}

export default PropertyList;
