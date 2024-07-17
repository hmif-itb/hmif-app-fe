import { Camera, Image, Paperclip } from 'lucide-react';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '~/components/ui/button';
import { Form, FormItem, FormControl } from '~/components/ui/form';
import { cn } from '~/lib/utils';

function CommentForm() {
  const formMethods = useForm({
    defaultValues: {
      comment: '',
    },
  });

  return (
    <Form {...formMethods}>
      <div className="flex flex-col">
        <div className="flex flex-row content-start items-start space-x-4 border-b border-gray-300 pb-4">
          <div className="size-10 rounded-full bg-yellow-300"></div>
          <FormItem className="flex-1 pt-2">
            <Controller
              name="comment"
              control={formMethods.control}
              render={({ field }) => (
                <FormControl>
                  <textarea
                    {...field}
                    placeholder="Share your thoughts with a reply"
                    className="w-full overflow-hidden border-none text-base font-normal text-neutral-darker focus:ring-0"
                    rows={1}
                    onInput={(e) => {
                      e.currentTarget.style.height = 'auto';
                      e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
                    }}
                  />
                </FormControl>
              )}
            />
          </FormItem>
        </div>
        <div className="flex content-start items-center border-b border-gray-300 py-3">
          <div className="grow space-x-2">
            <button type="button" className="p-1">
              <Camera className="size-7" />
            </button>
            <button type="button" className="p-1">
              <Image className="size-7" />
            </button>
            <button type="button" className="p-1">
              <Paperclip className="size-7" />
            </button>
          </div>
          <Button type="submit" className="grow-0 bg-green-300">
            Reply
          </Button>
        </div>
      </div>
    </Form>
  );
}

export default CommentForm;
