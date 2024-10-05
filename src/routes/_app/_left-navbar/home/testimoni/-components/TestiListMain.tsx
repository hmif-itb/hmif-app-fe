import { Link, useParams } from '@tanstack/react-router';
import { useRef } from 'react';
import SearchIcon from '~/assets/icons/searchbar/search.svg';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { DEBOUNCE_TIME } from '~/lib/constants';

type ComponentProps = {
  children?: JSX.Element[];
  major?: string;
  linkFrom: string;
  onSearchChange?: (search: string) => void;
};

export default function TestiListMain({
  children,
  major,
  linkFrom,
  onSearchChange,
}: ComponentProps): JSX.Element {
  const { type } = useParams({ strict: false });
  const timeoutRef = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [majorName, semester] = major?.split(' / ') ?? [];
  const majorLink =
    majorName == 'IF' ? 'teknik-informatika' : 'sistem-dan-teknologi-informasi';
  const [_, semesterLink] = semester
    ? semester == 'Mata Kuliah Pilihan'
      ? ['', 'other']
      : semester.toLowerCase().split(' ')
    : ['', ''];

  return (
    <section className="flex-1 overflow-y-auto rounded-t-2xl bg-[url('/images/courses/gradient.png')] bg-cover bg-no-repeat px-4 pb-28 pt-10 lg:rounded-none lg:pb-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-[30px] font-bold text-white antialiased">
          Testimoni
        </h1>
        <div>
          <Link to={`/home/testimoni/${majorLink}`}>
            <p className="mr-2 inline-block cursor-pointer text-sm text-[#D4D6D4]">
              {majorName}
            </p>
          </Link>
          {semester && (
            <Link to={`/home/testimoni/${majorLink}/${semesterLink}`}>
              <p className="inline-block cursor-pointer text-sm text-[#D4D6D4]">
                / {semester}
              </p>
            </Link>
          )}
        </div>
      </div>

      <div className="flex w-full flex-col gap-8">
        {/* TODO: Update this searchbar */}
        {onSearchChange && (
          <form
            className="flex"
            onSubmit={(e) => {
              e.preventDefault();
              if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
              }
              onSearchChange(inputRef.current?.value ?? '');
            }}
          >
            <Input
              type="text"
              placeholder="Search..."
              onChange={(e) => {
                if (timeoutRef.current) {
                  clearTimeout(timeoutRef.current);
                }
                setTimeout(() => onSearchChange(e.target.value), DEBOUNCE_TIME);
              }}
              className="h-12 w-full rounded-l-lg rounded-r-none px-4 font-semibold"
              name="search"
              ref={inputRef}
            />
            <button className="flex size-12 rounded-r-lg bg-green-900">
              <img
                alt="Search Button"
                src={SearchIcon}
                className="m-auto size-5"
              />
            </button>
          </form>
        )}

        <ul className="flex w-full flex-col justify-between gap-4">
          {children}
        </ul>

        <Link
          from={linkFrom}
          to={type === 'mata-kuliah-umum' ? '/home/testimoni' : '..'}
        >
          <Button className="w-full bg-[#E8C55F] font-medium text-[#30764B]">
            Back
          </Button>
        </Link>
      </div>
    </section>
  );
}
