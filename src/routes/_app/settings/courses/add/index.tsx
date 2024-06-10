import { createFileRoute, useRouter } from '@tanstack/react-router';
import { Button } from '~/components/ui/button';
import Profile from '../-components/Profile';
import CardList from './-components/cardlist';
import CourseSearchBar from './-components/coursesearchbar';

export const Route = createFileRoute('/_app/settings/courses/add/')({
  component: AddCourse,
});

function AddCourse() {
  const router = useRouter();
  return (
    <div className="flex h-full flex-col gap-8 font-inter">
      {/* Profile Section */}
      <Profile className="lg:hidden" />

      {/* Courses Section */}
      <section className="flex w-full max-w-screen-md flex-1 flex-col gap-9 rounded-t-2xl bg-[url('/images/courses/gradient.png')] bg-cover bg-no-repeat px-4 py-12">
        {/* Title Section */}
        <div className="flex items-center justify-between text-neutral-light">
          <h2 className="text-3xl font-bold">Add Courses</h2>
          <h4 className="text-sm font-medium">Semester 4</h4>
        </div>

        <div className="flex flex-1 flex-col gap-6">
          {/* Search Bar Section */}
          <CourseSearchBar />
          {/* Course Card Section */}
          <CardList />
        </div>

        {/* Buttons Section */}
        <section className="flex justify-between gap-3">
          <Button
            variant="outlined"
            className="flex-1 border-2 border-[#E8C55F] font-medium text-[#E8C55F]"
            onClick={() => {
              router.history.back();
            }}
          >
            Cancel
          </Button>
          <Button className="flex-1 bg-[#E8C55F] font-medium text-[#30764B]">
            Add
          </Button>
        </section>
      </section>
    </div>
  );
}
