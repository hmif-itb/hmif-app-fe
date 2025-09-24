import { createFileRoute } from '@tanstack/react-router';
import { UploadButton } from './-components/upload-button';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import { ChevronLeft } from 'lucide-react';
import { SubmitButton } from './-components/submit-button';

export const Route = createFileRoute('/_app/_left-navbar/home/prestasi/')({
  component: PrestasiPage,
});

const handleSubmit = () => {
  console.log('Form Submitted!');
};

function PrestasiPage(): JSX.Element {
  return (
    <div className="h-screen w-full overflow-auto bg-[url('/img/login/login-bg-desktop.jpg')] bg-no-repeat bg-cover p-6">

      <div className='flex flex-row gap-2 items-center'>
        <ChevronLeft className='size-12 text-white'/>
        <span className='flex flex-row gap-3 font-bold text-4xl text-white'>
          Pendataan
          <span className='italic font-normal'>Prestasi</span>
        </span>
      </div>

      <div className='mt-8 flex flex-col gap-12 bg-white rounded-[12px] p-8'>
        
        <div className='flex flex-row gap-3 items-center'>
          <div className='flex p-2 bg-yellow-200 rounded-[4px]'>
            <img src='/img/icons/entry.svg' alt="Icon Prestasi" className='size-4' />
          </div>
          <h1 className='font-semibold text-[16px]'>Tambah Entri Prestasi</h1>
        </div>

        <div className='flex flex-row gap-12'>
          <div className='flex flex-col gap-6'>
            <div className='flex flex-col gap-2'>
                <span className='text-sm'>Nama Kompetisi/Organisasi</span>
                <Input className='bg-[#FCFCFC] rounded-lg' placeholder='Masukkan nama prestasi...'/>
            </div>
            <div className='flex flex-row gap-4'>
              <div className='flex flex-col gap-2'>
                  <span className='text-sm'>Jenis Prestasi</span>
                  <Input className='bg-[#FCFCFC] rounded-lg' placeholder='Pilih jenis prestasi...'/>
              </div>
              <div className='flex flex-col gap-2'>
                  <span className='text-sm'>Periode Pencapaian Prestasi</span>
                  <Input className='bg-[#FCFCFC] rounded-lg' placeholder='Pilih tanggal...'/>
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-2 w-[50%] '>
            <span className='text-sm'>Deskripsi Prestasi</span>
            <Textarea className='bg-[#FCFCFC] rounded-lg resize-none h-[130px]' placeholder='Masukkan deskripsi prestasi...'/>
          </div>
        
        </div>
        
        <div className='flex flex-row items-start justify-between gap-14'>

          <div className='flex flex-col gap-2'>
            <span className='text-sm'>Foto Sertifikat</span>
            <span className='font-light text-gray-600 text-xs'>
              Upload 1 supported file: PDF, document, or image. Max 10 MB.
            </span>
            <UploadButton 
              text='Upload File' 
              // onFileSelect={handleFileSelect}
              accept='image/*'
              className='mt-4'
              disabled={false}
            />
          </div>

          <div className='flex flex-col gap-2 max-w-[260px]'>
            <span className='text-sm'>Foto Diri</span>
            <span className='font-light text-gray-600 text-xs'>
              Ukuran 1:1. Disarankan sekali foto formal mengenakan baju berkerah dengan latar polos
            </span>
            <UploadButton 
              text='Upload File' 
              // onFileSelect={handleFileSelect}
              accept='image/*'
              className='mt-4'
              disabled={false}
            />
          </div>

          <div className='flex flex-col gap-2'>
            <span className='text-sm'>Foto Awarding</span>
            <span className='font-light text-gray-600 text-xs'>
              Foto saat awarding, lagi megang sertifikat, atau foto bukti lainnya
            </span>
            <UploadButton 
              text='Upload File' 
              // onFileSelect={handleFileSelect}
              accept='image/*'
              className='mt-4'
              disabled={false}
            />
          </div>

        </div>
        
        <div className='mt-4 flex flex-row justify-end'>
          <SubmitButton 
            text='Submit' 
            onSubmit={handleSubmit} 
            disabled={false} 
          />
        </div>
        
        
        
      </div>
    </div>
  );
}