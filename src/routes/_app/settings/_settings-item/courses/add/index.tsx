import { createFileRoute, useRouter } from '@tanstack/react-router';
import { Button } from '~/components/ui/button';
import CardList from './-components/cardlist';
import CourseSearchBar from './-components/coursesearchbar';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { useMutation } from '@tanstack/react-query';
import { api } from '~/api/client';

export const Route = createFileRoute(
  '/_app/settings/_settings-item/courses/add/',
)({
  component: AddCourse,
});

export interface TakeCourseBody {
  courseId: string;
  class: number;
}

export const CourseContext = createContext<{
  selectedCourses: TakeCourseBody[];
  setSelectedCourses: Dispatch<SetStateAction<TakeCourseBody[]>>;
}>({
  selectedCourses: [],
  setSelectedCourses: (() => {}) as Dispatch<SetStateAction<TakeCourseBody[]>>,
});

function AddCourse() {
  const [selectedCourses, setSelectedCourses] = useState<TakeCourseBody[]>([]);

  return (
    <CourseContext.Provider value={{ selectedCourses, setSelectedCourses }}>
      <AddCourseComponent />
    </CourseContext.Provider>
  );
}

function AddCourseComponent() {
  const router = useRouter();
  const { selectedCourses } = useContext(CourseContext);

  const addCourseMutation = useMutation({
    mutationFn: api.course.createOrUpdateBatchUserCourse.bind(api.course),
    onSuccess: () => {
      router.history.back();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  async function handleAddCourse() {
    addCourseMutation.mutate({ requestBody: selectedCourses });
  }

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
            router.navigate({ to: '/settings/courses' });
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleAddCourse}
          className="flex-1 bg-[#E8C55F] font-medium text-[#30764B]"
        >
          Add
        </Button>
      </section>
    </>
  );
}
