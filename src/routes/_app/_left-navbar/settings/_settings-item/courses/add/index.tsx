import { useMutation } from '@tanstack/react-query';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { api } from '~/api/client';
import { Button } from '~/components/ui/button';
import { useUserAcademic } from '~/hooks/useUserAcademic';
import CardList from './-components/cardlist';
import CourseSearchBar from './-components/coursesearchbar';

export const Route = createFileRoute(
  '/_app/_left-navbar/settings/_settings-item/courses/add/',
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
  const [search, setSearch] = useState('');
  const { userAcademic } = useUserAcademic();

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
        <h2 className="text-heading-md font-bold text-white antialiased">
          Add Courses
        </h2>
        <p className="text-sm text-[#D4D6D4]">
          {userAcademic?.semester ? `SEMESTER ${userAcademic.semester}` : ''}
        </p>
      </div>

      <div className="flex flex-1 flex-col gap-6">
        {/* Search Bar Section */}
        <CourseSearchBar onSearchChange={setSearch} />
        {/* Course Card Section */}
        <CardList search={search} />
      </div>

      {/* Buttons Section */}
      <section className="sticky -bottom-8 -mx-4 -mb-6 flex justify-between gap-3 bg-[#30764B] px-8 py-4 lg:-bottom-6">
        <Button
          variant="outlined"
          className="flex-1 border-2 border-[#E8C55F] font-medium text-[#E8C55F]"
          onClick={() => {
            router.history.back();
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
