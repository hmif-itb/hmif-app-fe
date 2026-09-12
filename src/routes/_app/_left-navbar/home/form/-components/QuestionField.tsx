import { FormQuestion } from '~/api/generated';
import { CheckboxGroup } from '~/components/ui/checkbox';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';
import { Textarea } from '~/components/ui/textarea';
import { AnswerValue } from '../-constants';

type ComponentProps = {
  question: FormQuestion;
  value: AnswerValue | undefined;
  onChange: (value: AnswerValue) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
};

const RATING_OPTIONS = ['1', '2', '3', '4', '5'];

export default function QuestionField(props: Readonly<ComponentProps>) {
  const { question, value, onChange, error, disabled, required = true } = props;

  return (
    <div className="flex w-full flex-col gap-2 break-words">
      <Label className="break-words text-sm">
        {question.label}
        {required && <span className="text-red-500"> *</span>}
      </Label>

      {question.type === 'text' && (
        <Input
          value={(value as string) ?? ''}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
        />
      )}

      {question.type === 'textarea' && (
        <Textarea
          value={(value as string) ?? ''}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
        />
      )}

      {question.type === 'radio' && (
        <RadioGroup
          value={(value as string) ?? ''}
          onValueChange={onChange}
          disabled={disabled}
          className="gap-3"
        >
          {(question.options ?? []).map((option) => (
            <label
              key={option}
              className="flex items-start gap-2 break-words text-sm"
            >
              <RadioGroupItem value={option} className="mt-0.5 shrink-0" />
              <span className="break-words">{option}</span>
            </label>
          ))}
        </RadioGroup>
      )}

      {question.type === 'checkbox' && (
        <CheckboxGroup
          choices={question.options ?? []}
          selectedValues={Array.isArray(value) ? value : []}
          onChange={(checked) => onChange(checked)}
          className="w-full"
        />
      )}

      {question.type === 'rating' && (
        <RadioGroup
          value={(value as string) ?? ''}
          onValueChange={onChange}
          disabled={disabled}
          className="flex flex-row gap-4"
        >
          {RATING_OPTIONS.map((option) => (
            <label
              key={option}
              className="flex flex-col items-center gap-1 text-sm"
            >
              <RadioGroupItem value={option} className="size-6" />
              <span>{option}</span>
            </label>
          ))}
        </RadioGroup>
      )}

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
