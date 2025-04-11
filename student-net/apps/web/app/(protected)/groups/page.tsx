import { currentUser } from "@clerk/nextjs";

const sampleGroups = [
  {
    id: 1,
    name: "Computer Science Hub",
    description: "A community for CS students to discuss coursework and share resources",
    members: 128,
    category: "Academic",
    isJoined: true,
  },
  {
    id: 2,
    name: "AI & Machine Learning",
    description: "Explore the latest in artificial intelligence and machine learning",
    members: 95,
    category: "Technology",
    isJoined: false,
  },
  {
    id: 3,
    name: "Study Group - Algorithms",
    description: "Weekly study sessions for algorithm practice and problem-solving",
    members: 45,
    category: "Study Group",
    isJoined: true,
  },
];

export default async function GroupsPage() {
  const user = await currentUser();

  return (
    <div className="space-y-6">
      {/* Header with Create Group Button */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Groups</h1>
          <p className="text-gray-600">Join and participate in student groups</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create Group
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Search groups..."
              className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <select className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500">
              <option value="">All Categories</option>
              <option value="academic">Academic</option>
              <option value="technology">Technology</option>
              <option value="study">Study Groups</option>
            </select>
          </div>
          <div>
            <select className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500">
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="members">Most Members</option>
            </select>
          </div>
        </div>
      </div>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleGroups.map((group) => (
          <div key={group.id} className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{group.name}</h3>
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full mt-2">
                    {group.category}
                  </span>
                </div>
                <button className="text-gray-400 hover:text-gray-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                  </svg>
                </button>
              </div>
              <p className="mt-2 text-gray-600 text-sm">{group.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {group.members} members
                </div>
                <button
                  className={`px-4 py-1 rounded-full text-sm font-medium ${
                    group.isJoined
                      ? "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {group.isJoined ? "Joined" : "Join"}
                </button>
              </div>
            </div>
            {group.isJoined && (
              <div className="px-6 py-3 bg-gray-50 border-t">
                <a href={`/groups/${group.id}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View Group →
                </a>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Create Group Modal (Hidden by default) */}
      <div className="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4">Create New Group</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Group Name</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter group name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option>Academic</option>
                <option>Technology</option>
                <option>Study Group</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Describe your group"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button type="button" className="px-4 py-2 text-gray-700 hover:text-gray-900">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Create Group
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 