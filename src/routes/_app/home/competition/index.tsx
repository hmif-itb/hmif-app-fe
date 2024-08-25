import { createFileRoute } from '@tanstack/react-router';
import HeaderTitle from '~/components/header-title';
import CompetitionCard from './-components/CompetitionCard';
import { Button } from '~/components/ui/button';
import PlusIcon from '~/assets/icons/plus.svg';
import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { api } from '~/api/client';
import { InView } from 'react-intersection-observer';
import { AddCompetitionDrawer } from './-components/AddCompetitionDrawer';

export const Route = createFileRoute('/_app/home/competition/')({
  component: CompetitionPage,
});
function CompetitionPage() {
  const PAGE_SIZE = 0;

  const [addCompetitionOpen, setAddCompetitionOpen] = useState(false);

  const {
    data: competitions,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['competitions'],
    queryFn: ({ pageParam }) =>
      api.competitions
        .getCompetitionList({
          offset: pageParam,
        })
        .then((res) =>
          res.competitions.map((c) => ({
            ...c,
            registrationStart: new Date(c.registrationStart),
            registrationDeadline: new Date(c.registrationDeadline),
            price: c.price ? +c.price : undefined,
            imageURL: c.medias?.[0].media.url,
          })),
        ),
    initialPageParam: 0,
    getNextPageParam: (_1, _2, lastOffset) => lastOffset + PAGE_SIZE,
  });

  const fetchWhenInView = () =>
    !isFetchingNextPage &&
    (competitions?.pages.flatMap((p) => p).length ?? 1) % PAGE_SIZE === 0 &&
    fetchNextPage();

  return (
    <div className="flex size-full h-screen flex-col overflow-hidden">
      <div className="hidden w-full bg-white lg:block">
        <HeaderTitle />
      </div>

      <main className="flex size-full max-h-screen flex-col items-center gap-3 overflow-hidden bg-[url(/img/login/login-bg.jpg)] px-8 md:bg-[url(/img/login/login-bg-desktop.jpg)] lg:px-[52px]">
        <h1 className="mt-[50px] w-full text-left text-4xl font-bold text-white">
          Competition
        </h1>

        <ul className="flex flex-col gap-4 overflow-auto pb-16 pt-6">
          {competitions?.pages
            .flatMap((c) => c)
            .map((competition, idx) =>
              idx < competitions?.pages.flatMap((c) => c).length - 2 ? (
                <li key={competition.id}>
                  <CompetitionCard {...competition} />
                </li>
              ) : (
                <InView
                  key={competition.id}
                  onChange={(inView) => inView && fetchWhenInView()}
                >
                  <CompetitionCard {...competition} />
                </InView>
              ),
            )}
        </ul>

        <Button
          onClick={() => setAddCompetitionOpen(true)}
          className="fixed bottom-24 right-5 z-20 rounded-full border border-green-300 bg-yellow-75 p-5"
        >
          <img src={PlusIcon} className="size-8" alt="" />
        </Button>

        <AddCompetitionDrawer
          isOpen={addCompetitionOpen}
          setOpen={setAddCompetitionOpen}
        />
      </main>
    </div>
  );
}
