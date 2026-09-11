import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '~/api/client';
import { FormResponse } from '~/api/generated';
import { AnswersRecord, answersToFormAnswers } from './-constants';

export function useFormsList() {
  return useQuery({
    queryKey: ['form', 'list'],
    queryFn: () => api.form.listForms(),
  });
}

export function useFormDetail(formId: string) {
  return useQuery({
    queryKey: ['form', formId],
    queryFn: () => api.form.getForm({ formId }),
  });
}

export function useMyFormResponse(formId: string) {
  return useQuery({
    queryKey: ['form', formId, 'my-response'],
    queryFn: async () => {
      const response = await api.form.getMyFormResponse({ formId });
      return (response ?? null) as FormResponse | null;
    },
  });
}

export function useSubmitFormResponse(formId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (answers: AnswersRecord) =>
      api.form.submitFormResponse({
        formId,
        requestBody: { answers: answersToFormAnswers(answers) },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['form', formId] });
      queryClient.invalidateQueries({ queryKey: ['form', 'list'] });
    },
  });
}
