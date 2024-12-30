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
  ChartNoAxesGantt,
  Menu
} from "lucide-react";

const Sidebar = ({ onPageChange }) => {
  const [user, setUser] = useState(null);
  const [activePage, setActivePage] = useState("dashboard");
  const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
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
    <aside className={`flex h-full bg-black border-b border-l border-r border-white/10 flex-col transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex-1 px-3 py-4 overflow-y-auto scrollbar-custom">
        <div className="flex justify-between items-center mb-4">
          {!isCollapsed && <h2 className="text-lg font-semibold text-white tracking-wide">Quick Actions</h2>}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 hover:bg-gray-800 rounded-lg transition-all"
          >
            <Menu className="w-4 h-4 text-white" />
          </button>
        </div>

        

        <div className="space-y-2 mb-6">
          <button className={`w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-3 py-1.5 rounded-lg hover:opacity-90 transition-all duration-200 flex items-center ${isCollapsed ? 'justify-center' : 'justify-center'}`}>
            <Plus className="w-3.5 h-3.5" />
            {!isCollapsed && <span className="ml-2 text-sm">Create Task</span>}
          </button>
          <button className={`w-full bg-black border border-white/10 text-white px-3 py-1.5 rounded-lg hover:bg-gray-800 transition-all duration-200 flex items-center ${isCollapsed ? 'justify-center' : 'justify-center'}`}>
            <Users className="w-3.5 h-3.5" />
            {!isCollapsed && <span className="ml-2 text-sm">Create Team</span>}
          </button>
        </div>

        <div className="mb-6 space-y-1">
          {[
            { icon: LayoutDashboard, label: "Introduction", id: "dashboard" },
            { icon: ListTodo, label: "My Tasks", id: "tasks" },
            { icon: Calendar, label: "Calendar", id: "calendar" }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handlePageChange(item.id)}
              className={`w-full flex items-center px-3 py-1.5 text-gray-300 rounded-lg transition-all duration-200 ${
                activePage === item.id ? "bg-gray-800 text-white" : "hover:bg-gray-800"
              } ${isCollapsed ? 'justify-center' : ''}`}
            >
              <item.icon className="w-3.5 h-3.5" />
              {!isCollapsed && <span className="ml-2.5 text-sm">{item.label}</span>}
            </button>
          ))}
        </div>

        <div className="mb-6">
          {!isCollapsed && <h3 className="text-xs font-medium text-gray-400 mb-2 px-3 tracking-wider">Team</h3>}
          
          <div className="space-y-1">
            <button
              onClick={() => !isCollapsed && setIsTeamDropdownOpen(!isTeamDropdownOpen)}
              className={`w-full flex items-center px-3 py-1.5 text-gray-300 rounded-lg transition-all duration-200 hover:bg-gray-800 ${
                isCollapsed ? 'justify-center' : 'justify-between'
              }`}
            >
              <div className="flex items-center">
                <Users className="w-3.5 h-3.5" />
                {!isCollapsed && <span className="ml-2.5 text-sm">Teams</span>}
              </div>
              {!isCollapsed && (
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
              )}
            </button>

            {!isCollapsed && isTeamDropdownOpen && (
              <div className="ml-6 space-y-0.5">
                {teams.map((team, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(`team-${index + 1}`)}
                    className={`w-full flex items-center px-3 py-1.5 text-sm text-gray-300 rounded-lg transition-all duration-200 hover:bg-gray-800 ${
                      activePage === `team-${index + 1}` ? "bg-gray-800 text-white" : ""
                    }`}
                  >
                    {team}
                  </button>
                ))}
              </div>
            )}

            {[
              { icon: ChartNoAxesGantt, label: "Manage Teams", id: "teams" },
              { icon: BarChart2, label: "Analytics", id: "analytics" }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handlePageChange(item.id)}
                className={`w-full flex items-center px-3 py-1.5 text-gray-300 rounded-lg transition-all duration-200 ${
                  activePage === item.id ? "bg-gray-800 text-white" : "hover:bg-gray-800"
                } ${isCollapsed ? 'justify-center' : ''}`}
              >
                <item.icon className="w-3.5 h-3.5" />
                {!isCollapsed && <span className="ml-2.5 text-sm">{item.label}</span>}
              </button>
            ))}
          </div>
        </div>

        <div>
          {!isCollapsed && <h3 className="text-xs font-medium text-gray-400 mb-2 px-3 tracking-wider">Recent</h3>}
          <button
            onClick={() => handlePageChange("activity")}
            className={`w-full flex items-center px-3 py-1.5 text-gray-300 rounded-lg transition-all duration-200 ${
              activePage === "activity" ? "bg-gray-800 text-white" : "hover:bg-gray-800"
            } ${isCollapsed ? 'justify-center' : ''}`}
          >
            <Clock className="w-3.5 h-3.5" />
            {!isCollapsed && <span className="ml-2.5 text-sm">Activity Log</span>}
          </button>
        </div>
      </div>

      <div className="border-t border-white/10 p-4">
        {user && (
          <div className={`flex items-center py-1 text-white mb-3 ${isCollapsed ? 'justify-center' : ''}`}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center overflow-hidden">
              <img src={user.avatar_url || user.picture} alt="" />
            </div>
            {!isCollapsed && <span className="ml-2 text-sm">{user.username || user.name}</span>}
          </div>
        )}
        <button
          onClick={() => handlePageChange("settings")}
          className={`flex items-center transition-all duration-200 w-full text-sm ${
            activePage === "settings" ? "text-white" : "text-gray-300 hover:text-white"
          } ${isCollapsed ? 'justify-center' : ''}`}
        >
          <Settings className="w-3.5 h-3.5" />
          {!isCollapsed && <span className="ml-2">Settings</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;