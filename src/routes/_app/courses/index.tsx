import { createFileRoute } from "@tanstack/react-router";
import MyCourses from "./-components/MyCourses";
import Profile from "./-components/Profile";

function Courses() {
  return (
    <div className="pt-3 flex flex-col gap-3 h-[100vh]">
      <Profile />
      <MyCourses />
    </div>
  );
}

export const Route = createFileRoute('/_app/courses/')({
  component: Courses,
});
