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

const SUBMISSIONS_PAGE_SIZE = 20;

async function fetchAllInternshipSubmissions(locked?: 'true' | 'false') {
  const all = [];
  let offset = 0;
  for (;;) {
    const { submissions } = await api.internship.listInternshipSubmissions({
      offset,
      locked,
    });
    all.push(...submissions);
    if (submissions.length < SUBMISSIONS_PAGE_SIZE) break;
    offset += SUBMISSIONS_PAGE_SIZE;
  }
  return all;
}

export function useAllInternshipSubmissions(
  locked: 'all' | 'true' | 'false',
  enabled = true,
) {
  return useQuery({
    queryKey: ['internship', 'admin', 'all-submissions', locked],
    queryFn: () =>
      fetchAllInternshipSubmissions(locked === 'all' ? undefined : locked),
    enabled,
  });
}
