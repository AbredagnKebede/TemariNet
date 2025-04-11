import { currentUser } from "@clerk/nextjs";

const sampleChats = [
  {
    id: 1,
    name: "John Smith",
    avatar: "https://via.placeholder.com/40",
    lastMessage: "Hey, did you get the notes from today's lecture?",
    timestamp: "2 min ago",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: "Study Group - Algorithms",
    avatar: "https://via.placeholder.com/40",
    lastMessage: "Meeting tomorrow at 3 PM",
    timestamp: "1 hour ago",
    unread: 0,
    online: false,
    isGroup: true,
  },
  {
    id: 3,
    name: "Sarah Wilson",
    avatar: "https://via.placeholder.com/40",
    lastMessage: "Thanks for sharing the resources!",
    timestamp: "2 hours ago",
    unread: 0,
    online: true,
  },
];

const sampleMessages = [
  {
    id: 1,
    senderId: "user1",
    content: "Hey, did you get the notes from today's lecture?",
    timestamp: "2:30 PM",
  },
  {
    id: 2,
    senderId: "current-user",
    content: "Yes, I'll share them with you!",
    timestamp: "2:31 PM",
  },
  {
    id: 3,
    senderId: "user1",
    content: "That would be great, thanks!",
    timestamp: "2:31 PM",
  },
  {
    id: 4,
    senderId: "current-user",
    content: "I've uploaded them to our shared folder. Let me know if you need anything else!",
    timestamp: "2:32 PM",
  },
];

export default async function MessagesPage() {
  const user = await currentUser();

  return (
    <div className="flex h-[calc(100vh-10rem)] bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Sidebar */}
      <div className="w-1/3 border-r border-gray-200">
        <div className="p-4 border-b">
          <input
            type="text"
            placeholder="Search messages..."
            className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="overflow-y-auto h-full">
          {sampleChats.map((chat) => (
            <div
              key={chat.id}
              className="flex items-center p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
            >
              <div className="relative">
                <img src={chat.avatar} alt={chat.name} className="w-10 h-10 rounded-full" />
                {chat.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold">{chat.name}</h3>
                  <span className="text-xs text-gray-500">{chat.timestamp}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                  {chat.unread > 0 && (
                    <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b flex items-center">
          <div className="relative">
            <img
              src="https://via.placeholder.com/40"
              alt="John Smith"
              className="w-10 h-10 rounded-full"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div className="ml-4 flex-1">
            <h3 className="text-lg font-semibold">John Smith</h3>
            <p className="text-sm text-gray-600">Online</p>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {sampleMessages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.senderId === "current-user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.senderId === "current-user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                <p>{message.content}</p>
                <span
                  className={`text-xs ${
                    message.senderId === "current-user" ? "text-blue-100" : "text-gray-500"
                  } mt-1 block`}
                >
                  {message.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t">
          <div className="flex items-center space-x-2">
            <button className="text-gray-500 hover:text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                />
              </svg>
            </button>
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:border-blue-500"
            />
            <button className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 