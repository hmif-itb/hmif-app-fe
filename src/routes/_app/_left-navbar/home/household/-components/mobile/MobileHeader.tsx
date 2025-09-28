interface MobileHeaderProps {
  isAdmin: boolean;
}

function MobileHeader({ isAdmin }: MobileHeaderProps) {
  return (
    <div className="flex flex-col gap-1 text-[#305138]">
      <span className="text-[36px] font-bold leading-tight">Dashboard</span>
      <span className="text-[36px] font-bold leading-tight">
        Peminjaman {isAdmin ? 'Admin' : 'Warga'}
      </span>
    </div>
  );
}

export default MobileHeader;
