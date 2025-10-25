import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { api } from '~/api/client';
import type { 
  PeminjamanSchema,
  CreatePropertiBodySchema,
  UpdatePropertiBodySchema,
  UpdatePeminjamanStatusSchema,
  UpdateLaporanStatusSchema,
  CreatePengajuanBodySchema,
} from '~/api/generated';
import { z } from 'zod';

export const GetRequestParamsSchema = z.object({
  search: z.string().optional(),
  category: z.enum(['sekre', 'properti']).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});
export type GetRequestParamsSchema = z.infer<typeof GetRequestParamsSchema>;

export const GetLaporanParamsSchema = z.object({
  search: z.string().optional(),
  category: z.enum(['sekre', 'properti']).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});
export type GetLaporanParamsSchema = z.infer<typeof GetLaporanParamsSchema>;

export interface GetPropertiParams {
  search?: string;
  category?: 'sekre' | 'properti';
  condition?: 'good' | 'broken' | 'cant_be_used' | 'lost';
  sortBy?: 'name_asc' | 'name_desc';
}

/**
 * Hook untuk mengambil data event peminjaman (untuk kalender)
 * dalam rentang bulan dan tahun tertentu.
 */
export function useGetHouseholdEvents(month: number, year: number) {
  return useQuery({
    queryKey: ['household', 'events', { month, year }],
    queryFn: async () => {
      const startDate = dayjs(new Date(year, month, 1)).format('YYYY-MM-DD');
      const endDate = dayjs(new Date(year, month + 1, 0)).format('YYYY-MM-DD');
      const data = await api.peminjamanDashboard.getPeminjaman({ startDate, endDate });
      return data.map((p: PeminjamanSchema) => ({
        user: p.borrowerName,
        title: p.title,
        type: p.category,
        start_time: new Date(p.startDate),
      }));
    },
    enabled: month != null && year != null,
  });
}

export function useGetNearingEndItems() {
  return useQuery({
    queryKey: ['household', 'nearing-end'],
    queryFn: async () => {
      const data = await api.peminjamanDashboard.getPeminjamanNearingEnd({ days: '7' });
      return data.map((p: PeminjamanSchema) => ({
        id: p.id,
        name: p.borrowerName,
        item: p.propertyName,
        startDate: dayjs(p.startDate).format('DD/MM/YYYY'),
        endDate: dayjs(p.endDate).format('DD/MM/YYYY'),
      }));
    },
  });
}

/* -------------------- Properti Management -------------------- */

const PROPERTI_KEYS = {
  all: ['properti'] as const,
  lists: () => [...PROPERTI_KEYS.all, 'list'] as const,
  list: (filters: GetPropertiParams) => [...PROPERTI_KEYS.lists(), filters] as const,
  details: () => [...PROPERTI_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...PROPERTI_KEYS.details(), id] as const,
};

export function useGetPropertiList(filters: GetPropertiParams) {
  return useQuery({
    queryKey: PROPERTI_KEYS.list(filters),
    queryFn: () => api.manajemenProperti.getPropertiList(filters),
  });
}

export function useGetPropertiById(propertiId: string) {
  return useQuery({
    queryKey: PROPERTI_KEYS.detail(propertiId),
    queryFn: () => api.manajemenProperti.getPropertiById({ propertiId }),
    enabled: !!propertiId,
  });
}

export function useCreateProperti() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreatePropertiBodySchema) =>
      api.manajemenProperti.createProperti({ requestBody: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROPERTI_KEYS.lists() });
    },
  });
}

export function useUpdateProperti() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: { propertiId: string; data: UpdatePropertiBodySchema }) =>
      api.manajemenProperti.updateProperti({
        propertiId: variables.propertiId,
        requestBody: variables.data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROPERTI_KEYS.lists() });
    },
  });
}

export function useDeleteProperti() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (propertiId: string) =>
      api.manajemenProperti.deleteProperti({ propertiId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROPERTI_KEYS.lists() });
    },
  });
}

/* -------------------- Request & Laporan Management -------------------- */

const REQ_LAPORAN_KEYS = {
  all: ['req-laporan'] as const,
  requests: () => [...REQ_LAPORAN_KEYS.all, 'requests'] as const,
  requestList: (filters: GetRequestParamsSchema) =>
    [...REQ_LAPORAN_KEYS.requests(), 'list', filters] as const,
  laporan: () => [...REQ_LAPORAN_KEYS.all, 'laporan'] as const,
  laporanList: (filters: GetLaporanParamsSchema) =>
    [...REQ_LAPORAN_KEYS.laporan(), 'list', filters] as const,
};

export function useGetRequestList(filters: GetRequestParamsSchema) {
  return useQuery({
    queryKey: REQ_LAPORAN_KEYS.requestList(filters),
    queryFn: () => api.manajemenRequestLaporan.getRequestList(filters),
  });
}

export function useGetLaporanList(filters: GetLaporanParamsSchema) {
  return useQuery({
    queryKey: REQ_LAPORAN_KEYS.laporanList(filters),
    queryFn: () => api.manajemenRequestLaporan.getLaporanList(filters),
  });
}

export function useUpdateRequestStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: { peminjamanId: string; data: UpdatePeminjamanStatusSchema }) =>
      api.manajemenRequestLaporan.updateRequestStatus({
        peminjamanId: variables.peminjamanId,
        requestBody: variables.data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REQ_LAPORAN_KEYS.requests() }); 
    },
  });
}

export function useUpdateLaporanStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: { laporanId: string; data: UpdateLaporanStatusSchema }) =>
      api.manajemenRequestLaporan.updateLaporanStatus({
        laporanId: variables.laporanId,
        requestBody: variables.data, 
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REQ_LAPORAN_KEYS.laporan() });
    },
  });
}

/* -------------------- Pengajuan Peminjaman Warga -------------------- */

const PENGAJUAN_KEYS = {
  all: ['pengajuan'] as const,
  lists: () => [...PENGAJUAN_KEYS.all, 'lists'] as const,
  list: (filters: GetPropertiParams) => [...PENGAJUAN_KEYS.lists(), filters] as const,
};

export function useGetWargaPropertiList(filters: GetPropertiParams) {
  return useQuery({
    queryKey: PENGAJUAN_KEYS.list(filters),
    queryFn: () => api.pengajuanPeminjaman.getWargaPropertiList(filters),
    enabled: !!filters.category,
  });
}

export function useCreatePengajuan() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreatePengajuanBodySchema) =>
      api.pengajuanPeminjaman.createPengajuan({ requestBody: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PENGAJUAN_KEYS.lists() });
    },
  });
}