import { useState } from 'react';

export default function useLogin() {
  const [flow, setFlow] = useState(0);

  return { flow, setFlow };
}
