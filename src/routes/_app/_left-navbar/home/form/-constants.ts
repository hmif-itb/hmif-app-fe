import { FormQuestion, FormSection } from '~/api/generated';

export type AnswerValue = string | string[];
export type AnswersRecord = Record<string, AnswerValue>;

export function isQuestionRequired(
  question: FormQuestion,
  answers: AnswersRecord,
): boolean {
  if (!question.dependsOn) return true;
  const dependsAnswer = answers[question.dependsOn.questionId];
  if (Array.isArray(dependsAnswer)) {
    return dependsAnswer.includes(question.dependsOn.value);
  }
  return dependsAnswer === question.dependsOn.value;
}

export function isQuestionAnswered(
  question: FormQuestion,
  answers: AnswersRecord,
): boolean {
  const value = answers[question.id];
  if (value === undefined) return false;
  return Array.isArray(value) ? value.length > 0 : value.trim() !== '';
}

export function isSectionComplete(
  section: FormSection,
  answers: AnswersRecord,
): boolean {
  return section.questions.every(
    (q) => !isQuestionRequired(q, answers) || isQuestionAnswered(q, answers),
  );
}

export function findFirstIncompleteSection(
  sections: FormSection[],
  answers: AnswersRecord,
): number {
  const idx = sections.findIndex((s) => !isSectionComplete(s, answers));
  return idx === -1 ? 0 : idx;
}

export function countAnsweredQuestions(
  sections: FormSection[],
  answers: AnswersRecord,
): { answered: number; total: number } {
  const requiredQuestions = sections.flatMap((s) =>
    s.questions.filter((q) => isQuestionRequired(q, answers)),
  );
  const answered = requiredQuestions.filter((q) =>
    isQuestionAnswered(q, answers),
  ).length;
  return { answered, total: requiredQuestions.length };
}

export function answersToFormAnswers(answers: AnswersRecord) {
  return Object.entries(answers).map(([questionId, answer]) => ({
    questionId,
    answer,
  }));
}

export function formAnswersToAnswers(
  formAnswers: { questionId: string; answer: AnswerValue }[],
): AnswersRecord {
  const record: AnswersRecord = {};
  for (const { questionId, answer } of formAnswers) {
    record[questionId] = answer;
  }
  return record;
}
