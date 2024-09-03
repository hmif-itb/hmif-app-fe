import PlusIcon from '~/assets/icons/plus.svg';
import BookIcon from '~/assets/icons/calendar/book-white.svg';
import { Button } from '~/components/ui/button';
import { motion, Variants } from 'framer-motion';
import { useState } from 'react';
import AddEventDrawer from './AddEventDrawer';
import { CalendarCategory } from '~/api/generated';

type ComponentProps = {
  roles: string[];
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const btnAnimProps = (offset: number, btnOpen: boolean) => ({
  animate: btnOpen ? 'open' : 'closed',
  variants: {
    open: { translateY: '0%' },
    closed: { translateY: `calc(${offset * 100}% + ${offset * 12}px)` },
  } as Variants,
  transition: { bounce: 0 },
  initial: 'closed',
});

export default function AddButtons(props: Readonly<ComponentProps>) {
  const { roles, isOpen, setOpen } = props;

  const [category, setCategory] = useState('');
  const [addEventOpen, setAddEventOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-24 right-5 z-20 flex flex-col gap-3">
        <motion.div
          {...btnAnimProps(
            roles?.includes('akademik') && roles?.includes('ring1') ? 3 : 2,
            isOpen,
          )}
          className="z-[22]"
        >
          <Button
            onClick={() => setOpen(true)}
            className="rounded-full border border-green-300 bg-yellow-75 p-5"
          >
            <img src={PlusIcon} className="size-8" alt="" />
          </Button>
        </motion.div>
        {roles.includes('akademik') && roles.includes('ring1') ? (
          <>
            <motion.div {...btnAnimProps(2, isOpen)} className="z-[21]">
              <Button
                onClick={() => {
                  setAddEventOpen(true);
                  setCategory('akademik');
                  setOpen(false);
                }}
                className="rounded-full bg-green-400 p-3"
              >
                <img src={BookIcon} className="size-[50px]" alt="" />
              </Button>
            </motion.div>
            <motion.div {...btnAnimProps(1, isOpen)} className="z-[21]">
              <Button
                onClick={() => {
                  setAddEventOpen(true);
                  setCategory('himpunan');
                  setOpen(false);
                }}
                className="rounded-full bg-green-400 p-3"
              >
                <img src={BookIcon} className="size-[50px] rotate-180" alt="" />
              </Button>
            </motion.div>
          </>
        ) : roles.includes('akademik') ? (
          <motion.div {...btnAnimProps(1, isOpen)} className="z-[21]">
            <Button
              onClick={() => {
                setAddEventOpen(true);
                setCategory('akademik');
                setOpen(false);
              }}
              className="rounded-full bg-green-400 p-3"
            >
              <img src={BookIcon} className="size-[50px]" alt="" />
            </Button>
          </motion.div>
        ) : (
          <motion.div {...btnAnimProps(1, isOpen)} className="z-[21]">
            <Button
              onClick={() => {
                setAddEventOpen(true);
                setCategory('himpunan');
                setOpen(false);
              }}
              className="rounded-full bg-green-400 p-3"
            >
              <img src={BookIcon} className="size-[50px]" alt="" />
            </Button>
          </motion.div>
        )}
        <motion.div {...btnAnimProps(0, isOpen)} className="z-20">
          <Button
            onClick={() => setOpen(false)}
            className="rounded-full border border-green-300 bg-yellow-75 p-5"
          >
            <img src={PlusIcon} className="size-8 rotate-45" alt="" />
          </Button>
        </motion.div>
      </div>

      <AddEventDrawer
        isOpen={addEventOpen}
        setOpen={setAddEventOpen}
        category={category as CalendarCategory}
      />
    </>
  );
}
