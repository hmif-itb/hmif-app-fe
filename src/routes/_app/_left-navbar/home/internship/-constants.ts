import { z } from 'zod';
import { ELIGIBLE_SPARTA_ANGKATAN } from '~/lib/sparta';

export { ELIGIBLE_SPARTA_ANGKATAN };

export const MAX_DIVISION_CHOICES = 4;

export const kesibukanSchema = z.object({
  jabatan: z.string().min(1, 'Jabatan wajib diisi'),
  organisasi: z.string().min(1, 'Organisasi wajib diisi'),
  periode: z.string().min(1, 'Periode wajib diisi'),
});

export const answerSchema = z.object({
  questionId: z.string(),
  answer: z.string(),
});

export const choiceSchema = z.object({
  divisionId: z.string().min(1),
  priorityOrder: z.number().int().min(1),
  answers: z.array(answerSchema),
});

export const internshipFormSchema = z.object({
  kelas: z.string().min(1, 'Kelas wajib diisi'),
  idLine: z.string().min(1, 'ID Line wajib diisi'),
  pengalamanOrganisasi: z.string().optional(),
  kesibukan: z.array(kesibukanSchema),
  choices: z
    .array(choiceSchema)
    .length(
      MAX_DIVISION_CHOICES,
      `Wajib memilih ${MAX_DIVISION_CHOICES} divisi`,
    ),
});

export type InternshipFormValues = z.infer<typeof internshipFormSchema>;

export const EMPTY_FORM_VALUES: InternshipFormValues = {
  kelas: '',
  idLine: '',
  pengalamanOrganisasi: '',
  kesibukan: [],
  choices: [],
};
