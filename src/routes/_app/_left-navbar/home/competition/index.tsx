import { useInfiniteQuery } from '@tanstack/react-query';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { ChevronLeft } from 'lucide-react';
import { useRef, useState } from 'react';
import { InView } from 'react-intersection-observer';
import { api } from '~/api/client';
import PlusCircle from '~/assets/icons/competition/plus-circle.svg';
import PlusIcon from '~/assets/icons/plus.svg';
import { Button } from '~/components/ui/button';
import useSession from '~/hooks/auth/useSession';
import { isInRoles } from '~/lib/roles';
import AddCompetitionDialog from './-components/AddCompetitionDialog';
import { AddCompetitionDrawer } from './-components/AddCompetitionDrawer';
import CompetitionCard from './-components/CompetitionCard';

export const Route = createFileRoute('/_app/_left-navbar/home/competition/')({
  component: CompetitionPage,
});
function CompetitionPage() {
  const PAGE_SIZE = 0;

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const constraintRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const user = useSession();

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
    <div
      ref={constraintRef}
      className="flex size-full h-screen flex-col overflow-hidden bg-green-50"
    >
      <div className="relative mx-auto flex max-h-screen w-full flex-col items-center lg:max-w-screen-lg lg:px-8">
        <Button
          variant="link"
          className="my-6 hidden w-full justify-start gap-8 p-0 text-3xl font-medium lg:flex"
          onClick={() => {
            router.history.back();
          }}
        >
          <ChevronLeft className="size-8" />
          <span>Back</span>
        </Button>

        <main className="flex max-h-screen w-full flex-col items-center gap-3 overflow-hidden bg-[url(/img/login/login-bg.jpg)] bg-no-repeat px-8 md:bg-[url(/img/login/login-bg-desktop.jpg)] lg:max-w-screen-lg lg:rounded-t-2xl lg:px-[82px]">
          <AddCompetitionDialog
            isOpen={dialogOpen}
            setOpen={setDialogOpen}
            constraintRef={constraintRef}
          />

          <div className="mt-[50px] flex w-full items-center justify-between lg:mt-8">
            <h1 className="text-left text-4xl font-bold text-white lg:text-5xl">
              Competition
            </h1>
            {isInRoles(user, ['cnc']) && (
              <Button
                onClick={() => setDialogOpen(true)}
                className="hidden bg-yellow-300 px-3 py-2 text-xs lg:flex"
              >
                Add New Competition
                <img src={PlusCircle} className="size-4" alt="" />
              </Button>
            )}
          </div>

          <ul className="flex flex-col gap-4 overflow-auto pb-28 pt-6 lg:grid lg:grid-cols-2 lg:gap-10 lg:px-4 lg:pb-6 lg:pt-3">
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
    </div>
  );
}
