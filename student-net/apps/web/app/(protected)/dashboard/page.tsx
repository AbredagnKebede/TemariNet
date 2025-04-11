import { currentUser } from "@clerk/nextjs";

export default async function DashboardPage() {
  const user = await currentUser();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Summary */}
        <div className="md:col-span-1">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="text-center">
              <img
                src={user?.imageUrl || "https://via.placeholder.com/100"}
                alt={user?.firstName || "Profile"}
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h2 className="text-xl font-semibold">{user?.firstName} {user?.lastName}</h2>
              <p className="text-gray-500">Student</p>
            </div>
            <div className="mt-6 border-t pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Profile Completion</span>
                <span className="text-blue-600">70%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 rounded-full h-2 w-[70%]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button className="p-4 border rounded-lg hover:bg-gray-50 text-left">
                <h3 className="font-medium">Complete Profile</h3>
                <p className="text-sm text-gray-500">Add your academic details</p>
              </button>
              <button className="p-4 border rounded-lg hover:bg-gray-50 text-left">
                <h3 className="font-medium">Join Groups</h3>
                <p className="text-sm text-gray-500">Connect with classmates</p>
              </button>
              <button className="p-4 border rounded-lg hover:bg-gray-50 text-left">
                <h3 className="font-medium">Share Resources</h3>
                <p className="text-sm text-gray-500">Upload study materials</p>
              </button>
              <button className="p-4 border rounded-lg hover:bg-gray-50 text-left">
                <h3 className="font-medium">Start Discussion</h3>
                <p className="text-sm text-gray-500">Create a new topic</p>
              </button>
            </div>

            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 mt-2 rounded-full bg-blue-500"></div>
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">New group discussion</span> started in{" "}
                      <span className="text-blue-600">Computer Science 101</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="font-medium text-gray-900 mb-4">Upcoming Events</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Study Group Meeting</p>
                <p className="text-sm text-gray-500">Tomorrow at 3 PM</p>
              </div>
              <button className="text-blue-600 text-sm">Join</button>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="font-medium text-gray-900 mb-4">Your Groups</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Computer Science Hub</p>
                <p className="text-sm text-gray-500">128 members</p>
              </div>
              <button className="text-blue-600 text-sm">View</button>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="font-medium text-gray-900 mb-4">Resources</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Latest Study Materials</p>
                <p className="text-sm text-gray-500">5 new items</p>
              </div>
              <button className="text-blue-600 text-sm">Browse</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 