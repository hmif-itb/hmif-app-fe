import { useState } from 'react';

export default function usePendaftaran() {
  const [count, setCount] = useState(0);

  return { count, setCount };
}
