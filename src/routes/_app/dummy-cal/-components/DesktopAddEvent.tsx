import { Form, useForm } from 'react-hook-form';
import CloseIcon from '~/assets/icons/calendar/close.svg';
import DocsIcon from '~/assets/icons/calendar/docs.svg';
import ClockIcon from '~/assets/icons/calendar/clock.svg';
import BookIcon from '~/assets/icons/calendar/book.svg';
import { FormSchema, FormSchemaType } from '../-constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormField, FormItem } from '~/components/ui/form';
import { TextField } from '~/components/ui/textfield';
import dayjs from 'dayjs';
import { Button } from '~/components/ui/button';

export default function DesktopAddEvent() {
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

  const dateDisplay = dayjs(form.getValues('start')).format('dddd, MMMM DD');
  const startTimeDisplay = dayjs(form.getValues('start')).format('hh:mma');
  const endTimeDisplay = dayjs(form.getValues('end')).format('hh:mma');

  return (
    <div className="w-[564px] overflow-hidden rounded-2xl bg-white shadow-[0_4px_4px_3px_rgba(0,0,0,0.25)]">
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
            <TextField
              value={dateDisplay}
              inputClassName="font-medium border-none text-base px-0"
              className="w-[160px]"
            />
            <div className="flex items-center">
              <TextField
                value={startTimeDisplay}
                inputClassName="font-medium border-none text-base px-0 text-center"
                className="w-[80px]"
              />
              <p>-</p>
              <TextField
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
    </div>
  );
}
