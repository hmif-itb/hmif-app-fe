import dayjs from 'dayjs';
import { AdminFormResponseItem, FormSection } from '~/api/generated';
import { downloadCsv, rowsToCsv } from '~/lib/csv';

export function exportFormResponsesToCsv(
  formTitle: string,
  sections: FormSection[],
  responses: AdminFormResponseItem[],
): void {
  const questions = sections.flatMap((s) => s.questions);

  const headers = [
    'No',
    'NIM',
    'Nama',
    'Jurusan',
    'Angkatan',
    ...questions.map((q) => q.label),
    'Waktu Submit',
  ];

  const rows = responses.map((response, idx) => {
    const answerCells = questions.map((q) => {
      const answer = response.answers.find(
        (a) => a.questionId === q.id,
      )?.answer;
      if (answer === undefined) return '';
      return Array.isArray(answer) ? answer.join('; ') : answer;
    });

    return [
      idx + 1,
      response.nim,
      response.fullName,
      response.major,
      response.angkatan,
      ...answerCells,
      dayjs(response.submittedAt).format('DD-MM-YYYY HH:mm'),
    ];
  });

  const csv = rowsToCsv(headers, rows);
  const timestamp = dayjs().format('YYYY-MM-DD-HHmmss');
  const safeTitle = formTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  downloadCsv(`${safeTitle}-responses-${timestamp}.csv`, csv);
}
