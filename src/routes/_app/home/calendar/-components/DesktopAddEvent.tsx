import { useForm } from 'react-hook-form';
import CloseIcon from '~/assets/icons/calendar/close.svg';
import DocsIcon from '~/assets/icons/calendar/docs.svg';
import ClockIcon from '~/assets/icons/calendar/clock.svg';
import BookIcon from '~/assets/icons/calendar/book.svg';
import { FormSchema, FormSchemaType } from '../-constants.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem } from '~/components/ui/form';
import { TextField } from '~/components/ui/textfield';
import dayjs from 'dayjs';
import { Button } from '~/components/ui/button';
import { motion } from 'framer-motion';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';
import Calendar from '~/components/new-calendar';

type ComponentProps = {
  constraintRef: React.MutableRefObject<HTMLElement | null>;
};

export default function DesktopAddEvent(props: Readonly<ComponentProps>) {
  const { constraintRef } = props;

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      start: new Date().toISOString(),
      end: new Date().toISOString(),
    },
  });

  const watchStart = form.watch('start');
  const watchEnd = form.watch('end');

  const dateDisplay = dayjs(watchStart).format('dddd, MMMM DD');
  const startTimeDisplay = dayjs(watchStart).format('hh:mma');
  const endTimeDisplay = dayjs(watchEnd).format('hh:mma');

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragConstraints={constraintRef}
      dragElastic={0}
      className="absolute left-1/3 top-1/3 z-[100] w-[564px] overflow-hidden rounded-2xl bg-white shadow-[0_4px_4px_3px_rgba(0,0,0,0.25)]"
    >
      <div className="flex flex-row justify-end bg-[#D9D9D9] px-4 py-3">
        <img src={CloseIcon} alt="close" className="size-4" />
      </div>

      <Form {...form}>
        <form className="grid grid-cols-[24px_auto] items-center gap-x-5 p-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="col-start-2 col-end-2 row-start-1 row-end-1">
                <TextField
                  placeholder="Add Title"
                  error={
                    form.formState.errors.title?.message &&
                    "Title can't be empty"
                  }
                  inputClassName="!border-b-2 px-0 text-3xl font-medium border-0 rounded-none"
                  success={form.formState.isSubmitSuccessful}
                  {...field}
                />
              </FormItem>
            )}
          />

          <div className="col-start-2 col-end-2 row-start-2 row-end-2 my-3 flex w-fit items-center gap-2 rounded-lg bg-yellow-75 p-2">
            <img src={BookIcon} alt="" className="size-4" />
            <p className="text-sm font-medium text-green-300">Akademik</p>
          </div>

          <img
            src={ClockIcon}
            alt=""
            className="col-start-1 col-end-1 row-start-3 row-end-3 size-6"
          />
          <div className="col-start-2 col-end-2 row-start-3 row-end-3 flex items-center gap-5">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="link"
                  className="w-[180px] justify-start p-0 text-base font-medium"
                >
                  {dateDisplay}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-fit rounded-xl p-0 shadow-[0_4px_4px_3px_rgba(0,0,0,0.25)]">
                <Calendar
                  onChange={(date) => {
                    form.setValue('start', date.toISOString());
                    form.setValue('end', date.toISOString());
                  }}
                  isMobile={false}
                  defaultDate={new Date(watchStart)}
                  className="p-4 pb-0"
                />
              </PopoverContent>
            </Popover>
            <div className="flex items-center">
              <TextField
                readOnly
                value={startTimeDisplay}
                inputClassName="font-medium border-none text-base px-0 text-center"
                className="w-[80px]"
              />
              <p>-</p>
              <TextField
                readOnly
                value={endTimeDisplay}
                inputClassName="font-medium border-none text-base px-0 text-center"
                className="w-[80px]"
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <>
                <img
                  src={DocsIcon}
                  alt=""
                  className="col-start-1 col-end-1 row-start-4 row-end-4 size-6"
                />

                <FormItem className="col-start-2 col-end-2 row-start-4 row-end-4">
                  <TextField
                    placeholder="Add description"
                    inputClassName="font-medium border-none text-base px-0"
                    success={form.formState.isSubmitSuccessful}
                    {...field}
                  />
                </FormItem>
              </>
            )}
          />
          <div className="col-start-2 col-end-2 row-start-5 row-end-5 flex justify-end pt-[86px]">
            <Button
              size="sm"
              type="submit"
              variant="solid"
              className="bg-[#305138]"
            >
              Save
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}
