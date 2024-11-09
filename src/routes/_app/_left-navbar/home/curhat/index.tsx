import { createFileRoute } from '@tanstack/react-router';
import React, { useState } from 'react';
import ChatList from './-components/chatlist'; // Ensure the correct path to your ChatList component
import ChatRoom from './-components/chatroom'; // Ensure the correct path to your ChatRoom component
import { useQuery } from '@tanstack/react-query';
import { api } from '~/api/client';
import { Chatroom } from '~/api/generated';

const Curhat: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<Chatroom | null>(null);

  const { data: chatRooms } = useQuery({
    queryKey: ['chatrooms'],
    queryFn: () => api.curhat.getUserChatrooms(),
  });

  return (
    <div className="relative flex h-screen flex-col md:flex-row">
      <ChatList
        chats={chatRooms ?? []}
        setSelectedChat={setSelectedChat}
        selectedId={selectedChat?.id || ''}
      />

      {/* Overlay ChatRoom when selected on small screens */}
      {selectedChat && (
        <>
          {/* Overlay ChatRoom on small screens */}
          <div className="absolute inset-0 z-10 flex flex-col bg-white md:hidden">
            {/* ChatRoom component */}
            <ChatRoom
              chat={selectedChat}
              onBack={() => setSelectedChat(null)}
            />
          </div>

          {/* On medium and large screens, the chat room will appear alongside the chat list */}
          <div className="hidden md:block md:w-3/5">
            <ChatRoom
              chat={selectedChat}
              onBack={() => setSelectedChat(null)}
            />
          </div>
        </>
      )}
    </div>
  );
};

// Now create the route
export const Route = createFileRoute('/_app/_left-navbar/home/curhat/')({
  component: Curhat,
});

export default Curhat;
