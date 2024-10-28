import React, { useEffect } from 'react';
import { io } from 'socket.io-client';
import { Chatroom, ChatroomMessage } from '~/api/generated';
import useSession from '~/hooks/auth/useSession';
import MessageBubble from './MessageBubble';
import ArrowBack from '~/assets/icons/curhat/arrow-back.svg';
import ProfileIcon from '~/assets/icons/curhat/profile.svg';
import SendIcon from '~/assets/icons/curhat/send-icon.svg';
import { Button } from '~/components/ui/button';
import { TextField } from '~/components/ui/textfield';

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
    if (!chat) {
      return;
    }
    if (!socket.connected) {
      socket.auth = { chatroomId: chat.id };
      socket.connect();
    }

    function handleReply(reply: ChatroomMessage) {
      setMessages((prev) => [reply, ...prev]);
    }

    socket.on('reply', handleReply);

    return () => {
      socket.off('reply', handleReply);
    };
  }, [chat]);

  const sendMessage = (message: string) => {
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
  };

  return (
    <div className="relative flex size-full flex-col pb-20 md:w-full">
      {/* Chat header */}
      <div className="flex w-full items-center bg-[#30764B] p-2">
        <Button
          variant="link"
          onClick={() => {
            socket.disconnect();
            onBack();
          }}
          className="px-2"
        >
          <img src={ArrowBack} alt="Back" className="size-6" />
        </Button>
        <div className="flex size-[46px] items-center justify-center rounded-full bg-[#E8C55F]">
          <img src={ProfileIcon} alt="Profile" className="size-[26px]" />
        </div>
        <h2 className="ml-3 capitalize text-white">{chat.title}</h2>
      </div>

      {/* Chat messages */}
      <div className="flex grow flex-col-reverse gap-5 overflow-y-auto py-9">
        {messages.map((message, idx) => (
          <MessageBubble
            key={idx}
            message={message.content}
            isSender={message.isSender ?? false}
            timestamp={message.createdAt}
          />
        ))}
      </div>

      {/* Chat input */}
      <div className="flex w-full justify-center rounded-t-xl bg-[#30764B] px-2 py-4 lg:bottom-4">
        <TextField
          type="text"
          placeholder="Type your message here..."
          className="flex-auto text-sm"
          inputClassName="p-2"
          value={currMessage}
          onChange={(e) => setCurrMessage(e.target.value)}
        />
        <Button
          variant="link"
          className="p-0"
          onClick={() => {
            sendMessage(currMessage);
            setCurrMessage('');
          }}
        >
          <img src={SendIcon} alt="Send" className="size-10" />
        </Button>
      </div>
    </div>
  );
};

export default ChatRoom;