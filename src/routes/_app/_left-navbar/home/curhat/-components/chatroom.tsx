import React from 'react';

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
  chat: ChatRoom;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ chat }) => {
  return (
    <div className="md:w-100% relative flex size-full flex-col p-4">
      <h2 className="mb-4 text-xl font-semibold">{chat.name}</h2>
      <div className="grow space-y-4 overflow-y-auto">
        {chat.messages.map((message) => (
          <div
            key={message.id}
            className={`rounded-md p-4 ${message.isSender ? 'self-end bg-blue-100' : 'self-start bg-green-100'}`}
          >
            <p>{message.content}</p>
            <span className="text-xs text-gray-400">{message.timestamp}</span>
          </div>
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-4 flex justify-center">
        <input
          type="text"
          placeholder="Type a message"
          className="w-4/5 rounded-md border px-4 py-2"
        />
        <button className="ml-2 rounded-md bg-blue-500 px-4 py-2 text-white">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
