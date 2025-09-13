import React from 'react';
import { PropertyItem, PropertyData } from './PropertyItem';
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
function PropertyList() {
  return (
    <div className="mb-20 flex w-full flex-col gap-3 lg:mb-5 lg:gap-5">
      {sampleProperty.map((property, idx) => (
        <PropertyItem key={idx} property={property} />
      ))}
    </div>
  );
}

export default PropertyList;
