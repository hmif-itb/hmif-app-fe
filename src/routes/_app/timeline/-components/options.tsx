import { Label } from '~/components/ui/label';
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';
import { Separator } from '~/components/ui/separator';

export default function Options({
  header,
  choices,
}: {
  header: string;
  choices: string[];
}) {
  if (choices.length < 2) {
    return <div></div>;
  }

  return (
    <div className="my-5">
      <h1 className="text-base font-semibold">{header}</h1>
      <Separator className="mb-3 mt-1 bg-gray-500" />
      <RadioGroup defaultValue="himpunan">
        <div className="flex gap-4">
          {choices.map((choice, idx) => (
            <div
              key={idx}
              className="flex items-center space-x-2 rounded-[265.71px] border border-green-950 py-1 pl-2 pr-3"
            >
              <RadioGroupItem className="shrink-0" value={choice} id={choice} />
              <Label htmlFor={choice} className="z-50 text-sm font-medium">
                {choice}
              </Label>
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}
