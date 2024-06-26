import { useRouter } from '@tanstack/react-router';

function Header() {
  const { history } = useRouter();
  return (
    <header className="flex items-center justify-between border-b border-gray-300 p-4 text-white">
      <button
        className="text-{black} flex items-center rounded px-3 py-1"
        onClick={() => {
          history.go(-1);
        }}
      >
        <img src="/img/icons/back.svg" />
      </button>
      <h1 className="flex-auto pr-9 text-center text-xl font-bold text-black">
        Post
      </h1>
    </header>
  );
}

export default Header;
