import { createLazyFileRoute } from '@tanstack/react-router';
import { Button } from '~/components/ui/button';
import UserProfile from './-components/UserProfile';
import useAddAnnouncement from './-hooks/useAddAnnouncement';
import { Form, FormControl, FormField, FormItem } from '~/components/ui/form';
import { TextField } from '~/components/ui/textfield';
import { Textarea } from '~/components/ui/textarea';

export const Route = createLazyFileRoute('/add-announcement/')({
  component: AddAnnouncementPage,
});

function AddAnnouncementPage(): JSX.Element {
  const { form, onSubmit } = useAddAnnouncement();

  return (
    <main className="py-9 font-inter">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex items-center justify-between pb-4 pl-4 pr-5">
            <Button size="sm" variant="link">
              Cancel
            </Button>
            <Button className="bg-[#305138]" size="sm" variant="solid">
              Announce
            </Button>
          </div>

          <div className="py-4 px-6 border-t border-t-[#EBEEEB]">
            <UserProfile />
          </div>

          <FormField
            control={form.control}
            name="headline"
            render={({ field }) => (
              <FormItem>
                <div className="relative">
                  <FormControl>
                    <TextField
                      maxLength={50}
                      placeholder="Headline announcement"
                      inputClassName="rounded-none border-y border-y-[#EBEEEB] text-subtitle-2 py-4 px-6 font-bold"
                      {...field}
                    />
                  </FormControl>
                  <p className="absolute bottom-0.5 right-4 text-xs text-[#6A6B6A]">
                    {field.value.length}/50
                  </p>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="announcement"
            render={({ field }) => (
              <FormItem>
                <div className="relative">
                  <FormControl>
                    <Textarea
                      maxLength={500}
                      className="rounded-none h-[153px] border-y border-y-[#EBEEEB] px-6 py-4 text-base"
                      placeholder="What do you want announce?"
                      {...field}
                    />
                  </FormControl>
                  <p className="absolute bottom-0.5 right-4 text-xs text-[#6A6B6A]">
                    {field.value.length}/500
                  </p>
                </div>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </main>
  );
}
