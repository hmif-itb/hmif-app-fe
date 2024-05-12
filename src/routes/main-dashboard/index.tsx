import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { api } from '~/api/client';
import NavigationItem from './-components/navigation-item';
import dates from './-dummy/dates';
import { Dot } from 'lucide-react';
import { Separator } from '~/components/ui/separator';
import infos from './-dummy/info';
import BottomNavigationItem from './-components/bottom-navigation-item';
import Schedule from './-components/schedule';

function MainDashboard() {
  const usersQuery = useQuery({
    queryKey: ['me'],
    queryFn: () => api.auth.getMe(),
  });

  if (usersQuery.isFetching) {
    return <div>Loading...</div>;
  }

  const user = usersQuery.data;
  const currentDate = '21';
  const isSelected = true;

  if (!user || !infos) {
    return <div>Error</div>;
  }

  console.log(infos);

  return (
    <main className="font-inter flex flex-col gap-12 items-center">
      {/* Profile Section */}
      <section className="px-4 pt-4 flex justify-between items-center w-full">
        <div className="flex gap-4 items-center">
          <img
            src={user.picture}
            alt="User Profile"
            className="size-[3.3125rem] rounded-full"
          />

          <div>
            <p>Hi, {user.fullName}!</p>
            <p className="font-bold">Good Morning</p>
          </div>
        </div>
        <div className="bg-yellow-100 p-2 rounded-[18px] border border-black border-solid">
          <img src="/main-dashboard/bell.svg" alt="Bell" className="size-6" />
        </div>
      </section>

      {/* Top Navigation Section */}
      <section className="px-4 flex gap-4 justify-between max-w-[500px] w-full">
        <NavigationItem
          src="/main-dashboard/folder.svg"
          alt="Ding Dong"
          title="Ding Dong"
        />

        <NavigationItem
          src="/main-dashboard/calendar.svg"
          alt="Calendar"
          title="Calendar"
        />

        <NavigationItem
          src="/main-dashboard/camera.svg"
          alt="Tutor"
          title="Tutor"
        />

        <NavigationItem
          src="/main-dashboard/file.svg"
          alt="Bundel Soal"
          title="Bundel Soal"
        />
      </section>

      {/* Calendar Section */}
      <section className="px-4 flex justify-center">
        <div className="size-[316px] bg-green-300 rounded-lg"></div>
      </section>

      <Separator />

      {/* Date Section */}
      <section className="px-4 flex justify-between max-w-[500px] w-full">
        {dates.map((date) => {
          return (
            <div
              key={date.date}
              className={`flex flex-col items-center ${currentDate === date.date ? 'bg-yellow-100' : ''} py-2 px-3 sm:px-4 rounded-xl`}
            >
              <p>{date.date}</p>
              <p>{date.day}</p>
              {currentDate === date.date && <Dot className="text-green-300" />}
            </div>
          );
        })}
      </section>

      {/* Schedule Section */}
      <section className="px-6 flex flex-col gap-4 max-w-[500px] w-full">
        <p className="self-start font-semibold">Schedule Today</p>

        <div className="px-2 flex justify-between text-[#BCC1CD]">
          <div className="flex gap-8">
            <p>Time</p>
            <p>Agenda</p>
          </div>

          <div>
            <img
              src="/main-dashboard/filter.svg"
              alt="Filter"
              className="size-6"
            />
          </div>
        </div>

        {/* Schedule Cards */}
        <div className="flex flex-col">
          {infos.map((info, idx) => {
            return (
              <Schedule
                key={info.id}
                info={info}
                isLastIndex={idx === infos.length - 1}
              />
            );
          })}
        </div>
      </section>

      {/* Bottom Navigation Section */}
      <section className="px-8 pb-4 flex justify-between max-w-[400px] w-full">
        <BottomNavigationItem
          src="/main-dashboard/question-mark.svg"
          alt="Info"
          title="Info"
          isSelected={isSelected}
        />

        <BottomNavigationItem
          src="/main-dashboard/house.svg"
          alt="Home"
          title="Home"
          isSelected={!isSelected}
        />

        <BottomNavigationItem
          src="/main-dashboard/settings.svg"
          alt="Settings"
          title="Settings"
          isSelected={!isSelected}
        />
      </section>
    </main>
  );
}

export const Route = createFileRoute('/main-dashboard/')({
  component: MainDashboard,
});
