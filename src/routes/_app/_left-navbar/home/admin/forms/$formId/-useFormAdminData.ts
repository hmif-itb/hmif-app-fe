import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { api } from '~/api/client';

export function useFormResponsesCount(formId: string) {
  return useQuery({
    queryKey: ['form', 'admin', formId, 'count'],
    queryFn: () => api.form.getFormResponsesCount({ formId }),
  });
}

export function useFormResponsesList(
  formId: string,
  page: number,
  search: string,
) {
  return useQuery({
    queryKey: ['form', 'admin', formId, 'responses', page, search],
    queryFn: () =>
      api.form.listFormResponses({
        formId,
        page,
        limit: 20,
        search: search || undefined,
      }),
  });
}

const EXPORT_PAGE_SIZE = 100;

/** Fetches every page matching `search`, used for "export all" (not just the current page). */
export async function fetchAllFormResponses(formId: string, search: string) {
  const all = [];
  let page = 1;
  for (;;) {
    const { responses } = await api.form.listFormResponses({
      formId,
      page,
      limit: EXPORT_PAGE_SIZE,
      search: search || undefined,
    });
    all.push(...responses);
    if (responses.length < EXPORT_PAGE_SIZE) break;
    page += 1;
  }
  return all;
}

export function useFormAnalytics(formId: string) {
  return useQuery({
    queryKey: ['form', 'admin', formId, 'analytics'],
    queryFn: () => api.form.getFormAnalytics({ formId }),
  });
}

export type LiveResponseEvent = {
  total: number;
  nim: string;
  fullName: string;
  submittedAt: string;
};

/**
 * Connects to the `form-admin:{formId}` websocket room for realtime live
 * counting. The connection carries the httpOnly auth cookie automatically
 * (`withCredentials: true`) since the JWT can't be read from JS — the server
 * verifies the 'admin' role from that cookie before allowing the join.
 */
export function useFormLiveCounting(formId: string) {
  const queryClient = useQueryClient();
  const [latestEvents, setLatestEvents] = useState<LiveResponseEvent[]>([]);
  const [liveTotal, setLiveTotal] = useState<number | null>(null);

  useEffect(() => {
    const socket: Socket = io(import.meta.env.VITE_API_URL, {
      auth: { formAdminId: formId },
      withCredentials: true,
    });

    const handleNewResponse = (event: LiveResponseEvent) => {
      setLiveTotal(event.total);
      setLatestEvents((prev) => [event, ...prev].slice(0, 20));
      queryClient.invalidateQueries({
        queryKey: ['form', 'admin', formId, 'responses'],
      });
      queryClient.invalidateQueries({
        queryKey: ['form', 'admin', formId, 'count'],
      });
    };

    socket.on('form:new-response', handleNewResponse);

    return () => {
      socket.off('form:new-response', handleNewResponse);
      socket.disconnect();
    };
  }, [formId, queryClient]);

  return { latestEvents, liveTotal };
}
