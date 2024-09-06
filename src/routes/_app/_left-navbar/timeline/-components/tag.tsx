import { InfoTag } from '~/lib/info';
import { cn } from '~/lib/utils';

function Tag({ tag }: { tag: InfoTag }) {
  return (
    <div
      className={cn(
        'inline-block rounded-full px-3 py-0.5 text-sm font-medium leading-6',
        tag.type === 'CATEGORY' && 'bg-neutral-normal',
        tag.type === 'ANGKATAN' && 'bg-blue-100',
        tag.type === 'GROUP' && 'bg-yellow-100',
      )}
    >
      {tag.text}
    </div>
  );
}

export default Tag;
