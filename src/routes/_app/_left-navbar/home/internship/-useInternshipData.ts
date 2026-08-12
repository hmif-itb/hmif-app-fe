import { useQuery } from '@tanstack/react-query';
import { api } from '~/api/client';

export function useInternshipDepartments() {
  return useQuery({
    queryKey: ['internship', 'departments'],
    queryFn: () => api.internship.getInternshipDepartments(),
  });
}

export function useMyInternshipSubmission() {
  return useQuery({
    queryKey: ['internship', 'my-submission'],
    queryFn: () => api.internship.getMyInternshipSubmission(),
  });
}
