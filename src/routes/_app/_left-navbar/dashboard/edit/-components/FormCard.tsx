import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SquarePen, ArrowRight, ArrowLeft } from 'lucide-react';
import { UploadFile } from './UploadFile';
import { PeriodInput } from './PeriodInput';
import { CustomDropdown, type DropdownOption } from './CustomDropdown';

const prestasiSchema = z.object({
  namaKompetisi: z.string().min(1, 'Nama kompetisi/organisasi wajib diisi'),
  jenisPrestasiId: z.string().min(1, 'Jenis prestasi wajib dipilih'),
  periodePencapaian: z.string().min(1, 'Periode pencapaian wajib diisi'),
  deskripsi: z.string().min(1, 'Deskripsi prestasi wajib diisi'),
  fotoDiri: z.instanceof(FileList).optional().or(z.string()),
  fotoSertifikat: z.instanceof(FileList).optional().or(z.string()),
  fotoAwarding: z.instanceof(FileList).optional().or(z.string()),
});

type PrestasiFormData = z.infer<typeof prestasiSchema>;

const jenisPrestasiOptions: DropdownOption[] = [
  { value: '', label: 'Pilih jenis prestasi' },
  { value: 'kompetisi', label: 'Kompetisi' },
  { value: 'organisasi', label: 'Organisasi' },
  { value: 'kepanitiaan', label: 'Kepanitiaan' },
];

export function FormCard() {
  const [periodValue, setPeriodValue] = useState('');
  const [jenisPrestasiValue, setJenisPrestasiValue] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    // setValue,
    // watch,
  } = useForm<PrestasiFormData>({
    resolver: zodResolver(prestasiSchema),
    defaultValues: {
      namaKompetisi: '',
      jenisPrestasiId: '',
      periodePencapaian: '',
      deskripsi: '',
    },
  });

  const onSubmit = (data: PrestasiFormData) => {
    console.log('Form submitted:', {
      ...data,
      periodePencapaian: periodValue,
      jenisPrestasiId: jenisPrestasiValue,
    });
  };

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
                {/* Periode Pencapaian */}
                <PeriodInput
                  label="Periode Prestasi"
                  required
                  error={errors.periodePencapaian?.message}
                  onChange={(from, to) => {
                    const periodText = from && to ? `${from} - ${to}` : '';
                    setPeriodValue(periodText);
                  }}
                />

                {/* Jenis Prestasi */}
                <CustomDropdown
                  label="Jenis Prestasi"
                  placeholder="Pilih jenis prestasi"
                  options={jenisPrestasiOptions}
                  value={jenisPrestasiValue}
                  onChange={setJenisPrestasiValue}
                  required
                  error={errors.jenisPrestasiId?.message}
                />
              </div>
            </div>

            {/* Right Column - Deskripsi */}
            <div className="lg:block">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-900">
                  Deskripsi Prestasi <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={6}
                  className={`w-full resize-none rounded-lg border px-3 py-2.5 outline-none transition-colors focus:border-green-500 focus:ring-2 focus:ring-green-500 lg:h-36 ${
                    errors.deskripsi
                      ? 'border-red-300 bg-red-50'
                      : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: '#FCFCFC' }}
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

          {/* File Upload Section - responsive grid */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <UploadFile
              label="Foto Sertifikat"
              required
              description="Upload 1 supported file: PDF, document, or image. Max 10 MB."
              error={errors.fotoSertifikat?.message}
              {...register('fotoSertifikat')}
            />
            <UploadFile
              label="Foto Diri"
              required
              description="Ukuran 1:1. Disarankan foto formal dengan baju berkerah dan latar polos"
              error={errors.fotoDiri?.message}
              {...register('fotoDiri')}
            />

            <UploadFile
              label="Foto Awarding"
              description="Foto saat awarding, lagi megang sertifikat, atau foto bukti lainnya"
              error={errors.fotoAwarding?.message}
              {...register('fotoAwarding')}
            />
          </div>

          <div className="flex flex-col gap-4 pt-4 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
            <button
              type="button"
              className="hidden items-center gap-2 rounded-lg border border-gray-300 bg-transparent px-6 py-2.5 font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 lg:inline-flex"
            >
              <ArrowLeft className="size-4" />
              Back
            </button>

            <button
              type="submit"
              className="ml-auto inline-flex w-32 items-center justify-center gap-2 rounded-full bg-[#E8C55F] px-6 py-2.5 font-medium text-gray-900 transition-colors hover:bg-yellow-500 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 lg:ml-0 lg:w-auto"
            >
              Submit
              <ArrowRight className="size-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
