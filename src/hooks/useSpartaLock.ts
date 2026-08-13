import useSession from './auth/useSession';
import { isSpartaOnlyAngkatan } from '~/lib/sparta';

export default function useSpartaLock() {
  const user = useSession();
  return isSpartaOnlyAngkatan(user.angkatan);
}
