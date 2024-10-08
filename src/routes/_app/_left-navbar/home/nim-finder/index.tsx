import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useRef, useState } from 'react';
import { api } from '~/api/client';
import SearchIcon from '~/assets/icons/textfield/search.svg';
import HeaderTitle from '~/components/header-title';
import { TextField } from '~/components/ui/textfield';
import UserInfo from '~/components/user/user-info';
import { DEBOUNCE_TIME } from '~/lib/constants';

export const Route = createFileRoute('/_app/_left-navbar/home/nim-finder/')({
  component: NimFinderPage,
});

function NimFinderPage() {
  const timeoutRef = useRef<number | null>(null);

  const [search, setSearch] = useState<string>('');

  const { data: searchResult } = useQuery({
    queryKey: ['nim', search],
    queryFn: () => api.userFinder.getUser({ search }),
    enabled: search.length > 2,
  });

  return (
    <div className="flex size-full h-screen flex-col overflow-hidden">
      <div className="hidden w-full bg-white lg:block">
        <HeaderTitle />
      </div>

      <main className="flex size-full max-h-screen flex-col items-center gap-3 overflow-hidden bg-[url(/img/login/login-bg.jpg)] px-5 md:bg-[url(/img/login/login-bg-desktop.jpg)] lg:px-[52px]">
        <h1 className="mb-3 mt-[50px] text-4xl italic text-white">
          <span className="font-bold not-italic">NIM</span> Finder
        </h1>

        <TextField
          type="text"
          placeholder="Ketik nama atau NIM"
          onChange={(e) => {
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
            }
            setTimeout(() => setSearch(e.target.value), DEBOUNCE_TIME);
          }}
          className="h-12 w-full rounded-lg font-semibold"
          name="search"
        >
          <img src={SearchIcon} className="size-4" />
        </TextField>

        <p className="text-center text-body-lg text-white">
          {searchResult && `Menampilkan ${searchResult.length} hasil`}
        </p>

        <ul className="flex w-full flex-col gap-3 overflow-auto pb-28 lg:pb-6">
          {searchResult?.map((user) => (
            <div className="flex w-full items-center justify-between rounded-lg bg-white p-3 lg:px-5">
              <UserInfo
                key={user.id}
                name={user.fullName}
                nameClassName="leading-tight text-body-md"
                email={
                  user.major === 'IF'
                    ? 'Teknik Informatika'
                    : 'Sistem dan Teknologi Informasi'
                }
                emailClassName="text-body-sm mt-1"
                imageURL={user.picture}
                avatarClassName="size-10"
              />
              <p className="self-end pl-1.5 text-xs text-muted-foreground lg:text-body-md">
                {user.nim}
              </p>
            </div>
          ))}
        </ul>
      </main>
    </div>
  );
}
