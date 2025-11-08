import * as Avatar from '@radix-ui/react-avatar';

type IdentityCardProps = {
  data: {
    nama: string;
    avatar: string;
    jurusan: string;
    tahun: string;
    kampus: string;
  };
};

export const IdentityCard = ({ data }: IdentityCardProps) => {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-[#2F754A] p-4 lg:w-[26.25rem] lg:gap-6 lg:p-5">
      <Avatar.Root className="flex size-12 items-center justify-center rounded-full bg-[#E8C55F] lg:size-14">
        <Avatar.Fallback className="font-inter text-base font-medium text-white lg:text-lg">
          {data.avatar}
        </Avatar.Fallback>
      </Avatar.Root>

      <div className="flex-1">
        <h3 className="font-inter text-base font-semibold text-white lg:text-lg">
          {data.nama}
        </h3>
        <p className="font-inter text-sm text-white/90 lg:text-base">
          {data.jurusan} {data.tahun} - {data.kampus}
        </p>
      </div>
    </div>
  );
};
