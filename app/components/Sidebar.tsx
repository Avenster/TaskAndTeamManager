import React, { useState, useEffect } from "react";
import {
  Plus,
  ListTodo,
  Users,
  Settings,
  LayoutDashboard,
  Calendar,
  BarChart2,
  Clock,
  Target,
  Ungroup,
  ChartNoAxesGantt,
  User
} from "lucide-react";

const Sidebar = ({ onPageChange }) => {
  const [user, setUser] = useState(null);
  const [activePage, setActivePage] = useState("dashboard");
  const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(false);
  const [teams] = useState(["Team 1", "Team 2", "Team 3"]);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handlePageChange = (page) => {
    setActivePage(page);
    onPageChange(page);
  };

  return (
    <aside className="flex w-64 h-full bg-black border-b border-l border-r border-white/10 flex flex-col">
      <div className="flex-1 px-3 py-4 overflow-y-auto scrollbar-custom">
      <h2 className="text-lg font-semibold text-white mb-4 tracking-wide">Quick Actions</h2>

{/* Action Buttons - Slightly reduced padding and refined hover effect */}
<div className="space-y-2 mb-6">
  <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-3 py-1.5 rounded-lg hover:opacity-90 transition-all duration-200 flex items-center justify-center text-sm">
    <Plus className="w-3.5 h-3.5 mr-2" />
    Create Task
  </button>
  <button className="w-full bg-black border border-white/10 text-white px-3 py-1.5 rounded-lg hover:bg-gray-800 transition-all duration-200 flex items-center justify-center text-sm">
    <Users className="w-3.5 h-3.5 mr-2" />
    Create Team
  </button>
        </div>

        {/* Main Navigation */}
        <div className="mb-6 space-y-1">
        <button
            onClick={() => handlePageChange("dashboard")}
            className={`w-full flex items-center px-3 py-1.5 text-sm text-gray-300 rounded-lg transition-all duration-200 ${
              activePage === "dashboard"
                ? "bg-gray-800 text-white"
                : "hover:bg-gray-800"
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5 mr-2.5" />
            Introduction
          </button>
          <button
            onClick={() => handlePageChange("tasks")}
            className={`w-full flex items-center px-3 py-2 text-gray-300 rounded-lg transition-colors text-sm ${
              activePage === "tasks"
                ? "bg-gray-800 text-white"
                : "hover:bg-gray-800"
            }`}
          >
            <ListTodo className="w-4 h-4 mr-3" />
            My Tasks
          </button>
          <button
            onClick={() => handlePageChange("calendar")}
            className={`w-full flex items-center px-3 py-2 text-gray-300 rounded-lg text-sm transition-colors ${
              activePage === "calendar"
                ? "bg-gray-800 text-white"
                : "hover:bg-gray-800"
            }`}
          >
            <Calendar className="w-4 h-4 mr-3" />
            Calendar
          </button>
        </div>

        {/* Team Section */}
        <div className="mb-6">
        <h3 className="text-xs font-medium text-gray-400 mb-2 px-3  tracking-wider">
            Team
          </h3>
          <div className="space-y-1">
          <button
              onClick={() => setIsTeamDropdownOpen(!isTeamDropdownOpen)}
              className="w-full flex items-center justify-between px-3 py-1.5 text-sm text-gray-300 rounded-lg transition-all duration-200 hover:bg-gray-800"
            >
              <div className="flex items-center text-sm">
                <Users className="w-3.5 h-3.5 mr-2.5" />
                Teams
              </div>
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  isTeamDropdownOpen ? "transform rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown content */}
            {isTeamDropdownOpen && (
              <div className="ml-6 space-y-0.5">
                {teams.map((team, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(`team-${index + 1}`)}
                    className={`w-full flex items-center px-3 py-1.5 text-sm text-gray-300 rounded-lg transition-all duration-200 hover:bg-gray-800 ${
                      activePage === `team-${index + 1}`
                        ? "bg-gray-800 text-white"
                        : ""
                    }`}
                  >
                    {team}
                  </button>
                ))}
              </div>
            )}
            <button
              onClick={() => handlePageChange("teams")}
              className={`w-full flex items-center px-3 py-2 text-gray-300 text-sm rounded-lg transition-colors ${
                activePage === "teams"
                  ? "bg-gray-800 text-white"
                  : "hover:bg-gray-800"
              }`}
            >
              <ChartNoAxesGantt className="w-4 h-4 mr-3" />
              Manage Teams
            </button>

            
            <button
              onClick={() => handlePageChange("analytics")}
              className={`w-full flex items-center px-3 py-2 text-gray-300 text-sm rounded-lg transition-colors ${
                activePage === "analytics"
                  ? "bg-gray-800 text-white"
                  : "hover:bg-gray-800"
              }`}
            >
              <BarChart2 className="w-4 h-4 mr-3" />
              Analytics
            </button>
            

          </div>
        </div>

        {/* Recent Activity */}
        <div>
        <h3 className="text-xs font-medium text-gray-400 mb-2 px-3 tracking-wider">
            Recent
          </h3>
          <div className="space-y-1">
            <button
              onClick={() => handlePageChange("activity")}
              className={`w-full flex items-center px-3 py-2 text-sm text-gray-300 rounded-lg transition-colors ${
                activePage === "activity"
                  ? "bg-gray-800 text-white"
                  : "hover:bg-gray-800"
              }`}
            >
              <Clock className="w-4 h-4 mr-3" />
              Activity Log
            </button>
          </div>
        </div>
      </div>

      {/* User Profile and Settings */}
      <div className="border-t border-white/10 p-4">
        {user && (
          <div className="flex items-center py-1 text-white mb-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center overflow-hidden">
              <img src={user.avatar_url || user.picture} alt="" />
            </div>
            <span className="ml-2 text-sm">{user.username || user.name}</span>

          </div>
        )}
       <button
          onClick={() => handlePageChange("settings")}
          className={`flex items-center transition-all duration-200 w-full text-sm ${
            activePage === "settings"
              ? "text-white"
              : "text-gray-300 hover:text-white"
          }`}
        >
          <Settings className="w-3.5 h-3.5 mr-2" />
          Settings
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
