import { createFileRoute } from '@tanstack/react-router';
import DesktopAddEvent from './-components/DesktopAddEvent';
import { motion } from 'framer-motion';
import { useRef } from 'react';

export const Route = createFileRoute('/_app/dummy-cal/')({
  component: DummyCal,
});

function DummyCal() {
  const mainRef = useRef<HTMLElement | null>(null);

  return (
    <>
      <motion.main ref={mainRef} className="h-full">
        <DesktopAddEvent constraintRef={mainRef} />
      </motion.main>
    </>
  );
}
