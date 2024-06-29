import { Link, useParams } from '@tanstack/react-router';
import SearchIcon from '~/assets/icons/searchbar/search.svg';
import { Button } from '~/components/ui/button';

type ComponentProps = {
  children?: JSX.Element[];
  major?: string;
  linkFrom: string;
};

export default function TestiListMain({
  children,
  major,
  linkFrom,
}: ComponentProps): JSX.Element {
  const { type } = useParams({ strict: false });

  return (
    <section className="flex-1 overflow-y-auto rounded-t-2xl bg-[url('/images/courses/gradient.png')] bg-cover bg-no-repeat px-4 py-10 lg:rounded-none">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-[30px] font-bold text-white antialiased">
          Testimoni
        </h1>
        <p className="text-sm text-[#D4D6D4]">{major}</p>
      </div>

      <div className="flex w-full flex-col gap-8">
        {/* TODO: Update this searchbar */}
        <div className="flex h-12 rounded-l-lg rounded-r-xl bg-neutral-light">
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-l-lg px-4 font-semibold"
            name=""
            id=""
          />
          <button className="flex size-12 rounded-lg bg-green-900">
            <img
              alt="Search Button"
              src={SearchIcon}
              className="m-auto size-5"
            />
          </button>
        </div>
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
