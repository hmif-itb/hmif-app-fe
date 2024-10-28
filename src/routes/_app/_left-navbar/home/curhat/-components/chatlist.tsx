import React from 'react';
import { Chatroom, ListChatroom } from '~/api/generated';
import ProfileIcon from '~/assets/icons/curhat/profile.svg';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';
import HamburgerIcon from '~/assets/icons/timeline/hamburger.svg';
import TrashIcon from '~/assets/icons/timeline/trash.svg';
import MessageIcon from '~/assets/icons/curhat/message.svg';
import ArrowBack from '~/assets/icons/curhat/arrow-back-black.svg';
import { Button } from '~/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { api, queryClient } from '~/api/client';
import toast from 'react-hot-toast';
import useSession from '~/hooks/auth/useSession';
import { useNavigate } from '@tanstack/react-router';

interface ChatListProps {
  chats: ListChatroom;
  setSelectedChat: (chat: Chatroom) => void;
}

const TOAST_ID_DELETE = 'delete-chatroom-toast';
const TOAST_ID_CREATE = 'create-chatroom-toast';

const ChatList: React.FC<ChatListProps> = ({ chats, setSelectedChat }) => {
  const user = useSession();

  const navigate = useNavigate();

  const deleteChatroom = useMutation({
    mutationFn: api.curhat.deleteChatroom.bind(api.curhat),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['chatrooms'],
      });
      toast.success('Chatroom deleted', { id: TOAST_ID_DELETE });
    },
  });

  const createChatroom = useMutation({
    mutationFn: api.curhat.createChatroom.bind(api.curhat),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['chatrooms'],
      });
      toast.success('Chatroom created', { id: TOAST_ID_CREATE });
    },
  });

  const handleDelete = (id: string) => {
    toast.loading('Please wait...', { id: TOAST_ID_DELETE });
    deleteChatroom.mutate({
      chatroomId: id,
    });
  };

  const handleCreate = () => {
    toast.loading('Please wait...', { id: TOAST_ID_CREATE });
    createChatroom.mutate();
  };

  return (
    <div className="relative size-full border-r md:w-full lg:w-2/5">
      <Button
        variant="link"
        onClick={() => navigate({ to: '/home' })}
        className="mt-8 px-4"
      >
        <img src={ArrowBack} alt="Back" className="size-6" />
        Back
      </Button>

      <div className="px-4">
        <h2 className="mt-4 text-2xl font-bold">Messages</h2>
        <p className="text-sm">You can create up to three chatrooms</p>
      </div>

      {/* <div className="my-4">
        <input
          type="text"
          placeholder="Search"
          className="w-full rounded-md border px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div> */}

      {/* Chatrooms */}
      <div className="mt-7 w-full">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className="flex w-full cursor-pointer items-center justify-between border-y px-5 py-4 transition hover:bg-blue-100"
            onClick={() => setSelectedChat(chat)}
          >
            <div className="flex items-center gap-4">
              <div className="flex size-14 items-center justify-center rounded-full bg-[#30764B]">
                <img src={ProfileIcon} alt="Profile" className="size-9" />
              </div>
              <div>
                <h3 className="capitalize">{chat.title}</h3>
                <p className="truncate text-sm text-gray-500">
                  {chat.messages?.at(0)?.content}
                </p>
              </div>
            </div>

            {chat.canDelete && (
              <Popover>
                <PopoverTrigger onClick={(e) => e.stopPropagation()}>
                  <img src={HamburgerIcon} className="size-5" alt="" />
                </PopoverTrigger>

                <PopoverContent className="w-fit py-2 pl-2 pr-3" align="end">
                  <ul className="flex flex-col gap-2">
                    {true && (
                      <li className="leading-none">
                        <Button
                          variant="link"
                          className="items-center p-0 text-sm font-normal text-[#FF3B30] md:text-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(chat.id);
                          }}
                        >
                          <img
                            src={TrashIcon}
                            className="size-5 md:size-6"
                            alt=""
                          />
                          Delete
                        </Button>
                      </li>
                    )}
                  </ul>
                </PopoverContent>
              </Popover>
            )}

            {/* <span className="rounded-full bg-red-500 px-2 py-1 text-xs text-white"> */}
            {/* {chat.messages.length}{' '} */}
            {/* Replace this with your unread messages count */}
            {/* </span> */}
          </div>
        ))}
      </div>

      {!user?.roles.includes('curhatadmin') && chats.length < 3 && (
        <Button
          size="icon-md"
          className="absolute bottom-24 right-4 size-[74px] rounded-full border border-green-300 bg-yellow-75"
          onClick={handleCreate}
        >
          <img src={MessageIcon} alt="create chatroom" className="size-10" />
        </Button>
      )}
    </div>
  );
};

export default ChatList;