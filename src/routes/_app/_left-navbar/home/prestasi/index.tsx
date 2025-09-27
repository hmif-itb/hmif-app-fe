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
// import { CreateAchievementRequest } from '~/api/generated/models/Achievement';
// import { AchievementService } from '~/api/generated/services/AchievementService';
// import { api } from '~/api/client';

export const Route = createFileRoute('/_app/_left-navbar/home/prestasi/')({
  component: PrestasiPage,
});

// const achivementService = new AchievementService(api as any);

// Options buat dropdown prestasi
const prestasiOptions = [
  'Organisasi non-HMIF',
  'Kepanitian non-HMIF',
  'Kompetisi atau Lomba'
];

// Deskripsi prestasi max word
const deskripsiMaxWord = 200;

// Skema validasi input
const prestasiScheme = z.object({
  namaPrestasi: z.string().min(1, 'This field is required'),
  jenisPrestasi: z.string().min(1, 'This field is required'),
  periodePrestasi: z.string().min(1, 'This field is required'),
  deskripsiPrestasi: z.string().min(1, 'This field is required').refine((text: string) => {
    const wordCount = text.trim().split(/\s+/).filter(word => word.length > 0).length;
    return wordCount <= deskripsiMaxWord;
  }, `${deskripsiMaxWord} words maximum`),
  fotoSertifikat: z.instanceof(File, { message: 'This field is required' }),
  fotoDiri: z.instanceof(File, { message: 'This field is required' }),
  fotoAwarding: z.instanceof(File).optional()
});

// Type interface dari zod schema
type PrestasiFormData = z.infer<typeof prestasiScheme>;

// Error state
interface ErrorForms {
  namaPrestasi: string;
  jenisPrestasi: string;
  periodePrestasi: string;
  deskripsiPrestasi: string;
  fotoSertifikat: string;
  fotoDiri: string;
  fotoAwarding: string;
}


