import React from 'react';
import { Prestasi } from '~/api/generated';

const CardHistory: React.FC<{ data: Prestasi; className?: string }> = ({
  data,
  className,
}) => {
  const styleJenisPrestasi = () => {
    switch (data.jenisPrestasi.toLowerCase()) {
      case 'kompetisi':
        return 'bg-[#D3FEE1] border-[#446450] text-[#446450]';
      case 'kepanitiaan':
        return 'bg-[#F3E8C4] border-[#5D6444] text-[#5D6444]';
      case 'organisasi':
        return 'bg-[#D3E1FE] border-[#444F64] text-[#444F64]';
      default:
        return 'bg-white';
    }
  };

  return (
    <div
      className={
        'flex items-center justify-center gap-4 rounded-lg bg-white p-4 lg:relative ' +
        className
      }
    >
      <img
        src={
          data.user?.picture ??
          '/img/history-prestasi/default-history-image.webp'
        }
        alt="Gambar Prestasi"
        className="w-1/3 lg:w-full"
      />
      <div className="flex w-full flex-col gap-1 text-sm lg:gap-3">
        <div className="font-bold">{data.user?.fullName}</div>
        <div className="flex justify-between gap-2">
          <div className="rounded-full border-2 border-black px-2 text-center">
            STI'23
          </div>
          <div
            className={
              'w-full max-w-32 rounded-full border-2 px-2 text-center ' +
              styleJenisPrestasi()
            }
          >
            {data.jenisPrestasi.charAt(0).toUpperCase() +
              data.jenisPrestasi.slice(1).toLowerCase()}
          </div>
        </div>
        <div className="lg:mb-6">{data.deskripsi}</div>
        <div className="self-end pt-2 text-[#666666] lg:absolute lg:bottom-2 lg:self-start">
          {data.bulan}/{data.tahun}
        </div>
      </div>
    </div>
  );
};

export default CardHistory;
