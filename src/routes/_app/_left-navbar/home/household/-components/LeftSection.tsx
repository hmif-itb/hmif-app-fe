import React from 'react';
import HouseholdCalendar from './Calendar';
import useSession from '~/hooks/auth/useSession';

function LeftSection() {
  const user = useSession();

  console.log(JSON.stringify(user));
  return (
    <div className="flex size-full flex-col gap-6">
      <h1 className="text-5xl font-bold text-white">
        Dashboard Peminjaman{' '}
        {user?.roles.includes('household') ? 'Admin' : 'Warga'}
      </h1>
      <div className="size-full overflow-hidden rounded-xl bg-white ">
        <HouseholdCalendar />
      </div>
    </div>
  );
}

export default LeftSection;