function PrestasiPage(): JSX.Element {
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [alert, setAlert] = useState<{
    type: 'success' | 'error';
    isVisible: boolean;
  }>({
    type: 'success',
    isVisible: false
  });

  const [formData, setFormData] = useState<PrestasiFormData>({
    namaPrestasi: '',
    jenisPrestasi: '',
    periodePrestasi: '',
    deskripsiPrestasi: '',
    fotoSertifikat: null as any,
    fotoDiri: null as any,
    fotoAwarding: null as any,
  });

  const [errors, setErrors] = useState<ErrorForms>({
    namaPrestasi: '',
    jenisPrestasi: '',
    periodePrestasi: '',
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
        deskripsiPrestasi: '',
        fotoSertifikat: '',
        fotoDiri: '',
        fotoAwarding: '',
    })

    return true;
  };

  // Handle input yang berubah
  const handleInputChange = (field: keyof PrestasiFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  
    // Max kata untuk deskripsi
    if (field === 'deskripsiPrestasi') {
      const words = value.trim().split(/\s+/).filter(word => word.length > 0);
      
      if (words.length > deskripsiMaxWord) {
        // Set error langsung saat user mengetik
        setErrors(prev => ({ 
          ...prev, 
          deskripsiPrestasi: `${deskripsiMaxWord} words maximum` 
        }));
      } else {
        // Clear error jika sudah valid
        setErrors(prev => ({ ...prev, deskripsiPrestasi: '' }));
      }
    } else {
      // Clear error untuk field lain jika input tidak kosong
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: '' }));
      }
    }
  };
  
  const handleCategorySelect = (value: string) => {
    handleInputChange('jenisPrestasi', value);
  };

  const handlePeriodSelect = (month: string, year: number) => {
    handleInputChange('periodePrestasi', `${month} ${year}`);
  }

  // Handle file upload
  const handleFileSelect = (field: keyof PrestasiFormData, file: File) => {
    setFormData(prev => ({ ...prev, [field]: file }));
    
    // Clear error untuk file upload
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Handle remove file di upload file button
  const handleRemoveFile = (field: keyof PrestasiFormData) => {
    setFormData(prev => ({ ...prev, [field]: null as any}));

    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
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

      // Simulasi sementara buat form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // const achievementData: CreateAchievementRequest = {
      //   user_id: 1, 
      //   jenis_prestasi: formData.jenisPrestasi,
      //   nama_prestasi: formData.namaPrestasi,
      //   penyelenggara: formData.namaPrestasi,
      //   periode_prestasi: formData.periodePrestasi,
      //   url_sertifikat: '', 
      //   url_foto_diri: '', 
      //   url_foto_awarding: '', 
      // };
  
      // const result = await achivementService.createAchievement(achievementData);
      // console.log('Achievement created:', result);

      // Alert success
      setAlert({
        type: 'success',
        isVisible: true
      });

      // Tutup modal
      setShowConfirmModal(false);

      // Ini kalo udah fungsional reset form
      
    } catch (error) {
      console.error('Error creating achievement:', error);
      
      // Alert gagal
      setAlert({
        type: 'error',
        isVisible: true
      });

    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAlertClose = () => {
    setAlert(prev => ({ ...prev, isVisible: false }));
  };

  const isFormValid = prestasiScheme.safeParse(formData).success;

  return (
    <div className="min-h-screen w-full overflow-auto bg-[url('/img/login/login-bg-desktop.jpg')] bg-no-repeat bg-cover p-4 sm:p-6 pb-8">

      <div className='flex flex-row gap-2 items-center'>
        <ChevronLeft 
          className='size-8 sm:size-12 text-white cursor-pointer hover:-translate-x-1 duration-300'
          onClick={() => navigate({ to: '/home' })}
        />
        <span className='flex sm:flex-row gap-1 sm:gap-3 font-bold text-2xl sm:text-4xl text-white'>
          Pendataan
          <span className='italic font-normal'>Prestasi</span>
        </span>
      </div>

      <div className='mt-6 sm:mt-8 flex flex-col gap-6 sm:gap-8 bg-white rounded-[12px] p-4 sm:p-8 pb-8'>
        
        <div className='flex flex-col gap-6'>
          <div className='flex flex-row gap-3 items-center'>
            <div className='flex p-2 bg-yellow-200 rounded-[4px]'>
              <img src='/img/icons/entry.svg' alt="Icon Prestasi" className='size-4' />
            </div>
            <h1 className='font-semibold text-[16px]'>Formulir Prestasi</h1>
          </div>
          <h2 className='font-semibold text-2xl'>Prestasi</h2>
        </div>
        
        <div className='flex flex-col lg:flex-row gap-6 lg:gap-12'>
          <div className='flex flex-col gap-6 flex-1'>

            {/* Nama Prestasi */}
            <div className='flex flex-col gap-2'>
                <span className='text-sm'>Nama Kompetisi/Organisasi <span className='text-red-400'>*</span></span>
                <Input 
                    className={`bg-[#FCFCFC] hover:border-[#CBD5E1] focus-visible:border-[#94A3B8] rounded-lg focus-visible:ring-0 focus-visible:ring-offset-0 ${
                      errors.namaPrestasi ? 'border-red-400 focus-visible:border-red-400' : ''
                    }`}
                    placeholder = 'Masukkan nama kompetisi/organisasi'
                    value = {formData.namaPrestasi}
                    onChange = {(e) => handleInputChange('namaPrestasi', e.target.value)}
                />
                {errors.namaPrestasi && (
                  <span className='text-red-400 text-xs font-semibold'>
                    {errors.namaPrestasi}
                  </span>
                )}
            </div>

            <div className='flex flex-col sm:flex-row gap-4'>

              { /* Jenis Prestasi */ }
              <div className='flex flex-col gap-2 w-full sm:w-[48%]'>
                  <span className='text-sm'>Jenis Prestasi <span className='text-red-400'>*</span></span>
                  <DropdownCategory
                    placeholder='Pilih jenis prestasi'
                    options={prestasiOptions}
                    onSelect={handleCategorySelect}
                    className={errors.jenisPrestasi ? 'border-red-400' : ''}
                  />
                  {errors.jenisPrestasi && (
                    <span className='text-red-400 text-xs font-semibold'>
                      {errors.jenisPrestasi}
                    </span>
                  )}
              </div>

              { /* Periode Prestasi */ }
              <div className='flex flex-col gap-2 w-full sm:w-[52%]'>
                  <span className='text-sm'>Periode Pencapaian Prestasi <span className='text-red-400'>*</span></span>
                  <DropdownCalendar 
                    placeholder="Bulan/Tahun"
                    onSelect={handlePeriodSelect}
                    className={`${errors.periodePrestasi ? 'border-red-400' : ''}`}
                  />
                  {errors.periodePrestasi && (
                    <span className='text-red-400 text-xs font-semibold'>
                      {errors.periodePrestasi}
                    </span>
                  )}
              </div>
            </div>

          </div>

          {/* Deskripsi Prestasi */}
          <div className='flex flex-col gap-2 w-full lg:w-[50%]'>
            <span className='text-sm'>Deskripsi Prestasi <span className='text-red-400'>*</span></span>
            <Textarea className={`bg-[#FCFCFC] rounded-lg resize-none h-[130px] ${
              errors.deskripsiPrestasi ? 'border-red-400 focus-visible:border-red-400' : ''
            }`} 
              placeholder='Masukkan deskripsi prestasi...'
              value={formData.deskripsiPrestasi}
              onChange={(e) => handleInputChange('deskripsiPrestasi', e.target.value)}
            />
            {errors.deskripsiPrestasi && (
              <span className='text-red-400 text-xs font-semibold'>
                {errors.deskripsiPrestasi}
              </span>
            )}
          </div>
        
        </div>
        
        <div className='mt-8 flex flex-col lg:flex-row items-start justify-between gap-6 lg:gap-14'>
          
          {/* Foto Sertifikat */}
          <div className='flex flex-col gap-2 w-full lg:w-auto'>
            <span className='text-sm'>Foto Sertifikat <span className='text-red-400'>*</span></span>
            <span className='font-light text-gray-600 text-xs'>
              Upload 1 supported file: PDF, document, or image. Max 10 MB.
            </span>
            <UploadButton 
              text='Upload File' 
              onFileSelect={(file) => handleFileSelect('fotoSertifikat', file)}
              onFileRemove={() => handleRemoveFile('fotoSertifikat')}
              accept='image/*,application/pdf'
              className={`mt-4 ${errors.fotoSertifikat ? 'border-red-400' : ''}`}
              disabled={false}
              maxWidth="100px"
            />
            {errors.fotoSertifikat && (
              <span className='text-red-400 text-xs font-semibold'>
                {errors.fotoSertifikat}
              </span>
            )}
          </div>

          {/* Foto Diri */}
          <div className='flex flex-col gap-2 w-full lg:max-w-[260px]'>
            <span className='text-sm'>Foto Diri <span className='text-red-400'>*</span></span>
            <span className='font-light text-gray-600 text-xs'>
              Ukuran 1:1. Disarankan sekali foto formal mengenakan baju berkerah dengan latar polos
            </span>
            <UploadButton 
              text='Upload File' 
              onFileSelect={(file) => handleFileSelect('fotoDiri', file)}
              onFileRemove={() => handleRemoveFile('fotoDiri')}
              accept='image/*'
              className={`mt-4 ${errors.fotoDiri ? 'border-red-400' : ''}`}
              disabled={false}
              maxWidth="100px"
            />
            {errors.fotoDiri && (
              <span className='text-red-400 text-xs font-semibold'>
                {errors.fotoDiri}
              </span>
            )}
          </div>

          {/* Foto Awarding */}
          <div className='flex flex-col gap-2 w-full lg:w-auto'>
            <span className='text-sm'>Foto Awarding</span>
            <span className='font-light text-gray-600 text-xs'>
              Foto saat awarding, lagi megang sertifikat, atau foto bukti lainnya
            </span>
            <UploadButton 
              text='Upload File' 
              onFileSelect={(file) => handleFileSelect('fotoAwarding', file)}
              onFileRemove={() => handleRemoveFile('fotoAwarding')}
              accept='image/*'
              className={`mt-4 ${errors.fotoAwarding ? 'border-red-400' : ''}`}
              disabled={false}
              maxWidth="100px"
            />
            {errors.fotoAwarding && (
              <span className='text-red-400 text-xs font-semibold'>
                {errors.fotoAwarding}
              </span>
            )}
          </div>

        </div>
        
        <div className='mt-4 mb-8 flex flex-row justify-end'>
          <SubmitButton 
            text='Submit' 
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