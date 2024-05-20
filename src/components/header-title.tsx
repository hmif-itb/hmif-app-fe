import React from 'react';

function HeaderTitle() {
  return (
    <section className="flex w-full justify-end border-b border-gray-300 px-4 py-6">
      <div className="flex items-center gap-12">
        <h1>Himpunan Mahasiswa Informatika ITB</h1>
        <img src="/logo/hmif.png" alt="Logo" className="w-10" />
      </div>
    </section>
  );
}

export default HeaderTitle;
