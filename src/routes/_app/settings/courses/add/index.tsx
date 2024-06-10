import { createFileRoute, useRouter } from '@tanstack/react-router';
import { Button } from '~/components/ui/button';
import CardList from './-components/cardlist';
import CourseSearchBar from './-components/coursesearchbar';

export const Route = createFileRoute('/_app/settings/courses/add/')({
  component: AddCourse,
});

function AddCourse() {
  const router = useRouter();
  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-[30px] font-bold text-white antialiased">
          Add Courses
        </h2>
        <p className="text-sm text-[#D4D6D4]">SEMESTER 4</p>
      </div>

      <div className="flex flex-1 flex-col gap-6">
        {/* Search Bar Section */}
        <CourseSearchBar />
        {/* Course Card Section */}
        <CardList />
      </div>

      {/* Buttons Section */}
      <section className="mt-4 flex justify-between gap-3">
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
    </>
  );
}
