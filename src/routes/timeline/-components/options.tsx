import { RadioGroupItem } from '~/components/ui/radio-group';
import { Label } from '@radix-ui/react-label';
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
      <h1>{header}</h1>
      <Separator className="mt-1 mb-3" />
      <div className="flex gap-5">
        {choices.map((choice) => (
          <div className="flex items-center space-x-2 border px-3 py-2 rounded-[265.71px] border-green-950">
            <RadioGroupItem value={choice} id={choice} />
            <Label htmlFor={choice}>{choice}</Label>
          </div>
        ))}
      </div>
    </div>
  );
}
