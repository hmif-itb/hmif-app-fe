import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SquarePen, ArrowRight, ArrowLeft } from 'lucide-react';
import { UploadFile } from './UploadFile';
import { PeriodInput } from './PeriodInput';
import { CustomDropdown, type DropdownOption } from './CustomDropdown';
import { api } from '~/api/client';
import { ApiError } from '~/api/generated';
import type { PrestasiDetail } from '~/api/generated';

const prestasiSchema = z.object({
  namaKompetisi: z.string().min(1, 'Nama kompetisi/organisasi wajib diisi'),
  jenisPrestasiId: z.string().min(1, 'Jenis prestasi wajib dipilih'),
  periodePencapaian: z.string().min(1, 'Periode pencapaian wajib diisi'),
  jenisLomba: z.string().optional(),
  deskripsi: z.string().min(1, 'Deskripsi prestasi wajib diisi'),
  fotoDiri: z.instanceof(FileList).optional().or(z.string()),
  fotoSertifikat: z.instanceof(FileList).optional().or(z.string()),
  fotoAwarding: z.instanceof(FileList).optional().or(z.string()),
});

type PrestasiFormData = z.infer<typeof prestasiSchema>;

const jenisPrestasiOptions: DropdownOption[] = [
  { value: '', label: 'Pilih jenis prestasi' },
  { value: 'kompetisi', label: 'Kompetisi atau Lomba' },
  { value: 'organisasi', label: 'Organisasi non-HMIF' },
  { value: 'kepanitiaan', label: 'Kepanitian non-HMIF' },
];

const jenisLombaOptions: DropdownOption[] = [
  { value: '', label: 'Pilih jenis lomba' },
  { value: 'CP', label: 'Competitive Programming' },
  { value: 'CTF', label: 'Capture The Flag' },
  { value: 'BCC', label: 'Business Case Competition' },
  { value: 'UIUX', label: 'UI/UX' },
  { value: 'DS', label: 'Data Science' },
  { value: 'Hackathon', label: 'Hackathon' },
  { value: 'AI', label: 'Artificial Intelligence' },
];

interface FormCardProps {
  prestasiId: string;
  onSuccess?: () => void;
  onBack?: () => void;
}

// Upload helper function
async function uploadViaPresigned(file: File): Promise<string> {
  const fullName = file.name;
  const lastDot = fullName.lastIndexOf('.');
  const base = lastDot === -1 ? fullName : fullName.slice(0, lastDot);
  const ext = lastDot === -1 ? '' : fullName.slice(lastDot + 1).toLowerCase();

  if (!ext) {
    throw new Error('File must have an extension');
  }

  const presigned = await api.media.createPresignedUrl({
    requestBody: {
      fileName: base,
      fileType: ext,
    },
  });

  await fetch(presigned.presignedUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': file.type || 'application/octet-stream',
    },
    body: file,
  });

  return presigned.mediaUrl;
}

