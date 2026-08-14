import {
  InternshipDivision,
  InternshipSubmission,
  InternshipSubmissionChoice,
} from '~/api/generated';
import { downloadCsv, rowsToCsv } from '~/lib/csv';

type DivisionInfo = {
  id: string;
  name: string;
  departmentName: string;
};

const PRIORITY_OPTIONS = [1, 2, 3, 4] as const;

function formatChoiceAnswers(
  choice: InternshipSubmissionChoice,
  division: InternshipDivision | undefined,
): string {
  if (!division) return '';
  return (division.questions ?? [])
    .map((q) => {
      const answer = choice.answers.find((a) => a.questionId === q.id);
      return `${q.label}: ${answer?.answer || '-'}`;
    })
    .join(' | ');
}

export function exportSubmissionsToCsv(
  submissions: InternshipSubmission[],
  divisions: DivisionInfo[],
  divisionsById: Map<string, InternshipDivision>,
): void {
  const divisionInfoById = new Map(divisions.map((d) => [d.id, d]));

  const headers = [
    'Nama',
    'NIM',
    'Jurusan',
    'Kelas',
    'ID Line',
    'Status',
    'Pengalaman Organisasi',
    'Kesibukan',
    ...PRIORITY_OPTIONS.flatMap((p) => [
      `Divisi Pilihan ${p}`,
      `Jawaban Pilihan ${p}`,
    ]),
  ];

  const rows = submissions.map((sub) => {
    const kesibukan = (sub.kesibukan ?? [])
      .map((k) => `${k.jabatan} - ${k.organisasi} (${k.periode})`)
      .join('; ');

    const priorityCells = PRIORITY_OPTIONS.flatMap((p) => {
      const choice = sub.choices?.find((c) => c.priorityOrder === p);
      if (!choice) return ['', ''];
      const divisionInfo = divisionInfoById.get(choice.divisionId);
      const division = divisionsById.get(choice.divisionId);
      const divisionLabel = divisionInfo
        ? `${divisionInfo.departmentName} - ${divisionInfo.name}`
        : '-';
      return [divisionLabel, formatChoiceAnswers(choice, division)];
    });

    return [
      sub.fullName,
      sub.nim,
      sub.jurusan,
      sub.kelas,
      sub.idLine,
      sub.isLocked ? 'Terkunci' : 'Draft',
      sub.pengalamanOrganisasi ?? '',
      kesibukan,
      ...priorityCells,
    ];
  });

  const csv = rowsToCsv(headers, rows);
  const timestamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-');
  downloadCsv(`internship-submissions-${timestamp}.csv`, csv);
}
