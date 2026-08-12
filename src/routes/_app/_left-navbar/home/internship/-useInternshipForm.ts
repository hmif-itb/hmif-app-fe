import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { api, queryClient } from '~/api/client';
import { InternshipSubmission } from '~/api/generated';
import {
  EMPTY_FORM_VALUES,
  InternshipFormValues,
  internshipFormSchema,
} from './-constants';

const TOAST_ID = 'internship-submission-toast';

function submissionToFormValues(
  submission: InternshipSubmission | null | undefined,
): InternshipFormValues {
  if (!submission) return EMPTY_FORM_VALUES;

  return {
    kelas: submission.kelas,
    idLine: submission.idLine,
    pengalamanOrganisasi: submission.pengalamanOrganisasi ?? '',
    kesibukan: submission.kesibukan,
    choices: (submission.choices ?? [])
      .slice()
      .sort((a, b) => a.priorityOrder - b.priorityOrder)
      .map((c) => ({
        divisionId: c.divisionId,
        priorityOrder: c.priorityOrder,
        answers: c.answers,
      })),
  };
}

export default function useInternshipForm(
  submission: InternshipSubmission | null | undefined,
) {
  const form = useForm<InternshipFormValues>({
    resolver: zodResolver(internshipFormSchema),
    defaultValues: EMPTY_FORM_VALUES,
  });

  useEffect(() => {
    if (submission) {
      form.reset(submissionToFormValues(submission));
    }
  }, [submission?.id]);

  const invalidate = () =>
    queryClient.invalidateQueries({
      queryKey: ['internship', 'my-submission'],
    });

  const saveDraft = useMutation({
    mutationFn: (values: InternshipFormValues) =>
      api.internship.upsertMyInternshipSubmission({ requestBody: values }),
    onSuccess: () => {
      toast.success('Draft tersimpan', { id: TOAST_ID });
      invalidate();
    },
    onError: () => toast.error('Gagal menyimpan draft', { id: TOAST_ID }),
  });

  const submitFinal = useMutation({
    mutationFn: (values: InternshipFormValues) =>
      api.internship.submitMyInternshipSubmission({ requestBody: values }),
    onSuccess: () => {
      toast.success('Pilihan magang berhasil dikirim!', { id: TOAST_ID });
      invalidate();
    },
    onError: () =>
      toast.error('Gagal mengirim pilihan magang', { id: TOAST_ID }),
  });

  return { form, saveDraft, submitFinal };
}
