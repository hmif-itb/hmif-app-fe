import { createFileRoute } from '@tanstack/react-router';
import { Button } from '~/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from '@tanstack/react-router';
import LeftSection from './-components/LeftSection';
import RightSection from './-components/RightSection';

export const Route = createFileRoute('/_app/_left-navbar/home/household/')({
  component: HouseholdPage,
});

function HouseholdPage() {
  const router = useRouter();

  return (
    <div className="flex h-full flex-col px-10 pb-[60px]">
      {/* Back Button */}
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
      <main
        className="flex h-full justify-center gap-5 rounded-xl bg-[#30764B] px-[26px] py-[34px] "
        style={{
          backgroundImage: `url('/img/household/mask-left-top.png'), url('/img/household/mask-right-bottom.png')`,
          backgroundPosition: 'left top, right bottom',
          backgroundRepeat: 'no-repeat, no-repeat',
          backgroundSize: 'auto 1000px, auto 730px',
        }}
      >
        <LeftSection />
        <RightSection />
      </main>
    </div>
  );
}
