import { createFileRoute } from '@tanstack/react-router';
import Profile from '~/components/profile';
import { Button } from '~/components/ui/button';
import CardList from './-components/cardlist';
import CourseSearchBar from './-components/coursesearchbar';

export const Route = createFileRoute('/_app/course/add/')({
  component: AddCourse,
});

function AddCourse() {
  return (
    <div className="flex h-full flex-col gap-8 font-inter">
      {/* Profile Section */}
      <Profile />

      {/* Courses Section */}
      <section className="flex w-full max-w-screen-md flex-1 flex-col gap-9 rounded-t-2xl bg-green-800 px-8 py-12">
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
          <Button className="w-full border-2 border-yellow-200 bg-green-800 font-semibold text-yellow-200">
            Cancel
          </Button>
          <Button className="w-full border-2 border-yellow-200 bg-yellow-200 font-semibold text-green-800">
            Add
          </Button>
        </section>
      </section>
    </div>
  );
}
