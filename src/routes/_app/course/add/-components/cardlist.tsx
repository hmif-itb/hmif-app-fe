import CourseCard from './coursecard';

export default function CardList() {
  return (
    <div className="no-scrollbar flex h-[704px] flex-col gap-4 overflow-y-auto rounded-lg">
      <CourseCard />
      <CourseCard />
      <CourseCard />
    </div>
  );
}
