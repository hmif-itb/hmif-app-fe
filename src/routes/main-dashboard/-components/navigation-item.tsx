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
    <div className="flex flex-col text-center gap-3">
      <div className="border border-black border-solid rounded-full size-[4.5rem] flex flex-col items-center justify-center">
        <img src={src} alt={alt} className="size-[2.625rem]" />
      </div>
      <p>{title}</p>
    </div>
  );
}

export default NavigationItem;
