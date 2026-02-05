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
  SubmitPengembalianBodySchema,
  CreateLaporanBodySchema,
  PresignedURL,
} from '~/api/generated';
import { z } from 'zod';

type PeminjamanScheduleItem = {
  startDate: string;
  endDate: string;
  jenisPeminjaman: 'eksklusif' | 'non-eksklusif';
};

export const GetRequestParamsSchema = z.object({
  search: z.string().optional(),
  category: z.enum(['sekre', 'properti']).optional(),
  status: z
    .enum(['pending', 'rejected', 'accepted', 'pending_return', 'completed'])
    .optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  page: z.number().optional(),
  limit: z.number().optional(),
});
export type GetRequestParamsSchema = z.infer<typeof GetRequestParamsSchema>;

export const GetLaporanParamsSchema = z.object({
  search: z.string().optional(),
  category: z.enum(['sekre', 'properti']).optional(),
  status: z.enum(['pending', 'accepted', 'rejected']).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  page: z.number().optional(),
  limit: z.number().optional(),
});
export type GetLaporanParamsSchema = z.infer<typeof GetLaporanParamsSchema>;

export interface GetPropertiParams {
  search?: string;
  category?: 'sekre' | 'properti';
  condition?: 'good' | 'broken' | 'cant_be_used' | 'lost';
  sortBy?: 'name_asc' | 'name_desc';
}

export function useGetHouseholdEvents(month: number, year: number) {
  return useQuery({
    queryKey: ['household', 'events', { month, year }],
    queryFn: async () => {
      const startDate = dayjs(new Date(year, month, 1)).format('YYYY-MM-DD');
      const endDate = dayjs(new Date(year, month + 1, 0)).format('YYYY-MM-DD');
      const data = await api.peminjamanDashboard.getPeminjaman({
        startDate,
        endDate,
      });
      return data.map((p: PeminjamanSchema) => ({
        user: p.borrowerName,
        title: p.title,
        name: p.propertyName,
        type: p.category,
        start_time: new Date(p.startDate),
        end_time: new Date(p.endDate),
      }));
    },
    enabled: month != null && year != null,
  });
}

export function useGetNearingEndItems() {
  return useQuery({
    queryKey: ['household', 'nearing-end'],
    queryFn: async () => {
      const data = await api.peminjamanDashboard.getPeminjamanNearingEnd({
        days: '30',
      });
      return data.map((p: PeminjamanSchema) => ({
        id: p.id,
        name: p.borrowerName,
        item: p.propertyName,
        startDate: dayjs(p.startDate).format('DD/MM/YYYY'),
        endDate: dayjs(p.endDate).format('DD/MM/YYYY'),
        status: p.status,
      }));
    },
  });
}

const PROPERTI_KEYS = {
  all: ['properti'] as const,
  lists: () => [...PROPERTI_KEYS.all, 'list'] as const,
  list: (filters: GetPropertiParams) =>
    [...PROPERTI_KEYS.lists(), filters] as const,
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
    mutationFn: (variables: {
      propertiId: string;
      data: UpdatePropertiBodySchema;
    }) =>
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
    mutationFn: (variables: {
      peminjamanId: string;
      data: UpdatePeminjamanStatusSchema;
    }) =>
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
    mutationFn: (variables: {
      laporanId: string;
      data: UpdateLaporanStatusSchema;
    }) =>
      api.manajemenRequestLaporan.updateLaporanStatus({
        laporanId: variables.laporanId,
        requestBody: variables.data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REQ_LAPORAN_KEYS.laporan() });
    },
  });
}

export function useCreateLaporan() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateLaporanBodySchema) =>
      api.laporanWarga.createLaporanWarga({ requestBody: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REQ_LAPORAN_KEYS.laporan() });
    },
  });
}

const PENGAJUAN_KEYS = {
  all: ['pengajuan'] as const,
  lists: () => [...PENGAJUAN_KEYS.all, 'lists'] as const,
  list: (filters: GetPropertiParams) =>
    [...PENGAJUAN_KEYS.lists(), filters] as const,
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

const PENGEMBALIAN_KEYS = {
  all: ['pengembalian'] as const,
  list: () => [...PENGEMBALIAN_KEYS.all, 'list'] as const,
};

const mapStatusToFrontend = (
  status: string,
): 'aktif' | 'selesai' | 'pending' | 'pending_return' | 'ditolak' => {
  switch (status) {
    case 'accepted':
      return 'aktif';
    case 'completed':
      return 'selesai';
    case 'pending':
      return 'pending';
    case 'pending_return':
      return 'pending';
    case 'rejected':
      return 'ditolak';
    default:
      return 'pending';
  }
};

export function useGetPeminjamanAktif() {
  return useQuery({
    queryKey: PENGEMBALIAN_KEYS.list(),
    queryFn: async () => {
      const data = await api.pengembalian.getPeminjamanAktif();
      return data.map((p) => {
        const startDateFormatted = dayjs(p.startDate).format('DD/MM/YYYY');
        const endDateFormatted = dayjs(p.endDate).format('DD/MM/YYYY');

        return {
          id: p.id,
          userName: p.borrowerName,
          properti: p.properti?.name || 'Nama Properti Error',
          jumlah: p.properti?.quantity || 1,

          startDate: startDateFormatted,
          endDate: endDateFormatted,
          tanggalMulai: startDateFormatted,
          tanggalSelesai: endDateFormatted,

          status: mapStatusToFrontend(p.status),
          type: p.properti?.category || 'properti',
        };
      });
    },
  });
}

export function useUploadFile() {
  return useMutation<PresignedURL, Error, File>({
    mutationFn: async (file: File) => {
      const lastDotIndex = file.name.lastIndexOf('.');

      let finalFileName: string;
      let finalFileType: string;

      if (lastDotIndex === -1 || lastDotIndex === 0) {
        finalFileName = file.name;
        finalFileType = file.type.split('/')[1] || '';
      } else {
        finalFileName = file.name.substring(0, lastDotIndex);
        finalFileType = file.name.substring(lastDotIndex + 1);
      }

      const presignedData = await api.media.createPresignedUrl({
        requestBody: {
          fileName: finalFileName,
          fileType: finalFileType,
        },
      });

      await fetch(presignedData.presignedUrl, {
        method: 'PUT',
        body: file,
      });

      return presignedData;
    },
  });
}

export function useGetPeminjamanSchedule(propertyId: string) {
  return useQuery({
    queryKey: ['peminjaman', 'schedule', propertyId],
    queryFn: async (): Promise<PeminjamanScheduleItem[]> => {
      const data = await api.request.request<{
        propertyId: string;
        schedules: PeminjamanScheduleItem[];
      }>({
        method: 'GET',
        url: '/api/request/{propertiId}/schedule',
        path: {
          propertiId: propertyId,
        },
      });
      return data.schedules;
    },
    enabled: !!propertyId,
  });
}

export function useSubmitPengembalian() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: {
      peminjamanId: string;
      data: SubmitPengembalianBodySchema;
    }) =>
      api.pengembalian.submitPengembalian({
        peminjamanId: variables.peminjamanId,
        requestBody: variables.data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PENGEMBALIAN_KEYS.list() });
    },
  });
}
