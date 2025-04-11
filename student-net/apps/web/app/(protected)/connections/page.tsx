"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const sampleConnections = [
  {
    id: 1,
    name: "John Smith",
    avatar: "https://via.placeholder.com/100",
    role: "Computer Science Student",
    university: "MIT",
    mutualConnections: 12,
    isConnected: true,
  },
  {
    id: 2,
    name: "Sarah Wilson",
    avatar: "https://via.placeholder.com/100",
    role: "Data Science Student",
    university: "Stanford",
    mutualConnections: 8,
    isConnected: false,
  },
  {
    id: 3,
    name: "Michael Brown",
    avatar: "https://via.placeholder.com/100",
    role: "Software Engineering Student",
    university: "Berkeley",
    mutualConnections: 15,
    isConnected: true,
  },
];

const sampleSuggestions = [
  {
    id: 4,
    name: "Emily Davis",
    avatar: "https://via.placeholder.com/100",
    role: "AI Research Student",
    university: "Carnegie Mellon",
    mutualConnections: 5,
    isConnected: false,
  },
  {
    id: 5,
    name: "David Lee",
    avatar: "https://via.placeholder.com/100",
    role: "Cybersecurity Student",
    university: "Georgia Tech",
    mutualConnections: 3,
    isConnected: false,
  },
];

export default function ConnectionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const filteredConnections = sampleConnections.filter((connection) =>
    connection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    connection.university.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Connections</h1>
        <p className="text-gray-600">Connect with fellow students and expand your network</p>
      </div>

      {/* Search */}
      <div className="bg-white shadow rounded-lg p-4">
        <input
          type="text"
          placeholder="Search connections..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold">Your Network</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">{sampleConnections.length}</p>
          <p className="text-gray-600">Total Connections</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold">Pending</h3>
          <p className="text-3xl font-bold text-yellow-600 mt-2">5</p>
          <p className="text-gray-600">Connection Requests</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold">Growth</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">+12</p>
          <p className="text-gray-600">New This Month</p>
        </div>
      </div>

      {/* Connections Grid */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Your Connections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredConnections.map((connection) => (
            <div key={connection.id} className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={connection.avatar}
                    alt={connection.name}
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{connection.name}</h3>
                    <p className="text-gray-600">{connection.role}</p>
                    <p className="text-sm text-gray-500">{connection.university}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">
                    {connection.mutualConnections} mutual connections
                  </p>
                </div>
              </div>
              <div className="px-6 py-3 bg-gray-50 border-t flex justify-between items-center">
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View Profile
                </button>
                <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                  Message
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Suggestions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Suggested Connections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleSuggestions.map((suggestion) => (
            <div key={suggestion.id} className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={suggestion.avatar}
                    alt={suggestion.name}
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{suggestion.name}</h3>
                    <p className="text-gray-600">{suggestion.role}</p>
                    <p className="text-sm text-gray-500">{suggestion.university}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">
                    {suggestion.mutualConnections} mutual connections
                  </p>
                </div>
              </div>
              <div className="px-6 py-3 bg-gray-50 border-t flex justify-between items-center">
                <button className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm hover:bg-blue-700">
                  Connect
                </button>
                <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 