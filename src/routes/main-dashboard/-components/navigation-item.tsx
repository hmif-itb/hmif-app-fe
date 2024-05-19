function NavigationItem({
  src,
  alt,
  title,
}: {
  src: string;
  alt: string;
  title: string;
}) {
  return (
    <div className="flex flex-col items-center text-center gap-3">
      <button className="border border-black border-solid rounded-full size-[4.5rem] flex flex-col items-center justify-center">
        <img src={src} alt={alt} className="size-[2.625rem]" />
      </button>
      <p>{title}</p>
    </div>
  );
}

export default NavigationItem;
