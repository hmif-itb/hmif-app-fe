import React, { useEffect } from 'react';
import { io } from 'socket.io-client';
import clsx from 'clsx';
import { Chatroom, ChatroomMessage } from '~/api/generated';
import useSession from '~/hooks/auth/useSession';
import MessageBubble from './MessageBubble';
import ArrowBack from '~/assets/icons/curhat/arrow-back.svg';
import ProfileIcon from '~/assets/icons/curhat/profile.svg';
import SendIcon from '~/assets/icons/curhat/send-icon.svg';
import { Button } from '~/components/ui/button';
import { queryClient } from '~/api/client';
import { Textarea } from '~/components/ui/textarea';

// Define the message and chat room types
interface Message {
  id: number;
  content: string;
  timestamp: string; // Optionally, you can add a timestamp if needed
  isSender: boolean; // Add this property to identify the sender
}

interface ChatRoom {
  id: number;
  name: string;
  messages: Message[];
}

// Define the props for ChatRoom
interface ChatRoomProps {
  chat: Chatroom;
  onBack: () => void;
}

const socket = io(import.meta.env.VITE_API_URL, {
  autoConnect: false,
});

const ChatRoom: React.FC<ChatRoomProps> = ({ chat, onBack }) => {
  const [messages, setMessages] = React.useState<ChatroomMessage[]>(
    chat.messages || [],
  );
  const [currMessage, setCurrMessage] = React.useState('');
  const user = useSession();

  useEffect(() => {
    // Reset messages when the chat changes
    setMessages(chat.messages || []);

    if (!socket.connected) {
      socket.auth = { chatroomId: chat.id };
      socket.connect();
    } else {
      // Disconnect and reconnect for the new chatroom
      socket.disconnect();
      socket.auth = { chatroomId: chat.id };
      socket.connect();
    }

    function handleReply(reply: ChatroomMessage) {
      setMessages((prev) => [reply, ...prev]);
    }

    socket.on('reply', handleReply);

    return () => {
      socket.off('reply', handleReply);
      socket.disconnect(); // Cleanup on component unmount or chat change
    };
  }, [chat]);

  const sendMessage = (message: string) => {
    if (message.trim() === '') return; // Prevent sending empty messages

    setMessages((prev) => [
      {
        id: (prev.length + 1).toString(),
        content: message,
        createdAt: new Date().toISOString(),
        chatroomId: chat.id,
        replyId: null,
        isSender: true,
      },
      ...prev,
    ]);
    socket.emit('message', {
      message,
      chatroomId: chat.id,
      userId: user.id,
    });
    queryClient.invalidateQueries({ queryKey: ['chatrooms'] });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit();
      e.preventDefault();
    }
  };

  const handleSubmit = () => {
    sendMessage(currMessage);
    setCurrMessage('');
  };

  return (
    <div className="relative flex size-full flex-col bg-[url(/img/curhatyuk/Background.png)] bg-cover bg-center bg-no-repeat md:w-full">
      {/* Chat header */}
      <div className="flex w-full items-center bg-[#30764B] p-2">
        <Button
          variant="link"
          onClick={() => {
            socket.disconnect();
            queryClient.invalidateQueries({ queryKey: ['chatrooms'] });
            onBack();
          }}
          className="px-2 lg:hidden"
        >
          <img src={ArrowBack} alt="Back" className="size-6" />
        </Button>
        <div className="flex size-[46px] items-center justify-center rounded-full bg-[#E8C55F]">
          <img src={ProfileIcon} alt="Profile" className="size-[26px]" />
        </div>
        <h2 className="ml-3 capitalize text-white">{chat.title}</h2>
      </div>

      {/* Chat messages */}
      <div
        className={clsx('flex grow flex-col gap-5 overflow-y-auto py-9', {
          'items-center justify-center': messages.length === 0,
          'flex-col-reverse': messages.length !== 0,
        })}
      >
        {messages.length === 0 ? (
          // Show text when there are no message bubbles
          <div className="flex flex-col items-center justify-center gap-3 ">
            <p className="text-5xl font-bold text-black">Chat Now!</p>
            <h2 className="text-lg font-medium text-black">
              Start Anonymous chat with Welfare!!
            </h2>
          </div>
        ) : (
          messages.map((message, idx) => (
            <MessageBubble
              key={idx}
              message={message.content}
              isSender={message.isSender ?? false}
              timestamp={message.createdAt}
            />
          ))
        )}
      </div>

      {/* Chat input */}
      <div className="mb-[75px] flex w-full justify-center rounded-t-xl bg-[#30764B] px-2 py-4 lg:bottom-0 lg:mb-0">
        <Textarea
          placeholder="Type your message here..."
          className="flex-auto text-sm"
          inputClassName="p-2 min-h-3"
          value={currMessage}
          onChange={(e) => setCurrMessage(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <Button
          variant="link"
          className="p-0"
          onClick={handleSubmit}
          disabled={currMessage.trim() === ''} // Disable button when message is empty or only spaces
        >
          <img src={SendIcon} alt="Send" className="size-10" />
        </Button>
      </div>
    </div>
  );
};

export default ChatRoom;
