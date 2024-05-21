import { Navigate } from '@tanstack/react-router';
import { ReactNode } from 'react';
import useSession from '~/hooks/auth/useSession';

export default function LoginLayout({ children }: { children?: ReactNode }) {
  const session = useSession(false);

  if (session) {
    return <Navigate to="/main-dashboard" />;
  }

  return (
    <main className="h-screen w-full overflow-hidden bg-[url(/images/login/login-bg.jpg)] bg-cover font-inter lg:flex lg:bg-none">
      <aside className="hidden h-full w-[65%] bg-[url(/images/login/login-bg-desktop.jpg)] bg-cover lg:block" />
      <section className="flex h-full flex-auto flex-col justify-between px-10 pb-[95px] pt-[112px] lg:px-14">
        {children}
      </section>
    </main>
  );
}
