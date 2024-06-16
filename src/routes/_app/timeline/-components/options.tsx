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
      <h1 className="text-base font-semibold">{header}</h1>
      <Separator className="mb-3 mt-1 bg-gray-500" />
      <div className="flex gap-5">
        {choices.map((choice, idx) => (
          <div
            key={idx}
            className="flex w-32 items-center space-x-2 rounded-[265.71px] border border-green-950 px-3 py-1"
          >
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
