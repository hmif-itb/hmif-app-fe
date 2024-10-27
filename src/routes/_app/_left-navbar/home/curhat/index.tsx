import { createFileRoute } from '@tanstack/react-router';
import React, { useState } from 'react';
import ChatList from './-components/chatlist'; // Ensure the correct path to your ChatList component
import ChatRoom from './-components/chatroom'; // Ensure the correct path to your ChatRoom component

// Define the message and chat room types
interface Message {
  id: number;
  content: string;
  timestamp: string;
  isSender: boolean; // Indicates if the message is sent by the current user
}

interface ChatRoomType {
  id: number;
  name: string;
  messages: Message[]; // Expecting an array of Message objects
}

const Curhat: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<ChatRoomType | null>(null);

  // Chat rooms data structure
  const chatRooms: ChatRoomType[] = [
    {
      id: 1,
      name: 'Room Chat 1',
      messages: [
        { id: 1, content: 'Hello!', timestamp: '18:50', isSender: false },
        { id: 2, content: 'Hi there!', timestamp: '18:51', isSender: true },
        { id: 3, content: 'How are you?', timestamp: '18:52', isSender: false },
        {
          id: 4,
          content: 'I am good, thanks!',
          timestamp: '18:53',
          isSender: true,
        },
      ],
    },
    {
      id: 2,
      name: 'Room Chat 2',
      messages: [
        {
          id: 5,
          content: 'This is Room Chat 2',
          timestamp: '18:54',
          isSender: false,
        },
      ],
    },
    {
      id: 3,
      name: 'Room Chat 3',
      messages: [
        {
          id: 6,
          content: 'Welcome to Room Chat 3',
          timestamp: '18:55',
          isSender: true,
        },
      ],
    },
    // Add other chat rooms similarly...
  ];

  return (
    <div className="relative flex h-screen flex-col md:flex-row">
      <ChatList chats={chatRooms} setSelectedChat={setSelectedChat} />

      {/* Overlay ChatRoom when selected on small screens */}
      {selectedChat && (
        <>
          {/* Overlay ChatRoom on small screens */}
          <div className="absolute inset-0 z-10 flex flex-col bg-white p-4 md:hidden">
            {/* Back button, only visible in small screens */}
            <button
              className="mb-4 text-blue-500"
              onClick={() => setSelectedChat(null)} // Back to chat list
            >
              Back
            </button>
            {/* ChatRoom component */}
            <ChatRoom chat={selectedChat} />
          </div>

          {/* On medium and large screens, the chat room will appear alongside the chat list */}
          <div className="hidden md:block md:w-full">
            <ChatRoom chat={selectedChat} />
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
