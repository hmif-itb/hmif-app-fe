import { FilterProps } from '../-types';
import Filter from './filter';

export default function FilterContent(props: FilterProps) {
  return (
    <div className="lg:mx-10">
      <Filter {...props} />
    </div>
  );
}
