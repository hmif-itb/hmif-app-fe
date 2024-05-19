import { ReactNode } from 'react';

export default function LoginLayout({ children }: { children?: ReactNode }) {
  return (
    <main className="h-screen w-full overflow-hidden bg-[url(/images/login/login-bg.png)] bg-cover font-inter lg:flex lg:bg-none">
      <aside className="hidden h-full w-[65%] bg-[url(/images/login/login-bg-desktop.png)] bg-cover lg:block" />
      <section className="flex h-full flex-auto flex-col justify-between px-10 pb-[95px] pt-[112px] lg:px-14">
        {children}
      </section>
    </main>
  );
}
