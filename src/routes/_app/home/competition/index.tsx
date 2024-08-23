import { createFileRoute } from '@tanstack/react-router';
import HeaderTitle from '~/components/header-title';
import CompetitionCard from './-components/CompetitionCard';

export const Route = createFileRoute('/_app/home/competition/')({
  component: CompetitionPage,
});

const dummyCards = [
  {
    title: 'IT Today 2024',
    organizer: 'HIMALKOM IPB',
    categories: ['UI/UX', 'CTF'],
    startDate: new Date(),
    endDate: new Date(),
    link: 'https://ittoday.web.id/',
    entranceFee: 999999,
  },
  {
    title: 'IT Today 2024',
    organizer: 'HIMALKOM IPB',
    categories: ['UI/UX', 'CTF'],
    startDate: new Date(),
    endDate: new Date(),
    link: 'https://ittoday.web.id/',
    imageURL:
      'https://plus.unsplash.com/premium_photo-1680087014917-904bb37c5191?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZnJlZXxlbnwwfHwwfHx8MA%3D%3D',
  },
];

function CompetitionPage() {
  return (
    <div className="flex size-full h-screen flex-col overflow-hidden">
      <div className="hidden w-full bg-white lg:block">
        <HeaderTitle />
      </div>

      <main className="flex size-full max-h-screen flex-col items-center gap-3 overflow-hidden bg-[url(/img/login/login-bg.jpg)] px-8 md:bg-[url(/img/login/login-bg-desktop.jpg)] lg:px-[52px]">
        <h1 className="mt-[50px] w-full text-left text-4xl font-bold text-white">
          Competitions
        </h1>

        <ul className="flex flex-col gap-4 overflow-auto pb-16 pt-6">
          {dummyCards.map((d, idx) => (
            <li key={idx}>
              <CompetitionCard {...d} />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
