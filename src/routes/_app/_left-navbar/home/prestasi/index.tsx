import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { UploadButton } from './-components/upload-button';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import { ChevronLeft } from 'lucide-react';
import { SubmitButton } from './-components/submit-button';
import { DropdownCategory } from './-components/dropdown-category';
import { DropdownCalendar } from './-components/monthly-calendar';
import { ConfirmModal } from './-components/confirm-modal';
import { Alert } from './-components/alert';
import { useState } from 'react';
import { z } from 'zod';
import { api } from '~/api/client';
import { ApiError } from '~/api/generated';

export const Route = createFileRoute('/_app/_left-navbar/home/prestasi/')({
  component: PrestasiPage,
});

// For urlss files
async function uploadViaPresigned(file: File): Promise<string> {
  const fullName = file.name;
  const lastDot = fullName.lastIndexOf('.');
  const base = lastDot === -1 ? fullName : fullName.slice(0, lastDot);
  const ext = lastDot === -1 ? '' : fullName.slice(lastDot + 1).toLowerCase();
  if (!ext) {
    throw new Error('File must have an extension (e.g. .jpg, .png, .pdf)');
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

// Options buat dropdown prestasi
const prestasiOptions = [
  'Organisasi non-HMIF',
  'Kepanitian non-HMIF',
  'Kompetisi atau Lomba',
];

// Options buat jenis lomba
const jenisLombaOptions = [
  'Competitive Programming',
  'Capture The Flag',
  'Business Case Competition',
  'UI/UX',
  'Data Science',
  'Hackathon',
  'Artificial Intelligence',
];

// Deskripsi prestasi max word
const deskripsiMaxWord = 200;

// Skema validasi input
const prestasiScheme = z.object({
  namaPrestasi: z.string().min(1, 'This field is required'),
  jenisPrestasi: z.enum([
    'Organisasi non-HMIF',
    'Kepanitian non-HMIF',
    'Kompetisi atau Lomba',
  ]),
  periodePrestasi: z.string().min(1, 'This field is required'),
  jenisLomba: z.string().optional(),
  deskripsiPrestasi: z
    .string()
    .min(1, 'This field is required')
    .refine((text: string) => {
      const wordCount = text
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0).length;
      return wordCount <= deskripsiMaxWord;
    }, `${deskripsiMaxWord} words maximum`),
  fotoSertifikat: z.instanceof(File, { message: 'This field is required' }),
  fotoDiri: z.instanceof(File, { message: 'This field is required' }),
  fotoAwarding: z.union([z.instanceof(File), z.null()]).optional(),
});

// Type interface dari zod schema
type PrestasiFormData = z.infer<typeof prestasiScheme>;

// Error state
interface ErrorForms {
  namaPrestasi: string;
  jenisPrestasi: string;
  periodePrestasi: string;
  jenisLomba: string;
  deskripsiPrestasi: string;
  fotoSertifikat: string;
  fotoDiri: string;
  fotoAwarding: string;
}

function PrestasiPage(): JSX.Element {
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [, setJenisLomba] = useState('');
  const [resetKey, setResetKey] = useState(0);

  const [alert, setAlert] = useState<{
    type: 'success' | 'error';
    isVisible: boolean;
  }>({
    type: 'success',
    isVisible: false,
  });

  const [formData, setFormData] = useState<PrestasiFormData>({
    namaPrestasi: '',
    jenisPrestasi:
      'Organisasi non-HMIF' as unknown as PrestasiFormData['jenisPrestasi'],
    periodePrestasi: '',
    jenisLomba: '',
    deskripsiPrestasi: '',
    fotoSertifikat: null as unknown as File,
    fotoDiri: null as unknown as File,
    fotoAwarding: null as unknown as File,
  });

  const [errors, setErrors] = useState<ErrorForms>({
    namaPrestasi: '',
    jenisPrestasi: '',
    periodePrestasi: '',
    jenisLomba: '',
    deskripsiPrestasi: '',
    fotoSertifikat: '',
    fotoDiri: '',
    fotoAwarding: '',
  });

  const validateForms = (): boolean => {
    const result = prestasiScheme.safeParse(formData);

    // Jika gagal, set error
    if (!result.success) {
      // Reset semua error
      const newErrors: ErrorForms = {
        namaPrestasi: '',
        jenisPrestasi: '',
        periodePrestasi: '',
        jenisLomba: '',
        deskripsiPrestasi: '',
        fotoSertifikat: '',
        fotoDiri: '',
        fotoAwarding: '',
      };

      // Set error message dari zod
      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as keyof ErrorForms;
        newErrors[fieldName] = issue.message;
      });

      setErrors(newErrors);
      return false;
    }

    // Clear error jika validasi berhasil
    setErrors({
      namaPrestasi: '',
      jenisPrestasi: '',
      periodePrestasi: '',
      jenisLomba: '',
      deskripsiPrestasi: '',
      fotoSertifikat: '',
      fotoDiri: '',
      fotoAwarding: '',
    });

    return true;
  };

  // Handle input yang berubah
  const handleInputChange = (field: keyof PrestasiFormData, value: string) => {
    setFormData(
      (prev): PrestasiFormData => ({
        ...(prev as PrestasiFormData),
        [field]: value as never,
      }),
    );

    // Max kata untuk deskripsi
    if (field === 'deskripsiPrestasi') {
      const words = value
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0);

      if (words.length > deskripsiMaxWord) {
        // Set error langsung saat user mengetik
        setErrors((prev) => ({
          ...prev,
          deskripsiPrestasi: `${deskripsiMaxWord} words maximum`,
        }));
      } else {
        // Clear error jika sudah valid
        setErrors((prev) => ({ ...prev, deskripsiPrestasi: '' }));
      }
    } else {
      // Clear error untuk field lain jika input tidak kosong
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: '' }));
      }
    }
  };

  const handleCategorySelect = (value: string) => {
    handleInputChange('jenisPrestasi', value);

    // Handle jenis lomba
    if (value !== 'Kompetisi atau Lomba') {
      setJenisLomba('');
      setFormData((prev) => ({ ...prev, jenisLomba: '' }));
      setErrors((prev) => ({ ...prev, jenisLomba: '' }));
    }
  };

  const handleJenisLombaSelect = (value: string) => {
    setJenisLomba(value);
    setFormData((prev) => ({ ...prev, jenisLomba: value }));
    if (errors.jenisLomba) {
      setErrors((prev) => ({ ...prev, jenisLomba: '' }));
    }
  };

  const handlePeriodSelect = (month: string, year: number) => {
    handleInputChange('periodePrestasi', `${month} ${year}`);
  };

  // Handle file upload
  const handleFileSelect = (field: keyof PrestasiFormData, file: File) => {
    setFormData(
      (prev): PrestasiFormData => ({
        ...(prev as PrestasiFormData),
        [field]: file as never,
      }),
    );

    // Clear error untuk file upload
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  // Handle remove file di upload file button
  const handleRemoveFile = (field: keyof PrestasiFormData) => {
    setFormData(
      (prev): PrestasiFormData => ({
        ...(prev as PrestasiFormData),
        [field]: null as never,
      }),
    );

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  // Submission and modal popper
  const handleSubmit = async () => {
    if (validateForms()) {
      setShowConfirmModal(true);
    }
  };

  const handleConfirmSubmit = async () => {
    setIsSubmitting(true);
    try {
      const [monthName, yearStr] = formData.periodePrestasi.split(' ');
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

      const jenisPrestasiMap: Record<
        string,
        'organisasi' | 'kepanitiaan' | 'kompetisi'
      > = {
        'Organisasi non-HMIF': 'organisasi',
        'Kepanitian non-HMIF': 'kepanitiaan',
        'Kompetisi atau Lomba': 'kompetisi',
      };

      const competitionTypeMap: Record<
        string,
        'CP' | 'CTF' | 'BCC' | 'DS' | 'AI' | 'Hackathon' | null
      > = {
        'Competitive Programming': 'CP',
        'Capture The Flag': 'CTF',
        'Business Case Competition': 'BCC',
        'UI/UX': null,
        'Data Science': 'DS',
        Hackathon: 'Hackathon',
        'Artificial Intelligence': 'AI',
      };

      // Upload file ke storage
      const mediaUrls: string[] = [];
      if (formData.fotoSertifikat) {
        mediaUrls.push(await uploadViaPresigned(formData.fotoSertifikat));
      }
      if (formData.fotoDiri) {
        mediaUrls.push(await uploadViaPresigned(formData.fotoDiri));
      }
      if (formData.fotoAwarding) {
        mediaUrls.push(await uploadViaPresigned(formData.fotoAwarding));
      }

      if (mediaUrls.length < 2) {
        throw new Error('Minimal upload 2 file: Sertifikat dan Foto Diri');
      }

      let competitionTypeValue:
        | 'CP'
        | 'CTF'
        | 'BCC'
        | 'DS'
        | 'AI'
        | 'Hackathon'
        | null = null;
      if (
        formData.jenisPrestasi === 'Kompetisi atau Lomba' &&
        formData.jenisLomba
      ) {
        const key = formData.jenisLomba as keyof typeof competitionTypeMap;
        competitionTypeValue = competitionTypeMap[key] ?? null;
      }

      const payload = {
        jenisPrestasi: jenisPrestasiMap[formData.jenisPrestasi],
        penyelenggara: formData.namaPrestasi,
        deskripsi: formData.deskripsiPrestasi,
        bulan,
        tahun,
        competitionType: competitionTypeValue,
        mediaUrls,
      };

      const result = await api.achievements.createPrestasi({
        requestBody: payload,
      });
      console.log('Prestasi created:', result);

      setAlert({ type: 'success', isVisible: true });
      setShowConfirmModal(false);
      setFormData({
        namaPrestasi: '',
        jenisPrestasi:
          'Organisasi non-HMIF' as PrestasiFormData['jenisPrestasi'],
        periodePrestasi: '',
        jenisLomba: '',
        deskripsiPrestasi: '',
        fotoSertifikat: null as unknown as File,
        fotoDiri: null as unknown as File,
        fotoAwarding: null as unknown as File,
      });
      setJenisLomba('');
      setErrors({
        namaPrestasi: '',
        jenisPrestasi: '',
        periodePrestasi: '',
        jenisLomba: '',
        deskripsiPrestasi: '',
        fotoSertifikat: '',
        fotoDiri: '',
        fotoAwarding: '',
      });
      setResetKey((v) => v + 1);
    } catch (error) {
      if (error instanceof ApiError) {
        console.error('API error:', error.status, error.body);
      } else {
        console.error('Error creating achievement:', error);
      }
      setAlert({ type: 'error', isVisible: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAlertClose = () => {
    setAlert((prev) => ({ ...prev, isVisible: false }));
  };

  // const isFormValid = prestasiScheme.safeParse(formData).success;

  return (
    <div className="min-h-screen w-full overflow-auto bg-[url('/img/login/login-bg-desktop.jpg')] bg-cover bg-no-repeat p-4 pb-8 sm:p-6">
      <div className="flex flex-row items-center gap-2">
        <ChevronLeft
          className="size-8 cursor-pointer text-white duration-300 hover:-translate-x-1 sm:size-12"
          onClick={() => navigate({ to: '/home' })}
        />
        <span className="flex gap-1 text-2xl font-bold text-white sm:flex-row sm:gap-3 sm:text-4xl">
          Pendataan
          <span className="font-normal italic">Prestasi</span>
        </span>
      </div>

      <div
        key={resetKey}
        className="mt-6 flex flex-col gap-6 rounded-[12px] bg-white p-4 pb-8 sm:mt-8 sm:gap-8 sm:p-8"
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-row items-center gap-3">
            <div className="flex rounded-[4px] bg-yellow-200 p-2">
              <img
                src="/img/icons/entry.svg"
                alt="Icon Prestasi"
                className="size-4"
              />
            </div>
            <h1 className="text-[16px] font-semibold">Formulir Prestasi</h1>
          </div>
          <h2 className="text-2xl font-semibold">Prestasi</h2>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row lg:gap-12">
          <div className="flex flex-1 flex-col gap-6">
            {/* Nama Prestasi */}
            <div className="flex flex-col gap-2">
              <span className="text-sm">
                Nama Kompetisi/Organisasi{' '}
                <span className="text-red-400">*</span>
              </span>
              <Input
                className={`rounded-lg bg-[#FCFCFC] hover:border-[#CBD5E1] focus-visible:border-[#94A3B8] focus-visible:ring-0 focus-visible:ring-offset-0 ${
                  errors.namaPrestasi
                    ? 'border-red-400 focus-visible:border-red-400'
                    : ''
                }`}
                placeholder="Masukkan nama kompetisi/organisasi"
                value={formData.namaPrestasi}
                onChange={(e) =>
                  handleInputChange('namaPrestasi', e.target.value)
                }
              />
              {errors.namaPrestasi && (
                <span className="text-xs font-semibold text-red-400">
                  {errors.namaPrestasi}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              {/* Jenis Prestasi */}
              <div className="flex w-full flex-col gap-2 sm:w-[48%]">
                <span className="text-sm">
                  Jenis Prestasi <span className="text-red-400">*</span>
                </span>
                <DropdownCategory
                  placeholder="Pilih jenis prestasi"
                  options={prestasiOptions}
                  onSelect={handleCategorySelect}
                  className={errors.jenisPrestasi ? 'border-red-400' : ''}
                />
                {errors.jenisPrestasi && (
                  <span className="text-xs font-semibold text-red-400">
                    {errors.jenisPrestasi}
                  </span>
                )}
              </div>

              {/* Periode Prestasi */}
              <div className="flex w-full flex-col gap-2 sm:w-[52%]">
                <span className="text-sm">
                  Periode Pencapaian Prestasi{' '}
                  <span className="text-red-400">*</span>
                </span>
                <DropdownCalendar
                  placeholder="Bulan/Tahun"
                  onSelect={handlePeriodSelect}
                  className={`${errors.periodePrestasi ? 'border-red-400' : ''}`}
                />
                {errors.periodePrestasi && (
                  <span className="text-xs font-semibold text-red-400">
                    {errors.periodePrestasi}
                  </span>
                )}
              </div>
            </div>

            {/* Jenis Lomba */}
            {formData.jenisPrestasi === 'Kompetisi atau Lomba' && (
              <div className="flex flex-col gap-2">
                <span className="text-sm">
                  Jenis Lomba <span className="text-red-400">*</span>
                </span>
                <DropdownCategory
                  placeholder="Pilih jenis lomba"
                  options={jenisLombaOptions}
                  onSelect={handleJenisLombaSelect}
                  className={errors.jenisLomba ? 'border-red-400' : ''}
                />
                {errors.jenisLomba && (
                  <span className="text-xs font-semibold text-red-400">
                    {errors.jenisLomba}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Deskripsi Prestasi */}
          <div className="flex size-full flex-col gap-2 lg:w-1/2">
            <span className="text-sm">
              Deskripsi Prestasi <span className="text-red-400">*</span>
            </span>
            <Textarea
              className={`h-[130px] resize-none rounded-lg bg-[#FCFCFC] ${
                errors.deskripsiPrestasi
                  ? 'border-red-400 focus-visible:border-red-400'
                  : ''
              }`}
              placeholder="Masukkan deskripsi prestasi..."
              value={formData.deskripsiPrestasi}
              onChange={(e) =>
                handleInputChange('deskripsiPrestasi', e.target.value)
              }
            />
            {errors.deskripsiPrestasi && (
              <span className="text-xs font-semibold text-red-400">
                {errors.deskripsiPrestasi}
              </span>
            )}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-6 lg:flex-row lg:gap-14">
          {/* Foto Sertifikat */}
          <div className="flex w-full flex-col gap-2 lg:w-auto">
            <span className="text-sm">
              Foto Sertifikat <span className="text-red-400">*</span>
            </span>
            <span className="text-xs font-light text-gray-600">
              Upload 1 supported file: PDF, document, or image. Max 10 MB.
            </span>
            <UploadButton
              text="Upload File"
              onFileSelect={(file) => handleFileSelect('fotoSertifikat', file)}
              onFileRemove={() => handleRemoveFile('fotoSertifikat')}
              accept="image/*,application/pdf"
              className={`mt-4 ${errors.fotoSertifikat ? 'border-red-400' : ''}`}
              disabled={false}
              maxWidth="100px"
            />
            {errors.fotoSertifikat && (
              <span className="text-xs font-semibold text-red-400">
                {errors.fotoSertifikat}
              </span>
            )}
          </div>

          {/* Foto Diri */}
          <div className="flex w-full flex-col gap-2 lg:max-w-[260px]">
            <span className="text-sm">
              Foto Diri <span className="text-red-400">*</span>
            </span>
            <span className="text-xs font-light text-gray-600">
              Ukuran 1:1. Disarankan sekali foto formal mengenakan baju berkerah
              dengan latar polos
            </span>
            <UploadButton
              text="Upload File"
              onFileSelect={(file) => handleFileSelect('fotoDiri', file)}
              onFileRemove={() => handleRemoveFile('fotoDiri')}
              accept="image/*"
              className={`mt-4 ${errors.fotoDiri ? 'border-red-400' : ''}`}
              disabled={false}
              maxWidth="100px"
            />
            {errors.fotoDiri && (
              <span className="text-xs font-semibold text-red-400">
                {errors.fotoDiri}
              </span>
            )}
          </div>

          {/* Foto Awarding */}
          <div className="flex w-full flex-col gap-2 lg:w-auto">
            <span className="text-sm">Foto Awarding</span>
            <span className="text-xs font-light text-gray-600">
              Foto saat awarding, lagi megang sertifikat, atau foto bukti
              lainnya
            </span>
            <UploadButton
              text="Upload File"
              onFileSelect={(file) => handleFileSelect('fotoAwarding', file)}
              onFileRemove={() => handleRemoveFile('fotoAwarding')}
              accept="image/*"
              className={`mt-4 ${errors.fotoAwarding ? 'border-red-400' : ''}`}
              disabled={false}
              maxWidth="100px"
            />
            {errors.fotoAwarding && (
              <span className="text-xs font-semibold text-red-400">
                {errors.fotoAwarding}
              </span>
            )}
          </div>
        </div>

        <div className="mb-8 mt-4 flex flex-row justify-end">
          <SubmitButton
            text="Submit"
            onSubmit={handleSubmit}
            disabled={false}
            // isValid={isFormValid}
          />
        </div>
      </div>

      <Alert
        type={alert.type}
        isVisible={alert.isVisible}
        onClose={handleAlertClose}
        duration={5000}
      />

      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmSubmit}
        loading={isSubmitting}
      />
    </div>
  );
}
