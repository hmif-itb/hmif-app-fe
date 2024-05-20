import React from 'react';

function HeaderTitle() {
  return (
    <section className="flex justify-end w-full py-6 px-4 border-b border-gray-300">
      <div className="flex items-center gap-12">
        <h1>Himpunan Mahasiswa Informatika ITB</h1>
        <img src="/logo/hmif.png" alt="Logo" className="w-10" />
      </div>
    </section>
  );
}

export default HeaderTitle;
