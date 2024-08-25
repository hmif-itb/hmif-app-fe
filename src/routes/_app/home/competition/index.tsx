import { createFileRoute } from '@tanstack/react-router';
import HeaderTitle from '~/components/header-title';
import CompetitionCard from './-components/CompetitionCard';
import { Button } from '~/components/ui/button';
import PlusIcon from '~/assets/icons/plus.svg';
import PlusCircle from '~/assets/icons/competition/plus-circle.svg';
import { useRef, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { api } from '~/api/client';
import { InView } from 'react-intersection-observer';
import { AddCompetitionDrawer } from './-components/AddCompetitionDrawer';
import AddCompetitionDialog from './-components/AddCompetitionDialog';

export const Route = createFileRoute('/_app/home/competition/')({
  component: CompetitionPage,
});
function CompetitionPage() {
  const PAGE_SIZE = 0;

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const constraintRef = useRef<HTMLElement>(null);

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
          sort: 'deadline',
          filter: 'active',
        })
        .then((res) =>
          res.competitions.map((c) => ({
            ...c,
            registrationStart: new Date(c.registrationStart),
            registrationDeadline: new Date(c.registrationDeadline),
            price: c.price ? +c.price : undefined,
            imageURL:
              (c.medias?.length || 0) >= 1
                ? c.medias?.[0].media.url
                : undefined,
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

      <main
        ref={constraintRef}
        className="relative flex size-full max-h-screen flex-col items-center gap-3 overflow-hidden bg-[url(/img/login/login-bg.jpg)] px-8 md:bg-[url(/img/login/login-bg-desktop.jpg)] lg:px-[52px]"
      >
        <AddCompetitionDialog
          isOpen={dialogOpen}
          setOpen={setDialogOpen}
          constraintRef={constraintRef}
        />

        <div className="mt-[50px] flex w-full items-center justify-between">
          <h1 className="text-left text-4xl font-bold text-white lg:text-5xl">
            Competition
          </h1>

          <Button
            onClick={() => setDialogOpen(true)}
            className="hidden bg-yellow-300 px-3 py-2 text-xs lg:flex"
          >
            Add New Competition
            <img src={PlusCircle} className="size-4" alt="" />
          </Button>
        </div>

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
          onClick={() => setDrawerOpen(true)}
          className="fixed bottom-24 right-5 z-20 rounded-full border border-green-300 bg-yellow-75 p-5 lg:hidden"
        >
          <img src={PlusIcon} className="size-8" alt="" />
        </Button>

        <AddCompetitionDrawer isOpen={drawerOpen} setOpen={setDrawerOpen} />
      </main>
    </div>
  );
}
