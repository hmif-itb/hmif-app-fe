import Calendar from '~/components/new-calendar';
import Schedule from '../../-components/schedule';
import { Separator } from '@radix-ui/react-separator';
import { CalendarEvent } from '~/api/generated';
import dayjs from 'dayjs';
import { useCalendarEvents } from '~/hooks/calendar';
import { useEffect, useMemo, useState } from 'react';
import PlusIcon from '~/assets/icons/calendar/plus.svg';
import BookIcon from '~/assets/icons/calendar/book-white.svg';
import { Button } from '~/components/ui/button';
import { motion, Variants } from 'framer-motion';
import { Drawer, DrawerContent } from '~/components/ui/drawer';
import { MobileAddEvent } from './MobileAddEvent';
import useSession from '~/hooks/auth/useSession';

interface EventsByDate {
  [key: string]: CalendarEvent[];
}

const btnAnimProps = (offset: number, btnOpen: boolean) => ({
  animate: btnOpen ? 'open' : 'closed',
  variants: {
    open: { translateY: '0%' },
    closed: { translateY: `calc(${offset * 100}% + ${offset * 12}px)` },
  } as Variants,
  transition: { bounce: 0 },
  initial: 'closed',
});

export default function MobileView() {
  const now = dayjs();

  const user = useSession();

  const [selectedDate, setSelectedDate] = useState(now.toDate());
  const [selectedEvents, setSelectedEvents] = useState<CalendarEvent[]>([]);
  const [btnOpen, setBtnOpen] = useState(false);
  const [addEventOpen, setAddEventOpen] = useState(false);
  const [category, setCategory] = useState('');

  const { data: allEvents } = useCalendarEvents({
    month: now.month() + 1,
    year: now.year(),
  });

  // const eventsByDate = ;
  const eventsByDate = useMemo(
    () =>
      allEvents?.reduce((acc, event) => {
        const start = dayjs(event.start).format('MMDD');
        if (!acc[start]) {
          acc[start] = [];
        }
        acc[start].push(event);
        return acc;
      }, {} as EventsByDate),
    [allEvents],
  );

  useEffect(() => {
    const selected = dayjs(selectedDate).format('MMDD');
    setSelectedEvents(eventsByDate ? eventsByDate[selected] || [] : []);
  }, [selectedDate, eventsByDate]);

  return (
    <div className="flex h-screen w-full flex-col items-center gap-2 overflow-auto px-4 pt-4">
      <Calendar onChange={(date) => setSelectedDate(date)} isMobile={true} />

      <Separator />

      {/* Schedule Section */}
      <section className="flex w-full flex-auto flex-col gap-2 px-2">
        <p className="self-start font-semibold">Schedule</p>

        <div className="flex justify-between px-1 text-[#BCC1CD]">
          <div className="flex gap-14">
            <p>Time</p>
            <p>Agenda</p>
          </div>
        </div>

        {/* Schedule Cards */}
        <div className="flex w-full flex-auto flex-col py-1">
          {selectedEvents.map((event, idx) => {
            return (
              <Schedule
                key={event.id}
                event={event}
                isLastIndex={idx === selectedEvents.length - 1}
                isSecondLastIndex={idx === selectedEvents.length - 2}
              />
            );
          })}
        </div>
      </section>

      {(user?.roles?.includes('akademik') ||
        user?.roles?.includes('ring1')) && (
        <>
          <div className="fixed bottom-24 right-5 z-20 flex flex-col gap-3">
            <motion.div
              {...btnAnimProps(
                user?.roles?.includes('akademik') &&
                  user?.roles?.includes('ring1')
                  ? 3
                  : 2,
                btnOpen,
              )}
              className="z-[22]"
            >
              <Button
                onClick={() => setBtnOpen(true)}
                className="rounded-full border border-green-300 bg-yellow-75 p-5"
              >
                <img src={PlusIcon} className="size-8" alt="" />
              </Button>
            </motion.div>
            {user?.roles.includes('akademik') &&
            user?.roles.includes('ring1') ? (
              <>
                <motion.div {...btnAnimProps(2, btnOpen)} className="z-[21]">
                  <Button
                    onClick={() => {
                      setAddEventOpen(true);
                      setCategory('akademik');
                      setBtnOpen(false);
                    }}
                    className="rounded-full bg-green-400 p-3"
                  >
                    <img src={BookIcon} className="size-[50px]" alt="" />
                  </Button>
                </motion.div>
                <motion.div {...btnAnimProps(1, btnOpen)} className="z-[21]">
                  <Button
                    onClick={() => {
                      setAddEventOpen(true);
                      setCategory('himpunan');
                      setBtnOpen(false);
                    }}
                    className="rounded-full bg-green-400 p-3"
                  >
                    <img
                      src={BookIcon}
                      className="size-[50px] rotate-180"
                      alt=""
                    />
                  </Button>
                </motion.div>
              </>
            ) : user?.roles.includes('akademik') ? (
              <motion.div {...btnAnimProps(1, btnOpen)} className="z-[21]">
                <Button
                  onClick={() => {
                    setAddEventOpen(true);
                    setCategory('akademik');
                    setBtnOpen(false);
                  }}
                  className="rounded-full bg-green-400 p-3"
                >
                  <img src={BookIcon} className="size-[50px]" alt="" />
                </Button>
              </motion.div>
            ) : (
              <motion.div {...btnAnimProps(1, btnOpen)} className="z-[21]">
                <Button
                  onClick={() => {
                    setAddEventOpen(true);
                    setCategory('himpunan');
                    setBtnOpen(false);
                  }}
                  className="rounded-full bg-green-400 p-3"
                >
                  <img src={BookIcon} className="size-[50px]" alt="" />
                </Button>
              </motion.div>
            )}
            <motion.div {...btnAnimProps(0, btnOpen)} className="z-20">
              <Button
                onClick={() => setBtnOpen(false)}
                className="rounded-full border border-green-300 bg-yellow-75 p-5"
              >
                <img src={PlusIcon} className="size-8 rotate-45" alt="" />
              </Button>
            </motion.div>
          </div>

          <Drawer
            onOpenChange={setAddEventOpen}
            open={addEventOpen}
            shouldScaleBackground
          >
            <DrawerContent className="h-[95%] bg-white">
              <MobileAddEvent
                category={category as 'akademik' | 'himpunan'}
                setDrawer={setAddEventOpen}
              />
            </DrawerContent>
          </Drawer>
        </>
      )}
    </div>
  );
}
