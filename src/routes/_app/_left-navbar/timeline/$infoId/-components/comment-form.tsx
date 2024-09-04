import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { api } from '~/api/client';
import { Button } from '~/components/ui/button';
import { Form, FormControl, FormItem } from '~/components/ui/form';
import { Textarea } from '~/components/ui/textarea';
import Avatar from '~/components/user/avatar';
import useSession from '~/hooks/auth/useSession';
import { ICommentFormProps } from '../-interface/comment-form-props';
import { ICommentFormValues } from '../-interface/comment-form-values';
import { INFO_QUERY_KEY } from '~/api/constants';

function CommentForm({ repliedInfoId }: ICommentFormProps) {
  const user = useSession();

  const formMethods = useForm({
    defaultValues: {
      comment: '',
    },
  });

  const submitMutation = useMutation({
    mutationFn: api.comment.postComment.bind(api.comment),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [INFO_QUERY_KEY, 'comments', repliedInfoId],
      });
      formMethods.reset();
    },
  });

  const queryClient = useQueryClient();

  const onSubmit: SubmitHandler<ICommentFormValues> = async (data) => {
    await submitMutation.mutateAsync({
      requestBody: {
        content: data.comment,
        repliedInfoId: repliedInfoId,
      },
    });
  };

  return (
    <Form {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <div className="flex flex-row content-start items-start gap-x-4 border-b border-gray-300 pb-4">
            <Avatar src={user.picture} alt={user.fullName} className="size-8" />
            <FormItem className="flex-1">
              <Controller
                name="comment"
                control={formMethods.control}
                render={({ field }) => (
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Share your thoughts with a reply"
                      className="min-h-0 w-full overflow-hidden border-none px-1 py-0 text-xs font-normal text-neutral-darker focus:ring-0 lg:text-sm"
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
            <Button type="submit" className="grow-0 bg-green-300" size={'sm'}>
              Reply
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

export default CommentForm;
