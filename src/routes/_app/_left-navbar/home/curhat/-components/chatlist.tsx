import React from 'react';
import clsx from 'clsx';
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
import LabelDropdown from '../-components/LabelDropdown';
import SearchAndFilter from './searchandfilter';

interface ChatListProps {
  chats: ListChatroom;
  setSelectedChat: (chat: Chatroom) => void;
  selectedId: string;
}

const TOAST_ID_DELETE = 'delete-chatroom-toast';
const TOAST_ID_CREATE = 'create-chatroom-toast';

const ChatList: React.FC<ChatListProps> = ({
  chats,
  setSelectedChat,
  selectedId,
}) => {
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
    <div className="relative h-screen w-full overflow-y-auto border-r md:w-full lg:w-2/5">
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

      {/* Search bar and Filter */}
      <div className="mt-3">
        <SearchAndFilter />
      </div>

      {/* Chatrooms */}
      <div className="mt-7 w-full">
        {Object.values(chats).map((chat) => (
          <div
            key={chat.id}
            className={clsx(
              'flex w-full cursor-pointer items-center justify-between border-y px-5 py-4 transition hover:bg-blue-100',
              {
                'bg-blue-100': selectedId === chat.id,
              },
            )}
            onClick={() => setSelectedChat(chat)}
          >
            <div className="flex items-center gap-4">
              <div className="flex size-14 items-center justify-center rounded-full bg-[#30764B]">
                <img src={ProfileIcon} alt="Profile" className="size-9" />
              </div>
              <div>
                <h3 className="capitalize">{chat.title}</h3>
                <p className="truncate text-sm text-gray-500">
                  {chat.messages &&
                  chat.messages.length > 0 &&
                  chat.messages[0].content
                    ? chat.messages[0].content.length > 10
                      ? `${chat.messages[0].content.slice(0, 10)}...`
                      : chat.messages[0].content
                    : 'No messages'}
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
                    {true && (
                      <li className="leading-none">
                        <LabelDropdown chatroom={chat} />
                      </li>
                    )}
                  </ul>
                </PopoverContent>
              </Popover>
            )}
          </div>
        ))}
      </div>

      {!user?.roles.includes('curhatadmin') &&
        Object.keys(chats).length < 3 && (
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