export function FormCard({ prestasiId, onSuccess, onBack }: FormCardProps) {
  const [periodValue, setPeriodValue] = useState('');
  const [jenisPrestasiValue, setJenisPrestasiValue] = useState('');
  const [jenisLombaValue, setJenisLombaValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [prestasiData, setPrestasiData] = useState<PrestasiDetail | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<PrestasiFormData>({
    resolver: zodResolver(prestasiSchema),
    defaultValues: {
      namaKompetisi: '',
      jenisPrestasiId: '',
      periodePencapaian: '',
      jenisLomba: '',
      deskripsi: '',
    },
  });

  // Fetch prestasi data
  useEffect(() => {
    const fetchPrestasi = async () => {
      try {
        setIsLoading(true);
        const data = await api.achievements.getPrestasiById({
          idPrestasi: prestasiId,
        });

        setPrestasiData(data);

        // Map jenisPrestasi to form value
        const jenisMap: Record<string, string> = {
          kompetisi: 'kompetisi',
          organisasi: 'organisasi',
          kepanitiaan: 'kepanitiaan',
        };

        const jenis = jenisMap[data.jenisPrestasi] || '';
        setJenisPrestasiValue(jenis);

        // Set competition type if applicable
        if (data.competitionType) {
          setJenisLombaValue(data.competitionType);
          setValue('jenisLomba', data.competitionType);
        }

        // Format period
        const monthNames = [
          'Januari',
          'Februari',
          'Maret',
          'April',
          'Mei',
          'Juni',
          'Juli',
          'Agustus',
          'September',
          'Oktober',
          'November',
          'Desember',
        ];
        const period = `${monthNames[data.bulan - 1]} ${data.tahun}`;
        setPeriodValue(period);

        // Set form values
        reset({
          namaKompetisi: data.penyelenggara,
          jenisPrestasiId: jenis,
          periodePencapaian: period,
          jenisLomba: data.competitionType || '',
          deskripsi: data.deskripsi || '',
          fotoSertifikat: data.mediaSertifikat || '',
          fotoDiri: data.mediaFotoPribadi || '',
          fotoAwarding: data.mediaFotoAwarding || '',
        });
      } catch (error) {
        console.error('Error fetching prestasi:', error);
        alert('Gagal memuat data prestasi');
      } finally {
        setIsLoading(false);
      }
    };

    if (prestasiId) {
      fetchPrestasi();
    }
  }, [prestasiId, reset, setValue]);

  const onSubmit = async (data: PrestasiFormData) => {
    try {
      setIsSubmitting(true);

      // Parse period
      const [monthName, yearStr] = periodValue.split(' ');
      const monthMap: Record<string, number> = {
        Januari: 1,
        Februari: 2,
        Maret: 3,
        April: 4,
        Mei: 5,
        Juni: 6,
        Juli: 7,
        Agustus: 8,
        September: 9,
        Oktober: 10,
        November: 11,
        Desember: 12,
      };
      const bulan = monthMap[monthName];
      const tahun = parseInt(yearStr);

      // Map jenis prestasi
      const jenisMap: Record<
        string,
        'organisasi' | 'kepanitiaan' | 'kompetisi'
      > = {
        organisasi: 'organisasi',
        kepanitiaan: 'kepanitiaan',
        kompetisi: 'kompetisi',
      };

      // Handle file uploads
      const mediaUrls: string[] = [];

      // Check if files need to be uploaded
      if (
        data.fotoSertifikat instanceof FileList &&
        data.fotoSertifikat.length > 0
      ) {
        mediaUrls.push(await uploadViaPresigned(data.fotoSertifikat[0]));
      } else if (typeof data.fotoSertifikat === 'string') {
        mediaUrls.push(data.fotoSertifikat);
      }

      if (data.fotoDiri instanceof FileList && data.fotoDiri.length > 0) {
        mediaUrls.push(await uploadViaPresigned(data.fotoDiri[0]));
      } else if (typeof data.fotoDiri === 'string') {
        mediaUrls.push(data.fotoDiri);
      }

      if (
        data.fotoAwarding instanceof FileList &&
        data.fotoAwarding.length > 0
      ) {
        mediaUrls.push(await uploadViaPresigned(data.fotoAwarding[0]));
      } else if (typeof data.fotoAwarding === 'string' && data.fotoAwarding) {
        mediaUrls.push(data.fotoAwarding);
      }

      // Prepare payload with proper typing
      type UpdatePayload = {
        jenisPrestasi: 'organisasi' | 'kepanitiaan' | 'kompetisi';
        penyelenggara: string;
        deskripsi: string;
        bulan: number;
        tahun: number;
        competitionType?: 'CP' | 'CTF' | 'BCC' | 'DS' | 'AI' | 'Hackathon';
        mediaUrls: string[];
      };

      const payload: UpdatePayload = {
        jenisPrestasi: jenisMap[jenisPrestasiValue],
        penyelenggara: data.namaKompetisi,
        deskripsi: data.deskripsi,
        bulan,
        tahun,
        mediaUrls,
      };

      // Add competition type if applicable
      if (jenisPrestasiValue === 'kompetisi' && jenisLombaValue) {
        payload.competitionType = jenisLombaValue as
          | 'CP'
          | 'CTF'
          | 'BCC'
          | 'DS'
          | 'AI'
          | 'Hackathon';
      }

      await api.achievements.updatePrestasi({
        idPrestasi: prestasiId,
        requestBody: payload,
      });

      alert('Prestasi berhasil diperbarui!');
      if (onSuccess) onSuccess();
    } catch (error) {
      if (error instanceof ApiError) {
        console.error('API error:', error.status, error.body);
        alert(
          `Gagal memperbarui prestasi: ${error.body?.message || 'Unknown error'}`,
        );
      } else {
        console.error('Error updating prestasi:', error);
        alert('Gagal memperbarui prestasi');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="size-full overflow-hidden rounded-lg bg-white shadow-lg">
      <div className="h-full overflow-y-auto p-6 lg:p-8">
        <div className="mb-6 flex items-center gap-3 lg:mb-8">
          <div className="flex size-8 items-center justify-center rounded-lg bg-[#E8C55F] lg:size-10">
            <SquarePen className="size-4 text-gray-800 lg:size-5" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 lg:text-xl">
            Edit Entri Prestasi
          </h2>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 lg:space-y-8"
        >
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
            {/* Left Column */}
            <div className="space-y-4 lg:space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-900">
                  Nama Kompetisi/Organisasi{' '}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Masukkan nama prestasi ..."
                  className={`w-full rounded-lg border px-3 py-2.5 outline-none transition-colors focus:border-green-500 focus:ring-2 focus:ring-green-500 ${
                    errors.namaKompetisi
                      ? 'border-red-300 bg-red-50'
                      : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: '#FCFCFC' }}
                  {...register('namaKompetisi')}
                />
                {errors.namaKompetisi && (
                  <p className="text-sm text-red-600">
                    {errors.namaKompetisi.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Jenis Prestasi */}
                <CustomDropdown
                  label="Jenis Prestasi"
                  placeholder="Pilih jenis prestasi"
                  options={jenisPrestasiOptions}
                  value={jenisPrestasiValue}
                  onChange={(value) => {
                    setJenisPrestasiValue(value);
                    setValue('jenisPrestasiId', value);
                    if (value !== 'kompetisi') {
                      setJenisLombaValue('');
                      setValue('jenisLomba', '');
                    }
                  }}
                  required
                  error={errors.jenisPrestasiId?.message}
                />

                {/* Periode Pencapaian */}
                <PeriodInput
                  label="Periode Prestasi"
                  required
                  error={errors.periodePencapaian?.message}
                  onChange={(from, to) => {
                    const periodText = from && to ? `${from} ${to}` : '';
                    setPeriodValue(periodText);
                    setValue('periodePencapaian', periodText);
                  }}
                />
              </div>

              {/* Jenis Lomba - conditional */}
              {jenisPrestasiValue === 'kompetisi' && (
                <CustomDropdown
                  label="Jenis Lomba"
                  placeholder="Pilih jenis lomba"
                  options={jenisLombaOptions}
                  value={jenisLombaValue}
                  onChange={(value) => {
                    setJenisLombaValue(value);
                    setValue('jenisLomba', value);
                  }}
                  required
                  error={errors.jenisLomba?.message}
                />
              )}
            </div>

            {/* Right Column - Deskripsi */}
            <div className="lg:block">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-900">
                  Deskripsi Prestasi <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={6}
                  className={`w-full resize-none rounded-lg border bg-[#FCFCFC] px-3 py-2.5 outline-none transition-colors focus:border-green-500 focus:ring-2 focus:ring-green-500 lg:h-36 ${
                    errors.deskripsi
                      ? 'border-red-300 bg-red-50'
                      : 'border-gray-300'
                  }`}
                  placeholder="Masukkan deskripsi prestasi ..."
                  {...register('deskripsi')}
                />
                {errors.deskripsi && (
                  <p className="text-sm text-red-600">
                    {errors.deskripsi.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* File Upload Section */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <UploadFile
              label="Foto Sertifikat"
              required
              description="Upload 1 supported file: PDF, document, or image. Max 10 MB."
              error={errors.fotoSertifikat?.message}
              currentFile={prestasiData?.mediaSertifikat}
              {...register('fotoSertifikat')}
            />
            <UploadFile
              label="Foto Diri"
              required
              description="Ukuran 1:1. Disarankan foto formal dengan baju berkerah dan latar polos"
              error={errors.fotoDiri?.message}
              currentFile={prestasiData?.mediaFotoPribadi}
              {...register('fotoDiri')}
            />
            <UploadFile
              label="Foto Awarding"
              description="Foto saat awarding, lagi megang sertifikat, atau foto bukti lainnya"
              error={errors.fotoAwarding?.message}
              currentFile={prestasiData?.mediaFotoAwarding}
              {...register('fotoAwarding')}
            />
          </div>

          <div className="flex flex-col gap-4 pt-4 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
            <button
              type="button"
              onClick={onBack}
              className="hidden items-center gap-2 rounded-full border border-gray-300 bg-transparent px-6 py-2.5 font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 lg:inline-flex"
            >
              <ArrowLeft className="size-4" />
              Back
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="ml-auto inline-flex w-32 items-center justify-center gap-2 rounded-full bg-[#E8C55F] px-6 py-2.5 font-medium text-gray-900 transition-colors hover:bg-yellow-500 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 lg:ml-0 lg:w-auto"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
              <ArrowRight className="size-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
