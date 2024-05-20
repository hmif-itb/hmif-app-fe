import { createLazyFileRoute } from '@tanstack/react-router';
import { Button } from '~/components/ui/button';
import UserProfile from './-components/UserProfile';
import useAddAnnouncement from './-hooks/useAddAnnouncement';
import { Form, FormControl, FormField, FormItem } from '~/components/ui/form';
import { TextField } from '~/components/ui/textfield';
import { GrowingTextarea } from '~/components/ui/growingtextarea';

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
            <Button
              type="submit"
              className="bg-[#305138]"
              size="sm"
              variant="solid"
            >
              Announce
            </Button>
          </div>

          <div className="border-t border-t-[#EBEEEB] px-6 py-4">
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
                      errorClassName="absolute top-0.5 left-4 text-xs"
                      error={
                        form.formState.errors.headline?.message &&
                        "Headline can't be empty"
                      }
                      success={form.formState.isSubmitSuccessful}
                      iconClassName="!size-3 !top-auto bottom-0.5 !translate-y-0 !right-12"
                      {...field}
                    />
                  </FormControl>
                  <p className="absolute bottom-0 right-4 text-xs text-[#6A6B6A]">
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
                    <GrowingTextarea
                      maxLength={500}
                      className="min-h-[153px] rounded-none border-y border-y-[#EBEEEB] px-6 py-4 text-base"
                      placeholder="What do you want announce?"
                      errorClassName="absolute top-0.5 left-4 text-xs"
                      error={
                        form.formState.errors.announcement?.message &&
                        "Announcement can't be empty"
                      }
                      success={form.formState.isSubmitSuccessful}
                      iconClassName="!size-3 !top-auto bottom-1 !translate-y-0 !right-14"
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
