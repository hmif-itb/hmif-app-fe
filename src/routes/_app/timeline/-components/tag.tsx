function Tag({ tag }: { tag: string }) {
  return (
    <div className="inline-block rounded-full bg-neutral-normal px-3 py-0.5 text-sm font-medium leading-6">
      {tag}
    </div>
  );
}

export default Tag;
