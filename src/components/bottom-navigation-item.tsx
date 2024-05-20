function BottomNavigationItem({
  src,
  alt,
  title,
  isSelected,
  onClick,
}: {
  src: string;
  alt: string;
  title: string;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className="flex flex-col text-center gap-3"
      onClick={() => onClick()}
    >
      <div
        className={`border border-black border-solid rounded-full size-[4.5625rem] flex flex-col items-center justify-center ${isSelected ? 'bg-yellow-75 border-green-300' : ''}`}
      >
        <img
          src={src}
          alt={alt}
          className={`size-[2.625rem] ${isSelected ? '[filter:invert(26%)_sepia(14%)_saturate(1090%)_hue-rotate(82deg)_brightness(98%)_contrast(92%)]' : ''}`}
        />
        <p
          className={`text-[0.625rem] ${isSelected ? 'font-bold text-green-300' : ''}`}
        >
          {title}
        </p>
      </div>
    </button>
  );
}

export default BottomNavigationItem;
