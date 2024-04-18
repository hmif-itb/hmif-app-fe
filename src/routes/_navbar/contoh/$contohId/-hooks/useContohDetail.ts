import { getRouteApi } from '@tanstack/react-router';

export default function usePendaftaranDetail() {
  const route = getRouteApi('/_navbar/contoh/$contohId/');

  const { contohId } = route.useParams();

  return { contohId };
}
