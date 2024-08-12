import HeaderTitle from '~/components/header-title';
import Sidebar from './sidebar';

export default function DesktopView() {
  return (
    <div className="hidden size-full max-h-full flex-col overflow-hidden lg:flex">
      <HeaderTitle />
      <Sidebar />
    </div>
  );
}
