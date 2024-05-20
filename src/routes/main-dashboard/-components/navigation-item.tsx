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
    <div className="flex flex-col items-center gap-3 text-center">
      <button className="flex size-[4.5rem] flex-col items-center justify-center rounded-full border border-solid border-black">
        <img src={src} alt={alt} className="size-[2.625rem]" />
      </button>
      <p>{title}</p>
    </div>
  );
}

export default NavigationItem;
