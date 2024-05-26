function Tag({ tag }: { tag: string }) {
  return (
    <div className="inline-block rounded-full bg-neutral-normal px-4 py-1 text-base font-medium leading-6">
      {tag}
    </div>
  );
}

export default Tag;
