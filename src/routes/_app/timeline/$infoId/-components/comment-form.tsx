import { Camera, Image, Paperclip } from 'lucide-react';
import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { api } from '~/api/client';
import { Button } from '~/components/ui/button';
import { Form, FormItem, FormControl } from '~/components/ui/form';
import Avatar from '~/components/user/avatar';
import useSession from '~/hooks/auth/useSession';
import { ICommentFormValues } from '../-interface/comment-form-values';
import { ICommentFormProps } from '../-interface/comment-form-props';

const TOAST_ID = 'comment-form-toast';

function CommentForm({ repliedInfoId }: ICommentFormProps) {
  const user = useSession();

  const formMethods = useForm({
    defaultValues: {
      comment: '',
    },
  });

  const onSubmit: SubmitHandler<ICommentFormValues> = async (data) => {
    if (!user) {
      return toast.error('Please log in to your account', {
        id: TOAST_ID,
      });
    }

    const commentData = {
      id: '', // idk how i should generate the ID, sorry.
      repliedInfoId: repliedInfoId,
      creatorId: user.id,
      content: data.comment,
      createdAt: new Date().toISOString(),
      creator: {
        id: user.id,
        nim: user.nim,
        email: user.email,
        fullName: user.fullName,
        major: user.major,
        picture: user.picture,
        region: user.region,
        angkatan: user.angkatan,
        gender: user.gender,
        membershipStatus: user.membershipStatus,
      },
    };

    try {
      await api.comment.postComment({
        requestBody: {
          repliedInfoId: commentData.repliedInfoId,
          content: commentData.content,
        },
      });
      console.log('sukses');
      formMethods.reset();
    } catch (error) {
      console.error('Failed to post comment:', error);
    }
  };

  return (
    <Form {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <div className="flex flex-row content-start items-start space-x-4 border-b border-gray-300 pb-4">
            <Avatar
              src={user.picture}
              alt={user.fullName}
              className="size-10"
            />
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
      </form>
    </Form>
  );
}

export default CommentForm;
