import React from 'react';

// Define the props for ChatList
interface Message {
  id: number;
  content: string;
  timestamp: string;
  isSender: boolean;
}

interface ChatRoom {
  id: number;
  name: string;
  messages: Message[];
}

interface ChatListProps {
  chats: ChatRoom[];
  setSelectedChat: (chat: ChatRoom) => void;
}

const ChatList: React.FC<ChatListProps> = ({ chats, setSelectedChat }) => {
  return (
    <div className="size-full border-r bg-gray-50 p-4 md:w-full lg:w-2/5">
      <h2 className="mb-4 text-2xl font-semibold text-gray-800">Messages</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search"
          className="w-full rounded-md border px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="space-y-4">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className="flex cursor-pointer items-center justify-between rounded-md bg-white p-4 shadow transition hover:bg-blue-100"
            onClick={() => setSelectedChat(chat)}
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {chat.name}
              </h3>
              <p className="truncate text-sm text-gray-500">
                Last message content...
              </p>
            </div>
            <span className="rounded-full bg-red-500 px-2 py-1 text-xs text-white">
              {chat.messages.length}{' '}
              {/* Replace this with your unread messages count */}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
