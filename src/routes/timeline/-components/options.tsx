import { RadioGroupItem } from '~/components/ui/radio-group';
import { Separator } from '~/components/ui/separator';

export default function Options({
  header,
  choices,
}: {
  header: string;
  choices: string[];
}) {
  return (
    <div className="my-5">
      <h1 className="text-[16px] font-semibold">{header}</h1>
      <Separator className="mb-3 mt-1" />
      <div className="flex gap-5">
        {choices.map((choice) => (
          <div className="flex items-center space-x-2 rounded-[265.71px] border border-green-950 px-3 py-1">
            <RadioGroupItem value={choice} id={choice} />
            <label htmlFor={choice} className="font-medium">
              {choice}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
