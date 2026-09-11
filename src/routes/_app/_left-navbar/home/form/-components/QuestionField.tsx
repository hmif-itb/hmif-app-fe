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
};

export default function QuestionField(props: Readonly<ComponentProps>) {
  const { question, value, onChange, error, disabled } = props;

  return (
    <div className="flex w-full flex-col gap-2 break-words">
      <Label className="break-words text-sm">
        {question.label}
        <span className="text-red-500"> *</span>
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

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
