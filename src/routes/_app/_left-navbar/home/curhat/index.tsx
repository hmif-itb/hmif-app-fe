import { createFileRoute } from '@tanstack/react-router';
import React, { useEffect, useState } from 'react';
import ChatList from './-components/chatlist'; // Ensure the correct path to your ChatList component
import ChatRoom from './-components/chatroom'; // Ensure the correct path to your ChatRoom component
import { useQuery } from '@tanstack/react-query';
import { api } from '~/api/client';
import { Chatroom } from '~/api/generated';
import { io, Socket } from 'socket.io-client';

const Curhat: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<Chatroom | null>(null);
  const [sockets, setSockets] = useState<Map<string, Socket>>(new Map());

  const { data: chatRooms } = useQuery({
    queryKey: ['chatrooms'],
    queryFn: () => api.curhat.getUserChatrooms(),
  });

  // Check if there chatRooms is empty (no selected chats)
  useEffect(() => {
    if (!chatRooms || Object.keys(chatRooms).length === 0) {
      setSelectedChat(null);
      setSockets(new Map());
    } else if (sockets.size === 0) {
      const tempSockets = new Map();

      Object.keys(chatRooms).forEach((key) =>
        tempSockets.set(
          key,
          io(import.meta.env.VITE_API_URL, {
            auth: { chatroomId: key },
          }),
        ),
      );

      setSockets(tempSockets);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatRooms]);

  useEffect(() => {
    return () => {
      sockets.forEach((socket) => socket.disconnect());
    };
  }, [sockets]);

  return (
    <div className="relative flex h-screen flex-col md:flex-row">
      <ChatList
        chats={chatRooms ?? {}}
        setSelectedChat={setSelectedChat}
        selectedId={selectedChat?.id || ''}
      />

      {/* When no chats are selected, show background */}
      {!selectedChat && (
        <div className="hidden flex-col items-center justify-center gap-3 bg-[url(/img/curhatyuk/Background.png)] bg-cover bg-center bg-no-repeat md:flex md:w-3/5">
          <p className="text-5xl font-bold text-black">CurhatYuk!!</p>
          <h2 className="text-lg font-medium text-black">
            Start Anonymous chat with Welfare!!
          </h2>
        </div>
      )}

      {/* Overlay ChatRoom when selected on small screens */}
      {selectedChat && (
        <>
          {/* Overlay ChatRoom on small screens */}
          <div className="absolute inset-0 z-10 flex flex-col bg-white md:hidden">
            {/* ChatRoom component */}
            <ChatRoom
              socket={sockets.get(selectedChat.id)}
              chat={selectedChat}
              onBack={() => setSelectedChat(null)}
            />
          </div>

          {/* On medium and large screens, the chat room will appear alongside the chat list */}
          <div className="hidden md:block md:w-3/5">
            <ChatRoom
              socket={sockets.get(selectedChat.id)}
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
