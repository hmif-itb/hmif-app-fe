import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { TableActionsBar } from './-components/TableActionsBar';
import { DashboardTable } from './-components/DashboardTable';
import { mockPrestasiData } from './-constant';
import { ChevronLeft } from 'lucide-react';

export const Route = createFileRoute('/_app/_left-navbar/dashboard/')({
  component: AdminDashboard,
});

function AdminDashboard() {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [filterJenis, setFilterJenis] = useState<string>('');
  const [data] = useState(mockPrestasiData);

  const filteredData = filterJenis
    ? data.filter((item) => item.jenisPrestasi.toLowerCase() === filterJenis)
    : data;

  const allSelected =
    selectedItems.length === filteredData.length && filteredData.length > 0;

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredData.map((item) => item.id));
    }
  };

  const handleSelectItem = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleExport = () => {
    console.log('Export selected items:', selectedItems);
  };

  const handleBulkChange = (value: string) => {
    console.log('Bulk change to:', value, 'for items:', selectedItems);
  };

  const handlePeriodClick = () => {
    console.log('Open period picker');
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <div className="relative overflow-hidden bg-[#2F754A]">
        <div className="absolute inset-0">
          <img
            src="/img/admin/yellow-gradient-top-right-desktop.png"
            alt=""
            className="absolute right-0 top-0 z-30 hidden lg:block"
          />
          <img
            src="/img/admin/yellow-gradient-top-right-mobile.png"
            alt=""
            className="absolute right-0 top-0 z-30 lg:hidden"
          />

          <img
            src="/img/admin/green-peer-top-left-desktop.png"
            alt=""
            className="absolute left-0 top-0 z-20 hidden lg:block"
          />
          <img
            src="/img/admin/green-peer-top-left-mobile.png"
            alt=""
            className="absolute left-0 top-0 z-20 lg:hidden"
          />

          <img
            src="/img/admin/green-peer-top-right-desktop.png"
            alt=""
            className="absolute right-0 top-0 z-10 hidden lg:block"
          />
          <img
            src="/img/admin/green-peer-top-right-mobile.png"
            alt=""
            className="absolute right-0 top-0 z-10 mt-12 lg:hidden"
          />
        </div>

        <div className="relative z-40 px-4 py-12 lg:-left-32">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center space-x-4">
              <button className="text-white transition-colors hover:text-gray-200">
                <ChevronLeft className="hidden lg:block" size={54} />
                <ChevronLeft size={24} className="block lg:hidden" />
              </button>
              <h1 className="text-2xl font-bold text-white lg:text-5xl">
                Pendataan <span className="font-light italic">Prestasi</span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* White Content Section */}
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto p-4 lg:min-w-max">
          <div className="rounded-lg bg-white shadow-sm">
            <TableActionsBar
              selectedCount={selectedItems.length}
              onSelectAll={handleSelectAll}
              allSelected={allSelected}
              onExport={handleExport}
              onBulkChange={handleBulkChange}
              filterJenis={filterJenis}
              onFilterChange={setFilterJenis}
              onPeriodClick={handlePeriodClick}
            />

            <DashboardTable
              data={filteredData}
              selectedItems={selectedItems}
              onSelectItem={handleSelectItem}
              onSelectAll={handleSelectAll}
              allSelected={allSelected}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
