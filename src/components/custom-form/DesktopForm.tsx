import { FieldValues } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import CloseIcon from '~/assets/icons/calendar/close.svg';
import { Form } from '../ui/form';
import { useRef } from 'react';
import { FormProps } from './-types';

export default function DesktopForm<T extends FieldValues>(
  props: Readonly<Omit<FormProps<T>, 'isOpen'>>,
) {
  const { form, setOpen, onSubmit, children, constraintRef } = props;

  // for handling scroll popover inside the dialog
  // https://github.com/radix-ui/primitives/issues/1159
  const containerRef = useRef<HTMLFormElement>(null);

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragConstraints={constraintRef}
      dragElastic={0}
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ duration: 0.1 }}
      className="absolute left-1/4 top-3 z-50 max-h-[88vh] w-[564px] overflow-auto rounded-2xl bg-white shadow-[0_4px_4px_3px_rgba(0,0,0,0.25)]"
    >
      <div className="flex flex-row justify-end rounded-t-2xl bg-[#D9D9D9] px-4 py-3">
        <Button className="p-0" variant="link" onClick={() => setOpen(false)}>
          <img src={CloseIcon} alt="close" className="size-4" />
        </Button>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="p-4"
          ref={containerRef}
          autoComplete="off"
        >
          {children}

          <div className="flex w-full justify-end">
            <Button
              size="sm"
              type="submit"
              variant="solid"
              className="bg-[#305138] px-5"
            >
              Save
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}
