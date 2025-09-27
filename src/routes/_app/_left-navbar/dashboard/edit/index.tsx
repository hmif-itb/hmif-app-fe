import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { ChevronLeft } from 'lucide-react';
import { FormCard } from './-components/FormCard';

export const Route = createFileRoute('/_app/_left-navbar/dashboard/edit/')({
  component: EditPrestasiPage,
});

function EditPrestasiPage() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-[#2F754A] lg:overflow-hidden">
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
          alt="ss"
          className="absolute right-0 z-10 mt-12 lg:hidden"
        />
      </div>

      <div className="relative z-40 lg:p-4">
        <div className="mb-8 flex items-center gap-4 p-2  lg:relative lg:-left-4">
          <button
            onClick={() => navigate({ to: '/dashboard' })}
            className="text-white transition-colors hover:text-yellow-200"
          >
            <ChevronLeft className="hidden lg:block" size={54} />
            <ChevronLeft size={24} className="block lg:hidden" />
          </button>
          <h1 className="p-4 text-2xl  text-white lg:text-5xl">
            <span className="font-bold ">Edit Entri</span> {''}
            <span className="italic">Prestasi</span>
          </h1>
        </div>

        <div className="  mx-auto">
          <FormCard />
        </div>
      </div>
    </div>
  );
}
