import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { api, queryClient } from '~/api/client';
import { TableActionsBar } from './-components/TableActionsBar';
import { DashboardTable } from './-components/DashboardTable';
import { Toast } from '../../../-dashboard-component/Toast';
import { ChevronLeft } from 'lucide-react';
import { ConfirmModal } from '../../../-dashboard-component/ConfirmModal';
// import { Prestasi } from '~/api/generated';
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import { loadUserCache } from '~/lib/session';

export const Route = createFileRoute(
  '/_app/_left-navbar/home/prestasi/dashboard/',
)({
  beforeLoad: async () => {
    const user = loadUserCache();

    if (!user) {
      return redirect({ to: '/login' });
    }

    const allowedRoles = ['people', 'peoplemanage', 'peopledev'] as const;
    const cncRoles = ['cnc'] as const;
    if (!user.roles || !allowedRoles.some((r) => user.roles.includes(r))) {
      if (user.roles && cncRoles.some((r) => user.roles.includes(r))) {
        return redirect({ to: '/home/prestasi/dashboard-cnc' });
      }
      return redirect({ to: '/home' });
    }
  },
  component: PeopleDashboard,
});

function PeopleDashboard() {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [filterJenis, setFilterJenis] = useState<string>('all');
  const [periodFilter, setPeriodFilter] = useState<{
    from: string;
    to: string;
  }>({
    from: '',
    to: '',
  });
  // const [search, setSearch] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [toastTitle, setToastTitle] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemsToDelete, setItemsToDelete] = useState<string[]>([]);

  const LIMIT = 10;

  const categoryMap: Record<
    string,
    'competition' | 'organization' | 'committee'
  > = {
    kompetisi: 'competition',
    organisasi: 'organization',
    kepanitiaan: 'committee',
  };

  const { data, isLoading } = useQuery({
    queryKey: [
      'achievements',
      {
        page: currentPage,
        category: filterJenis,
        // search,
        period: periodFilter,
      },
    ],
    queryFn: async () =>
      api.achievements.getListPrestasi({
        category:
          filterJenis !== 'all' && categoryMap[filterJenis]
            ? categoryMap[filterJenis]
            : undefined,
        startDate: periodFilter.from || undefined,
        endDate: periodFilter.to || undefined,
        // search: search || undefined,
        page: currentPage,
        limit: LIMIT,
      }),
    staleTime: 30000,
  });

  const achievements = data?.prestasi || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / LIMIT);

  const allSelected =
    selectedItems.length === achievements.length && achievements.length > 0;

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedItems([]);
    } else {
      setSelectedItems(achievements.map((item) => item.id));
    }
  };

  const handleSelectItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const deleteMutation = useMutation({
    mutationFn: async (id: string) =>
      api.achievements.deletePrestasi({ idPrestasi: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['achievements'] });
      setSelectedItems([]);
      setToastType('success');
      setToastTitle('Aksi Berhasil');
      setToastMessage('Prestasi berhasil dihapus');
      setShowToast(true);
    },
    onError: () => {
      setToastType('error');
      setToastTitle('Aksi Gagal');
      setToastMessage('Gagal menghapus prestasi');
      setShowToast(true);
    },
  });
  const handleExport = async () => {
    try {
      const categoryForExport =
        filterJenis !== 'all' && categoryMap[filterJenis]
          ? categoryMap[filterJenis]
          : undefined;

      // Build query parameters for GET request
      const params = new URLSearchParams();
      if (categoryForExport) {
        params.append('category', categoryForExport);
      }
      if (periodFilter.from) {
        params.append('start_date', periodFilter.from);
      }
      if (periodFilter.to) {
        params.append('end_date', periodFilter.to);
      }

      const baseUrl = import.meta.env.VITE_API_URL || '';
      const endpoint = '/api/achievements/export/excel';
      const fullUrl = `${baseUrl}${endpoint}${params.toString() ? `?${params.toString()}` : ''}`;
      console.log('Export URL:', fullUrl);

      const response = await fetch(fullUrl, {
        method: 'GET',
        credentials: 'include',
        headers: {
          Accept:
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Export failed: ${response.status} ${response.statusText}. ${errorText}`,
        );
      }

      const blob = await response.blob();

      if (blob.size === 0) {
        throw new Error('File kosong, tidak ada data untuk diekspor');
      }

      const downloadBlob = new Blob([blob], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      const downloadUrl = window.URL.createObjectURL(downloadBlob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `prestasi_export_${new Date().toISOString().split('T')[0]}.xlsx`;
      a.style.display = 'none';

      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Cleanup
      setTimeout(() => {
        window.URL.revokeObjectURL(downloadUrl);
      }, 100);

      setToastType('success');
      setToastTitle('Aksi Berhasil');
      setToastMessage('Data berhasil diekspor');
      setShowToast(true);
    } catch (err) {
      console.error('Export error:', err);

      setToastType('error');
      setToastTitle('Aksi Gagal');
      setToastMessage(
        `Gagal mengekspor data: ${err instanceof Error ? err.message : 'Unknown error'}`,
      );
      setShowToast(true);
    }
  };
  const handleBulkChange = () => {
    // console.log('Bulk change to:', value, 'for items:', selectedItems);
  };

  const handlePeriodChange = (from: string, to: string) => {
    setPeriodFilter({ from, to });
    setCurrentPage(1);
  };

  // const handleSearchChange = (value: string) => {
  //   setSearch(value);
  //   setCurrentPage(1);
  // };

  const handleDeleteClick = () => {
    if (selectedItems.length === 0) {
      setToastType('error');
      setToastTitle('Aksi Gagal');
      setToastMessage('Pilih item yang akan dihapus');
      setShowToast(true);
      return;
    }
    setItemsToDelete(selectedItems);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    itemsToDelete.forEach((id) => deleteMutation.mutate(id));
    setShowDeleteModal(false);
    setItemsToDelete([]);
  };

  // const handleEdit = (id: string) => {
  //   // Navigate ke halaman edit
  //   navigate({
  //     to: '/dashboard/edit/$id',
  //     params: { id },
  //   });
  // };

  return (
    <div className="min-h-screen bg-[#FFFFFF] font-inter">
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

        <div className="absolute inset-0">{/* Background images */}</div>
        <div className="relative z-40 px-4 py-12">
          <div className="max-w-7xl">
            <div className="flex items-center space-x-4">
              <button className="text-white transition-all duration-300 hover:-translate-x-1">
                <ChevronLeft
                  className="hidden lg:block"
                  size={54}
                  onClick={() => navigate({ to: '/home' })}
                />
                <ChevronLeft size={24} className="block lg:hidden" />
              </button>
              <h1 className="text-3xl font-bold text-white lg:text-5xl">
                Pendataan <span className="font-light italic">Prestasi</span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-screen w-full bg-[#FFFFFF] pb-24 lg:pb-0">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="rounded-lg bg-white shadow-sm">
            <TableActionsBar
              selectedCount={selectedItems.length}
              onSelectAll={handleSelectAll}
              allSelected={allSelected}
              onExport={handleExport}
              onBulkChange={handleBulkChange}
              filterJenis={filterJenis}
              onFilterChange={setFilterJenis}
              onPeriodChange={handlePeriodChange}
              onDelete={handleDeleteClick}
            />
            <DashboardTable
              data={achievements}
              selectedItems={selectedItems}
              onSelectItem={handleSelectItem}
              onSelectAll={handleSelectAll}
              allSelected={allSelected}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              loading={isLoading}
              onDelete={(id: string) =>
                deleteMutation
                  .mutateAsync(id)
                  .then(() => ({
                    success: true,
                  }))
                  .catch(() => ({
                    success: false,
                    error: 'Gagal menghapus prestasi',
                  }))
              }
            />
          </div>
        </div>
      </div>

      <Toast
        type={toastType}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        duration={5000}
        title={toastTitle}
        message={toastMessage}
      />

      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        confirmText="Hapus"
        cancelText="Cancel"
      />
    </div>
  );
}
