type ComponentProps = {
  title: string;
  content: string;
};

export default function TestiContent({
  title,
  content,
}: ComponentProps): JSX.Element {
  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-sm font-bold">{title}</h2>
      <p className="text-justify text-sm">{content}</p>
    </div>
  );
}
